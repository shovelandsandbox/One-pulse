import screens from "./configs/screenNames";
import actions from "./configs/actionNames";

const context = screens.LIKES_AND_COMMENTS;

export const updateLikeAndDislike = ({ type, parent, id }) => ({
  context,
  type: actions.updateLikeDislike,
  payload: {
    type,
    parent,
    group: {
      id,
    },
  },
});

export const sendComment = ({ type, id, message, parent }) => ({
  context,
  type: actions.createComment,
  payload: {
    type,
    group: {
      id,
    },
    message,
    parent,
  },
});

export const getGroupPostStats = ({ id }) => ({
  context,
  type: actions.getGroupPostStats,
  payload: {
    id,
  },
});

export const getCommentsByGroupId = ({ type, id, page, pageSize }) => ({
  context,
  type: actions.getCommentsById,
  payload: {
    type,
    id,
    page,
    pageSize,
  },
});

export const updateLikeDislikeOnComment = ({ type, id, commentId }) => ({
  context,
  type: actions.updateLikeDislikeOnComment,
  payload: {
    type,
    group: {
      id,
    },
    parent: {
      id: commentId,
    },
  },
});

export const sendCommentOnComment = ({ type, id, commentId, message }) => ({
  context,
  type: actions.createCommentOnComment,
  payload: {
    type,
    group: {
      id,
    },
    parent: {
      id: commentId,
    },
    message,
  },
});

export const getChildGroupPosts = ({ type, id, page, pageSize }) => ({
  context,
  type: actions.getChildGroupPosts,
  payload: {
    id,
    type,
    page,
    pageSize,
  },
});

export const resetResponseError = () => ({
  type: actions.resetError,
});

export const updateShare = ({ id, type }) => ({
  context,
  type: actions.updateShare,
  payload: {
    type,
    group: {
      id,
    },
  },
});
