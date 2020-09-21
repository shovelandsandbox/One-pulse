import { CoreConfig, metaHelpers, CoreConstants } from "@pru-rt-internal/pulse-common";
const {
    // PRU_PAYMENT_PAGE,
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
    PRU_PAYMENT_YOUR_PRODUCTS,
    PRU_PAYMENT_TELECONSULTATION,
    PRU_PAYMENT_APPLY,
    PRU_PAYMENT_OFFERS,
    PRU_PAYMENT_DELIVERING_TO,
    PRU_PAYMENT_DETAILS,
    PRU_PAYMENT_DETAILS_HEADER,
    PRU_PAYMENT_TOTAL_AMOUNT,
    PRU_PAYMENT_CONTINUE,
    PRU_PAYMENT_TITLE,
    PRU_PAYMENT_PRODUCT_HEADING,
    PRU_PAYMENT_PAYMENT_METHOD,
    PRU_PAYMENT_PRODUCT_NAME,
    PRU_PAYMENT_PRODUCT_DESC,
    PRU_PAYMENT_VOUCHER_APPLIED_TOAST,
    PRU_PAYMENT_DEFAULT_PRICE,
    PAYMENT_DETAIL_WHATS_THIS_FOR,
    PAYMENT_DETAIL_FEE_DTLS,
    PAYMENT_DETAIL_INCLUDE_MEDICATION,
    PAYMENT_DETAIL_COST_MEDICATION,
    PAYMENT_DETAIL_WHEN_WILL_BE_CHARGED,
    PAYMENT_DETAIL_AMOUNT_CHARGED_DTLS,
} = CoreConstants;

const initializeScreenMeta = () => {
    const paymentProductsLabel = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_YOUR_PRODUCTS).label;
    const paymentTeleconsultationLabel = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_TELECONSULTATION).label;
    const paymentApplyLabel = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_APPLY).label;
    const paymentOffersLabel = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_OFFERS).label;
    const paymentDeliveringToLabel = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_DELIVERING_TO).label;
    const paymentDetailsLabel = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_DETAILS).label;
    const paymentDetailsHeaderLabel = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_DETAILS_HEADER).label;
    const paymentTotalAmountLabel = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_TOTAL_AMOUNT).label;
    const paymentContinueLabel = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_CONTINUE).label;
    const paymentTitle = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_TITLE).label;
    const paymentProductHeading = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_PRODUCT_HEADING).label;
    const paymentMethodHeading = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_PAYMENT_METHOD).label;
    const paymentProductName = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_PRODUCT_NAME).label;
    const paymentProductDesc = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_PRODUCT_DESC).label;
    const paymentVoucherApplied = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_VOUCHER_APPLIED_TOAST).label;
    const paymentDefaultPrice = findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_DEFAULT_PRICE).label;
    const paymentDtlsWhatThisForLabel = findElement(TALKTOADOCTOR, PAYMENT_DETAIL_WHATS_THIS_FOR).label;
    const paymentDtlsFeeDetailsLabel = findElement(TALKTOADOCTOR, PAYMENT_DETAIL_FEE_DTLS).label;
    const paymentDtlsDoesItIncludeMedicationLabel = findElement(TALKTOADOCTOR, PAYMENT_DETAIL_INCLUDE_MEDICATION).label;
    const paymentDtlsCostOfMedicationLabel = findElement(TALKTOADOCTOR, PAYMENT_DETAIL_COST_MEDICATION).label;
    const paymentDtlsWhenWillBeChargedLabel = findElement(TALKTOADOCTOR, PAYMENT_DETAIL_WHEN_WILL_BE_CHARGED).label;
    const paymentDtlsAmountChargedDtlsLabel = findElement(TALKTOADOCTOR, PAYMENT_DETAIL_AMOUNT_CHARGED_DTLS).label;
    return {
        paymentProductsLabel,
        paymentTeleconsultationLabel,
        paymentApplyLabel,
        paymentOffersLabel,
        paymentDeliveringToLabel,
        paymentDetailsLabel,
        paymentDetailsHeaderLabel,
        paymentTotalAmountLabel,
        paymentContinueLabel,
        paymentTitle,
        paymentProductHeading,
        paymentMethodHeading,
        paymentProductName,
        paymentProductDesc,
        paymentVoucherApplied,
        paymentDefaultPrice,
        paymentDtlsWhatThisForLabel,
        paymentDtlsFeeDetailsLabel,
        paymentDtlsDoesItIncludeMedicationLabel,
        paymentDtlsCostOfMedicationLabel,
        paymentDtlsWhenWillBeChargedLabel,
        paymentDtlsAmountChargedDtlsLabel,
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