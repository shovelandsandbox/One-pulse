import { safeMetaLabelFinder } from "../../../utils/meta-utils";

export const metaFinderCP = key => {
  return safeMetaLabelFinder("homeTab", key);
};
