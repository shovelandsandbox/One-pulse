import {
  CoreConfig,
  metaHelpers as helpers,
} from "@pru-rt-internal/pulse-common";

const { USER_TRANSACTIONS_LINKS, UPDATE_POLICY } = CoreConfig;

const fetchLabel = (value, defaultValue) =>
  value ? value.label : defaultValue;

const getElementsForTransaction = () => {
  const screen = helpers.findScreen(USER_TRANSACTIONS_LINKS);
  let requiredMeta = {};
  screen.elements.forEach(
    item =>
      (requiredMeta = {
        ...requiredMeta,
        [item.key]: item,
      })
  );
  return requiredMeta;
};

const getRequiredLink = () => {
  const screen = helpers.findScreen(USER_TRANSACTIONS_LINKS);
  return screen["requiredTransaction"];
};

const showLinkInDetailInfo = () => {
  const screen = helpers.findScreen(USER_TRANSACTIONS_LINKS);
  return screen["showLinksInDetailInfo"];
};

const initializeScreenMeta = () => {
  return {
    updatePolicy: fetchLabel(
      helpers.findElement(USER_TRANSACTIONS_LINKS, UPDATE_POLICY),
      "updatePolicy"
    ),
  };
};
export default {
  initializeScreenMeta,
  getElementsForTransaction,
  getRequiredLink,
  showLinkInDetailInfo,
};
