import AppleHealthKit from "rn-apple-healthkit";
import { isNil, times, pathOr } from "ramda";
import { Platform } from "react-native";
import moment from "moment";
const PERMS = AppleHealthKit.Constants.Permissions;
const isAppleHealthKitAvailable = serviceCallback => {
  AppleHealthKit.isAvailable((err, available) => {
    if (err) {
      serviceCallback(false);
    } else {
      serviceCallback(available);
    }
  });

  return false;
};

const authorizeFitnessTracking = callback => {
  const options = {
    permissions: {
      read: [
        PERMS.DistanceSwimming,
        PERMS.DistanceWalkingRunning,
        PERMS.ActiveEnergyBurned,
        PERMS.StepCount,
        PERMS.weight,
        PERMS.Height,
        PERMS.DistanceCycling,
        PERMS.StepCount,
        PERMS.HeartRate,
        PERMS.SleepAnalysis,
      ],
      write: [
        "Weight",
        "Height",
        PERMS.DistanceWalkingRunning,
        PERMS.DistanceCycling,
      ],
    },
  };
  AppleHealthKit.initHealthKit(options, (err, results) => {
    callback(err, results);
  });
};

const getMetric = (options, hkFn, processor) => {
  const promise = new Promise(resolve => {
    hkFn(options, (err, results) => {
      let value = 0;
      if (!isNil(results) && results.length > 0) {
        results.forEach(element => {
          value = value + element.value;
        });
      }
      if (!err) {
        value = processor(results.value || results);
      }
      resolve(value);
    });
  });
  return promise;
};

const getStepCount = startDate => {
  return getMetric({ date: startDate }, AppleHealthKit.getStepCount, val =>
    Math.round(val)
  );
};

const getDistanceCycling = startDate => {
  return getMetric(
    { date: startDate },
    AppleHealthKit.getDistanceCycling,
    val => Math.round(val)
  );
};

const getCaloriesCount = (startDate, endDate) => {
  return getMetric(
    { startDate: startDate, endDate: endDate },
    AppleHealthKit.getActiveEnergyBurned,
    results =>
      parseFloat(
        (1000 * results.reduce((acc, x) => acc + x.value, 0)).toFixed(1)
      )
  );
};
const getSwimmingDistance = (startDate, date) => {
  return getMetric(
    {
      includeManuallyAdded: true,
      startDate,
    },
    AppleHealthKit.getDailyDistanceSwimmingSamples,
    results =>
      (
        results.find(
          x =>
            date.format("DD-MM-YYYY") ==
            moment(x.startDate).format("DD-MM-YYYY")
        ) || {}
      ).value
  );
};

const getDistanceCovered = (startDate, endDate) => {
  const options = {
    unit: "meter",
    date: startDate,
    endDate,
  };

  return getMetric(options, AppleHealthKit.getDistanceWalkingRunning, value =>
    value.toFixed(1)
  );
};

const getHeight = () => {
  return getMetric({ unit: "meter" }, AppleHealthKit.getLatestHeight, val =>
    Math.round(val * 100)
  );
};

const getWeight = () => {
  const options = {
    unit: "gram",
  };
  return getMetric(options, AppleHealthKit.getLatestWeight, val =>
    parseFloat((val / 1000).toFixed(1))
  );
};

const getHeartRateSamples = startDate => {
  const options = {
    unit: "bpm",
    startDate: startDate,
  };
  return getMetric(options, AppleHealthKit.getHeartRateSamples, val => {
    return pathOr(0, ["0", "value"], val);
  });
};

const getSleepSamples = startDate => {
  const options = {
    startDate: startDate,
  };
  return getMetric(options, AppleHealthKit.getSleepSamples, val => {
    let value = 0;
    val.forEach(element => {
      value =
        value +
        moment
          .duration(moment(element.endDate).diff(moment(element.startDate)))
          .asMinutes();
    });
    return value;
  });
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
  const options = {
    value: weight * 2.205,
  };
  return saveMetric(options, AppleHealthKit.saveWeight);
};

const saveHeight = height => {
  const heightToUpdate = height * 0.393701;
  const options = {
    value: heightToUpdate, // Inches
  };
  return saveMetric(options, AppleHealthKit.saveHeight);
};

let subscriber = null;
let refreshFitnessDataTimer = null;
const DEFAULT_REFRESH_INTERVAL = 5000;

const startTracking = (callback, refreshInterval) => {
  AppleHealthKit.initStepCountObserver({}, () => {});
  if (!refreshFitnessDataTimer) {
    refreshInterval = refreshInterval || DEFAULT_REFRESH_INTERVAL;
    callback();
    refreshFitnessDataTimer = setInterval(callback, parseInt(refreshInterval));
  }
};

const stopTracking = () => {
  subscriber && subscriber.remove();
  subscriber = null;
  if (refreshFitnessDataTimer) {
    clearInterval(refreshFitnessDataTimer);
    refreshFitnessDataTimer = null;
  }
};

const isTrackerOn = () => {
  return refreshFitnessDataTimer ? true : false;
};

const fetchLatestFitnessData = () => {
  return fetchFitnessDataForDate(moment());
};

const fetchFitnessDataForDate = date => {
  date = date || moment();
  const startDate = date.startOf("day").toISOString();
  const endDate = date.endOf("day").toISOString();
  return Promise.all([
    getDistanceCovered(startDate),
    getCaloriesCount(startDate, endDate),
    getSwimmingDistance(startDate, date),
    getDistanceCycling(startDate),
    getStepCount(startDate),
    getHeartRateSamples(startDate),
    getSleepSamples(startDate),
  ]).then(metrics => {
    return {
      distance: metrics[0],
      calories: metrics[1],
      swimmingDistance: metrics[2],
      distanceCycling: metrics[3],
      steps: metrics[4],
      heartRate: metrics[5],
      sleepSample: metrics[6],
    };
  });
};

const getFitnessDataForLastNDays = numDays => {
  return times(i => {
    const date = moment().subtract(i, "d");
    return fetchFitnessDataForDate(date).then(metrics => ({
      date,
      metrics,
    }));
  }, numDays + 1);
};

let pushTimer = null;

const startPushTracking = (numDays, interval, trackerInfo, cb) => {
  if (Platform.OS != "ios") {
    return;
  }
  authorizeFitnessTracking(err => {
    if (!err) {
      pushAppleHealthMetrics(numDays, trackerInfo, cb);
      if (pushTimer != null) {
        return;
      }
      pushTimer = setInterval(() => {
        pushAppleHealthMetrics(numDays, trackerInfo, cb);
      }, interval);
    }
  });
};

const stopPushTracking = () => {
  if (pushTimer) {
    clearInterval(pushTimer);
    pushTimer = null;
  }
};

const pushAppleHealthMetrics = (numDays, trackerInfo, cb) => {
  if (trackerInfo && trackerInfo.id) {
    const metricsByDatePromises = getFitnessDataForLastNDays(numDays);
    Promise.all(metricsByDatePromises).then(metricsByDate => {
      cb(metricsByDate);
    });
  }
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
  fetchFitnessDataForDate,
  isTrackerOn,
  startPushTracking,
  stopPushTracking,
  getFitnessDataForLastNDays,
};
