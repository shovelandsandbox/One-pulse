import screens from "./configs/screenNames";
import * as actions from "./configs/actionNames";

import { CoreActionTypes, CoreConfig } from "@pru-rt-internal/pulse-common";

const { pageKeys } = CoreConfig;

const context = screens.MEDICINE_DELIVERY;

const checkAvailability = (latitude, longitude) => ({
    context: context,
    type: actions.VALIDATE_LOCATION,
    payload: {
        lat: latitude,
        long: longitude,
    },
});

const saveDoctorDetails = (name, image) => ({
    context: context,
    type: actions.SAVE_DOCTOR_DETAILS,
    payload: {
        name: name,
        image: image,
    },
});

const goProfile = payload => ({
    context: pageKeys.MANAGE_PROFILE,
    type: CoreActionTypes.GO_TO_NEW_PROFILE,
    payload: {
        ...payload,
    },
});

const gotoDocSpecializationScreen = () => ({
    context: pageKeys.PULSE_HEALTH_PAGE,
    type: "GO_TO_HALODOC_SERVICE",
});

const resetState = () => ({
    context: context,
    type: actions.RESET_STATE,
})

const resetAbandoned = () => ({
    context: context,
    type: actions.RESET_ABANDONED,
});

const getListOfMedicine = (
    consultationID,
    latitude,
    longitude,
    medical_recommendation
) => ({
    context: context,
    type: actions.GET_CONSULTATION_BY_ID,
    payload: {
        consultationId: consultationID,
        lat: latitude,
        long: longitude,
        item: medical_recommendation,
    },
});

const getOrderHistory = () => ({
    context: context,
    type: actions.SEARCH_ORDER,
});

const updateCart = (items, customerId) => ({
    context: context,
    type: actions.UPDATE_CART,
    payload: {
        items: items,
        customerOrderId: customerId,
    },
});

const fetchOrder = id => ({
    context: context,
    type: actions.FETCH_ORDER_BY_CUSTOMER_ID,
    payload: {
        customerOrderId: id,
    },
});

const navigatePayment = () => ({
    context: context,
    type: actions.NAVIAGTE_CONFIRMATION,
});

const validateOrder = customerId => ({
    context: context,
    type: actions.VAILDATE_ORDER,
    payload: {
        customerOrderId: customerId,
    },
});

const updateNotes = (customerId, value) => ({
    context: context,
    type: actions.CART_NOTES,
    payload: {
        customerOrderId: customerId,
        shippingNotes: value,
    },
});

const addPromoCode = (PromoCode, id) => ({
    context: context,
    type: actions.ADD_PROMO_CODE,
    payload: {
        promoCode: PromoCode,
        customerOrderId: id,
    },
});

const removePromocode = (PromoCode, id) => ({
    context: context,
    type: actions.REMOVE_PROMO_CODE,
    payload: {
        promoCode: PromoCode,
        customerOrderId: id,
    },
});

const clearCoupon = () => ({
    context: context,
    type: actions.MED_CLEAR_COUPON,
});

const fetchOrderByID = orderID => ({
    context: context,
    type: "PaymentUpdate",
    payload: {
        orderID: orderID,
    },
});

const initiatePayment = orderID => ({
    context: context,
    type: actions.PAY_FOR_ORDER_BYORDER_ID,
    payload: {
        customerOrderId: orderID,
    },
});

const refreshConsultationList = () => ({
    context: context,
    type: actions.GET_ALL_CONSULTATION,
});

export {
    checkAvailability,
    saveDoctorDetails,
    goProfile,
    gotoDocSpecializationScreen,
    resetState,
    resetAbandoned,
    getListOfMedicine,
    getOrderHistory,
    updateCart,
    fetchOrder,
    navigatePayment,
    validateOrder,
    updateNotes,
    addPromoCode,
    removePromocode,
    clearCoupon,
    fetchOrderByID,
    initiatePayment,
    refreshConsultationList
}