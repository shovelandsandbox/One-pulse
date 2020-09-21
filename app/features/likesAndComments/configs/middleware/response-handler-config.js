import screens from "../screenNames";
import actionNames from "../actionNames";
import { pathOr, path } from "ramda";
import constants from "../constants";
import MetaConstants from "../../meta";
import { CustomAlert } from "../../../../components";

const { INITIAL_PAGE, COMMENTS_THRESHOLD, TYPE_COMMENT } = constants;

const getLatestComments = (action, store) => {
  const state = store.getState();
  const id = pathOr("", ["payload", "actionPayload", "group", "id"], action);
  const parentId = pathOr(
    "",
    ["payload", "actionPayload", "parent", "id"],
    action
  );
  const groupPostChildComments = pathOr(
    [],
    ["likecomment", "groupPostChildComments"],
    state
  );
  const type = pathOr("", ["payload", "actionPayload", "type"], action);
  const parentCommentId =
    type === TYPE_COMMENT
      ? parentId
      : getParentCommentId(parentId, groupPostChildComments);
  store.dispatch({
    context: screens.LIKES_AND_COMMENTS,
    type: actionNames.getCommentsById,
    payload: {
      id,
      type: TYPE_COMMENT,
      page: INITIAL_PAGE,
      pageSize: COMMENTS_THRESHOLD,
    },
  });
  if (parentCommentId) {
    store.dispatch({
      context: screens.LIKES_AND_COMMENTS,
      type: actionNames.getChildGroupPosts,
      payload: {
        id: parentCommentId,
        type: TYPE_COMMENT,
        page: INITIAL_PAGE,
        pageSize: COMMENTS_THRESHOLD,
      },
    });
  }
};

const getParentCommentId = (parentId, groupPostChildComments) => {
  for (const postChildComment of groupPostChildComments) {
    const comment = postChildComment.comments.find(
      comment => comment.id === parentId
    );
    if (comment) {
      return pathOr(null, ["parent", "id"], comment);
    }
  }
};

const showError = response => {
  const metaConstants = { ...MetaConstants.initializeScreenMeta() };
  const errorCode = pathOr(
    0,
    ["payload", "response", "status", "code"],
    response
  );
  if (errorCode === 7380) {
    CustomAlert.show("", metaConstants.profanityError, {
      positiveText: metaConstants.modify,
    });
  }
};

export default {
  [screens.LIKES_AND_COMMENTS]: {
    [actionNames.updateLikeDislike]: {
      successAction: actionNames.updateLikeDislikeSuccess,
      postSuccessHook: payload => {
        const id = pathOr("", ["actionPayload", "group", "id"], payload);
        const type = pathOr("", ["actionPayload", "type"], payload);
        return {
          id,
          type,
        };
      },
      successHandler: (action, store) => {
        const { group } = action.payload.actionPayload;
        const { parent } = action.payload.actionPayload;
        const parentId = pathOr("", ["id"], parent);
        store.dispatch({
          context: screens.LIKES_AND_COMMENTS,
          type: actionNames.getGroupPostStats,
          payload: {
            id: group.id,
          },
        });
        if (parentId) {
          store.dispatch({
            context: screens.LIKES_AND_COMMENTS,
            type: actionNames.getGroupPostStats,
            payload: {
              id: parentId,
            },
          });
        }
      },
      failureAction: actionNames.updateLikeDislikeFailure,
      toggleLoader: false,
    },
    [actionNames.createComment]: {
      successAction: actionNames.createCommentSuccess,
      postSuccessHook: payload => {
        const id = pathOr("", ["actionPayload", "group", "id"], payload);
        const type = pathOr("", ["actionPayload", "type"], payload);
        return {
          id,
          type,
        };
      },
      successHandler: (action, store) => {
        const { group } = action.payload.actionPayload;
        const { parent } = action.payload.actionPayload;
        const parentId = pathOr("", ["id"], parent);
        store.dispatch({
          context: screens.LIKES_AND_COMMENTS,
          type: actionNames.getGroupPostStats,
          payload: {
            id: group.id,
          },
        });
        store.dispatch({
          context: screens.LIKES_AND_COMMENTS,
          type: actionNames.getCommentsById,
          payload: {
            id: group.id,
            type: TYPE_COMMENT,
            page: INITIAL_PAGE,
            pageSize: COMMENTS_THRESHOLD,
          },
        });
        if (parentId) {
          store.dispatch({
            context: screens.LIKES_AND_COMMENTS,
            type: actionNames.getGroupPostStats,
            payload: {
              id: parentId,
            },
          });
          store.dispatch({
            context: screens.LIKES_AND_COMMENTS,
            type: actionNames.getChildGroupPosts,
            payload: {
              id: parentId,
              type: TYPE_COMMENT,
              page: INITIAL_PAGE,
              pageSize: COMMENTS_THRESHOLD,
            },
          });
        }
      },
      failureAction: actionNames.createCommentFailure,
      failureHandler: response => {
        showError(response);
      },
      failureHook: payload => {
        return {
          code: pathOr(0, ["response", "status", "code"], payload),
          id: pathOr("", ["actionPayload", "group", "id"], payload),
          message: pathOr("", ["actionPayload", "message"], payload),
        };
      },
      toggleLoader: false,
    },
    [actionNames.getGroupPostStats]: {
      successAction: actionNames.getGroupPostStatsSuccess,
      postSuccessHook: payload => {
        const allCount = pathOr([], ["response", "body"], payload);
        const id = pathOr("", ["actionPayload", "id"], payload);
        return {
          likecommentObj: {
            allCount,
            id,
          },
        };
      },
      failureAction: actionNames.getGroupPostStatsFailure,
      // toggleLoader: false,
    },
    [actionNames.getCommentsById]: {
      successAction: actionNames.getCommentsByIdSuccess,
      postSuccessHook: payload => {
        const comments = pathOr([], ["response", "body"], payload);
        const id = pathOr("", ["actionPayload", "id"], payload);
        const page = pathOr(INITIAL_PAGE, ["actionPayload", "page"], payload);
        const loadMoreComments = comments.length == COMMENTS_THRESHOLD;
        return {
          postCommentsObject: {
            comments,
            id,
            page,
            loadMoreComments,
          },
        };
      },
      failureAction: actionNames.getCommentsByIdFailure,
      toggleLoader: false,
    },
    [actionNames.updateLikeDislikeOnComment]: {
      successAction: actionNames.updateLikeDislikeOnCommentSuccess,
      postSuccessHook: payload => {
        const id = pathOr("", ["actionPayload", "parent", "id"], payload);
        const type = pathOr("", ["actionPayload", "type"], payload);
        return {
          id,
          type,
        };
      },
      successHandler: (action, store) => {
        getLatestComments(action, store);
      },
      failureAction: actionNames.updateLikeDislikeOnCommentFailure,
      toggleLoader: false,
    },
    [actionNames.createCommentOnComment]: {
      successAction: actionNames.createCommentOnCommentSuccess,
      successHandler: (action, store) => {
        getLatestComments(action, store);
      },
      failureAction: actionNames.createCommentOnCommentFailure,
      failureHandler: response => {
        showError(response);
      },
      failureHook: payload => {
        return {
          code: pathOr(0, ["response", "status", "code"], payload),
          id: pathOr("", ["actionPayload", "group", "id"], payload),
          message: pathOr("", ["actionPayload", "message"], payload),
        };
      },
      toggleLoader: false,
    },
    [actionNames.getChildGroupPosts]: {
      successAction: actionNames.getChildGroupPostsSuccess,
      postSuccessHook: payload => {
        const comments = pathOr([], ["response", "body"], payload);
        const id = pathOr("", ["actionPayload", "id"], payload);
        const page = pathOr(INITIAL_PAGE, ["actionPayload", "page"], payload);
        const loadMoreComments = comments.length == COMMENTS_THRESHOLD;
        return {
          postCommentsObject: {
            comments,
            id,
            page,
            loadMoreComments,
          },
        };
      },
      failureAction: actionNames.getChildGroupPostsFailure,
      toggleLoader: false,
    },
    [actionNames.updateShare]: {
      successAction: actionNames.updateShareSuccess,
      successHandler: (action, store) => {
        const { group } = action.payload.actionPayload;
        store.dispatch({
          context: screens.LIKES_AND_COMMENTS,
          type: actionNames.getGroupPostStats,
          payload: {
            id: group.id,
          },
        });
      },
      failureAction: actionNames.updateShareFailure,
      toggleLoader: false,
    },
  },
};
