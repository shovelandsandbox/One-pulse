import { pathOr } from "ramda";

const getMetaForMetrics = (key, fromData, defaultValue = {}) => {
  return pathOr(defaultValue, ["data", key], fromData);
};

export { getMetaForMetrics };
