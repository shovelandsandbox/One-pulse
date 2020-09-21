import screens from "../configs/screen-names";
import actions from "../configs/actions";
import { buildPayload } from "../../../utils/apiUtils";
import { pathOr } from "ramda";

const getUserId = state => pathOr("", ["profile", "id"], state);

export default {
  [screens.SKIN_CARE_AI]: {
    [actions.savePicture]: {
      payloadBuilder: (store, action) => {
        const body = [
          {
            content: action.payload.pictureInfo.base64,
            contentType: "image/jpg",
          },
        ];
        return buildPayload(store, "diagnoseSkin", null, body, {
          id: getUserId(store.getState()),
        });
      },
      loader: action => action.mode === "manual",
    },
  },
};
