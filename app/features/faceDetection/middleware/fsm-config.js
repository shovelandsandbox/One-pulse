import screens from "../configs/screen-names";
import actions from "../configs/actions";
import { CoreUtils } from "@pru-rt-internal/pulse-common";
import { pathOr } from "ramda";
const { getPayloadForNavigation } = CoreUtils;

const FaceDetectionFsmMiddlewareConfig = {
  [screens.RESULT]: {
    [actions.goToResultPage]: ({ action }) => {
      const navigateTo = screens.RESULT;
      return getPayloadForNavigation(action, navigateTo, null);
    },
  },
  [screens.faceDetection]: {
    [actions.enableFaceDetection]: ({ store, action }) => {
      const enableGallery = pathOr(
        false,
        ["meta", "countryCommonMeta", "faceDetection", "enableGallery"],
        store.getState()
      );
      let navigateTo = screens.faceDetection;
      if (enableGallery) {
        navigateTo = screens.GALLERY;
      }
      return getPayloadForNavigation(action, navigateTo, null);
    },
  },
};

export default FaceDetectionFsmMiddlewareConfig;
