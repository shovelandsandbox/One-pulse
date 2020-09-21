import {
  EBWorkoutHistory,
  EBLandingScreen,
  EBExerciseDetail,
  EBSelectFriends,
} from "../screens";
import Exercises from "../exercises";

export const ExerciseBuddyScreenConfig = {
  ExerciseBuddyHome: {
    screen: EBLandingScreen,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  ExerciseDetail: {
    screen: EBExerciseDetail,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  SelectFriends: {
    screen: EBSelectFriends,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  EBWorkoutHistory: {
    screen: EBWorkoutHistory,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Exercises: {
    screen: Exercises,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  }
};
