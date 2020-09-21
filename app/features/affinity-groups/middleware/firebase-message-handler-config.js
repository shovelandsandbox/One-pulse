import { affinityGroupActions as actions } from "../configs/affinity-group-actions";
import { NOTIFICATION_TYPE } from "../utils/type-helper";

const middlewareConfig = {
  FOREGROUND: {
    [actions.firebaseMessageReceived]: {
      successAction: actions.firebaseMessageReceivedSuccess,
      dispatchActions: (payload, state) => {
        const {
          notifications: { notificationList = [] },
          myGroups = [],
        } = state.affinityGroup;
        const { myChallenges = [] } = state.challenges;

        const data = payload;

        //ignore notifications raised by user's own actions
        const myUserId = state.profile.id;
        if (data.groupPostOwnerId == myUserId) {
          return [];
        }

        //ignore all the notifications for the group user is not part of
        const hasJoinedGroup = myGroups.find(
          group => data.groupId === group.id
        );
        const hasJoinedChallenge = myChallenges.find(
          group => data.groupId === group.id
        );

        if (!hasJoinedGroup && !hasJoinedChallenge) {
          return [];
        }

        //new notification - this post was never fetched - fetch from backend
        //in case of comment/like post id will be parentGroupPostId and in case of post it will be groupPostId
        const postId = data.parentGroupPostId || data.groupPostId;
        const index = notificationList.findIndex(
          notification => notification.postId === postId
        );
        if (index < 0) {
          if (NOTIFICATION_TYPE[data.type]) {
            return [actions.getPostForNotification];
          }
          return [];
        }

        //no need to fetch post - it was already fetched for a previous notification
        return [actions.foundPostInNotificationsCache];
      },
      postSuccessHook: payload => {
        return payload;
      },
    },
  },
};

export default middlewareConfig;
