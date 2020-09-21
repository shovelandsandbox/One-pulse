import { metaHelpers, CoreConfig } from "@pru-rt-internal/pulse-common";
const findElement = screenId => labelName => 
        metaHelpers.findElement(screenId, labelName) || { label: labelName, termsList: [...terms] };
const terms = [
    "Avail one time Free teleconsultation benefit from our board certified doctors",
    "Get e-prescriptions, recommendations and referrals from doctor"
];
const findCommon = metaHelpers.findCommon;
const findErrorMessage = metaHelpers.findErrorMessage;
const findCommonErrorMessages = metaHelpers.findCommonErrorMessages;
const findBackendErrorMessage = metaHelpers.findBackendErrorMessage;
const findBackendErrorMessageByScreen = metaHelpers.findBackendErrorMessageByScreen;
const screenId = "MyDocWizardRegn";
const fetchLabel = findElement(screenId);
const {
  NEW_PRPFILE,
  NEW_PRPFILE_ADDRESS,
} = CoreConfig;

const initializeScreenMeta = () => {
    const mydocWizTitle = fetchLabel("mydocWizardRegnTitle").label;
    const offerDescription = fetchLabel("mydocWizardOfferDesc").label;
    const offerTerms = fetchLabel("mydocWizardOfferTerms").termsList;
    const mydocWizContinue = fetchLabel("mydocWizContinue").label;
    const phoneNumber = fetchLabel("phoneNumber").label;
    const nric = fetchLabel("nric").label;
    const yourGender = fetchLabel("yourGender").label;
    const yourdob = fetchLabel("yourdob").label;
    const female = fetchLabel("female").label;
    const male = fetchLabel("male").label;
    const error = fetchLabel("error").label;
    const fillFields = fetchLabel("fillFields").label;
    const address = findElement(NEW_PRPFILE)(NEW_PRPFILE_ADDRESS).label;

    return {
        address,
        mydocWizTitle,
        offerDescription,
        offerTerms,
        mydocWizContinue,
        phoneNumber,
        nric,
        yourGender,
        yourdob,
        female,
        male,
        error,
        fillFields
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