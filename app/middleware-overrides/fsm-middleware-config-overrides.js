import { CoreConfig, CoreActionTypes } from "@pru-rt-internal/pulse-common";

import {
  GoToMedicalProfilePage,
  GoToPaymentMethodWebviewPage,
  GoToPaymentMethodPage,
  GoToPreConsultationQuestions,
  DocServiceHandler,
  MyDocBookAppointmentHandler,
  DocServiceDoctorAvailableHandler,
  GoToNewProfileHandler,
  DocServiceTNCAccepted,
  SetCurrencyLocale,
  intiateGoogleSubscription,
  getAvailablePurchases,
} from "./fsm";

const { pageKeys } = CoreConfig;

const middlewareConfig = {
  [pageKeys.ALL]: {
    [CoreActionTypes.SET_CURRENCY_LOCALE]: SetCurrencyLocale
  },
  [pageKeys.DOC_SERVICE]: {
    [CoreActionTypes.GETSTARTED]: DocServiceHandler
  },
  [pageKeys.GET_TREATMENT]: {
    [CoreActionTypes.GO_TO_DOC_SERVICE]: DocServiceHandler,
  },
  [pageKeys.DOC_SERVICE_INTRO]: {
    [CoreActionTypes.DOC_SERVICE_TNC_ACCEPTED]: DocServiceTNCAccepted,
  },
  [pageKeys.DOC_SERVICE_EMERGENCY_QUESTIONS]: {
    [CoreActionTypes.DOC_SERVICE_UPDATE_EMERGENCY_INFO_SUCCESS]: GoToPaymentMethodPage,
  },
  [pageKeys.CUSTUMIZE]: {
    [CoreActionTypes.GO_TO_NEW_PROFILE]: GoToNewProfileHandler
  },
  [pageKeys.DOC_SERVICE_PLAN_SELECTION]: {
    [pageKeys.MYDOC_MEDICAL_PROFILE]: GoToMedicalProfilePage,
    [pageKeys.GO_PAYMENT_METHOD_PAGE]: GoToPaymentMethodPage,
    [pageKeys.GO_PAYMENT_METHOD_WEBVIEW_PAGE]: GoToPaymentMethodWebviewPage,
  },
  [pageKeys.DOC_SERVICE_PAYMENT]: {
    [CoreActionTypes.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS_SUCCESS_NEW]: GoToPreConsultationQuestions,
  },
  [CoreActionTypes.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS]: {
    [CoreActionTypes.DOC_SERVICE_CONSULTATION_REQUEST_SUCCESS]: MyDocBookAppointmentHandler,
  },
  [pageKeys.FOREGROUND]: {
    [CoreActionTypes.DOC_SERVICE_DOCTOR_AVAILABILITY_STATUS]: DocServiceDoctorAvailableHandler,
  },
  [pageKeys.BACKGROUND]: {
    [CoreActionTypes.DOC_SERVICE_DOCTOR_AVAILABILITY_STATUS]: DocServiceDoctorAvailableHandler,
  },
  initiateGooglePayment: {
    GOOGLE_PAY_SUBSCRIBE: intiateGoogleSubscription,
  },
  availablePurchaseFromGoogle: {
    GOOGLE_PAY_SUBSCRIBE_AVAILABLE_PURCHASE: getAvailablePurchases,
  },
};

export default middlewareConfig;
