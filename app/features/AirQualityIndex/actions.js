import * as screens from "./configs/screenNames";
import * as breezometerActions from "./configs/actionNames";
import { CoreActionTypes, CoreConfig } from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;

export const goToBreezoMeterIntro = payload => ({
    type: breezometerActions.GO_TO_SCREEN,
    navigateTo: "BrezometerWelcomeScreen"

})

export const goToBrezometerWelcomeScreen = () => ({
    type: breezometerActions.GO_TO_SCREEN,
    navigateTo: "BrezometerWelcomeScreen",
})

export const goToAirComposition = () => ({
    type: breezometerActions.GO_TO_SCREEN,
    navigateTo: "HealthTipsScreen",
})

export const goToBrezometerContactInfo = () => ({
    type: breezometerActions.GO_TO_SCREEN,
    navigateTo: "ContactInfoScreen",
})

export const checkAvailability = (latitude, longitude) => ({
    context: screens.AIR_QUALITY_DATA,
    type: breezometerActions.AQHI_DEFAULT_LOCATION,
    payload: {
        lat: latitude,
        long: longitude,
    },
})

export const resetAqhi = () => ({
    context: screens.AIR_QUALITY_DATA,
    type: breezometerActions.RESET_AQHI_FAILURE_TOGGLE,
})
export const getStationName = (lat, long) => ({
    context: screens.AIR_QUALITY_DATA,
    type: breezometerActions.AQHI_DEFAULT_LOCATION,
    payload: {
        lat,
        long,
    },
})
export const getStationNameByCity = (city) => ({
    context: screens.AIR_QUALITY_DATA,
    type: breezometerActions.AQHI_GET_BY_LOCATION,
    payload: {
        city,
    },
})
