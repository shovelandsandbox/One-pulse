import screenNames from "../constants/screenNames";
import CustomerConnectLanding from "./CustomerConnectLanding";
import NewContacts from "./NewContacts";
import CustomerConnectChat from "./CustomerConnectChat";
import GeneratePaymentLink from "./GeneratePaymentLink";
import CustomerConnectPayment from "./CustomerConnectPayment";

const navigationOptions = {
  header: null,
};

//Define all customer connect screens here
export const CustomerConnectScreenConfig = {
  [screenNames.CUSTOMER_CONNECT_LANDING]: {
    screen: CustomerConnectLanding,
    navigationOptions,
  },
  [screenNames.NEW_CONTACTS]: {
    screen: NewContacts,
    navigationOptions,
  },
  [screenNames.CUSTOMER_CONNECT_CHAT]: {
    screen: CustomerConnectChat,
    navigationOptions,
  },
  [screenNames.GEN_PAYMENT_LINK]: {
    screen: GeneratePaymentLink,
    navigationOptions,
  },
  [screenNames.PAYMENT_VIEW]: {
    screen: CustomerConnectPayment,
    navigationOptions,
  },
};
