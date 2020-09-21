import { screenNames } from "./configs/screenNames"
import * as InsaanActions from "./configs/actionNames"

export const getInsanZoneList = payload => ({
    context: screenNames.GET_INSAAN,
    type: InsaanActions.GET_INSAAN_ZONE_LIST,
    payload: payload
});

export const getPrayerTimeJAKIM = (body, JAKIMData) => ({
    context: screenNames.GET_INSAAN,
    type: InsaanActions.GET_PRAYER_TIME_JAKIM,
    payload: {
        body,
        JAKIMData
    }
});

export const getPrayerTimeOtherconvention = (body, OTHERData) => ({
    context: screenNames.GET_INSAAN,
    type: InsaanActions.GET_PRAYER_TIME_OTHER,
    payload: {
        body,
        OTHERData
    }
});
export const gotoInsaanScheduleScreen = () => ({
    type: InsaanActions.GO_TO_SCREEN,
    navigateTo: screenNames.INSAAN_SCHEDULE_SCREEN
});

export const gotoPrayerTimeConventionsScreen = () => ({
    type: InsaanActions.GO_TO_SCREEN,
    navigateTo: screenNames.INSAAN_PRAYER_TIME_CONVENTION
});