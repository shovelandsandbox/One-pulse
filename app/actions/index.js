import { CoreActionTypes, CoreConfig } from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;
import babylonActions from "../features/babylon/configs/actions";
import babylonScreens from "../features/babylon/configs/screens";

export const dispatchEvent = payload => {
  const action = {
    context: pageKeys.COMMON,
    type: CoreActionTypes.SEND_EVENT,
    payload,
  };
  return action;
};
export const dispatchActionWithContext = payload => ({
  context: payload.context,
  type: payload.type,
});
export const gotoBabylonConsultationHistory = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.BABYLON_CONSULTATION_HISTORY,
});

export const gotoBabylonChatScreen = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.BABYLON_SYMPTOM_CHECKER,
});

export const gotoMydocReferFriend = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: "MyDocGiftVoucher",
});

export const gotoMydocWizardDetails = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: "MyDocWizardRegn",
});

export const gotoBabylonWizardCongrats = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: "PruWizardCongratulations",
});

export const gotoCongratulationsScreen = () => ({
  type: "GO_TO_SCREEN",
  navigateTo: "MyDocWizardRegnSuccess",
});

export const gotoRegistrationSuccess = () => ({
  context: pageKeys.REGISTRATION,
  type: CoreActionTypes.REGISTRATION_SUCCESS_HANDLER,
});

// Chat screen after choosing the assessement type
export const gotoBLChatScreen = payload => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.BABYLON_CHAT_SCREEN,
  payload: {
    params: payload,
  },
});

export const gotoBabylonFullAssessment = payload => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.BABYLON_FULL_ASSESSMENT,
  payload: {
    params: payload,
  },
});

export const gotoBabyonChatQuickStart = payload => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.BABYLON_CHAT_QUICK_START,
  payload: {
    params: payload,
  },
});

export const gotoBabyonChatScreen1 = payload => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.BABYLON_CHAT_SCREEN1,
  payload: {
    params: payload,
  },
});

// Screen comes just after successful registration.
//Screen text : Complete your digital twin...
export const gotoBabyonChatScreen2 = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.BABYLON_CHAT_SCREEN2,
});

export const gotoPulseRegistration = payload => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_REGISTRATION,
  payload: {
    params: payload,
  },
});

export const gotoPrivacyNotice = payload => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_PRIVACY_NOTICE,
  payload: {
    params: payload,
  },
});

export const gotoNewTNC = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_TNC,
});

export const gotoNewPrivacy = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_NEW_PRIVACY,
});

export const gotoNewCommon = payload => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_TNC_DETAIL,
  payload: {
    params: payload,
  },
});

export const gotoCommon = payload => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_COMMON_SCREEN,
  payload: {
    params: payload,
  },
});

export const gotoMainPage = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_MAIN_PAGE,
});

export const gotoPulsehealth = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_HEALTH_PAGE,
});

export const gotoCheckSymptopms = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.BABYLON_SYMPTOM_CHECK,
});

export const gotoHomeTab = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_HOME_TAB,
});

export const gotoMainTNC = payload => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_MAIN_TNC,
  payload: {
    params: payload,
  },
});

export const gotoOtpSent = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_SEND_OTP,
});

export const gotoLogin = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_LOGIN,
});

export const gotoResetPasswordSucc = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_RESET_PASS_SUCC,
});
export const gotoChangePassword = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_CHANGE_PASSWORD,
});

export const gotoNotificationRequest = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_NOTIFICATION_REQUEST,
});

export const gotoNotificationCentre = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: "NotificationCentre",
});

export const gotoAccountsTab = payload => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: "AccountTab",
  payload
});

export const gotoRewardCentre = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: "RewardCentre",
});

export const gotoSentOtp = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_SEND_OTP_EMAIL,
});

export const gotoMoreLogin = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_MORE_LOGIN,
});

export const gotoProfile = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_PROFILE,
});

export const gotoManageProfile = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_MANAGE_PROFILE,
});

export const gotoAboutUs = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_ABOUT_US,
});

export const goto = page => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: page,
});

export const gotoWithParams = (page, params) => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: page,
  payload: {
    params,
  },
});

export const denyBiometric = () => ({
  context: pageKeys.LOGIN,
  type: CoreActionTypes.BIOMETRIC_AUTH_DENIED,
});

export const checkFeature = payload => ({
  type: CoreActionTypes.FEATURE_ACCESS_CHECK,
  constext: pageKeys.LOGIN,
  payload,
});

export const justDispatchAction = actionType => ({
  type: actionType,
});

export const dispatchErrorAction = (type, payload) => ({
  type,
  payload,
});

export const checkScreenFeatures = payload => ({
  context: pageKeys.COMMON,
  type: CoreActionTypes.FEATURE_ACCESS_CHECK,
  payload: payload,
});

export const getScreenRenderingConfig = payload => ({
  context: pageKeys.COMMON,
  type: CoreActionTypes.CMS_GET_SCREEN_CONFIG,
  payload,
});

export const gotoHealthAssessment = () => ({
  context: pageKeys.PULSE_HEALTH_PAGE,
  type: CoreActionTypes.BABYLON_GOTO_HEALTHASSESSMENT,
});

export const gotoSymptomChecker = () => ({
  context: pageKeys.PULSE_HEALTH_PAGE,
  type: CoreActionTypes.BABYLON_GOTO_SYMPTOMPCHECKER,
});
export const gotoNavigator = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: Navigator,
});

export const persistChat = payload => ({
  context: babylonScreens.babylonChat,
  type: babylonActions.createUserConversation,
  payload,
  disableTimeout: true,
});

export const getHealthOutcomeById = payload => ({
  context: pageKeys.FULL_ASSESSMENT,
  type: CoreActionTypes.FETCH_HEALTH_CATEGORIES_BY_ID,
  payload: {
    healthCategory: payload,
  },
});

export const goToAimeDegueAlert = () => ({
  context: pageKeys.PULSE_HEALTH_PAGE,
  type: "DENGUE_ALERT",
});

export const goToPruShopTnC = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: "PruShopTermsandPrivacy",
});
