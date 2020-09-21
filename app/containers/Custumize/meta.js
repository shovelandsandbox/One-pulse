import { CoreConfig, metaHelpers, CoreConstants } from "@pru-rt-internal/pulse-common";
const findElement = metaHelpers.findElement;
const findCommon = metaHelpers.findCommon;
const findErrorMessage = metaHelpers.findErrorMessage;
const findCommonErrorMessages = metaHelpers.findCommonErrorMessages;
const findBackendErrorMessage = metaHelpers.findBackendErrorMessage;
const findBackendErrorMessageByScreen = metaHelpers.findBackendErrorMessageByScreen;

const {
    KEY_CAMERA_PERMISSION,
    SCREEN_KEY_MANAGE_PROFILE,
    SCREEN_KEY_CHAT_REPORT,
    CUSTOMISE,
    CUSTOMISE_CUSTOMISEELEMENTS,
    CUSTOMISE_CHECKBMI,
} = CoreConfig;

const KEY_CANCEL = "cancel";
const KEY_OK = "ok";

const initializeScreenMeta = () => {
    const KEY_CAMERA_PERMISSION_LABEL = findElement(SCREEN_KEY_MANAGE_PROFILE, KEY_CAMERA_PERMISSION).label;
    const KEY_OK_LABEL = findElement(SCREEN_KEY_CHAT_REPORT, KEY_OK).label;
    const KEY_CANCEL_LABEL = findElement(SCREEN_KEY_MANAGE_PROFILE, KEY_CANCEL).label;
    const CUSTOMISE_CUSTOMISEELEMENTS_LABEL = findElement(CUSTOMISE, CUSTOMISE_CUSTOMISEELEMENTS).label;
    const CUSTOMISE_CHECKBMI_LABEL = findElement(CUSTOMISE, CUSTOMISE_CHECKBMI).label;
    return {
        KEY_CAMERA_PERMISSION_LABEL,
        KEY_OK_LABEL,
        KEY_CANCEL_LABEL,
        CUSTOMISE_CUSTOMISEELEMENTS_LABEL,
        CUSTOMISE_CHECKBMI_LABEL
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