import { Platform } from "react-native";
import * as RNFS from "react-native-fs";

//#region ACTION TYPES

export const NETWORK_RESPONSE_RECEIVED = "NETWORK_RESPONSE_RECEIVED";
export const CLEAR_NETWORK_RESPONSE = "CLEAR_NETWORK_RESPONSE";

// UNIVERSAL MODAL ACTIONS

// COMING SOON MODAL
export const SHOW_COMING_SOON_MODAL = "SHOW_COMING_SOON_MODAL";
export const HIDE_COMING_SOON_MODAL = "HIDE_COMING_SOON_MODAL";

// GENERAL ERROR MODAL
export const SHOW_GENERAL_ERROR_MODAL = "SHOW_GENERAL_ERROR_MODAL";
export const HIDE_GENERAL_ERROR_MODAL = "HIDE_GENERAL_ERROR_MODAL";

// LOADING MODAL
export const SHOW_LOADING_MODAL = "SHOW_LOADING_MODAL";
export const HIDE_LOADING_MODAL = "HIDE_LOADING_MODAL";

//#endregion

//#region WS ACTIONS

export const WS_VALIDATE_OTP = "validateOtp";

//#endregion

//#region Alert Messages

export const ERROR_TITLE = "Error";
export const ERROR_MESSAGE =
  "Terjadi kesalahan pada sistem. Mohon coba kembali nanti";

//#endregion

//#region RESPONSES CODE

export const OTP_RESPONSE = {
  SENT: 4004,
  SUCCESS: 4000,
  INVALID: 4001,
  EXPIRED: 4002,
};

export const BACKEND_RESPONSE = {
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  VALIDATION_ERROR: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

//#endregion

//#region CONSTANTS

export const POLICY_STATUS = {
  LAPSED: "LAPSED",
  CONTRACTSURRENDERED: "CONTRACTSURRENDERED",
  INFORCE: "INFORCE",
  DECLINED: "DECLINED",
  EXPIRY: "EXPIRY",
  CFI: "CFI",
  MATURED: "MATURED",
  POSTPONE: "POSTPONE",
  PAIDUP: "PAIDUP",
  SURRENDER: "SURRENDER",
  TERMINATED: "TERMINATED",
  WITHDRAWN: "WITHDRAWN",
  DECLINECL: "CLAIM",
  DEATHCLM: "CLAIM",
  REGDEATH: "CLAIM",
  TPDCLAIM: "CLAIM",
  FROZEN: "FROZEN",
};

export const PRESERVED_CAPITAL_LIST = {
  "PT.": "PT.",
  "S.A.B.": "S.A.B.",
  "S.A.P.": "S.A.P.",
  "S.Adm.": "S.Adm.",
  "S.Ag.": "S.Ag.",
  "S.Agr.": "S.Agr.",
  "S.P.": "S.P.",
  "S.Ant.": "S.Ant.",
  "S.Ars.": "S.Ars.",
  "S.Ds.": "S.Ds.",
  "S.E.": "S.E.",
  "S.E.I.": "S.E.I.",
  "S.Farm.": "S.Farm.",
  "S.H.Int.": "S.H.Int.",
  "S.H.": "S.H.",
  "S.Hum.": "S.Hum.",
  "S.Gz.": "S.Gz.",
  "S.Kel.": "S.Kel.",
  "S.I.K.": "S.I.K.",
  "S.I.Kom.": "S.I.Kom.",
  "S.I.P.": "S.I.P.",
  "S.I.Pol.": "S.I.Pol.",
  "S.Ptk.": "S.Ptk.",
  "S.In.": "S.In.",
  "S.Ked.": "S.Ked.",
  "S.K.G.": "S.K.G.",
  "S.K.H.": "S.K.H.",
  "S.Hut.": "S.Hut.",
  "S.Keb.": "S.Keb.",
  "S.Kep.": "S.Kep.",
  "S.K.M.": "S.K.M.",
  "S.Kom.": "S.Kom.",
  "S.K.P.M.": "S.K.P.M.",
  "S.M.B.": "S.M.B.",
  "S.Mat.": "S.Mat.",
  "S.Par.": "S.Par.",
  "S.Pd.": "S.Pd.",
  "S.Pd.I.": "S.Pd.I.",
  "S.Pd.SD.": "S.Pd.SD.",
  "S.Pi.": "S.Pi.",
  "S.Han.": "S.Han.",
  "S.Pt.": "S.Pt.",
  "S.Psi.": "S.Psi.",
  "S.Si.": "S.Si.",
  "S.S.T.P.": "S.S.T.P.",
  "S.S.": "S.S.",
  "S.Sn.": "S.Sn.",
  "S.SI.": "S.SI.",
  "S.Sos.": "S.Sos.",
  "S.Sy.": "S.Sy.",
  "S.T.": "S.T.",
  "S.TI.": "S.TI.",
  "S.T.P.": "S.T.P.",
  "S.Th.I.": "S.Th.I.",
  "S.Th.": "S.Th.",
  "S.T.Han.": "S.T.Han.",
  "S.S.T.Han.": "S.S.T.Han.",
  "S.Tr.Sos.": "S.Tr.Sos.",
  "S.E": "S.E.",
  "S.E.I": "S.E.I.",
  "S.Farm": "S.Farm.",
  "S.H.Int": "S.H.Int.",
  "S.H": "S.H.",
  "S.Hum": "S.Hum.",
  "S.Gz": "S.Gz.",
  "S.Kel": "S.Kel.",
  "S.I.K": "S.I.K.",
  "S.I.Kom": "S.I.Kom.",
  "S.I.P": "S.I.P.",
  "S.I.Pol": "S.I.Pol.",
  "S.Ptk": "S.Ptk.",
  "S.In": "S.In.",
  "S.Ked": "S.Ked.",
  "S.K.G": "S.K.G.",
  "S.K.H": "S.K.H.",
  "S.Hut": "S.Hut.",
  "S.Keb": "S.Keb.",
  "S.Kep": "S.Kep.",
  "S.K.M": "S.K.M.",
  "S.Kom": "S.Kom.",
  "S.K.P.M": "S.K.P.M.",
  "S.M.B": "S.M.B.",
  "S.Mat": "S.Mat.",
  "S.Par": "S.Par.",
  "S.Pd": "S.Pd.",
  "S.Pd.I": "S.Pd.I.",
  "S.Pd.SD": "S.Pd.SD.",
  "S.Pi": "S.Pi.",
  "S.Han": "S.Han.",
  "S.Pt": "S.Pt.",
  "S.Psi": "S.Psi.",
  "S.Si": "S.Si.",
  "S.Si. Teologi": "S.Si. Teologi",
  "S.Si. Teol.": "S.Si. Teol.",
  "S.S.T.P": "S.S.T.P.",
  "S.S": "S.S.",
  "S.Sn": "S.Sn.",
  "S.SI": "S.SI.",
  "S.Sos": "S.Sos.",
  "S.Sy": "S.Sy.",
  "S.T": "S.T.",
  "S.TI": "S.TI.",
  "S.T.P": "S.T.P.",
  "S.Th.I": "S.Th.I.",
  "S.Th": "S.Th.",
  "S.TrK": "S.TrK",
  "S.T.Han": "S.T.Han.",
  "S.S.T.Han": "S.S.T.Han.",
  "S.Tr.Sos": "S.Tr.Sos.",
};

import hsFront from "../assets/images/png/cards/hs-front.png";
import hsBack from "../assets/images/png/cards/hs-back.png";
import pphFront from "../assets/images/png/cards/pph-front.png";
import pphBack from "../assets/images/png/cards/pph-back.png";

export const CARDS = {
  HS: {
    FRONT: hsFront,
    BACK: hsBack,
  },
  HA: {
    FRONT: pphFront,
    BACK: pphBack,
  },
};

export const RIDER_CODE_CARD_ELIGIBLE = {
  HA: "HA",
  HS: "HS",
};

export const RIDER_STATUS_QR_SCAN_ELIGIBLE = {
  IF: "IF",
};

export const FILE_SAVE_LOCATION = Platform.select({
  ios: `${RNFS.DocumentDirectoryPath}/Pulse`,
  android: `${RNFS.ExternalStorageDirectoryPath}/Pulse`,
});

//#endregion
