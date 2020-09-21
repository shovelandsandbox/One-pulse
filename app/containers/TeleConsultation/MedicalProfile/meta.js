import { CoreConfig, metaHelpers, CoreConstants } from "@pru-rt-internal/pulse-common";
const {
    TALKTOADOCTOR
} = CoreConfig;

const findElement = metaHelpers.findElement;
const findCommon = metaHelpers.findCommon;
const findErrorMessage = metaHelpers.findErrorMessage;
const findCommonErrorMessages = metaHelpers.findCommonErrorMessages;
const findBackendErrorMessage = metaHelpers.findBackendErrorMessage;
const findBackendErrorMessageByScreen = metaHelpers.findBackendErrorMessageByScreen;

const {
    MED_PROFILE_TITLE,
    MED_PROFILE_ALLERGIES,
    MED_PROFILE_NO_ALLERGIES,
    MED_PROFILE_MED_CONDITIONS,
    MED_PROFILE_NO_MED_CONDITIONS,
    MED_PROFILE_MEDICATIONS,
    MED_PROFILE_NO_MEDICATIONS,
    MED_PROFILE_EMERGENCY_CONTACT,
    MED_PROFILE_EMERGENCY_CONTACT_NUMBER,
    MED_PROFILE_PROCEED,
    MED_PROFILE_ENTER_VALID_PHONE,
    MED_PROFILE_ENTER_VALID_NAME,
    MED_PROFILE_ENTER_DIFF_NUMBER_THAN,
    MED_PROFILE_EMERGENCY_CONTACT_NAME_PLACEHOLDER
} = CoreConstants;

const initializeScreenMeta = () => {
    const medProfileTitleLabel = findElement(TALKTOADOCTOR, MED_PROFILE_TITLE).label;
    const medProfileAllergiesLabel = findElement(TALKTOADOCTOR, MED_PROFILE_ALLERGIES).label;
    const medProfileNoAllergiesLabel = findElement(TALKTOADOCTOR, MED_PROFILE_NO_ALLERGIES).label;
    const medProfileMedConditionsLabel = findElement(TALKTOADOCTOR, MED_PROFILE_MED_CONDITIONS).label;
    const medProfileNoMedConditionsLabel = findElement(TALKTOADOCTOR, MED_PROFILE_NO_MED_CONDITIONS).label;
    const medProfileMedicationsLabel = findElement(TALKTOADOCTOR, MED_PROFILE_MEDICATIONS).label;
    const medProfileNoMedicationsLabel = findElement(TALKTOADOCTOR, MED_PROFILE_NO_MEDICATIONS).label;
    const medProfileEmergencyContactLabel = findElement(TALKTOADOCTOR, MED_PROFILE_EMERGENCY_CONTACT).label;
    const medProfileEmergencyContactNumberLabel = findElement(TALKTOADOCTOR, MED_PROFILE_EMERGENCY_CONTACT_NUMBER).label;
    const medProfileProceedLabel = findElement(TALKTOADOCTOR, MED_PROFILE_PROCEED).label;
    const medProfileEnterValidPhoneLabel = findElement(TALKTOADOCTOR, MED_PROFILE_ENTER_VALID_PHONE).label;
    const medProfileEnterValidNameLabel = findElement(TALKTOADOCTOR, MED_PROFILE_ENTER_VALID_NAME).label;
    const medProfileEnterNumberDiffThanProfileLabel = findElement(TALKTOADOCTOR, MED_PROFILE_ENTER_DIFF_NUMBER_THAN).label;
    const medProfileEmergencyContactNamePlaceLabel = findElement(TALKTOADOCTOR, MED_PROFILE_EMERGENCY_CONTACT_NAME_PLACEHOLDER).label;
    return {
        medProfileTitleLabel,
        medProfileAllergiesLabel,
        medProfileNoAllergiesLabel,
        medProfileMedConditionsLabel,
        medProfileNoMedConditionsLabel,
        medProfileMedicationsLabel,
        medProfileNoMedicationsLabel,
        medProfileEmergencyContactLabel,
        medProfileEmergencyContactNumberLabel,
        medProfileProceedLabel,
        medProfileEnterValidPhoneLabel,
        medProfileEnterValidNameLabel,
        medProfileEnterNumberDiffThanProfileLabel,
        medProfileEmergencyContactNamePlaceLabel
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