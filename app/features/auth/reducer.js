import { CoreActionTypes, CoreConfig } from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;

const {
  AUTH_PASSWORD_CHANGED,
  AUTHENTICATION_SUCCESS,
  AUTH_EMAIL_CHANGED,
  CLEAN_LOGIN_ERROR,
  FACEBOOK_LOGIN,
  GOOGLE_LOGIN,
  LOGOUT_DONE,
  IS_NEW_USER,
  SET_LOADING,
  UPDATE_BABYLON_TOKEN,
  UPDATE_ACCESS_TOKEN,
  UPDATE_FCM_TOKEN,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_RESET,
  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_ERROR,
  RESEND_OTP,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_ERROR,
  ACCEPT_MAIN_TERMS_AND_CONDITIONS,
  ACCEPT_MAIN_TERMS_AND_CONDITIONS_SUCCESS,
  ACCEPT_MAIN_TERMS_AND_CONDITIONS_ERROR,
  GET_CUSTOMER_DETAILS_SUCCESS,
  DOC_SERVICE_REGISTER_PATIENT_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  HANDLE_TOUCH_LOGIN,
  HANDLE_TOUCH_LOGIN_SUCCESS,
  HANDLE_TOUCH_LOGIN_ERROR,
  RESUME_SOCIAL_LOGIN_SUCCESS,
  RESUME_SOCIAL_REGISTRATION_ERROR,
  RESET_LOGIN_ERROR,
  UPDATE_TICTRAC,
  SET_COUNTRY_INFO,
  TOUCH_AUTH_ENROLL_SUCCESS,
  TOUCH_AUTH_LOGIN_SUCCESS,
  FACE_AUTH_LOGIN_SUCCESS,
  FACE_AUTH_ENROLL_SUCCESS,
  BIOMETRIC_AUTH_DENIED,
  FACE_AUTH_ENROLL_FAILURE,
  TOUCH_AUTH_ENROLL_FAILURE,
  FACE_AUTH_LOGIN_DISABLE,
  TOUCH_AUTH_LOGIN_DISABLE,
  SET_DEVICE_INFO,
  FEATURE_ACCESS_CHECK,
  FEATURE_ACCESS_CHECK_SUCCESS,
  TOUCH_AUTH_LOGIN_FAILURE,
  FACE_AUTH_LOGIN_FAILURE,
  INITIALIZE_DATA,
  ENABLE_LOGIN_BTN,
  DISABLE_LOGIN_BTN,
  FETCH_TANDC_AND_PRIVACY_POLICY_SUCCESS,
  MFA_VERIFY_OTP,
  MFA_VERIFY_OTP_SUCCESS,
  MFA_VERIFY_OTP_ERROR,
  MFA_RESEND_OTP,
  MFA_RESEND_OTP_SUCCESS,
  MFA_RESEND_OTP_ERROR,
  MFA_LOGIN_USER_SUCCESS,
  MFA_LOGIN_USER_ERROR,
  SET_USER_LAST_ACTIVITY_TIME
} = CoreActionTypes;
import { path, pathOr } from "ramda";

const clearDataReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE_DATA:
      return {
        ...action.initialState,
        loginPreference: state.loginPreference,
      };
  }
};

import SimpleCrypto from "simple-crypto-js";

const secretKey = "encryption-pulse-key";
const simpleCrypto = new SimpleCrypto(secretKey);

const INITIAL_STATE = {
  isNewUser: false,
  termsConditions: "",
  countryInfo: {
    isPulseAvailable: true,
  },
  isTouchAuthEnrolled: false,
  isTouchAuthEnrolledFailed: false,
  isTouchDenied: false,
  isFaceAuthEnrolled: false,
  isFaceAuthEnrolledFailed: false,
  isFaceAuthDenied: false,
  isBiometricAuthDenied: false,
  featuresToCheck: [],
  featuresStatus: {},
  isTouchLoginFailed: false,
  isFaceLoginFailed: false,
  email: "",
  babylonToken: "",
  disableLoginButton: false,
  mfa: false,
  mfaLoginUserSuccess: false,
  loginPreference: "email",
  userLastActivityTime: 0,
};

// eslint-disable-next-line complexity
const loginReducers = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case ENABLE_LOGIN_BTN:
      return {
        ...state,
        disableLoginButton: false,
      };
    case "CLEAN_AUTH_FAILURES":
      return {
        ...state,
        isTouchLoginFailed: false,
        isFaceLoginFailed: false,
      };
    case DISABLE_LOGIN_BTN:
      return {
        ...state,
        disableLoginButton: true,
      };
    case FACEBOOK_LOGIN:
      return { ...state, user: payload };

    case GOOGLE_LOGIN:
      return { ...state, user: payload };

    case LOGIN_USER:
      return {
        ...state,
        loggingIn: true,
        loggingInProgress: true,
        token: undefined,
        loginError: undefined,
      };

    case TOUCH_AUTH_ENROLL_SUCCESS: {
      return {
        ...state,
        isTouchAuthEnrolled: true,
        isBiometricAuthDenied: false,
      };
    }

    case TOUCH_AUTH_ENROLL_FAILURE:
      return {
        ...state,
        isTouchLoginFailed: true,
        isTouchAuthEnrolledFailed: true,
        isBiometricAuthDenied: false,
      };
    case BIOMETRIC_AUTH_DENIED: {
      return { ...state, isBiometricAuthDenied: true };
    }

    case FACE_AUTH_ENROLL_SUCCESS: {
      return {
        ...state,
        isFaceAuthEnrolled: true,
        isBiometricAuthDenied: false,
      };
    }

    case FACE_AUTH_LOGIN_FAILURE:
      return { ...state, isFaceLoginFailed: true };

    case TOUCH_AUTH_LOGIN_FAILURE:
      return { ...state, isTouchLoginFailed: true };

    case FACE_AUTH_ENROLL_FAILURE: {
      return {
        ...state,
        isFaceAuthEnrolledFailed: true,
        isBiometricAuthDenied: false,
      };
    }

    case FACE_AUTH_LOGIN_DISABLE: {
      return {
        ...state,
        isFaceAuthEnrolled: false,
      };
    }

    case TOUCH_AUTH_LOGIN_DISABLE: {
      return {
        ...state,
        isTouchAuthEnrolled: false,
        isBiometricAuthDenied: true,
      };
    }

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        // loginResponse: action.payload.response,
        loggingIn: false,
        email: simpleCrypto.encrypt(payload.email),
        isTouchLoginFailed: false,
        isFaceLoginFailed: false,
        loggingInProgress: true,
        token: payload.response ? payload.response.access_token : state.token,
        refreshToken: payload.response
          ? simpleCrypto.encrypt(payload.response.refresh_token)
          : state.refreshToken,
        touchIDError: undefined,
      };

    case MFA_LOGIN_USER_SUCCESS:
      return {
        ...state,
        mfaLoginUserSuccess: true,
        mfaOtpError: undefined,
        workflowId: action.payload.response.workflowId,
        mfa: true,
      };
    case TOUCH_AUTH_LOGIN_SUCCESS:
    case FACE_AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        // loginResponse: action.payload.response,
        loggingIn: false,
        email: simpleCrypto.encrypt(payload.response.workflowId),
        isTouchLoginFailed: false,
        isFaceLoginFailed: false,
        loggingInProgress: true,
        token: payload.response ? payload.response.access_token : state.token,
        refreshToken: payload.response
          ? simpleCrypto.encrypt(payload.response.refresh_token)
          : state.refreshToken,
        touchIDError: undefined,
      };
    case RESUME_SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        // loginResponse: action.payload.response,
        loggingIn: false,
        email: simpleCrypto.encrypt(payload.email),
        loggingInProgress: true,
        isTouchLoginFailed: false,
        isFaceLoginFailed: false,
        token: payload.response.access_token,
        refreshToken: simpleCrypto.encrypt(payload.response.refresh_token),
        loginError: undefined,
        touchIDError: undefined,
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loggingIn: false,
        loginError: action.payload,
        loggingInProgress: false,
      };

    case RESUME_SOCIAL_REGISTRATION_ERROR: {
      if (action.context === pageKeys.LOGIN) {
        return {
          ...state,
          loggingIn: false,
          loginError: action.payload,
          loggingInProgress: false,
        };
      }
      return state;
    }
    case HANDLE_TOUCH_LOGIN:
      return {
        ...state,
        touchLoginInProgress: true,
        fingerPrintAuthEnabledForEmail:
          action.payload.fingerPrintAuthEnabledForEmail,
        token: undefined,
      };

    case HANDLE_TOUCH_LOGIN_SUCCESS:
      return {
        ...state,
        email: simpleCrypto.encrypt(payload.email),
        token: payload.response.access_token,
        refresh_token: payload.response
          ? simpleCrypto.encrypt(payload.response.refresh_token)
          : state.refreshToken,
        touchLoginInProgress: true,
        touchIDError: undefined,
        loginError: undefined,
      };

    case HANDLE_TOUCH_LOGIN_ERROR:
      return {
        ...state,
        touchLoginInProgress: false,
        touchIDError: action.payload,
      };

    case GET_CUSTOMER_DETAILS_SUCCESS: {
      // const { customer } = action.payload;
      const { response } = action.payload;
      const customerRaw = response.body;

      const babylonTokenValue =
        path(["externalIds", "babylonToken"], customerRaw) ||
        path(["externalIds", "Babylon"], customerRaw) ||
        "";
      const email = path(["contactDetails", "email", "value"], customerRaw);
      return {
        ...state,
        babylonToken: simpleCrypto.encrypt(babylonTokenValue),
        savedDeviceToken: path(
          ["contactDetails", "device", "value"],
          customerRaw
        ),
        docServiceToken: path(["externalIds", "doctor"], customerRaw),
        haloDocUserId: path(["externalIds", "halodoc_userid"], customerRaw),
        haloDocAccessToken: path(
          ["externalIds", "halodoc_accesstoken"],
          customerRaw
        ),
        tictrac: path(["externalIds", "tictrac"], customerRaw),
        IC: path(["externalIds", "IC"], customerRaw),
        email: simpleCrypto.encrypt(email || ""),
        termsConditions: customerRaw.termsConditions,
        countryInfo: {
          ...state.countryInfo,
          simCountry: path(
            ["addressDetails", "address", "countryCode"],
            customerRaw
          ),
        },
        userAgent: {
          ...state.userAgent,
          region: path(
            ["addressDetails", "address", "countryCode"],
            customerRaw
          ),
        },
      };
    }

    case AUTHENTICATION_SUCCESS: {
      const { loggingInProgress, touchLoginInProgress } = state;

      return {
        ...state,
        touchLoginInProgress: touchLoginInProgress ? false : undefined,
        loggingInProgress: loggingInProgress ? false : undefined,
        isLoggedIn: true,
        loginTimestamp: new Date().getTime(),
      };
    }

    case UPDATE_ACCESS_TOKEN:
      return {
        ...state,
        token: payload,
      };
    case UPDATE_FCM_TOKEN:
      return {
        ...state,
        fcmToken: payload,
      };
    case DOC_SERVICE_REGISTER_PATIENT_SUCCESS:
      return {
        ...state,
        docServiceToken: payload.docServiceToken,
      };
    case LOGOUT_DONE:
      // console.log("LOGOUT_DONE")
      return {
        ...state,
        password: null,
        isLoggedIn: false,
        loading: false,
        docServiceToken: "",
        IC: "",
        loginTimestamp: null,
        mfa: false,
      };

    case RESET_LOGIN_ERROR:
      return {
        ...state,
        loginError: undefined,
      };

    case FEATURE_ACCESS_CHECK:
      return {
        ...state,
        featuresToCheck: payload,
      };

    case FEATURE_ACCESS_CHECK_SUCCESS:
      const serverFeaturesStatus = payload.response
        ? payload.response.body
        : [];
      const fetures = {};
      const currentFeaturesToCheck = state.featuresToCheck;
      serverFeaturesStatus.map((value, index) => {
        if (currentFeaturesToCheck) {
          const featureName = currentFeaturesToCheck[index].feature;
          fetures[featureName] = value.outcome;
        }
      });
      return {
        ...state,
        featuresStatus: { ...state.featuresStatus, ...fetures },
        featuresToCheck: [],
      };
  }
};

/* eslint-disable */
const authReducers = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case UPDATE_BABYLON_TOKEN:
      return { ...state, babylonToken: simpleCrypto.encrypt(payload) };
    case UPDATE_TICTRAC:
      return { ...state, tictrac: payload };

    case AUTH_EMAIL_CHANGED:
      return {
        ...state,
        email: simpleCrypto.encrypt(payload)
      };
    case CLEAN_LOGIN_ERROR:
      return {
        ...state,
        loginError: undefined
      };

    case FETCH_TANDC_AND_PRIVACY_POLICY_SUCCESS: 
      return{
        ...state,
        showPDFData: payload,
        action: action.type
      };
    case AUTH_PASSWORD_CHANGED:
      return { ...state, password: payload };

    case IS_NEW_USER:
      return { ...state, isNewUser: payload.value };
    case SET_LOADING: //remove
      return { ...state, loading: payload };

    case VERIFY_OTP:
      return { ...state, loading: true };

    case VERIFY_OTP_SUCCESS:
      return { ...state, loading: false };

    case VERIFY_OTP_ERROR:
      return { ...state, loading: false };

    case MFA_VERIFY_OTP:
      return { ...state, loading: true, mfaOtpError: undefined };
  
    case MFA_VERIFY_OTP_SUCCESS:
      return { ...state, loading: false, mfa: false , mfaLoginUserSuccess: false };
  
    case MFA_VERIFY_OTP_ERROR:
      return { ...state, loading: false, mfaOtpError: action.payload };
    
    case MFA_RESEND_OTP:
      return { ...state, loading: true };
  
    case MFA_RESEND_OTP_SUCCESS:
      return { ...state, loading: false };
  
    case MFA_RESEND_OTP_ERROR:
      return { ...state, loading: false };  

    case RESEND_OTP:
      return { ...state, loading: true };

    case RESEND_OTP_SUCCESS:
      return { ...state, loading: false };

    case RESEND_OTP_ERROR:
      return { ...state, loading: false };

    case ACCEPT_MAIN_TERMS_AND_CONDITIONS:
      return { ...state, loading: true };

    case ACCEPT_MAIN_TERMS_AND_CONDITIONS_SUCCESS:
      return {
        ...state,
        // loginResponse: action.payload.response,
        loggingIn: false,
        email: payload.email ? 
          simpleCrypto.encrypt(payload.email) : simpleCrypto.encrypt(""),
        loggingInProgress: true,
        token: payload.response.access_token,
        refreshToken: simpleCrypto.encrypt(action.payload.response.refresh_token),
        isNewUser: true
      };

    case ACCEPT_MAIN_TERMS_AND_CONDITIONS_ERROR:
      return { ...state, loading: false, isLoggedIn: false };

    case CHANGE_PASSWORD_RESET:
      return {
        ...state,
        changePasswordError: undefined,
        changePasswordLoading: false,
        changePasswordSuccess: false
      };

    case CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordError: undefined,
        changePasswordLoading: true,
        changePasswordSuccess: false
      };

    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordSuccess: true
      };

    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordError: payload,
        changePasswordSuccess: false
      };

    case SET_COUNTRY_INFO:
      return {
        ...state,
        countryInfo: {
          ...state.countryInfo,
          ...payload.countryInfo,
        },
        userAgent: {
          ...state.userAgent,
          region: payload.countryInfo.simCountry,
        }
      };

    case SET_DEVICE_INFO: {
      return {
        ...state,
        userAgent: { ...state.userAgent, ...payload }
      };
    }

    case SET_USER_LAST_ACTIVITY_TIME: {
      return {
        ...state,
        userLastActivityTime: pathOr(
          0,
          ["timeStamp"],
          payload
        ), 
      };
    }

    case "setEmailException": {

      return {
        ...state,
        emailErrorMessage: payload,
        exception: true,
        passErrorMessage: {},
        passException: false,
      }
    }

    case "setPasswordException": {
      return {
        ...state,
        emailErrorMessage: {},
        exception: false,
        passErrorMessage: payload,
        passException: true,
      }
    }

    case "resetErrors": {
      return {
        ...state,
        emailErrorMessage: {},
        exception: false,
        passErrorMessage: {},
        passException: false,
      }
    }

    case "loginPreference": {
      return {
        ...state,
        loginPreference: payload.loginPreference
      }
    }
  }
};

export default (state = INITIAL_STATE, action) => {
  return (
    authReducers(state, action) ||
    loginReducers(state, action) ||
    clearDataReducer(state, {
      type: action.type,
      initialState: {
        ...INITIAL_STATE,
        email: simpleCrypto.encrypt(decryptLocalState(state.email)),
        fcmToken: state.fcmToken,
        userAgent: state.userAgent,
        countryInfo: state.countryInfo,
        isLoggedIn: state.isLoggedIn,
        isFaceAuthEnrolled: state.isFaceAuthEnrolled,
        loginTimestamp: state.loginTimestamp,
        isTouchAuthEnrolled: state.isTouchAuthEnrolled,
        isTouchAuthEnrolledFailed: state.isTouchAuthEnrolledFailed,
        isTouchDenied: state.isTouchDenied,
        isFaceAuthEnrolledFailed: state.isFaceAuthEnrolledFailed,
        isFaceAuthDenied: state.isFaceAuthDenied,
        isBiometricAuthDenied: state.isBiometricAuthDenied,
        isTouchLoginFailed: state.isTouchLoginFailed,
        isFaceLoginFailed: state.isFaceLoginFailed,
        // password: state.isLoggedIn ? state.password,
        // savedDeviceToken: state.savedDeviceToken,
        // docServiceToken: state.docServiceToken,
        // babylonToken: state.babylonToken,
        // token: state.token,
        // refreshToken: state.refreshToken,
      }
    }) ||
    state
  );
};

const decryptLocalState = encryptedStr => {
  return simpleCrypto.decrypt(encryptedStr);
};

export const authSelector = {
  getUserEmail: state => {
    console.log("getUserEmail::E", state.auth.email);
    const email = simpleCrypto.decrypt(state.auth.email)
    console.log("getUserEmail::D", email);
    return email;
  },
  getBabylonToken: state => simpleCrypto.decrypt(state.auth.babylonToken),
  getRefreshToken: state => simpleCrypto.decrypt(state.auth.refreshToken),
};
