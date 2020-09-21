import { safeMetaLabelFinder } from "../../../utils/meta-utils";

export const metaFinderVideoSale = key => {
  const result = safeMetaLabelFinder("VideoSales", key);
  return result !== key ? result : [];
};

export const metaLabelFinderVideoSale = key => {
  return safeMetaLabelFinder("VideoSales", key);
};
