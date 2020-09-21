import GoogleFit from "react-native-google-fit";
import { PermissionsAndroid } from "react-native";
import moment from "moment";

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

const authorizeFitnessTracking = async (callback, title, message) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: title,
        message: message,
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED || granted === true) {
      authorizeGoogleFit(callback);
    }
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
    val => parseFloat((val.length > 0 ? val[0].distance * 0.001 : 0).toFixed(2))
  );
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

const fetchLatestFitnessData = () => {
  const today = moment(new Date());
  const startDate = today.startOf("day").toISOString();
  const endDate = today.endOf("day").toISOString();
  const endDateCalorie = moment(new Date()).toISOString();
  return Promise.all([
    getStepCount(startDate, endDateCalorie),
    getDistanceCovered(startDate, endDateCalorie),
    getCaloriesCount(startDate, endDateCalorie),
  ]).then(metrics => {
    return {
      steps: metrics[0],
      distance: metrics[1],
      calories: metrics[2],
    };
  });
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
  fetchLatestFitnessData,
};
