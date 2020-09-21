
import { screenNames } from "../screenNames"
import * as InsaanActions from "../actionNames"
import { buildPayload } from "../../../../utils/apiUtils";

const insaanApiCall = {
    [screenNames.GET_INSAAN]: {
        [InsaanActions.GET_INSAAN_ZONE_LIST]: {
            payloadBuilder: (store, action) => {
                return buildPayload(store, "getDocumentById", null, null, {
                    id: "insan::zoneList",
                    realm: "prayerTimings",
                    token: action.payload.token,
                });
            },
            loader: true
        },
        [InsaanActions.GET_PRAYER_TIME_JAKIM]: {
            payloadBuilder: (store, action) => {
                const { body, JAKIMData } = action.payload;
                return buildPayload(store, "getGeoFeatureByCriteria", null, body, {
                    ...JAKIMData,
                });
            },
            loader: true
        },
        [InsaanActions.GET_PRAYER_TIME_OTHER]: {
            payloadBuilder: (store, action) => {
                const { body, OTHERData } = action.payload;
                return buildPayload(store, "getGeoFeatureByCriteria", null, body, {
                    ...OTHERData,
                });
            },
            loader: true
        },
    },
}

export default insaanApiCall;


