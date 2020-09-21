import { screenNames } from "../screenNames";
import * as FaceBlenderActions from "../actionNames";
import { Alert } from "react-native";

const faceBlenderApiResponse = {
    [screenNames.BABY_SCREEN]: {
        [FaceBlenderActions.GET_BABY_DETAILS]: {
            successAction: FaceBlenderActions.GET_BABY_DETAILS_SUCCESS,
            postSuccessHook: (payload, state) => {
                return payload.response;
            },
            failureAction: FaceBlenderActions.GET_BABY_DETAILS_FAILURE,
            failureHandler: store => {
                Alert.alert(
                    "",
                    "Please choose a different photo and try again.",
                    [
                        {
                            text: "OK",
                            onPress: () => { }
                        }
                    ],
                    { cancelable: false }
                );
            },
            toggleLoader: false,
        }
    },

};

export default faceBlenderApiResponse;
