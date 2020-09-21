import * as actionTypes from "./configs/actionNames";
const {
    VALIDATE_LOCATION_SUCCESS,
    VALIDATE_LOCATION_FAILURE,
    GET_ALL_CONSULTATION_SUCCESS,
    GET_ALL_CONSULTATION_FAILURE,
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_SUCCESS,
    ADD_PROMO_CODE_SUCCESS,
    ADD_PROMO_CODE_FAILURE,
    FETCH_ORDER_BY_CUSTOMER_ID_FAILURE,
    FETCH_ORDER_BY_CUSTOMER_ID_SUCCESS,
    PAY_FOR_ORDER_BYORDER_ID_FAILURE,
    PAY_FOR_ORDER_BYORDER_ID_SUCCESS,
    SEARCH_ORDER_FAILURE,
    SEARCH_ORDER_SUCCESS,
    GET_CONSULTATION_BY_ID_FAILURE,
    GET_CONSULTATION_BY_ID_SUCCESS,
    UPDATE_CART_SUCCESS,
    UPDATE_CART_FAILURE,
    SAVE_DOCTOR_DETAILS,
    RESET_STATE,
    RESET_FETCH_ORDER_RETRY,
    RESET_ABANDONED,
    MED_CLEAR_COUPON,
    REMOVE_PROMO_CODE_SUCCESS,
    CART_NOTES_SUCCESS,
} = actionTypes;
import _ from "lodash";

const INITIAL_STATE = {
    cart: [],
    isServiceable: "",
    prescriptionList: [],
    orderHistory: [],
    paymentUrl: "",
    medicineList: [],
    cartData: {},
    paymentSummary: null,
    doctorName: "",
    doctorImage: "",
    isOrderProcessing: false,
    isOrderAbandoned: false,
    fetchOrderRetryCount: 0,
    isCouponSuccess: false,
    isCouponFailure: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case VALIDATE_LOCATION_SUCCESS:
            return { ...state, isServiceable: "" };

        case VALIDATE_LOCATION_FAILURE:
            return {
                ...state,
                isServiceable:
                    action.payload.errorCode === 2150 ? "No Prescription" : "No Service",
            };

        case GET_ALL_CONSULTATION_SUCCESS:
            return {
                ...state,
                prescriptionList: action.payload.result,
                isServiceable:
                    action.payload.result && action.payload.result.length > 0
                        ? ""
                        : "No Prescription",
            };

        case SAVE_DOCTOR_DETAILS:
            return {
                ...state,
                doctorName: action.payload.name,
                doctorImage: action.payload.image,
            };

        case GET_ALL_CONSULTATION_FAILURE:
            return {
                ...state,
                prescriptionList: [],
                isServiceable: "No Prescription",
            };

        case GET_CONSULTATION_BY_ID_SUCCESS:
            return {
                ...state,
                medicineList: action.payload.result,
                isServiceable: "",
            };

        case GET_CONSULTATION_BY_ID_FAILURE:
            return { ...state, medicineList: [] };

        case CREATE_ORDER_FAILURE:
            return { ...state, cartData: [] };

        case CREATE_ORDER_SUCCESS:
            return { ...state, cartData: action.payload.result };

        case ADD_PROMO_CODE_SUCCESS:
            return { ...state, isCouponSuccess: true, isCouponFailure: false };

        case ADD_PROMO_CODE_FAILURE:
            return { ...state, isCouponSuccess: false, isCouponFailure: true };

        case FETCH_ORDER_BY_CUSTOMER_ID_FAILURE:
            return {
                ...state,
                cartData: [],
                isOrderProcessing: false,
                isOrderAbandoned: true, //show popup for any failure or abonded
                fetchOrderRetryCount: 0,
            };

        case FETCH_ORDER_BY_CUSTOMER_ID_SUCCESS:
            return {
                ...state,
                cartData: action.payload.isPaymentSummary
                    ? state.cartData
                    : action.payload.result,
                paymentSummary: action.payload.result,
                isOrderProcessing:
                    action.payload.result.status === "CREATED" &&
                        state.fetchOrderRetryCount < 3
                        ? true
                        : false,
                isOrderAbandoned:
                    (action.payload.result.status != "CREATED" &&
                        action.payload.result.status != "APPROVED") ||
                        state.fetchOrderRetryCount >= 3
                        ? true
                        : false,
                fetchOrderRetryCount:
                    action.payload.result.status === "APPROVED" ||
                        (action.payload.result.status != "CREATED" &&
                            action.payload.result.status != "APPROVED")
                        ? 0
                        : state.fetchOrderRetryCount + 1,
            };

        case PAY_FOR_ORDER_BYORDER_ID_FAILURE:
            return { ...state, paymentUrl: "" };

        case PAY_FOR_ORDER_BYORDER_ID_SUCCESS:
            return { ...state, paymentUrl: action.payload.paymentLink };

        case SEARCH_ORDER_FAILURE:
            return { ...state, orderHistory: [] };

        case SEARCH_ORDER_SUCCESS:
            if (action.payload.result) {
                return { ...state, orderHistory: action.payload.result };
            }
            return { ...state, orderHistory: [] };

        case UPDATE_CART_SUCCESS:
            return {
                ...state,
                paymentSummary: action.payload.result,
            };

        case UPDATE_CART_FAILURE:
            return { ...state, paymentSummary: null };

        case RESET_STATE:
            return INITIAL_STATE;
        case RESET_FETCH_ORDER_RETRY:
            return { ...state, fetchOrderRetryCount: 0 };
        case RESET_ABANDONED:
            return { ...state, isOrderAbandoned: false, fetchOrderRetryCount: 0 };
        case MED_CLEAR_COUPON:
            return { ...state, isCouponSuccess: false, isCouponFailure: false };
        case REMOVE_PROMO_CODE_SUCCESS:
            return { ...state, isCouponSuccess: false, isCouponFailure: false };
        case CART_NOTES_SUCCESS:
            return { ...state };
        default:
            return state;
    }
};
