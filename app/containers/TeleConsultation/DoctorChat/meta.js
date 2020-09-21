import { CoreConfig, metaHelpers, CoreConstants } from "@pru-rt-internal/pulse-common";
const {
    TALKTOADOCTOR,
    KEY_CAMERA_PERMISSION
} = CoreConfig;

const findElement = metaHelpers.findElement;
const findCommon = metaHelpers.findCommon;
const findErrorMessage = metaHelpers.findErrorMessage;
const findCommonErrorMessages = metaHelpers.findCommonErrorMessages;
const findBackendErrorMessage = metaHelpers.findBackendErrorMessage;
const findBackendErrorMessageByScreen = metaHelpers.findBackendErrorMessageByScreen;

const {
    DOCTOR_CHAT_START_TO_CHAT,
    DOCTOR_CHAT_SELECT_PHOTO,
    DOCTOR_CHAT_CAMERA,
    DOCTOR_CHAT_GALLERY,
    SCREEN_KEY_MANAGE_PROFILE
} = CoreConstants;

const initializeScreenMeta = () => {
    
    const doctorChatStartToChatWithLabel = findElement(TALKTOADOCTOR, DOCTOR_CHAT_START_TO_CHAT).label;
    const doctorChatSelectPhotoLabel = findElement(TALKTOADOCTOR, DOCTOR_CHAT_SELECT_PHOTO).label;
    const doctorChatCameraLabel = findElement(TALKTOADOCTOR, DOCTOR_CHAT_CAMERA).label;
    const doctorChatGalleryLabel = findElement(TALKTOADOCTOR, DOCTOR_CHAT_GALLERY).label;
    const cameraPermission = metaHelpers.findElement(SCREEN_KEY_MANAGE_PROFILE, KEY_CAMERA_PERMISSION).label;
    return {
        doctorChatStartToChatWithLabel,
        doctorChatSelectPhotoLabel,
        doctorChatCameraLabel,
        doctorChatGalleryLabel,
        cameraPermission
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