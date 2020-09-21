import InitiateCall from "./screens/InitiateCall";
import TwilioVideoCall from "./screens/TwilioVideoCall";
import MainScreen from "./screens/MainScreen";
import ChatContacts from "./screens/ChatContacts";
import Chat from "./screens/chat";
import GeneratePaymentLink from "./screens/GeneratePaymentLink";
import VideoSalePayment from "./screens/VideoSalePayment";

import Header from "./components/Header";

import screenNames from "./configs/screenNames";
import reducer from "./reducer";

const screens = {
  [screenNames.INITIATE_CALL_SCREEN]: InitiateCall,
  [screenNames.TWILIO_VIDEO_CALL]: TwilioVideoCall,
  [screenNames.MAIN_SCREEN]: MainScreen,
  [screenNames.CHAT_CONTACTS]: ChatContacts,
  [screenNames.CHAT]: Chat,
  [screenNames.GEN_PAYMENT_LINK]: GeneratePaymentLink,
  [screenNames.PAYMENT_VIEW]: VideoSalePayment,
};

const components = {
  Header: Header,
};

export default { screenNames, screens, components, reducer };
