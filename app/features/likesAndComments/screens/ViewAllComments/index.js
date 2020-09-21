/* eslint-disable react/require-optimization */
import React, { Component } from "react";
import { connect } from "react-redux";
import { View, FlatList, Keyboard } from "react-native";
import PropTypes from "prop-types";
import LikeCommentSmall from "../../Component/LikeCommentSmall";
import CommentBox from "../../Component/CommentBox";
import CommentInput from "../../Component/CommentInput";
import {
  HC_LIKE,
  HC_COMMENT,
  HC_SHARE,
  HC_LIKED,
} from "../../../../config/images";
import MultipleButtons from "../../Component/MultipleButtons";
import ArticleDescription from "../../Component/ArticleDescription";
import PruBackHeader from "../../../../components/PruBackHeader";
import styles from "./styles";
import { pathOr, isEmpty, path } from "ramda";
import { likeSelector } from "../../../affinity-groups/selectors";
import affinityGroupScreens from "../../../../utils/configs/screen-names";
import { affinityGroupActions } from "../../../affinity-groups/configs/affinity-group-actions";
import {
  initializeDynamicLink,
  createDynamicLink,
} from "../../../../utils/DynamicLinkUtil";

import {
  getCommentsByGroupId,
  sendComment,
  getGroupPostStats,
  updateLikeAndDislike,
  updateLikeDislikeOnComment,
  sendCommentOnComment,
  getChildGroupPosts,
  resetResponseError,
  updateShare,
} from "../../actions";
import MetaConstants from "../../meta";
import constants from "../../configs/constants";
// import Share from "react-native-share";

const {
  INITIAL_PAGE,
  COMMENTS_THRESHOLD,
  TYPE_COMMENT,
  TYPE_DISLIKE,
  TYPE_LIKE,
  TYPE_SHARE,
} = constants;
export class ViewAllComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardshown: false,
      enableComment: true,
      selectedComment: null,
      showChildComment: false
    };
    this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    this.handleCommentSent();
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  getLatestComments = (groupId, groupPostComments) => {
    const index = groupPostComments.findIndex(el => el.id == groupId);
    if (index !== -1) {
      return groupPostComments[index].comments;
    }
    return [];
  };

  getLastPage = (groupId, groupPostComments) => {
    const index = groupPostComments.findIndex(el => el.id == groupId);
    if (index !== -1) {
      return groupPostComments[index].page;
    }
    return INITIAL_PAGE;
  };

  getLoadMoreFlag = (groupId, groupPostComments) => {
    const index = groupPostComments.findIndex(el => el.id == groupId);
    if (index !== -1) {
      return groupPostComments[index].loadMoreComments;
    }
    return false;
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ keyboardshown: true });
  };

  _keyboardDidHide = () => {
    //alert("Keyboard Hidden");
    this.setState({ keyboardshown: false });
  };

  getFilteredPost = (groupPostList, groupId) => {
    const index = groupPostList.findIndex(el => el.id == groupId);
    if (index !== -1) {
      return groupPostList[index];
    }
    return {};
  };

  isPostLiked = (groupPostLiked, groupId) => {
    const { navigation, isLiked } = this.props;
    const fromCommunity = pathOr(
      false,
      ["state", "params", "fromCommunity"],
      navigation
    );
    const index = groupPostLiked.findIndex(el => el == groupId);
    if (fromCommunity) {
      return isLiked;
    }
    return index !== -1 ? true : false;
  };

  updateLikeDislike = () => {
    const {
      navigation,
      updateLikeAndDislike,
      groupPostLiked,
      isArticleLikesUpdating,
    } = this.props;
    const groupId = pathOr("", ["state", "params", "groupId"], navigation);
    const fromCommunity = pathOr(
      false,
      ["state", "params", "fromCommunity"],
      navigation
    );
    const parentId = fromCommunity
      ? pathOr("", ["state", "params", "parentId"], navigation)
      : null;
    const isLiked = this.isPostLiked(groupPostLiked, groupId);
    if (!isArticleLikesUpdating) {
      updateLikeAndDislike({
        id: groupId,
        parent: { id: parentId },
        type: isLiked ? TYPE_DISLIKE : TYPE_LIKE,
      });
    }
  };

  onShare = async (uri, groupId) => {
    const { navigation, userAgent, updateShare } = this.props;
    const fitter_with_app = this.MetaConstants.shareMessage;
    const imageUrl = pathOr("", ["state", "params", "imageUrl"], navigation);
    const desc = pathOr("", ["state", "params", "desc"], navigation);
    const title = pathOr("", ["state", "params", "title"], navigation);
    initializeDynamicLink(userAgent);
    const queryParams = {
      screenId: "WebView",
      screenParams: `uri^${uri}|groupId^${groupId}`,
    };
    const deeplinkUrl = await createDynamicLink({
      desc,
      title,
      queryParams,
      imageUrl,
    });

    // try {
    //   const result = await Share.open({
    //     message: deeplinkUrl,
    //   });
    //   updateShare({ id: groupId, type: "SHARE" });
    // } catch (error) {
    //   //alert(error.message);
    // }
  };

  updateCommunityLikeDislike = type => {
    const { isLiked, navigation, isLikesUpdating } = this.props;
    const postData = pathOr({}, ["state", "params", "postData"], navigation);
    const postId = path(["id"], postData);
    const group = path(["group"], postData);
    if (!isLikesUpdating) {
      if (isLiked) {
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

  handleButtonClick = item => {
    const { navigation } = this.props;
    const uri = pathOr("", ["state", "params", "uri"], navigation);
    const groupId = pathOr("", ["state", "params", "groupId"], navigation);
    const fromCommunity = pathOr(
      false,
      ["state", "params", "fromCommunity"],
      navigation
    );
    switch (item.type) {
      case TYPE_SHARE:
        this.onShare(uri, groupId);
        break;
      case TYPE_LIKE:
        fromCommunity
          ? this.updateCommunityLikeDislike()
          : this.updateLikeDislike();
        break;
      case TYPE_COMMENT:
        this.handleCommentIconPress();
        break;
    }
  };

  handleCommentIconPress = () => {
    this.setState(prevState => ({
      enableComment: !prevState.enableComment,
    }));
  };

  getButtonList(groupId, groupPostLiked) {
    const isPostLiked = this.isPostLiked(groupPostLiked, groupId);
    const likeCap = this.MetaConstants.likeCap;
    const commentCap = this.MetaConstants.commentCap;
    const shareCap = this.MetaConstants.shareCap;
    const buttonList = [
      {
        type: TYPE_LIKE,
        text: likeCap,
        image: {
          source: isPostLiked ? HC_LIKED : HC_LIKE,
          height: 14,
          width: 17,
        },
      },
      {
        type: TYPE_SHARE,
        text: shareCap,
        image: { source: HC_SHARE, height: 14, width: 12 },
      },
      {
        type: TYPE_COMMENT,
        text: commentCap,
        image: { source: HC_COMMENT, height: 14, width: 18 },
      },
    ];
    return buttonList;
  }

  handleSendText = msg => {
    const {
      navigation,
      sendComment,
      sendCommentOnComment,
    } = this.props;
    const { selectedComment } = this.state;
    const groupId = pathOr("", ["state", "params", "groupId"], navigation);
    const parent = {
      id: pathOr("", ["state", "params", "parentId"], navigation),
    };
    const title = {
      id: pathOr("", ["state", "params", "title"], navigation),
    };

    if (!isEmpty(msg)) {
      if (selectedComment) {
        const id = pathOr("", ["group", "id"], selectedComment);
        const commentId = pathOr("", ["id"], selectedComment);
        let config = {
          id,
          commentId,
          type: TYPE_COMMENT,
          message: msg,
        };

        if (!title.id) {
          config = { ...config, parent };
        }
        sendCommentOnComment(config);
        this.setState({ selectedComment: null });
      } else {
        let configa = { id: groupId, type: TYPE_COMMENT, message: msg };

        if (!title.id) {
          configa = {
            ...configa,
            parent,
          };
        }
        sendComment(configa);
      }
    }
    this.handleCommentSent();
  };

  handleCommentSent = () => {
    const {
      navigation,
      getGroupPostStats,
      getChildGroupPosts,
      getCommentsByGroupId
    } = this.props;
    const desc = pathOr("", ["state", "params", "desc"], navigation);
    const groupId = pathOr("", ["state", "params", "groupId"], navigation);
    const title = pathOr("", ["state", "params", "title"], navigation);
    const parentId = pathOr("", ["state", "params", "parentId"], navigation);
    const fromCommunity = pathOr(false, ["state", "params", "fromCommunity"], navigation);
    if (groupId) {
      if (!fromCommunity) {
        getCommentsByGroupId({
          id: groupId,
          type: TYPE_COMMENT,
          page: INITIAL_PAGE,
          pageSize: COMMENTS_THRESHOLD,
        });
        getGroupPostStats({ id: groupId });
      } else {
        getChildGroupPosts({
          id: parentId,
          type: TYPE_COMMENT,
          page: "0",
          pageSize: COMMENTS_THRESHOLD,
        });
        getGroupPostStats({ id: parentId });
      }
    }
  };

  handleResetError = () => {
    const { resetResponseError } = this.props;
    resetResponseError();
  };

  handleLikePress = item => {
    const {
      updateLikeDislikeOnComment,
      groupPostLiked,
      isArticleLikesUpdating,
    } = this.props;
    const id = pathOr("", ["group", "id"], item);
    const commentId = pathOr("", ["id"], item);
    const isLiked = this.isPostLiked(groupPostLiked, commentId);
    if (!isArticleLikesUpdating) {
      updateLikeDislikeOnComment({
        id,
        commentId,
        type: isLiked ? TYPE_DISLIKE : TYPE_LIKE,
      });
    }
  };

  handleReplyPress = item => {
    this.setState({ selectedComment: item, enableComment: true });
  };

  handleViewAllPress = item => {
    const { getChildGroupPosts, groupPostChildComments } = this.props;
    const id = pathOr("", ["id"], item);
    const lastPage = this.getLastPage(id, groupPostChildComments);
    const nextPage = (parseInt(lastPage) + 1).toString();
    const loadMoreComments = this.getLoadMoreFlag(id, groupPostChildComments);

    if (lastPage === INITIAL_PAGE && !loadMoreComments) {
      getChildGroupPosts({
        id: id,
        type: TYPE_COMMENT,
        page: INITIAL_PAGE,
        pageSize: COMMENTS_THRESHOLD,
      });
    }
    if (loadMoreComments) {
      getChildGroupPosts({
        id: id,
        type: TYPE_COMMENT,
        page: nextPage,
        pageSize: COMMENTS_THRESHOLD,
      });
    }

    this.setState({ showChildComment: !this.state.showChildComment });
  };

  handleOnEndReached = () => {
    const { groupPostComments, navigation, getCommentsByGroupId } = this.props;
    const groupId = pathOr("", ["state", "params", "groupId"], navigation);
    const lastPage = this.getLastPage(groupId, groupPostComments);
    const nextPage = (parseInt(lastPage) + 1).toString();
    const loadMoreComments = this.getLoadMoreFlag(groupId, groupPostComments);
    if (loadMoreComments) {
      getCommentsByGroupId({
        id: groupId,
        type: TYPE_COMMENT,
        page: nextPage,
        pageSize: COMMENTS_THRESHOLD,
      });
    }
  };

  renderComment = item => {
    const { groupPostChildComments, groupPostLiked } = this.props;
    const id = pathOr("", ["id"], item);
    const replayCount = pathOr(0, ["attributes", "stats", "comments"], item);
    const childComments = this.getLatestComments(id, groupPostChildComments);
    return (
      <CommentBox
        data={item}
        childItems={childComments}
        viewAll={replayCount !== 0}
        fromCommentsUI={true}
        likePress={this.handleLikePress}
        replyPress={this.handleReplyPress}
        viewAllPress={this.handleViewAllPress}
        groupPostLiked={groupPostLiked}
        showChildComment={this.state.showChildComment}
      />
    );
  };

  render() {
    const {
      groupPostList,
      groupPostLiked,
      navigation,
      error,
      groupPostComments,
      groupPostChildComments,
    } = this.props;
    const { enableComment, keyboardshown } = this.state;
    const commentsCap = this.MetaConstants.commentsCap;
    const enterYourComment = this.MetaConstants.enterYourComment;
    const groupId = pathOr("", ["state", "params", "groupId"], navigation);
    const postType = pathOr("image", ["state", "params", "type"], navigation);
    const imageUrl = pathOr("", ["state", "params", "imageUrl"], navigation);
    const desc = pathOr("", ["state", "params", "desc"], navigation);
    const parentId = pathOr("", ["state", "params", "parentId"], navigation);
    const title = pathOr("", ["state", "params", "title"], navigation);
    const fromCommunity = pathOr(false, ["state", "params", "fromCommunity"], navigation);
    const filteredPost = this.getFilteredPost(groupPostList, !fromCommunity ? groupId : parentId);
    const likesCount = pathOr(0, ["allCount", "likes"], filteredPost);
    const dislikesCount = pathOr(0, ["allCount", "dislike"], filteredPost);
    const commentsCount = pathOr(0, ["allCount", "comments"], filteredPost);
    const filteredComments = !fromCommunity ? this.getLatestComments(groupId, groupPostComments) :
      this.getLatestComments(parentId, groupPostChildComments);
    const sharesCount = pathOr(0, ["allCount", "shares"], filteredPost);
    const totalCount = likesCount - dislikesCount;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <PruBackHeader
            title={commentsCap}
            viewComment={true}
            customStyles={styles.customStyles}
          />
          <LikeCommentSmall
            isLiked={true}
            likeCount={totalCount < 0 ? 0 : totalCount}
            commentCount={commentsCount}
            shareCount={sharesCount}
            onCommentPress={() => { }}
          />
        </View>
        <ArticleDescription
          title={title}
          desc={desc}
          imageUrl={imageUrl}
          type={postType}
        />
        <MultipleButtons
          buttonList={this.getButtonList(groupId, groupPostLiked)}
          onButtonClick={this.handleButtonClick}
        />
        <View
          style={
            enableComment ? styles.flatListViewWithSpace : styles.flatListView
          }
        >
          <FlatList
            data={filteredComments}
            renderItem={({ item }) => this.renderComment(item)}
            extraData={this.props}
            onEndReached={({ distanceFromEnd }) => {
              this.handleOnEndReached();
            }}
            onEndReachedThreshold={0.5}
          />
        </View>
        {enableComment && (
          <View
            style={
              keyboardshown
                ? styles.commentInputContainerUp
                : styles.commentInputContainer
            }
          >
            <CommentInput
              type={true}
              label={enterYourComment}
              onSendText={this.handleSendText}
              error={enableComment && error ? error : null}
              resetError={this.handleResetError}
            />
          </View>
        )}
      </View>
    );
  }
}

ViewAllComments.propTypes = {
  groupPostList: PropTypes.array,
  groupPostLiked: PropTypes.array,
  groupPostComments: PropTypes.array,
  groupPostChildComments: PropTypes.array,
  navigation: PropTypes.object,
  getChildGroupPosts: PropTypes.func,
  getCommentsByGroupId: PropTypes.func,
  updateLikeAndDislike: PropTypes.func,
  sendComment: PropTypes.func,
  updateLikeDislikeOnComment: PropTypes.func,
  sendCommentOnComment: PropTypes.func,
  error: PropTypes.object,
  resetResponseError: PropTypes.func,
  isArticleLikesUpdating: PropTypes.bool,
  isLikesUpdating: PropTypes.bool,
};

const mapStateToProps = (state, props) => {
  return {
    userAgent: state.auth.userAgent,
    groupPostList: state.likecomment.groupPostList,
    groupPostLiked: state.likecomment.groupPostLiked,
    groupPostComments: state.likecomment.groupPostComments,
    groupPostChildComments: state.likecomment.groupPostChildComments,
    error: state.likecomment.error,
    isLiked: likeSelector(
      state,
      path(["navigation", "state", "params", "postData", "id"], props)
    ),
    isLikesUpdating: pathOr(false, ["affinityGroup", "isLikesUpdating"], state),
    isArticleLikesUpdating: pathOr(
      false,
      ["likecomment", "isLikesUpdating"],
      state
    ),
  };
};

export default connect(mapStateToProps, {
  getGroupPostStats,
  getCommentsByGroupId,
  updateLikeAndDislike,
  sendComment,
  updateLikeDislikeOnComment,
  sendCommentOnComment,
  getChildGroupPosts,
  resetResponseError,
  updateShare,
  likePost: payload => ({
    context: affinityGroupScreens.affinityGroupWallScreen,
    type: affinityGroupActions.likePost,
    payload: {
      type: "LIKE",
      parent: { id: payload.postId },
      group: payload.group,
    },
  }),
  unlikePost: payload => ({
    context: affinityGroupScreens.affinityGroupWallScreen,
    type: affinityGroupActions.unlikePost,
    payload: {
      type: "DISLIKE",
      parent: { id: payload.postId },
      group: payload.group,
    },
  }),
})(ViewAllComments);
