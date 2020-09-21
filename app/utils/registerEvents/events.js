import challengesEvents from "../../features/challenges/events";
import affinityGroupEvents from "../../features/affinity-groups/events";
import communityEventsEvents from "../../features/communityEvents/events";
import collectSocialEmail from "../../features/collect-social-registration-email/events";
import mealPlannerEvents from "../../features/mealPlanner/events";
import videoSalesEvents from "../../features/videoSales/events";
import faceDetectionEvents from "../../features/faceDetection/events";
import ppgVitalsEvents from "../../features/ppgVitals/events";
import hrvEvents from "../../features/heartRateVariability/events";
import skinCareAIEvents from "../../features/skinCareAI/events";
import allEvents from "./all-events";
import faceBlenderEvents from "../../features/FaceBlender/events";

export default {
  ...challengesEvents,
  ...allEvents,
  ...affinityGroupEvents,
  ...communityEventsEvents,
  ...collectSocialEmail,
  ...mealPlannerEvents,
  ...skinCareAIEvents,
  ...videoSalesEvents,
  ...faceDetectionEvents,
  ...hrvEvents,
  ...ppgVitalsEvents,
  ...faceBlenderEvents,
};
