import { safeMetaLabelFinder } from "../../../utils/meta-utils";

export const metaFinderCustomerConnect = key => {
  return safeMetaLabelFinder("VideoSales", key);
};

export const getDocSignatureScreenMeta = key => {
  return safeMetaLabelFinder("DocumentSignature", key);
};
