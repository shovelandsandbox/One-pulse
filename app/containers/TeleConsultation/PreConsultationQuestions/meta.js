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
    PRECON_WE_ARE_SORRY,
    PRECON_BACK_TO_HOME,
    PRECON_CONSUL_REQUEST_SENT,
    PRECON_SUBMIT,
    PRECON_BOOK_APPOINTMENT,
    PRECON_MAKE_SURE_INTERNET,
    PRECON_ONCE_CONSUL_SENT,
    PRECON_AVERAGE_WAIT_TIME,
    PRECON_SWITCH_ON_NOTIFICATION,
    PRECON_MYDOC_HOTLINE,
    PRECON_PLEASE_NOTE,
    PRECON_EMERGENCY_NUMBER,
    PRECON_YES,
    PRECON_NO
} = CoreConstants;

const findElement = metaHelpers.findElement;
const findCommon = metaHelpers.findCommon;
const findErrorMessage = metaHelpers.findErrorMessage;
const findCommonErrorMessages = metaHelpers.findCommonErrorMessages;
const findBackendErrorMessage = metaHelpers.findBackendErrorMessage;
const findBackendErrorMessageByScreen = metaHelpers.findBackendErrorMessageByScreen;
const findElementWithScreen = metaHelpers.findElementWithScreen;
const findScreen = metaHelpers.findScreen;

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
    const preConWeAreSorryLabel = findElement(TALKTOADOCTOR, PRECON_WE_ARE_SORRY).label;
    const preConBackToHomeLabel = findElement(TALKTOADOCTOR, PRECON_BACK_TO_HOME).label;
    const preConConsulRequestSentLabel = findElement(TALKTOADOCTOR, PRECON_CONSUL_REQUEST_SENT).label;
    const preConSubmitLabel = findElement(TALKTOADOCTOR, PRECON_SUBMIT).label;
    const preConBookAppointmentLabel = findElement(TALKTOADOCTOR, PRECON_BOOK_APPOINTMENT).label;
    const preConMakeSureInternetLabel = findElement(TALKTOADOCTOR, PRECON_MAKE_SURE_INTERNET).label;
    const preConOnceConsulSentLabel = findElement(TALKTOADOCTOR, PRECON_ONCE_CONSUL_SENT).label;
    const preConAverageWaitTimeLabel = findElement(TALKTOADOCTOR, PRECON_AVERAGE_WAIT_TIME).label;
    const preConSwitchOnNotificationLabel = findElement(TALKTOADOCTOR, PRECON_SWITCH_ON_NOTIFICATION).label;
    const preConMyDocHotlineLabel = findElement(TALKTOADOCTOR, PRECON_MYDOC_HOTLINE).label;
    const preConPleaseNoteLabel = findElement(TALKTOADOCTOR, PRECON_PLEASE_NOTE).label;
    const preConEmergencyNumberLabel = findElement(TALKTOADOCTOR, PRECON_EMERGENCY_NUMBER).label;
    const yesLabel = findElement(TALKTOADOCTOR, PRECON_YES).label;
    const preConNoLabel = findElement(TALKTOADOCTOR, PRECON_NO).label;

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
        preConWeAreSorryLabel,
        preConBackToHomeLabel,
        preConConsulRequestSentLabel,
        preConSubmitLabel,
        preConBookAppointmentLabel,
        preConMakeSureInternetLabel,
        preConOnceConsulSentLabel,
        preConAverageWaitTimeLabel,
        preConSwitchOnNotificationLabel,
        preConMyDocHotlineLabel,
        preConPleaseNoteLabel,
        preConEmergencyNumberLabel,
        yesLabel,
        preConNoLabel
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