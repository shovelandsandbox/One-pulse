import screenNames from "./screenNames";
import MainScreen from "../screens/MainScreen";
import Habits from "../screens/Habits";
import Leaderboard from "../screens/Leaderboard";
import Profile from "../screens/Profile";
import Invite from "../screens/InviteScreen";
import GroupDetails from "../screens/GroupDetails";

export const WellnessPlanScreenConfig = {
  WellnessGoals: {
    //TODO: read from screenNames.js
    screen: MainScreen,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  ActionPlans: {
    screen: MainScreen, //TODO: read from screenNames.js
    navigationOptions: {
      header: null,
    },
  },
  ActionPlanJoin: {
    //TODO: read from screenNames.js
    screen: Habits,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  WellnessLeaderboard: {
    //TODO: read from screenNames.js
    screen: Leaderboard,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  WellnessProfile: {
    //TODO: read from screenNames.js
    screen: Profile,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  WellnessInvite: {
    //TODO: read from screenNames.js
    screen: Invite,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [screenNames.GROUP_DETAILS]: {
    screen: GroupDetails,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
};
