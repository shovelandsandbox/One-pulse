import Config from "react-native-config";
const properties = require("./env.json");
class AppConfig {
  static getWebSocketUrl = () => {
    return Config.PRU_API_URL ? Config.PRU_API_URL : properties["PRU_API_URL"];
  };
  static getHttpUrl = () => {
    return Config.PRU_API_HTTP_URL
      ? Config.PRU_API_HTTP_URL
      : properties["PRU_API_HTTP_URL"];
  };
  static getPruApiKey = () => {
    return Config.PRU_API_KEY ? Config.PRU_API_KEY : properties["PRU_API_KEY"];
  };
  static getBabylonAppIdentifier = () => {
    return Config.BABYLON_APP_IDENTIFIER
      ? Config.BABYLON_APP_IDENTIFIER
      : properties["BABYLON_APP_IDENTIFIER"];
  };

  static getBuildEnv = () => {
    return Config.BUILD_ENV ? Config.BUILD_ENV : properties["BUILD_ENV"];
  };

  static getPruHttpUrl = () => {
    return Config.PRU_API_HTTP_URL
      ? Config.PRU_API_HTTP_URL
      : properties["PRU_API_HTTP_URL"];
  };
  static getAppGroupId = () => {
    return Config.APP_GROUP_ID
      ? Config.APP_GROUP_ID
      : properties["APP_GROUP_ID"];
  };
  static getBroadcastExtId = () => {
    return Config.BROADCAST_EXT_ID
      ? Config.BROADCAST_EXT_ID
      : properties["BROADCAST_EXT_ID"];
  };
  static getGooglePlacesUrl = () => {
    const key = "GOOGLE_PLACES_URL";
    return Config[key] || properties[key];
  };
  static getGooglePlaceDetailsUrl = () => {
    const key = "GOOGLE_PLACE_DETAILS_URL";
    return Config[key] || properties[key];
  };
  static getGoogleApiKey = platform => {
    const key = `GOOGLE_API_KEY_${platform.toUpperCase()}`;
    return Config[key] || properties[key];
  };
  static getGeocodingApiKey = () => {
    const key = "GOOGLE_MAPS_GEOCODING_API_KEY";
    return Config[key] || properties[key];
  };
  static getPlukPruLeadsServiceUrl = () => {
    const key = "PLUK_PRULEADS_SERVICE_URL";
    return Config[key] || properties[key];
  };
  static getCMSUrl = () => {
    const key = "CMS_URL";
    return Config[key] || properties[key];
  };
}

export default AppConfig;
