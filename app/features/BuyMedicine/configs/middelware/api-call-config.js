import screens from "../screenNames";
import * as actions from "../actionNames";
import { buildPayload } from "../../../../utils/apiUtils";

export default {
    [screens.MEDICINE_DELIVERY]: {
        [actions.VALIDATE_LOCATION]: {
            payloadBuilder: (store, action) => {
                const params = {
                    realm: "doctor",
                };

                const body = {
                    latitude: action.payload.lat,
                    longitude: action.payload.long,
                };
                return buildPayload(
                    store,
                    "getGeoFeatureByCriteria",
                    null,
                    body,
                    params
                );
            },
            loader: true,
        },
        [actions.GET_ALL_CONSULTATION]: {
            payloadBuilder: (store, action) => {
                const params = {
                    realm: "doctor",
                    pageSize: 30,
                    pageNumber: 1,
                    realm: "doctor",
                    statuses: "closed,completed",
                    prescriptionAttached: "true",
                    redemptionLeft: "true",
                };

                return buildPayload(store, "getAllConsultations", null, null, params);
            },
            loader: true,
        },
        [actions.GET_CONSULTATION_BY_ID]: {
            payloadBuilder: (store, action) => {
                const params = {
                    realm: "doctor",
                    id: action.payload.consultationId,
                    //id: '6Y7OYO-9361',
                    hdMedicineDelivery: "true",
                    latitude: action.payload.lat,
                    longitude: action.payload.long,
                };
                return buildPayload(store, "getConsultationById", null, null, params);
            },
            loader: true,
        },
        [actions.CREATE_ORDER]: {
            payloadBuilder: (store, action) => {
                const state = store.getState();
                let name = `${state.profile.firstName} ${state.profile.surName}`;
                const params = {
                    realm: "doctor",
                    longitude: action.payload.longitude,
                    latitude: action.payload.latitude,
                };
                const body = {
                    cart: action.payload.cart,
                    attributes: {
                        address_details: `${state.profile.address1} ${state.profile.address3}`,
                        address_name: name,
                        consultation_id: action.payload.consultationId,
                    },
                };
                return buildPayload(store, "createOrder", null, body, params);
            },
            loader: true,
        },
        [actions.ADD_PROMO_CODE]: {
            payloadBuilder: (store, action) => {
                const params = {
                    realm: "doctor",
                    customerOrderId: action.payload.customerOrderId,
                    method: "PUT",
                };

                const body = {
                    attributes: {
                        promoCode: action.payload.promoCode,
                    },
                };
                return buildPayload(store, "updateOrderPromotions", null, body, params);
            },
            loader: true,
        },
        [actions.REMOVE_PROMO_CODE]: {
            payloadBuilder: (store, action) => {
                const params = {
                    realm: "doctor",
                    customerOrderId: action.payload.customerOrderId,
                    method: "DELETE",
                };

                const body = {
                    attributes: {
                        promoCode: action.payload.promoCode,
                    },
                };
                return buildPayload(store, "updateOrderPromotions", null, body, params);
            },
            loader: true,
        },
        [actions.FETCH_ORDER_BY_CUSTOMER_ID]: {
            payloadBuilder: (store, action) => {
                const params = {
                    realm: "doctor",
                };

                const body = {
                    projs: null,
                    filter: {
                        logicalExpression: null,
                        simpleExpression: {
                            lhs: ["customerOrderId"],
                            op: "EQ",
                            value: {
                                value: [action.payload.customerOrderId],
                            },
                        },
                    },
                    limit: null,
                    orderBy: null,
                };
                return buildPayload(store, "getCustomerOrders", null, body, params);
            },
            loader: false,
        },
        [actions.PAY_FOR_ORDER_BYORDER_ID]: {
            payloadBuilder: (store, action) => {
                const params = {
                    realm: "doctor",
                    customerOrderId: action.payload.customerOrderId,
                    paymentMethod: "card",
                };

                return buildPayload(store, "initiatePayment", null, null, params);
            },
            loader: true,
        },
        [actions.SEARCH_ORDER]: {
            payloadBuilder: (store, action) => {
                const body = {
                    status: "confirmed,shipped,delivered,cancelled",
                    sortOrder: "desc",
                };
                const params = {
                    realm: "doctor",
                    pageSize: "100",
                    pageNumber: "1",
                };
                return buildPayload(store, "findOrdersByCriteria", null, body, params);
            },
            loader: true,
        },
        [actions.CART_NOTES]: {
            payloadBuilder: (store, action) => {
                const body = {
                    type: "user_note",
                    comments: action.payload.shippingNotes,
                };
                const params = {
                    realm: "doctor",
                    customerOrderId: action.payload.customerOrderId,
                    shippingNotes: "true",
                };
                return buildPayload(store, "updateCart", null, body, params);
            },
            loader: true,
        },
        [actions.UPDATE_CART]: {
            payloadBuilder: (store, action) => {
                const body = {
                    items: action.payload.items,
                };
                const params = {
                    realm: "doctor",
                    customerOrderId: action.payload.customerOrderId,
                };
                return buildPayload(store, "updateCart", null, body, params);
            },
            loader: true,
        },
        [actions.VAILDATE_ORDER]: {
            payloadBuilder: (store, action) => {
                const body = {
                    reason: "string",
                    type: "customer_cancelled",
                    comments: "string",
                    key: "string",
                };
                const params = {
                    realm: "doctor",
                    custOrderId: action.payload.customerOrderId,
                    Operation: "AbandonOrder",
                };
                return buildPayload(store, "updateOrderStatus", null, body, params);
            },
            loader: true,
        },
    },
}