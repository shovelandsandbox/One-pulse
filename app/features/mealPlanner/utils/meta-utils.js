import { safeMetaLabelFinder } from "../../../utils/meta-utils";

export const metaFinder = key => {
  return safeMetaLabelFinder("mealPlan", key);
};
