import { screenNames } from "../screenNames";
import * as HalodocActions from "../actionNames";
import { CoreActionTypes, CoreConfig, CoreServices, CoreConstants, events, CoreUtils } from "@pru-rt-internal/pulse-common";

import { CustomAlert } from '../../../../components'
import { forEachObjIndexed, path, pathOr, find, propEq, isNil } from "ramda";
import MetaConstants from "../../meta";

const { logFirebaseEvent } = CoreUtils;
const { NavigationService } = CoreServices;
const {
  RegistrationStatus
} = CoreConstants;
import {

  DOC_SERVICE_VERIFY_PHONE,
  HALODOC_SERVICE_VERFIY_PHONE_SUCCESS,
  HALODOC_SERVICE_VERFIY_PHONE_FAILURE,

  DOC_SERVICE_REGISTER_PATIENT,
  DOC_SERVICE_REGISTER_PATIENT_SUCCESS,
  DOC_SERVICE_REGISTER_PATIENT_FAILURE,

  DOC_SERVICE_VERIFY_OTP,
  DOC_SERVICE_VERFIY_OTP_SUCCESS,
  DOC_SERVICE_VERFIY_OTP_FAILURE,


  DOC_SERVICE_RESEND_OTP,
  DOC_SERVICE_RESEND_OTP_SUCCESS,
  DOC_SERVICE_RESEND_OTP_FAILURE,

  DOC_SERVICE_HALO_DOC_GROUPS,
  DOC_SERVICE_HALO_DOC_GROUPS_SUCCESS,
  DOC_SERVICE_HALO_DOC_GROUPS_FAILURE,

  DOC_SERVICE_UPDATE_PHONE,
  DOC_SERVICE_UPDATE_PHONE_SUCCESS,
  DOC_SERVICE_UPDATE_PHONE_FAILURE,

  DOC_SERVICE_HALO_DOC_SEARCH,
  DOC_SERVICE_HALO_DOC_SEARCH_SUCCESS,
  DOC_SERVICE_HALO_DOC_SEARCH_FAILURE,

  DOC_SERVICE_HALO_DOC_APPOINTMENT,
  DOC_SERVICE_HALO_DOC_APPOINTMENT_SUCCESS,
  DOC_SERVICE_HALO_DOC_APPOINTMENT_FAILURE,

  GET_CONSULTATION_BY_ID,
  GET_CONSULTATION_BY_ID_SUCCESS,
  GET_CONSULTATION_BY_ID_FAILURE,

  FETCH_HALODOC_CONSULTATION_DATA_FAILURE,
  FETCH_HALODOC_CONSULTATION_DATA_SUCCESS,

  HALODOC_CONSULTATION_PAYMENT_STATUS,
  HALODOC_CONSULTATION_PAYMENT_STATUS_SUCCESS,
  HALODOC_CONSULTATION_PAYMENT_STATUS_FAILURE,

  HALODOC_ADD_PROMOCODE,
  HALODOC_ADD_PROMOCODE_SUCCESS,
  HALODOC_ADD_PROMOCODE_FAILURE,

  HALODOC_REMOVE_PROMOCODE,
  HALODOC_REMOVE_PROMOCODE_SUCCESS,
  HALODOC_REMOVE_PROMOCODE_FAILURE,

  FETCH_CONSULTATION_PAYMENT_URL,
  FETCH_CONSULTATION_PAYMENT_URL_SUCCESS,
  FETCH_CONSULTATION_PAYMENT_URL_FAILURE,

  DOC_SERVICE_HALO_DOC_CONFIRM_APPOINTMENT,
  DOC_SERVICE_HALO_DOC_CONFIRM_APPOINTMENT_SUCCESS,
  DOC_SERVICE_HALO_DOC_CONFIRM_APPOINTMENT_FAILURE,

  DOC_SERVICE_HALO_DOC_UPDATE_DOCTOR_APPOINTMENT,
  DOC_SERVICE_HALO_DOC_UPDATE_DOCTOR_APPOINTMENT_SUCCESS,
  DOC_SERVICE_HALO_DOC_UPDATE_DOCTOR_APPOINTMENT_FAILURE,

  NAVIGATE_TELECONSULTATION_WAITING_SCREEN,
  NAVIGATE_BACK_ON_PAYMENT_FAILURE,
  NAVIGATE_TELECONSULTATION_PAYMENT_WEBVIEW,

  GET_CONSULTATION_BY_ID_JOIN_CALL_SUCCESS,
  GET_CONSULTATION_BY_ID_JOIN_CALL_FAILURE,

  HALODOC_SEND_CHAT_MESSAGE,
  HALODOC_SEND_CHAT_MESSAGE_SUCCESS,
  INTERNAL_CHAT_SEND_MESSAGE_FAILURE,

  HALODOC_LOAD_CHAT_MESSAGES,
  HALODOC_CHAT_LOAD_MESSAGES_SUCCESS,
  INTERNAL_CHAT_LOAD_MESSAGES_FAILURE,

  HALODOC_SEND_CHAT_ATTACHMENT,

  DOC_SERVICE_HALO_DOC_FILTER,
  DOC_SERVICE_HALO_DOC_FILTER_SUCCESS,
  DOC_SERVICE_HALO_DOC_FILTER_FAILURE,

  DOC_SERVICE_HALO_DOC_CHAT,
  DOC_SERVICE_HALO_DOC_CHAT_SUCCESS,
  DOC_SERVICE_HALO_DOC_CHAT_FAILURE,

  HALODOC_SEND_AV_CALL_START_MESSAGE,
  HALODOC_SEND_AV_CALL_START_MESSAGE_SUCCESS,
  HALODOC_SEND_AV_CALL_START_MESSAGE_FAILURE,

  HALODOC_SEND_AV_CALL_END_MESSAGE,
  HALODOC_SEND_AV_CALL_END_MESSAGE_SUCCESS,
  HALODOC_SEND_AV_CALL_END_MESSAGE_FAILURE,

  GET_CONSULTATION_STATUS,
  GET_CONSULTATION_STATUS_SUCCESS,
  GET_CONSULTATION_STATUS_FAILED,

} from '../actionNames'
import { Alert } from "react-native";

const haloDocApiResponse = {

  [screenNames.HALODOC_PATIENT_REGISTRATION]: {
    [DOC_SERVICE_VERIFY_PHONE]: {
      successAction: HALODOC_SERVICE_VERFIY_PHONE_SUCCESS,
      postSuccessHook: (payload, store) => {
        return {
          workflowId: path(["response", "workflowId"], payload),
          registrationStatus: RegistrationStatus.TNC_ACCEPTED
        }
      },
      failureAction: HALODOC_SERVICE_VERFIY_PHONE_FAILURE,
      failureHook: payload => {
        const metaConstants = { ...MetaConstants.talkToDoctorMeta() };
        if (payload.response.status.code === 999) {
          CustomAlert.show("", metaConstants.Generic_Error)
        }
        else {
          let msg = path(["response", "status", "message"], payload)
          const errMessage = msg ? msg : metaConstants.Error
          CustomAlert.show("", errMessage)

        }
        return {
          errorMsg: "Invalid Phone number",
        };
      },
      toggleLoader: false,
    },

    [DOC_SERVICE_VERIFY_OTP]: {
      successAction: DOC_SERVICE_VERFIY_OTP_SUCCESS,
      postSuccessHook: payload => {
        return {
          workflowId: payload.response.workflowId,
          registrationStatus: RegistrationStatus.TNC_ACCEPTED,
        }
      },
      failureAction: DOC_SERVICE_VERFIY_OTP_FAILURE,
      failureHook: payload => {
        const metaConstants = { ...MetaConstants.talkToDoctorMeta() };
        if (payload.response.status.code === 999) {
          CustomAlert.show("", metaConstants.Generic_Error)
        }
        else {
          let msg = path(["response", "status", "message"], payload)
          const errMessage = msg ? msg : metaConstants.Error
          CustomAlert.show("", errMessage)
        }
        return {
          errorMsg: metaConstants.OTPError,
        };
      },
      toggleLoader: false,
    },

    [DOC_SERVICE_UPDATE_PHONE]: {
      successAction: DOC_SERVICE_UPDATE_PHONE_SUCCESS,
      postSuccessHook: payload => ({
        workflowId: payload.response.workflowId,
        registrationStatus: RegistrationStatus.TNC_ACCEPTED,
      }),
      failureAction: DOC_SERVICE_UPDATE_PHONE_FAILURE,
      failureHook: payload => {
        const metaConstants = { ...MetaConstants.talkToDoctorMeta() };
        if (payload.response.status.code === 999) {
          CustomAlert.show("", metaConstants.Generic_Error)
        }
        else {
          let msg = path(["response", "status", "message"], payload)
          const errMessage = msg ? msg : metaConstants.Error
          CustomAlert.show("", errMessage)
        }
        return {
          errorMsg: metaConstants.OTPError,
        };
      },
      toggleLoader: false,
    },

    [DOC_SERVICE_REGISTER_PATIENT]: {
      successAction: DOC_SERVICE_REGISTER_PATIENT_SUCCESS,
      failureAction: DOC_SERVICE_REGISTER_PATIENT_FAILURE,
      toggleLoader: false,

      postSuccessHook: payload => ({
        docServiceToken: payload.response.doctor_token,
      }),
      failureHook: (payload, state, store) => {
        const metaConstants = { ...MetaConstants.talkToDoctorMeta() };
        const { language } = state.userPreferences;
        if (payload.response.status.code === 999) {
          CustomAlert.show("", metaConstants.Generic_Error)
        }
        else {
          let msg = path(["response", "status", "message"], payload)
          const errMessage = msg ? msg : metaConstants.Error
          CustomAlert.show("", errMessage)
        }
        return payload.response;
      },
    },

    [DOC_SERVICE_RESEND_OTP]: {
      successAction: DOC_SERVICE_RESEND_OTP_SUCCESS,
      postSuccessHook: payload => ({
        workflowId: payload.response.workflowId,
      }),
      failureAction: DOC_SERVICE_RESEND_OTP_FAILURE,
      failureHook: payload => {
        const metaConstants = { ...MetaConstants.talkToDoctorMeta() };
        if (payload.response.status.code === 999) {
          CustomAlert.show("", metaConstants.Generic_Error)
        }
        else {
          let msg = path(["response", "status", "message"], payload)
          const errMessage = msg ? msg : metaConstants.Error
          CustomAlert.show("", errMessage)
        }
        return {
          errorMsg: metaConstants.OTPError
        };
      },
      toggleLoader: false,
    },
  },

  [screenNames.HALODOC_SPECIALIZATIONS]: {
    [DOC_SERVICE_HALO_DOC_GROUPS]: {
      successAction: DOC_SERVICE_HALO_DOC_GROUPS_SUCCESS,
      postSuccessHook: payload => ({
        result: payload.response.body
      }),
      failureAction: DOC_SERVICE_HALO_DOC_GROUPS_FAILURE,
      toggleLoader: false,
    },
  },

  [screenNames.HALODOC_DOCTOR_SEARCH]: {
    [DOC_SERVICE_HALO_DOC_SEARCH]: {
      successAction: DOC_SERVICE_HALO_DOC_SEARCH_SUCCESS,
      postSuccessHook: payload => ({
        body: payload.response.body,
      }),
      failureAction: DOC_SERVICE_HALO_DOC_SEARCH_FAILURE,
      toggleLoader: false,
    },
  },

  [screenNames.HALODOC_DOCTOR_INFO]: {
    [GET_CONSULTATION_BY_ID]: {
      successAction: FETCH_HALODOC_CONSULTATION_DATA_SUCCESS,
      postSuccessHook: payload => ({
        data: payload.response.body,
      }),
      failureAction: FETCH_HALODOC_CONSULTATION_DATA_FAILURE,
      failureHook: (payload, state) => {
        return {
          errorMessage: payload.response.status.message,
        };
      },
      toggleLoader: false,
    },
    [DOC_SERVICE_HALO_DOC_APPOINTMENT]: {
      successAction: DOC_SERVICE_HALO_DOC_APPOINTMENT_SUCCESS,
      postSuccessHook: (payload, store) => {
        const metaConstants = { ...MetaConstants.talkToDoctorMeta() };
        let amount;
        if (payload.response.body) {
          amount = payload.response.body.total ? payload.response.body.total : "0.0";

          logFirebaseEvent("purchase", {
            product: "Halodoc Appointment",
            value: parseFloat(amount),
            currency: "IDR"
          });

          return {
            result: payload.response.body,
          }
        } else {
          let errMessage = metaConstants.Error;
          CustomAlert.show("", errMessage, {
            positiveText: metaConstants.OK,
            onPositivePress: () => {
              NavigationService.navigate("PulseHealth")
            },
          });
        }


      },
      failureAction: DOC_SERVICE_HALO_DOC_APPOINTMENT_FAILURE,
      failureHook: payload => {
        const metaConstants = { ...MetaConstants.talkToDoctorMeta() };
        if (payload.response.status.code === 999) {
          CustomAlert.show("", metaConstants.Generic_Error)
        }
        else {
          let msg = path(["response", "status", "message"], payload)
          const errMessage = msg ? msg : metaConstants.Error
          CustomAlert.show("", errMessage)
        }
      },
      toggleLoader: false,
    },
    [HALODOC_CONSULTATION_PAYMENT_STATUS]: {
      successAction: HALODOC_CONSULTATION_PAYMENT_STATUS_SUCCESS,
      failureAction: HALODOC_CONSULTATION_PAYMENT_STATUS_FAILURE,
      successHandler: (action, store) => {
        const state = store.getState();
        store.dispatch({
          context: screenNames.NAVIGATE_TELECONSULTATION_PAYMENT_ACTIONS,
          type: NAVIGATE_TELECONSULTATION_WAITING_SCREEN,
          payload: {
            docObject: path(["haloDocServices", "docObject"], state),
          },
        });
      },
      failureHandler: (action, store) => {
        store.dispatch({
          context: screenNames.NAVIGATE_TELECONSULTATION_PAYMENT_ACTIONS,
          type: NAVIGATE_BACK_ON_PAYMENT_FAILURE,
        });
      },
      toggleLoader: false,
    },
    [HALODOC_ADD_PROMOCODE]: {
      successAction: HALODOC_ADD_PROMOCODE_SUCCESS,
      postSuccessHook: payload => ({
        message: payload.response.message,
      }),
      dispatchActions: (payload, state) => {
        const consultationId = path(
          ["haloDocServices", "appointmentData", "customer_consultation_id"],
          state
        );
        return [
          {
            context: screenNames.HALODOC_DOCTOR_INFO,
            type: GET_CONSULTATION_BY_ID,
            payload: {
              consultationId,
              toggleLoader: true,
            },
          },
        ];
      },
      failureAction: HALODOC_ADD_PROMOCODE_FAILURE,
      failureHook: (payload, state) => {
        return {
          message: payload.response.status.message,
        };
      },
      toggleLoader: false,
    },
    [HALODOC_REMOVE_PROMOCODE]: {
      successAction: HALODOC_REMOVE_PROMOCODE_SUCCESS,
      postSuccessHook: payload => ({
        message: payload.response.message,
      }),
      dispatchActions: (payload, state) => {
        const consultationId = path(
          ["haloDocServices", "appointmentData", "customer_consultation_id"],
          state
        );
        return [
          {
            context: screenNames.HALODOC_DOCTOR_INFO,
            type: GET_CONSULTATION_BY_ID,
            payload: {
              consultationId,
              toggleLoader: true,
            },
          },
        ];
      },
      failureAction: HALODOC_REMOVE_PROMOCODE_FAILURE,
      failureHook: (payload, state) => {
        return {
          message: payload.response.status.message,
        };
      },
      toggleLoader: false,
    },
    [FETCH_CONSULTATION_PAYMENT_URL]: {
      successAction: FETCH_CONSULTATION_PAYMENT_URL_SUCCESS,
      postSuccessHook: payload => ({
        paymentLink: payload.response.body.payment_link,
        payment_reference_id: payload.response.body.customer_payment_id,
      }),
      successHandler: (action, store) => {
        const response = action.payload.response;
        if (response.hasOwnProperty("body")) {
          store.dispatch({
            context: screenNames.NAVIGATE_TELECONSULTATION_PAYMENT_ACTIONS,
            type: NAVIGATE_TELECONSULTATION_PAYMENT_WEBVIEW,
          });
        }
      },
      failureAction: FETCH_CONSULTATION_PAYMENT_URL_FAILURE,
      failureHook: (payload, state, store) => {
        return {
          errorMessage: path(["response", "status", "message"], payload),
        };
      },
      toggleLoader: false,
    },
    [DOC_SERVICE_HALO_DOC_CONFIRM_APPOINTMENT]: {
      successAction: DOC_SERVICE_HALO_DOC_CONFIRM_APPOINTMENT_SUCCESS,
      postSuccessHook: payload => ({
        result: payload.response.body,
      }),
      failureAction: DOC_SERVICE_HALO_DOC_CONFIRM_APPOINTMENT_FAILURE,
      failureHook: payload => {
        const metaConstants = { ...MetaConstants.talkToDoctorMeta() };
        if (payload.response.status.code === 999) {
          CustomAlert.show("", metaConstants.Generic_Error)
        }
        else {
          let msg = path(["response", "status", "message"], payload)
          const errMessage = msg ? msg : metaConstants.Error
          CustomAlert.show("", errMessage)
        }
      },
      toggleLoader: false,
    },
    [DOC_SERVICE_HALO_DOC_UPDATE_DOCTOR_APPOINTMENT]: {
      successAction: DOC_SERVICE_HALO_DOC_UPDATE_DOCTOR_APPOINTMENT_SUCCESS,
      postSuccessHook: payload => ({
        result: payload.response.body,
      }),
      failureAction: DOC_SERVICE_HALO_DOC_UPDATE_DOCTOR_APPOINTMENT_FAILURE,
      toggleLoader: false,
    },
  },

  [screenNames.HALODOC_CONSULTATION]: {
    [GET_CONSULTATION_BY_ID]: {
      successAction: GET_CONSULTATION_BY_ID_JOIN_CALL_SUCCESS,
      postSuccessHook: payload => {
        const qiscusRoomDetails = payload.response.body.attributes.qiscus;
        return {
          docObject: payload.response.body,
          chatRoomId: qiscusRoomDetails.room_id,
        };
      },
      failureAction: GET_CONSULTATION_BY_ID_JOIN_CALL_FAILURE,
      toggleLoader: false,
      failureHook: () => {
        const metaConstants = { ...MetaConstants.talkToDoctorMeta() };
        return {
          errorMsg: metaConstants.ConsultationDetailsFailed
        };
      },
    },
    [HALODOC_SEND_CHAT_MESSAGE]: {
      successAction: HALODOC_SEND_CHAT_MESSAGE_SUCCESS,
      failureAction: INTERNAL_CHAT_SEND_MESSAGE_FAILURE,
      toggleLoader: false,
    },

    [HALODOC_SEND_CHAT_ATTACHMENT]: {
      successAction: HALODOC_SEND_CHAT_MESSAGE_SUCCESS,
      failureAction: INTERNAL_CHAT_SEND_MESSAGE_FAILURE,
      toggleLoader: false,
    },

    [HALODOC_LOAD_CHAT_MESSAGES]: {
      successAction: HALODOC_CHAT_LOAD_MESSAGES_SUCCESS,
      failureAction: INTERNAL_CHAT_LOAD_MESSAGES_FAILURE,
      toggleLoader: false,
    },
  },

  [screenNames.HALODOC_DOCTORLIST]: {
    [DOC_SERVICE_HALO_DOC_FILTER]: {
      successAction: DOC_SERVICE_HALO_DOC_FILTER_SUCCESS,
      postSuccessHook: payload => ({
        result: payload.response.body,
      }),
      failureAction: DOC_SERVICE_HALO_DOC_FILTER_FAILURE,
      failureHook: payload => {
        const metaConstants = { ...MetaConstants.talkToDoctorMeta() };
        let msg = path(["response", "status", "message"], payload)
        const errMessage = msg ? msg : metaConstants.Error
        CustomAlert.show("", errMessage)
      },
      toggleLoader: false,
    },
  },

  [screenNames.HALODOC_VOICE_CALL]: {
    [DOC_SERVICE_HALO_DOC_CHAT]: {
      successAction: DOC_SERVICE_HALO_DOC_CHAT_SUCCESS,
      postSuccessHook: payload => {
        const findPatient = find(propEq("participant_type", "patient"));
        const patientCallDetails = findPatient(
          payload.response.body.participants
        );
        if (payload.response.body.token) {
          return {
            token: payload.response.body.token,
            roomId: payload.response.body.room_id,
            halodocUserId: patientCallDetails.entity_id,
          }
        } else {
          return {
            roomId: payload.response.body.room_id,
            halodocUserId: patientCallDetails.entity_id,
          }
        }

      },
      dispatchActions: (payload, state) => {
        return [
          {
            context: screenNames.HALODOC_VOICE_CALL,
            type: GET_CONSULTATION_BY_ID,
            payload: {
              consultationId:
                state.haloDocServices.appointmentData.customer_consultation_id,
            },
          },
        ];
      },
      failureAction: DOC_SERVICE_HALO_DOC_CHAT_FAILURE,
      failureHook: () => {
        const metaConstants = { ...MetaConstants.talkToDoctorMeta() };
        return {
          errorMsg: metaConstants.RoomDetailsFailed
        };
      },
    },
    [GET_CONSULTATION_BY_ID]: {
      successAction: GET_CONSULTATION_BY_ID_SUCCESS,
      postSuccessHook: payload => {
        const qiscusRoomDetails = payload.response.body.attributes.qiscus;
        return {
          chatRoomId: qiscusRoomDetails.room_id,
        };
      },
      failureAction: GET_CONSULTATION_BY_ID_FAILURE,
      toggleLoader: false,
      failureHook: () => {
        const metaConstants = { ...MetaConstants.talkToDoctorMeta() };
        return {
          errorMsg: metaConstants.ConsultationDetailsFailed
        };
      },
    },
    [HALODOC_SEND_AV_CALL_START_MESSAGE]: {
      successAction: HALODOC_SEND_AV_CALL_START_MESSAGE_SUCCESS,
      failureAction: HALODOC_SEND_AV_CALL_START_MESSAGE_FAILURE,
    },
    [HALODOC_SEND_AV_CALL_END_MESSAGE]: {
      successAction: HALODOC_SEND_AV_CALL_END_MESSAGE_SUCCESS,
      failureAction: HALODOC_SEND_AV_CALL_END_MESSAGE_FAILURE,
    },
  },

  [screenNames.HALODOC_VIDEO_CALL]: {
    [DOC_SERVICE_HALO_DOC_CHAT]: {
      successAction: DOC_SERVICE_HALO_DOC_CHAT_SUCCESS,
      postSuccessHook: payload => {
        const findPatient = find(propEq("participant_type", "patient"));
        const patientCallDetails = findPatient(
          payload.response.body.participants
        );

        if (payload.response.body.token) {
          return {
            token: path(["response", "body", "token"], payload),
            roomId: path(["response", "body", "room_id"], payload),
            halodocUserId: patientCallDetails.entity_id,
          }
        } else {
          return {
            roomId: path(["response", "body", "room_id"], payload),
            halodocUserId: patientCallDetails.entity_id,
          }
        }
      },
      dispatchActions: (payload, state) => {
        return [
          {
            context: screenNames.HALODOC_VIDEO_CALL,
            type: GET_CONSULTATION_BY_ID,
            payload: {
              consultationId:
                path(["haloDocServices", "appointmentData", "customer_consultation_id"], state),
            },
          },
        ];
      },
      failureAction: DOC_SERVICE_HALO_DOC_CHAT_FAILURE,
      failureHook: () => {
        const metaConstants = { ...MetaConstants.talkToDoctorMeta() };
        return {
          errorMsg: metaConstants.RoomDetailsFailed
        };
      },
    },
    [GET_CONSULTATION_BY_ID]: {
      successAction: GET_CONSULTATION_BY_ID_SUCCESS,
      postSuccessHook: payload => {
        const qiscusRoomDetails = payload.response.body.attributes.qiscus;
        return {
          chatRoomId: qiscusRoomDetails.room_id,
        };
      },
      failureAction: GET_CONSULTATION_BY_ID_FAILURE,
      toggleLoader: false,
      failureHook: () => {
        const metaConstants = { ...MetaConstants.talkToDoctorMeta() };
        return {
          errorMsg: metaConstants.ConsultationDetailsFailed
        };
      },
    },
    [HALODOC_SEND_AV_CALL_START_MESSAGE]: {
      successAction: HALODOC_SEND_AV_CALL_START_MESSAGE_SUCCESS,
      failureAction: HALODOC_SEND_AV_CALL_START_MESSAGE_FAILURE,
    },
    [HALODOC_SEND_AV_CALL_END_MESSAGE]: {
      successAction: HALODOC_SEND_AV_CALL_END_MESSAGE_SUCCESS,
      failureAction: HALODOC_SEND_AV_CALL_END_MESSAGE_FAILURE,
    },
  },
  [screenNames.HALODOC]: {
    [GET_CONSULTATION_STATUS]: {
      successAction: GET_CONSULTATION_STATUS_SUCCESS,
      postSuccessHook: payload => ({
        result: payload,
      }),
      successHandler: (action, store) => {
        const state = store.getState();
        const body = path(["payload", "response", "body"], action);
        if (body) {
          const isConsultationInProgress =
            body && body.length > 0 ? true : false;
          const consultationStatusForHealthCard =
            body && body.length > 0 ? body[0].status : "";
          if (!isNil(path(["haloDocServices", "docObject"], state)))
            var docObject = path(["haloDocServices", "docObject"], state);
          else {
            var docObject = {
              thumbnail_url: body[0].doctor.externalIds.thumbnail_url,
              image_url: body[0].doctor.externalIds.image_url,
              first_name: body[0].attributes.doctor_first_name,
              last_name: body[0].attributes.doctor_last_name,
              pre_salutation: body[0].doctor.externalIds.pre_salutation,
              doctor_id: body[0].attributes.doctor_id,
              doctor_speciality_names: body[0].attributes.doctor_speciality_names
            }
          }
          if (
            isConsultationInProgress &&
            consultationStatusForHealthCard === "confirmed"
          ) {
            store.dispatch({
              type: "GO_TO_SCREEN",
              navigateTo: screenNames.HALODOC_PATIENT_WAITING,
              payload: {
                params: {
                  docObject,
                  initiatedBy: "healthCard",
                },
              },
            });
          } else if (
            isConsultationInProgress &&
            consultationStatusForHealthCard === "started"
          ) {
            store.dispatch({
              type: HalodocActions.SET_CALL_DOC_OBJECT,
              payload: {
                docObject,
              }
            })
            store.dispatch({
              type: "GO_TO_SCREEN",
              navigateTo: screenNames.HALODOC_CONSULTATION,
              payload: {
                params: {
                  docObject,
                },
              },
            });
            store.dispatch({
              type: HalodocActions.HALODOC_LOAD_CHAT_MESSAGES,
              context: screenNames.HALODOC_CONSULTATION,
              payload: {
                type: HalodocActions.HALODOC_LOAD_CHAT_MESSAGES,
                context: screenNames.HALODOC_CONSULTATION,
                consultationId: body[0].id,
                toggleLoader: false
              }
            })
          } else {
            store.dispatch({
              type: "GO_TO_SCREEN",
              navigateTo: screenNames.HALODOC_SPECIALIZATIONS,
            });
          }
        } else {
          store.dispatch({
            type: "GO_TO_SCREEN",
            navigateTo: screenNames.HALODOC_SPECIALIZATIONS,
          });
        }
      },
      failureAction: GET_CONSULTATION_STATUS_FAILED,
      toggleLoader: false,
    },
  },

}

export default haloDocApiResponse