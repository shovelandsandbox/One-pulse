import {
  CoreUtils,
  CoreConfig,
  CoreServices,
  CoreActionTypes,
  CoreConstants as pcCoreConstants
} from "@pru-rt-internal/pulse-common";
import { path } from "ramda";

const {
  ConsultationStatus,
  RegistrationStatus,
  ConsultationType,
  CONSULTATION_TIME_OUT_VALUE,
} = pcCoreConstants;
const { getPayloadForNavigation } = CoreUtils;
const { pageKeys } = CoreConfig;

import screenNames from "../ScreenNames";
import actionNames from "../actionNames";

const { getFirebaseMsgToken } = CoreServices;

const isConsultationInProgress = state => {
  const {
    lastRequestTimestamp,
    consultationStatus
  } = state.doctorOnCallService;
  const isRequestTimedOut =
    CONSULTATION_TIME_OUT_VALUE > new Date() - new Date(lastRequestTimestamp);
  return (
    consultationStatus === ConsultationStatus.REQUESTED && isRequestTimedOut
  );
};

// eslint-disable-next-line complexity
export const docOnCallServiceHandler = ({ store, action }) => {
  const state = store.getState();
  //Check if consent is given for action or not
  const params = {
    navAndResetStack: false
  };
  let navigateTo = screenNames.DOC_INTRO_TERMS_CONDITION;
  //doctorToken is available then the user is registered
  const DOCTncConsent = path(
    ["termsConditions", "DOC", "consent"],
    state.profile
  );
  if (
    isConsultationInProgress(state) &&
    state.doctorOnCallService.callType === ConsultationType.VIDEO_CHAT
  ) {
    navigateTo = screenNames.DOC_CONSULTATION_STATUS;
  } else if (state.auth.docServiceToken) {
    navigateTo = screenNames.DOC_SERVICE_LANDING_SCREEN;
    state.doctorOnCallService.consultationStatus = ConsultationStatus.INIT;
  } else if (DOCTncConsent === "ACCEPT") {
    if (
      state.doctorOnCallService.registrationStatus ===
      RegistrationStatus.REGISTERED
    ) {
      navigateTo = screenNames.DOC_SERVICE_LANDING_SCREEN;
    } else {
      navigateTo = screenNames.DOC_GET_STARTED;
    }
  } else if (DOCTncConsent === "REJECT") {
    navigateTo = screenNames.DOC_INTRO_TERMS_CONDITION;
  } else if (
    state.doctorOnCallService.registrationStatus ===
    RegistrationStatus.PHONE_OTP_VERIFIED ||
    state.doctorOnCallService.registrationStatus ===
    RegistrationStatus.TNC_ACCEPTED
  ) {
    navigateTo = screenNames.DOC_GET_STARTED;
  }
  getFirebaseMsgToken().then(fcmToken => {
    // console.log(fcmToken,"-------------")
    store.dispatch({
      context: pageKeys.LOGIN,
      type: CoreActionTypes.UPDATE_CUSTOMER_DEVICE_1,
      payload: {
        fcmToken
      }
    });
  });
  return getPayloadForNavigation(action, navigateTo, params);
};

//Method to handle terms and conditions in document service intro page
export const DocOnCallTCAccepted = ({ store, action }) => {
  return getPayloadForNavigation(action, screenNames.DOC_GET_STARTED, {
    navAndResetStack: false
  });
};

export const DocServiceStartCall = ({ store, action }) => {
  const { apiKey, sessionId, token } = action.payload.openTokSession;
  if (apiKey && sessionId && token) {
    return getPayloadForNavigation(action, pageKeys.OPENTOK_VIDEO_CALL, null);
  }
};

export const DocOnCallServiceDoctorAvailableHandler = ({ action }) => {
  if (
    action.payload.type === "video" &&
    action.payload.appointmentStatus === "accept" &&
    !action.payload.disableRouting
  ) {
    return getPayloadForNavigation(
      action,
      screenNames.DOC_CONSULTATION_STATUS,
      null
    );
  } else if (
    action.payload.type === "audio" &&
    action.payload.appointmentStatus === "accept"
  ) {
    return getPayloadForNavigation(action, null, {
      gotoPreviousStack: true
    });
  }
  return action;
};

export const DocOnCallServicePaymentHandler = ({ action }) => {
  const { paymentStatus, serviceId } = action.payload;
  const params = {
    paymentStatus,
    serviceId
  };
  return getPayloadForNavigation(
    action,
    screenNames.DOC_SERVICE_PAYMENT_STATUS,
    params
  );
};

export const DocServiceRegisterSuccess = ({ action }) =>
  getPayloadForNavigation(action, screenNames.DOC_SERVICE_LANDING_SCREEN, null);

export const DocServiceNricFail = ({ store, action }) => {
  if (action.payload.status.code == 500) {
    return getPayloadForNavigation(
      action,
      screenNames.DOC_REGISTRATION_SCREEN,
      {
        gotoPreviousStack: true
      }
    );
  }
};

export const DocServiceToManageProfile = ({ action }) =>
  getPayloadForNavigation(action, "Profile", action.payload);

export const DocServiceStartConsultation = ({ action }) => {
  if (action.payload.callType === ConsultationType.VIDEO_CHAT) {
    return getPayloadForNavigation(
      action,
      screenNames.DOC_CONSULTATION_STATUS,
      null
    );
  }
  return action;
};

export const goToHealthTab = ({ action }) => {
  return getPayloadForNavigation(action, pageKeys.PULSE_HEALTH_PAGE, null);
};

export const DocServiceCallHandler = ({ action }) => {
  if (action.payload.status === ConsultationStatus.COMPLETED) {
    return getPayloadForNavigation(
      action,
      screenNames.DOC_SERVICE_FEEDBACK,
      { resetStack: true }
    );
  }
  return null;
};

const DocOnCallFsmConfig = {
  DoctorOnCall: {
    [actionNames.DOC_TALK_TO_DOCTOR]: docOnCallServiceHandler
  },
  [screenNames.DOC_INTRO_TERMS_CONDITION]: {
    [actionNames.DOC_SERVICE_TNC_ACCEPTED]: DocOnCallTCAccepted,
    [actionNames.GO_TO_COMMON]: pageKeys.COMMON,
    [actionNames.GO_TO_HEALTH_TAB]: { navigateTo: pageKeys.PULSEHEALTH }
  },
  [screenNames.DOC_REGISTRATION_SCREEN]: {
    [CoreActionTypes.GO_TO_MANAGE_PROFILE]: DocServiceToManageProfile,
    [actionNames.DOC_SERVICE_REGISTER_PATIENT_SUCCESS]: DocServiceRegisterSuccess,
    [CoreActionTypes.DOC_NRIC_FAILURE]: DocServiceNricFail
  },
  [screenNames.DOC_CONSULTATION_STATUS]: {
    [actionNames.DOC_SERVICE_START_CALL_SUCCESS]: DocServiceStartCall,
    [actionNames.GO_TO_DOC_SERVICE]: docOnCallServiceHandler
  },
  [screenNames.DOC_SERVICE_LANDING_SCREEN]: {
    [actionNames.DOC_SERVICE_REQUEST_CONSULTATION]: DocServiceStartConsultation
  },
  [screenNames.DOC_SERVICE_PAYMENT_STATUS]: {
    [actionNames.DOC_SERVICE_LANDING_SCREEN]: docOnCallServiceHandler,
    [actionNames.DOC_SERVICE_REQUEST_CONSULTATION]: DocServiceStartConsultation,
    [actionNames.GO_BACK_TO_PREVIOUS_STACK]: goToHealthTab
  },
  [pageKeys.BACKGROUND]: {
    [actionNames.DOC_SERVICE_DOCTOR_AVAILABILITY_STATUS]: DocOnCallServiceDoctorAvailableHandler,
    [actionNames.DOC_SERVICE_PAYMENT_STATUS]: DocOnCallServicePaymentHandler
  },
  [pageKeys.FOREGROUND]: {
    [actionNames.DOC_SERVICE_DOCTOR_AVAILABILITY_STATUS]: DocOnCallServiceDoctorAvailableHandler,
    [actionNames.DOC_SERVICE_PAYMENT_STATUS]: DocOnCallServicePaymentHandler
  },
  [pageKeys.OPENTOK_VIDEO_CALL]: {
    [actionNames.DOC_SERVICE_CALL_COMPLETE]: DocServiceCallHandler
  },
  [screenNames.DOC_SERVICE_FEEDBACK]: {
    [actionNames.GO_BACK_TO_PREVIOUS_STACK]: goToHealthTab
  }
};

export default DocOnCallFsmConfig;
