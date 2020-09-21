import {
  CoreConfig,
  metaHelpers,
  CoreConstants,
} from "@pru-rt-internal/pulse-common";
const {
  SCREEN_KEY_REGISTER,
  COMMON_KEY_PRIVACY,
  COMMON_KEY_TERMS,
  NEW_TERMSCONDITIONS,
  NEW_TERMSCONDITIONS_PULSE,
  NEW_REGISTER,
  NEW_REGISTER_EMAIL,
  NEW_REGISTER_EMAIL_REQUIRED,
  NEW_REGISTER_EMAIL_INVALID,
  NEW_REGISTER_PASSWORD,
  NEW_REGISTER_PASSWORD_SECURITY,
  NEW_REGISTER_FIRSTNAME,
  NEW_REGISTER_FIRSTNAME_REQUIRED,
  NEW_REGISTER_LASTNAME,
  NEW_REGISTER_LASTNAME_REQUIRED,
  NEW_REGISTER_REGISTERHINT1,
  NEW_REGISTER_REGISTERHINT2,
  NEW_REGISTER_REGISTERHINT3,
  NEW_REGISTER_REGISTERHINT4,
  NEW_REGISTER_and,
  NEW_REGISTER_PULSEBYP,
  NEW_REGISTER_COUNTRY,
  NEW_REGISTER_LANGUAGE,
  SCREEN_KEY_LOGIN,
  SING_IN_FACEBOOK,
  SING_IN,
  SING_IN_MOREOPTIONS,
  REGISTERTC,
} = CoreConfig;

const {
  REWARDNRIC,
  REWARDNRIC_CONTINUE,
  EXISTING_USER,
  COMMON_KEY_OR,
  NEW_USER,
  CONFIRM_TOUCH,
  FINGER_PRINT_USER_LOGIN,
  NEW_REGISTRATION,
  PULSE_SUB_DESCRIPTION,
  CREATE_AN_ACCOUNT,
  LOGIN_WITH_EMAIL,
  ALREADY_HAVE_ACC,
  DONT_HAVE_ACCOUNTS,
  SIGN_UP,
  NEW_REGISTRATION_SIGN_IN,
} = CoreConstants;

const findElement = metaHelpers.findElement;
const findCommon = metaHelpers.findCommon;
const findErrorMessage = metaHelpers.findErrorMessage;
const findCommonErrorMessages = metaHelpers.findCommonErrorMessages;
const findBackendErrorMessage = metaHelpers.findBackendErrorMessage;
const findBackendErrorMessageByScreen =
  metaHelpers.findBackendErrorMessageByScreen;
const findElementWithScreen = metaHelpers.findElementWithScreen;
const findScreen = metaHelpers.findScreen;

const KEY_EMAIL = "email";
const KEY_PASSWORD = "password";
const KEY_FORGOT_PASSWORD = "forgotpasswordLabel";
const KEY_LOGIN = "loginbutton";
const KEY_REGISTER = "registerlabel";
const KEY_INTERNAL_SERVER_ERROR = "internalservererror";
const ERROR_KEY_EMAIL_REQUIRED = "required";
const ERROR_KEY_INVALID_EMAIL_ID = "not_valid";
const ERROR_KEY_EMAIL_ALREADY_EXISTS = "already_exists";
const ERROR_KEY_PASSWORD_REQUIRED = "required";
const ERROR_KEY_INVALID_PASSWORD = "not_valid";
const ERROR_KEY_PASSWORD_CRITERIA_MISMATCH = "match_criteria";
const KEY_FINGER_PRINT_ERROR =
  "fingerprintaddfingerprintconventionalloginlabel";
const FACE_ID_ENROLMENT_HEADER = "faceid_enrolment_alert_header";
const FACE_ID_NOT_ENABLED = "faceid_not_enabled";
const FACE_ID_CANCEL = "faceid_cancel";
// const NEW_REGISTER_COUNTRY = "country";
// const NEW_REGISTER_LANGUAGE = "languages";
const CONNECT_FB = "connectFb";
const CONNECT_GOOGLE = "connectGoogle";
const LOGIN_WITH_GOOGLE = "loginGoogle";

const fetchLabel = (value, defaultValue) =>
  value ? value.label : defaultValue;

const initializeScreenMeta = () => {
  const NEW_REGISTER_EMAIL_REQUIRED_MESSAGE = findErrorMessage(
    findElement(NEW_REGISTER, NEW_REGISTER_EMAIL),
    NEW_REGISTER_EMAIL_REQUIRED
  ).message;
  const KEY_FINGER_PRINT_ERROR_MESSAGE = findElement(
    SCREEN_KEY_LOGIN,
    KEY_FINGER_PRINT_ERROR
  ).label;
  const emailKeyElement = findElement(SCREEN_KEY_LOGIN, KEY_EMAIL);
  const KEY_EMAIL_LABEL = emailKeyElement.label;
  const phoneOrEmail = val => findElement(SCREEN_KEY_LOGIN, val).label;
  const keyPasswordElement = findElement(SCREEN_KEY_LOGIN, KEY_PASSWORD);
  const KEY_PASSWORD_LABEL = keyPasswordElement.label;
  const KEY_LOGIN_LABEL = findElement(SCREEN_KEY_LOGIN, KEY_LOGIN).label;
  const KEY_INTERNAL_SERVER_ERROR_LABEL = findElement(
    SCREEN_KEY_LOGIN,
    KEY_INTERNAL_SERVER_ERROR
  ).label;
  const KEY_FORGOT_PASSWORD_LABEL = findElement(
    SCREEN_KEY_LOGIN,
    KEY_FORGOT_PASSWORD
  ).label;
  const KEY_COMMON_OR_LABEL = findCommon(COMMON_KEY_OR).label;
  const SING_IN_FACEBOOK_LABEL = findElement(SING_IN, SING_IN_FACEBOOK).label;
  const KEY_REGISTER_LABEL = findElement(SING_IN, KEY_REGISTER).label;
  const SING_IN_MOREOPTIONS_LABEL = findElement(REGISTERTC, SING_IN_MOREOPTIONS)
    .label;
  const FACE_ID_ENROLMENT_HEADER_LABEL = findElement(
    SCREEN_KEY_LOGIN,
    FACE_ID_ENROLMENT_HEADER
  ).label;
  const FACE_ID_NOT_ENABLED_LABEL = findElement(
    SCREEN_KEY_LOGIN,
    FACE_ID_NOT_ENABLED
  ).label;
  const FACE_ID_CANCEL_LABEL = findElement(SCREEN_KEY_LOGIN, FACE_ID_CANCEL)
    .label;
  const FINGER_PRINT_USER_LOGIN_LABEL = findElement(
    SCREEN_KEY_LOGIN,
    FINGER_PRINT_USER_LOGIN
  ).label;
  const FINGER_PRINT_CONFIRM_TOUCH_LABEL = findElement(
    SCREEN_KEY_LOGIN,
    CONFIRM_TOUCH
  ).label;
  const SIGN_IN_GOOGLE = metaHelpers.findCommon(LOGIN_WITH_GOOGLE).label;
  const KEY_NEW_USER = findElement(SCREEN_KEY_LOGIN, NEW_USER).label;
  const NEW_REGISTER_EMAIL_INVALID_MESSAGE = findErrorMessage(
    findElement(NEW_REGISTER, NEW_REGISTER_EMAIL),
    NEW_REGISTER_EMAIL_INVALID
  ).message;
  const NEW_REGISTER_FIRSTNAME_REQUIRED_MESSAGE = findErrorMessage(
    findElement(NEW_REGISTER, NEW_REGISTER_FIRSTNAME),
    NEW_REGISTER_FIRSTNAME_REQUIRED
  ).message;
  const NEW_REGISTER_LASTNAME_REQUIRED_MESSAGE = findErrorMessage(
    findElement(NEW_REGISTER, NEW_REGISTER_LASTNAME),
    NEW_REGISTER_LASTNAME_REQUIRED
  ).message;
  const register = findScreen(SCREEN_KEY_REGISTER);
  const ERROR_KEY_EMAIL_REQUIRED_MESSAGE = val => findErrorMessage(
    findElementWithScreen(register, val),
    ERROR_KEY_EMAIL_REQUIRED
  ).message;
  const ERROR_KEY_INVALID_EMAIL_ID_MESSAGE = val => findErrorMessage(
    findElementWithScreen(register, val),
    ERROR_KEY_INVALID_EMAIL_ID
  ).message;
  const ERROR_KEY_EMAIL_ALREADY_EXISTS_MESSAGE = findErrorMessage(
    findElementWithScreen(register, KEY_EMAIL),
    ERROR_KEY_EMAIL_ALREADY_EXISTS
  ).message;
  const ERROR_KEY_PASSWORD_REQUIRED_MESSAGE = findErrorMessage(
    findElementWithScreen(register, KEY_PASSWORD),
    ERROR_KEY_PASSWORD_REQUIRED
  ).message;
  //  TODO - This meta error message is not available currently
  //  const ERROR_KEY_INVALID_PASSWORD_MESSAGE = findErrorMessage(findElementWithScreen(register, KEY_PASSWORD), ERROR_KEY_INVALID_PASSWORD).message;
  const ERROR_KEY_PASSWORD_CRITERIA_MISMATCH_MESSAGE = findErrorMessage(
    findElementWithScreen(register, KEY_PASSWORD),
    ERROR_KEY_PASSWORD_CRITERIA_MISMATCH
  ).message;
  const COMMON_KEY_PRIVACY_HEADER = findCommon(COMMON_KEY_PRIVACY).header;
  const COMMON_KEY_PRIVACY_LABEL = findCommon(COMMON_KEY_PRIVACY).label;
  const COMMON_KEY_TERMS_LABEL = findCommon(COMMON_KEY_TERMS).label;
  const COMMON_KEY_TERMS_HEADER = findCommon(COMMON_KEY_TERMS).header;
  const NEW_REGISTER_FIRSTNAME_LABEL = findElement(
    NEW_REGISTER,
    NEW_REGISTER_FIRSTNAME
  ).label;
  const NEW_REGISTER_LASTNAME_LABEL = findElement(
    NEW_REGISTER,
    NEW_REGISTER_LASTNAME
  ).label;
  const NEW_REGISTER_EMAIL_LABEL = findElement(NEW_REGISTER, NEW_REGISTER_EMAIL)
    .label;
  const NEW_REGISTER_PASSWORD_LABEL = findElement(
    NEW_REGISTER,
    NEW_REGISTER_PASSWORD
  ).label;
  const NEW_REGISTER_PASSWORD_SECURITY_MESSAGE = findErrorMessage(
    findElement(NEW_REGISTER, NEW_REGISTER_PASSWORD),
    NEW_REGISTER_PASSWORD_SECURITY
  ).message;
  const NEW_REGISTER_REGISTERHINT1_LABEL = findElement(
    NEW_REGISTER,
    NEW_REGISTER_REGISTERHINT1
  ).label;
  const NEW_REGISTER_PULSEBYP_LABEL = findElement(
    NEW_REGISTER,
    NEW_REGISTER_PULSEBYP
  ).label;
  const NEW_REGISTER_REGISTERHINT2_LABEL = findElement(
    NEW_REGISTER,
    NEW_REGISTER_REGISTERHINT2
  ).label;
  const NEW_REGISTER_and_LABEL = findElement(NEW_REGISTER, NEW_REGISTER_and)
    .label;
  const NEW_REGISTER_REGISTERHINT3_LABEL = findElement(
    NEW_REGISTER,
    NEW_REGISTER_REGISTERHINT3
  ).label;
  const NEW_REGISTER_REGISTERHINT4_LABEL = findElement(
    NEW_REGISTER,
    NEW_REGISTER_REGISTERHINT4
  ).label;
  const REWARDNRIC_CONTINUE_LABEL = findElement(REWARDNRIC, REWARDNRIC_CONTINUE)
    .label;
  const NEW_REGISTER_COUNTRY_LABEL = findElement(
    NEW_REGISTER,
    NEW_REGISTER_COUNTRY
  ).label;
  const NEW_REGISTER_LANGUAGES_LABEL = findElement(
    NEW_REGISTER,
    NEW_REGISTER_LANGUAGE
  ).label;

  const EXISTING_USER_LABEL = findElement(NEW_REGISTER, EXISTING_USER).label;
  const TERMSCONDITIONS_PULSE = findElement(
    NEW_TERMSCONDITIONS,
    NEW_TERMSCONDITIONS_PULSE
  ).label;

  const FB_CONNECT = findCommon(CONNECT_FB).label;
  const GOOGLE_CONNECT = findCommon(CONNECT_GOOGLE).label;
  const GOOGLE_LOGIN = findCommon(LOGIN_WITH_GOOGLE).label;
  const PULSE_SUB_DESC = fetchLabel(findElement(NEW_REGISTRATION, PULSE_SUB_DESCRIPTION), "Improve your Health and Fitness Today");
  const CREATE_ACCOUNT = fetchLabel(findElement(NEW_REGISTRATION, CREATE_AN_ACCOUNT), "createAnAccount");
  const LOGIN_EMAIL = fetchLabel(findElement(NEW_REGISTRATION, LOGIN_WITH_EMAIL), "Login with Email");
  const LOGIN_MOBILE = fetchLabel(findElement(NEW_REGISTRATION, "loginWithMobile"), "Continue with Mobile");
  const ALREADY_HAVE_ACCOUNT = fetchLabel(findElement(NEW_REGISTRATION, ALREADY_HAVE_ACC), "Already have an Account?");
  const SIGNUP = fetchLabel(findElement(NEW_REGISTRATION, SIGN_UP), "Sign Up");
  const NEW_REGISTRATION_SIGNIN = fetchLabel(findElement(
    NEW_REGISTRATION,
    NEW_REGISTRATION_SIGN_IN
  ), 'Sign In');
  const DONT_HAVE_ACCOUNT = fetchLabel(findElement(
    NEW_REGISTRATION,
    DONT_HAVE_ACCOUNTS,
  ), "Don't have an Account?");
  return {
    CREATE_ACCOUNT,
    PULSE_SUB_DESC,
    LOGIN_EMAIL,
    LOGIN_MOBILE,
    ALREADY_HAVE_ACCOUNT,
    SIGNUP,
    NEW_REGISTRATION_SIGNIN,
    FB_CONNECT,
    DONT_HAVE_ACCOUNT,
    GOOGLE_CONNECT,
    GOOGLE_LOGIN,
    NEW_REGISTER_EMAIL_REQUIRED_MESSAGE,
    NEW_REGISTER_EMAIL_INVALID_MESSAGE,
    NEW_REGISTER_FIRSTNAME_REQUIRED_MESSAGE,
    NEW_REGISTER_LASTNAME_REQUIRED_MESSAGE,
    ERROR_KEY_EMAIL_REQUIRED_MESSAGE,
    ERROR_KEY_INVALID_EMAIL_ID_MESSAGE,
    ERROR_KEY_EMAIL_ALREADY_EXISTS_MESSAGE,
    ERROR_KEY_PASSWORD_REQUIRED_MESSAGE,
    //ERROR_KEY_INVALID_PASSWORD_MESSAGE,
    ERROR_KEY_PASSWORD_CRITERIA_MISMATCH_MESSAGE,
    COMMON_KEY_PRIVACY_HEADER,
    COMMON_KEY_PRIVACY_LABEL,
    COMMON_KEY_TERMS_LABEL,
    COMMON_KEY_TERMS_HEADER,
    TERMSCONDITIONS_PULSE,
    NEW_REGISTER_FIRSTNAME_LABEL,
    NEW_REGISTER_LASTNAME_LABEL,
    NEW_REGISTER_EMAIL_LABEL,
    NEW_REGISTER_PASSWORD_LABEL,
    NEW_REGISTER_PASSWORD_SECURITY_MESSAGE,
    NEW_REGISTER_REGISTERHINT1_LABEL,
    NEW_REGISTER_PULSEBYP_LABEL,
    NEW_REGISTER_REGISTERHINT2_LABEL,
    NEW_REGISTER_and_LABEL,
    NEW_REGISTER_REGISTERHINT3_LABEL,
    NEW_REGISTER_REGISTERHINT4_LABEL,
    REWARDNRIC_CONTINUE_LABEL,
    NEW_REGISTER_COUNTRY_LABEL,
    NEW_REGISTER_LANGUAGES_LABEL,
    EXISTING_USER_LABEL,
    KEY_FINGER_PRINT_ERROR_MESSAGE,
    KEY_LOGIN_LABEL,
    KEY_INTERNAL_SERVER_ERROR_LABEL,
    KEY_EMAIL_LABEL,
    phoneOrEmail,
    KEY_PASSWORD_LABEL,
    KEY_FORGOT_PASSWORD_LABEL,
    KEY_COMMON_OR_LABEL,
    SING_IN_FACEBOOK_LABEL,
    KEY_REGISTER_LABEL,
    SING_IN_MOREOPTIONS_LABEL,
    FACE_ID_ENROLMENT_HEADER_LABEL,
    FACE_ID_NOT_ENABLED_LABEL,
    FACE_ID_CANCEL_LABEL,
    FINGER_PRINT_USER_LOGIN_LABEL,
    FINGER_PRINT_CONFIRM_TOUCH_LABEL,
    SIGN_IN_GOOGLE,
    KEY_NEW_USER,
  };
};

export default {
  findElement,
  findCommon,
  findErrorMessage,
  findCommonErrorMessages,
  findBackendErrorMessage,
  findBackendErrorMessageByScreen,
  initializeScreenMeta,
};
