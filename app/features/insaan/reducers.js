import * as InsaanActions from './configs/actionNames'

const INITIAL_STATE = {
    insanState: {},
    prayerTimeJAKIM: {},
    prayerTimeJakimIndex: {},
    prayerTimeOther: {},
    prayerTimeOtherIndex: {},

    isZoneListLoaded: false,
    isJakimTimeLoaded: false,
    isOtherTimeLoaded: false,
};

const insaanReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case InsaanActions.GET_INSAAN_ZONE_LIST:
            return {
                ...state,
                isZoneListLoaded: false,
            };
        case InsaanActions.INSAAN_ZONE_LIST_SUCCESS:
            return {
                ...state,
                insanState: action.payload,
                isZoneListLoaded: true,
            };
        case InsaanActions.INSAAN_ZONE_LIST_FAILURE:
            return {
                ...state,
                isZoneListLoaded: false,
            };


        case InsaanActions.GET_PRAYER_TIME_JAKIM:
            return {
                ...state,
                isJakimTimeLoaded: false,
            }
        case InsaanActions.GET_PRAYER_TIME_JAKIM_SUCCESS:
            const keyJakim = action.payload.prayerTimes.gregorianDate
            const dataJakim = action.payload.prayerTimes
            const sourceJakim = state.prayerTimeJakimIndex
            sourceJakim[keyJakim] = dataJakim

            return {
                ...state,
                prayerTimeJAKIM: action.payload,
                prayerTimeJakimIndex: sourceJakim,
                isJakimTimeLoaded: true,
            }
        case InsaanActions.GET_PRAYER_TIME_JAKIM_FAILURE:
            return {
                ...state,
                isJakimTimeLoaded: false,
            }


        case InsaanActions.GET_PRAYER_TIME_OTHER:
            return {
                ...state,
                isOtherTimeLoaded: false,
            }
        case InsaanActions.GET_PRAYER_TIME_OTHER_SUCCESS:
            const keyOther = action.payload.prayerTimes.gregorianDate
            const dataOther = action.payload.prayerTimes
            const sourceOther = state.prayerTimeOtherIndex
            sourceOther[keyOther] = dataOther

            return {
                ...state,
                prayerTimeOther: action.payload,
                prayerTimeOtherIndex: sourceOther,
                isOtherTimeLoaded: true,
            }
        case InsaanActions.GET_PRAYER_TIME_OTHER_FAILURE:
            return {
                ...state,
                isOtherTimeLoaded: false,
            }

        default:
            return state;
    }
};

export default insaanReducer;
