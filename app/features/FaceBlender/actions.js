import { screenNames } from "./configs/screenNames"
import * as FaceBlenderActions from "./configs/actionNames"

export const saveDadPhoto = payload => ({
    context: screenNames.DAD_SCREEN,
    type: FaceBlenderActions.SAVE_DAD_PHOTO,
    payload: payload
});

export const saveMumPhoto = payload => ({
    context: screenNames.MUM_SCREEN,
    type: FaceBlenderActions.SAVE_MUM_PHOTO,
    payload: payload
});

export const getBabyDetails = payload => ({
    context: screenNames.BABY_SCREEN,
    type: FaceBlenderActions.GET_BABY_DETAILS,
    payload: payload
});

export const clearAllDetails = payload => ({
    context: screenNames.RESULT_SCREEN,
    type: FaceBlenderActions.CLEAR_ALL_DETAILS,
    payload: payload
});
