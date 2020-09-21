import screens from "../screenNames";
import actions from "../actionNames";
import { buildPayload } from "../../../../utils/apiUtils";
import { pathOr, path } from "ramda";
import constants from "../constants";

const { TYPE_COMMENT, INITIAL_PAGE, COMMENTS_THRESHOLD } = constants;

export default {
  [screens.LIKES_AND_COMMENTS]: {
    [actions.updateLikeDislike]: {
      payloadBuilder: (store, action) => {
        const group = pathOr({}, ["payload", "group"], action);
        const type = pathOr("", ["payload", "type"], action);
        const parent = pathOr(undefined, ["payload", "parent"], action);
        const id = pathOr("", ["id"], parent);
        let body = {};
        if (id) {
          body = {
            parent,
            group,
            type,
          };
        } else {
          body = {
            group,
            type,
          };
        }
        return buildPayload(store, "createGroupPost", null, body, null);
      },
      loader: true,
    },
    [actions.createComment]: {
      payloadBuilder: (store, action) => {
        const group = pathOr({}, ["payload", "group"], action);
        const type = pathOr(TYPE_COMMENT, ["payload", "type"], action);
        const message = pathOr(null, ["payload", "message"], action);
        const parent = pathOr(undefined, ["payload", "parent"], action);
        const body = {
          group,
          type,
          message,
          parent,
        };
        return buildPayload(store, "createGroupPost", null, body, null);
      },
      loader: true,
    },
    [actions.getGroupPostStats]: {
      payloadBuilder: (store, action) => {
        const id = pathOr("", ["payload", "id"], action);
        const params = {
          id,
        };
        return buildPayload(store, "getGroupPostStats", null, null, params);
      },
      loader: false,
    },
    [actions.getCommentsById]: {
      payloadBuilder: (store, action) => {
        const id = pathOr("", ["payload", "id"], action);
        const type = pathOr(TYPE_COMMENT, ["payload", "type"], action);
        const page = pathOr(INITIAL_PAGE, ["payload", "page"], action);
        const pageSize = pathOr(
          COMMENTS_THRESHOLD,
          ["payload", "pageSize"],
          action
        );
        const params = {
          id,
          type,
          page,
          pageSize,
        };
        return buildPayload(store, "getGroupPosts", null, null, params);
      },
      loader: false,
    },
    [actions.updateLikeDislikeOnComment]: {
      payloadBuilder: (store, action) => {
        const group = pathOr("", ["payload", "group"], action);
        const type = pathOr("", ["payload", "type"], action);
        const parent = pathOr(undefined, ["payload", "parent"], action);
        const body = {
          type,
          group,
          parent,
        };
        return buildPayload(store, "createGroupPost", null, body, null);
      },
      loader: true,
    },
    [actions.createCommentOnComment]: {
      payloadBuilder: (store, action) => {
        const group = pathOr("", ["payload", "group"], action);
        const type = pathOr(TYPE_COMMENT, ["payload", "type"], action);
        const parent = pathOr(undefined, ["payload", "parent"], action);
        const message = pathOr(null, ["payload", "message"], action);
        const body = {
          type,
          group,
          parent,
          message,
        };
        return buildPayload(store, "createGroupPost", null, body, null);
      },
      loader: false,
    },
    [actions.getChildGroupPosts]: {
      payloadBuilder: (store, action) => {
        const id = pathOr("", ["payload", "id"], action);
        const type = pathOr(TYPE_COMMENT, ["payload", "type"], action);
        const page = pathOr(INITIAL_PAGE, ["payload", "page"], action);
        const pageSize = pathOr(
          COMMENTS_THRESHOLD,
          ["payload", "pageSize"],
          action
        );
        const params = {
          id,
          type,
          page,
          pageSize,
        };
        return buildPayload(store, "getChildGroupPosts", null, null, params);
      },
      loader: false,
    },
    [actions.updateShare]: {
      payloadBuilder: (store, action) => {
        const group = pathOr({}, ["payload", "group"], action);
        const type = pathOr("", ["payload", "type"], action);
        const body = {
          group,
          type,
        };
        return buildPayload(store, "createGroupPost", null, body, null);
      },
      loader: true,
    },
  },
};
