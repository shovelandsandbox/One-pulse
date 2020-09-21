import GoogleFit from "react-native-google-fit";
import { PermissionsAndroid } from "react-native";
import moment from "moment";
import { times, pathOr } from "ramda";

const isGoogleFitAvailable = serviceCallback => {
  GoogleFit.isAvailable(error => {
    if (error) {
      serviceCallback(false);
    } else {
      serviceCallback(true);
    }
  });

  return false;
};

const authorizeGoogleFit = cb1 => {
  GoogleFit.isEnabled((isError, result) => {
    if (!result) {
      GoogleFit.authorize();
      GoogleFit.onAuthorize(() => {
        GoogleFit.startRecording(res => {
          // Process data from Google Fit Recording API (no google fit app needed)
          if (res.recording) {
            GoogleFit.unsubscribeListeners();
            cb1();
          }
        });
      });
      GoogleFit.onAuthorizeFailure(() => {});
    } else {
      GoogleFit.startRecording(res => {
        if (res.recording) {
          GoogleFit.unsubscribeListeners();
          cb1();
        }
      });
    }
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

const permissionAccess = async () => {
  let granted = await PermissionsAndroid.request("android.permission.ACTIVITY_RECOGNITION");
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
  }
  return granted;
};

const authorizeFitnessTracking = async callback => {
  try {
    const hasLocationPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    const hasActivityPermission = await PermissionsAndroid.check(
      "android.permission.ACTIVITY_RECOGNITION"
    );

    hasLocationPermission &&
      hasActivityPermission &&
      authorizeGoogleFit(callback);
  } catch (err) {
    //TODO: Handle
    // Failed to get location access
  }
};

const getMetric = (options, hkFn, processor) => {
  const promise = new Promise(resolve => {
    hkFn(options, (err, results) => {
      let value = 0;
      if (!err) {
        value = processor(results);
      }
      resolve(value);
    });
  });
  return promise;
};

const getStepCount = (startDate, endDate) => {
  return getMetric(
    { startDate, endDate },
    GoogleFit.getDailyStepCountSamples,
    val => {
      const stepsObj = val.filter(data => {
        if (data.source == "com.google.android.gms:estimated_steps") {
          return data;
        }
      });
      return stepsObj.length > 0 && stepsObj[0].steps.length > 0
        ? stepsObj[0].steps[0].value
        : Math.round(
            val.length > 0 && val[0].steps.length > 0
              ? val[0].steps[0].value
              : 0
          );
    }
  );
};

const getCaloriesCount = (startDate, endDate) => {
  const basalCalculation = false;
  return getMetric(
    { startDate, endDate, basalCalculation },
    GoogleFit.getDailyCalorieSamples,
    val =>
      Math.round(val.length > 0 && (val[0].calorie > 0 ? val[0].calorie : 0))
  );
};

const getDistanceCovered = (startDate, endDate) => {
  return getMetric(
    { startDate, endDate },
    GoogleFit.getDailyDistanceSamples,
    val => parseFloat((val.length > 0 ? val[0].distance : 0).toFixed(2))
  );
};

const getHeartRateSamples = (startDate, endDate) => {
  const options = {
    startDate: startDate,
    endDate: endDate,
  };
  return getMetric(options, GoogleFit.getHeartRateSamples, val => {
    return pathOr(0, ["0", "value"], val);
  });
};

const getHeight = () => {
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  const opt = {
    unit: "meter",
    startDate: startDate.toISOString(), // required
    endDate: new Date().toISOString(), // required
  };
  return getMetric(opt, GoogleFit.getHeightSamples, res => {
    if (res && res.length > 0) {
      const height = parseFloat(res[res.length - 1].value);
      if (!isNaN(height)) {
        return Math.round(height * 100);
      }
    }
    return 0;
  });
};

const getWeight = () => {
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  const opt = {
    unit: "kg",
    startDate: startDate.toISOString(),
    endDate: new Date().toISOString(),
  };
  return getMetric(opt, GoogleFit.getWeightSamples, res => {
    if (res && res.length > 0) {
      const weight = parseFloat(res[res.length - 1].value);
      if (!isNaN(weight)) {
        return parseFloat(weight.toFixed(1));
      }
    }
    return 0;
  });
};

const saveMetric = (options, hkFn) => {
  const promise = new Promise(resolve => {
    hkFn(options, (err, results) => {
      resolve({ hasError: err, results });
    });
  });
  return promise;
};

const saveWeight = weight => {
  const opt = {
    value: weight,
    date: new Date().toISOString(),
    unit: "kg",
  };
  return saveMetric(opt, GoogleFit.saveWeight);
};

const saveHeight = height => {
  const opt = {
    value: height / 100,
    date: new Date().toISOString(),
    unit: "meter",
  };
  return saveMetric(opt, GoogleFit.saveHeight);
};

const getActivitySample = (date, activityName) => {
  const options = {
    startDate: date.startOf("day").valueOf(),
    endDate: date.endOf("day").valueOf(),
  };

  return getMetric(options, GoogleFit.getActivitySamples, val => {
    const activity =
      val.find(activity => activity.activityName === activityName) || {};
    return pathOr(0, ["quantity"], activity);
  });
};

let refreshFitnessDataTimer = null;
const DEFAULT_REFRESH_INTERVAL = 5000;

const startTracking = (callback, refreshInterval) => {
  if (!refreshFitnessDataTimer) {
    refreshInterval = refreshInterval || DEFAULT_REFRESH_INTERVAL;
    refreshFitnessDataTimer = setInterval(callback, parseInt(refreshInterval));
  }
};

const stopTracking = () => {
  if (refreshFitnessDataTimer) {
    clearInterval(refreshFitnessDataTimer);
    refreshFitnessDataTimer = null;
    GoogleFit.unsubscribeListeners();
  }
};
let pushTimer = null;
const startPushTracking = (numDays, interval, trackerInfo, cb) => {
  authorizeFitnessTracking(err => {
    if (!err) {
      pushGoogleFitMetrics(numDays, trackerInfo, cb);
      if (pushTimer != null) {
        return;
      }
      pushTimer = setInterval(() => {
        pushGoogleFitMetrics(numDays, trackerInfo, cb);
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

const pushGoogleFitMetrics = (numDays, trackerInfo, cb) => {
  if (trackerInfo && trackerInfo.id) {
    const metricsByDatePromises = getFitnessDataForLastNDays(numDays);
    Promise.all(metricsByDatePromises).then(metricsByDate => {
      cb(metricsByDate);
    });
  }
};

const fetchFitnessDataForDate = date => {
  date = date || moment();
  const startDate = date.startOf("day").toISOString();
  const endDate = date.endOf("day").toISOString();
  return Promise.all([
    getDistanceCovered(startDate, endDate),
    getCaloriesCount(startDate, endDate),
    getActivitySample(date, "swimming"),
    getActivitySample(date, "biking"),
    getStepCount(startDate, endDate),
    getHeartRateSamples(startDate, endDate),
    getActivitySample(date, "sleep"),
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

const fetchLatestFitnessData = () => {
  return fetchFitnessDataForDate(moment());
};

export const GoogleFitService = {
  isGoogleFitAvailable,
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
  permissionAccess,
  fetchLatestFitnessData,
  fetchFitnessDataForDate,
  startPushTracking,
  stopPushTracking,
  getActivitySample,
};
