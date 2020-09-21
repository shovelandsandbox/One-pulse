import {
  CoreConfig,
  CoreActionTypes,
  CoreUtils,
} from "@pru-rt-internal/pulse-common";
import * as ActionTypes from "../actions/Types";

const { pageKeys } = CoreConfig;
const { buildPayload, getDocServiceParams, getTimeStamp } = CoreUtils;

const apiCallMiddlewareConfig = {
  [pageKeys.DOC_SERVICE_REGISTER]: {
    [CoreActionTypes.DOC_SERVICE_VERIFY_PHONE]: {
      payloadBuilder: (store, action) => {
        const { countryPhoneCode, mobileNumber, email } = action.payload;
        const body = {
          contactDetails: {
            phone: {
              value: mobileNumber,
            },
            email: {
              value: email,
            },
          },
        };
        let params = {
          ...getDocServiceParams(store),
          countryPhoneCode,
        };
        // if (verificationRequired) {
        params = {
          ...getDocServiceParams(store),
          verificationRequired: "true",
          countryPhoneCode,
        };
        // }

        return buildPayload(
          store,
          "createCustomer",
          "createCustomerInitialState",
          body,
          params
        );
      },
      loader: true,
    },
    [CoreActionTypes.DOC_SERVICE_REGISTER_PATIENT]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const {
          firstName,
          surName,
          email,
          phone,
          country,
          dob,
          documents,
          street,
          city,
          zipcode,
          sex,
          countryName,
          tncVersion,
          privacyVersion,
          countryPhoneCode,
        } = action.payload;

        const body = {
          firstName,
          surName,
          dob,
          sex,
          contactDetails: {
            email: {
              value: email,
            },
            phone: {
              value: phone,
            },
            device: {
              value: state.auth.fcmToken,
            },
          },
          addressDetails: {
            home: {
              line1: null,
              line2: street,
              city,
              state: null,
              country: countryName,
              zipcode,
            },
          },
          documents: [documents],
          //TODO: ML payload below
          termsConditions: {
            Prudential: {
              consent: "ACCEPT",
              org: "Prudential",
              version: tncVersion,
              consentDate: getTimeStamp(),
              privacy: "ACCEPT",
              privacyDate: getTimeStamp(),
              privacyVersion: privacyVersion,
            },
          },
          //TODO: SG Payload below
          termsAccepted: true,
        };
        const params = {
          realm: "doctor",
          workflowId: state.doctorServices.workflowId,
          countryPhoneCode,
        };
        return buildPayload(
          store,
          "createCustomer",
          "invokePartnerRegistrationState",
          body,
          params
        );
      },
      loader: true,
    },
  },
  [pageKeys.DOCTOR_PROFILE]: {
    [ActionTypes.GET_DOCTOR_PROFILE]: {
      payloadBuilder: (store, action) => {
        const { doctorId } = action.payload;
        const params = {
          realm: "doctor",
        };
        const body = {
          projs: null,
          filter: {
            logicalExpression: null,
            simpleExpression: {
              lhs: ["doctorId"],
              op: "EQ",
              value: {
                // value: [action.payload.doctorId],
                value: [doctorId],
              },
            },
          },
          limit: null,
          orderBy: null,
        };
        return buildPayload(store, "findDoctorsByCriteria", null, body, params);
      },
      loader: true,
    },
  },
  [pageKeys.DOC_SERVICE_LANDING]: {
    [CoreActionTypes.DOC_SERVICE_PRICING]: {
      payloadBuilder: store => {
        const params = {
          id: "m:service_charges",
        };
        return buildPayload(store, "getResourceById", null, null, params);
      },
      loader: true,
    },
    [CoreActionTypes.DOC_SERVICE_GET_EMERGENCY_INFO]: {
      payloadBuilder: store => {
        const params = {
          realm: "doctor",
        };
        return buildPayload(store, "getCustomerById", null, null, params);
      },
      loader: true,
    },
  },
  [pageKeys.DOC_SERVICE_EMERGENCY_QUESTIONS]: {
    [CoreActionTypes.DOC_SERVICE_UPDATE_EMERGENCY_INFO]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
        };
        const medicalHistory = action.payload.medicalHistory.map(item => {
          return { name: item };
        });
        const body = {
          relations: [
            {
              id: action.payload.contactId,
              customer: {
                contactDetails: {
                  phone: {
                    channel: "PHONE",
                    value: action.payload.contactNumber,
                  },
                },
                firstName: action.payload.contactName,
              },
              relationshipType: "Emergency Contact",
            },
          ],
          lifestyle: {
            allergies: action.payload.allergies,
            attributes: {
              medications: action.payload.attributes,
            },
            medicalHistory,
          },
        };
        console.log("DOC_SERVICE_UPDATE_EMERGENCY_INFO body: ", body);
        return buildPayload(store, "updateCustomer", null, body, params);
      },
      loader: true,
    },
    [CoreActionTypes.DOC_SERVICE_UPDATE_EMERGENCY_QUESTION_USER_INPUT]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          answerType: "emergency",
        };
        const body = {
          emergency: action.payload.emergencyInput,
        };
        return buildPayload(store, "updateDocument", null, body, params);
      },
      loader: true,
    },
  },
  [pageKeys.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS]: {
    [ActionTypes.DOC_SERVICE_UPDATE_FILE]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        console.log("file action.payload.doctorId", action.payload.doctorId);
        console.log(
          "file state.doctorServices.doctorId",
          state.doctorServices.doctorId
        );
        const params = {
          realm: "doctor",
          convId: action.payload.episodeId,
          answerType: "preConsult",
        };
        if (!action.payload.agentChat) {
          params.orderRef = state.doctorServices.paymentConfirmation.refNo;
          params.doctorId = action.payload.doctorId;
        }
        const body = {
          content: action.payload.content,
          type: "attachment",
          filename: action.payload.filename,
        };
        return buildPayload(store, "updateDocument", null, body, params);
      },
      loader: true,
    },
  },

  [pageKeys.CONSULTATION_HISTORY]: {
    [ActionTypes.CONCIERGE_HISTORY]: {
      payloadBuilder: (store, action) => {
        const parament = {
          realm: "doctor",
          chatType: "diary",
          access_token: action.payload.access_token,
        };
        return buildPayload(
          store,
          "getConversationMessages",
          null,
          null,
          parament
        );
      },
      loader: true,
    },
    [ActionTypes.CONSULTATION_HISTORY_LIST]: {
      payloadBuilder: (store, action) => {
        const parament = {
          access_token: action.payload.access_token,
        };
        return buildPayload(store, "patient", null, null, parament);
      },
      loader: true,
    },
    [ActionTypes.IMG_BASE]: {
      payloadBuilder: (store, action) => {
        console.log("api action filename", action);
        console.log("api  filename", action.payload);
        const parament = {
          realm: "doctor",
          access_token: action.payload.access_token,
        };
        const body = {
          projs: null,
          filter: {
            simpleExpression: null,
            logicalExpression: {
              op: "AND",
              expressions: [
                {
                  lhs: ["type"],
                  op: "EQ",
                  value: {
                    value: "image",
                  },
                },
                {
                  op: "EQ",
                  lhs: ["fileName"],
                  value: {
                    value: action.payload.fileName,
                  },
                },
              ],
            },
          },
          limit: null,
          orderBy: null,
        };
        return buildPayload(
          store,
          "findDocumentsByCriteria",
          null,
          body,
          parament
        );
      },
      loader: true,
    },
    [ActionTypes.GET_ATTACHMENT]: {
      payloadBuilder: (store, action) => {
        // const payload = {
        //   access_token: store.getState().auth.token,
        //   operation: 'findDocumentsByCriteria',
        //   correlationId:"",
        // };
        // return payload;
        const parament = {
          access_token: store.getState().auth.token,
          realm: "doctor",
        };
        const body = {
          filter: {
            simpleExpression: {
              lhs: ["episodeId"],
              op: "EQ",
              value: {
                value: action.payload.episodeId,
              },
            },
          },
        };
        return buildPayload(
          store,
          "findDocumentsByCriteria",
          null,
          body,
          parament
        );
      },
    },
    [ActionTypes.GET_ALLCASENOTES]: {
      payloadBuilder: (store, action) => {
        const parament = {
          access_token: store.getState().auth.token,
          realm: "doctor",
        };
        const body = {
          id: action.payload.episodeId,
        };
        return buildPayload(store, "getAllCaseNotes", null, body, parament);
      },
    },
    [CoreActionTypes.FETCH_CONSULATION_LETTER_PRESCRIPTIOM]: {
      payloadBuilder: (store, action) => {
        const id = action.payload.id;
        const token = action.payload.id;
        const type = action.payload.type;

        const body = {};

        const params = {
          realm: "doctor",
          type: type,
          token,
          id,
        };
        return buildPayload(store, "getConsultationById", null, body, params);
      },
      loader: true,
    },
  },
  [pageKeys.MY_DOC_CHAT_SCREEN]: {
    [CoreActionTypes.MYDOC_LOAD_CHAT_MESSAGES]: {
      payloadBuilder: (store, action) => {
        const payload = {
          access_token: store.getState().auth.token,
          operation: "getConversationMessages",
          realm: "doctor",
          convId: action.payload.episodeId,
        };
        return payload;
      },
      loader: false,
    },
    [ActionTypes.MYDOC_GET_IMG_BASE]: {
      payloadBuilder: (store, action) => {
        const parament = {
          realm: "doctor",
        };

        const body = {
          projs: null,
          filter: {
            simpleExpression: null,
            logicalExpression: {
              op: "AND",
              expressions: [
                {
                  lhs: ["type"],
                  op: "EQ",
                  value: {
                    value: action.payload.docType,
                  },
                },
                {
                  op: "EQ",
                  lhs: ["fileName"],
                  value: {
                    value: action.payload.fileName,
                  },
                },
              ],
            },
          },
          limit: null,
          orderBy: null,
        };
        return buildPayload(
          store,
          "findDocumentsByCriteria",
          null,
          body,
          parament
        );
      },
      loader: true,
    },
    [ActionTypes.GET_MYDOC_PROFILE]: {
      payloadBuilder: (store, action) => {
        const date = action.payload.date;
        const parament = {
          realm: "doctor",
          access_token: store.getState().auth.token,
        };
        const body = {
          filter: {
            simpleExpression: {
              lhs: ["date"],
              op: "WITHIN",
              value: {
                value: ["2019-08-01", date],
              },
            },
          },
        };
        return buildPayload(
          store,
          "findDocumentsByCriteria",
          null,
          body,
          parament
        );
      },
      loader: true,
    },
    [CoreActionTypes.MYDOC_SEND_CHAT_MESSAGE]: {
      payloadBuilder: (store, action) => {
        const payload = {
          access_token: store.getState().auth.token,
          operation: "createConversationMessage",
          realm: "doctor",
          convId: action.payload.episodeId,
          body: {
            message: {
              text: action.payload.message,
            },
          },
        };
        return payload;
      },
    },
  },
  [pageKeys.REWARD]: {
    [CoreActionTypes.VALIDATE_NRIC]: {
      payloadBuilder: (store, action) => {
        const nric = action.payload.nric.toUpperCase();
        const dob = action.payload.formatDate;
        const policyNo = action.payload.policyNumnber;
        const body = {
          dob: dob,
          policies: [
            {
              policyNo: "",
            },
          ],
          externalIds: {
            nric: nric,
          },
        };
        const params = {
          realm: "prudential",
        };
        return buildPayload(store, "existCustomer", null, body, params);
      },
      loader: true,
    },
  },
  ["SUBSCRIPTION"]: {
    [ActionTypes.GET_SUBSCRIPTIONS]: {
      payloadBuilder: (store, action) => {
        return buildPayload(
          store,
          "getAllCustomerSubscriptions",
          null,
          null,
          null
        );
      },
    },
    [ActionTypes.GET_ALL_SUBSCRIPTIONS]: {
      payloadBuilder: (store, action) => {
        const body = {
          query: [
            {
              filter: action.payload.criteria,
              namespace: action.payload.countryCode,
              appVersion: action.payload.appVersion,
              category: action.payload.category,
              appOs: action.payload.appOs,
            },
          ],
        };
        return buildPayload(
          store,
          "findProductSubscriptionsByCriteria",
          null,
          body,
          null
        );
      },
    },
    [ActionTypes.CREATE_CUSTOMER_SUBSCRIPTION]: {
      payloadBuilder: (store, action) => {
        const { createCustomerSubscriptionPayload } = action.payload;
        return buildPayload(
          store,
          "createSubscription",
          null,
          createCustomerSubscriptionPayload,
          null
        );
      },
    },
  },
};

export default apiCallMiddlewareConfig;
