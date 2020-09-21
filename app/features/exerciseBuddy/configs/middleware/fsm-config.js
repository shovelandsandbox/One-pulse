import screens from "../screenNames";
import actions from "../actionNames";
import { CoreUtils } from "@pru-rt-internal/pulse-common";
const { getPayloadForNavigation } = CoreUtils;

const FsmConfig = {
  [screens.EXERCISE_BUDDY]: {
    [actions.goToExerciseBuddyHome]: ({ action }) => {
      const navigateTo = screens.EXERCISE_BUDDY_HOME;
      return getPayloadForNavigation(action, navigateTo, action.payload);
    },
    [actions.goToSelectFriends]: ({ action }) => {
      const navigateTo = screens.SELECT_FRIENDS;
      return getPayloadForNavigation(action, navigateTo, action.payload);
    },
    [actions.goToExerciseDetail]: ({ action }) => {
      const navigateTo = screens.EXERCISE_DETAIL;
      return getPayloadForNavigation(action, navigateTo, action.payload);
    },
    [actions.goToEBWorkoutHistory]: ({ action }) => {
      const navigateTo = screens.EBWORKOUT_HISTORY;
      return getPayloadForNavigation(action, navigateTo, action.payload);
    },
  },
};

export default FsmConfig;
