import { pathOr, path } from "ramda";
import { PixelRatio, Dimensions, Platform } from "react-native";
import { AppleHealthCareService } from "./components/appleHealthService/AppleHealthCareService";
import { GoogleFitService } from "./components/googleFitService";

const LIGHT_LOGO_PATH = "iconUrl_light";
const DARK_LOGO_PATH = "iconUrl_light";
const LOGO_PATH = "iconUrl";
/**
 * this function tries to find current path of logo based on theme
 * @param obj - the object containing property for logo name
 * @param {string} [theme=dark] - the theme to select for
 */
export const getDeviceLogo = (obj, theme = "dark") => {
  return pathOr(
    obj[LOGO_PATH],
    [theme === "dark" ? DARK_LOGO_PATH : LIGHT_LOGO_PATH],
    obj
  );
};

const { width, height } = Dimensions.get("screen");

/**
 * this function returns element size with respect to the actual screen size
 * @param {number|string} widthPercent - the percentage of width do you want
 **/
export const widthPercentageToDP = widthPercent => {
  const screenWidth = width;
  const elemWidth =
    typeof widthPercent === "string" ? parseFloat(widthPercent) : widthPercent;

  return PixelRatio.roundToNearestPixel(screenWidth * (elemWidth / 100));
};

/**
 * this function returns element size with respect to the actual screen size
 * @param {number|string} heightPercent - the percentage of height do you want
 **/

export const heightPercentageToDP = heightPercent => {
  const screenHeight = height;
  const elemHeight =
    typeof heightPercent === "string"
      ? parseFloat(heightPercent)
      : heightPercent;

  return PixelRatio.roundToNearestPixel(screenHeight * (elemHeight / 100));
};

export const checkAndStartHealthTracking = (
  connectedWearables,
  countryMeta,
  cb
) => {
  let type = "googlefit";
  let numDays = "numDaysForGoogleFitnessData";
  let dataSyncInterval = "googleFitDataSyncInterval";
  let dataSyncRequired = "googleFitDataSyncRequired";
  let healthCareService = GoogleFitService;
  if (Platform.OS === "ios") {
    type = "applehealth";
    numDays = "numDaysForFitnessData";
    dataSyncInterval = "appleHealthDataSyncInterval";
    dataSyncRequired = "appleHealthDataSyncRequired";
    healthCareService = AppleHealthCareService;
  }

  const trackerInfo = connectedWearables.find(
    value => path(["wearableType", "type"], value) === type
  );

  const numDaysForFitnessData = pathOr(3, [numDays], countryMeta);
  const interval = pathOr(60 * 15000, [dataSyncInterval], countryMeta);
  const healthDataSyncRequired = pathOr(true, [dataSyncRequired], countryMeta);

  if (trackerInfo && healthDataSyncRequired) {
    healthCareService.startPushTracking(
      numDaysForFitnessData,
      interval,
      trackerInfo,
      cb
    );
  }
};

export const stopHealthTracking = () => {
  if (Platform.OS === "ios") {
    AppleHealthCareService.stopPushTracking();
  } else {
    GoogleFitService.stopPushTracking();
  }
};
