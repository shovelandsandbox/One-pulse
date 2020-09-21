import {
  loadUpdateContact,
  loadRegisterClaim,
  loadTransactionScreen,
  loadRenewPolicy,
  loadCancelPolicy,
  loadChatScreen
} from "./fsm";
import { myPolicyActions } from "../../configs/myPolicyActions";

const myPolicyFsm = {
  UPDATE_INFO_SCREEN: {
    [myPolicyActions.getPolicyDetails]: loadUpdateContact,
  },
  myClaims: {
    registerClaimfsm: loadRegisterClaim,
  },
  POLICY_TRANSACTIONS: {
    loadTransaction: loadTransactionScreen,
  },
  RENEW_PRODUCT: {
    renewProduct: loadRenewPolicy,
  },
  CANCEL_JOURNEY: {
    cancelPolicy: loadCancelPolicy,
  },
  ASK_PRUDENCE:{
    goToChat:loadChatScreen
  }
};

export default myPolicyFsm;
