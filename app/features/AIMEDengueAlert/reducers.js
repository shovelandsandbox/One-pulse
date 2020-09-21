import Actions from "./configs/actionNames";
import locationData from './configs/middelware/CountryLocationData'

const INITIAL_STATE = {
    aimeResponse: {},
    getTrendsLoading: false,
    getTrendsSuccess: false,
    getTrendsError: false,
    locationData: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Actions.getTrends: {
            return {
                ...state,
                getTrendsLoading: true,
            };
        }
        case Actions.getTrendsSuccess: {
            console.log("::Inside Reducer", action.payload.content);
            const data = action.payload.content;

            const countryOutbreaks = [];
            const countryCases = [];

            data.forEach(stateData => {
                stateData.outbreaks.forEach((outbreakNumber, index) => {
                    const countryOutBreakNumber =
                        countryOutbreaks[index] === undefined
                            ? outbreakNumber
                            : countryOutbreaks[index] + outbreakNumber;
                    countryOutbreaks[index] = countryOutBreakNumber;
                });

                stateData.cases.forEach((caseNumber, index) => {
                    const countryCaseNumber =
                        countryCases[index] === undefined
                            ? caseNumber
                            : countryCases[index] + caseNumber;
                    countryCases[index] = countryCaseNumber;
                });
            });

            const countryObject = {
                name: locationData.country,
                latitude: locationData.latitude,
                longitude: locationData.longitude,
                outbreaks: countryOutbreaks,
                cases: countryCases,
            };

            const dataWithCountry = [countryObject, ...data];
            return {
                ...state,
                getTrendsLoading: false,
                getTrendsSuccess: true,
                getTrendsError: false,
                aimeResponse: dataWithCountry,
                locationData: locationData
            };
        }
        case Actions.getTrendsFailure: {
            return {
                ...state,
                getTrendsLoading: false,
                getTrendsSuccess: false,
                getTrendsError: true,
            };
        }
        default:
            return state;
    }
};


