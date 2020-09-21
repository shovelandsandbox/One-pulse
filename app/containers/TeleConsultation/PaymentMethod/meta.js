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
    PAYMENT_DETAIL_HEADER,
    PAYMENT_DETAIL_WHATS_THIS_FOR,
    PAYMENT_DETAIL_FEE_DTLS,
    PAYMENT_DETAIL_INCLUDE_MEDICATION,
    PAYMENT_DETAIL_COST_MEDICATION,
    PAYMENT_DETAIL_WHEN_WILL_BE_CHARGED,
    PAYMENT_DETAIL_AMOUNT_CHARGED_DTLS,
    PAYMENT_DETAIL_ENTER_CARD_DTLS,
    PAYMENT_DETAIL_PAY_NOW
} = CoreConstants;

const initializeScreenMeta = () => {
    const paymentDtlsHeaderLabel = findElement(TALKTOADOCTOR, PAYMENT_DETAIL_HEADER).label;
    const paymentDtlsWhatThisForLabel = findElement(TALKTOADOCTOR, PAYMENT_DETAIL_WHATS_THIS_FOR).label;
    const paymentDtlsFeeDetailsLabel = findElement(TALKTOADOCTOR, PAYMENT_DETAIL_FEE_DTLS).label;
    const paymentDtlsDoesItIncludeMedicationLabel = findElement(TALKTOADOCTOR, PAYMENT_DETAIL_INCLUDE_MEDICATION).label;
    const paymentDtlsCostOfMedicationLabel = findElement(TALKTOADOCTOR, PAYMENT_DETAIL_COST_MEDICATION).label;
    const paymentDtlsWhenWillBeChargedLabel = findElement(TALKTOADOCTOR, PAYMENT_DETAIL_WHEN_WILL_BE_CHARGED).label;
    const paymentDtlsAmountChargedDtlsLabel = findElement(TALKTOADOCTOR, PAYMENT_DETAIL_AMOUNT_CHARGED_DTLS).label;
    const paymentDtlsEnterCardDtlsLabel = findElement(TALKTOADOCTOR, PAYMENT_DETAIL_ENTER_CARD_DTLS).label;
    const paymentDtlsPayNow = findElement(TALKTOADOCTOR, PAYMENT_DETAIL_PAY_NOW).label;
    return {
        paymentDtlsHeaderLabel,
        paymentDtlsWhatThisForLabel,
        paymentDtlsFeeDetailsLabel,
        paymentDtlsDoesItIncludeMedicationLabel,
        paymentDtlsCostOfMedicationLabel,
        paymentDtlsWhenWillBeChargedLabel,
        paymentDtlsAmountChargedDtlsLabel,
        paymentDtlsEnterCardDtlsLabel,
        paymentDtlsPayNow,
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