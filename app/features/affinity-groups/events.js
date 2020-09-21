export const eventNames = {
  myCommunities: "myCommunities",
  allCommunities: "allCommunities",
  joinGroup: "joinGroup",
  leaveGroup: "leaveGroup",
  group: "group",
  viewPost: "viewPost",
  likePost: "likePost",
  unlikePost: "unlikePost",
  sharePost: "sharePost",
  commentPost: "commentPost",
  viewNotification: "viewNotification",
  viewNotificationClick: "viewNotificationClick",
  createPost: "createPost",
  exitGroup: "exitGroup",
  exitCommunities: "exitCommunities",
  likeComment: "likeComment",
  unlikeComment: "unlikeComment",
};

export default {
  [eventNames.myCommunities]: {
    platform: {
      type: "ScreenEvent",
      name: "pulse.communities.myCommunities",
      tags: ["communities"],
    },
  },
  [eventNames.allCommunities]: {
    platform: {
      type: "ScreenEvent",
      name: "pulse.communities.allCommunities",
      tags: ["communities"],
    },
  },
  [eventNames.joinGroup]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.communities.allCommunities.joinGroup",
      tags: ["communities"],
      attributes,
    }),
    firebase: "communities_joinGroup",
  },

  [eventNames.leaveGroup]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.communities.myCommunities.leaveGroup",
      tags: ["communities"],
      attributes,
    }),
    firebase: "communities_leaveGroup",
  },
  [eventNames.group]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.communities.myCommunities.group",
      tags: ["communities"],
      attributes,
    }),
  },
  [eventNames.viewPost]: {
    platform: attributes => ({
      type: "ScreenEvent",
      name: "pulse.communities.myCommunities.viewPost",
      tags: ["communities"],
      attributes,
    }),
  },
  [eventNames.likePost]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.communities.myCommunities.likePost",
      tags: ["communities"],
      attributes,
    }),
    firebase: "communities_likePost",
  },
  [eventNames.unlikePost]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.communities.myCommunities.unlikePost",
      tags: ["communities"],
      attributes,
    }),
    firebase: "communities_unlikePost",
  },
  [eventNames.sharePost]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.communities.myCommunities.sharePost",
      tags: ["communities"],
      attributes,
    }),
    firebase: "communities_sharePost",
  },
  [eventNames.commentPost]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.communities.myCommunities.commentPost",
      tags: ["communities"],
      attributes,
    }),
    firebase: "communities_commentPost",
  },
  [eventNames.viewNotification]: {
    platform: attributes => ({
      type: "ScreenEvent",
      name: "pulse.communities.myCommunities.notification",
      tags: ["communities"],
      attributes,
    }),
    firebase: "communities_viewNotification",
  },
  [eventNames.viewNotificationClick]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.communities.myCommunities.notification.click",
      tags: ["communities"],
      attributes,
    }),
    firebase: "communities_viewNotificationClick",
  },
  [eventNames.createPost]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.communities.myCommunities.createPost",
      tags: ["communities"],
      attributes,
    }),
    firebase: "communities_createPost",
  },
  [eventNames.exitGroup]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.communities.myCommunities.group.exit",
      tags: ["communities"],
      attributes,
    }),
    firebase: "communities_exitGroup",
  },
  [eventNames.exitCommunities]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.communities.allCommunities.back",
      tags: ["communities"],
      attributes,
    }),
    firebase: "communities_exitCommunities",
  },
  [eventNames.likeComment]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.communities.myCommunities.likeComment",
      tags: ["communities"],
      attributes,
    }),
    firebase: "communities_likeComment",
  },
  [eventNames.unlikeComment]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.communities.myCommunities.unlikeComment",
      tags: ["communities"],
      attributes,
    }),
    firebase: "communities_unlikeComment",
  },
};
