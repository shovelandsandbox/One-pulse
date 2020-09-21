import screens from "./configs/screenNames";
import actions from "./configs/actionNames";

import { CoreActionTypes, CoreConfig } from "@pru-rt-internal/pulse-common";

const { pageKeys } = CoreConfig;

const context = screens.AIME_DENGUE_SCREEN;

const getAimeTrends = (token) => {
  console.log("::INSIDE ACTION", context, token)
  return ({
    context,
    type: actions.getTrends,
    payload: {
      token: token,
      category: "trends",
      subcategory: "outbreaks",
    },
  })
};

const gotoDengueRegistration = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.DENGUE_PRODUCT_HOME
});

const resetDengueProductNavigation = value => ({
  type: actions.setFreshProductState,
  value,
});

export { getAimeTrends, gotoDengueRegistration, resetDengueProductNavigation };
