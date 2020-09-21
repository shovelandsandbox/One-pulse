import {
    CoreConfig,
    metaHelpers as helpers,
} from "@pru-rt-internal/pulse-common";
const {
    MED_MEDDELIVERY,
    MED_PURCHASEMED,
    MED_SELECT_CONSULTATION,
    MED_ORDER_HISTORY,
    MED_DAYS_AGO,
    MED_NOEPPRESC,
    MED_NO_DELIVERY,
    MED_YOUR_ACCOUNT,
    MED_TO_PROCEED,
    MED_ORDER_NOT_PROCESSED,
    MED_CHECK_AVAILABILITY,
    MED_DOCTOR_CONSULTATION,
    MED_ON_PULSE_CONTINUE,
    MED_NO_ADDRESS,
    MED_OK,
    MED_TODAY,
    MED_NO_ORDER,
    MED_ONGOING_ORDER,
    MED_PAST_ORDER,
    MED_DELIVERING_TO,
    MED_CART_RESET,
    MED_TOPAY,
    MED_FOR_CONSULTATION,
    MED_NAME,
    MED_ADDRESS,
    MED_LESS_ITEM,
    MED_ALERT,
    MED_CART_INSTRUCTIONS,
    MED_NEXT,
    MED_CART,
    MED_OUT_OF_STOCK,
    MED_PAYMENT_SUMMARY,
    MED_PAYMENT_DETAILS,
    MED_APPLY_PROMO,
    MED_APPLY,
    MED_REMOVE,
    MED_OFFERS,
    MED_PAY_SUMMARY_PROMO_ERROR,
    MED_PAY_SUMMARY_MED_PRICE,
    MED_PAY_SUMMARY_MED_DELIVERY_CHARGE,
    MED_PAY_SUMMARY_MED_MANUAL_COUPON,
    MED_PAY_SUMMARY_MED_AUTO_DISCOUNT,
    MED_PAY_SUMMARY_MED_CARD_DISCOUNT,
    MED_PAY_SUMMARY_TOTAL_SAVING,
    MED_PAY_SUMMARY_TOTAL_AMOUNT,
    MED_PAY_MAKE_PAYMENT,
    MED_PROMO_EMPTY_ERROR,
    MED_ORDER_TEXT,
    MED_ORDER_CONFIRMED,
    MED_ORDER_DELIVERED,
    MED_ORDER_SHIPPED,
    MED_ORDER_CANCELLED
} = CoreConfig;
const fetchLabel = (value, defaultValue) =>
    value ? value.label : defaultValue;

const initializeBuyMedicineScreenMeta = () => {
    return {
        medDaysAgo: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_DAYS_AGO),
            "medDaysAgo"
        ),
        medToday: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_TODAY),
            "medToday"
        ),
        medCheckAvailibility: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_CHECK_AVAILABILITY),
            "medCheckAvailibility"
        ),
        medOrderNotProcessed: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_ORDER_NOT_PROCESSED),
            "medOrderNotProcessed"
        ),
        medOk: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_OK),
            "medOk"
        ),
        medPurchased: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_PURCHASEMED),
            "medPurchased"
        ),
        medSelectConsultation: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_SELECT_CONSULTATION),
            "medSelectConsultation"
        ),
        medOrderHistory: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_ORDER_HISTORY),
            "medOrderHistory"
        ),
        medEprescription: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_NOEPPRESC),
            "medEprescription"
        ),
        medNoDelivery: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_NO_DELIVERY),
            "medNoDelivery"
        ),
        medYourAccount: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_YOUR_ACCOUNT),
            "medYourAccount"
        ),
        medToProceed: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_TO_PROCEED),
            "medToProceed"
        ),
        medDocConsultation: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_DOCTOR_CONSULTATION),
            "medDocConsultation"
        ),
        medOnPulseContinue: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_ON_PULSE_CONTINUE),
            "medOnPulseContinue"
        ),
        medNoAddress: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_NO_ADDRESS),
            "medNoAddress"
        ),
        medNoOrder: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_NO_ORDER),
            "medNoOrder"
        ),
        medOngoingOrder: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_ONGOING_ORDER),
            "medOngoingOrder"
        ),
        medPastOrder: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_PAST_ORDER),
            "medPastOrder"
        ),
        medOutOfStock: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_OUT_OF_STOCK),
            "medOutOfStock"
        ),
        medCart: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_CART),
            "medCart"
        ),
        medDeliveringTo: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_DELIVERING_TO),
            "medDeliveringTo"
        ),
        medCartReset: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_CART_RESET),
            "medCartReset"
        ),
        medToPay: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_TOPAY),
            "medToPay"
        ),
        medForConsult: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_FOR_CONSULTATION),
            "medForConsult"
        ),
        medName: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_NAME),
            "medName"
        ),
        medAddress: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_ADDRESS),
            "medAddress"
        ),
        medCartInstructions: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_CART_INSTRUCTIONS),
            "medCartInstructions"
        ),
        medAlert: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_ALERT),
            "medAlert"
        ),
        medLessItem: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_LESS_ITEM),
            "medLessItem"
        ),
        medNext: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_NEXT),
            "medNext"
        ),
        medPromoEmptyError: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_PROMO_EMPTY_ERROR),
            "medPromoEmptyError"
        ),
        medApplyPromo: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_APPLY_PROMO),
            "medApplyPromo"
        ),
        medApply: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_APPLY),
            "medApply"
        ),
        medRemove: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_REMOVE),
            "medRemove"
        ),
        medOffers: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_OFFERS),
            "medOffers"
        ),
        medPaySummaryPromoError: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_PAY_SUMMARY_PROMO_ERROR),
            "medPaySummaryPromoError"
        ),
        medPaySummary: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_PAYMENT_SUMMARY),
            "medPaySummaryPromoError"
        ),
        medPayDetails: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_PAYMENT_DETAILS),
            "medPaySummaryPromoError"
        ),
        medPaySummaryMedPrice: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_PAY_SUMMARY_MED_PRICE),
            "medPaySummaryMedPrice"
        ),
        medPaySummaryMedDeliveryCharge: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_PAY_SUMMARY_MED_DELIVERY_CHARGE),
            "medPaySummaryMedDeliveryCharge"
        ),
        medPaySummaryMedManualCoupon: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_PAY_SUMMARY_MED_MANUAL_COUPON),
            "medPaySummaryMedManualCoupon"
        ),
        medPaySummaryMedAutoDiscount: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_PAY_SUMMARY_MED_AUTO_DISCOUNT),
            "medPaySummaryMedAutoDiscount"
        ),
        medPaySummaryTotalAmount: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_PAY_SUMMARY_TOTAL_AMOUNT),
            "medPaySummaryTotalAmount"
        ),
        medPaySummaryTotalSaving: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_PAY_SUMMARY_TOTAL_SAVING),
            "medPaySummaryTotalSaving"
        ),
        medPaySummaryMedCardDiscount: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_PAY_SUMMARY_MED_CARD_DISCOUNT),
            "medPaySummaryMedCardDiscount"
        ),
        medPayMakePayment: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_PAY_MAKE_PAYMENT),
            "medPayMakePayment"
        ),
        medOrderText: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_ORDER_TEXT),
            "medOrderText"
        ),
        medOrderConfirmed: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_ORDER_CONFIRMED),
            "medOrderConfirmed"
        ),
        medOrderDeleivered: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_ORDER_DELIVERED),
            "medOrderDeleivered"
        ),
        medOrderShipped: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_ORDER_SHIPPED),
            "medOrderShipped"
        ),
        medOrderCancelled: fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, MED_ORDER_CANCELLED),
            "medOrderCancelled"
        ),




       
    };
};

export default {
    initializeBuyMedicineScreenMeta,
};
