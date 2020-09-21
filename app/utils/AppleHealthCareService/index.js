import { NativeAppEventEmitter, Alert, NativeModules } from "react-native";
import { isNil } from "ramda";
import moment from "moment";

const isAppleHealthKitAvailable = serviceCallback => {
    const { AppleHealthKit } = NativeModules;
    AppleHealthKit.isAvailable((response) => {
        console.log("Response Apple Health Kit iS Available =" + response);
        if (!response) {
            serviceCallback(false);
        } else {
            serviceCallback(available);
        }
    });
    return false;
};

const authorizeFitnessTracking = callback => {
    const { AppleHealthKit } = NativeModules;
    const options = {
        permissions: {
            read: [
                "StepCount",
                "ActiveEnergyBurned",
                "DistanceWalkingRunning",
                "Weight",
                "Height",
            ],
            write: ["Weight", "Height"],
        },
    };
    AppleHealthKit.initHealthKit(options, (response) => {
        console.log("Response Apple Health Kit initHealthKit =" + response);
        callback(null, response);
    });
};

const getMetric = (options, hkFn, processor) => {
    const promise = new Promise(resolve => {
        hkFn(options, (err, results) => {
            let value = 0;
            if (!err) {
                value = processor(results.value || results);
            }
            resolve(value);
        });
    });
    return promise;
};

const getStepCount = startDate => {
    const { AppleHealthKit } = NativeModules;
    AppleHealthKit.getStepCount().then((response) => {
        return response;
    })
    return getMetric({ date: startDate }, AppleHealthKit.getStepCount, val => Math.round(val));
};

const getCaloriesCount = (startDate, endDate) => {
    const { AppleHealthKit } = NativeModules;
    return getMetric(
        { startDate: startDate, endDate: endDate },
        AppleHealthKit.getActiveEnergyBurned,
        results =>
            parseFloat(
                (1000 * results.reduce((acc, x) => acc + x.value, 0)).toFixed(1)
            )
    );
};

const getDistanceCovered = startDate => {
    const { AppleHealthKit } = NativeModules;
    const options = {
        unit: "mile", // optional; default 'meter'
        date: startDate, // optional; default now
    };
    return getMetric({
        unit: 'mile',
        date: startDate
    }, AppleHealthKit.getDistanceWalkingRunning, value =>
        parseFloat((value * 1.609).toFixed(2))
    );
};

const getHeight = () => {
    const { AppleHealthKit } = NativeModules;
    return getMetric({ unit: "meter" }, AppleHealthKit.getLatestHeight, val =>
        Math.round(val * 100)
    );
};

const getWeight = () => {
    const { AppleHealthKit } = NativeModules;
    const options = {
        unit: "gram",
    };
    return getMetric(options, AppleHealthKit.getLatestWeight, val =>
        parseFloat((val / 1000).toFixed(1))
    );
};

const saveMetric = (options, hkFn) => {
    const promise = new Promise(resolve => {
        hkFn(options, (err, results) => {
            resolve({ hasError: !isNil(err), results });
        });
    });
    return promise;
};

const saveWeight = weight => {
    const { AppleHealthKit } = NativeModules;
    const options = {
        value: weight * 2.205,
    };
    return saveMetric(options, AppleHealthKit.saveWeight);
};

const saveHeight = height => {
    const heightToUpdate = height * 0.393701;
    const { AppleHealthKit } = NativeModules;
    const options = {
        value: heightToUpdate, // Inches
    };
    return saveMetric(options, AppleHealthKit.saveHeight);
};

let subscriber = null;

let refreshFitnessDataTimer = null;
const DEFAULT_REFRESH_INTERVAL = 5000;

const startTracking = (callback, refreshInterval) => {
    const { AppleHealthKit } = NativeModules;
    AppleHealthKit.initStepCountObserver({}, () => { });
    if (!refreshFitnessDataTimer) {
        refreshInterval = refreshInterval || DEFAULT_REFRESH_INTERVAL;
        callback();
        refreshFitnessDataTimer = setInterval(callback, parseInt(refreshInterval));
    }
};

const isTrackerOn = () => {
    return refreshFitnessDataTimer ? true : false;
};

const stopTracking = () => {
    subscriber && subscriber.remove();
    subscriber = null;

    if (refreshFitnessDataTimer) {
        clearInterval(refreshFitnessDataTimer);
        refreshFitnessDataTimer = null;
    }
};

const fetchLatestFitnessData = (lastTime) => {
    const { AppleHealthKit } = NativeModules;
    const today = moment(lastTime) || moment(new Date());
    const startDate = today.startOf("day").toISOString();
    const endDate = today.endOf("day").toISOString();
    var fitnessData = {}
    AppleHealthKit.fetchLatestFitnessData(startDate, (fitnessData) => {
        console.log("AppleHealthKit : " + "Fitness Data = " + JSON.stringify(fitnessData));
        return fitnessData;
    })
    // AppleHealthKit.getStepCount(startDate).then((val) => {
    //   fitnessData.steps = val;
    //   AppleHealthKit.getDistanceWalkingRunning(startDate).then((val) => {
    //     fitnessData.distance = val;
    //     AppleHealthKit.getActiveEnergyBurned(startDate).then((val) => {
    //       fitnessData.calories = val;
    //       return fitnessData;
    //     })
    //   })
    // })
    // return Promise.all([
    //   getStepCount(startDate),
    //   getDistanceCovered(startDate),
    //   getCaloriesCount(startDate, endDate),
    // ]).then(metrics => {
    //   return {
    //     steps: metrics[0],
    //     distance: metrics[1],
    //     calories: metrics[2],
    //   };
    // });
};

export const AppleHealthCareService = {
    isAppleHealthKitAvailable,
    startTracking,
    stopTracking,
    getStepCount,
    getCaloriesCount,
    getDistanceCovered,
    saveWeight,
    saveHeight,
    getWeight,
    getHeight,
    authorizeFitnessTracking,
    fetchLatestFitnessData,
    isTrackerOn,
};
