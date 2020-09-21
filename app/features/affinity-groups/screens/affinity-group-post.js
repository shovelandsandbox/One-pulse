import PropTypes from "prop-types";
import { path, pathOr } from "ramda";
import { connect } from "react-redux";
import React, { PureComponent, createRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Styles from "./styles";
import Colors from "../utils/colors";
import PostUtils from "../utils/post";
import PostComment from "../components/post-comment";
import affinityGroupScreens from "../../../utils/configs/screen-names";
import { affinityGroupActions } from "../configs/affinity-group-actions";
import Header from "../components/header";
import InlineComment from "../components/inline-comment";
import ActionBar from "../components/actions-bar";
import { groupSelector, likeSelector } from "../selectors";
import * as AffinityType from "../types";
import { registerEvent } from "../../../utils/registerEvents/actions";
import { eventNames } from "../events";
import { gotoWithParams } from "../../../actions";
import { metaFinderAG } from "../utils/meta-utils";

const extractKey = item => {
  const key = `PruListItemComment: ${item.id}`;
  return key;
};

class AffinityGroupPostScreen extends PureComponent {
  flatListRef = createRef();

  constructor(props) {
    super(props);
    this.state = {
      showCommentBox: false,
    };
    this.commentBoxRef = React.createRef();
  }

  componentDidMount = () => {
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.props.resetCurrentPost();
        const postId = this.props.navigation.getParam("postId");
        this.props.fetchGroupPostById(postId);
      }
    );
  };

  componentWillUnmount() {
    if (this.didFocusListener) {
      this.didFocusListener.remove();
    }
    this.props.resetCurrentPost();
  }

  renderScreenHeader = (post = {}, group = {}) => {
    const { attributes = {}, title } = post;
    const { name } = group;
    return (
      <Header
        title={name || title}
        options={{ showNotificationBell: false }}
        stats={attributes.stats}
      />
    );
  };

  togglePostLike = () => {
    const { post: { id: postId, group } = {} } = this.props.currentPost;
    const { isLiked,isLikesUpdating } = this.props;
    const eventName = isLiked ? eventNames.unlikePost : eventNames.likePost;
    this.props.registerEvent(eventName, {
      communityId: group.id,
      communityName: pathOr("", ["group", "name"], this.props),
      postId,
      postTitle: pathOr("", ["currentPost", "post", "title"], this.props),
    });
    if(!isLikesUpdating){
      if (isLiked ) {
        this.props.unlikePost({
          postId,
          group,
        });
      } else {
        this.props.likePost({
          postId,
          group,
        });
      }
    }

  };

  renderPostFooter = (post, group = {}) => {
    if (!group.joined) {
      return null;
    }
    const { isLiked } = this.props;
    const stats = pathOr({}, ["attributes", "stats"], post);
    const { likes = 0, comments = 0 } = stats;

    const borderStyle = {
      borderTopWidth: 0.3,
      borderTopColor: Colors.postSeparator,
      borderBottomWidth: 0.3,
      borderBottomColor: Colors.postSeparator,
    };

    const config = {
      isLiked,
      likeCount: likes,
      commentCount: comments,
      onCommentPress: this.toggleCommentBox,
      togglePostLike: this.togglePostLike,
      onShare: () => {
        this.props.registerEvent(eventNames.sharePost, {
          communityId: group.id,
          communityName: group.name,
          postId: post.id,
        });
      },
      borderStyle,
    };

    return <ActionBar config={config} post={post} />;
  };

  handleLoadMoreComments = reload => {
    const {
      currentPost: { post: { id } = {}, pagination = {} },
    } = this.props;
    if (!pagination.done) {
      this.props.fetchComments({ id, reload });
    }
  };

  postComment = payload => {
    this.props.postComment(payload);
    this.setState({ showCommentBox: false });
    Keyboard.dismiss();
    this.flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    //events
    const { post: { id: postId, group } = {} } = this.props.currentPost;
    this.props.registerEvent(eventNames.commentPost, {
      communityId: group.id,
      communityName: pathOr("", ["group", "name"], this.props),
      postId: postId,
    });
  };

  toggleLike = (item, isLiked) => {
    const commentId = item.id;
    const group = item.group;
    const { post: { id: postId } = {} } = this.props.currentPost;
    const eventName = isLiked
      ? eventNames.likeComment
      : eventNames.unlikeComment;

    this.props.registerEvent(eventName, {
      communityId: group.id,
      communityName: pathOr("", ["group", "name"], this.props),
      postId,
      postTitle: pathOr("", ["currentPost", "post", "title"], this.props),
    });
    this.props.toggleLike(commentId, group, isLiked);
  };

  onLinkPress = params => {
    this.props.gotoWithParams("WebView", params);
  };

  renderPostBody = post => {
    const { queryParams = "" } = this.props;
    const options = { queryParams };
    if (post.document) {
      switch (post.document.contentType) {
        case "image/jpg":
          return PostUtils.getPhotoPost(post, options);
        case "application/pdf":
          return PostUtils.getFilePost(post, options);
        case "video/mp4":
          return PostUtils.getVideoPost(post, options);
        default:
          return PostUtils.getLinkPost(post, options, this.onLinkPress);
      }
    }
    return PostUtils.getTextPost(post, options);
  };

  renderComment = ({ item }) => {
    return <PostComment data={item} onLikeToggle={this.toggleLike} />;
  };

  renderEmptyComponent = () => {
    return (
      <View style={Styles.emptyContainer}>
        <Text style={Styles.emptyText}>{metaFinderAG("noCommentsMsg")}</Text>
      </View>
    );
  };

  renderPost = () => {
    const {
      currentPost: { post },
      group,
    } = this.props;

    return (
      <View style={styles.postHeaderContainer}>
        <View style={styles.postBodyContainer}>
          {PostUtils.getPostHeader(post)}
          {this.renderPostBody(post)}
        </View>
        {this.renderPostFooter(post, group)}
      </View>
    );
  };

  commentChange = comment => {
    if (comment && comment.trim()) {
      this.setState({ comment });
    }
  };

  toggleCommentBox = () => {
    //this.commentBoxRef.current.focus();
    this.setState(state => ({
      showCommentBox: !state.showCommentBox,
    }));
  };

  renderCommentBox = () => {
    if (!this.state.showCommentBox) {
      return null;
    }
    const {
      currentPost: { post },
    } = this.props;

    return (
      <View style={styles.commentBox}>
        <InlineComment
          postId={post.id}
          group={post.group}
          ref={this.commentBoxRef}
          postComment={this.postComment}
        />
      </View>
    );
  };

  render() {
    const { currentPost: { comments, post } = {}, group } = this.props;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        style={styles.scrollContainer}
        keyboardVerticalOffset={30}
      >
        {this.renderScreenHeader(post, group)}
        {post && (
          <View style={styles.scrollContainer}>
            <View style={styles.baseWallContainer}>
              <FlatList
                data={comments}
                ref={this.flatListRef}
                keyExtractor={extractKey}
                onEndReachedThreshold={0.5}
                updateCellsBatchingPeriod={50}
                onEndReached={() => this.handleLoadMoreComments()}
                ListHeaderComponent={this.renderPost}
                renderItem={this.renderComment}
                ListEmptyComponent={this.renderEmptyComponent}
              />
            </View>
            {this.renderCommentBox()}
          </View>
        )}
      </KeyboardAvoidingView>
    );
  }
}

AffinityGroupPostScreen.propTypes = {
  toggleLike: PropTypes.func,
  postComment: PropTypes.func,
  navigation: PropTypes.object,
  currentPost: AffinityType.currentPost,
  fetchComments: PropTypes.func,
  likePost: PropTypes.func,
  resetCurrentPost: PropTypes.func,
  fetchGroupPostById: PropTypes.func,
  group: AffinityType.group,
  registerEvent: PropTypes.func,
  unlikePost: PropTypes.func,
  isLiked: PropTypes.bool,
  gotoWithParams: PropTypes.func,
  queryParams: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    currentPost: path(["affinityGroup", "currentPost"], state),
    group: groupSelector(
      state,
      pathOr({}, ["affinityGroup", "currentPost", "post", "group"], state)
    ),
    isLiked: likeSelector(
      state,
      path(["affinityGroup", "currentPost", "post", "id"], state)
    ),
    queryParams: path(["meta", "countryCommonMeta", "queryParams"], state),
    isLikesUpdating : pathOr(false,["affinityGroup", "isLikesUpdating"], state),
  };
};

const mapDispatchToProps = {
  registerEvent,
  gotoWithParams,
  fetchGroupPostById: postId => {
    return {
      context: affinityGroupScreens.affinityGroupPostScreen,
      type: affinityGroupActions.getGroupPostById,
      payload: {
        postId,
      },
    };
  },
  likePost: payload => ({
    context: affinityGroupScreens.affinityGroupPostScreen,
    type: affinityGroupActions.likePost,
    payload: {
      type: "LIKE",
      parent: { id: payload.postId },
      group: payload.group,
    },
  }),
  unlikePost: payload => ({
    context: affinityGroupScreens.affinityGroupPostScreen,
    type: affinityGroupActions.unlikePost,
    payload: {
      type: "DISLIKE",
      parent: { id: payload.postId },
      group: payload.group,
    },
  }),
  fetchComments: payload => {
    return {
      context: affinityGroupScreens.affinityGroupPostScreen,
      type: affinityGroupActions.getPostComments,
      payload,
    };
  },
  toggleLike: (commentId, group, isLiked) => {
    return {
      context: affinityGroupScreens.affinityGroupPostScreen,
      type: isLiked
        ? affinityGroupActions.likeComment
        : affinityGroupActions.unlikeComment,
      payload: {
        type: isLiked ? "LIKE" : "DISLIKE",
        parent: { id: commentId },
        group,
      },
    };
  },
  postComment: payload => {
    return {
      context: affinityGroupScreens.affinityGroupPostScreen,
      type: affinityGroupActions.addPostComments,
      payload: {
        type: "COMMENT",
        message: payload.message,
        parent: { id: payload.postId },
        group: payload.group,
      },
    };
  },
  resetCurrentPost: () => ({
    type: affinityGroupActions.setCurrentPost,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AffinityGroupPostScreen);

const styles = StyleSheet.create({
  baseWallContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  commentBox: {
    backgroundColor: Colors.white,
    borderTopColor: Colors.veryLightGrey,
    borderTopWidth: 0.2,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    // paddingTop: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  postBodyContainer: {
    backgroundColor: Colors.baseBackground,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  postHeaderContainer: {
    backgroundColor: Colors.baseBackground,
    // marginBottom: 5,
  },
  scrollContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
