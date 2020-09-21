import { safeMetaLabelFinder } from "../../../utils/meta-utils";

export const metaFinderRewards = key => {
    return safeMetaLabelFinder("RewardCenter", key);
};

export const metaLabelOrNilRewards = key => {
  const metaString = safeMetaLabelFinder("RewardCenter", key);
  return metaString !== key ? metaString : null;
};
