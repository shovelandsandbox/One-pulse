import {
    SET_SELECTED_SPECIALIZATION_CATEGORY,
    SET_COVID_ASSESSMENT_DETAILS,
    RESET_COVID_ASSESSMENT_DETAILS,
} from "./config/actionNames";
const INITIAL_STATE = {
    specializationCategoryId: null,
    specializationCategoryImage: null,
    specializationCategoryType: null,
    covidAvailability: true,
    coronaAssessment: {
        coronaRiskFactor: null,
        category: null,
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SELECTED_SPECIALIZATION_CATEGORY:
            return {
                ...state,
                specializationCategoryId: action.payload.id,
                specializationCategoryImage: action.payload.image,
                specializationCategoryType: action.payload.type,
            }

        case SET_COVID_ASSESSMENT_DETAILS:
            return {
                ...state,
                coronaAssessment: {
                    coronaRiskFactor: action.payload.coronaRiskFactor,
                    category: action.payload.category,
                }
            }

        case RESET_COVID_ASSESSMENT_DETAILS:
            return {
                ...state,
                coronaAssessment: {
                    coronaRiskFactor: null,
                    category: null,
                },
            }
        default:
            return state;

    }
};
