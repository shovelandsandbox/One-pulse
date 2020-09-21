import { CoreConfig, metaHelpers, CoreConstants } from "@pru-rt-internal/pulse-common";

const {
    SCREEN_KEY_TERMS_AND_CONDITIONS,
    COMMON_KEY_TERMS_MY_DOC,
    COMMON_KEY_PRIVACY_MY_DOC,
    TALKADOCTOR,
    CONSULTWITHAQUALIFIED,
    TALKTOADOCTOR_WHENEVER,
    TALKTOADOCTOR_MYDOCAPPEARSONCALL,
    TALKTOADOCTOR_BYCLICKINGAGREEBELOW,
    TALKTOADOCTOR_TC,
    TALKTOADOCTOR_IAGREE,
    SCREEN_KEY_PRIVACY_POLICY,
} = CoreConfig;

const {
    findScreen,
    findCommon,
    findElement,
    findErrorMessage,
    findCommonErrorMessages,
    findBackendErrorMessage,
    findBackendErrorMessageByScreen,
    findElementWithScreen
} = metaHelpers;

const {
    TALKTOADOCTOR,
    SCREEN_KEY_DOC_ON_CALL_WELCOME,
    TALKTOADOCTOR_TO_USE_MYDOC_SERVICES
} = CoreConstants;

const initializeScreenMeta = () => {
    const docWelcomeScreen = findScreen(SCREEN_KEY_DOC_ON_CALL_WELCOME);
    const termsMyDoc = findCommon(COMMON_KEY_TERMS_MY_DOC).label;
    const privacyPolicyMyDoc = findCommon(COMMON_KEY_PRIVACY_MY_DOC).label;
    const title = findScreen(SCREEN_KEY_TERMS_AND_CONDITIONS).label;
    const privacyTitle = findScreen(SCREEN_KEY_PRIVACY_POLICY).label;
    const talkToDoctorLabel = findElement(TALKTOADOCTOR, TALKADOCTOR).label;
    const consultWithQualifiedLabel = findElement(TALKTOADOCTOR, CONSULTWITHAQUALIFIED).label;
    const whenEverLabel = findElement(TALKTOADOCTOR, TALKTOADOCTOR_WHENEVER).label;
    const appearsOnCall = findElement(TALKTOADOCTOR, TALKTOADOCTOR_MYDOCAPPEARSONCALL).label;
    const byClickingAgreeBelow = findElement(TALKTOADOCTOR, TALKTOADOCTOR_BYCLICKINGAGREEBELOW).label;
    const andLabel = findElementWithScreen(docWelcomeScreen, "and").label;
    const privacyPolicyLabel = findElementWithScreen(docWelcomeScreen, "privacyPolicy").label;
    const talkToDoctorTC = findElement(TALKTOADOCTOR, TALKTOADOCTOR_TC).label;
    const toUseMyDocServices = findElement(TALKTOADOCTOR, TALKTOADOCTOR_TO_USE_MYDOC_SERVICES).label;
    const iAgreeContinue = findElement(TALKTOADOCTOR, TALKTOADOCTOR_IAGREE).label;
    return {
        talkToDoctorLabel,
        consultWithQualifiedLabel,
        whenEverLabel,
        appearsOnCall,
        byClickingAgreeBelow,
        termsMyDoc,
        title,
        talkToDoctorTC,
        andLabel,
        privacyPolicyMyDoc,
        privacyTitle,
        privacyPolicyLabel,
        toUseMyDocServices,
        iAgreeContinue
    };
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
