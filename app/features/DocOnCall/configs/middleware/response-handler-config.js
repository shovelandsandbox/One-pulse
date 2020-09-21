import { path, pathOr } from "ramda";
import {
  CoreConfig,
  CoreActionTypes,
  CoreConstants,
  metaHelpers
} from "@pru-rt-internal/pulse-common";
import { Alert } from "react-native";
import Toast from "react-native-root-toast";
import screens from "../ScreenNames";
import actionNames from "../actionNames";

const { ConsultationType } = CoreConstants;
const { TALKTOADOCTOR, TALKTODOCTOR_DESC } = CoreConfig;
const { pageKeys } = CoreConfig;

const doctorAppointmentAlert = (state, payload, type) => {
  // eslint-disable-next-line complexity
  return new Promise((resolve, reject) => {
    //if user is logged out
    if (!state.auth.isLoggedIn) {
      resolve();
      return;
    }
    if (
      state.doctorServices.callType !== ConsultationType.AUDIO_CHAT ||
      payload.response.status.code !== 0
    ) {
      resolve();
      return;
    }
    const displayText = metaHelpers.findElement(
      TALKTOADOCTOR,
      TALKTODOCTOR_DESC
    ).label;
    Toast.show(displayText, {
      duration: 2000,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0
    });

    resolve();
  });
};

export default {
  [screens.DOC_REGISTRATION_SCREEN]: {
    [actionNames.DOC_SERVICE_VERIFY_PHONE]: {
      successAction: actionNames.DOC_SERVICE_VERFIY_PHONE_SUCCESS,
      postSuccessHook: payload => ({
        workflowId: payload.response.workflowId
      }),
      failureAction: actionNames.DOC_SERVICE_VERFIY_PHONE_FAILURE,
      failureHook: () => {
        return {
          errorMsg: "Invalid Phone number"
        };
      },
      toggleLoader: false
      // additionalActions: ({ getState }, action) => [],
    },
    [actionNames.DOC_SERVICE_RESEND_OTP]: {
      successAction: actionNames.DOC_SERVICE_RESEND_OTP_SUCCESS,
      postSuccessHook: payload => ({
        workflowId: payload.response.workflowId
      }),
      failureAction: actionNames.DOC_SERVICE_RESEND_OTP_FAILURE,
      toggleLoader: false
    },
    [actionNames.DOC_SERVICE_VERIFY_OTP]: {
      successAction: actionNames.DOC_SERVICE_VERFIY_OTP_SUCCESS,
      failureAction: actionNames.DOC_SERVICE_VERFIY_OTP_FAILURE,
      failureHook: () => {
        return {
          errorMsg: "Invalid OTP"
        };
      },
      toggleLoader: false
    },
    [actionNames.DOC_SERVICE_REGISTER_PATIENT]: {
      successAction: actionNames.DOC_SERVICE_REGISTER_PATIENT_SUCCESS,
      failureAction: actionNames.DOC_SERVICE_REGISTER_PATIENT_FAILURE,
      // toggleLoader: false,
      dispatchActions: payload => {
        return [
          {
            context: screens.DOC_REGISTRATION_SCREEN,
            type: actionNames.DOC_NRIC,
            payload: {
              NRICID: payload.actionPayload.NRICID
            }
          },
          {
            context: pageKeys.PROFILE,
            type: CoreActionTypes.GET_CUSTOMER_DETAILS_1
          }
        ];
      },
      postSuccessHook: payload => ({
        docServiceToken: payload.response.doctor_token
      }),
      failureHook: (payload, state) => {
        const { language } = state.userPreferences;
        if (language == "EN") {
          Alert.alert("Registration Failed");
        } else {
          Alert.alert("Pendaftaran Gagal");
        }

        return payload.response;
      }
    },

    initiate_consultation_request: {
      successAction: "initiate_consultation_request_success",
      failureAction: "initiate_consultation_request_failed"
    },
    [actionNames.DOC_NRIC]: {
      successAction: actionNames.DOC_NRIC_SUCCESS,
      dispatchActions: payload => {
        return [
          {
            context: pageKeys.PROFILE,
            type: CoreActionTypes.GET_CUSTOMER_DETAILS_1
          }
        ];
      },
      failureHook: (payload, state, store) => {
        const { language } = state.userPreferences;
        if (payload.response.status.code == 500) {
          if (language == "EN") {
            Alert.alert("Please try again later");
          } else {
            Alert.alert("Sila cuba sebentar lagi");
          }
        } else if (path(["response", "status", "shortCode"], payload) !== "REQUEST_TIMEOUT") {
          let message = path(["response", "status", "message"], payload);
          message = message ? message : "Sorry, we are unable to identify you as Prudential customer per NRIC entered";
          Alert.alert(message);
        }
        return payload.response;
      },
      failureAction: actionNames.DOC_NRIC_FAILURE,
      toggleLoader: false
    }
  },
  [screens.DOC_SERVICE_LANDING_SCREEN]: {
    [actionNames.DOC_SERVICE_PRICING]: {
      successAction: actionNames.DOC_SERVICE_PRICING_SUCCESS,
      postSuccessHook: payload => ({
        pricing: payload.response.body
      }),
      failureAction: actionNames.DOC_SERVICE_PRICING_FAILURE
    }
  },
  [screens.DOC_SERVICE_PAYMENT_STATUS]: {
    [actionNames.DOC_SERVICE_REQUEST_CONSULTATION]: {
      successAction: actionNames.DOC_SERVICE_CONSULTATION_REQUEST_SUCCESS,
      postSuccessHook: payload => ({
        consultationId: payload.response.body.cid
      }),
      failureAction: actionNames.DOC_SERVICE_START_CONSULTATION_REQUEST_FAILURE,
      showAlert: (state, payload) => {
        return doctorAppointmentAlert(state, payload);
      },
      toggleLoader: false
    }
  },
  [screens.DOC_CONSULTATION_STATUS]: {
    [actionNames.DOC_SERVICE_START_CALL]: {
      successAction: actionNames.DOC_SERVICE_START_CALL_SUCCESS,
      postSuccessHook: payload => {
        const { body: { id, chatToken, apiKey } = {} } = payload.response;
        return {
          openTokSession: {
            sessionId: id,
            apiKey,
            token: chatToken
          }
        };
      },
      failureAction: actionNames.DOC_SERVICE_START_CALL_FAILURE,
      toggleLoader: false
    }
  },
  [screens.DOC_CONSULTATION_HISTORY]: {
    [actionNames.FETCH_CONSULATION_HISTORY]: {
      successAction: actionNames.FETCH_CONSULATION_HISTORY_SUCCESS,
      failureAction: actionNames.FETCH_CONSULATION_HISTORY_FAILED,
      postSuccessHook: (payload, state) => {
        return payload.response;
      },
      successHandler: (payload, state) => {
        return;
      },
      failureHook: (payload, state) => {
        return;
      },
      toggleLoader: false
    },
    [actionNames.FETCH_CONSULATION_DETAIL_BY_ID]: {
      successAction: actionNames.FETCH_CONSULATION_DETAIL_BY_ID_SUCCESS,
      failureAction: actionNames.FETCH_CONSULATION_DETAIL_BY_ID_FAILED,
      postSuccessHook: (payload, state) => {
        return payload.response;
      },
      successHandler: (payload, state) => {
        return;
      },
      failureHook: (payload, state) => {
        return;
      },
      toggleLoader: false
    },
    [actionNames.FETCH_CONSULATION_LETTER_PRESCRIPTION]: {
      successAction:
      actionNames.FETCH_CONSULATION_LETTER_PRESCRIPTION_SUCCESS,
      postSuccessHook: (payload, state) => {
        return payload.response;
      },
      failureAction:
      actionNames.FETCH_CONSULATION_LETTER_PRESCRIPTION_FAILED,
      toggleLoader: false
    }
  }
  // [pageKeys.FEEDBACK_SCREEN]: {
  //   [SUBMIT_FEEDBACK]: {
  //     successAction: SUBMIT_FEEDBACK_DONE,
  //     postSuccessHook: payload => ({}),
  //     failureAction: SUBMIT_FEEDBACK_ERROR,
  //     toggleLoader: false
  //   }
  // }
};
