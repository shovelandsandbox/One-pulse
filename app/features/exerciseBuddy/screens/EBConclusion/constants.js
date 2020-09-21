import { metaFinderExerciseBuddy } from "../../utils/meta-utils";
import metaKeys from '../../meta';

function getConstants () {
  return {
    less: {
      main: metaFinderExerciseBuddy(metaKeys.conclusion.goodWorkout),
      subText: metaFinderExerciseBuddy(metaKeys.conclusion.goodWorkoutSubText),
      suggestion: metaFinderExerciseBuddy(metaKeys.conclusion.goodWorkoutSuggestion)
    },
    more: {
      main: metaFinderExerciseBuddy(metaKeys.conclusion.awesome),
      subText: metaFinderExerciseBuddy(metaKeys.conclusion.awesomeWorkoutSubText),
      suggestion: metaFinderExerciseBuddy(metaKeys.conclusion.awesomeWorkoutSuggestion)
    },
    new: {
      main: metaFinderExerciseBuddy(metaKeys.conclusion.greatStart),
      subText: metaFinderExerciseBuddy(metaKeys.conclusion.greatStartSubText),
      suggestion: metaFinderExerciseBuddy(metaKeys.conclusion.greatStartSuggestion)
    },
    statsFields: ["Today", "Previous", "Time"],
  }
}

export default getConstants;
