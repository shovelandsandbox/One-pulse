import screens from "./configs/screenNames";
import actions from "./configs/actionNames";

import { CoreActionTypes } from "@pru-rt-internal/pulse-common";

const context = screens.REWARD_SERVICE_SUMMARY;

const getCustomerTransactions = () => ({
  context,
  type: actions.getCustomerTransactions,
});

const getCustomerWallet = () => ({
  context,
  type: actions.getCustomerWalletDetail,
});

const setLoader = () => ({
  context,
  type: actions.setLoader,
});

const goToScreens = (params, screen) => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: screen,
  payload: {
    params,
  },
});
export { getCustomerTransactions, goToScreens, getCustomerWallet, setLoader };
