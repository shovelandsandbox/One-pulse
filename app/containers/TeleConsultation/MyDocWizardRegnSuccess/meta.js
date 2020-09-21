import { metaHelpers } from "@pru-rt-internal/pulse-common";
const findElement = screenId => labelName => 
        metaHelpers.findElement(screenId, labelName) || { label: labelName };
const findCommon = metaHelpers.findCommon;
const findErrorMessage = metaHelpers.findErrorMessage;
const findCommonErrorMessages = metaHelpers.findCommonErrorMessages;
const findBackendErrorMessage = metaHelpers.findBackendErrorMessage;
const findBackendErrorMessageByScreen = metaHelpers.findBackendErrorMessageByScreen;
const screenId = "MyDocWizardRegn";
const fetchLabel = findElement(screenId);

const initializeScreenMeta = () => {
    const mydocWizTitle = fetchLabel("mydocWizardRegnTitle").label;
    const mydocWizCongrats = fetchLabel("mydocWizCongrats").label;
    const mydocWizUniqueDesc = fetchLabel("mydocWizUniqueJourneyDesc").label;
    const mydocWizPulseFeatures = fetchLabel("mydocWizPulseFeatures").list;
    const mydocWizPulseFeaturesDesc = fetchLabel("mydocWizEnjoyPulseFeaturesDesc").label;
    const mydocWizComingMore = fetchLabel("mydocWizPulseFeatureComingMore").label;
    const mydocWizContinue = fetchLabel("mydocWizContinue").label;
    return {
        mydocWizTitle,
        mydocWizCongrats,
        mydocWizUniqueDesc,
        mydocWizPulseFeatures,
        mydocWizPulseFeaturesDesc,
        mydocWizComingMore,
        mydocWizContinue,
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