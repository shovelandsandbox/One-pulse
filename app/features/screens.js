import ppgVitalsScreens from "./ppgVitals";
import heartRateScreens from "./heartRateVariability";
import faceDetection from "./faceDetection/components";
import skinCareAI from "./skinCareAI/components";
import SkinCareAIResult from "./skinCareAI/screens/Result";
import SkinCareAIResultNew from "./skinCareAI/screens/ResultNew";
import SkinCareAIGallery from "./skinCareAI/screens/Gallery";
import mealPlanner from "./mealPlanner/screens";

export default {
  ...ppgVitalsScreens,
  ...heartRateScreens,
  faceDetection,
  skinCareAI,
  SkinCareAIResult,
  SkinCareAIResultNew,
  SkinCareAIGallery,
  ...mealPlanner,
};
