import { safeMetaLabelFinder } from "../../../utils/meta-utils";

export const metaFinderCP = key => {
  return safeMetaLabelFinder("homeTab", key);
};
export const skinCareAIMetaFinder = key => {
  return safeMetaLabelFinder("skinCareAI", key);
};

export const skinCareAIMetaFinderWithDefault = (key, defKey, context) => {
  let val = key && safeMetaLabelFinder("skinCareAI", key);
  if ((!val || val === key) && defKey) {
    val = safeMetaLabelFinder("skinCareAI", defKey);
  }
  if (context) {
    val = val.replace("{{diagnosis}}", context.diagnosis);
    val = val.replace("{{confidence}}", context.confidence);
  }

  return val;
};
