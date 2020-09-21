import { CoreConfig, metaHelpers, CoreConstants } from "@pru-rt-internal/pulse-common";
const {
    TALKTOADOCTOR,
    PRECON_MY_DOC_CONSENT,
    SCREEN_KEY_DOC_ON_CALL_REGISTER
} = CoreConfig;
const terms = [
    "Avail one time Free teleconsultation benefit from our board certified doctors",
    "Get e-prescriptions, recommendations and referrals from doctor"
];
const findElement = screenId => labelName => 
        metaHelpers.findElement(screenId, labelName) || { label: labelName, termsList: [...terms] };
const findCommon = metaHelpers.findCommon;
const findErrorMessage = metaHelpers.findErrorMessage;
const findCommonErrorMessages = metaHelpers.findCommonErrorMessages;
const findBackendErrorMessage = metaHelpers.findBackendErrorMessage;
const findBackendErrorMessageByScreen = metaHelpers.findBackendErrorMessageByScreen;
const screenId = "MyDocWizardRegn";
const fetchLabel = findElement(screenId);

const initializeScreenMeta = () => {
    const mydocWizTitle = fetchLabel("mydocWizardRegnTitle").label;
    const offerDescription = fetchLabel("mydocWizardOfferDesc").label;
    const offerTerms = fetchLabel("mydocWizardOfferTerms").termsList;
    const userDetailTitle = fetchLabel("userDetailTitle").label;
    const preConMydocConsent = metaHelpers.findElement(TALKTOADOCTOR, PRECON_MY_DOC_CONSENT).label;
    const docRegisterScreen = metaHelpers.findScreen(SCREEN_KEY_DOC_ON_CALL_REGISTER);
    const otpHeader = metaHelpers.findElementWithScreen(docRegisterScreen, "docRegisterPageOtp").label;
    const activateMyFreeVoucher = fetchLabel("mydocWizardActivateFreeVoucher").label;
    const skipDontNeedFreeVoucher = fetchLabel("mydocWizardIgnoreOffer").label;
    const mydocWizIdNumberLabel = fetchLabel("mydocWizIdNumberLabel").label;
    const mydocWizFirstNameLabel = fetchLabel("mydocWizFirstNameLabel").label;
    const mydocWizLastNameLabel = fetchLabel("mydocWizLastNameLabel").label;
    const mydocWizDateOfBirthLabel = fetchLabel("mydocWizDateOfBirthLabel").label;
    const mydocWizGenderLabel = fetchLabel("mydocWizGenderLabel").label;
    const mydocWizAddressLabel = fetchLabel("mydocWizAddressLabel").label;
    const mydocWizEmailLabel = fetchLabel("mydocWizEmailLabel").label;
    const mydocWizPhoneNumberLabel = fetchLabel("mydocWizPhoneNumberLabel").label;

    return {
        mydocWizTitle,
        offerDescription,
        offerTerms,
        preConMydocConsent,
        userDetailTitle,
        otpHeader,
        activateMyFreeVoucher,
        skipDontNeedFreeVoucher,
        mydocWizIdNumberLabel,
        mydocWizFirstNameLabel,
        mydocWizLastNameLabel,
        mydocWizDateOfBirthLabel,
        mydocWizGenderLabel,
        mydocWizEmailLabel,
        mydocWizPhoneNumberLabel,
        mydocWizAddressLabel
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