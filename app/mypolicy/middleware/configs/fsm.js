import { CoreUtils } from "@pru-rt-internal/pulse-common";
const { getPayloadForNavigation } = CoreUtils;

export const loadUpdateContact = ({ store, action }) => {
  return getPayloadForNavigation(action, "UpdateContactInfo", {});
};

export const loadUpdateBeneficiary = ({ store, action }) => {
  return getPayloadForNavigation(action, "", {});
};

export const loadRegisterClaim = ({ store, action }) => {
  const { myPolicy } = store.getState();
  const { id } = myPolicy.currentSelectedPolicy;
  return getPayloadForNavigation(action, "ProductJourney", { policyId: id });
};

export const loadRenewPolicy = ({ store, action }) => {
  return getPayloadForNavigation(action, "RENEW_PRODUCT_JOURNEY", {});
};

export const loadCancelPolicy = ({ store, action }) => {
  return getPayloadForNavigation(action, "ClaimCancel", {});
};

export const loadTransactionScreen = ({ store, action }) => {
  return getPayloadForNavigation(action, "POLICY_TRANSACTIONS", {});
};

export const loadChatScreen = ({store,action}) =>{
  return getPayloadForNavigation(action, "ChatBot", {});
}
