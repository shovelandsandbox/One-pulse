import { screenNames } from "../screenNames"
import { buildPayload, buildPayloadWithAccessToken } from "../../../../utils/apiUtils";
import {

  DOC_SERVICE_UPDATE_PHONE,
  DOC_SERVICE_VERIFY_PHONE,
  DOC_SERVICE_VERIFY_OTP,
  DOC_SERVICE_REGISTER_PATIENT,
  DOC_SERVICE_RESEND_OTP,
  DOC_SERVICE_HALO_DOC_GROUPS,
  DOC_SERVICE_HALO_DOC_SEARCH,
  GET_CONSULTATION_BY_ID,
  DOC_SERVICE_HALO_DOC_APPOINTMENT,
  HALODOC_CONSULTATION_PAYMENT_STATUS,
  HALODOC_ADD_PROMOCODE,
  HALODOC_REMOVE_PROMOCODE,
  FETCH_CONSULTATION_PAYMENT_URL,
  DOC_SERVICE_HALO_DOC_CONFIRM_APPOINTMENT,
  DOC_SERVICE_HALO_DOC_UPDATE_DOCTOR_APPOINTMENT,
  HALODOC_SEND_CHAT_MESSAGE,
  HALODOC_LOAD_CHAT_MESSAGES,
  HALODOC_SEND_CHAT_ATTACHMENT,
  DOC_SERVICE_HALO_DOC_FILTER,
  DOC_SERVICE_HALO_DOC_CHAT,
  HALODOC_SEND_AV_CALL_START_MESSAGE,
  HALODOC_SEND_AV_CALL_END_MESSAGE,
  GET_CONSULTATION_STATUS,
} from '../actionNames'


//DOC SERVICE SPECIFIC
const getDocServiceParams = store => {
  const state = store.getState();
  return {
    id: state.auth.email,
    realm: "doctor",
  };
};

const haloDocApiCall = {
  [screenNames.HALODOC_PATIENT_REGISTRATION]: {
    [DOC_SERVICE_UPDATE_PHONE]: {
      payloadBuilder: (store, action) => {
        console.log("mkmk_up", action.payload);
        const { countryPhoneCode, mobileNumber } = action.payload;
        const body = {
          contactDetails: {
            phone: {
              value: mobileNumber,
            },
          },
        };

        return buildPayload(
          store,
          "updateCustomer",
          null,
          body,
          null
        );
      },
      loader: true,
    },

    [DOC_SERVICE_VERIFY_PHONE]: {
      payloadBuilder: (store, action) => {
        const { countryPhoneCode, mobileNumber } = action.payload;
        const body = {
          channel: "PHONE",
          value: `${countryPhoneCode}${mobileNumber}`,
        };
        return buildPayload(store, "updateCustomerContact", null, body, null);
      },
      loader: true,
    },

    [DOC_SERVICE_VERIFY_OTP]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const body = {
          otp: action.payload.otp,
        };
        const params = {
          workflowId: state.haloDocServices.workflowId,
        };

        return buildPayload(
          store,
          "updateCustomerContact",
          "otpVerification",
          body,
          params
        );
      },
      loader: true,
    },

    [DOC_SERVICE_REGISTER_PATIENT]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const params = {
          realm: "doctor",
        };
        const body = {
          ...action.payload,
        };
        return buildPayload(store, "createCustomer", null, body, params);
      },
    },

    [DOC_SERVICE_RESEND_OTP]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const { countryPhoneCode, mobileNumber } = action.payload;
        const params = {
          workflowId: state.haloDocServices.workflowId,
        };
        return buildPayload(
          store,
          "updateCustomerContact",
          "resendOtp",
          null,
          params
        );
      },
      loader: true,
    },
  },

  [screenNames.HALODOC_SPECIALIZATIONS]: {
    [DOC_SERVICE_HALO_DOC_GROUPS]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          page_no: "1",
          per_page: "100",
        };
        const body = {
          ...action.payload
        };
        return buildPayload(
          store,
          "getPractitionerSpecialties",
          null,
          body,
          params
        );
      },
      loader: true,
    },
  },

  [screenNames.HALODOC_DOCTOR_SEARCH]: {
    [DOC_SERVICE_HALO_DOC_SEARCH]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          page: "10", // number of records per page
          page_size: action.payload.pageNo, //page number ex - 1st/2nd/3rd page
        };
        const body = {
          ...action.payload.body,
        };
        return buildPayload(store, "findDoctorsByCriteria", null, body, params);
      },
      // loader: true
    },
  },

  [screenNames.HALODOC_DOCTOR_INFO]: {
    [GET_CONSULTATION_BY_ID]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          id: action.payload.consultationId,
        };
        return buildPayload(store, "getConsultationById", null, null, params);
      },
      loader: true,
    },
    [DOC_SERVICE_HALO_DOC_APPOINTMENT]: {
      payloadBuilder: (store, action) => {
        console.log("action", action);
        const params = {
          realm: "doctor",
        };
        const body = action.payload;
        return buildPayload(store, "getDoctorAppointment", null, body, params);
      },
    },
    [HALODOC_CONSULTATION_PAYMENT_STATUS]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          consultation_id: action.payload.consultationId,
        };
        const body = action.payload.body;
        return buildPayload(
          store,
          "confirmDoctorAppointment",
          null,
          body,
          params
        );
      },
      loader: true,
    },
    [HALODOC_ADD_PROMOCODE]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          consultationId: action.payload.consultationId,
          promocodeFor: "teleconsultation",
          method: "PUT",
        };
        const body = {
          attributes: {
            promoCode: action.payload.promoCode,
          },
        };
        return buildPayload(store, "updateOrderPromotions", null, body, params);
      },
      loader: true,
    },
    [HALODOC_REMOVE_PROMOCODE]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          consultationId: action.payload.consultationId,
          promocodeFor: "teleconsultation",
          method: "DELETE",
        };
        const body = {
          attributes: {
            promoCode: action.payload.promoCode,
          },
        };
        return buildPayload(store, "updateOrderPromotions", null, body, params);
      },
      loader: true,
    },
    [FETCH_CONSULTATION_PAYMENT_URL]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          consultationId: action.payload.consultationId,
          paymentMethod: action.payload.paymentMethod,
          paymentFor: "teleconsultation",
        };
        return buildPayload(store, "initiatePayment", null, null, params);
      },
      loader: true,
    },
    [DOC_SERVICE_HALO_DOC_CONFIRM_APPOINTMENT]: {
      payloadBuilder: (store, action) => {
        console.log("action", action);
        const params = {
          realm: "doctor",
          consultation_id: action.payload.consultation_id,
        };
        // const body = action.payload;
        return buildPayload(
          store,
          "confirmDoctorAppointment",
          null,
          null,
          params
        );
      },
    },

    [DOC_SERVICE_HALO_DOC_UPDATE_DOCTOR_APPOINTMENT]: {
      payloadBuilder: (store, action) => {
        console.log("action", action);
        const params = {
          consultationId: action.payload.consultationId,
          status: "cancel",
          realm: "doctor",
        };
        const body = action.payload.body;
        return buildPayloadWithAccessToken(
          store,
          "updateDoctorAppointment",
          null,
          body,
          params
        );
      },
    },
  },

  [screenNames.HALODOC_CONSULTATION]: {
    [GET_CONSULTATION_BY_ID]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          id: action.payload.consultationId,
        };
        return buildPayload(store, "getConsultationById", null, null, params);
      },
    },
    [HALODOC_SEND_CHAT_MESSAGE]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          convId: action.payload.consultationId,
        };
        const body = {
          message: {
            text: action.payload.message,
            type: "text",
          },
        };
        return buildPayload(
          store,
          "createConversationMessage",
          null,
          body,
          params
        );
      },
    },

    [HALODOC_LOAD_CHAT_MESSAGES]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          convId: action.payload.consultationId,
          page: "1",
          page_size: "50",
        };
        return buildPayload(
          store,
          "getConversationMessages",
          null,
          null,
          params
        );
      },
    },

    [HALODOC_SEND_CHAT_ATTACHMENT]: {
      payloadBuilder: (store, action) => {
        console.log("mkmk_1122", action);
        const params = {
          realm: "doctor",
          convId: action.payload.consultationId,
        };
        const body = {
          message: {
            comment: action.payload.content,
            type: "file_attachment",
            contentType: "image/jpeg",
            file: action.payload.filename,
          },
        };
        return buildPayload(
          store,
          "createConversationMessage",
          null,
          body,
          params
        );
      },
    },
  },
  [screenNames.HALODOC_DOCTORLIST]: {
    [DOC_SERVICE_HALO_DOC_FILTER]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
        };
        const body = {
          projs: null,
          filter: {
            logicalExpression: null,
            simpleExpression: {
              lhs: ["specialization"],
              op: "EQ",
              value: {
                value: [action.payload.value],
              },
            },
          },
          limit: null,
          orderBy: null,
        };
        return buildPayload(store, "findDoctorsByCriteria", null, body, params);
      },
      loader: true
    },
  },
  // voice call 
  [screenNames.HALODOC_VOICE_CALL]: {
    [DOC_SERVICE_HALO_DOC_CHAT]: {
      payloadBuilder: (store, action) => {
        console.log("action", action);
        const params = {
          realm: "doctor",
          consultation_id: action.payload.consultation_id,
          capability: action.payload.capability,
        };
        return buildPayload(store, "getChatSession", null, null, params);
      },
    },
    [GET_CONSULTATION_BY_ID]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          id: action.payload.consultationId,
        };
        return buildPayload(store, "getConsultationById", null, null, params);
      },
    },
    [HALODOC_SEND_AV_CALL_START_MESSAGE]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          convId: action.payload.consultationId,
        };
        const body = {
          message: {
            text: action.payload.message,
            type: "custom",
            attributes: {
              content: {
                av_room_id: action.payload.callRoomId,
                call_init_user_name: action.payload.callUserName,
                call_type: "audio",
                consultation_id: action.payload.consultationId,
                conversation_id: action.payload.chatRoomId,
                is_secure_call: true,
              },
              type: action.payload.customMessageType,
            },
          },
        };
        return buildPayload(
          store,
          "createConversationMessage",
          null,
          body,
          params
        );
      },
    },
    [HALODOC_SEND_AV_CALL_END_MESSAGE]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          convId: action.payload.consultationId,
        };
        const body = {
          message: {
            text: action.payload.message,
            type: "custom",
            attributes: {
              content: {
                av_room_id: action.payload.callRoomId,
                call_init_user_name: action.payload.callUserName,
                call_type: "audio",
                consultation_id: action.payload.consultationId,
                conversation_id: action.payload.chatRoomId,
                is_secure_call: true,
                disconnect_reason: "CANCELLED",
              },
              type: action.payload.customMessageType,
            },
          },
        };
        return buildPayload(
          store,
          "createConversationMessage",
          null,
          body,
          params
        );
      },
    },
  },


  // video call
  [screenNames.HALODOC_VIDEO_CALL]: {
    [DOC_SERVICE_HALO_DOC_CHAT]: {
      payloadBuilder: (store, action) => {
        console.log("action", action);
        const params = {
          realm: "doctor",
          consultation_id: action.payload.consultation_id,
          capability: action.payload.capability,
        };
        return buildPayload(store, "getChatSession", null, null, params);
      },
    },
    [GET_CONSULTATION_BY_ID]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          id: action.payload.consultationId,
        };
        return buildPayload(store, "getConsultationById", null, null, params);
      },
    },
    [HALODOC_SEND_AV_CALL_START_MESSAGE]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          convId: action.payload.consultationId,
        };
        const body = {
          message: {
            text: action.payload.message,
            type: "custom",
            attributes: {
              content: {
                av_room_id: action.payload.callRoomId,
                call_init_user_name: action.payload.callUserName,
                call_type: "video",
                consultation_id: action.payload.consultationId,
                conversation_id: action.payload.chatRoomId,
                is_secure_call: true,
              },
              type: action.payload.customMessageType,
            },
          },
        };
        return buildPayload(
          store,
          "createConversationMessage",
          null,
          body,
          params
        );
      },
    },
    [HALODOC_SEND_AV_CALL_END_MESSAGE]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          convId: action.payload.consultationId,
        };
        const body = {
          message: {
            text: action.payload.message,
            type: "custom",
            attributes: {
              content: {
                av_room_id: action.payload.callRoomId,
                call_init_user_name: action.payload.callUserName,
                call_type: "video",
                consultation_id: action.payload.consultationId,
                conversation_id: action.payload.chatRoomId,
                is_secure_call: true,
                disconnect_reason: "CANCELLED",
              },
              type: action.payload.customMessageType,
            },
          },
        };
        return buildPayload(
          store,
          "createConversationMessage",
          null,
          body,
          params
        );
      },
    },
  },
  [screenNames.HALODOC]: {
    [GET_CONSULTATION_STATUS]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          pageSize: 1,
          pageNumber: 1,
          statuses: "confirmed,started",
        };
        return buildPayload(store, "getAllConsultations", null, null, params);
      },
    },
  },

}


export default haloDocApiCall;