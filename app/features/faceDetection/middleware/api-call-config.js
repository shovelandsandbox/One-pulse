import screens from "../configs/screen-names";
import actions from "../configs/actions";
import { buildPayload } from "../../../utils/apiUtils";
import { pathOr } from "ramda";
// import { CoreActionTypes } from "@pru-rt-internal/pulse-common";

const getUserId = state => pathOr("", ["profile", "id"], state);

// export const goToScreens = (params, screen) => ({
//   type: CoreActionTypes.GO_TO_SCREEN,
//   navigateTo: screen,
// });

export default {
  [screens.FACE_DETECTION]: {
    [actions.savePicture]: {
      payloadBuilder: (store, action) => {
        const body = [
          {
            content: action.payload.pictureInfo.base64,
            contentType: "image/jpg",
          },
        ];
        return buildPayload(store, "diagnoseFace", null, body, {
          id: getUserId(store.getState()),
        });
      },
      loader: action => action.mode === "manual",
    },
  },
};
