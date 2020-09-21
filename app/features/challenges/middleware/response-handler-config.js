import screens from "../configs/screen-names";
import actions from "../configs/actions";
import { default as fitnessTrackerActions } from "../../fitnessTrackers/configs/actionNames";
import { failureResponseTransformer } from "../../../utils/apiUtils";
// import firebase from "react-native-firebase";

export default {
  [screens.CHALLENGES]: {
    [actions.getAllChallenges]: {
      successAction: actions.getAllChallengesSuccess,
      failureAction: actions.getAllChallengesFailure,
      failureHook: failureResponseTransformer,
    },
    [actions.getMyChallenges]: {
      successAction: actions.getMyChallengesSuccess,
      failureAction: actions.getMyChallengesFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actions.joinChallenge]: {
      successAction: actions.joinChallengeSuccess,
      failureAction: actions.joinChallengeFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
      successHandler: action => {
        const {
          actionPayload: { group },
        } = action.payload;

        const topic = group.attributes.notificationTopic;
        // topic && firebase.messaging().subscribeToTopic(topic);
      },
    },
    [actions.leaveChallenge]: {
      successAction: actions.leaveChallengeSuccess,
      failureAction: actions.leaveChallengeFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
      successHandler: action => {
        const {
          actionPayload: { group },
        } = action.payload;

        const topic = group.attributes.notificationTopic;
        // topic && firebase.messaging().unsubscribeFromTopic(topic);
      },
    },
    [actions.getAllCustomerWearables]: {
      successAction: fitnessTrackerActions.getAllCustomerWearablesSuccess,
      postSuccessHook: payload => {
        return payload.response;
      },
      toggleLoader: false,
    },
  },
  [screens.LEADERBOARD]: {
    [actions.getChallengeLeaderboard]: {
      successAction: actions.getChallengeLeaderboardSuccess,
      failureAction: actions.getChallengeLeaderboardFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actions.getProfilePic]: {
      successAction: actions.getProfilePicSuccess,
      failureAction: actions.getProfilePicFailure,
      failureHook: failureResponseTransformer,
    },
  },
  [screens.CHALLENGE_DETAILS]: {
    [actions.getChallengeActivityTrends]: {
      successAction: actions.getChallengeActivityTrendsSuccess,
      failureAction: actions.getChallengeActivityTrendsFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
  }
};
