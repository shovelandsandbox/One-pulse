import {
  CoreConfig,
  CoreConstants,
  CoreActionTypes,
  CoreUtils,
} from "@pru-rt-internal/pulse-common";
import { omit, path, pathOr } from "ramda";
import moment from "moment";

/* eslint-disable object-shorthand */
const {
  DOC_SERVICE_TNC_ACCEPTED,
  DOC_SERVICE_VERFIY_OTP_SUCCESS,
  DOC_SERVICE_VERFIY_OTP_FAILURE,
  DOC_SERVICE_REGISTER_PATIENT_SUCCESS,
  DOC_SERVICE_REGISTER_PATIENT_FAILURE,
  DOC_SERVICE_REQUEST_CONSULTATION,
  DOC_SERVICE_VERIFY_PHONE,
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
  DOC_SERVICE_PAYMENT_CHECKOUT_SUCCESS,
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
  DOC_SERVICE_UPDATE_FILE_SUCCESS,
  SET_DOCTOR_ALLDATA,
  DOC_SERVICE_START_CONSULTATION_REQUEST_FAILURE,
  SET_PAYMENT_BY_FEATURE,
} = CoreActionTypes;
const {
  ConsultationStatus,
  RegistrationStatus,
  ConsultationType,
  CONSULTATION_TIME_OUT_VALUE,
} = CoreConstants;

const INITIAL_CONSULTATION_STATE = {
  openTokSession: {
    sessionId: null,
    apiKey: null,
    token: null,
  },
  userFeedback: {
    rating: null,
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
      firstName: "",
      middleName: "",
    },
  },
  upcomingAppointments: [],
};

export const INITIAL_STATE = {
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
      firstName: "",
    },
  },
  paymentConfirmation: {
    refNo: null,
    serviceId: null,
    paymentStatus: null,
    paymentMode: null,
  },
  userDoctorMessage: [],
  pricing: {},
  upcomingAppointments: [],
  preConsultationQuestions: { questions: [] },
  emergencyQuestions: { EmergencyConditions: [] },
  orderRef: "",
  episodeId: "",
  doctorId: "",
  doctorName: "",
  error: "",
  featureName: "",
};

const isConsultationInProgress = state => {
  const { consultation } = state;
  if (consultation.appointmentDate) {
    const isRequestTimedOut =
      CONSULTATION_TIME_OUT_VALUE >
      moment() - moment(consultation.appointmentDate);
    return isRequestTimedOut;
  }
  return false;
};

export const handleRegActionsConfig = {
  [SET_PAYMENT_BY_FEATURE]: (state, action) => {
    return {
      ...state,
      featureName: action.payload.name,
      featureParams: action.payload.params,
    };
  },
  [RESET_REGISTRATION_STATUS]: (state, action) => {
    return {
      ...state,
      registrationStatus: action.payload.registrationStatus,
      workflowId: null,
    };
  },
  [DOC_SERVICE_VERFIY_OTP_SUCCESS]: state => {
    return {
      ...state,
      registrationStatus: RegistrationStatus.PHONE_OTP_VERIFIED,
      error: null,
    };
  },
  [DOC_SERVICE_VERFIY_OTP_FAILURE]: (state, action) => {
    return {
      ...state,
      error: {
        otp: action.payload.errorMsg,
      },
    };
  },
  [DOC_SERVICE_RESEND_OTP]: state => {
    return {
      ...state,
      error: null,
    };
  },
  [DOC_SERVICE_CLEAN_STATE]: state => {
    let type = false;
    const userDoctorMessage = state.userDoctorMessage.map(item => {
      if (state.userName === item.userName) {
        type = true;
        item = {
          ...INITIAL_STATE,
          doctorToken: state.doctorToken,
          userDoctorMessage: [],
        };
      }
      return item;
    });
    return {
      ...INITIAL_STATE,
      doctorToken: state.doctorToken,
      userDoctorMessage,
    };
  },
  [DOC_SERVICE_PRICING_SUCCESS]: (state, action) => {
    return {
      ...state,
      pricing: action.payload.pricing,
      isLoading: false
    };
  },
  [DOC_SERVICE_REGISTER_PATIENT_SUCCESS]: state => {
    return {
      ...state,
      registrationStatus: RegistrationStatus.REGISTERED,
      error: null,
    };
  },
  [DOC_SERVICE_REGISTER_PATIENT_FAILURE]: (state, action) => {
    return {
      ...state,
      workflowId: null,
      registrationStatus: RegistrationStatus.TNC_ACCEPTED,
      error: {
        form: action.payload.errorMsg,
      },
    };
  },
  [DOC_SERVICE_VERIFY_PHONE]: (state, action) => {
    return {
      ...state,
      mobileNumber: action.payload.mobileNumber,
      registrationStatus: RegistrationStatus.TNC_ACCEPTED,
    };
  },
  [DOC_SERVICE_VERFIY_PHONE_FAILURE]: (state, action) => {
    return {
      ...state,
      error: {
        form: action.payload.errorMsg,
      },
    };
  },
  [LOGOUT_DONE]: (state, action) => {
    return {
      ...state,
      registrationStatus: RegistrationStatus.NOT_REGISTERED,
    };
  },
  [DOC_SERVICE_VERFIY_PHONE_SUCCESS]: (state, action) => {
    return {
      ...state,
      workflowId: action.payload.workflowId,
      error: null,
    };
  },
  [SET_SYMPTOMS]: (state, action) => {
    if (action.payload.symptoms) {
      return {
        ...state,
        consultation: {
          symptoms: action.payload.symptoms,
        },
      };
    }
    return state;
  },
  [DOC_SERVICE_VERIFY_OTP_CANCEL]: state => {
    return {
      ...state,
      workflowId: null,
      error: null,
    };
  },
  [DOC_SERVICE_REQUEST_TIMED_OUT]: (state, action) => {
    let type = false;
    const userDoctorMessage = state.userDoctorMessage.map(item => {
      if (state.userName === item.userName) {
        type = true;
        item = {
          ...INITIAL_STATE,
          consultationStatus: ConsultationStatus.FAILED,
          doctorToken: state.doctorToken,
          userDoctorMessage: [],
        };
      }
      return item;
    });
    return state.consultationStatus === ConsultationStatus.REQUESTED &&
      action.payload.consultationId === state.consultationId
      ? {
          ...INITIAL_STATE,
          consultationStatus: ConsultationStatus.FAILED,
          doctorToken: state.doctorToken,
          userDoctorMessage,
        }
      : state;
  },
  [DOC_SERVICE_CALL_REQUEST_TIMED_OUT]: state => {
    let type = false;
    const userDoctorMessage = state.userDoctorMessage.map(item => {
      if (state.userName === item.userName) {
        type = true;
        item = {
          ...INITIAL_STATE,
          consultationStatus: ConsultationStatus.TIMED_OUT,
          doctorToken: state.doctorToken,
          userDoctorMessage: [],
        };
      }
      return item;
    });
    return state.consultationStatus < ConsultationStatus.IN_PROGRESS
      ? {
          ...INITIAL_STATE,
          consultationStatus: ConsultationStatus.TIMED_OUT,
          doctorToken: state.doctorToken,
          userDoctorMessage,
        }
      : state;
  },
  [INITIALIZE_DATA]: state => {
    // return INITIAL_STATE;
    let type = false;
    const userDoctorMessage = state.userDoctorMessage.map(item => {
      if (state.userName === item.userName) {
        type = true;
        item = {
          ...INITIAL_STATE,
          doctorToken: state.doctorToken,
          userDoctorMessage: [],
        };
      }
      return item;
    });
    return omit(
      ["registrationStatus"],
      {
        ...INITIAL_STATE,
        doctorToken: state.doctorToken,
        userDoctorMessage: userDoctorMessage
      },
    );
  },
  [DOC_SERVICE_INITIALIZE_DATA]: state => {
    let type = false;
    const userDoctorMessage = state.userDoctorMessage.map(item => {
      if (state.userName === item.userName) {
        if (!isConsultationInProgress(item)) {
          type = true;
          item = {
            ...INITIAL_STATE,
            doctorToken: state.doctorToken,
            userDoctorMessage: [],
          };
        }
      }
      return item;
    });
    return {
      ...INITIAL_STATE,
      userDoctorMessage,
      // doctorToken: state.doctorToken,
      // userDoctorMessage: [...state.userDoctorMessage],
    };
  },
  ["doc-init"]: () => {
    return INITIAL_STATE;
  },
  [DOC_SERVICE_TNC_ACCEPTED]: state => {
    return {
      ...state,
      registrationStatus: RegistrationStatus.TNC_ACCEPTED,
    };
  },
};

export const consultationReducerConfig = {
  [FIND_DOCTORS]: (state, action) => {
    return {
      ...state,
      consultation: {
        ...state.consultation,
        now: action.payload.now,
      },
    };
  },
  [SET_APPOINTMENT_DATE]: (state, action) => {
    return {
      ...state,
      consultation: {
        ...state.consultation,
        appointmentDate: action.payload.appointmentDate,
        now: action.payload.now,
      },
    };
  },
  [FIND_DOCTORS_SUCCESS]: (state, action) => {
    return {
      ...state,
      consultation: {
        ...state.consultation,
        availableDoctors: action.payload.availableDoctors,
      },
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
        doctorName: action.payload.doctorName,
      },
    };
  },
  [DOC_SERVICE_PAYMENT_CHECKOUT_SUCCESS]: (state, action) => {
    return {
      ...state,
      paymentConfirmation: {
        refNo: action.payload.orderRef,
        paymentStatus: 1,
        paymentMode: pathOr("BANK_PAYMENT", ["payload", "paymentMode"], action),
      },
    };
  },
  [DOC_SERVICE_PAYMENT_CHECKOUT_FAILURE]: (state, action) => {
    return {
      ...state,
      paymentConfirmation: {
        refNo: action.payload.orderRef,
        paymentStatus: 0,
        paymentMode: pathOr("BANK_PAYMENT", ["payload", "paymentMode"], action),
      },
    };
  },
  [DOC_SERVICE_RESET_PAYMENT_STATUS]: state => {
    return {
      ...state,
      consultation: {
        ...state.consultation,
        appointmentDate: null,
      },
      doctorId: "",
      doctorName: "",
      paymentConfirmation: {
        paymentStatus: null,
      },
    };
  },
  [DOC_SERVICE_PRE_CONSULTATION_QUESTIONS_SUCCESS]: (state, action) => {
    const questions = action.payload.preConsultationQuestions.questions;
    const question = questions[1].question;
    questions[1].question = questions[2].question;
    questions[2].question = question;
    console.log(
      "action.payload.preConsultationQuestions",
      action.payload.preConsultationQuestions
    );
    return {
      ...state,
      preConsultationQuestions: {
        ...action.payload.preConsultationQuestions,
        questions,
      },
    };
  },
  [DOC_SERVICE_GET_EMERGENCY_QUESTIONS_SUCCESS]: (state, action) => {
    const { emergencyQuestions } = action.payload;
    let { EmergencyConditions } = emergencyQuestions;
    EmergencyConditions = EmergencyConditions.split(",");
    
    const titles = EmergencyConditions[0].split(".");
    const emergencyConditionTitle = titles[0].substring(1);
    const emergencyConditionSubTitle = titles[1].trim();

    EmergencyConditions = EmergencyConditions.slice(1);
    const lastQIdx = EmergencyConditions.length - 1;
    const lastQues = EmergencyConditions[lastQIdx];
    EmergencyConditions[lastQIdx] = lastQues.substring(0, lastQues.length - 1);

    return {
      ...state,
      emergencyQuestions: {
        ...action.payload.emergencyQuestions,
        emergencyConditionTitle,
        emergencyConditionSubTitle,        
        EmergencyConditions,
      },
    };
  },
  [DOC_SERVICE_UPDATE_PRE_CONSULTATION_QUESTIONS_SUCCESS]: (state, action) => {
    const data = {};
    if (!state.doctorId) {
      data.doctorId = action.payload.doctorId;
    }
    return {
      ...state,
      episodeId: action.payload.episodeId,
      ...data,
    };
  },
  [DOC_SERVICE_SELECTED_DOCTOR]: (state, action) => {
    return {
      ...state,
      doctorName: action.payload.doctorName,
      doctorId: action.payload.doctorId,
    };
  },
  [DOC_SERVICE_UPDATE_FILE_SUCCESS]: (state, action) => {
    if(!action.payload.doctorId){
      return {
        ...state,
        episodeId: action.payload.episodeId,
      };
    }
    
      return {
        ...state,
        episodeId: action.payload.episodeId,
        doctorId: action.payload.doctorId,
      };
    
  },
  [DOC_SERVICE_PAYMENT_STATUS]: (state, action) => {
    const { refNo, serviceId, paymentStatus } = action.payload;
    return {
      ...state,
      paymentConfirmation: {
        refNo,
        serviceId,
        paymentStatus,
      },
    };
  },
  [DOC_SERVICE_CONSULTATION_REQUEST_SUCCESS]: (state, action) => {
    const doctorToken = action.payload.doctorToken;
    if (state.callType === ConsultationType.AUDIO_CHAT) {
      return {
        ...state,
        consultationId: action.payload.consultationId,
        consultation: {
          ...state.consultation,
          symptoms: [],
          appointmentDate: path(["payload", "appointmentDate"], action) || path(["consultation", "appointmentDate"], state) || "",
        },
        doctorToken,
        consultationStatus: ConsultationStatus.REQUESTED
      };
    }
    return {
      ...state,
      consultationId: action.payload.consultationId,
      consultation: {
        ...state.consultation,
        appointmentDate: path(["payload", "appointmentDate"], action) || path(["consultation", "appointmentDate"], state) || "",
      },
      doctorToken,
      consultationStatus: ConsultationStatus.REQUESTED
    };
  },
  [DOC_SERVICE_START_CONSULTATION_REQUEST_FAILURE]: state => {
    return {
      ...state,
      consultationId: null,
      consultationStatus: ConsultationStatus.FAILED
    };
  },
  [DOC_SERVICE_START_CALL_SUCCESS]: (state, action) => {
    const { apiKey, sessionId, token } = action.payload.openTokSession;
    if (!apiKey || !sessionId || !token) {
      let type = false;
      const userDoctorMessage = state.userDoctorMessage.map(item => {
        if (state.userName === item.userName) {
          type = true;
          item = {
            ...INITIAL_STATE,
            consultationStatus: ConsultationStatus.FAILED,
            doctorToken: state.doctorToken,
            userDoctorMessage: [],
          };
        }
        return item;
      });
      return {
        ...INITIAL_STATE,
        consultationStatus: ConsultationStatus.FAILED,
        doctorToken: state.doctorToken,
        userDoctorMessage,
      };
    }
    return {
      ...state,
      consultation: {
        ...state.consultation,
        openTokSession: action.payload.openTokSession,
        startTime: new Date(),
      },
    };
  },
  [DOC_SERVICE_FIND_CONSULTATION_REPORTS_SUCCESS]: (state, action) => {
    return {
      ...state,
      reportList: action.payload.reportList,
    };
  },
  [SET_DOCTOR_ALLDATA]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      userDoctorMessage: [...state.userDoctorMessage],
    };
  },
  [DOC_SERVICE_DOCTOR_AVAILABILITY_STATUS]: (state, action) => {
    let type = false;
    const userDoctorMessage = state.userDoctorMessage.map(item => {
      if (action.payload.userName === item.userName) {
        type = true;
        item = {
          ...state,
          userName: action.payload.userName,
          appointmentStatus: action.payload.appointmentStatus,
          disableRouting: action.payload.disableRouting,
          consultationStatus: action.payload.consultationStatus,
          consultationId: action.payload.appointmentId,
          consultation: {
            ...state.consultation,
            doctorName: action.payload.doctorName,
          },
          userDoctorMessage: [],
        };
      }
      return item;
    });
    if (!type) {
      userDoctorMessage.push({
        ...state,
        userName: action.payload.userName,
        appointmentStatus: action.payload.appointmentStatus,
        disableRouting: action.payload.disableRouting,
        consultationStatus: action.payload.consultationStatus,
        consultationId: action.payload.appointmentId,
        consultation: {
          ...state.consultation,
          doctorName: action.payload.doctorName,
        },
        userDoctorMessage: [],
      });
    }
    return {
      ...state,
      appointmentStatus: action.payload.appointmentStatus,
      disableRouting: action.payload.disableRouting,
      consultationStatus: action.payload.consultationStatus,
      consultationId: action.payload.appointmentId,
      consultation: {
        ...state.consultation,
        doctorName: action.payload.doctorName,
      },
      userDoctorMessage,
    };
  },
  [DOC_SERVICE_CALL_COMPLETE]: (state, action) => {
    return {
      ...state,
      consultation: {
        ...state.consultation,
        // openTokSession: {},
        // symptom: [],
        endTime: new Date(),
      },
      // consultationStatus: action.payload.status,
      // lastRequestTimestamp: null,
      // consultationId: null,
      isAddedToCalendar: false,
    };
  },
  [DOC_SERVICE_GET_CASE_FILES_SUCCESS]: (state, action) => {
    return {
      ...state,
      caseFiles: action.payload.caseFiles,
    };
  },
  [DOC_SERVICE_ADD_TO_CALENDAR]: state => {
    return {
      ...state,
      isAddedToCalendar: true,
    };
  },
  [DOC_SERVICE_DOWNLOAD_CASE_FILES_SUCCESS]: (state, action) => {
    return {
      ...state,
      file: action.payload.file,
    };
  },
  [DOC_SERVICE_VIEW_LAB_REPORTS_SUCCESS]: (state, action) => {
    return {
      ...state,
      labReports: action.payload.labReports,
    };
  },
  [DOC_SERVICE_VIEW_LAB_REPORTS_DETAILS_SUCCESS]: (state, action) => {
    return {
      ...state,
      labReportDetails: action.payload.labReportDetails,
    };
  },
  [DOC_SERVICE_GET_EMERGENCY_INFO_SUCCESS]: (state, action) => {
    // let doctorToken = action.payload.doctorToken;
    // if(state.doctorToken) {
    //   doctorToken = isConsultationInProgress(state) ? state.doctorToken : action.payload.doctorToken;
    // }
    return {
      ...state,
      emergencyInfo: action.payload,
      // doctorToken,
    };
  },
  [DOC_SERVICE_GET_EMERGENCY_INFO_FAILURE]: (state, action) => {
    return {
      ...state,
      error: action.payload.code,
    };
  },
  [DOC_SERVICE_UPDATE_EMERGENCY_INFO_FAILURE]: (state, action) => {
    return {
      ...state,
      error: action.payload.message,
    };
  },
  [DOC_SERVICE_GET_UPCOMIMG_APOOINTMENTS_SUCCESS]: (state, action) => {
    return {
      ...state,
      upcomingAppointments: action.payload.upcomingAppointments,
    };
  },
  [DOC_SERVICE_UPDATE_EMERGENCY_QUESTION_USER_INPUT_SUCCESS]: (
    state,
    action
  ) => {
    return {
      ...state,
      emergencyQuestionResponse: action.payload.response.body,
      emergencyQuestionResponseReceived: true,
    };
  },
  [DOC_SERVICE_UPDATE_EMERGENCY_QUESTION_USER_INPUT_FAILURE]: (
    state,
    action
  ) => {
    return {
      ...state,
      emergencyQuestionResponse: "",
      emergencyQuestionResponseReceived: false,
    };
  },
  [RESET_DOC_SERVICE_UPDATE_EMERGENCY_QUESTION_USER_INPUT]: state => {
    return {
      ...state,
      emergencyQuestionResponse: "",
      emergencyQuestionResponseReceived: false,
    };
  },
};

export const reportsReducerConfig = {
  [DOC_SERVICE_GET_CASE_NOTES_SUCCESS]: (state, action) => {
    return {
      ...state,
      caseFiles: action.payload.caseFiles,
    };
  },
};
