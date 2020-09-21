import { pathOr } from "ramda";
import * as tf from "@tensorflow/tfjs";

const getDataForVital = (key, subKey, defaultValue, fromData) => {
  return pathOr(defaultValue, ["range", key, subKey], fromData);
};

const getMetaForMetrics = (key, fromData) => {
  return pathOr({}, ["data", key], fromData);
};

const initialiseTensorCamera = async () => {
  const BACKEND_TO_USE = "rn-webgl";
  try {
    await tf.setBackend(BACKEND_TO_USE);
  } catch (error) {
    console.log("tf logs setbackend failed ", error);
  }

  try {
    await tf.ready();
  } catch (error) {
    console.log("tf logs ready failed ", error);
  }
};

export { getDataForVital, getMetaForMetrics, initialiseTensorCamera };
