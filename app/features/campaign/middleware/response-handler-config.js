import {
  CoreActionTypes,
  CoreConfig,
  CoreUtils,
} from "@pru-rt-internal/pulse-common";

const { pageKeys } = CoreConfig;
const moment = require("moment");
import { path } from "ramda";

const { parseCustomerDetailsAPIResponse, structureCustomer } = CoreUtils;

// import { analytics } from "react-native-firebase";

export const setUserId = id => {
  // analytics().setUserId(id);
};

export const setUserProperties = param => {
  // analytics().setUserProperties(param);
};

export default {
  [pageKeys.CAMPAIGN]: {
    [CoreActionTypes.UPDATE_PROFILE_DETAILS]: {
      successAction: CoreActionTypes.UPDATE_PROFILE_DETAILS_SUCCESS,
      dispatchActions: payload => {
        return [CoreActionTypes.GET_CUSTOMER_DETAILS];
      },
      failureAction: CoreActionTypes.UPDATE_PROFILE_DETAILS_ERROR,
    },
    [CoreActionTypes.GET_CUSTOMER_DETAILS]: {
      successAction: CoreActionTypes.GET_CUSTOMER_DETAILS_SUCCESS,
      dispatchActions: payload => {
        const actions = [];
        const { response } = payload;
        if (response.body.documents) {
          actions.push(CoreActionTypes.GET_CUSTOMER_DOCUMENTS);
        }
        return actions;
      },
      // eslint-disable-next-line complexity
      postSuccessHook: payload => {
        let properties = {};
        const responseBody = payload.response.body;
        const addressDetail = responseBody.addressDetails;
        const user_id = responseBody.id ? responseBody.id : null;
        if (user_id) {
          properties = {
            ...properties,
          };
          setUserId(user_id);
        }
        const gender = responseBody.sex ? responseBody.sex : null;
        if (gender) {
          properties = {
            ...properties,
            gender,
          };
        }
        if (addressDetail) {
          const address = addressDetail.address;
          if (address) {
            const country = address.country ? address.country : null;
            const city = address.city ? address.city : null;
            if (country) {
              properties = {
                ...properties,
                country,
              };
            }
            if (city) {
              properties = {
                ...properties,
                city,
              };
            }
          }
        }
        const dob = responseBody.dob ? responseBody.dob : null;
        if (dob) {
          const now = moment();
          const age = `${Number(now.format("YYYY")) -
            Number(dob.split("-")[2])}`;
          properties = {
            ...properties,
            age,
          };
        }

        setUserProperties(properties);
        const customerDetails = parseCustomerDetailsAPIResponse(
          payload.response
        );
        const structuredCustomer = structureCustomer(customerDetails);
        return {
          ...payload,
          customer: structuredCustomer,
          email: path(["body", "contactDetails", "email", "value"], payload.response),
        };
      },
      failureAction: CoreActionTypes.GET_CUSTOMER_DETAILS_ERROR,
    },
  },
};
