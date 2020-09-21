import {
    CoreConfig,
    metaHelpers as helpers,
} from "@pru-rt-internal/pulse-common";

import {
    SCREEN_KEY_PULSE_FOOD,
    ELEMENT_KEY_ABOUT_YOU,
    ELEMENT_KEY_ABOUT_YOU_INFO,
    ELEMENT_KEY_YOUR_DIET,
    ELEMENT_KEY_YOUR_DIET_INFO,
    ELEMENT_KEY_DIET_TYPES,
    ELEMENT_KEY_SELECT_DIET,
    ELEMENT_KEY_CONTINUE,
    ELEMENT_KEY_NUTRITIONIST,
    ELEMENT_KEY_NUTRITIONIST_INFO,
    ELEMENT_KEY_YES_DEFINITELY,
    ELEMENT_KEY_NO_LATER,
    ELEMENT_KEY_KCAL,
    ELEMENT_KEY_CAL,
    ELEMENT_KEY_CAL_INTAKE,
    ELEMENT_KEY_GRAMS,
    ELEMENT_KEY_REMOVE,
    ELEMENT_KEY_EDIT,
    ELEMENT_KEY_ADD,
    ELEMENT_KEY_FOOD_DIARY,
    ELEMENT_KEY_CONSULT_BANNER,
    ELEMENT_KEY_CONSULT_NOW,
    ELEMENT_KEY_FOOD,
    ELEMENT_KEY_BREAKFAST,
    ELEMENT_KEY_LUNCH,
    ELEMENT_KEY_EVE_SNACK,
    ELEMENT_KEY_DINNER,
    ELEMENT_KEY_SEX,
    ELEMENT_KEY_MALE,
    ELEMENT_KEY_FEMALE,
    ELEMENT_KEY_INFT,
    ELEMENT_KEY_DOB,
    ELEMENT_KEY_WEIGHT,
    ELEMENT_KEY_YOUR_BMI,
    ELEMENT_KEY_NOT_RECOGNIZE,
    ELEMENT_KEY_APOLOGIES,
    ELEMENT_KEY_ANALYSE_IMAGE,
    ELEMENT_KEY_SCAN,
    ELEMENT_KEY_CANCEL,
    ELEMENT_KEY_NOT_RECOGNIZE_TEXT,
    ELEMENT_KEY_TRY_AGAIN,
    ELEMENT_KEY_SELECT_QUANTITY,
    ELEMENT_KEY_ADD_QUANTITY,
    ELEMENT_KEY_QUANTITY,
    ELEMENT_KEY_NAME,
    ELEMENT_KEY_SERVINGS_HDR,
    ELEMENT_KEY_SERVINGS,
    ELEMENT_KEY_CALORIES,
    ELEMENT_KEY_SUCESSS,
    ELEMENT_KEY_SHARE,
    ELEMENT_KEY_OBJ_IDENTIFIED,
    ELEMENT_KEY_AVACADO,
    ELEMENT_KEY_HAVING,
    ELEMENT_KEY_OK,
    ELEMENT_KEY_ARE_YOU_SURE,
    ELEMENT_KEY_ERR_TRY_AGAIN,
    ELEMENT_KEY_ERR_ALL_DETAILS,
    ELEMENT_KEY_ERR_CORRECT_DETAILS,
    ELEMENT_KEY_HEIGHT,
    ELEMENT_SELECT_GENDER,
    ELEMENT_WHAT_GENDER,
    ELEMENT_WHEN_BDAY,
    ELEMENT_CHECK_BMI,
    ELEMENT_KEY_SKIP,
    ELEMENT_HEALTH_SUGG,
    ELEMENT_KEY_UNDERWEIGHT,
    ELEMENT_KEY_NORMAL,
    ELEMENT_KEY_OVERWEIGHT,
    ELEMENT_KEY_OBESE,
    ELEMENT_ITEM_NAME,
    ELEMENT_KEY_SELECT,
    ELEMENT_KEY_UNABLETO_FIND,
    ELEMENT_KEY_HELP_MEAL,
    ELEMENT_KEY_MAX_ITEM_DISPLAY,
    ELEMENT_KEY_HELP_ERROR_POST,
    ELEMENT_KEY_HELP_SUCESS_POST,
    ELEMENT_KEY_HELP_SERVING_SIZE,
    ELEMENT_KEY_NO_MATCH,
    ELEMENT_KEY_PERFECT_MATCH,
    ELEMENT_KEY_MORE_MATCH,
    ELEMENT_KEY_SCAN_AGAIN,
    ELEMENT_KEY_ADD_MANUALLY,
    ELEMENT_KEY_ADD_MEAL_NAME_TITLE,
    ELEMENT_KEY_ADD_MEAL_CALORIES_TITLE,
    ELEMENT_KEY_ADD_MEAL_WEIGHT_TITLE
} from "./configs/metaConstants";
const fetchLabel = (value, defaultValue) =>
    value ? value.label : defaultValue;

const fetchValue = (value, defaultValue) =>
    value ? value.value : defaultValue;

const initializeScreenMeta = () => {
    return {
        aboutYou: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_ABOUT_YOU),
            "About You"
        ),
        aboutYouInfo: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_ABOUT_YOU_INFO),
            "Please provide the below information for accurate tracking and health suggestions."
        ),
        yourDiet: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_YOUR_DIET),
            "Your Diet"
        ),
        yourDietInfo: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_YOUR_DIET_INFO),
            "Tell us about any diet that you are currently following to make sure that’s included in the goal."
        ),
        dietTypes: fetchValue(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_DIET_TYPES),
            ["No Specific Diet", "Keto (Veg)", "Keto (Non - Veg)", "Vegetarian", "Vegetarian with Egg", "Vegan"]
        ),
        selectDiet: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_SELECT_DIET),
            "Please select a diet"
        ),
        continue: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_CONTINUE),
            "Continue"
        ),
        nutritionist: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_NUTRITIONIST),
            "Nutritionist"
        ),
        nutritionistInfo: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_NUTRITIONIST_INFO),
            "Our nutritionist can get you specialised diet plans based on your requirements. Would you like to send your daily food data to our nutritionist?"
        ),
        yesDefinitely: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_YES_DEFINITELY),
            "Yes, Definitely"
        ),
        noLater: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_NO_LATER),
            "No, May Be Later"
        ),
        sex: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_SEX),
            "Sex"
        ),
        male: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_MALE),
            "Male"
        ),
        female: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_FEMALE),
            "Female"
        ),
        dob: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_DOB),
            "Date Of Birth"
        ),
        yourBmi: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_YOUR_BMI),
            "Your BMI"
        ),
        inft: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_INFT),
            " In/Ft"
        ),
        weight: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_WEIGHT),
            "Weight"
        ),
        height: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_HEIGHT),
            "Height"
        ),
        kg: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_INFT),
            " kg"
        ),
        selectGender: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_SELECT_GENDER),
            "Please select gender"
        ),
        whatGender: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_WHAT_GENDER),
            "What's Your Gender?"
        ),
        whenBirtday: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_WHEN_BDAY),
            "When's Your Birthday?"
        ),
        checkBmi: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_CHECK_BMI),
            "Check Your BMI"
        ),
        skip: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_SKIP),
            "SKIP"
        ),
        healthSugg: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_HEALTH_SUGG),
            "Please provide the below information for accurate tracking and health suggestions."
        ),
        underweight: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_UNDERWEIGHT),
            "Underweight"
        ),
        normal: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_NORMAL),
            "Normal"
        ),
        overweight: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_OVERWEIGHT),
            "Overweight"
        ),
        obese: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_OBESE),
            "Obese"
        ),
        cal: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_CAL),
            "cal"
        ),
        kcal: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_KCAL),
            "kcal"
        ),
        grams: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_GRAMS),
            "g"
        ),
        remove: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_REMOVE),
            "Remove"
        ),
        edit: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_EDIT),
            "Edit"
        ),
        foodDiary: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_FOOD_DIARY),
            "My food Journal"
        ),
        consultnowBannerText: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_CONSULT_BANNER),
            "Make a better meal plan by consulting a nutritionist."
        ),
        consultNow: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_CONSULT_NOW),
            "Consult Now"
        ),
        food: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_FOOD),
            "My Meals"
        ),
        breakfast: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_BREAKFAST),
            "Breakfast"
        ),
        lunch: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_LUNCH),
            "Lunch"
        ),
        eveSnack: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_EVE_SNACK),
            "Evening Snack"
        ),
        dinner: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_DINNER),
            "Dinner"
        ),
        add: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_ADD),
            "Add"
        ),
        notRecognize: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_NOT_RECOGNIZE),
            "Enter meal details"
        ),
        apologies: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_APOLOGIES),
            "Apologies! Please add your meal details following:"
        ),
        analyseImage: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_ANALYSE_IMAGE),
            "Analysing your image"
        ),
        scan: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_SCAN),
            "Scan"
        ),
        cancel: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_CANCEL),
            "Cancel"
        ),
        recognizeText: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_NOT_RECOGNIZE_TEXT),
            "You can add the image without including the caloriesto your mealor try again"
        ),
        tryAgain: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_TRY_AGAIN),
            "Try Again"
        ),
        selectQuantity: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_SELECT_QUANTITY),
            "Select Quantity"
        ),
        addQuantity: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_ADD_QUANTITY),
            "Add Quantity"
        ),
        name: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_NAME),
            "Name"
        ),
        quantity: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_QUANTITY),
            "Quantity"
        ),
        servingsHdr: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_SERVINGS_HDR),
            "Servings"
        ),
        servings: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_SERVINGS),
            "servings"
        ),
        calories: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_CALORIES),
            "Calorie Value (Approx)"
        ),
        sucess: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_SUCESSS),
            "Hi, I am PRUDENCE! your AI dietician."
        ),
        select: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_SELECT),
            "Select"
        ),
        unableToFind: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_UNABLETO_FIND),
            "I'm Unable To Find My Meal Here"
        ),
        helpMeal: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_HELP_MEAL),
            "Can you help me identify what you had for your meal?"
        ),
        share: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_SHARE),
            "Share"
        ),
        objIdentified: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_OBJ_IDENTIFIED),
            "The object has been identifieds as an "
        ),
        avacado: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_AVACADO),
            " Avacado"
        ),
        having: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_HAVING),
            " having"
        ),
        ok: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_OK),
            "Ok"
        ),
        itemName: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_ITEM_NAME),
            "Meal Name (sandwich, rote etc)"
        ),
        areYouSure: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_ARE_YOU_SURE),
            "Are you sure you want to remove this item?"
        ),
        calIntake: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_CAL_INTAKE),
            "My Daily Calorie Intake"
        ),
        errorPost: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_HELP_ERROR_POST),
            "There was an error sharing your post. Please try again!"
        ),
        sucessPost: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_HELP_SUCESS_POST),
            "Your post has been successfully shared"
        ),
        servngSize: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_HELP_SERVING_SIZE),
            "Serving Size (2 cups, 150ml, 250g etc)"
        ),
        noMatch: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_NO_MATCH),
            "We couldn't find a match for your meal."
        ),
        perfectMatch: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_PERFECT_MATCH),
            "We have found the perfect match for your meal"
        ),
        moreMatch: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_MORE_MATCH),
            "I found more than one match for your meal. Can you help me identify what you had for your meal?"
        ),
        scanAgain: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_SCAN_AGAIN),
            "You can try scanning again or add the data manually"
        ),
        addManually: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_ADD_MANUALLY),
            "Add Manually"
        ),
        errTryAgain: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_ERR_TRY_AGAIN),
            "There was an error please try again"
        ),
        errDetails: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_ERR_ALL_DETAILS),
            "Please enter all the details"
        ),
        errCrctDetails: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_ERR_CORRECT_DETAILS),
            "please enter correct details"
        ),
        maxItemToDisplayFromEachCategory: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_MAX_ITEM_DISPLAY),
            "2"
        ),
        addMealNameTitle: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_ADD_MEAL_NAME_TITLE),
            "Meal Name"
        ),
        addMealCaloriesTitle: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_ADD_MEAL_CALORIES_TITLE),
            "Calories"
        ),
        addMealWeightTitle: fetchLabel(
            helpers.findElement(SCREEN_KEY_PULSE_FOOD, ELEMENT_KEY_ADD_MEAL_WEIGHT_TITLE),
            "Weight (eg. 100 gm, 1 slice)"
        )
    }
}

export default {
    initializeScreenMeta,
};
