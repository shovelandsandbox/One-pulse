import { screenNames } from "../screenNames";
import * as actionsNames from "../actionNames";
import { Alert } from "react-native";
import {
  CoreActionTypes,
  CoreConfig
} from "@pru-rt-internal/pulse-common";
import { path } from "ramda";

const { pageKeys } = CoreConfig;

const consentManagementApiResponse = {
  [screenNames.MARKETING_CONSENT]: {
    [actionsNames.MARKETING_CONSENT_STATUS]: {
      successAction: actionsNames.MARKETING_CONSENT_STATUS1,
      postSuccessHook: payload => {
        Alert.alert("Your consent has been updated successfully.");
      },
      dispatchActions: (payload, state) => {
        const actions = [];
        actions.push({
          type: actionsNames.REJECT_MARKETING_CONSENT_SUCCESS,
          payload: payload,
        });
        actions.push({
          context: "Profile",
          type: "GET_CUSTOMER_DETAILS",
        });
        if (path(["actionPayload", "babylonParams"], payload)) {
          actions.push({
            context: pageKeys.CHAT_CONVERSATION,
            type: CoreActionTypes.GO_TO_FULL_ASSESSMENT,
            payload: {
              params: path(["actionPayload", "babylonParams"], payload)
            }
          });
        }
        return actions;
      },
      failureAction: actionsNames.REJECT_MARKETING_CONSENT_FAIL,
      dispatchFailureActions: (payload, state) => {
        const actions = [];
        if (path(["actionPayload", "babylonParams"], payload)) {
          actions.push({
            context: pageKeys.CHAT_CONVERSATION,
            type: CoreActionTypes.GO_TO_FULL_ASSESSMENT,
            payload: {
              params: path(["actionPayload", "babylonParams"], payload)
            }
          });
        }
        return actions;
      },
      toggleLoader: false,
    },
  },
};

export default consentManagementApiResponse;
