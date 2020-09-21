import { screenNames } from "../screenNames"
import * as HalodocActions from "../actionNames"

import { CoreUtils, CoreConfig, CoreActionTypes, CoreConstants } from "@pru-rt-internal/pulse-common";
const { getPayloadForNavigation } = CoreUtils;
const { pageKeys } = CoreConfig
import { path } from "ramda";

const {
    ConsultationStatus,
    RegistrationStatus,
    CONSULTATION_TIME_OUT_VALUE
} = CoreConstants;


const HaloDocServiceCallHandler = ({ store, action }) => {
    const state = store.getState();
    if (action.payload.Type === 'consultation_approved') {
        store.dispatch({
            context: screenNames.HALODOC,
            type: HalodocActions.GET_CONSULTATION_STATUS,
            payload: {
                toggleLoader: false,
            },
        });
        return getPayloadForNavigation(
            action,
            pageKeys.MAIN_TAB,
            {
                ...action.payload,
            }
        );
    }
    if (action.payload.Type === 'consultation_rejected') {
        return getPayloadForNavigation(
            action,
            screenNames.HALODOC_SPECIALIZATIONS,
            {
                ...action.payload,
            }
        );
    }
    if (action.payload.Type === 'consultation_missed') {
        return getPayloadForNavigation(
            action,
            screenNames.HALODOC_SPECIALIZATIONS,
            {
                ...action.payload,
            }
        );
    }
    if (action.payload.Type === 'application/hd.consulation.complete' ||
        action.payload.Type === 'consultation_completed') {
        store.dispatch({
            type: HalodocActions.RESET_CONSULTATION_ID,
        });
        return getPayloadForNavigation(
            action,
            pageKeys.MAIN_TAB,
            {
                ...action.payload,
            }
        );
    }
    if (action.payload.Type === 'application/hd.consultation.call_start') {
        console.log('...action.payload', action.payload)
        // if (action.payload.Type === 'text') {
        return getPayloadForNavigation(
            action,
            screenNames.HALODOC_CONSULTATION,
            {
                ...action.payload,
                showJoinCall: true,
            }
        );
    }
    if (action.payload.Type === 'application/hd.consultation.call_end') {
        return getPayloadForNavigation(
            action,
            screenNames.HALODOC_CONSULTATION,
            {
                ...action.payload,
                showJoinCall: false,
            }
        );
    }
    if ((action.payload.Type === 'text' || action.payload.Type === 'file_attachment')
        && !(state.appNavigation.currentPage === screenNames.HALODOC_VIDEO_CALL ||
            state.appNavigation.currentPage === screenNames.HALODOC_VOICE_CALL)) {
        store.dispatch({
            type: HalodocActions.HALODOC_LOAD_CHAT_MESSAGES,
            context: screenNames.HALODOC_CONSULTATION,
            payload: {
                type: HalodocActions.HALODOC_LOAD_CHAT_MESSAGES,
                context: screenNames.HALODOC_CONSULTATION,
                consultationId: action.payload.appointmentId,
                toggleLoader: false
            }
        })
        return getPayloadForNavigation(
            action,
            screenNames.HALODOC_CONSULTATION,
            {
                ...action.payload
            }
        );
    }
    if (action.payload.Type === 'application/hd.consultation.doctor.followup'
        || action.payload.Type === 'application/hd.consultation.doctor.referral'
        || action.payload.Type === 'application/hd.consultation.epres'
        || action.payload.Type === 'application/hd.consultation.dn') {
        return getPayloadForNavigation(
            action,
            screenNames.ALL_MY_FILES,
            {
                ...action.payload,
            }
        );
    }
    if (action.payload.Type === "consultation_payment_success") {
        let state = store.getState();
        const docObject = path(["haloDocServices", "docObject"], state);
        return getPayloadForNavigation(
            action,
            screenNames.HALODOC_PATIENT_WAITING,
            {
                ...action.payload,
                docObject
            }
        );
    }
    if (action.payload.Type === "consultation_payment_failure"
        || action.payload.Type === "consultation_refund_initiated") {
        return getPayloadForNavigation(
            action,
            screenNames.HALODOC_DOCTORLIST,
            {
                ...action.payload,
            }
        );
    }
    if (action.payload.type === undefined) {
        if (
            (action.payload.appointmentStatus === "accept" ||
                action.payload.appointmentStatus === "joined")
        ) {
            return getPayloadForNavigation(
                action,
                pageKeys.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS,
                null
            );
        }
    }
    return null;
};


//HaloDocServiceHandler
const isConsultationInProgress = state => {
    const { lastRequestTimestamp, consultationStatus } = state.haloDocServices;
    const isRequestTimedOut =
        CONSULTATION_TIME_OUT_VALUE > new Date() - new Date(lastRequestTimestamp);
    return (
        consultationStatus === ConsultationStatus.REQUESTED && isRequestTimedOut
    );
};


const HaloDocServiceHandler = ({ store, action }) => {
    const state = store.getState();
    //Check if consent is given for action or not
    console.log('inside state.auth.docServiceToken', state.auth.docServiceToken)
    console.log('state.auth.haloDocUserId ', state.auth.haloDocUserId)
    const DOCTncConsent =
        state.haloDocServices.registrationStatus >=
        RegistrationStatus.TNC_ACCEPTED || state.auth.haloDocUserId != null;
    const params = {
        navAndResetStack: false,
    };
    let navigateTo = screenNames.HALODOC_SPECIALIZATIONS;
    //doctorToken is available then the user is registered
    if (
        isConsultationInProgress(state) &&
        state.haloDocServices.callType === ConsultationType.VIDEO_CHAT
    ) {
        console.log('if', state.auth.docServiceToken)
        // navigateTo = screenNames.DOC_SERVICE_CONSULTATION;
        navigateTo = screenNames.HALODOC_SPECIALIZATIONS;
    } else if (state.auth.docServiceToken) {
        console.log('inside state.auth.docServiceToken', state.auth.docServiceToken)
        navigateTo = screenNames.HALODOC_SPECIALIZATIONS;
        state.haloDocServices.consultationStatus = ConsultationStatus.INIT;
    }
    if (DOCTncConsent) {
        if (
            (state.haloDocServices.registrationStatus ===
                RegistrationStatus.REGISTERED ||
                state.auth.haloDocUserId != null) &&
            state.haloDocServices.coronaAssessment &&
            state.haloDocServices.coronaAssessment.coronaRiskFactor &&
            state.haloDocServices.coronaAssessment.category
        ) {
            navigateTo = screenNames.HALODOC_DOCTORLIST;
        } else if (
            state.haloDocServices.registrationStatus ===
            RegistrationStatus.REGISTERED ||
            state.auth.haloDocUserId != null
        ) {
            navigateTo = pageKeys.MAIN_TAB;
            store.dispatch({
                type: HalodocActions.RESET_CONSULTATION,
            });
            store.dispatch({
                context: screenNames.HALODOC,
                type: HalodocActions.GET_CONSULTATION_STATUS,
                payload: {
                    toggleLoader: true,
                },
            });
        } else {
            navigateTo = screenNames.HALODOC_PATIENT_REGISTRATION;
        }
    } else {
        navigateTo = screenNames.HALODOC_SERVICE_INTRO;
    }
    return getPayloadForNavigation(action, navigateTo, params);

}

const navigateToDoctorListPage = ({ action }) => {
    return getPayloadForNavigation(action, screenNames.HALODOC_DOCTORLIST, null);
}

const navigateToPaymentWebview = ({ action }) => {
    return getPayloadForNavigation(
        action,
        screenNames.HALODOC_CONSULTATION_PAYMENT_WEBVIEW_SCREEN,
        null
    );
}

const navigateToTeleconsultationWaitingScreen = ({ action }) => {
    return getPayloadForNavigation(
        action,
        screenNames.HALODOC_PATIENT_WAITING,
        action.payload
    );
}

const HaloDocServiceRegisterSuccess = ({ store, action }) => {
    const state = store.getState();
    if (
        state.haloDocServices.coronaAssessment &&
        state.haloDocServices.coronaAssessment.coronaRiskFactor &&
        state.haloDocServices.coronaAssessment.category
    ) {
        return getPayloadForNavigation(action, screenNames.HALODOC_DOCTORLIST, null);
    } else {
        return getPayloadForNavigation(
            action,
            screenNames.HALODOC_SPECIALIZATIONS,
            null
        );
    }
};



const haloDocFsmConfig = {
    [screenNames.HALODOC]: {
        [HalodocActions.GO_TO_HALODOC_SERVICE]: HaloDocServiceHandler
    },

    [screenNames.HALODOC_SERVICE_INTRO]: {
        [HalodocActions.DOC_SERVICE_TNC_ACCEPTED]: ({ action }) => {
            const navigateTo = screenNames.HALODOC_PATIENT_REGISTRATION;
            return getPayloadForNavigation(action, navigateTo, null);
        },
    },

    [screenNames.NAVIGATE_TELECONSULTATION_PAYMENT_ACTIONS]: {
        [HalodocActions.NAVIGATE_BACK_ON_PAYMENT_FAILURE]: navigateToDoctorListPage,
        [HalodocActions.NAVIGATE_TELECONSULTATION_PAYMENT_WEBVIEW]: navigateToPaymentWebview,
        [HalodocActions.NAVIGATE_TELECONSULTATION_WAITING_SCREEN]: navigateToTeleconsultationWaitingScreen,
    },
    [screenNames.HALODOC_PATIENT_REGISTRATION]: {
        [HalodocActions.DOC_SERVICE_REGISTER_PATIENT_SUCCESS]: HaloDocServiceRegisterSuccess,
    },

    [screenNames.FOREGROUND]: {
        [HalodocActions.DOC_SERVICE_DOCTOR_AVAILABILITY_STATUS]: HaloDocServiceCallHandler,
        [HalodocActions.HALODOC_CHAT_LOAD_DOC_MESSAGE]: HaloDocServiceCallHandler,
        [HalodocActions.TELECONSULTATION_PAYMENT_SUCCESS_NOTIFICATION_HANDLER]: HaloDocServiceCallHandler,
        [HalodocActions.TELECONSULTATION_PAYMENT_FAILUE_NOTIFICATION_HANDLER]: HaloDocServiceCallHandler,
        [HalodocActions.TELECONSULTATION_PAYMENT_REFUND_NOTIFICATION_HANDLER]: HaloDocServiceCallHandler
    },
    [screenNames.BACKGROUND]: {
        [HalodocActions.DOC_SERVICE_DOCTOR_AVAILABILITY_STATUS]: HaloDocServiceCallHandler,
        [HalodocActions.HALODOC_CHAT_LOAD_DOC_MESSAGE]: HaloDocServiceCallHandler,
        [HalodocActions.TELECONSULTATION_PAYMENT_SUCCESS_NOTIFICATION_HANDLER]: HaloDocServiceCallHandler,
        [HalodocActions.TELECONSULTATION_PAYMENT_FAILUE_NOTIFICATION_HANDLER]: HaloDocServiceCallHandler,
        [HalodocActions.TELECONSULTATION_PAYMENT_REFUND_NOTIFICATION_HANDLER]: HaloDocServiceCallHandler
    },
};

export default haloDocFsmConfig;