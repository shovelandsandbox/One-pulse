/* eslint-disable complexity */
import actions from "./configs/actions";
import { pathOr } from "ramda";

const initialState = {
  startShare: false,
  pictureInfo: {},
  maximumCaptures: 2,
  showLoadingText: false,
  disableTakePicture: false,
  showErrorMessage: false,
  shouldResetModal: false,
  sourceType: "camera",
};

const skinCareAIReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.initskinCareAI: {
      return {
        ...initialState,
      };
    }
    case actions.shouldResetModal: {
      return {
        ...state,
        shouldResetModal: action?.payload?.shouldResetModal,
      };
    }
    case actions.savePicture: {
      return {
        ...state,
        showLoadingText: true,
        sourceType: action.payload.sourceType,
        pictureInfo: action.payload.pictureInfo,
      };
    }
    case actions.savePictureSuccess: {
      return {
        ...state,
        skinData: pathOr({}, ["payload", "response", "body"], action),
      };
    }

    case actions.savePictureFailure: {
      return {
        ...state,
        showLoadingText: false,
        disableTakePicture: false,
        showErrorMessage: true,
      };
    }
    case actions.shareResults: {
      return {
        ...state,
        startShare: true,
      };
    }
    case actions.resetShare: {
      return {
        ...state,
        startShare: false,
      };
    }
    case actions.disableTakePicture: {
      return {
        ...state,
        disableTakePicture: true,
      };
    }
    case actions.hideErrorMessage: {
      return {
        ...state,
        showErrorMessage: false,
      };
    }
    case actions.resetTakePicture: {
      return {
        ...state,
        disableTakePicture: false,
      };
    }
    case actions.disableLoadingText: {
      return {
        ...state,
        showLoadingText: false,
      };
    }
    default:
      return { ...state };
  }
};

export default skinCareAIReducer;
