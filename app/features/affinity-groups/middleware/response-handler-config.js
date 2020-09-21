import affinityGroupScreens from "../../../utils/configs/screen-names";
import { affinityGroupActions } from "../configs/affinity-group-actions";
import { failureResponseTransformer } from "../../../utils/apiUtils";
// import firebase from "react-native-firebase";
import { pathOr, path } from "ramda";
import likesAndCommentsActions from "../../likesAndComments/configs/actionNames";
import likesAndCommentsScreens from "../../likesAndComments/configs/screenNames";

export default {
  [affinityGroupScreens.affinityGroupMainScreen]: {
    [affinityGroupActions.getAllGroups]: {
      successAction: affinityGroupActions.getAllGroupsSuccess,
      failureAction: affinityGroupActions.getAllGroupsFailure,
      dispatchActions: payload => {
        {
          const classification = pathOr(
            "",
            ["actionPayload", "classification"],
            payload
          );
          return [
            {
              type: affinityGroupActions.getMyGroups,
              context: affinityGroupScreens.affinityGroupMainScreen,
              payload: {
                classification: classification,
              },
            },
          ];
        }
      },
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [affinityGroupActions.getMyGroups]: {
      successAction: affinityGroupActions.getMyGroupsSuccess,
      failureAction: affinityGroupActions.getMyGroupsFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [affinityGroupActions.joinOrLeaveGroup]: {
      successAction: affinityGroupActions.joinOrLeaveGroupSuccess,
      failureAction: affinityGroupActions.joinOrLeaveGroupFailure,
      postSuccessHook: payload => {
        const {
          actionPayload: {
            join,
            group: { id: groupId },
          },
        } = payload;
        return {
          groupId,
          join,
        };
      },
      successHandler: action => {
        const {
          actionPayload: { join, group },
        } = action.payload;

        const topic = group.attributes.notificationTopic;
        if (topic) {
          // if (join) {
          //   firebase.messaging().subscribeToTopic(topic);
          // } else {
          //   firebase.messaging().unsubscribeFromTopic(topic);
          // }
        }
      },
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
  },
  [affinityGroupScreens.createPostScreen]: {
    [affinityGroupActions.uploadDocument]: {
      successAction: affinityGroupActions.uploadDocumentSuccess,
      failureAction: affinityGroupActions.uploadDocumentFailure,
      dispatchActions: payload => {
        const {
          // eslint-disable-next-line no-unused-vars
          actionPayload: { fileName, document, ...rest },
          response: {
            body: { id },
          },
        } = payload;

        const nextPayload = {
          ...rest,
          document: {
            id,
            name: fileName,
          },
        };
        return [
          {
            type: affinityGroupActions.createGroupPost,
            context: affinityGroupScreens.createPostScreen,
            payload: nextPayload,
          },
        ];
      },
    },
    [affinityGroupActions.createGroupPost]: {
      successAction: affinityGroupActions.createGroupPostSuccess,
      dispatchActions: payload => {
        const {
          actionPayload: { groupId },
        } = payload;

        return [
          {
            type: affinityGroupActions.getGroupPosts,
            context: affinityGroupScreens.affinityGroupWallScreen,
            payload: {
              groupId,
              reload: true,
            },
            disableTimeout: true,
          },
        ];
      },
      failureAction: affinityGroupActions.createGroupPostFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [affinityGroupActions.getPost]: {
      successAction: affinityGroupActions.getPostSuccess,
      failureAction: affinityGroupActions.getPostFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
  },
  [affinityGroupScreens.affinityGroupWallScreen]: {
    [affinityGroupActions.getGroupPosts]: {
      successAction: affinityGroupActions.getGroupPostsSuccess,
      failureAction: affinityGroupActions.getGroupPostsFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [affinityGroupActions.getGroupPostById]: {
      successAction: affinityGroupActions.getGroupPostByIdSuccess,
      failureAction: affinityGroupActions.getGroupPostByIdFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [affinityGroupActions.likePost]: {
      successAction: affinityGroupActions.likePostSuccess,
      //?? WHY WOULD THIS BE REQUIRED?
      // dispatchActions: payload => {
      //   return [
      //     {
      //       type: affinityGroupActions.getGroupPostById,
      //       payload: {
      //         postId: payload.actionPayload.parent.id,
      //       },
      //     },
      //   ];
      // },
      successHandler: (action, store) => {
        const { group } = action.payload.actionPayload;
        const { parent } = action.payload.actionPayload;
        store.dispatch({
          context: likesAndCommentsScreens.LIKES_AND_COMMENTS,
          type: likesAndCommentsActions.getGroupPostStats,
          payload: {
            id: group.id,
          },
        });
        store.dispatch({
          context: likesAndCommentsScreens.LIKES_AND_COMMENTS,
          type: likesAndCommentsActions.getGroupPostStats,
          payload: {
            id: path(["id"], parent),
          },
        });
      },
      failureAction: affinityGroupActions.likePostFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [affinityGroupActions.unlikePost]: {
      successAction: affinityGroupActions.unlikePostSuccess,
      successHandler: (action, store) => {
        const { group } = action.payload.actionPayload;
        const { parent } = action.payload.actionPayload;
        store.dispatch({
          context: likesAndCommentsScreens.LIKES_AND_COMMENTS,
          type: likesAndCommentsActions.getGroupPostStats,
          payload: {
            id: group.id,
          },
        });
        store.dispatch({
          context: likesAndCommentsScreens.LIKES_AND_COMMENTS,
          type: likesAndCommentsActions.getGroupPostStats,
          payload: {
            id: path(["id"], parent),
          },
        });
      },
      failureAction: affinityGroupActions.unlikePostFailure,
      failureHook: failureResponseTransformer,
    },
    [affinityGroupActions.addPostComments]: {
      successAction: affinityGroupActions.addPostCommentsSuccess,
      dispatchActions: payload => {
        return [
          {
            type: affinityGroupActions.getGroupPostById,
            payload: {
              postId: payload.actionPayload.parent.id,
            },
          },
        ];
      },
      failureAction: affinityGroupActions.addPostCommentsFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
  },
  [affinityGroupScreens.affinityGroupPostScreen]: {
    [affinityGroupActions.getGroupPostById]: {
      successAction: affinityGroupActions.getGroupPostByIdSuccess,
      dispatchActions: payload => {
        return [
          {
            type: affinityGroupActions.getPostComments,
            payload: {
              id: payload.actionPayload.postId,
              reload: true,
            },
          },
        ];
      },
      failureAction: affinityGroupActions.getGroupPostByIdFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [affinityGroupActions.getPostComments]: {
      successAction: affinityGroupActions.getPostCommentsSuccess,
      failureAction: affinityGroupActions.getPostCommentsFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [affinityGroupActions.toggleCommentLike]: {
      successAction: affinityGroupActions.toggleCommentLikeSuccess,
      failureAction: affinityGroupActions.toggleCommentLikeFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [affinityGroupActions.addPostComments]: {
      successAction: affinityGroupActions.addPostCommentsSuccess,
      dispatchActions: payload => {
        return [
          {
            type: affinityGroupActions.getGroupPostById,
            payload: {
              postId: payload.actionPayload.parent.id,
            },
          },
          {
            type: affinityGroupActions.getPostComments,
            payload: {
              id: payload.actionPayload.parent.id,
              reload: true,
            },
          },
        ];
      },
      failureAction: affinityGroupActions.addPostCommentsFailure,
      failureHook: failureResponseTransformer,
    },
    [affinityGroupActions.likePost]: {
      successAction: affinityGroupActions.likePostSuccess,
      failureAction: affinityGroupActions.likePostFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [affinityGroupActions.unlikePost]: {
      successAction: affinityGroupActions.unlikePostSuccess,
      failureAction: affinityGroupActions.unlikePostFailure,
      failureHook: failureResponseTransformer,
    },
    [affinityGroupActions.likeComment]: {
      successAction: affinityGroupActions.likeCommentSuccess,
      failureAction: affinityGroupActions.likeCommentFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [affinityGroupActions.unlikeComment]: {
      successAction: affinityGroupActions.unlikeCommentSuccess,
      failureAction: affinityGroupActions.unlikeCommentFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
  },
  ["FOREGROUND"]: {
    [affinityGroupActions.getPostForNotification]: {
      successAction: affinityGroupActions.getPostForNotificationSuccess,
      postSuccessHook: payload => {
        return {
          response: payload.response.body,
          type: payload.actionPayload.type,
        };
      },
      failureAction: affinityGroupActions.getPostForNotificationFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
  },
};
