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
    SCREEN_KEY_DOC_ON_CALL_LANDING,
    DOCTOR_CHAT_CALL_ENDED,
    DOCTOR_CHAT_JOIN_CALL
} = CoreConstants;

const TYPE_PERMISSION_LIST_ITEM = "permission";
const KEY_PERM_DESCRIPTION_PART1 = "permissionDescriptionPart1";
const KEY_PERM_DESCRIPTION_PART2 = "permissionDescriptionPart2";
const KEY_PERM_CAMERA = "permissionCamera";
const KEY_AND = "and";
const KEY_PERM_MICROPHONE = "permissionMicrophone";
const KEY_PERM_CAMERA_ACTIVE = "camera";
const KEY_PERM_CAMERA_INACTIVE = "cameraInActive";
const KEY_PERM_MICROPHONE_ACTIVE = "micro_phone";
const KEY_PERM_MICROPHONE_INACTIVE = "microphoneInActive";
const KEY_GRANT_ACCESS = "grantaccess";
const KEY_CANCEL = "cancel";
const KEY_PERM_OK = "permok";
const KEY_PERM_CANCEL = "permcancel";
const KEY_PERM_GRANTED = "permissionGranted";
const KEY_PERM_NOT_GRANTED = "permissionNotGranted";
const KEY_PERM_REQUIRED_TITLE = "permissionRequired";
const KEY_PERM_REQUIRED_DESCRIPTION = "permissionRequiredDescription";

const initializeScreenMeta = () => {
    const descriptionPart1 = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_PERM_DESCRIPTION_PART1).label;
    const descriptionPart2 = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_PERM_DESCRIPTION_PART2).label;
    const and = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_AND).label;
    const permCamera = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_PERM_CAMERA).label;
    const permMicrophone = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_PERM_MICROPHONE).label;
    const grantAccess = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_GRANT_ACCESS).label;
    const cancel = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_CANCEL).label;
    const consultWithDoctorPage = metaHelpers.findScreen(SCREEN_KEY_DOC_ON_CALL_LANDING);
    const permissionsMeta = metaHelpers.findAllElementsByType(consultWithDoctorPage, TYPE_PERMISSION_LIST_ITEM);
    const cameraActive = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_PERM_CAMERA_ACTIVE);
    const cameraInActive = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_PERM_CAMERA_INACTIVE);
    const microphoneActive = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_PERM_MICROPHONE_ACTIVE);
    const microphoneInActive = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_PERM_MICROPHONE_INACTIVE);
    const permGranted = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_PERM_GRANTED).label;
    const permNotGranted = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_PERM_NOT_GRANTED).label;
    const permissionRequiredTitle = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_PERM_REQUIRED_TITLE).label;
    const permissionRequiredDescription = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_PERM_REQUIRED_DESCRIPTION).label;
    const permOk = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_PERM_OK).label;
    const permCancel = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, KEY_PERM_CANCEL).label;
    const doctorCardCallEndedLabel = findElement(TALKTOADOCTOR, DOCTOR_CHAT_CALL_ENDED).label;
    const doctorCardJoinCallLabel = findElement(TALKTOADOCTOR, DOCTOR_CHAT_JOIN_CALL).label;

    return {
        descriptionPart1,
        descriptionPart2,
        and,
        permCamera,
        permMicrophone,
        grantAccess,
        cancel,
        permissionsMeta,
        cameraActive,
        cameraInActive,
        microphoneActive,
        microphoneInActive,
        permGranted,
        permNotGranted,
        permissionRequiredTitle,
        permissionRequiredDescription,
        permOk,
        permCancel,
        doctorCardCallEndedLabel,
        doctorCardJoinCallLabel
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