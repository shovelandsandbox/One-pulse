import { path , pathOr } from "ramda";
import affinityGroupScreens from "../../../utils/configs/screen-names";
import { affinityGroupActions } from "../configs/affinity-group-actions";
import constants from "../configs/constants";


import { buildPayload } from "../../../utils/apiUtils";

export default {
  [affinityGroupScreens.affinityGroupMainScreen]: {
    [affinityGroupActions.getAllGroups]: {
      payloadBuilder: (store, action) => {
        const classification = pathOr(
          "",
          ["payload", "classification"],
          action
        );
        const params = {
          classification: classification,
        };
        return buildPayload(
          store,
          "getAllGroups",
          "getAllGroups",
          null,
          params
        );
      },
      loader: false,
    },
    [affinityGroupActions.getMyGroups]: {
      payloadBuilder: (store, action) => {
        const classification = pathOr(
          "",
          ["payload", "classification"],
          action
        );
        const params = {
          classification: classification,
        };
        return buildPayload(
          store,
          "getAllCustomerGroup",
          "getAllCustomerGroup",
          null,
          params
        );
      },
      loader: false,
    },
    [affinityGroupActions.joinOrLeaveGroup]: {
      payloadBuilder: (store, action) => {
        const operation = action.payload.join ? "joinGroup" : "leaveGroup";
        return buildPayload(
          store,
          operation,
          null,
          {
            id: path(["payload", "group", "id"], action),
          },
          null
        );
      },
      loader: true,
    },
  },
  [affinityGroupScreens.affinityGroupWallScreen]: {
    [affinityGroupActions.getGroupPosts]: {
      payloadBuilder: (store, action) => {
        const isArticle = path(["payload", "isArticle"], action);
        const params = {
          id: path(["payload", "groupId"], action),
          type: isArticle ? "POST" : "COMMENT,POST",
        };
        //lastId for pagination
        const state = store.getState();
        const {
          currentGroup: { posts = [], pagination = {} } = {},
        } = state.affinityGroup;

        let page = 0;
        let pageSize = constants.POSTS_PAGE_SIZE;

        if (posts.length && !action.payload.reload) {
          page = pagination.page || 0;
          pageSize = constants.POSTS_PAGE_SIZE;
        }

        return buildPayload(store, "getGroupPosts", "getGroupPosts", null, {
          ...params,
          ...{
            pageSize: pageSize.toString(),
            page: page.toString(),
          },
        });
      },
      loader: false,
    },
    [affinityGroupActions.getGroupPostById]: {
      payloadBuilder: (store, action) => {
        const params = {
          id: path(["payload", "postId"], action),
        };
        return buildPayload(store, "getGroupPostById", null, null, params);
      },
      loader: true,
    },
    [affinityGroupActions.likePost]: {
      payloadBuilder: (store, action) => {
        return buildPayload(
          store,
          "createGroupPost",
          null,
          action.payload,
          null
        );
      },
      loader: false,
    },
    [affinityGroupActions.unlikePost]: {
      payloadBuilder: (store, action) => {
        return buildPayload(
          store,
          "createGroupPost",
          null,
          action.payload,
          null
        );
      },
    },
    [affinityGroupActions.addPostComments]: {
      payloadBuilder: (store, action) => {
        const params = path(["payload"], action);
        return buildPayload(store, "createGroupPost", null, params, null);
      },
    },
  },
  [affinityGroupScreens.affinityGroupPostScreen]: {
    [affinityGroupActions.getGroupPostById]: {
      payloadBuilder: (store, action) => {
        const params = {
          id: path(["payload", "postId"], action),
        };
        return buildPayload(store, "getGroupPostById", null, null, params);
      },
    },
    [affinityGroupActions.getPostComments]: {
      payloadBuilder: (store, action) => {
        const params = {
          id: path(["payload", "id"], action),
          type: "COMMENT",
        };
        const state = store.getState();
        const {
          currentPost: { comments = [], pagination = {} } = {},
        } = state.affinityGroup;

        let page = 0;
        let pageSize = constants.COMMENTS_PAGE_SIZE;

        if (comments.length && !action.payload.reload) {
          page = pagination.page || 0;
          pageSize = constants.COMMENTS_PAGE_SIZE;
        }

        return buildPayload(store, "getChildGroupPosts", null, null, {
          ...params,
          ...{
            pageSize: pageSize.toString(),
            page: page.toString(),
          },
        });
      },
    },
    [affinityGroupActions.addPostComments]: {
      payloadBuilder: (store, action) => {
        const params = path(["payload"], action);
        return buildPayload(store, "createGroupPost", null, params, null);
      },
    },
    [affinityGroupActions.likePost]: {
      payloadBuilder: (store, action) => {
        return buildPayload(
          store,
          "createGroupPost",
          null,
          action.payload,
          null
        );
      },
    },
    [affinityGroupActions.unlikePost]: {
      payloadBuilder: (store, action) => {
        return buildPayload(
          store,
          "createGroupPost",
          null,
          action.payload,
          null
        );
      },
    },
    [affinityGroupActions.likeComment]: {
      payloadBuilder: (store, action) => {
        return buildPayload(
          store,
          "createGroupPost",
          null,
          action.payload,
          null
        );
      },
    },
    [affinityGroupActions.unlikeComment]: {
      payloadBuilder: (store, action) => {
        return buildPayload(
          store,
          "createGroupPost",
          null,
          action.payload,
          null
        );
      },
    },
    loader: false,
  },
  [affinityGroupScreens.createPostScreen]: {
    [affinityGroupActions.uploadDocument]: {
      payloadBuilder: (store, action) => {
        const { fileType, fileName, document } = action.payload;

        let contentType;
        switch (fileType) {
          case "pdf":
            contentType = "application/pdf";
            break;
          case "image":
            contentType = "image/jpg";
            break;
          case "video":
            contentType = "video/mp4";
            break;
        }

        const body = {
          id: "",
          name: "",
          type: "",
          desc: "",
          comments: "",
          filename: fileName,
          contentType,
          content: document,
          language: "en",
          category: fileType,
        };

        return buildPayload(store, "createDocument", null, body, null);
      },
      loader: true,
    },
    [affinityGroupActions.createGroupPost]: {
      payloadBuilder: (store, action) => {
        const body = {
          type: path(["payload", "type"], action),
          title: path(["payload", "title"], action),
          message: path(["payload", "message"], action),
        };
        //add document
        const document = path(["payload", "document"], action);
        if (document) {
          //add contentType for image and pdf
          const fileType = path(["payload", "fileType"], action);
          switch (fileType) {
            case "pdf":
              document.contentType = "application/pdf";
              break;
            case "image":
              document.contentType = "image/jpg";
              break;
            case "video":
              document.contentType = "video/mp4";
              break;
          }
          body.document = document;
        }

        return buildPayload(
          store,
          "createGroupPost",
          null,
          { group: { id: path(["payload", "groupId"], action) }, ...body },
          null
        );
      },
      loader: true,
    },
  },
  ["FOREGROUND"]: {
    [affinityGroupActions.getPostForNotification]: {
      payloadBuilder: (store, action) => {
        const data = action.payload;
        const postId = data.parentGroupPostId || data.groupPostId;
        const params = {
          id: postId,
        };
        return buildPayload(store, "getGroupPostById", null, null, params);
      },
    },
  },
};
