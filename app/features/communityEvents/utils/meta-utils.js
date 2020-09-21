import {
  safeMetaLabelFinder,
  safeMetaContextLabelFinder,
} from "../../../utils/meta-utils";

export const metaFinderChallenges = key => {
  return safeMetaLabelFinder("challenges", key);
};

export const contextFinderChallenges = (key, context) => {
  return safeMetaContextLabelFinder(context, "challenges", key);
};
