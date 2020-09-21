
import { screenNames } from "../screenNames"
import * as CcaActions from "../actionNames"
import { buildPayload } from "../../../../utils/apiUtils";
import { CoreActionTypes, CoreConfig, metaHelpers as helpers, } from "@pru-rt-internal/pulse-common";
const {
    CCA_CHINESE_ASSESSMENT
} = CoreConfig;

const fetchLabel = (value, defaultValue) =>
    value ? value.label : defaultValue;

const ccaApiCall = {
    [screenNames.CCA_JOURNEY]: {
        [CcaActions.GET_ASSESSMENT_STATUS_AND_HISTORY]: {
            payloadBuilder: (store, action) => {
                let state = store.getState()
                let LanguageLabel = state.userPreferences.language
                let lang = fetchLabel(
                    helpers.findElement(CCA_CHINESE_ASSESSMENT, LanguageLabel),
                    LanguageLabel
                )
                return buildPayload(store, "getCustomerAssessmentGroup", null, null, {
                    id: action.payload.memberUuid,
                    realm: "cca",
                    lang: lang,
                });
            },
            loader: true
        },
    },

    [screenNames.BASIC_INFORMATION]: {
        [CcaActions.GET_BASIC_INFORMATION]: {
            payloadBuilder: (store, action) => {
                let state = store.getState()
                let LanguageLabel = state.userPreferences.language
                let lang = fetchLabel(
                    helpers.findElement(CCA_CHINESE_ASSESSMENT, LanguageLabel),
                    LanguageLabel
                )
                return buildPayload(store, "getCustomerAssessment", null, null, {
                    id: action.payload.memberUuid,
                    realm: "cca",
                    lang: lang,
                });
            },
            loader: true
        },

        [CcaActions.SAVE_BASIC_INFORMATION]: {
            payloadBuilder: (store, action) => {
                let state = store.getState()
                let LanguageLabel = state.userPreferences.language
                let lang = fetchLabel(
                    helpers.findElement(CCA_CHINESE_ASSESSMENT, LanguageLabel),
                    LanguageLabel
                )
                const body = action.payload.basicInfoPayload
                return buildPayload(store, "createCustomerAssessmentGroup", null, body, {
                    id: action.payload.memberUuid,
                    realm: "cca",
                    lang: lang,
                });
            },
            loader: true
        },
    },

    [screenNames.QUESTION_SCREEN]: {
        [CcaActions.UPDATE_ASSESSMENT]: {
            payloadBuilder: (store, action) => {
                let state = store.getState()
                let LanguageLabel = state.userPreferences.language
                let lang = fetchLabel(
                    helpers.findElement(CCA_CHINESE_ASSESSMENT, LanguageLabel),
                    LanguageLabel
                )
                const body = action.payload.questionPayload ? action.payload.questionPayload : null
                return buildPayload(store, "updateCustomerAssessment", null, body, {
                    id: action.payload.memberUuid,
                    realm: "cca",
                    lang: lang,
                    recordId: action.payload.assessmentId
                });
            },
            loader: true
        },
    },

    [screenNames.CONTINUE_ASSESSMENT]: {
        [CcaActions.ABORT_ASSESSMENT]: {
            payloadBuilder: (store, action) => {
                let state = store.getState()
                let LanguageLabel = state.userPreferences.language
                let lang = fetchLabel(
                    helpers.findElement(CCA_CHINESE_ASSESSMENT, LanguageLabel),
                    LanguageLabel
                )
                return buildPayload(store, "abortCustomerAssessment", null, null, {
                    id: action.payload.memberUuid,
                    realm: "cca",
                    lang: lang,
                    recordId: action.payload.assessmentId
                });
            },
            loader: true
        },
    },

    [screenNames.ASSESSMENT_RESULT]: {
        [CcaActions.GET_ASSESSMENT_RESULT]: {
            payloadBuilder: (store, action) => {
                let state = store.getState()
                let LanguageLabel = state.userPreferences.language
                let lang = fetchLabel(
                    helpers.findElement(CCA_CHINESE_ASSESSMENT, LanguageLabel),
                    LanguageLabel
                )
                return buildPayload(store, "getAssessmentResult", null, null, {
                    id: action.payload.memberUuid,
                    realm: "cca",
                    lang: lang,
                    recordId: action.payload.assessmentId
                });
            },
            loader: true
        },
    },

    [screenNames.ASSESSMENT_DETAIL]: {
        [CcaActions.GET_ASSESSMENT_DETAIL]: {
            payloadBuilder: (store, action) => {
                let state = store.getState()
                let LanguageLabel = state.userPreferences.language
                let lang = fetchLabel(
                    helpers.findElement(CCA_CHINESE_ASSESSMENT, LanguageLabel),
                    LanguageLabel
                )
                return buildPayload(store, "getAssessmentDetails", null, null, {
                    id: action.payload.memberUuid,
                    realm: "cca",
                    lang: lang,
                    recordId: action.payload.assessId
                });
            },
            loader: true
        },
    },
}

export default ccaApiCall;


