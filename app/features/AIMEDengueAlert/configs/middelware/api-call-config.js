import screens from "../screenNames";
import actions from "../actionNames";
import { buildPayload } from "../../../../utils/apiUtils";

export default {
    [screens.AIME_DENGUE_SCREEN]: {
        [actions.getTrends]: {
            payloadBuilder: (store, action) => {
                const params = {
                    token: action.payload.token,
                    category: action.payload.category,
                    subcategory: action.payload.subcategory
                };
                return buildPayload(store, "getTrends", null, null, params);
            },
            loader: true,
        },
    }

}