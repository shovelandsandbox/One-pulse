import { PermissionsAndroid } from "react-native";

const checkLocationPermission = () => {
  return PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  ).then(res => !!res);
};

//TODO: it has to handle all the different cases like always deny - it has to be handled in ios - check aime code
const requestLocationPermission = () => {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  ).then(granted => {
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  });
};

export default {
  checkLocationPermission,
  requestLocationPermission,
};
