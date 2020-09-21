//TODO: implement location permissions for ios
const checkLocationPermission = () => {
  return Promise.resolve(true);
};

const requestLocationPermission = () => {
  return Promise.resolve(true);
};

export default {
  checkLocationPermission,
  requestLocationPermission,
};
