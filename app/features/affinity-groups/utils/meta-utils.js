import { safeMetaLabelFinder } from "../../../utils/meta-utils";

export const metaFinderAG = key => {
  return safeMetaLabelFinder("affinityGroup", key);
};
