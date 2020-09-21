import screens from "../screenNames";
import * as actions from "../actionNames";
import { CoreActionTypes, CoreConfig, metaHelpers } from "@pru-rt-internal/pulse-common";
import { path, forEach, groupBy, forEachObjIndexed, reverse, map, isNil } from "ramda";
import { CustomAlert } from "../../../../components";
const {
    MED_MEDDELIVERY,
    MED_GENERIC_ERROR
} = CoreConfig;
export default {
    [screens.MEDICINE_DELIVERY]: {
        [actions.VALIDATE_LOCATION]: {
            successAction: actions.VALIDATE_LOCATION_SUCCESS,
            postSuccessHook: (payload, state) => {
                return payload.response;
            },
            successHandler: (action, store) => {
                store.dispatch({
                    context: screens.MEDICINE_DELIVERY,
                    type: actions.GET_ALL_CONSULTATION,
                });
            },
            failureAction: actions.VALIDATE_LOCATION_FAILURE,
            toggleLoader: false,
        },
        [actions.GET_ALL_CONSULTATION]: {
            successAction: actions.GET_ALL_CONSULTATION_SUCCESS,
            postSuccessHook: (payload, state) => {

                return { result: payload.response.body };
            },
            failureAction: actions.GET_ALL_CONSULTATION_FAILURE,
            failureHook: payload => { },
            toggleLoader: false,
        },
        [actions.GET_CONSULTATION_BY_ID]: {
            successAction: actions.GET_CONSULTATION_BY_ID_SUCCESS,
            postSuccessHook: (payload, state) => {
                return {
                    result: payload.response.body,
                    actionPayload: payload.actionPayload.item,
                };
            },
            successHandler: (action, store) => {
                var array = [];
                const response = action.payload.response.body;
                const actionPayload = action.payload.actionPayload.item;
                forEach((detailItem) => {
                    forEach((prescribedItem) => {
                        if (path(["product_id"], prescribedItem) === path(["identifier", 0, "use"], detailItem)) {
                            var combinedObject = { ...detailItem, ...prescribedItem };
                            array.push(combinedObject);
                        }
                    }, actionPayload);
                }, response)
                let cart = { items: [] };
                cart.items = map((value) => ({
                    item: {
                        id: path(["product_id"], value),
                        shortName: path(["product_name"], value),
                        // desc: path(["attributes", 0, "value", "description"], value),
                        desc: path(["identifier", 0, "type", "text"], value)
                    },
                    quantity: path(["quantity"], value),
                    unitPrice: { amount: path(["basePrice"], value) },
                }), array);
                store.dispatch({
                    context: screens.MEDICINE_DELIVERY,
                    type: actions.CREATE_ORDER,
                    payload: {
                        cart: cart,
                        latitude: path(["payload", "actionPayload", "lat"], action),
                        longitude: path(["payload", "actionPayload", "long"], action),
                        consultationId: path(["payload", "actionPayload", "consultationId"], action),
                    },
                });
            },
            failureAction: actions.GET_CONSULTATION_BY_ID_FAILURE,

            failureHook: payload => { },
            toggleLoader: (state, isSuccess) => isSuccess,
        },
        [actions.CREATE_ORDER]: {
            successAction: actions.CREATE_ORDER_SUCCESS,
            postSuccessHook: (payload, state) => {
                return { result: payload.response.body, isOrderProcessing: true };
            },
            successHandler: (action, store) => {
                const response = action.payload.response;
                if (response.hasOwnProperty("body")) {
                    store.dispatch({
                        context: screens.MEDICINE_DELIVERY,
                        type: actions.FETCH_ORDER_BY_CUSTOMER_ID,
                        payload: { customerOrderId: response.body.id },
                    });
                }
            },
            failureAction: actions.CREATE_ORDER_FAILURE,

            failureHook: payload => { },
            toggleLoader: (state, isSuccess) => isSuccess,
        },
        [actions.ADD_PROMO_CODE]: {
            successAction: actions.ADD_PROMO_CODE_SUCCESS,
            postSuccessHook: (payload, state) => {
                return payload.response;
            },
            successHandler: (action, store) => {
                //  const response = action.payload.response;
                store.dispatch({
                    type: CoreActionTypes.TOGGLE_LOADER,
                    value: true,
                });

                store.dispatch({
                    context: screens.MEDICINE_DELIVERY,
                    type: actions.FETCH_ORDER_BY_CUSTOMER_ID,
                    payload: {
                        customerOrderId: action.payload.actionPayload.customerOrderId,
                        isPaymentSummary: true,
                    },
                });
            },
            failureAction: actions.ADD_PROMO_CODE_FAILURE,

            failureHook: payload => { },
            toggleLoader: false,
        },
        [actions.REMOVE_PROMO_CODE]: {
            successAction: actions.REMOVE_PROMO_CODE_SUCCESS,
            postSuccessHook: (payload, state) => {
                return payload.response;
            },
            successHandler: (action, store) => {
                store.dispatch({
                    context: screens.MEDICINE_DELIVERY,
                    type: actions.FETCH_ORDER_BY_CUSTOMER_ID,
                    payload: {
                        customerOrderId: action.payload.actionPayload.customerOrderId,
                        isPaymentSummary: true,
                    },
                });
            },
            failureAction: actions.REMOVE_PROMO_CODE_FAILURE,
            failureHook: payload => { },
            toggleLoader: false,
        },
        [actions.FETCH_ORDER_BY_CUSTOMER_ID]: {
            successAction: actions.FETCH_ORDER_BY_CUSTOMER_ID_SUCCESS,
            postSuccessHook: (payload, state) => {
                return {
                    result: payload.response.body,
                    isPaymentSummary: payload.actionPayload.isPaymentSummary,
                };
            },
            successHandler: (action, store) => {
                const response = action.payload.response;
                if (
                    response.hasOwnProperty("body") &&
                    !action.payload.actionPayload.isPaymentSummary
                ) {
                    if (response.body.status === "APPROVED") {
                        store.dispatch({
                            context: screens.MEDICINE_DELIVERY,
                            type: actions.NAVIAGTE_CART,
                        });
                    } else if (
                        store.getState().medicineDelivery.fetchOrderRetryCount < 3 &&
                        !store.getState().medicineDelivery.isOrderAbandoned
                    ) {
                        setTimeout(() => {
                            store.dispatch({
                                context: screens.MEDICINE_DELIVERY,
                                type: actions.FETCH_ORDER_BY_CUSTOMER_ID,
                                payload: { customerOrderId: response.body.orderId },
                            });
                        }, 15000);
                    }
                }
            },
            failureAction: actions.FETCH_ORDER_BY_CUSTOMER_ID_FAILURE,

            failureHook: payload => { },
            toggleLoader: false,
        },
        [actions.PAY_FOR_ORDER_BYORDER_ID]: {
            successAction: actions.PAY_FOR_ORDER_BYORDER_ID_SUCCESS,
            postSuccessHook: (payload, state) => {
                return {
                    paymentLink: payload.response.body.payment_link,
                    //paymentLink: 'https://payments.halodoc.com/d4c37f2e-2932-4bf5-9ad2-b2eabefa28f2'
                };
            },
            successHandler: (action, store) => {
                const response = action.payload.response;
                if (response.hasOwnProperty("body")) {
                    store.dispatch({
                        context: screens.MEDICINE_DELIVERY,
                        type: actions.NAVIAGTE_PAYMENT,
                    });
                }
            },
            failureAction: actions.PAY_FOR_ORDER_BYORDER_ID_FAILURE,
            failureHandler: (payload, store) => {
                CustomAlert.show(
                    "",
                    metaHelpers.findElement(MED_MEDDELIVERY, MED_GENERIC_ERROR).label,
                    {
                        onPositivePress: () => {
                            store.dispatch({
                                navigateTo: "ConsultationList",
                                type: CoreActionTypes.GO_TO_SCREEN,
                            });
                        },
                    }
                );
            },
            failureHook: payload => { },
            toggleLoader: false,
        },
        [actions.SEARCH_ORDER]: {
            successAction: actions.SEARCH_ORDER_SUCCESS,
            postSuccessHook: (payload, state) => {
                let orderHistory = []
                let arrayList = !isNil(payload.response.body) ? groupBy((item) => {
                    return item.status != "CANCELLED" && item.status != "DELIVERED" ? 1 : 0;
                }, payload.response.body) : [];
                forEachObjIndexed((value, key) => {
                    orderHistory.push({
                        title: key,
                        data: value,
                    })
                }, arrayList);
                orderHistory = reverse(orderHistory)
                return { result: orderHistory };
            },
            failureAction: actions.SEARCH_ORDER_FAILURE,

            failureHook: payload => { },
            toggleLoader: false,
        },
        [actions.UPDATE_CART]: {
            successAction: actions.UPDATE_CART_SUCCESS,
            postSuccessHook: (payload, state) => {
                return { result: payload.response.body };
            },
            successHandler: (action, store) => {
                const response = action.payload.response;
                if (response.hasOwnProperty("body")) {
                    const cart = response.body.cart;
                    let quantity = 0;
                    cart &&
                        forEach((item) => {
                            quantity += item.quantity;
                        }, cart.items)
                    if (quantity !== 0) {
                        store.dispatch({
                            context: screens.MEDICINE_DELIVERY,
                            type: actions.NAVIAGTE_CONFIRMATION,
                        });
                    }
                }
            },
            failureAction: actions.UPDATE_CART_FAILURE,
            failureHandler: (payload, store) => {
                CustomAlert.show(
                    "",
                    metaHelpers.findElement(MED_MEDDELIVERY, MED_GENERIC_ERROR).label,
                    {
                        onPositivePress: () => {
                            store.dispatch({
                                navigateTo: "ConsultationList",
                                type: CoreActionTypes.GO_TO_SCREEN,
                            });
                        },
                    }
                );
            },
            failureHook: payload => { },
            toggleLoader: false,
        },
        [actions.CART_NOTES]: {
            successAction: actions.CART_NOTES_SUCCESS,
            postSuccessHook: (payload, state) => {
                return { result: payload.response };
            },
            failureAction: actions.CART_NOTES_FAILURE,

            failureHook: payload => { },
            toggleLoader: false,
        },
        [actions.VAILDATE_ORDER]: {
            successAction: actions.VAILDATE_ORDER_SUCCESS,
            postSuccessHook: (payload, state) => {
                return { result: payload.response.body };
            },
            failureAction: actions.VAILDATE_ORDER_FAILURE,

            failureHook: payload => { },
            toggleLoader: false,
        },
    },

}