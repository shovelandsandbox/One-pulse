import screens from "../screenNames";
import * as actions from "../actionNames";
import { CoreConfig } from "@pru-rt-internal/pulse-common";

const getPayloadForNavigation = (action, navigateTo, params) => ({
    ...action,
    payload: {
        ...action.payload,
        navigateTo,
        params,
    },
});
const navigateToPayment = ({ action }) => {
    return getPayloadForNavigation(
        action,
        "PaymentBuyMedicine",
        null
    );
};
const navigateToCart = ({ action }) => {
    return getPayloadForNavigation(action, "CartScreen", null);
};
const navigateToConfirm = ({ action }) => {
    return getPayloadForNavigation(
        action,
        "PaymentConfirmationScreen",
        null
    );
};

const { pageKeys } = CoreConfig;
const middlewareConfig = {
    [screens.MEDICINE_DELIVERY]: {
        [actions.GO_TO_CONSULTATION_LIST]: {
            navigateTo: "ConsultationList"
        },
        [actions.NAVIAGTE_PAYMENT]: navigateToPayment,
        [actions.NAVIAGTE_CONFIRMATION]: navigateToConfirm,
        [actions.NAVIAGTE_CART]: navigateToCart,
    },
}

export default middlewareConfig;