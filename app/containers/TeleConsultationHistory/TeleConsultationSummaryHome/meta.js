import { CoreConfig, metaHelpers, CoreConstants } from "@pru-rt-internal/pulse-common";
const {
    TALKTOADOCTOR,
} = CoreConfig;

const findElement = metaHelpers.findElement;
const findCommon = metaHelpers.findCommon;
const findErrorMessage = metaHelpers.findErrorMessage;
const findCommonErrorMessages = metaHelpers.findCommonErrorMessages;
const findBackendErrorMessage = metaHelpers.findBackendErrorMessage;
const findBackendErrorMessageByScreen = metaHelpers.findBackendErrorMessageByScreen;

const {
    CONSULTATION_HISTORY_TITLE,
    ALL_MY_FILES,
} = CoreConstants;

const initializeScreenMeta = () => {
    
    const consultationHistoryLabel = metaHelpers.findElement(TALKTOADOCTOR, CONSULTATION_HISTORY_TITLE).label;
    const allMyFilesLabel = metaHelpers.findElement(TALKTOADOCTOR, ALL_MY_FILES).label;
    return { consultationHistoryLabel, allMyFilesLabel };
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