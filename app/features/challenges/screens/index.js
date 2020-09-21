import screens from "../configs/screen-names";
//screens
import Challenges from "./challenges";
import Leaderboard from "./leaderboard";
import LearnMore from "./learnMore";
import ChallengeDetails from "./Challenge";
import WearablesContainerNavigator from "../../fitnessTrackers/screens/WearablesContainer";

const navigationOptions = {
  header: null,
};

export default {
  [screens.CHALLENGES]: {
    screen: Challenges,
    navigationOptions,
  },
  [screens.LEADERBOARD]: {
    screen: Leaderboard,
    navigationOptions,
  },
  [screens.LEARN_MORE]: {
    screen: LearnMore,
    navigationOptions,
  },
  [screens.WEARABLES_CONTAINER]: {
    screen: WearablesContainerNavigator,
    navigationOptions,
  },
  [screens.CHALLENGE_DETAILS]: {
    screen: ChallengeDetails,
    navigationOptions,
  },
};
