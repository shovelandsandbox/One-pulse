import * as actions from "./config/actionNames";

import { CoreActionTypes, CoreConfig } from "@pru-rt-internal/pulse-common";

const { pageKeys } = CoreConfig;

const setCoronaSpecializationDetails = (id, type, image) => ({
    type: actions.SET_SELECTED_SPECIALIZATION_CATEGORY,
    payload: {
        id,
        type,
        image,
    },
});

const gotoDocCovidSpecializationScreen = (coronaRiskFactor, category) => ({
    type: "GO_TO_SCREEN",
    navigateTo: pageKeys.HALODOC_DOCTORLIST,
    payload: {
        params: { coronaRiskFactor, category },
    },
})
const setCovidAssessmentDetails = (coronaRiskFactor, category) => ({
    type: actions.SET_COVID_ASSESSMENT_DETAILS,
    payload: {
        coronaRiskFactor,
        category,
    },
});
const resetCovidAssessmentDetails = () => ({
    type: actions.RESET_COVID_ASSESSMENT_DETAILS,
    payload: {
        coronaRiskFactor: null,
        category: null,
    },
});
const pressConsultDoctor = () => ({
    context: pageKeys.GET_TREATMENT,
    type: CoreActionTypes.GO_TO_HALODOC_SERVICE,
});
const sendFireBaseToken = fcmToken => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.UPDATE_CUSTOMER_DEVICE_1,
    payload: {
        fcmToken,
    },
});

export {
    setCoronaSpecializationDetails,
    gotoDocCovidSpecializationScreen,
    setCovidAssessmentDetails,
    resetCovidAssessmentDetails,
    pressConsultDoctor,
    sendFireBaseToken
}