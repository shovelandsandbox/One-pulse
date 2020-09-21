import screenNames from "../ScreenNames";
import actionNames from "../actionNames";
import { buildPayload } from "../../../../utils/apiUtils";
import AppConfig from "../../../../config/AppConfig";
const GET_ENV = AppConfig.getBuildEnv();

const verificationRequired = GET_ENV == "dev" ? false : true;
const demoMode = GET_ENV == "dev" ? true : false;

const getDocServiceParams = store => {
  const state = store.getState();
  return {
    id: state.profile.email,
    realm: "doctor"
  };
};

export default {
  [screenNames.DOC_REGISTRATION_SCREEN]: {
    [actionNames.DOC_SERVICE_VERIFY_PHONE]: {
      payloadBuilder: (store, action) => {
        const { countryPhoneCode, mobileNumber } = action.payload;
        const body = {
          contactDetails: {
            phone: {
              value: mobileNumber
            }
          }
        };
        let params = {
          ...getDocServiceParams(store),
          countryPhoneCode
        };
        if (verificationRequired) {
          params = {
            ...getDocServiceParams(store),
            verificationRequired: "true",
            countryPhoneCode
          };
        }
        return buildPayload(
          store,
          "createCustomer",
          "createCustomerInitialState",
          body,
          params
        );
      },
      loader: true
    },

    [actionNames.DOC_SERVICE_VERIFY_OTP]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const body = {
          otp: action.payload.otp
        };
        let params = {
          ...getDocServiceParams(store),
          workflowId: state.doctorOnCallService.workflowId
        };
        if (verificationRequired) {
          params = {
            ...getDocServiceParams(store),
            verificationRequired: "true",
            workflowId: state.doctorOnCallService.workflowId
          };
        }
        return buildPayload(
          store,
          "createCustomer",
          "smsOtpVerificationState",
          body,
          params
        );
      },
      loader: true
    },

    [actionNames.DOC_SERVICE_RESEND_OTP]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const { countryPhoneCode, mobileNumber } = action.payload;
        const body = {
          contactDetails: {
            phone: {
              value: mobileNumber
            }
          }
        };
        const params = {
          ...getDocServiceParams(store),
          workflowId: state.doctorOnCallService.workflowId,
          countryPhoneCode
        };
        return buildPayload(
          store,
          "createCustomer",
          "resendSmsOtpVerificationState",
          body,
          params
        );
      },
      loader: true
    },

    [actionNames.DOC_SERVICE_REGISTER_PATIENT]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const { firstName, surName, email, phone, country } = action.payload;
        const body = {
          firstName,
          surName,
          contactDetails: {
            email: {
              value: email
            },
            phone: {
              value: phone
            }
            // device: {
            //   value: state.auth.fcmToken
            // }
          }
        };
        const params = {
          ...getDocServiceParams(store),
          workflowId: state.doctorOnCallService.workflowId,
          countryPhoneCode: country.countryPhoneCode
        };
        return buildPayload(
          store,
          "createCustomer",
          "invokePartnerRegistrationState",
          body,
          params
        );
      }
      // loader: true
    },

    [actionNames.DOC_NRIC]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const { NRICID } = action.payload;
        const body = {
          externalIds: {
            IC: NRICID
          }
        };
        const params = {
          token: state.auth.token,
          realm: "prudential"
        };
        return buildPayload(store, "existCustomer", "", body, params);
      },
      loader: true
    }
  },
  [screenNames.DOC_SERVICE_LANDING_SCREEN]: {
    [actionNames.DOC_SERVICE_PRICING]: {
      payloadBuilder: store => {
        const params = {
          id: "m:service_charges"
        };
        return buildPayload(store, "getResourceById", null, null, params);
      }
      // loader: true
    },
    [actionNames.UPDATE_TOKEN]: {
      payloadBuilder: store => {
        return buildPayload(store, "getAllCustomerConnect", null, null, null);
      }
    }
  },
  [screenNames.DOC_SERVICE_PAYMENT_STATUS]: {
    [actionNames.DOC_SERVICE_REQUEST_CONSULTATION]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const { symptoms } = action.payload;
        const { orderRefNumber } = action.payload;
        const body = {
          patient: {
            type: "new",
            contactDetails: {
              email: {
                value: state.profile.email
              }
            }
          },
          type: action.payload.callType,
          orderRef: orderRefNumber
        };
        //todo: 50 character limit
        if (symptoms && symptoms.trim().length) {
          body.patientCondition = symptoms.trim();
        }
        let params = {
          ...getDocServiceParams(store)
        };
        if (demoMode) {
          params = {
            ...getDocServiceParams(store),
            mode: "demo"
          };
        }

        return buildPayload(store, "getDoctorAppointment", null, body, params);
      },
      loader: true
    }
  },
  [screenNames.DOC_CONSULTATION_STATUS]: {
    [actionNames.DOC_SERVICE_START_CALL]: {
      payloadBuilder: store => {
        const state = store.getState();
        let params = {
          ...getDocServiceParams(store),
          id: state.doctorOnCallService.consultationId
        };
        if (demoMode) {
          params = {
            ...getDocServiceParams(store),
            id: state.doctorOnCallService.consultationId,
            mode: "demo"
          };
        }
        return buildPayload(store, "getChatSession", null, null, params);
      },
      loader: true
    }
  },
  [screenNames.DOC_CONSULTATION_HISTORY]: {
    [actionNames.FETCH_CONSULATION_HISTORY]: {
      payloadBuilder: (store, action) => {
        const startDate = action.payload.startDate;
        const endDate = action.payload.endDate;
        const pageSize = action.payload.pageSize;
        const pageNumber = action.payload.pageNumber;
        const body = {};
        const params = {
          startDate,
          endDate,
          pageSize,
          pageNumber,
          realm: "doctor"
        };
        return buildPayload(store, "getAllConsultations", null, null, params);
      },
      loader: true
    },
    [actionNames.FETCH_CONSULATION_DETAIL_BY_ID]: {
      payloadBuilder: (store, action) => {
        const id = action.payload.id;
        const body = {};
        const params = {
          realm: "doctor",
          id
        };
        return buildPayload(store, "getConsultationById", null, null, params);
      },
      loader: true
    },
    [actionNames.FETCH_CONSULATION_LETTER_PRESCRIPTION]: {
      payloadBuilder: (store, action) => {
        const id = action.payload.id;
        const token = action.payload.id;
        const type = action.payload.type;

        const body = {};
        const params = {
          realm: "doctor",
          type: type,
          token,
          id
        };
        return buildPayload(store, "getDocumentById", null, null, params);
      },
      loader: true
    }
  }
};
