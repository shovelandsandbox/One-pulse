import fsmMiddlewareConfig from "../../middleware-overrides/fsm-middleware-config-overrides";
import apiCallMiddlewareConfig from "../../middleware-overrides/api-call-middleware-config-overrides";
import responseMiddlewareConfig from "../../middleware-overrides/response-middleware-config-overrides";

import myPolicyApis from "../../mypolicy/middleware/configs/myPolicyAPIs";
import myPolicyResponseHandlerConfigs from "../../mypolicy/middleware/configs/response-handler-middleware-config";
import myPolicyFsm from "../../mypolicy/middleware/configs";

import rewardApis from "../../features/rewards/configs/middleware/api-call-config";
import wizardFsm from "../../features/pru-wizard/configs/middleware/fsm-config";
import wizardApis from "../../features/pru-wizard/configs/middleware/api-call-config";
import rewardResponseHandlerConfigs from "../../features/rewards/configs/middleware/response-handler-config";
import wizardResponseHanlder from "../../features/pru-wizard/configs/middleware/response-handler-config";
import TnCApis from "../../features/TnC/config/middleware/api-call-config";
import TncResponseHandlerConfigs from "../../features/TnC/config/middleware/response-handler-config";
import notificationApis from "../../features/notificationCentre/configs/middleware/api-call-config";
import notificationResponseHandlers from "../../features/notificationCentre/configs/middleware/response-handler-config";
import {
  DocOnCallFsmConfig,
  DocOnCallResponseHandlerCallConfig,
  DocOnCallApiCallConfig,
} from "../../features/DocOnCall";

//Dengue Journey
import aimeApis from "../../features/AIMEDengueAlert/configs/middelware/api-call-config";
import aimeResponseHandlerConfigs from "../../features/AIMEDengueAlert/configs/middelware/response-handler-config";
import aimeFsmConfig from "../../features/AIMEDengueAlert/configs/middelware/fsm-config";

//Insaan Journey
import insaanApiCall from "../../features/insaan/configs/middleware/api-call-config";
import insaanApiResponse from "../../features/insaan/configs/middleware/response-handler-config";

//consent management
import consentManagementApiCall from "../../features/consentManagement/config/middleware/api-call-config";
import consentManagementApiResponse from "../../features/consentManagement/config/middleware/response-handler-config";

import {
  campaignApiCallConfig,
  campaignResponseHandlerConfig,
} from "../../features/campaign";
import wellnessPlanApis from "../../features/wellnessPlans/config/middleware/api-call-config";
import wellnessPlanResponseHandlerConfigs from "../../features/wellnessPlans/config/middleware/response-handler-config";
import fitnessTrackersApis from "../../features/fitnessTrackers/configs/middleware/api-call-config";
import fitnessTrackerResponseHandlerConfigs from "../../features/fitnessTrackers/configs/middleware/response-handler-config";
import fitnessTrackerFsm from "../../features/fitnessTrackers/configs/middleware/fsm-config";
import VideoSalesConfig from "../../features/videoSales/configs/middleware";
import AffinityGroupsConfig from "../../features/affinity-groups/middleware";
//Social Invite
import SocialInviteConfig from "../../features/socialInvite/configs/middleware";
//Likes and Comments
import LikesAndCommentsConfig from "../../features/likesAndComments/configs/middleware";
import ChallengesConfig from "../../features/challenges/middleware";
import cancerPolicyConfig from "../../features/cancerPolicy/middleware";
import commonConfig from "../../features/common/middleware";

// CCA Journey
import ccaApiCall from "../../features/CCAJourney/configs/middleware/api-call-config";
import ccaApiResponse from "../../features/CCAJourney/configs/middleware/response-handler-config";
import ccaFsmConfig from "../../features/CCAJourney/configs/middleware/fsm-config";

//halodoc
import haloDocFsmConfig from "../../features/HaloDoc/configs/middleware/fsm-config";
import haloDocApiCall from "../../features/HaloDoc/configs/middleware/api-call-config";
import haloDocApiResponse from "../../features/HaloDoc/configs/middleware/response-handler-config";

// import {
//   fsmConfig as productJourneyFsmConfig,
//   apiCallMiddlewareConfig as productJourneyApiCallMiddlewareConfig,
//   middlewareConfig as productJourneyApiResponseMiddlewareConfig,
// } from "@pru-rt-internal/product-journeys";

import pruPaymentApiConfig from "../../features/pruPayment/configs/middleware/api-call-config";
import pruPaymentResponseHandlerConfig from "../../features/pruPayment/configs/middleware/response-handler-config";
// import {
//   fsmConfig as claimJourneyFsmConfig,
//   apiCallMiddlewareConfig as claimJourneyApiCallMiddlewareConfig,
//   middlewareConfig as claimJourneyApiResponseMiddlewareConfig,
// } from "@pru-rt-internal/claim-journeys";
// import {
//   fsmConfig as cancelJourneyFsmConfig,
//   apiCallMiddlewareConfig as cancelJourneyApiCallMiddlewareConfig,
//   middlewareConfig as cancelJourneyApiResponseMiddlewareConfig,
// } from "@pru-rt-internal/cancel-journey";

import userProfileCommonApis from "../../features/user-profile/api-call-config";
import userProfileCommonResponse from "../../features/user-profile/response-handler-config";

//Medicine Delivery
import medicineFsmConfig from "../../features/BuyMedicine/configs/middelware/fsmConfig";
import medicineApiConfig from "../../features/BuyMedicine/configs/middelware/api-call-config";
import medicineeResponseHandlerConfigs from "../../features/BuyMedicine/configs/middelware/response-handler-config";

//consultationHistory
import consultationHistoryApiCall from "../../features/HaloDocConsultaionHistory/configs/middleware/api-call-config";
import consultationHistoryApiResponse from "../../features/HaloDocConsultaionHistory/configs/middleware/response-handler-config";
//Vaccination Calendar
import VaccinationCalendarConfig from "../../features/vaccinationCalendar/configs/middleware";
import faceDetectionApiConfig from "../../features/faceDetection/middleware/api-call-config";
import faceDetectionResponseHandlerConfig from "../../features/faceDetection/middleware/response-handler-config";
import FaceDetectionFsmMiddlewareConfig from "../../features/faceDetection/middleware/fsm-config";

import babylonApis from "../../features/babylon/middleware/api-call-configs";
import babylonResponseHandlers from "../../features/babylon/middleware/response-handler-config";
import ppgVitalsConfig from "../../features/ppgVitals/middleware";
import heartRateVariabilityConfig from "../../features/heartRateVariability/middleware";

import communityEventsMiddlewareConfig from "../../features/communityEvents/middleware";
import ExerciseBuddyConfig from "../../features/exerciseBuddy/configs/middleware";

import chatBotConfig from "../../features/chatBot/middleware";
import mealPlannerConfig from "../../features/mealPlanner/middleware";
import skinCareAIConfig from "../../features/skinCareAI/middleware";

// PULSE FOOD
import pulseFoodConfig from "../../features/PulseFood/configs/middleware";

import {
  CustomerConnectApiConfig,
  CustomerConnectResponseHandlerConfig,
  CustomerConnectFSMConfig,
  CustomerConnectFirebaseMessageHandler,
} from "../../features/customerConnect";

// Food Search Journey
import foodSearchApiCall from "../../features/FoodSearch/configs/middleware/api-call-config";
import foodSearchApiResponse from "../../features/FoodSearch/configs/middleware/response-handler-config";
import foodSearchFsmConfig from "../../features/FoodSearch/configs/middleware/fsm-config";

import airQualityIndexApis from "../../features/AirQualityIndex/configs/middleware/api-call-config";
import airQualityIndexResponseHandlers from "../../features/AirQualityIndex/configs/middleware/response-handler-config";
import airQualityIndexFsmConfig from "../../features/AirQualityIndex/configs/middleware/fsm-config"

// Baby Face Journey
import faceBlenderApiCall from "../../features/FaceBlender/configs/middleware/api-call-config";
import faceBlenderApiResponse from "../../features/FaceBlender/configs/middleware/response-handler-config";
import faceBlenderFsmConfig from "../../features/FaceBlender/configs/middleware/fsm-config";

export default {
  apiCallMiddlewareConfig: {
    ...apiCallMiddlewareConfig,
    ...myPolicyApis,
    ...wizardApis,
    ...rewardApis,
    ...notificationApis,
    // ...productJourneyApiCallMiddlewareConfig,
    ...pruPaymentApiConfig,
    ...wellnessPlanApis,
    // ...claimJourneyApiCallMiddlewareConfig,
    ...VideoSalesConfig.ApiCallConfig,
    ...DocOnCallApiCallConfig,
    ...AffinityGroupsConfig.ApiCallConfig,
    ...TnCApis,
    ...aimeApis,
    ...insaanApiCall,
    ...campaignApiCallConfig,
    ...SocialInviteConfig.ApiCallConfig,
    ...fitnessTrackersApis,
    ...LikesAndCommentsConfig.ApiCallConfig,
    ...ChallengesConfig.ApiCallConfig,
    ...cancerPolicyConfig.ApiCallConfig,
    ...commonConfig.ApiCallConfig,
    ...userProfileCommonApis,
    ...ccaApiCall,
    ...consentManagementApiCall,
    ...medicineApiConfig,
    ...haloDocApiCall,
    ...consultationHistoryApiCall,
    // ...cancelJourneyApiCallMiddlewareConfig,
    ...VaccinationCalendarConfig.ApiCallConfig,
    ...faceDetectionApiConfig,
    ...babylonApis,
    ...consentManagementApiCall,
    ...ppgVitalsConfig.ApiCallConfig,
    ...heartRateVariabilityConfig.ApiCallConfig,
    ...communityEventsMiddlewareConfig.ApiCallConfig,
    ...chatBotConfig.ApiCallConfig,
    ...airQualityIndexApis,
    ...ExerciseBuddyConfig.ApiCallConfig,
    ...mealPlannerConfig.ApiCallConfig,
    ...pulseFoodConfig.pulseFoodApiConfig,
    ...CustomerConnectApiConfig,
    ...skinCareAIConfig.ApiCallConfig,
    ...pulseFoodConfig.pulseFoodApiConfig,
    ...foodSearchApiCall,
    ...faceBlenderApiCall,
  },
  responseMiddlewareConfig: {
    ...responseMiddlewareConfig,
    ...myPolicyResponseHandlerConfigs,
    ...rewardResponseHandlerConfigs,
    ...wizardResponseHanlder,
    ...notificationResponseHandlers,
    // ...productJourneyApiResponseMiddlewareConfig,
    ...pruPaymentResponseHandlerConfig,
    ...wellnessPlanResponseHandlerConfigs,
    // ...claimJourneyApiResponseMiddlewareConfig,
    ...VideoSalesConfig.ResponseHandlerCallConfig,
    ...DocOnCallResponseHandlerCallConfig,
    ...AffinityGroupsConfig.ResponseHandlerCallConfig,
    ...TncResponseHandlerConfigs,
    ...aimeResponseHandlerConfigs,
    ...insaanApiResponse,
    ...campaignResponseHandlerConfig,
    ...SocialInviteConfig.ResponseHandlerCallConfig,
    ...fitnessTrackerResponseHandlerConfigs,
    ...LikesAndCommentsConfig.ResponseHandlerCallConfig,
    ...ChallengesConfig.ResponseHandlerCallConfig,
    ...cancerPolicyConfig.ResponseHandlerCallConfig,
    ...commonConfig.ResponseHandlerCallConfig,
    ...userProfileCommonResponse,
    ...ccaApiResponse,
    ...consentManagementApiResponse,
    // ...cancelJourneyApiResponseMiddlewareConfig,
    ...VaccinationCalendarConfig.ResponseHandlerCallConfig,
    ...faceDetectionResponseHandlerConfig,
    ...babylonResponseHandlers,
    ...consentManagementApiResponse,
    ...communityEventsMiddlewareConfig.ResponseHandlerCallConfig,
    ...ExerciseBuddyConfig.ResponseHandlerCallConfig,
    ...medicineeResponseHandlerConfigs,
    ...haloDocApiResponse,
    ...consultationHistoryApiResponse,
    ...ppgVitalsConfig.ResponseHandlerCallConfig,
    ...heartRateVariabilityConfig.ResponseHandlerCallConfig,
    ...chatBotConfig.ResponseHandlerCallConfig,
    ...airQualityIndexResponseHandlers,
    ...mealPlannerConfig.ResponseHandlerCallConfig,
    ...skinCareAIConfig.ResponseHandlerCallConfig,
    ...pulseFoodConfig.ResponseHandlerCallConfig,
    ...foodSearchApiResponse,
    ...faceBlenderApiResponse,
    ...CustomerConnectResponseHandlerConfig,
  },
  fsmMiddlewareConfig: {
    ...fsmMiddlewareConfig,
    // ...productJourneyFsmConfig,
    // ...claimJourneyFsmConfig,
    ...VideoSalesConfig.FsmConfig,
    ...AffinityGroupsConfig.FsmConfig,
    ...ChallengesConfig.FsmConfig,
    ...wizardFsm,
    ...aimeFsmConfig,
    ...DocOnCallFsmConfig,
    ...fitnessTrackerFsm,
    ...myPolicyFsm,
    ...ccaFsmConfig,
    ...medicineFsmConfig,
    ...haloDocFsmConfig,
    // ...cancelJourneyFsmConfig,
    ...communityEventsMiddlewareConfig.FsmConfig,
    ...VaccinationCalendarConfig.FsmConfig,
    ...FaceDetectionFsmMiddlewareConfig,
    ...skinCareAIConfig.FsmConfig,
    ...ExerciseBuddyConfig.FsmConfig,
    ...pulseFoodConfig.FsmConfig,
    ...ppgVitalsConfig.FsmConfig,
    ...heartRateVariabilityConfig.FsmConfig,
    ...CustomerConnectFSMConfig,
    ...foodSearchFsmConfig,
    ...airQualityIndexFsmConfig,
    ...faceBlenderFsmConfig,
  },
  firebaseMiddlewareConfig: {
    ...VideoSalesConfig.FirebaseConfig,
    ...AffinityGroupsConfig.FirebaseConfig,
    ...CustomerConnectFirebaseMessageHandler,
  },
};
