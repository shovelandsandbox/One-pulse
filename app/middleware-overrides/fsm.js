import moment from "moment";
import { path, pathOr } from "ramda";
import _ from "lodash";
import { Alert, Platform } from "react-native";
import { setLocale } from "../utils/currency-utils";
import {
  CoreConfig,
  CoreConstants,
  CoreUtils,
  metaHelpers
} from "@pru-rt-internal/pulse-common";
import { buySubscription, getPurchasedProduct } from "../utils/subscription-pay-utils";
const { pageKeys } = CoreConfig;
const { getPayloadForNavigation } = CoreUtils;
const {
  CONSULTATION_TIME_OUT_VALUE,
  ConsultationStatus,
  ConsultationType,
  RegistrationStatus
} = CoreConstants;

const {
  TALKTOADOCTOR
} = CoreConfig;

const {
  FSM_DOCTOR_OUR_WORKING_HOURS,
  FSM_DOCTOR_TO,
  FSM_DOCTOR_COME_BACK_LATER,
  FSM_DOCTOR_ALERT,
  FSM_DOCTOR_OK
} = CoreConstants;

const isConsultationInProgress = state => {
  const { consultation } = state.doctorServices;
  if (consultation.appointmentDate) {
    const isRequestTimedOut = CONSULTATION_TIME_OUT_VALUE > (moment() - moment(consultation.appointmentDate));
    return isRequestTimedOut;
  }
  return false;
};

export const SetCurrencyLocale = ({action}) => {
  setLocale(path(["payload", "locale"], action));
  return true;
};
export const GoToNewProfileHandler = ({ action }) => {
  if (!action.payload.path) {
    return false;
  }
  return getPayloadForNavigation(action, action.payload.path, action.payload);
};
export const GoToPreConsultationQuestions = ({ action }) =>
  getPayloadForNavigation(
    action,
    pageKeys.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS,
    null
  );
export const GoToMedicalProfilePage = ({ action }) => {
  return getPayloadForNavigation(
    action,
    pageKeys.MYDOC_MEDICAL_PROFILE,
    null
  );
};

export const GoToPaymentMethodPage = ({ action }) => {
  return getPayloadForNavigation(action, pageKeys.GO_PAYMENT_METHOD_PAGE, null);
};

export const GoToPaymentMethodWebviewPage = ({ action }) => {
  return getPayloadForNavigation(
    action,
    pageKeys.GO_PAYMENT_METHOD_WEBVIEW_PAGE,
    null
  );
};

export const goToMainTermsAndConditions = ({ action }) => {
  const navigateTo = pageKeys.MAIN_TERMS_AND_CONDITIONS;
  const params = { fromAuthAction: true };
  return getPayloadForNavigation(action, navigateTo, params);
};

export const RegistrationSuccessHandler = ({ action }) => {
  return getPayloadForNavigation(action, "MainTab", {
    resetStack: true,
  });
};

export const goLoadingScreen = ({ action }) => {
  return getPayloadForNavigation(action, "CarouselScreen", {
    resetStack: true,
  });
};

export const gotoMyDocChatScreen = ({ action }) =>
  getPayloadForNavigation(action, pageKeys.MY_DOC_CHAT_SCREEN, {
    ...action.payload,
    chatType: 3,
  });

export const gotoMyDocPreConsultation = ({ action }) => {
  const params = {
    chatType: action.payload.chatType,
  };
  return getPayloadForNavigation(
    action,
    pageKeys.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS,
    params
  );
};

export const MyDocBookAppointmentHandler = ({ store, action }) => {
  const state = store.getState();
  const { now } = state.doctorServices.consultation;
  const navigateTo = pageKeys.DOC_SERVICE_UPCOMING_APPOINTMENTS;
  if (now) {
    //navigateTo = pageKeys.DOC_SERVICE_CONSULTATION;
  }
  return getPayloadForNavigation(action, navigateTo, null);
};

export const goCONVERSATION = ({ action }) => {
  const params = {
    chatData: action.payload.item,
    navAndResetStack: false,
  };
  return getPayloadForNavigation(action, pageKeys.CHAT_CONVERSATION, params);
};

export const DocServiceDoctorAvailableHandler = ({store, action }) => {
  if (action.payload.disableRouting) {
    return action;
  }
  switch (action.payload.appointmentStatus) {
    case "joined":
      return getPayloadForNavigation(
        action,
        pageKeys.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS,
        { chatType: 1 }
      );
    case "reject":
      return getPayloadForNavigation(action, pageKeys.PULSEHEALTH, {
        chatType: 1,
      });
  }
  return action;
};

export const DocServiceCallHandler = ({ action }) => {
  if (action.payload.status === ConsultationStatus.COMPLETED) {
    return getPayloadForNavigation(
      action,
      pageKeys.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS,
      { chatType: 2 }
    );
    // return getPayloadForNavigation(action, pageKeys.DOC_SERVICE_FEEDBACK, null);
  }
  return null;
};

const isConsultationStatusInProgress = (consultationStatus) => {
  if (consultationStatus === ConsultationStatus.COMPLETED ||
    consultationStatus === ConsultationStatus.FAILED ||
    ConsultationStatus === ConsultationStatus.INIT) {
    return false;
  } else {
    return true;
  }
}

const outOfDoctorWorkHours = (state) => {
  const { countryCommonMeta } = state.meta;
  const startHour = countryCommonMeta.doctorConsultationStartHour;
  const endHour = countryCommonMeta.doctorConsultationEndHour;
  const currentHour = moment().format("HH");
  return !_.inRange(currentHour, startHour, endHour);
}

const showOutOfWorkHoursAlert = (state) => {
  const { countryCommonMeta } = state.meta;
  const fsmMeta = loadDoctorFsmMeta();
  const startHour = countryCommonMeta.doctorConsultationStartHour;
  const endHour = countryCommonMeta.doctorConsultationEndHour;
  const displayText = `${fsmMeta.fsmDoctorOurWorkingHoursLabel} ${startHour}:00 ${fsmMeta.fsmDoctorToLabel} ${endHour}:00. ${fsmMeta.fsmDoctorComeBackLaterLabel}.`;
  const options = [
    {
      text: fsmMeta.fsmDoctorOkLabel
    },
  ];
  Alert.alert(fsmMeta.fsmDoctorAlertLabel, displayText, options, {
    cancelable: false,
  });
}

const loadDoctorFsmMeta = () => {
  const fsmDoctorOurWorkingHoursLabel = metaHelpers.findElement(TALKTOADOCTOR, FSM_DOCTOR_OUR_WORKING_HOURS).label;
  const fsmDoctorToLabel = metaHelpers.findElement(TALKTOADOCTOR, FSM_DOCTOR_TO).label;
  const fsmDoctorComeBackLaterLabel = metaHelpers.findElement(TALKTOADOCTOR, FSM_DOCTOR_COME_BACK_LATER).label;
  const fsmDoctorAlertLabel = metaHelpers.findElement(TALKTOADOCTOR, FSM_DOCTOR_ALERT).label;
  const fsmDoctorOkLabel = metaHelpers.findElement(TALKTOADOCTOR, FSM_DOCTOR_OK).label;
  return {
    fsmDoctorOurWorkingHoursLabel,
    fsmDoctorToLabel,
    fsmDoctorComeBackLaterLabel,
    fsmDoctorAlertLabel,
    fsmDoctorOkLabel
  }
}

// eslint-disable-next-line complexity
export const DocServiceHandler = ({ store, action }) => {
  const state = store.getState();
  const params = {
    navAndResetStack: false,
  };
  let navigateTo = pageKeys.DOC_SERVICE_TNC;

  const { consultationId, consultationStatus } = state.doctorServices;
  const { notificationGranted } = state.userPreferences;
  if (outOfDoctorWorkHours(state)) {
    showOutOfWorkHoursAlert(state);
    return null;
  } else if(!notificationGranted) {
    navigateTo = pageKeys.PULSE_NOTIFICATION_REQUEST;
  } else if (
    isConsultationInProgress(state) &&
    consultationId &&
    isConsultationStatusInProgress(consultationStatus)
  ) {
    params.chatType = 1;
    navigateTo = pageKeys.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS;
  } else if (state.auth.docServiceToken) {
    navigateTo = pageKeys.DOC_SERVICE_LANDING;
    state.doctorServices.consultationStatus = ConsultationStatus.INIT;
  } else if (state.doctorServices.registrationStatus === RegistrationStatus.TNC_ACCEPTED) {
    navigateTo = pageKeys.DOC_SERVICE_REGISTER;
  }
  console.log("DocServiceHandler-DocServiceHandler-DocServiceHandler-DocServiceHandler", navigateTo);
  return getPayloadForNavigation(action, navigateTo, params);
};

export const DocServiceTNCAccepted = ({ store, action }) => {
  return getPayloadForNavigation(action, pageKeys.DOC_SERVICE_INTRO, {
    navAndResetStack: false
  });
};

export const intiateGoogleSubscription = async ({ store, action }) => {
  const {
    googlePackageID,
    __actions: { resolve, reject },
  } = action.payload;
  try {
    const subscriptionRes = await buySubscription(googlePackageID);
    resolve && resolve(subscriptionRes);
  } catch (err) {
    reject && reject(err);
  }
};

export const getAvailablePurchases = async ({ store, action }) => {
  const {
    productId,
    __actions: { resolve, reject },
  } = action.payload;
  try {
    const availableProduct = await getPurchasedProduct(productId);
    resolve && resolve(availableProduct);
  } catch (err) {
    reject && reject(err);
  }
};
