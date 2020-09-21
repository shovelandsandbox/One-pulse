import { safeMetaLabelFinder } from "../../utils/meta-utils";

export const metaFinderCB = key => {
  return safeMetaLabelFinder("VideoSales", key);
};
