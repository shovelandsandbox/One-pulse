import screens from "../configs/screen-names";
import actions from "../configs/actions";

export default {
  [screens.SKIN_CARE_AI]: {
    [actions.savePicture]: {
      successAction: actions.savePictureSuccess,
      failureAction: actions.savePictureFailure,
      toggleLoader: false,
      dispatchActions: [
        {
          context: screens.SKIN_CARE_AI,
          type: actions.disableLoadingText,
        },
        {
          context: screens.SkinCareAIResult,
          type: actions.goToResultPage,
        },
      ],
    },
  },
};
