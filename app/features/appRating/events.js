export const firebaseEvents = {
    RatingModalOpenEvent: {
        name: "rating_booster_displayed",
        params: {}
    },
    RatingSubmitEvent: {
        name: "rating_booster_submit",
        params: {
            value: 0
        }
    },
    RatingSkipEvent: {
        name: "rating_booster_skipped",
        params: {}
    }
};

export const platformEvents = {
    RatingSubmitEvent: {
        id: "pulse.rating.submit",
        type: "Pulse",
        name: "pulse.rating.submit",
        attributes: {
            value: 0,
            appVersion: ""
        }
    },
    RatingSkipEvent: {
        id: "pulse.rating.skip",
        type: "Pulse",
        name: "pulse.rating.skip",
        attributes: {
            appVersion: ""
        }
    }
};