/* eslint-disable object-shorthand */
import actionNames from "./configs/actionNames";

const {
  DOC_SERVICE_TNC_ACCEPTED,
  DOC_SERVICE_VERFIY_OTP_SUCCESS,
  DOC_SERVICE_VERFIY_OTP_FAILURE,
  DOC_SERVICE_REGISTER_PATIENT_SUCCESS,
  DOC_SERVICE_REGISTER_PATIENT_FAILURE,
  DOC_SERVICE_REQUEST_CONSULTATION,
  DOC_SERVICE_VERIFY_PHONE,
  REWARDS_PHONE,
  DOC_SERVICE_VERFIY_PHONE_SUCCESS,
  DOC_SERVICE_VERFIY_PHONE_FAILURE,
  LOGOUT_DONE,
  DOC_SERVICE_VERIFY_OTP_CANCEL,
  DOC_SERVICE_CONSULTATION_REQUEST_SUCCESS,
  RESET_REGISTRATION_STATUS,
  DOC_SERVICE_DOCTOR_AVAILABILITY_STATUS,
  DOC_SERVICE_CALL_COMPLETE,
  DOC_SERVICE_START_CALL_SUCCESS,
  DOC_SERVICE_CALL_REQUEST_TIMED_OUT,
  SET_SYMPTOMS,
  DOC_SERVICE_REQUEST_TIMED_OUT,
  DOC_SERVICE_INITIALIZE_DATA,
  DOC_SERVICE_RESEND_OTP,
  INITIALIZE_DATA,
  FIND_DOCTORS,
  FIND_DOCTORS_SUCCESS,
  DOC_SERVICE_FIND_CONSULTATION_REPORTS_SUCCESS,
  DOC_SERVICE_GET_CASE_FILES_SUCCESS,
  DOC_SERVICE_ADD_TO_CALENDAR,
  DOC_SERVICE_GET_CASE_NOTES_SUCCESS,
  DOC_SERVICE_GET_UPCOMIMG_APOOINTMENTS_SUCCESS,
  DOC_SERVICE_GET_EMERGENCY_INFO_SUCCESS,
  DOC_SERVICE_VIEW_LAB_REPORTS_DETAILS_SUCCESS,
  DOC_SERVICE_VIEW_LAB_REPORTS_SUCCESS,
  DOC_SERVICE_DOWNLOAD_CASE_FILES_SUCCESS,
  DOC_SERVICE_PRICING_SUCCESS,
  DOC_SERVICE_PAYMENT_STATUS,
  DOC_ON_CALL_PAYMENT_SUCCESS,
  DOC_SERVICE_PRE_CONSULTATION_QUESTIONS_SUCCESS,
  DOC_SERVICE_UPDATE_PRE_CONSULTATION_QUESTIONS_SUCCESS,
  DOC_SERVICE_SELECTED_DOCTOR,
  DOC_SERVICE_GET_EMERGENCY_INFO_FAILURE,
  DOC_SERVICE_UPDATE_EMERGENCY_INFO_FAILURE,
  DOC_SERVICE_PAYMENT_CHECKOUT_FAILURE,
  DOC_SERVICE_RESET_PAYMENT_STATUS,
  DOC_SERVICE_CLEAN_STATE,
  DOC_SERVICE_UPDATE_EMERGENCY_QUESTION_USER_INPUT_SUCCESS,
  DOC_SERVICE_UPDATE_EMERGENCY_QUESTION_USER_INPUT_FAILURE,
  RESET_DOC_SERVICE_UPDATE_EMERGENCY_QUESTION_USER_INPUT,
  DOC_SERVICE_GET_EMERGENCY_QUESTIONS_SUCCESS,
  SET_APPOINTMENT_DATE,
  INIT_NOT_REGISTERED,
  FETCH_CONSULATION_HISTORY_SUCCESS,
  FETCH_CONSULATION_HISTORY_FAILED,
  FETCH_CONSULATION_DETAIL_BY_ID_SUCCESS,
  FETCH_CONSULATION_DETAIL_BY_ID_FAILED,
  FETCH_CONSULATION_LETTER_PRESCRIPTION_SUCCESS,
  FETCH_CONSULATION_LETTER_PRESCRIPTION_FAILED,
  SET_SERVICE_ID
} = actionNames;
import { CoreConstants } from "@pru-rt-internal/pulse-common";
const {
  ConsultationStatus,
  RegistrationStatus,
  ConsultationType
} = CoreConstants;

import { omit } from "ramda";

const INITIAL_CONSULTATION_STATE = {
  openTokSession: {
    sessionId: null,
    apiKey: null,
    token: null
  },
  userFeedback: {
    rating: null
  },
  symptoms: [],
  availableDoctors: [],
  appointmentDate: null,
  caseFiles: [],
  file: "",
  labReports: [],
  labReportDetails: [],
  emergencyInfo: {
    allergies: [],
    contactInfo: {
      id: null,
      phone: null,
      firstName: ""
    }
  },
  upcomingAppointments: []
};

const INITIAL_STATE = {
  registrationStatus: RegistrationStatus.NOT_REGISTERED,
  consultationStatus: ConsultationStatus.INIT,
  mobileNumber: null,
  workflowId: null,
  consultation: INITIAL_CONSULTATION_STATE,
  lastRequestTimestamp: null,
  consultationId: null,
  caseFiles: [],
  file: "",
  isAddedToCalendar: false,
  labReports: [],
  labReportDetails: [],
  emergencyInfo: {
    allergies: [],
    contactInfo: {
      id: null,
      phone: null,
      firstName: ""
    }
  },
  paymentConfirmation: {
    refNo: null,
    serviceId: null,
    paymentStatus: null
  },
  pricing: {},
  upcomingAppointments: [],
  preConsultationQuestions: { questions: [] },
  emergencyQuestions: { EmergencyConditions: "" },
  orderRef: "",
  episodeId: "",
  doctorId: "",
  doctorName: "",
  error: "",
  historyList: [],
  consulationDetail: {},
  consulationImage: ""
};

const handleRegActionsConfig = {
  [SET_SERVICE_ID]: (state, action) => {
    return {
      ...state,
      serviceId: action.payload.serviceId
    };
  },
  [RESET_REGISTRATION_STATUS]: (state, action) => {
    return {
      ...state,
      registrationStatus: action.payload.registrationStatus,
      workflowId: null
    };
  },
  [DOC_SERVICE_VERFIY_OTP_SUCCESS]: state => {
    return {
      ...state,
      registrationStatus: RegistrationStatus.PHONE_OTP_VERIFIED,
      error: null
    };
  },
  [DOC_SERVICE_VERFIY_OTP_FAILURE]: (state, action) => {
    return {
      ...state,
      error: {
        otp: action.payload.errorMsg
      }
    };
  },
  [DOC_SERVICE_RESEND_OTP]: state => {
    return {
      ...state,
      error: null
    };
  },
  [DOC_SERVICE_CLEAN_STATE]: () => {
    return {
      ...INITIAL_STATE
    };
  },
  [DOC_SERVICE_PRICING_SUCCESS]: (state, action) => {
    return {
      ...state,
      pricing: action.payload.pricing
    };
  },
  [DOC_SERVICE_REGISTER_PATIENT_SUCCESS]: state => {
    return {
      ...state,
      registrationStatus: RegistrationStatus.REGISTERED,
      error: null
    };
  },
  [DOC_SERVICE_REGISTER_PATIENT_FAILURE]: (state, action) => {
    return {
      ...state,
      workflowId: null,
      registrationStatus: RegistrationStatus.TNC_ACCEPTED,
      error: {
        form: action.payload.errorMsg
      }
    };
  },
  [DOC_SERVICE_VERIFY_PHONE]: (state, action) => {
    return {
      ...state,
      mobileNumber: action.payload.mobileNumber,
      registrationStatus: RegistrationStatus.TNC_ACCEPTED
    };
  },
  [REWARDS_PHONE]: (state, action) => {
    // console.log("REWARDS_PHONE",action)
    return {
      ...state,
      mobileNumber: action.payload.mobileNumber
    };
  },
  [DOC_SERVICE_VERFIY_PHONE_FAILURE]: (state, action) => {
    return {
      ...state,
      error: {
        form: action.payload.errorMsg
      }
    };
  },
  [LOGOUT_DONE]: (state, action) => {
    // console.log("LOGOUT_DONE111")

    return {
      ...state,
      registrationStatus: RegistrationStatus.NOT_REGISTERED
    };
  },
  [INIT_NOT_REGISTERED]: (state, action) => {
    return {
      ...state,
      registrationStatus: RegistrationStatus.NOT_REGISTERED
    };
  },
  [DOC_SERVICE_VERFIY_PHONE_SUCCESS]: (state, action) => {
    return {
      ...state,
      workflowId: action.payload.workflowId,
      error: null
    };
  },
  [SET_SYMPTOMS]: (state, action) => {
    if (action.payload.symptoms) {
      return {
        ...state,
        consultation: {
          symptoms: action.payload.symptoms
        }
      };
    }
    return state;
  },
  [DOC_SERVICE_VERIFY_OTP_CANCEL]: state => {
    return {
      ...state,
      workflowId: null,
      error: null
    };
  },
  [DOC_SERVICE_REQUEST_TIMED_OUT]: (state, action) => {
    return state.consultationStatus === ConsultationStatus.REQUESTED &&
      action.payload.consultationId === state.consultationId
      ? {
        ...INITIAL_STATE,
        consultationStatus: ConsultationStatus.FAILED
      }
      : state;
  },
  [DOC_SERVICE_CALL_REQUEST_TIMED_OUT]: state => {
    return state.consultationStatus < ConsultationStatus.IN_PROGRESS
      ? {
        ...INITIAL_STATE,
        consultationStatus: ConsultationStatus.TIMED_OUT
      }
      : state;
  },
  [INITIALIZE_DATA]: () => {
    // return INITIAL_STATE;
    return omit(["registrationStatus"], ...INITIAL_STATE);
  },
  [DOC_SERVICE_INITIALIZE_DATA]: () => {
    return INITIAL_STATE;
  },
  ["doc-init"]: () => {
    return INITIAL_STATE;
  },
  [DOC_SERVICE_TNC_ACCEPTED]: state => {
    return {
      ...state,
      registrationStatus: RegistrationStatus.TNC_ACCEPTED
    };
  }
};

const consultationReducerConfig = {
  [FIND_DOCTORS]: (state, action) => {
    return {
      ...state,
      consultation: {
        ...state.consultation,
        appointmentDate: action.payload.appointmentDate,
        now: action.payload.now
      }
    };
  },
  [SET_APPOINTMENT_DATE]: (state, action) => {
    return {
      ...state,
      consultation: {
        ...state.consultation,
        appointmentDate: action.payload.appointmentDate,
        now: action.payload.now
      }
    };
  },
  [FIND_DOCTORS_SUCCESS]: (state, action) => {
    return {
      ...state,
      consultation: {
        ...state.consultation,
        availableDoctors: action.payload.availableDoctors
      }
    };
  },
  [DOC_SERVICE_REQUEST_CONSULTATION]: (state, action) => {
    return {
      ...state,
      consultationStatus: ConsultationStatus.REQUESTED,
      lastRequestTimestamp: new Date(),
      callType: action.payload.callType,
      consultation: {
        ...state.consultation,
        doctorName: action.payload.doctorName
      }
    };
  },
  [DOC_ON_CALL_PAYMENT_SUCCESS]: (state, action) => {
    return {
      ...state,
      paymentConfirmation: {
        refNo: action.payload.orderRef,
        paymentStatus: 1
      }
    };
  },
  [DOC_SERVICE_PAYMENT_CHECKOUT_FAILURE]: (state, action) => {
    return {
      ...state,
      paymentConfirmation: {
        refNo: action.payload.orderRef,
        paymentStatus: 0
      }
    };
  },
  [DOC_SERVICE_RESET_PAYMENT_STATUS]: state => {
    return {
      ...state,
      paymentConfirmation: {
        paymentStatus: null
      }
    };
  },
  [DOC_SERVICE_PRE_CONSULTATION_QUESTIONS_SUCCESS]: (state, action) => {
    return {
      ...state,
      preConsultationQuestions: action.payload.preConsultationQuestions
    };
  },
  [DOC_SERVICE_GET_EMERGENCY_QUESTIONS_SUCCESS]: (state, action) => {
    return {
      ...state,
      emergencyQuestions: action.payload.emergencyQuestions
    };
  },
  [DOC_SERVICE_UPDATE_PRE_CONSULTATION_QUESTIONS_SUCCESS]: (state, action) => {
    return {
      ...state,
      episodeId: action.payload.episodeId,
      doctorId: action.payload.doctorId
    };
  },
  [DOC_SERVICE_SELECTED_DOCTOR]: (state, action) => {
    return {
      ...state,
      doctorName: action.payload.doctorName,
      doctorId: action.payload.doctorId
    };
  },
  [DOC_SERVICE_PAYMENT_STATUS]: (state, action) => {
    const { refNo, serviceId, paymentStatus } = action.payload;
    return {
      ...state,
      paymentConfirmation: {
        refNo,
        serviceId,
        paymentStatus
      }
    };
  },
  [DOC_SERVICE_CONSULTATION_REQUEST_SUCCESS]: (state, action) => {
    if (state.callType === ConsultationType.AUDIO_CHAT) {
      return {
        ...state,
        consultationId: action.payload.consultationId,
        consultation: {
          ...state.consultation,
          symptoms: []
        }
      };
    }
    return {
      ...state,
      consultationId: action.payload.consultationId
    };
  },
  [DOC_SERVICE_START_CALL_SUCCESS]: (state, action) => {
    const { apiKey, sessionId, token } = action.payload.openTokSession;
    if (!apiKey || !sessionId || !token) {
      return {
        ...INITIAL_STATE,
        consultationStatus: ConsultationStatus.FAILED
      };
    }
    return {
      ...state,
      consultation: {
        ...state.consultation,
        openTokSession: action.payload.openTokSession
      }
    };
  },
  [DOC_SERVICE_FIND_CONSULTATION_REPORTS_SUCCESS]: (state, action) => {
    return {
      ...state,
      reportList: action.payload.reportList
    };
  },
  [DOC_SERVICE_DOCTOR_AVAILABILITY_STATUS]: (state, action) => {
    return {
      ...state,
      consultationStatus: action.payload.consultationStatus,
      consultationId: action.payload.appointmentId,
      consultation: {
        ...state.consultation,
        doctorName: action.payload.doctorName
      }
    };
  },
  [DOC_SERVICE_CALL_COMPLETE]: (state, action) => {
    return {
      ...state,
      consultation: {
        ...state.consultation,
        openTokSession: {},
        symptom: []
      },
      consultationStatus: action.payload.status,
      lastRequestTimestamp: null,
      consultationId: null,
      isAddedToCalendar: false
    };
  },
  [DOC_SERVICE_GET_CASE_FILES_SUCCESS]: (state, action) => {
    return {
      ...state,
      caseFiles: action.payload.caseFiles
    };
  },
  [DOC_SERVICE_ADD_TO_CALENDAR]: state => {
    return {
      ...state,
      isAddedToCalendar: true
    };
  },
  [DOC_SERVICE_DOWNLOAD_CASE_FILES_SUCCESS]: (state, action) => {
    return {
      ...state,
      file: action.payload.file
    };
  },
  [DOC_SERVICE_VIEW_LAB_REPORTS_SUCCESS]: (state, action) => {
    return {
      ...state,
      labReports: action.payload.labReports
    };
  },
  [DOC_SERVICE_VIEW_LAB_REPORTS_DETAILS_SUCCESS]: (state, action) => {
    return {
      ...state,
      labReportDetails: action.payload.labReportDetails
    };
  },
  [DOC_SERVICE_GET_EMERGENCY_INFO_SUCCESS]: (state, action) => {
    return {
      ...state,
      emergencyInfo: action.payload
    };
  },
  [DOC_SERVICE_GET_EMERGENCY_INFO_FAILURE]: (state, action) => {
    return {
      ...state,
      error: action.payload.code
    };
  },
  [DOC_SERVICE_UPDATE_EMERGENCY_INFO_FAILURE]: (state, action) => {
    return {
      ...state,
      error: action.payload.message
    };
  },
  [DOC_SERVICE_GET_UPCOMIMG_APOOINTMENTS_SUCCESS]: (state, action) => {
    return {
      ...state,
      upcomingAppointments: action.payload.upcomingAppointments
    };
  },
  [DOC_SERVICE_UPDATE_EMERGENCY_QUESTION_USER_INPUT_SUCCESS]: (
    state,
    action
  ) => {
    return {
      ...state,
      emergencyQuestionResponse: action.payload.response.body,
      emergencyQuestionResponseReceived: true
    };
  },
  [DOC_SERVICE_UPDATE_EMERGENCY_QUESTION_USER_INPUT_FAILURE]: (
    state,
    action
  ) => {
    return {
      ...state,
      emergencyQuestionResponse: "",
      emergencyQuestionResponseReceived: false
    };
  },
  [RESET_DOC_SERVICE_UPDATE_EMERGENCY_QUESTION_USER_INPUT]: state => {
    return {
      ...state,
      emergencyQuestionResponse: "",
      emergencyQuestionResponseReceived: false
    };
  }
};

const reportsReducerConfig = {
  [DOC_SERVICE_GET_CASE_NOTES_SUCCESS]: (state, action) => {
    return {
      ...state,
      caseFiles: action.payload.caseFiles
    };
  }
};

const ConsulationHistoryConfig = {
  [FETCH_CONSULATION_HISTORY_SUCCESS]: (state, action) => {
    return { ...state, historyList: action.payload.body };
  },
  [FETCH_CONSULATION_HISTORY_FAILED]: (state) => {
    return { ...state, historyList: [] };
  },
  [FETCH_CONSULATION_DETAIL_BY_ID_SUCCESS]: (state, action) => {
    return { ...state, consulationDetail: action.payload.body }
  },
  [FETCH_CONSULATION_DETAIL_BY_ID_FAILED]: (state) => {
    return { ...state, consulationDetail: {} }
  },
  [FETCH_CONSULATION_LETTER_PRESCRIPTION_SUCCESS]: (state, action) => {
    return {
      ...state,
      consulationImage: action.payload.body
    }
  },
  [FETCH_CONSULATION_LETTER_PRESCRIPTION_FAILED]: (state) => {
    return {
      ...state,
      consulationImage: ""
    }
  }
};

const handleRegActions = (state, action) => {
  if (handleRegActionsConfig[action.type])
    return handleRegActionsConfig[action.type](state, action);
  return null;
};

// eslint-disable-next-line complexity
const ConsultationReducer = (state, action) => {
  if (consultationReducerConfig[action.type])
    return consultationReducerConfig[action.type](state, action);
  return null;
};

const ReportsReducer = (state, action) => {
  if (reportsReducerConfig[action.type])
    return reportsReducerConfig[action.type](state, action);
  return null;
};

const ConsulationHistoryReducer = (state, action) => {
  if (ConsulationHistoryConfig[action.type])
    return ConsulationHistoryConfig[action.type](state, action);
  return null;
};

export default (state = INITIAL_STATE, action) => {
  return (
    handleRegActions(state, action) ||
    ConsultationReducer(state, action) ||
    ConsulationHistoryReducer(state, action) ||
    ReportsReducer(state, action) ||
    state
  );
};
