import { screenNames } from "../screenNames";
import * as CcaActions from "../actionNames";
import { CoreUtils, CoreConfig } from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;
const { getPayloadForNavigation } = CoreUtils;

const ccaFsmConfig = {
    [screenNames.BASIC_INFORMATION]: {
        [CcaActions.SAVE_BASIC_INFORMATION_SUCCESS]: ({ action }) => {
            const navigateTo = screenNames.QUESTION_SCREEN;
            return getPayloadForNavigation(action, navigateTo, null);
        }
    },
    [screenNames.QUESTION_SCREEN]: {
        [CcaActions.ASSESSMENT_COMPLETE]: ({ action }) => {
            const navigateTo = screenNames.COMPLETION_SCREEN;
            return getPayloadForNavigation(action, navigateTo, null);
        }
    },
    [screenNames.CONTINUE_ASSESSMENT]: {
        [CcaActions.ABORT_ASSESSMENT_SUCCESS]: ({ action }) => {
            const navigateTo = screenNames.CCA_JOURNEY;
            return getPayloadForNavigation(action, navigateTo, null);
        }
    },
}

export default ccaFsmConfig;