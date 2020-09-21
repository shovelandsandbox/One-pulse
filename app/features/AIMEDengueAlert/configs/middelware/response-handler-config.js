import screens from "../screenNames";
import actionNames from "../actionNames";
import content from './response';
import { failureResponseTransformer } from "../../../../utils/apiUtils";
export default {
    [screens.AIME_DENGUE_SCREEN]: {
        [actionNames.getTrends]: {
            successAction: actionNames.getTrendsSuccess,
            postSuccessHook: (payload, state) => {
                console.log("INSIDE RESPONSEHANDELER", payload.response.body.content);
                return { content: payload.response.body.content };
            },
            failureAction: actionNames.getTrendsFailure,
            failureHook: failureResponseTransformer,
            toggleLoader: false,
        },
    }
}




