import { safeMetaLabelFinder } from "../../utils/meta-utils";

export const metaFinderCollectSocialEmail = key => {
  return safeMetaLabelFinder("CollectSocialEmail", key);
};
