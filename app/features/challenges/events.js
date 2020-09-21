export const eventNames = {
  myChallenges: "myChallenges",
  allChallenges: "allChallenges",
  joinGroup: "joinGroupChallenges",
  leaveGroup: "leaveGroupChallenges",
  group: "viewChallenges",
  exitGroup: "exitGroupChallenges",
  exitChallenges: "exitChallenges",
  viewWall: "viewChallenges",
  leaderboard: "leaderboard",
  exitLeaderboard: "exitLeaderboard",
  viewNotificationClick: "viewNotificationChallengesClick",
  viewKnowMore: "viewKnowMore",
};

export default {
  [eventNames.myChallenges]: {
    platform: {
      type: "ScreenEvent",
      name: "pulse.challenges.myChallenges",
      tags: ["challenges"],
    },
  },
  [eventNames.allChallenges]: {
    platform: {
      type: "ScreenEvent",
      name: "pulse.challenges.allChallenges",
      tags: ["challenges"],
    },
  },
  [eventNames.viewNotificationClick]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.challenges.myChallenges.notification.click",
      tags: ["challenges"],
      attributes,
    }),
    firebase: "challenges_viewNotificationClick",
  },
  [eventNames.joinGroup]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.challenges.allChallenges.joinGroup",
      tags: ["challenges"],
      attributes,
    }),
    firebase: "challenges_joinGroup",
  },

  [eventNames.leaveGroup]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.challenges.myChallenges.leaveGroup",
      tags: ["challenges"],
      attributes,
    }),
    firebase: "challenges_leaveGroup",
  },
  [eventNames.group]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.challenges.allChallenges.group",
      tags: ["challenges"],
      attributes,
    }),
    firebase: "challenges_group",
  },
  [eventNames.viewWall]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.challenges.allChallenges.viewWall",
      tags: ["challenges"],
      attributes,
    }),
    firebase: "challenges_viewWall",
  },
  [eventNames.exitGroup]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.challenges.myChallenges.group.exit",
      tags: ["challenges"],
      attributes,
    }),
    firebase: "challenges_exitGroup",
  },
  [eventNames.exitLeaderboard]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.challenges.myChallenges.leaderboard.exit",
      tags: ["challenges"],
      attributes,
    }),
    firebase: "challenges_exitLeaderboard",
  },
  [eventNames.leaderboard]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.challenges.myChallenges.leaderboard",
      tags: ["challenges"],
      attributes,
    }),
    firebase: "challenges_leaderboard",
  },
  [eventNames.exitChallenges]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.challenges.allChallenges.back",
      tags: ["challenges"],
      attributes,
    }),
    firebase: "challenges_exitChallenges",
  },
  [eventNames.viewKnowMore]: {
    platform: {
      type: "ScreenEvent",
      name: "pulse.challenges.viewKnowMore",
      tags: ["challenges"],
    },
    firebase: "challenges_viewKnowMore",
  },
};
