import screens from "../configs/screen-names";
import actions from "../configs/actions";

export default {
  [screens.FACE_DETECTION]: {
    [actions.savePicture]: {
      successAction: actions.savePictureSuccess,
      failureAction: actions.savePictureFailure,
      toggleLoader: false,
      dispatchActions: [
        {
          context: screens.FACE_DETECTION,
          type: actions.disableLoadingText,
        },
        {
          context: screens.RESULT,
          type: actions.goToResultPage,
        },
      ],
    },
  },
};
