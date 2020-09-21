import {
    CoreConfig,
    metaHelpers as helpers,
} from "@pru-rt-internal/pulse-common";

const config = require("./config.json")

import {
    SCREEN_KEY_NAVIGATOR_MAP,
    SCREEN_KEY_NAVIGATION_STR,
    ELEMENT_KEY_CONFIG,
    ELEMENT_KEY_TIMINGS,
    ELEMENT_KEY_DISTANCE,
    ELEMENT_KEY_APPROX,
    ELEMENT_KEY_SEE_DETAILS,
    ELEMENT_KEY_MARKETS,
    ELEMENT_KEY_GASSTATIONS_NEARME,
    ELEMENT_KEY_GYMS_NEARME,
    ELEMENT_KEY_GROCERIES,
    ELEMENT_KEY_SEARCH_HERE,
    ELEMENT_KEY_HOSPITALS,
    ELEMENT_KEY_CLINICS,
    ELEMENT_KEY_RECENT_SEARCH,
    ELEMENT_KEY_PULSE_SEARCH,
} from "./metaConstants";
const fetchLabel = (value, defaultValue) =>
    value ? value.label : defaultValue;

const fetchValue = (value, defaultValue) =>
    value ? value.value : defaultValue;

const initializeScreenMeta = () => {
    return {
        config: fetchLabel(
            helpers.findElement(SCREEN_KEY_NAVIGATOR_MAP, ELEMENT_KEY_CONFIG),
            config.elements[0].label
        ),
        timings: fetchLabel(
            helpers.findElement(SCREEN_KEY_NAVIGATION_STR, ELEMENT_KEY_TIMINGS),
            "Timings:"
        ),
        distance: fetchLabel(
            helpers.findElement(SCREEN_KEY_NAVIGATION_STR, ELEMENT_KEY_DISTANCE),
            "Distance:"
        ),
        apprx: fetchLabel(
            helpers.findElement(SCREEN_KEY_NAVIGATION_STR, ELEMENT_KEY_APPROX),
            "apprx."
        ),
        seeDetails: fetchLabel(
            helpers.findElement(SCREEN_KEY_NAVIGATION_STR, ELEMENT_KEY_SEE_DETAILS),
            "See Details"
        ),
        gymsNearMe: fetchLabel(
            helpers.findElement(SCREEN_KEY_NAVIGATION_STR, ELEMENT_KEY_GYMS_NEARME),
            "gyms near me"
        ),
        markets: fetchLabel(
            helpers.findElement(SCREEN_KEY_NAVIGATION_STR, ELEMENT_KEY_MARKETS),
            "markets"
        ),
        gasStationsNearMe: fetchLabel(
            helpers.findElement(SCREEN_KEY_NAVIGATION_STR, ELEMENT_KEY_GASSTATIONS_NEARME),
            "gas stations near"
        ),
        groceries: fetchLabel(
            helpers.findElement(SCREEN_KEY_NAVIGATION_STR, ELEMENT_KEY_GROCERIES),
            "Groceries"
        ),
        searchHere: fetchLabel(
            helpers.findElement(SCREEN_KEY_NAVIGATION_STR, ELEMENT_KEY_SEARCH_HERE),
            "Search here"
        ),
        hospitals: fetchLabel(
            helpers.findElement(SCREEN_KEY_NAVIGATION_STR, ELEMENT_KEY_HOSPITALS),
            "Hospitals"
        ),
        clinics: fetchLabel(
            helpers.findElement(SCREEN_KEY_NAVIGATION_STR, ELEMENT_KEY_CLINICS),
            "Cilinics"
        ),
        recentSearch: fetchLabel(
            helpers.findElement(SCREEN_KEY_NAVIGATION_STR, ELEMENT_KEY_RECENT_SEARCH),
            "Recent search"
        ),
        pulseSearch: fetchLabel(
            helpers.findElement(SCREEN_KEY_NAVIGATION_STR, ELEMENT_KEY_PULSE_SEARCH),
            "Pulse Search"
        ),
    }
}

export default {
    initializeScreenMeta,
};
