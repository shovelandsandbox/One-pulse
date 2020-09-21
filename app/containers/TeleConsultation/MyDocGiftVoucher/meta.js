import { metaHelpers } from "@pru-rt-internal/pulse-common";
const findElement = screenId => labelName => 
        metaHelpers.findElement(screenId, labelName) || { label: labelName };
const getScreenBackground = () => {
    return metaHelpers.findScreen(screenId) || { image: "https://api.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/35a93b98-c236-4917-bd90-260cd81ff231?namespace=TH" };
}
const findCommon = metaHelpers.findCommon;
const findErrorMessage = metaHelpers.findErrorMessage;
const findCommonErrorMessages = metaHelpers.findCommonErrorMessages;
const findBackendErrorMessage = metaHelpers.findBackendErrorMessage;
const findBackendErrorMessageByScreen = metaHelpers.findBackendErrorMessageByScreen;
const screenId = "MyDocGiftVoucher";
const fetchLabel = findElement(screenId);

const initializeScreenMeta = () => {
    const mydocGiftVoucherButton = fetchLabel("mydocGiftVoucherButton").label;
    const mydocGiftShareTitle = fetchLabel("mydocGiftShareTitle").label;
    const mydocGiftVoucherBackground = getScreenBackground(screenId).image;
    return {
        mydocGiftVoucherButton,
        mydocGiftVoucherBackground,
        mydocGiftShareTitle,
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