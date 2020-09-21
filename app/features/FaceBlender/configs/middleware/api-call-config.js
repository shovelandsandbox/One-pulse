
import { screenNames } from "../screenNames"
import * as FaceBlenderActions from "../actionNames"
import { buildPayload } from "../../utils"

const faceBlenderApiCall = {
    [screenNames.BABY_SCREEN]: {
        [FaceBlenderActions.GET_BABY_DETAILS]: {
            payloadBuilder: (store, action) => {
                let state = store.getState()

                const body = {
                    mandatoryAttributes: {
                        msg: action.payload.message ? action.payload.message : null,
                        msgFont: action.payload.messageFont ? action.payload.messageFont : null,
                        gender: action.payload.gender,
                        dadPhoto: state.faceBlender.dadImage,
                        skinTone: action.payload.skinTone,
                        mumPhoto: state.faceBlender.mumImage
                    }
                }

                const params = {
                    type: "makebaby"
                }

                return buildPayload(store, "createCustomerAvatar", null, body, params);

                // return buildPayload(store, "getCustomerById", null, null, null);
            },
            loader: true
        }
    }
}

export default faceBlenderApiCall;