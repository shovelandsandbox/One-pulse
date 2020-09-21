import { affinityGroupActions as actions } from "../configs/affinity-group-actions";
import { pathOr, path, findIndex, omit } from "ramda";
import constants from "../configs/constants";

export const INITIAL_STATE = {
  currentPost: {
    post: undefined,
    
    comments: [],
    pagination: {
      page: 0,
      done: false,
    },
  },
  isLikesUpdating: false,
  likes: {},
};

// eslint-disable-next-line complexity
export const postsReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case actions.getGroupPostsSuccess:
      return {
        ...state,
        currentGroup: getGroupPosts(state.currentGroup, payload),
      };
    case actions.getPostCommentsSuccess:
      return {
        ...state,
        currentPost: getPostComments(state.currentPost, payload),
      };
    case actions.getGroupPostByIdSuccess:
      return getGroupPostById(state, payload);
    case actions.toggleCommentLikeSuccess:
      return toggleCommentLikeSuccess(state, payload);
    case actions.setCurrentPost:
      return setCurrentPost(state, payload);
    case actions.uploadDocumentSuccess: {
      return {
        ...state,
        uploadingDocument: true,
        documentId: action.payload.id,
      };
    }
    case actions.uploadDocumentFailure: {
      return {
        ...state,
        uploadingDocument: false,
        documentId: "",
      };
    }
    case actions.likePost: {
      return {
        ...state,
        isLikesUpdating: true
      }
    }
    case actions.likePostFailure: {
      return {
        ...state,
        isLikesUpdating: false
      }
    }

    case actions.likePostSuccess: {
      return likePost(state, payload);
    }

    case actions.unlikePost: {
      return {
        ...state,
        isLikesUpdating: true
      }
    }
    case actions.unlikePostFailure: {
      return {
        ...state,
        isLikesUpdating: false
      }
    }

    case actions.unlikePostSuccess: {
      return unlikePost(state, payload);
    }

    case actions.likeCommentSuccess: {
      return toggleComment(state, payload, true);
    }
    case actions.unlikeCommentSuccess: {
      return toggleComment(state, payload, false);
    }
  }
};

const toggleComment = (state, payload, like) => {
  const countUpdate = like ? 1 : -1;
  const comments = state.currentPost.comments;
  const commentId = path(["actionPayload", "parent", "id"], payload);
  const comment = comments.find(obj => obj.id === commentId);
  const commentIndex = comments.findIndex(obj => obj.id === commentId);

  //change the count
  const currentPost = {
    ...state.currentPost,
    comments: Object.assign([...comments], {
      [commentIndex]: {
        ...comment,
        attributes: {
          ...comment.attributes,
          stats: {
            ...comment.attributes.stats,
            likes: comment.attributes.stats.likes + countUpdate,
          },
        },
      },
    }),
  };

  const likes = like
    ? {
      ...state.likes,
      [path(["request", "body", "parent", "id"], payload)]: true, //add to cache
    }
    : omit([path(["request", "body", "parent", "id"], payload)], state.likes); //remove from cache

  return {
    ...state,
    currentPost,
    likes,
  };
};

const likePost = (state, payload) => {
  const post = state.currentPost.post;
  let currentPost = state.currentPost;

  if (post && typeof post === "object") {
    currentPost = {
      ...state.currentPost,
      post: getUpdatedPost(
        state.currentPost.post,
        path(["request", "body", "parent", "id"], payload),
        true
      ),
    };
  }

  let currentGroup = state.currentGroup;

  if (currentGroup.posts && pathOr(0, ["posts", "length"], currentGroup) > 0) {
    currentGroup = {
      ...state.currentGroup,
      posts: getUpdatedPost(
        state.currentGroup.posts,
        path(["request", "body", "parent", "id"], payload),
        true
      ),
    };
  }

  return {
    ...state,
    likes: {
      ...state.likes,
      [path(["request", "body", "parent", "id"], payload)]: true,
    },
    currentGroup,
    currentPost,
    isLikesUpdating: false
  };
};

const unlikePost = (state, payload) => {
  const post = state.currentPost.post;
  let currentPost = state.currentPost;

  if (typeof post === "object") {
    currentPost = {
      ...state.currentPost,
      post: getUpdatedPost(
        state.currentPost.post,
        path(["request", "body", "parent", "id"], payload),
        false
      ),
    };
  }

  let currentGroup = state.currentGroup;

  if (currentGroup.posts && pathOr(0, ["posts", "length"], currentGroup) > 0) {
    currentGroup = {
      ...state.currentGroup,
      posts: getUpdatedPost(
        state.currentGroup.posts,
        path(["request", "body", "parent", "id"], payload),
        false
      ),
    };
  }

  return {
    ...state,
    likes: omit(
      [path(["request", "body", "parent", "id"], payload)],
      state.likes
    ),
    currentGroup,
    currentPost,
    isLikesUpdating: false
  };
};
const getUpdatedPost = (posts, id, like) => {
  const countUpdate = like ? 1 : -1;

  if (posts && pathOr(0, ["length"], posts)) {
    const post = posts.find(obj => obj.id === id);
    const postIndex = posts.findIndex(obj => obj.id === id);
    return Object.assign([...posts], {
      [postIndex]: {
        ...post,
        attributes: {
          ...post.attributes,
          stats: {
            ...post.attributes.stats,
            likes: post.attributes.stats.likes + countUpdate,
          },
        },
        liked: like,
      },
    });
  }

  return {
    ...posts,
    attributes: {
      ...posts.attributes,
      stats: {
        ...posts.attributes.stats,
        likes: posts.attributes.stats.likes + countUpdate,
      },
    },
    liked: like,
  };
};

const toggleCommentLikeSuccess = (state, payload) => {
  const body = path(["request", "body"], payload);
  const currentPost = { ...state.currentPost };
  const idx = findIndex(g => g.id === body.commentId, currentPost.comments);
  currentPost.comments = [...currentPost.comments];
  currentPost.comments[idx].properties.liked = body.liked;

  return {
    ...state,
    currentPost,
  };
};

const setCurrentPost = (state, payload) => {
  const currentPost = payload || INITIAL_STATE.currentPost;
  return {
    ...state,
    currentPost,
  };
};

const getGroupPosts = (state, payload) => {
  const body = pathOr([], ["response", "body"], payload);
  const page = Number(pathOr(0, ["request", "page"], payload));

  const pagination = getPaginationState(page, constants.POSTS_PAGE_SIZE, body);

  if (!body.length) {
    return {
      ...state,
      pagination,
    };
  }

  //if reload is true then replace the entire list
  const reload = payload.actionPayload.reload;
  return {
    ...state,
    posts: reload
      ? body
      : merge(state.posts, page, constants.POSTS_PAGE_SIZE, body),
    pagination,
  };
};

const merge = (arr = [], page, pageSize, result = []) => {
  const leftBoundaryEnd = page * pageSize;
  const left = arr.slice(0, leftBoundaryEnd);

  const rightBoundaryStart = leftBoundaryEnd + pageSize;
  const right = arr.slice(rightBoundaryStart);

  return [...left, ...result, ...right];
};

const getPaginationState = (page = 0, pageSize, result = []) => {
  let nextPagination = { page: page + 1, done: false };
  if (!result.length || result.length < pageSize) {
    nextPagination = {
      page,
      done: true,
    };
  }
  return nextPagination;
};

const getPostComments = (state, payload) => {
  const body = pathOr([], ["response", "body"], payload);
  const page = Number(pathOr(0, ["request", "page"], payload));

  const pagination = getPaginationState(
    page,
    constants.COMMENTS_PAGE_SIZE,
    body
  );

  if (!body.length) {
    return {
      ...state,
      pagination,
    };
  }
  //if reload is true then replace the entire list
  const reload = payload.actionPayload.reload;
  return {
    ...state,
    comments: reload
      ? body
      : merge(state.comments, page, constants.COMMENTS_PAGE_SIZE, body),
    pagination,
  };
};

const getGroupPostById = (state, payload) => {
  const post = path(["response", "body"], payload);
  const currentPost = { ...state.currentPost, post };

  //update the post object from the list instead of fetching the entire group list from backend
  //current group might not be set if we come from notifications page
  const currentGroup = state.currentGroup || INITIAL_STATE.currentGroup;
  const newCurrentGroupState = {
    ...currentGroup,
    posts: currentGroup.posts.map(p => {
      return p.id === post.id ? post : p;
    }),
  };

  return {
    ...state,
    currentPost,
    currentGroup: newCurrentGroupState,
  };
};
