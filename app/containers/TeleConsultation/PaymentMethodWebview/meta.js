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
    PRU_PAYMENT_PAGE,
    PRU_PAYMENT_DEFAULT_PRICE,
    PAYMENT_DETAIL_FAILED
} = CoreConstants;

const initializeScreenMeta = () => {
    const paymentDtlsFailedLabel = findElement(TALKTOADOCTOR, PAYMENT_DETAIL_FAILED).label;
    const paymentDefaultPrice = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_DEFAULT_PRICE).label;
    return {
        paymentDtlsFailedLabel,
        paymentDefaultPrice
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