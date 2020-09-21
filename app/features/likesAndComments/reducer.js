import actions from "./configs/actionNames";
import { pathOr } from "ramda";
import constants from "./configs/constants";

const { INITIAL_PAGE } = constants;

const INITIAL_STATE = {
  groupPostList: [],
  groupPostLiked: [],
  groupPostComments: [],
  groupPostChildComments: [],
  error: null,
  isLikesUpdating: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.updateLikeDislikeOnCommentSuccess:
    case actions.updateLikeDislikeSuccess: {
      const id = action.payload.id;
      const type = action.payload.type;
      let filterdGroupLiked = state.groupPostLiked;
      const index = filterdGroupLiked.findIndex(el => el == id);
      if (type == "DISLIKE") {
        filterdGroupLiked = state.groupPostLiked.filter(el => el !== id);
      } else {
        if (index == -1) {
          filterdGroupLiked.push(id);
        }
      }
      return {
        ...state,
        groupPostLiked: filterdGroupLiked,
        isLikesUpdating: false,
      };
    }

    case actions.getGroupPostStatsSuccess: {
      const { id } = action.payload.likecommentObj;
      const response = action.payload.likecommentObj;
      const index = state.groupPostList.findIndex(p => p.id === id);

      if (index === -1) {
        state.groupPostList.push(response);
      } else {
        state.groupPostList[index] = response;
      }
      return {
        ...state,
        groupPostList: [...state.groupPostList],
      };
    }
    case actions.getCommentsByIdSuccess: {
      const { id } = action.payload.postCommentsObject;
      const response = action.payload.postCommentsObject;
      const index = state.groupPostComments.findIndex(p => p.id === id);

      if (index === -1) {
        state.groupPostComments = [];
        state.groupPostComments.push(response);
      } else {
        if (response.page !== INITIAL_PAGE) {
          const tempComments = state.groupPostComments[index].comments;
          response.comments = tempComments.concat(response.comments);
        }
        state.groupPostComments[index] = response;
      }
      return {
        ...state,
        groupPostComments: [...state.groupPostComments],
      };
    }

    case actions.getChildGroupPostsSuccess: {
      const { id } = action.payload.postCommentsObject;
      const response = action.payload.postCommentsObject;
      const index = state.groupPostChildComments.findIndex(p => p.id === id);
      if (index === -1) {
        state.groupPostChildComments.push(response);
      } else {
        if (response.page !== INITIAL_PAGE) {
          const tempComments = state.groupPostChildComments[index].comments;
          response.comments = tempComments.concat(response.comments);
        }
        state.groupPostChildComments[index] = response;
      }
      return {
        ...state,
        groupPostChildComments: [...state.groupPostChildComments],
      };
    }
    case actions.createCommentOnCommentFailure:
    case actions.createCommentFailure: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case actions.resetError:
    case actions.createCommentOnCommentSuccess:
    case actions.createCommentSuccess: {
      return {
        ...state,
        error: null,
      };
    }

    case actions.updateLikeDislike:
    case actions.updateLikeDislikeOnComment: {
      return {
        ...state,
        isLikesUpdating: true,
      };
    }

    case actions.updateLikeDislikeFailure:
    case actions.updateLikeDislikeOnCommentFailure: {
      return {
        ...state,
        isLikesUpdating: false,
      };
    }

    default:
      return state;
  }
};
