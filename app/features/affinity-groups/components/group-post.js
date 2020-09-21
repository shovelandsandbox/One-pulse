import { pathOr, path } from "ramda";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { PureComponent } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import Colors from "../utils/colors";
import PostUtils from "../utils/post";
import { gotoWithParams } from "../../../actions";
import affinityGroupScreens from "../../../utils/configs/screen-names";
import { affinityGroupActions } from "../configs/affinity-group-actions";
import { COMMENT, HEART_FILLED, HC_SHARE } from "../../../../assets/images/affinityGroup";
import InlineComment from "./inline-comment";
import ActionBar from "./actions-bar";
import { registerEvent } from "../../../utils/registerEvents/actions";
import { likeSelector } from "../selectors";
import { eventNames } from "../events";
import { metaFinderAG } from "../utils/meta-utils";
import DateUtils from "../utils/date";

class GroupPost extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      enableComment: false,
    };
  }

  renderPostHeader() {
    const { data } = this.props;

    const isArticle = pathOr(
      "",
      ["group", "groupActivity", "content", "content"],
      data
    );
    // const actions = [
    //   {
    //     icon: "ellipsis-v",
    //   },
    // ];
    if (!isArticle) {
      return PostUtils.getPostHeader(data);
    }
  }

  renderPostBody = () => {
    const { data, queryParams = "" } = this.props;
    const options = { preview: true, isPreview: true, queryParams };
    if (data.document) {
      switch (data.document.contentType) {
        case "image/jpg":
          return PostUtils.getPhotoPost(data, options, this.handlePressOnPost);
        case "application/pdf":
          return PostUtils.getFilePost(data, options, this.handlePressOnPost);
        case "video/mp4":
          return PostUtils.getVideoPost(data, options, this.handlePressOnPost);
        default:
          return PostUtils.getLinkPost(data, options, this.handlePressOnPost);
      }
    }
    return PostUtils.getTextPost(data, options, this.handlePressOnPost);
  };

  toggleCommentBox = () => {
    const { enableComment } = this.state;
    this.setState({ enableComment: !enableComment });
  };

  renderPostFooter = () => {
    const { data } = this.props;
    const { isLiked } = this.props;
    const stats = pathOr({}, ["attributes", "stats"], data);
    const { likes = 0, comments = 0 } = stats;

    const config = {
      isLiked,
      likeCount: likes,
      commentCount: comments,
      togglePostLike: this.togglePostLike,
      onCommentPress: this.toggleCommentBox,
      onShare: () => {
        const currentGroup = pathOr({}, ["currentGroup", "group"], this.props);
        this.props.registerEvent(eventNames.sharePost, {
          communityId: data.group.id,
          communityName: currentGroup.name,
          postId: data.id,
        });
      },
    };

    return <ActionBar config={config} post={data} />;
  };

  renderInlineComment = () => {
    const { data } = this.props;
    const style = {
      borderTopColor: Colors.veryLightGrey,
      borderTopWidth: 0.2,
    };

    const borderStyle = {
      borderColor: Colors.veryLightGrey,
      borderWidth: 0.5,
    };

    const textStyle = {
      paddingLeft: 10,
    };

    return (
      <InlineComment
        postId={data.id}
        group={data.group}
        postComment={this.onCommentPress}
        style={style}
        borderRadius={20}
        borderStyle={borderStyle}
        textStyle={textStyle}
      />
    );
  };

  onCommentPress = payload => {
    this.props.postComment(payload);
    this.toggleCommentBox();
    //events
    const currentGroup = pathOr({}, ["currentGroup", "group"], this.props);
    this.props.registerEvent(eventNames.commentPost, {
      communityId: currentGroup.id,
      communityName: currentGroup.name,
      postId: payload.postId,
    });
  };

  renderPostStats = () => {
    const { data } = this.props;
    const stats = pathOr({}, ["attributes", "stats"], data);
    const { likes = 0, comments = 0, dislike = 0, shares = 0 } = stats;
    let likeCount = likes - dislike;
    // if likes are less than 0 update to 0
    if (parseInt(likeCount) < 0) {
      likeCount = 0;
    }
    const likesText =
      likeCount != 1 ? metaFinderAG("Likes") : metaFinderAG("Like");
    const commentText =
      comments != 1 ? metaFinderAG("Comments") : metaFinderAG("Comment");


    return (
      <View style={styles.baseStatContainer}>
        <View style={styles.postStatContainer}>
          <View style={styles.postStatIcon}>
            <Image source={HEART_FILLED} style={styles.iconLike} />
            <Text style={styles.statText}>
              {likeCount} {likesText}
            </Text>
          </View>
          {
            shares != 0 &&
            <View style={styles.postStatIcon}>
              <Image source={HC_SHARE} style={styles.iconShare} />
              <Text style={styles.statText}>
                {shares} {metaFinderAG("Share")}
              </Text>
            </View>
          }
          <View style={styles.postStatIcon}>
            <Image source={COMMENT} style={styles.iconComment} />
            <Text style={styles.statText}>
              {comments} {commentText}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderGroupWallNotify = () => {
    const { data } = this.props;
    const postedOn = path(["auditDetail", "createTime"], data);
    const user = pathOr({}, ["customer"], data);

    const userName = `${user.firstName} ${user.surName}`;
    const timeSince = DateUtils.getTimeSince(postedOn);
    // const message = path(["message"], data);

    return (
      <View style={styles.groupNotifyArea}>
        <View style={styles.joinGroupMsg}>
          <Text style={styles.groupNotifyTextName}>{userName}</Text>
          <Text style={styles.groupNotifyText}>
            {` ${metaFinderAG("hasJoinGroup")}`}
          </Text>
        </View>
        <View style={styles.joinGroupMsg}>
          <Text style={styles.groupNotifyTextTime}>
            {`${timeSince} ${metaFinderAG("ago")}`}
          </Text>
        </View>
      </View>
    );
  };

  togglePostLike = () => {
    const { isLiked, isLikesUpdating } = this.props;
    const postId = path(["data", "id"], this.props);
    const group = path(["data", "group"], this.props);
    //events
    const currentGroup = pathOr({}, ["currentGroup", "group"], this.props);
    const eventName = isLiked ? eventNames.unlikePost : eventNames.likePost;
    this.props.registerEvent(eventName, {
      communityId: group.id,
      communityName: currentGroup.name,
      postId,
      postTitle: this.props.data.title,
    });
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

  handlePressOnPost = () => {
    const articleUrl = pathOr(
      "",
      ["group", "groupActivity", "content", "content"],
      this.props.data
    );
    const groupId = pathOr("", ["group", "id"], this.props.data);
    const parentId = pathOr("", ["id"], this.props.data);
    if (articleUrl) {
      this.props.gotoWithParams("WebView", {
        uri: articleUrl,
        groupId: groupId,
        parentId: parentId,
        fromCommunity: true,
        postData: this.props.data,
      });
    } else {
      this.props.gotoWithParams(affinityGroupScreens.affinityGroupPostScreen, {
        postId: this.props.data.id,
      });
    }
    const group = pathOr({}, ["currentGroup", "group"], this.props);
    this.props.registerEvent(eventNames.viewPost, {
      communityId: group.id,
      communityName: group.name,
      postId: this.props.data.id,
    });
  };

  render() {
    const { showFooter } = this.props;
    const { enableComment } = this.state;
    const { type } = this.props;
    // if (type === "COMMENT") {
    //   return this.renderGroupWallNotify();
    // }
    return (
      <View>
        <View style={styles.innerContainer}>
          {this.renderPostHeader()}
          {this.renderPostBody()}
          {this.renderPostStats()}
        </View>

        <View>
          {showFooter && this.renderPostFooter()}
          {enableComment && this.renderInlineComment()}
        </View>
      </View>
    );
  }
}

GroupPost.propTypes = {
  data: PropTypes.object,
  gotoWithParams: PropTypes.func,
  likePost: PropTypes.func,
  showFooter: PropTypes.func,
  postComment: PropTypes.func,
  registerEvent: PropTypes.func,
  isLiked: PropTypes.bool,
  unlikePost: PropTypes.func,
  type: PropTypes.string,
  queryParams: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  currentGroup: path(["affinityGroup", "currentGroup"], state),
  isLiked: likeSelector(state, path(["data", "id"], props)),
  isLikesUpdating: pathOr(false, ["affinityGroup", "isLikesUpdating"], state),
  queryParams: path(["meta", "countryCommonMeta", "queryParams"], state),

});

const mapDispatchToProps = {
  gotoWithParams,
  registerEvent,
  setCurrentPost: payload => ({
    type: affinityGroupActions.setCurrentPost,
    payload,
  }),
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
  postComment: payload => {
    return {
      context: affinityGroupScreens.affinityGroupWallScreen,
      type: affinityGroupActions.addPostComments,
      payload: {
        type: "COMMENT",
        message: payload.message,
        parent: { id: payload.postId },
        group: payload.group,
      },
    };
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPost);

const styles = StyleSheet.create({
  baseStatContainer: {
    backgroundColor: Colors.baseBackground,
  },
  groupNotifyArea: {
    backgroundColor: Colors.veryLightBlue,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingVertical: 10,
  },
  groupNotifyText: {
    color: Colors.darkGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 12,
    textAlign: "center",
  },
  groupNotifyTextName: {
    color: Colors.darkGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  groupNotifyTextTime: {
    color: Colors.darkGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 10,
    textAlign: "center",
  },
  iconComment: {
    height: 14,
    width: 14,
  },
  iconLike: {
    height: 14,
    width: 16,
  },
  iconShare: {
    height: 15,
    resizeMode: "contain",
    width: 15,
  },
  innerContainer: {
    backgroundColor: Colors.baseBackground,
    paddingBottom: 10,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  joinGroupMsg: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 20,
    paddingVertical: 1,
  },
  postStatContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  postStatIcon: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  statText: {
    fontFamily: "Avenir-Regular",
    fontSize: 10,
    paddingHorizontal: 5,
    textAlign: "center",
  },
});
