import screens from "../screenNames";
import actions from "../actionNames";
import { CoreConfig } from "@pru-rt-internal/pulse-common";

const { pageKeys } = CoreConfig;
const middlewareConfig = {
    [screens.AIME_Dengue_Alert]: {
        [actions.naviagteDengueAlert]: {
            navigateTo: "AIMEDengueAlert"
        },
    },
    [screens.PRODUCT_DENGUE_BREAFING]: {
        [actions.navigateProductDengueBriefing]: {
            navigateTo: "ProductDengueBriefing"
        },
    },
    [screens.AIME_REGISTER]: {
        [actions.navigateAIMERegister]: {
            navigateTo: "AIMERegister"
        },
    },
    [screens.PRODUCT_DENGUE_INDEX]: {
        [actions.navigateProductDengueIndex]: {
            navigateTo: "ProductDengueIndex"
        },
    },
    [pageKeys.NEWPROFILE]: {
        [actions.navigateNewprofile]: {
            navigateTo: "newProfile"
        },
    },
}

export default middlewareConfig;