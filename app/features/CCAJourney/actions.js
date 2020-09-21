import { screenNames } from "./configs/screenNames"
import * as CcaActions from "./configs/actionNames"
import { CoreActionTypes, CoreConfig } from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;

export const gotoPulseHealthScreen = payload => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: pageKeys.PULSE_HEALTH_PAGE,
    payload: {
        params: payload
    }
});
export const gotoCCAJourneyScreen = payload => ({
    type: CcaActions.GO_TO_SCREEN,
    navigateTo: screenNames.CCA_JOURNEY,
    payload: {
        params: payload
    }
});
export const gotoCCAIntroductionScreen = payload => ({
    type: CcaActions.GO_TO_SCREEN,
    navigateTo: screenNames.INTRODUCTION_SCREEN,
    payload: {
        params: payload
    }
});
export const gotoCCAContinueAssessment = payload => ({
    type: CcaActions.GO_TO_SCREEN,
    navigateTo: screenNames.CONTINUE_ASSESSMENT,
    payload: {
        params: payload
    }
});
export const gotoCCASplashScreen = payload => ({
    type: CcaActions.GO_TO_SCREEN,
    navigateTo: screenNames.SPLASH_SCREEN,
    payload: {
        params: payload
    }
});
export const gotoCCABasicInfoScreen = payload => ({
    type: CcaActions.GO_TO_SCREEN,
    navigateTo: screenNames.BASIC_INFORMATION,
    payload: {
        params: payload
    }
});
export const gotoCCAQuestionScreen = payload => ({
    type: CcaActions.GO_TO_SCREEN,
    navigateTo: screenNames.QUESTION_SCREEN,
    payload: {
        params: payload
    }
});
export const gotoCCACompletionScreen = payload => ({
    type: CcaActions.GO_TO_SCREEN,
    navigateTo: screenNames.COMPLETION_SCREEN,
    payload: {
        params: payload
    }
});

export const gotoCCAAssessmentResult = payload => ({
    type: CcaActions.GO_TO_SCREEN,
    navigateTo: screenNames.ASSESSMENT_RESULT,
    payload: {
        params: payload
    }
});

export const gotoCCAAssessmentDetail = payload => ({
    type: CcaActions.GO_TO_SCREEN,
    navigateTo: screenNames.ASSESSMENT_DETAIL,
    payload: {
        params: payload
    }
});

export const gotoCCAAssessmentHistory = payload => ({
    type: CcaActions.GO_TO_SCREEN,
    navigateTo: screenNames.ASSESSMENT_HISTORY,
    payload: {
        params: payload
    }
});

export const updatePulseProfile = payload => ({
    context: pageKeys.PROFILE,
    type: CoreActionTypes.UPDATE_PROFILE_DETAILS,
    payload: {
        userProfile: payload,
    }
});

export const babylonBirthDate = payload => ({
    type: CoreActionTypes.BABYLON_PICKED_DOBDATE,
    payload: payload
});



export const getAssessmentStatusAndHistory = payload => ({
    context: screenNames.CCA_JOURNEY,
    type: CcaActions.GET_ASSESSMENT_STATUS_AND_HISTORY,
    payload: payload
});

export const getBasicInformation = payload => ({
    context: screenNames.BASIC_INFORMATION,
    type: CcaActions.GET_BASIC_INFORMATION,
    payload: payload
});

export const saveBasicInformation = payload => ({
    context: screenNames.BASIC_INFORMATION,
    type: CcaActions.SAVE_BASIC_INFORMATION,
    payload: payload
});

export const updateAssessment = payload => ({
    context: screenNames.QUESTION_SCREEN,
    type: CcaActions.UPDATE_ASSESSMENT,
    payload: payload
});

export const abortAssessment = payload => ({
    context: screenNames.CONTINUE_ASSESSMENT,
    type: CcaActions.ABORT_ASSESSMENT,
    payload: payload
});

export const getAssessmentResult = payload => ({
    context: screenNames.ASSESSMENT_RESULT,
    type: CcaActions.GET_ASSESSMENT_RESULT,
    payload: payload
});

export const getAssessmentDetail = payload => ({
    context: screenNames.ASSESSMENT_DETAIL,
    type: CcaActions.GET_ASSESSMENT_DETAIL,
    payload: payload
});

