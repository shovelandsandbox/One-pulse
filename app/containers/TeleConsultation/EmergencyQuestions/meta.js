import { CoreConfig, metaHelpers, CoreConstants } from "@pru-rt-internal/pulse-common";
const {
    TALKTOADOCTOR
} = CoreConfig;

const {
    PRECON_QUESTION_CHOKING,
    PRECON_QUESTION_BREATH,
    PRECON_QUESTION_CHESTPAIN,
    PRECON_QUESTION_WEAKNESS,
    PRECON_QUESTION_SPEECH,
    PRECON_QUESTION_CONSCIOUSNES,
    PRECON_QUESTION_SUICIDAL,
    PRECON_QUESTION_SEIZURES,
    PRECON_QUESTION_BLEEDING,
    PRECON_QUESTION_SEVEREPAIN,
    PRECON_QUESTION_HALLUCINATION,
    PRECON_QUESTION_BROKENBONES,
    PRECON_QUESTION_MYDOC_REQUESTSENT,
    PRECON_QUESTION_APPOINT_CONF,
    PRECON_QUESTION_DOCS_PREPPED,
    PRECON_YES,
    PRECON_NONE_OF_ABOVE,
    PRECON_OK,
    PRECON_COMPLETE_MEDICAL_PROFILE,
    PRECON_SELECT_ANSWER,
    FSM_DOCTOR_ALERT,
} = CoreConstants;

const findElement = metaHelpers.findElement;
const findCommon = metaHelpers.findCommon;
const findErrorMessage = metaHelpers.findErrorMessage;
const findCommonErrorMessages = metaHelpers.findCommonErrorMessages;
const findBackendErrorMessage = metaHelpers.findBackendErrorMessage;
const findBackendErrorMessageByScreen = metaHelpers.findBackendErrorMessageByScreen;

const initializeScreenMeta = () => {
    const preConQuestionChokingLabel = findElement(TALKTOADOCTOR, PRECON_QUESTION_CHOKING).label;
    const preConQuestionBreathingLabel = findElement(TALKTOADOCTOR, PRECON_QUESTION_BREATH).label;
    const preConQuestionChestPainLabel = findElement(TALKTOADOCTOR, PRECON_QUESTION_CHESTPAIN).label;
    const preConQuestionWeaknessLabel = findElement(TALKTOADOCTOR, PRECON_QUESTION_WEAKNESS).label;
    const preConQuestionSpeechDifficultyLabel = findElement(TALKTOADOCTOR, PRECON_QUESTION_SPEECH).label;
    const preConQuestionConsciousnessLossLabel = findElement(TALKTOADOCTOR, PRECON_QUESTION_CONSCIOUSNES).label;
    const preConQuestionSuicidalLabel = findElement(TALKTOADOCTOR, PRECON_QUESTION_SUICIDAL).label;
    const preConQuestionSeizuresLabel = findElement(TALKTOADOCTOR, PRECON_QUESTION_SEIZURES).label;
    const preConQuestionBleedingLabel = findElement(TALKTOADOCTOR, PRECON_QUESTION_BLEEDING).label;
    const preConQuestionSeverePainLabel = findElement(TALKTOADOCTOR, PRECON_QUESTION_SEVEREPAIN).label;
    const preConQuestionHallucinationsLabel = findElement(TALKTOADOCTOR, PRECON_QUESTION_HALLUCINATION).label;
    const preConQuestionBrokenBonesLabel = findElement(TALKTOADOCTOR, PRECON_QUESTION_BROKENBONES).label;
    const preConQuestionMyDocRequestSent = findElement(TALKTOADOCTOR, PRECON_QUESTION_MYDOC_REQUESTSENT).label;
    const preConQuestionAppointmentConfirmed = findElement(TALKTOADOCTOR, PRECON_QUESTION_APPOINT_CONF).label;
    const preConQuestionDocsPrepped  = findElement(TALKTOADOCTOR, PRECON_QUESTION_DOCS_PREPPED).label;

    const yesLabel = findElement(TALKTOADOCTOR, PRECON_YES).label;
    const noneOfTheAboveLabel = findElement(TALKTOADOCTOR, PRECON_NONE_OF_ABOVE).label;
    const preConOkayLabel = findElement(TALKTOADOCTOR, PRECON_OK).label;
    const preConCompleteMedicalProfileLabel = findElement(TALKTOADOCTOR, PRECON_COMPLETE_MEDICAL_PROFILE).label;
    const preConSelectAnswerLabel = findElement(TALKTOADOCTOR, PRECON_SELECT_ANSWER).label;
    const preConAlertLabel = findElement(TALKTOADOCTOR, FSM_DOCTOR_ALERT).label;

    return {
        preConQuestionChokingLabel,
        preConQuestionBreathingLabel,
        preConQuestionChestPainLabel,
        preConQuestionWeaknessLabel,
        preConQuestionSpeechDifficultyLabel,
        preConQuestionConsciousnessLossLabel,
        preConQuestionSuicidalLabel,
        preConQuestionSeizuresLabel,
        preConQuestionBleedingLabel,
        preConQuestionSeverePainLabel,
        preConQuestionHallucinationsLabel,
        preConQuestionBrokenBonesLabel,
        preConQuestionMyDocRequestSent,
        preConQuestionAppointmentConfirmed,
        preConQuestionDocsPrepped,
        yesLabel,
        noneOfTheAboveLabel,
        preConOkayLabel,
        preConCompleteMedicalProfileLabel,
        preConSelectAnswerLabel,
        preConAlertLabel,
    }
}

export default MetaConstants = {
    findElement,
    findCommon,
    findErrorMessage,
    findCommonErrorMessages,
    findBackendErrorMessage,
    findBackendErrorMessageByScreen,
    initializeScreenMeta
}