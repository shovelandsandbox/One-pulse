/* eslint-disable react/require-optimization */

import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import PropTypes from "prop-types";
import styles from "./styles";
import MultipleButtons from "./Component/MultipleButtons";
import { CoreServices } from "@pru-rt-internal/pulse-common";
const { NavigationService } = CoreServices;
import { HC_LIKE, HC_COMMENT, HC_SHARE, HC_LIKED } from "../../config/images";
// import Share from "react-native-share";
import {
  initializeDynamicLink,
  createDynamicLink,
} from "../../utils/DynamicLinkUtil";
import {
  getGroupPostStats,
  getCommentsByGroupId,
  updateLikeAndDislike,
  sendComment,
  updateLikeDislikeOnComment,
  sendCommentOnComment,
  resetResponseError,
  updateShare,
} from "./actions";
import LikeCommentSmall from "./Component/LikeCommentSmall";
import CommentBox from "./Component/CommentBox";
import CommentInput from "./Component/CommentInput";
import MetaConstants from "./meta";
import constants from "./configs/constants";

const { TYPE_COMMENT, TYPE_DISLIKE, TYPE_SHARE, TYPE_LIKE } = constants;

class LikeAndComments extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      enableComment: false,
      selectedComment: null,
    };
    this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    const { groupId, getGroupPostStats, getCommentsByGroupId } = this.props;
    if (groupId) {
      getGroupPostStats({ id: groupId });
      getCommentsByGroupId({ id: groupId, type: TYPE_COMMENT });
    }
  }

  getFilteredPost = (groupPostList, groupId) => {
    const index = groupPostList.findIndex(el => el.id == groupId);
    if (index !== -1) {
      return groupPostList[index];
    }
    return {};
  };

  isPostLiked = (groupPostLiked, groupId) => {
    const index = groupPostLiked.findIndex(el => el == groupId);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  getLatestComment = (groupId, groupPostComments) => {
    const index = groupPostComments.findIndex(el => el.id == groupId);
    if (index !== -1) {
      const comments = groupPostComments[index].comments;
      return comments[0];
    }
    return null;
  };

  updateLikeDislike = () => {
    const {
      groupId,
      updateLikeAndDislike,
      groupPostLiked,
      isArticleLikesUpdating,
    } = this.props;
    const isLiked = this.isPostLiked(groupPostLiked, groupId);
    if (!isArticleLikesUpdating) {
      updateLikeAndDislike({
        id: groupId,
        type: isLiked ? TYPE_DISLIKE : TYPE_LIKE,
        parent: { id: "" },
      });
    }
  };

  onShare = async (articleData, url) => {
    const { updateShare } = this.props;
    const fitter_with_app = this.MetaConstants.shareMessage;
    const { title, desc, uri, groupId } = articleData;
    const imageUrl = uri;
    initializeDynamicLink(this.props.userAgent);
    const queryParams = {
      screenId: "WebView",
      screenParams: `uri^${url}|groupId^${groupId}`,
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

  handleButtonClick = item => {
    const { articleData, uri } = this.props;
    switch (item.type) {
      case "SHARE":
        this.onShare(articleData, uri);
        break;
      case "LIKE":
        this.updateLikeDislike();
        break;
      case "COMMENT":
        this.handleCommentIconPress();
        break;
    }
  };

  handleViewAllPress = () => {
    const { groupId, articleData, type } = this.props;
    const { uri, title, desc } = articleData;
    NavigationService.navigate("ViewAllComments", {
      groupId,
      imageUrl: uri,
      title,
      desc,
      uri: this.props.uri,
      type,
    });
  };

  handleCommentIconPress = () => {
    this.setState(prevState => ({
      enableComment: !prevState.enableComment,
    }));
  };

  handleSendText = msg => {
    const { groupId, sendComment, sendCommentOnComment } = this.props;
    const { selectedComment } = this.state;
    if (selectedComment) {
      const id = pathOr("", ["group", "id"], selectedComment);
      const commentId = pathOr("", ["id"], selectedComment);
      sendCommentOnComment({
        id,
        commentId,
        type: TYPE_COMMENT,
        message: msg,
      });
      this.setState({ selectedComment: null });
    } else {
      sendComment({ id: groupId, type: TYPE_COMMENT, message: msg });
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

  getButtonList(groupId, groupPostLiked) {
    const { isShareDisabled } = this.props;
    const isPostLiked = this.isPostLiked(groupPostLiked, groupId);
    const likeCap = this.MetaConstants.likeCap;
    const commentCap = this.MetaConstants.commentCap;
    const shareCap = this.MetaConstants.shareCap;

    const like = {
      type: TYPE_LIKE,
      text: likeCap,
      image: {
        source: isPostLiked ? HC_LIKED : HC_LIKE,
        height: 14,
        width: 17,
      },
    };

    const share = {
      type: TYPE_SHARE,
      text: shareCap,
      image: { source: HC_SHARE, height: 14, width: 12 },
    };

    const comment = {
      type: TYPE_COMMENT,
      text: commentCap,
      image: { source: HC_COMMENT, height: 14, width: 18 },
    };

    return isShareDisabled ? [like, comment] : [like, share, comment];
  }

  render() {
    const {
      groupPostList,
      groupId,
      groupPostLiked,
      groupPostComments,
      error,
      showSeperator,
    } = this.props;
    const { enableComment } = this.state;
    const enterYourComment = this.MetaConstants.enterYourComment;

    const filteredPost = this.getFilteredPost(groupPostList, groupId);
    const likesCount = pathOr(0, ["allCount", "likes"], filteredPost);
    const dislikesCount = pathOr(0, ["allCount", "dislike"], filteredPost);
    const commentsCount = pathOr(0, ["allCount", "comments"], filteredPost);
    const sharesCount = pathOr(0, ["allCount", "shares"], filteredPost);
    const filteredComment = this.getLatestComment(groupId, groupPostComments);
    const totalCount = likesCount - dislikesCount;
    return (
      <View style={styles.container}>
        <LikeCommentSmall
          isLiked={true}
          likeCount={totalCount < 0 ? 0 : totalCount}
          commentCount={commentsCount}
          shareCount={sharesCount}
          onCommentPress={this.handleViewAllPress}
        />
        <MultipleButtons
          buttonList={this.getButtonList(groupId, groupPostLiked)}
          onButtonClick={this.handleButtonClick}
        />
        {filteredComment && (
          <CommentBox
            data={filteredComment}
            groupPostLiked={groupPostLiked}
            viewAll={false}
            viewAllPress={this.handleViewAllPress}
            likePress={this.handleLikePress}
            replyPress={this.handleReplyPress}
          />
        )}
        {enableComment && (
          <CommentInput
            label={enterYourComment}
            onSendText={this.handleSendText}
            error={enableComment && error ? error : null}
            resetError={this.handleResetError}
          />
        )}
        {showSeperator && <View style={styles.seperator} />}
      </View>
    );
  }
}

LikeAndComments.propTypes = {
  groupId: PropTypes.string,
  groupPostList: PropTypes.array,
  groupPostLiked: PropTypes.array,
  groupPostComments: PropTypes.array,
  articleData: PropTypes.object,
  getGroupPostStats: PropTypes.func,
  getCommentsByGroupId: PropTypes.func,
  updateLikeAndDislike: PropTypes.func,
  sendComment: PropTypes.func,
  updateLikeDislikeOnComment: PropTypes.func,
  sendCommentOnComment: PropTypes.func,
  resetResponseError: PropTypes.func,
  error: PropTypes.object,
  isArticleLikesUpdating: PropTypes.bool,
  isShareDisabled: PropTypes.bool,
};

LikeAndComments.defaultProps = {
  showSeperator: true,
};

const mapStateToProps = state => {
  return {
    groupPostList: state.likecomment.groupPostList,
    userAgent: state.auth.userAgent,
    groupPostLiked: state.likecomment.groupPostLiked,
    groupPostComments: state.likecomment.groupPostComments,
    error: state.likecomment.error,
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
  resetResponseError,
  updateShare,
})(LikeAndComments);
