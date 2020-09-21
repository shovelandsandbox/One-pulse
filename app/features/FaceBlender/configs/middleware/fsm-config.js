import { screenNames } from "../screenNames";
import * as FaceBlenderActions from "../actionNames";
import { getPayloadForNavigation } from "../../utils"

const faceBlenderFsmConfig = {
    [screenNames.BABY_SCREEN]: {
        [FaceBlenderActions.GET_BABY_DETAILS_SUCCESS]: ({ action }) => {
            const navigateTo = screenNames.RESULT_SCREEN;
            return getPayloadForNavigation(action, navigateTo, null);
        }
    },
}

export default faceBlenderFsmConfig;