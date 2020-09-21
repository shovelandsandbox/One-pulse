import { safeMetaLabelFinder } from "../../../utils/meta-utils";

export const metaFinderCP = key => {
  return safeMetaLabelFinder("homeTab", key);
};
export const healthAIMetaFinder = key => {
  return safeMetaLabelFinder("healthAI", key);
};
