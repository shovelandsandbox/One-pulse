import * as FaceBlenderActions from './configs/actionNames';
import { pathOr, isEmpty } from "ramda"

const INITIAL_STATE = {
    dadImage: "",
    mumImage: "",
    babyDetails: {}
};

const faceBlenderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case FaceBlenderActions.SAVE_DAD_PHOTO:
            return {
                ...state,
                dadImage: action.payload.dadPhoto
            };
        case FaceBlenderActions.SAVE_MUM_PHOTO:
            return {
                ...state,
                mumImage: action.payload.mumPhoto
            };

        case FaceBlenderActions.GET_BABY_DETAILS:
            return {
                ...state,
            };
        case FaceBlenderActions.GET_BABY_DETAILS_SUCCESS:
            return {
                ...state,
                babyDetails: action.payload.body
            };
        case FaceBlenderActions.GET_BABY_DETAILS_FAILURE:
            return {
                ...state,
            };

        case FaceBlenderActions.CLEAR_ALL_DETAILS:
            return {
                ...state,
                dadImage: "",
                mumImage: "",
                babyDetails: {}
            };

        default:
            return state;
    }

};

export default faceBlenderReducer;