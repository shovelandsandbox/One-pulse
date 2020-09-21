import profileActions from "../user-profile/actionNames";
import { CoreConfig, CoreActionTypes } from "@pru-rt-internal/pulse-common";

const { pageKeys } = CoreConfig;

export const goToProductJourney = navParams => ({
  type: "GO_TO_SCREEN",
  navigateTo: "PRODUCT_JOURNEY_READONLY",
  payload: {
    params: {
      ...navParams,
    },
  },
});

export const updateProfile = (key, value) => ({
  type: profileActions.updateProfile,
  payload: {
    key,
    value,
  },
});

export const createPlatformEvent = payload => ({
  context: pageKeys.COMMON,
  type: CoreActionTypes.SEND_EVENT,
  payload,
});
