import actions from "../actionNames";
import {
    CreateCustomerDietPlan,
    getCustomerMealPlan,
    joinGroup,
    createGroupPost,
    saveCurrentItemDocumentID,
    getDocumentByResourceId
} from "../../actions";
import screens from "../screenNames";
import { pathOr } from "ramda";
import { Alert } from "react-native";
import { PruCustomAlert } from "../../../../components/PruCustomAlert";

export default {
    [screens.PULSE_FOOD]: {
        [actions.UPDATE_CUSTOMER]: {
            successAction: actions.UPDATE_CUSTOMER_SUCCESS,
            failureAction: actions.UPDATE_CUSTOMER_FAILURE,
            toggleLoader: false,
        },

        [actions.GET_CUSTOMER_MEAL_PLAN]: {
            successAction: actions.GET_CUSTOMER_MEAL_PLAN_SUCCESS,
            failureAction: actions.GET_CUSTOMER_MEAL_PLAN_FAILURE,
            
            successHandler: (action, store) => {

                const mealPlanId = pathOr(
                    null,
                    ["payload", "request", "mealPlanId"],
                    action
                );
                const foodItems = pathOr(
                    "",
                    ["payload", "response", "body", "foodItems"],
                    action
                );

                // loop through different meal types
                Object.keys(foodItems).map(foodItemType => {
                    foodItems[foodItemType].map((foodItem) => {
                        console.log("foodItem", foodItem.id)

                        const payload = {
                            params: { id: foodItem.id },
                            mealPlanId,
                        }
                        store.dispatch(getDocumentByResourceId(payload));
                    })
                })
            },
            postSuccessHook: payload => {
                const mealPlanId = pathOr("", ["request", "mealPlanId"], payload);
                const responseBody = pathOr({}, ["response", "body"], payload);
                return {
                    responseBody,
                    mealPlanId,
                };
            },
            failureHandler: (action, store) => {
                console.log("payloadidddd", action);

                const errCode = pathOr(
                    null,
                    ["payload", "response", "status", "code"],
                    action
                );

                // errCode 9060 = dietPlan not created for customer
                if (errCode === 9060) {
                    store.dispatch(CreateCustomerDietPlan());
                }
            },
            toggleLoader: false,
        },

        [actions.CREATE_CUSTOMER_DIET_PLAN]: {
            successAction: actions.CREATE_CUSTOMER_DIET_PLAN_SUCCESS,
            failureAction: actions.CREATE_CUSTOMER_DIET_PLAN_FAILURE,
            toggleLoader: false,
        },

        [actions.UPDATE_CUSTOMER_MEAL_PLAN]: {
            successAction: actions.UPDATE_CUSTOMER_MEAL_PLAN_SUCCESS,
            failureAction: actions.UPDATE_CUSTOMER_MEAL_PLAN_FAILURE,
            successHandler: (action, store) => {
                console.log("payload is", action);
                const mealPlanId = pathOr(
                    null,
                    ["payload", "request", "mealPlanId"],
                    action
                );
                const paylaodObj = { params: { mealPlanId: mealPlanId }, body: {} };
                store.dispatch(getCustomerMealPlan(paylaodObj));
            },
        },

        [actions.SCAN_FOOD_ITEM]: {
            successAction: actions.SCAN_FOOD_ITEM_SUCCESS,
            failureAction: actions.SCAN_FOOD_ITEM_FAILURE,
            toggleLoader: false,
        },

        [actions.ADD_FOOD_ITEM]: {
            successAction: actions.ADD_FOOD_ITEM_SUCCESS,
            failureAction: actions.ADD_FOOD_ITEM_FAILURE,
            toggleLoader: false,
            successHandler: (action, store) => {
                const id = pathOr(
                    null,
                    ["payload", "response", "body", "image", "id"],
                    action
                );

                store.dispatch(
                    saveCurrentItemDocumentID({
                        id,
                    })
                );
            },
        },

        [actions.GET_DOCUMENT_BY_RESOURCE_ID]: {
            successAction: actions.GET_DOCUMENT_BY_RESOURCE_ID_SUCCESS,
            failureAction: actions.GET_DOCUMENT_BY_RESOURCE_ID_FAILURE,
            toggleLoader: false,
            postSuccessHook: payload => {
                const mealPlanId = pathOr("", ["actionPayload", "mealPlanId"], payload);
                const responseBody = pathOr({}, ["response", "body"], payload);
                return {
                    responseBody,
                    mealPlanId,
                };
            },

        },

        [actions.GET_ALL_CUSTOMER_GROUPS]: {
            successAction: actions.GET_ALL_CUSTOMER_GROUPS_SUCCESS,
            failureAction: actions.GET_ALL_CUSTOMER_GROUPS_FAILURE,
            toggleLoader: false,
            successHandler: (action, store) => {
                console.log("acions is", action);
                const communities = pathOr(
                    [],
                    ["payload", "response", "body"],
                    action
                );
                const mealPlan = pathOr(
                    {},
                    ["payload", "actionPayload", "body", "mealPlan"],
                    action
                );
                const healthyEatingID = "Group::Community::healthyEating";
                let aleadyJoined = false;
                // check if userAlready joined the community
                communities &&
                    communities.map(community => {
                        if (community.id === healthyEatingID) {
                            aleadyJoined = true;
                        }
                    });
                const createPostPayload = {
                    body: {
                        "group": {
                            "id": healthyEatingID
                        },
                        "type": "POST",
                        "title": "Check out I'm having this diet now!",
                        "message": `My ${mealPlan.mealType} meal today`,
                        "document": {
                            "id": mealPlan.id
                        }
                    }
                }
                const joinGroupPayload = {
                    mealPlan,
                    body: {
                        id: healthyEatingID,
                    },
                };
                // if user hasnt joined the group do join group , else create post
                aleadyJoined
                    ? store.dispatch(createGroupPost(createPostPayload))
                    : store.dispatch(joinGroup(joinGroupPayload));
            },
        },

        [actions.JOIN_GROUP]: {
            successAction: actions.JOIN_GROUP_SUCCESS,
            failureAction: actions.JOIN_GROUP_FAILURE,
            toggleLoader: false,
            successHandler: (action, store) => {
                const healthyEatingID = "Group::Community::healthyEating";
                const mealPlan = pathOr(
                    {},
                    ["payload", "actionPayload", "mealPlan"],
                    action
                );
                const payload = {
                    body: {
                        "group": {
                            "id": healthyEatingID
                        },
                        "type": "POST",
                        "title": "Check out I'm having this diet now!",
                        "message": `My ${mealPlan.mealType} meal today`,
                        "document": {
                            "id": mealPlan.id
                        }
                    }
                }

                store.dispatch(createGroupPost(payload));
            },
        },

        [actions.CREATE_GROUP_POST]: {
            successAction: actions.CREATE_GROUP_POST_SUCCESS,
            failureAction: actions.CREATE_GROUP_POST_FAILURE,
            toggleLoader: false,
        },

        [actions.CALCULATE_BMI]: {
            successAction: actions.CALCULATE_BMI_SUCCESS,
            failureAction: actions.CALCULATE_BMI_FAILURE,
            toggleLoader: false,
            postSuccessHook: payload => {
                const responseBody = pathOr({}, ["response", "body"], payload);
                return {
                    responseBody
                };
            },
            
        },

    },
};
