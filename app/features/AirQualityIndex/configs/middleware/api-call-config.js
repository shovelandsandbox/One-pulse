import * as screens from "../screenNames";
import * as actions from "../actionNames";
import { buildPayload } from "../../../../utils/apiUtils";

export default {
    [screens.AIR_QUALITY_DATA]: {
        [actions.AQHI_DEFAULT_LOCATION]: {
            payloadBuilder: (store, action) => {
                const params = {
                    lat: action.payload.lat.toString(),
                    long: action.payload.long.toString(),
                };
                return buildPayload(store, "getSensorData", null, null, params);
            },
            loader: true,
        },
        [actions.AQHI_GET_BY_LOCATION]: {
            payloadBuilder: (store, action) => {
                const params = {
                    city: action.payload.city,
                };
                return buildPayload(store, "getSensorData", null, null, params);
            },
            loader: true,
        },
    },
}