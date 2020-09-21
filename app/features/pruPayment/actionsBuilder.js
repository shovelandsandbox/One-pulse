import { CoreConfig, CoreActionTypes } from "@pru-rt-internal/pulse-common";
const {
  DOC_SERVICE_PAYMENT_CHECKOUT_SUCCESS,
  DOC_SERVICE_PRE_CONSULTATION_QUESTIONS,
} = CoreActionTypes;
const { pageKeys } = CoreConfig;

export const gotoPreconScreen = () => {
  return {
    context: pageKeys.DOC_SERVICE_PAYMENT,
    type: DOC_SERVICE_PRE_CONSULTATION_QUESTIONS,
  };
};
export const checkoutPayment = (orderRef, paymentMode) => {
  return {
    type: DOC_SERVICE_PAYMENT_CHECKOUT_SUCCESS,
    payload: {
      orderRef,
      paymentMode,
    },
  };
};
export const goToScreens = (params, screen) => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: screen,
  payload: {
    params,
  },
});
