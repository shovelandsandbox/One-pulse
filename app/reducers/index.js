import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import FSStorage from "redux-persist-fs-storage";
import createSensitiveStorage from "redux-persist-sensitive-storage";
import { CoreReducers } from "@pru-rt-internal/pulse-common";
import myPolicyReducers from "../mypolicy/reducers";
import NotificationReducer from "../features/notificationCentre/reducers";
import DoctorServicesReducer from "./doctor-service-reducers";
import ConsulationHistoryReducer from "./consultation-history-reducers";
import DoctorProfileReducer from "./doctor-profile-reducers";
import RewardReducer from "../features/rewards/reducers";
import { reducer as appNotifications } from "../features/appNotification";
import WellnessPlansHabitsReducer from "../features/wellnessPlans/reducer";
import VideoSales from "../features/videoSales";
import ScreenConfigReducer from "../features/screenConfig/reducer";
import { DocOnCallReducer } from "../features/DocOnCall";
// import { Reducers as ProductRuntimeReducer } from "@pru-rt-internal/product-journeys";
import PruPaymentReducer from "../features/pruPayment/reducer";
import AuthReducer from "../features/auth/reducer";
import DeepLinkReducer from "../features/deepLinking/reducer";
import aimeDengueAlertReducer from "../features/AIMEDengueAlert/reducers";
import insaanReducer from "../features/insaan/reducers";
import consentManagementReducer from "../features/consentManagement/reducer";
import wizardReducer from "../features/pru-wizard/reducer";
import ProfileReducer from "../features/user-profile/reducer";
import AppNavigationReducer from "../reducers/AppNavigationReducer";
// import { Reducers as ClaimsReducer } from "@pru-rt-internal/claim-journeys";
// import { Reducers as CancelReducer } from "@pru-rt-internal/cancel-journey";
import FitnessTrackersReducer from "../features/fitnessTrackers/reducers";
import likecommentReducer from "../features/likesAndComments/reducer";
import affinityGroupReducer from "../features/affinity-groups/reducers";
import socialReferralReducer from "./social-referral-reducers";
import ChallengesReducer from "../features/challenges/reducer";
import ppgVitalsReducer from "../features/ppgVitals/reducers";
import hrvReducer from "../features/heartRateVariability/reducers";
import cancerPolicyReducer from "../features/cancerPolicy/reducers";
import commonReducer from "../features/common/reducers";
import VaccineReducer from "../features/vaccinationCalendar/reducers";
import faceDetectionReducer from "../features/faceDetection/reducers";
import skinCareAIReducer from "../features/skinCareAI/reducers";

import ccaReducer from "../features/CCAJourney/reducers";
import medicineDeliveryReducer from "../features/BuyMedicine/MedicineDeliveryReducer";
import coronaReducer from "../features/CoronaVirus/reducer";
import HaloDocReducer from "../features/HaloDoc/reducers";
import ConsulationHistoryHaloDocReducer from "../features/HaloDocConsultaionHistory/reducer";
import ratingReducer from "../features/appRating/reducer";
import ChatReducer from "../features/babylon/reducers/SCReducer";
import HealthAssessment from "../features/babylon/reducers/HAReducer";
import CommunityEventsReducer from "../features/communityEvents/reducer";
import WorkoutPlansReducer from "../features/exerciseBuddy/reducer";
import chatBotReducer from "../features/chatBot/reducer";
import AirQualityReducer from "../features/AirQualityIndex/reducer";
import subscriptionReducer from "./subscription-reducer";
import mealPlannerReducer from "../features/mealPlanner/reducer";
import pulsefoodReducer from "../features/PulseFood/reducer";
import { CustomerConnectReducer } from "../features/customerConnect";
import foodSearchReducer from "../features/FoodSearch/reducers";
import faceBlenderReducer from "../features/FaceBlender/reducers";

const {
  AccountReducer,
  RegisterReducer,
  TriggerReducer,
  BabylonAuthReducer,
  MetaReducer,
  ContactsReducer,
  UserPreferences,
  DigitalTwinReducer,
  FeedbackReducer,
  BmiReducer,
  TourReducer,
  DocumentReducer,
  SharedDataReducer,
  NavigatorReducer,
  ConnectReducer,
  RelationReducer,
  ForgotPasswordReducer,
  NricReducer,

  AIMEReducer,
  HospitalDetailReducer,
  ClinicDetailReducer,
  RiskZoneReducer,
  SearchHospotilReducer,
  PERSIST_KEYS,
  EventReducer,
  InternalChatReducer,

  MPolicyClaimReducer,
  MPolicyProfileReducer,
  MPolicyGrantRevokeReducer,
  MPolicyMainReducer,
  MPolicyDeviceReducer,
  BootstrapReducer,
  ReferralGroupReducer,
} = CoreReducers;

const { reducer: videoSales } = VideoSales;
const sensitiveStorage = createSensitiveStorage({
  keychainService: "pulseKeychain",
  sharedPreferencesName: "pulseSharedPrefs",
});

const authPersistConfig = {
  key: PERSIST_KEYS.AUTH,
  storage: sensitiveStorage,
  blacklist: ["password", "countryInfo", "disableLoginButton"],
};

const forgotPasswordConfig = {
  key: PERSIST_KEYS.FORGOT_PASSWORD,
  storage,
  blacklist: ["generatedOtpResponse"],
};

const registerPersistConfig = {
  key: PERSIST_KEYS.REGISTER,
  storage,
  blacklist: ["loading", "phoneNumber", "userVerified", "isRegistered"],
};

const profilePersistConfig = {
  key: PERSIST_KEYS.PROFILE,
  storage: sensitiveStorage,
  blacklist: [
    "connectedList",
    "updatingUser",
    "firstName",
    "surName",
    "phone",
    "dob",
  ],
};

const triggerPersistConfig = {
  key: PERSIST_KEYS.TRIGGER,
  storage,
  blacklist: ["isLoading", "isDrawerOpen"],
};

const babylonAuthPersistConfig = {
  key: PERSIST_KEYS.BABYLON_AUTH,
  storage,
  blacklist: ["dobText", "dobDate", "babylonUser"],
};

const metaPersistConfig = {
  key: PERSIST_KEYS.META,
  storage: FSStorage(),
  blacklist: ["refreshImage", "countryCommonMeta"],
  keyPrefix: "", //fix for fs storage path
};

const documentPersistConfig = {
  key: PERSIST_KEYS.DOCUMENT,
  storage: FSStorage(),
  keyPrefix: "", //fix for fs storage path
};

const contactsPersistConfig = {
  key: PERSIST_KEYS.CONTACTS,
  storage,
};

const pulsefoodPersistConfig = {
  key: "pulsefood",
  storage,
  whitelist: ["aboutYouCompleted"],
};

const AIMERegPersistConfig = {
  key: PERSIST_KEYS.AIMEREGISTRATION,
  storage,
};

const userPreferencesPersistConfig = {
  key: PERSIST_KEYS.USER_PREFERENCE,
  storage,
};

const digitalTwinPersistConfig = {
  key: PERSIST_KEYS.DIGITAL_TWIN,
  storage,
  blacklist: [],
};

const accountPersistConfig = {
  key: PERSIST_KEYS.ACCOUNT,
  storage: sensitiveStorage,
};

const bmiPersistConfig = {
  key: PERSIST_KEYS.BMI,
  storage,
};

const tourPersistConfig = {
  key: PERSIST_KEYS.TOUR,
  storage,
};

const googleFitPersistConfig = {
  key: PERSIST_KEYS.FITNESS_TRACKER,
  storage,
};

const sharedDataPersistConfig = {
  key: PERSIST_KEYS.SHARED_DATA,
  storage: sensitiveStorage,
};

const relationDataPersistConfig = {
  key: PERSIST_KEYS.RELATION,
  storage,
};

const doctorServicesPersistConfig = {
  key: PERSIST_KEYS.DOCTOR_SERVICES,
  storage,
  blacklist: ["workflowId", "error", "mobileNumber"],
};
const doctorOnCallServicePersistConfig = {
  key: PERSIST_KEYS.DOC_ON_CALL_SERVICE,
  storage,
  blacklist: ["workflowId", "error", "mobileNumber"],
};

const bootStrapConsfig = {
  key: PERSIST_KEYS.BOOTSTRAP,
  storage,
};
const PHONE_DETAILS = {
  countryId: "1",
  countryName: "Cambodia",
  countryCode: "KHM",
  countryFlag: null,
  countryPhoneCode: "+855",
};

const babylonAuthInitialState = {
  country: PHONE_DETAILS,
};

const metaInitialState = {
  countryList: [PHONE_DETAILS],
};

const EventServiceConfig = {
  key: PERSIST_KEYS.EVENT_SERVICES,
  storage,
};
const InsanConfig = {
  key: PERSIST_KEYS.INSAN_STATE,
  storage,
};
const marketingConsentConfig = {
  key: PERSIST_KEYS.MARKETING_CONSENT,
  storage,
};
const ChallengeConfig = {
  key: PERSIST_KEYS.CHALLENGE,
  storage,
};

const HospitalSearchHistory = {
  key: PERSIST_KEYS.HOSPITAL_SEARCH_HISTORY,
  storage,
};
const ConsulationHistory = {
  key: "ConsulationHistory",
  storage,
};
const mpolicyDeviceConfig = {
  key: "MPOLICY_DEVICES",
  storage,
};

const doctorProfilePersistConfig = {
  key: PERSIST_KEYS.DOCTOR_PROFILE,
  storage,
};

const mpolicyPolicyConfig = {
  key: "MPOLICY_MYPOLICY",
  storage,
};
const rewardConfig = {
  key: PERSIST_KEYS.REWARD_CENTER,
  storage,
};

const pruPaymentConfig = {
  key: PERSIST_KEYS.PRU_PAYMENT,
  storage,
  blacklist: ["redemptionResponse"],
};

const likecommentConfig = {
  key: "LIKECOMMENT",
  storage,
};

const affinityGroupConfig = {
  key: "affinityGroup",
  storage,
  whitelist: ["myGroups", "notifications", "isLikesUpdating", "likes"],
};

const challengesConfig = {
  key: "challenges",
  storage,
  whitelist: ["myChallenges"],
};

const fitnessTrackerReducerConfig = {
  key: "FitnessTrackersReducer",
  storage,
  whitelist: ["wearableList", "customerConnectedWearables"],
};

const vaccinationConfig = {
  key: "Vaccination",
  storage,
  blacklist: ["children", "spouse"],
};
const communityEventConfig = {
  key: "communityEvent",
  storage,
  blacklist: ["isInitiator", "pulseTvIncomingCall"],
};

const NavigatorConfig = {
  key: "primary",
  storage,
  whitelist: ["recentSearch"],
};

const workoutPlansConfig = {
  key: "WorkoutPlans",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  cca: ccaReducer,
  faceBlender: faceBlenderReducer,
  forgotPassword: persistReducer(forgotPasswordConfig, ForgotPasswordReducer),
  // forgotPassword: ForgotPasswordReducer,
  register: persistReducer(registerPersistConfig, RegisterReducer),
  trigger: persistReducer(triggerPersistConfig, TriggerReducer),
  babylonAuth: persistReducer(
    babylonAuthPersistConfig,
    BabylonAuthReducer(babylonAuthInitialState)
  ),
  meta: persistReducer(metaPersistConfig, MetaReducer(metaInitialState)),
  chat: ChatReducer,
  healthCheck: HealthAssessment,
  contacts: persistReducer(contactsPersistConfig, ContactsReducer),
  userPreferences: persistReducer(
    userPreferencesPersistConfig,
    UserPreferences
  ),
  affinityGroup: persistReducer(affinityGroupConfig, affinityGroupReducer),
  chatBot: chatBotReducer,
  documents: persistReducer(documentPersistConfig, DocumentReducer),
  digitalTwin: persistReducer(digitalTwinPersistConfig, DigitalTwinReducer),
  profile: persistReducer(profilePersistConfig, ProfileReducer),
  feedback: FeedbackReducer,
  bmi: persistReducer(bmiPersistConfig, BmiReducer),
  tour: persistReducer(tourPersistConfig, TourReducer),

  account: persistReducer(accountPersistConfig, AccountReducer),
  sharedData: persistReducer(sharedDataPersistConfig, SharedDataReducer),
  connectData: ConnectReducer,
  relationData: persistReducer(relationDataPersistConfig, RelationReducer),
  appNavigation: AppNavigationReducer,
  nricData: NricReducer,
  regAIME: persistReducer(AIMERegPersistConfig, AIMEReducer),
  faceDetection: faceDetectionReducer,
  skinCareAI: skinCareAIReducer,
  mealPlanner: mealPlannerReducer,

  doctorServices: persistReducer(
    doctorServicesPersistConfig,
    DoctorServicesReducer
  ),
  doctorProfile: persistReducer(
    doctorProfilePersistConfig,
    DoctorProfileReducer
  ),
  doctorOnCallService: persistReducer(
    doctorOnCallServicePersistConfig,
    DocOnCallReducer
  ),
  consultationHistory: ConsulationHistoryReducer,
  riskzone: RiskZoneReducer,
  hospitalDetail: HospitalDetailReducer,
  clinicDetail: ClinicDetailReducer,
  hospitalSearchReducer: persistReducer(
    HospitalSearchHistory,
    SearchHospotilReducer
  ),
  eventData: persistReducer(EventServiceConfig, EventReducer),
  InsanReducer: persistReducer(InsanConfig, insaanReducer),
  consentManagementReducer: persistReducer(
    marketingConsentConfig,
    consentManagementReducer
  ),
  internalChatReducer: InternalChatReducer,
  screenConfig: ScreenConfigReducer,
  mpolicyClaim: MPolicyClaimReducer,
  mpolicyProfile: MPolicyProfileReducer,
  mpolicyMain: MPolicyMainReducer,
  mpolicyDevice: persistReducer(mpolicyDeviceConfig, MPolicyDeviceReducer),
  mpolicyGrantRevoke: MPolicyGrantRevokeReducer,
  navigator: persistReducer(NavigatorConfig, NavigatorReducer),
  bootStrap: persistReducer(bootStrapConsfig, BootstrapReducer),
  referralGroup: ReferralGroupReducer,
  myPolicy: myPolicyReducers,
  rewardCenter: persistReducer(rewardConfig, RewardReducer),
  pruPayment: persistReducer(pruPaymentConfig, PruPaymentReducer),
  notifications: NotificationReducer,
  appNotifications,
  // claimsReducer: ClaimsReducer,
  // productRuntime: persistReducer(productRuntimeConfig, ProductRuntimeReducer)
  // productRuntime: ProductRuntimeReducer,
  wellnessPlans: WellnessPlansHabitsReducer,
  videoSales,
  deepLink: DeepLinkReducer,
  aimeDengueAlert: aimeDengueAlertReducer,
  wizardData: wizardReducer,
  FitnessTrackersReducer: persistReducer(
    fitnessTrackerReducerConfig,
    FitnessTrackersReducer
  ),
  likecomment: persistReducer(likecommentConfig, likecommentReducer),
  socialReferralReducer: socialReferralReducer,
  challenges: persistReducer(challengesConfig, ChallengesReducer),
  cancerPolicy: cancerPolicyReducer,
  commonData: commonReducer,
  // CancelReducer: CancelReducer,
  ppgVitals: ppgVitalsReducer,
  heartRateVariability: hrvReducer,
  communityEvents: persistReducer(communityEventConfig, CommunityEventsReducer),
  vaccinations: persistReducer(vaccinationConfig, VaccineReducer),
  workoutPlans: persistReducer(workoutPlansConfig, WorkoutPlansReducer),
  medicineDelivery: medicineDeliveryReducer,
  coronaReducer: coronaReducer,
  ratingReducer: ratingReducer,
  consulationHistoryHaloDoc: persistReducer(
    ConsulationHistory,
    ConsulationHistoryHaloDocReducer
  ),
  haloDocServices: HaloDocReducer,
  subscription: subscriptionReducer,
  pulsefood: persistReducer(pulsefoodPersistConfig, pulsefoodReducer),
  customerConnect: CustomerConnectReducer,
  foodSearch: foodSearchReducer,
  airQualityData: AirQualityReducer,
  // myPolicy: myPolicyReducers, //Renewal Button Store
});

export default rootReducer;
