import { safeMetaLabelFinder } from "../../../utils/meta-utils";
import metaKeys from '../meta';

export const metaFinderExerciseBuddy = key => {
  return safeMetaLabelFinder(metaKeys.screenName, key);
};

