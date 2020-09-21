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
    DOCTOR_KEY, MCR_KEY, NAME_KEY
} = CoreConstants;

const initializeScreenMeta = () => {
    const doctorLabel = findElement(TALKTOADOCTOR, DOCTOR_KEY).label;
    const mcrLabel = findElement(TALKTOADOCTOR, MCR_KEY).label;
    const nameLabel = findElement(TALKTOADOCTOR, NAME_KEY).label;
    return {
      doctorLabel, mcrLabel, nameLabel
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