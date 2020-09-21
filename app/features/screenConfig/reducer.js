/* eslint-disable complexity */
/* eslint-disable no-constant-condition */
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import { gridResponseMapper } from "../../utils/response-mapper-utils";
import { path, pathOr, forEachObjIndexed } from "ramda";
import actionNames from "./configs/actionNames";
// import healthConfig from "./healthGrid.json";
// import homeConfig from "./homeGrid.json";

const initialState = {
  Home: {
    components: [],
  },
  Feedback: {
    components: [],
  },
  Health: {
    components: [],
  },
  Account: {
    components: [],
  },
  ProductCatalog: {
    components: [],
  },

  dynamicHealth: {
    components: [],
  },

  dynamicHome: {
    components: [],
  },
  MySubscription: {
    components: [],
  },

  MyPolicies: {
    components: [],
  },

  MyPolicyResponseReceived: false,

  shareReferral: false,
  shareReferralContext: "invite",
  referralType: "",
  referralIdentifier: "",
  showPlukPruleads: false,
  enableUserConsent: false,
  enableStartShare: false,
};

const createSections = components =>
  components.map((component, index) => {
    component.key = "PruList:" + index;
    return {
      title: component.title,
      data: [component],
      display: component.display,
      key: `${index}:${component.title}`,
    };
  });

const doNotTransformConfigsForScreens = {
  Account: "Account",
  Feedback: "Feedback",
  // HealthChannel: "HealthChannel",
};

const doNotCreateSectionsForScreens = {
  Feedback: "Feedback",
  // HealthChannel: "HealthChannel",
};

const screenConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case CoreActionTypes.CMS_GET_SCREEN_CONFIG_SUCCESS: {
      // const body = pathOr({}, ["body"], homeConfig);
      const body = pathOr({}, ["payload", "response", "body"], action);
      // const body = homeGrid.default.body.dynamicHome;
      const allConfigs = {};
      const incomingResourceId = pathOr(
        "",
        ["payload", "actionPayload", "id"],
        action
      );
      // eslint-disable-next-line complexity
      forEachObjIndexed((val, key) => {
        let newConfig = val;
        const existingConfig = state[key] || {};
        if (
          existingConfig.resourceId !== incomingResourceId ||
          !existingConfig.version ||
          newConfig.version !== existingConfig.version
        ) {
          if (!doNotTransformConfigsForScreens[key]) {
            newConfig = gridResponseMapper(newConfig, key);
          }
          if (!doNotCreateSectionsForScreens[key]) {
            newConfig.components = createSections(newConfig.components);
          }
          if (!newConfig.version) {
            newConfig.version = 1;
          }
          newConfig.resourceId = incomingResourceId;
          allConfigs[key] = newConfig;
        }
      }, body);
      const policyResponseStatus =
        path(["payload", "response", "body"], action) === "MyPolicies"
          ? true
          : false;
      return {
        ...state,
        ...allConfigs,
        MyPolicyResponseReceived: policyResponseStatus,
      };
    }
    case CoreActionTypes.CMS_REFERRALS: {
      return { ...state, shareReferral: true };
    }
    case CoreActionTypes.RESET_CMS_REFERRALS: {
      return { ...state, shareReferral: false, referralMedium: "" };
    }
    case CoreActionTypes.CMS_REFERRALS_CONTEXT: {
      return { ...state, shareReferralContext: action.payload };
    }
    case CoreActionTypes.CMS_REFERRALS_TYPE: {
      return {
        ...state,
        referralType: action.payload.type,
        referralIdentifier: action.payload.identifier,
      };
    }
    case CoreActionTypes.OPEN_PLUK_PRULEADS: {
      return { ...state, showPlukPruleads: true };
    }
    case CoreActionTypes.CLOSE_PLUK_PRULEADS: {
      return { ...state, showPlukPruleads: false };
    }
    case actionNames.setReferralMedium: {
      return { ...state, referralMedium: action.payload };
    }
    case CoreActionTypes.LOGOUT_DONE:
    case "init_cms_config": {
      return {
        ...initialState,
      };
    }
    default:
      return { ...state };
  }
};

export default screenConfigReducer;
