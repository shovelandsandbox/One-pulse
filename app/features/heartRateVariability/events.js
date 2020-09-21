export const eventNames = {
  onCameraLoadHRV: "onCameraLoadHRV",
  saveImageDataApiHRV: "saveImageDataApiHRV",
  resultPageOnLoadHRV: "resultPageOnLoadHRV",
  errorOccuredHRV: "errorOccuredHRV",
  resultGoBackHRV: "resultGoBackHRV",
  cameraGoBackHRV: "cameraGoBackHRV",
  cameraPermissionDeniedHRV: "cameraPermissionDeniedHRV",
};

export default {
  [eventNames.onCameraLoadHRV]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.heartRateVariability.onCameraLoadHRV",
      tags: ["heartRateVariability_onCameraLoadHRV"],
    },
  },
  [eventNames.cameraPermissionDeniedHRV]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.heartRateVariability.cameraPermissionDeniedHRV",
      tags: ["heartRateVariability_cameraPermissionDeniedHRV"],
    },
  },
  [eventNames.saveImageDataApiHRV]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.heartRateVariability.saveImageDataApiHRV",
      tags: ["heartRateVariability_saveImageDataApiHRV"],
    },
  },
  [eventNames.resultPageOnLoadHRV]: {
    platform: {
      type: "ScreenEvent",
      name: "pulse.heartRateVariability.resultPageOnLoadHRV",
      tags: ["heartRateVariability_resultPageOnLoadHRV"],
    },
  },
  [eventNames.errorOccuredHRV]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.heartRateVariability.errorOccuredHRV",
      tags: ["heartRateVariability_errorOccuredHRV"],
    },
  },
  [eventNames.resultGoBackHRV]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.heartRateVariability.resultGoBackHRV",
      tags: ["heartRateVariability_resultGoBackHRV"],
    },
  },
  [eventNames.cameraGoBackHRV]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.heartRateVariability.cameraGoBackHRV",
      tags: ["heartRateVariability_cameraGoBackHRV"],
    },
  },
};
