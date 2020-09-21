import actions from "../actionNames";
import screens from "../screenNames";
import { buildPayload, buildPayloadWithAccessToken } from "../../../../utils/apiUtils";
import { pathOr, isEmpty } from "ramda";

export default {
    [screens.PULSE_FOOD]: {
        [actions.UPDATE_CUSTOMER]: {
            payloadBuilder: (store, action) => {
                const body = action.payload;
                return buildPayload(store, "updateCustomer", null, body, null);
            },
            loader: true,
        },

        // Get customer's meal plan for a particular date
        [actions.GET_CUSTOMER_MEAL_PLAN]: {
            payloadBuilder: (store, action) => {
                let params = pathOr({}, ["payload","params"], action)
                params.realm = "pulseFood"
                return buildPayload(store, "getCustomerMealPlan", null, null, params);
            },
            loader: true,
        },

        // create customer diet plan holder, if meal plan is empty
        [actions.CREATE_CUSTOMER_DIET_PLAN]: {
            payloadBuilder: (store, action) => {
                let params = pathOr({}, ["payload","params"], action)
                params.realm = "pulseFood"
                return buildPayload(store, "CreateCustomerDietPlan", null, null, params);
            },
            loader: false
        },

        // Update customer's meal plan for a particular date
        [actions.UPDATE_CUSTOMER_MEAL_PLAN]: {
            payloadBuilder: (store, action) => {
                let params = pathOr({}, ["payload","params"], action)
                params.realm = "pulseFood"
                
                const body = action.payload.body;
                return buildPayload(store, "updateCustomerMealPlan", null, body, params);
            },
        },

        // scan food item
        [actions.SCAN_FOOD_ITEM]: {
            payloadBuilder: (store, action) => {
                let params = pathOr({}, ["payload","params"], action)
                params.realm = "pulseFood"

                const body = action.payload.body;
                return buildPayload(store, "analyseFood", null, body, params);
            },
            loader: false
        },

        // Add food item to get item imageID
        [actions.ADD_FOOD_ITEM]: {
            payloadBuilder: (store, action) => {
                let params = pathOr({}, ["payload","params"], action)
                params.realm = "pulseFood"

                const body = action.payload.body;
                return buildPayload(store, "analyseFood", null, body, params);
            },
            loader: true
        },

        // get All customer joined groups
        [actions.GET_ALL_CUSTOMER_GROUPS]: {
            payloadBuilder: (store, action) => {
                const params = action.payload.params;
                return buildPayload(store, "getAllCustomerGroup", null, null, params);
            },
            loader: true
        },

        // Join a Group community
        [actions.JOIN_GROUP]: {
            payloadBuilder: (store, action) => {
                const body = action.payload.body;
                return buildPayload(store, "joinGroup", null, body, null);
            },
            loader: true
        },

        // create post in group community
        [actions.CREATE_GROUP_POST]: {
            payloadBuilder: (store, action) => {
                const body = action.payload.body;
                return buildPayload(store, "createGroupPost", null, body, null);
            },
            loader: true
        },

        // get document/image from ID
        [actions.GET_DOCUMENT_BY_RESOURCE_ID]: {
            payloadBuilder: (store, action) => {
                const params = action.payload.params;
                return buildPayload(store, "getDocumentById", null, null, params);
            },
            loader: true
        },

        // Calculate BMI from image
        [actions.CALCULATE_BMI]: {
            payloadBuilder: (store, action) => {
                const params = action.payload.params;
                const body = action.payload.body;
                return buildPayload(store, "estimateBMI", null, body, params);
            },
            loader: true
        },

    },
};
