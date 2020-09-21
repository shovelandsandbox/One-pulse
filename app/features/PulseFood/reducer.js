import Actions from "./configs/actionNames";
import { path, pathOr } from "ramda";
import _ from "lodash";

// custom
import { CoreActionTypes, CoreConfig } from "@pru-rt-internal/pulse-common";

const {LOGOUT_DONE} = CoreActionTypes


const INITIAL_STATE = {
    // customer update API
    isUpdateCustomerLoading: false,
    isUpdateCustomerError: false,

    // scan food item API
    isScanFoodItemLoading: false,
    isScanFoodItemError: false,
    scanFoodResponse: {},

    // update customer meal plan API
    isUpdateCustomerMealPlanLoading: false,
    isUpdateCustomerMealPlanError: false,

    // add food item API
    isAddFoodItemLoading: false,
    isAddFoodItemError: false,

    // creatPost API
    isCreatePostLoading: false,
    isCreatePostError: false,

    // calculateBMI API
    isCalculateBMILoading: false,
    isCalculateBMIError: false,
    bmiResponse: {},

    userMealPlanData: {},
    itemDocumentID: null,
    aboutYouCompleted: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Actions.UPDATE_CUSTOMER: {
            return {
                ...state,
                isUpdateCustomerLoading: true,
            }
        }
        case Actions.UPDATE_CUSTOMER_SUCCESS: {
            return {
                ...state,
                aboutYouCompleted: true,
                isUpdateCustomerLoading: false,
                isUpdateCustomerError: false
            }
        }
        case Actions.UPDATE_CUSTOMER_FAILURE: {
            return {
                ...state,
                isUpdateCustomerLoading: false,
                isUpdateCustomerError: true
            }
        }
        case Actions.GET_CUSTOMER_MEAL_PLAN_SUCCESS: {

            const payload = action.payload;
            const updatedUserMealPlanData = {
                ...state.userMealPlanData,
                [payload.mealPlanId]: payload.responseBody
            }
            return {
                ...state,
                userMealPlanData: updatedUserMealPlanData
            }
        }
        case Actions.UPDATE_CUSTOMER_MEAL_PLAN: {
            return {
                ...state,
                isUpdateCustomerMealPlanLoading: true,
                isUpdateCustomerMealPlanError: false,
            }
        }
        case Actions.UPDATE_CUSTOMER_MEAL_PLAN_SUCCESS: {
            return {
                ...state,
                isUpdateCustomerMealPlanLoading: false,
                isUpdateCustomerMealPlanError: false,
            }
        }
        case Actions.UPDATE_CUSTOMER_MEAL_PLAN_FAILURE: {
            return {
                ...state,
                isUpdateCustomerMealPlanLoading: false,
                isUpdateCustomerMealPlanError: true,
            }
        }
        case Actions.SCAN_FOOD_ITEM: {
            return {
                ...state,
                isScanFoodItemLoading: true,
                isScanFoodItemError: false
            }
        }
        case Actions.SCAN_FOOD_ITEM_SUCCESS: {
            const payload = action.payload
            const scanFoodResponse = pathOr(null, ["response","body" ], payload)
            return {
                ...state,
                isScanFoodItemLoading: false,
                isScanFoodItemError: false,
                scanFoodResponse
            }
        }
        case Actions.SCAN_FOOD_ITEM_FAILURE: {
            return {
                ...state,
                isScanFoodItemLoading: false,
                isScanFoodItemError: true
            }
        }
        case Actions.ADD_FOOD_ITEM: {

            return {
                ...state,
                isAddFoodItemLoading: true,
                isAddFoodItemError: false,
                itemDocumentID: null
            }
        }
        case Actions.ADD_FOOD_ITEM_SUCCESS: {
            return {
                ...state,
                isAddFoodItemLoading: false,
                isAddFoodItemError: false
            }
        }
        case Actions.ADD_FOOD_ITEM_FAILURE: {
            return {
                ...state,
                isAddFoodItemLoading: false,
                isAddFoodItemError: true
            }
        }
        case Actions.SAVE_CURRENTITEM_DOCUMENT_ID: {
            const id = pathOr(null, ["payload", "id"], action)
            return {
                ...state,
                itemDocumentID: id
            }
        }

        case Actions.GET_DOCUMENT_BY_RESOURCE_ID_SUCCESS: {

            const { responseBody, mealPlanId } = action.payload;
            console.log("idddddddin here", mealPlanId)
            let selectedMealPlanData = state.userMealPlanData[mealPlanId] || {}
            const foodItems = selectedMealPlanData.foodItems || {};

            // loop through different meal types
            Object.keys(foodItems).map(foodItemType => {
                // get food/meal type Data (BREAKFAST, LUNCH, etc)
                const foodItemTypeData = foodItems[foodItemType];
                /* loop through food items of mealType and update 
                   correspoding imageSource */
                console.log("iddddddd", foodItemTypeData)
                const updatedFoodItemTypeData = foodItemTypeData.map((foodItem) => {

                    if (foodItem.id === responseBody.id) {
                        foodItem.imageSource = responseBody.content
                    }
                    return foodItem;
                })
                // set the updated food/meal type Data
                foodItems[foodItemType] = updatedFoodItemTypeData

            });

            selectedMealPlanData = {
                ...selectedMealPlanData,
                foodItems: foodItems
            }

            return {
                ...state,
                userMealPlanData: {
                    ...state.userMealPlanData,
                    [mealPlanId]: selectedMealPlanData
                }
            }
        }

        case Actions.GET_ALL_CUSTOMER_GROUPS: {
            return {
                ...state,
                isCreatePostLoading: true,
                isCreatePostError: false
            }
        }
        case Actions.GET_ALL_CUSTOMER_GROUPS_FAILURE: {
            return {
                ...state,
                isCreatePostLoading: false,
                isCreatePostError: true
            }
        }
        case Actions.JOIN_GROUP_FAILURE: {
            return {
                ...state,
                isCreatePostLoading: false,
                isCreatePostError: true
            }
        }
        case Actions.CREATE_GROUP_POST_FAILURE: {
            return {
                ...state,
                isCreatePostLoading: false,
                isCreatePostError: true
            }
        }
        case Actions.CREATE_GROUP_POST_SUCCESS: {
            return {
                ...state,
                isCreatePostLoading: false,
                isCreatePostError: false,
            }
        }
        case Actions.CALCULATE_BMI: {
            return {
                ...state,
                isCalculateBMILoading: true,
                isCalculateBMIError: false
            }
        }
        case Actions.CALCULATE_BMI_FAILURE: {
            return {
                ...state,
                isCalculateBMILoading: false,
                isCalculateBMIError: true
            }
        }
        case Actions.CALCULATE_BMI_SUCCESS: {
            const payload = action.payload
            return {
                ...state,
                isCalculateBMILoading: false,
                isCalculateBMIError: false,
                bmiResponse: payload.responseBody
            }
        }
        case LOGOUT_DONE:
            // console.log("LOGOUT_DONE")
            return INITIAL_STATE;

        default:
            return state;
    }
};
