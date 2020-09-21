import screens from "../configs/screen-names";
import actions from "../configs/actions";
import { CoreUtils } from "@pru-rt-internal/pulse-common";
import { pathOr } from "ramda";
const { getPayloadForNavigation } = CoreUtils;

const SkinCareAIFsmMiddlewareConfig = {
  [screens.SkinCareAIResult]: {
    [actions.goToResultPage]: ({ action }) => {
      const navigateTo = screens.SkinCareAIResult;
      return getPayloadForNavigation(action, navigateTo, null);
    },
  },
  [screens.skinCareAI]: {
    [actions.enableSkinCareAICheck]: ({ store, action }) => {
      const enableGallery = pathOr(
        false,
        ["meta", "countryCommonMeta", "skinCareAI", "enableGallery"],
        store.getState()
      );
      let navigateTo = screens.skinCareAI;
      if (enableGallery) {
        navigateTo = screens.SKIN_CARE_AI_GALLERY;
      }
      return getPayloadForNavigation(action, navigateTo, null);
    },
  },
};

export default SkinCareAIFsmMiddlewareConfig;
