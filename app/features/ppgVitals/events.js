export const eventNames = {
  onCameraLoad: "onCameraLoad",
  saveImageDataApi: "saveImageDataApi",
  resultPageOnLoad: "resultPageOnLoad",
  errorOccured: "errorOccured",
  resultGoBack: "resultGoBack",
  cameraGoBack: "cameraGoBack",
  cameraPermissionDenied: "cameraPermissionDenied",
};

export default {
  [eventNames.onCameraLoad]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.ppgVitals.onCameraLoad",
      tags: ["ppgVitals_onCameraLoad"],
    },
  },
  [eventNames.cameraPermissionDenied]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.ppgVitals.cameraPermissionDenied",
      tags: ["ppgVitals_cameraPermissionDenied"],
    },
  },
  [eventNames.saveImageDataApi]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.ppgVitals.saveImageDataApi",
      tags: ["ppgVitals_saveImageDataApi"],
    },
  },
  [eventNames.resultPageOnLoad]: {
    platform: {
      type: "ScreenEvent",
      name: "pulse.ppgVitals.resultPageOnLoad",
      tags: ["ppgVitals_resultPageOnLoad"],
    },
  },
  [eventNames.errorOccured]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.ppgVitals.errorOccured",
      tags: ["ppgVitals_errorOccured"],
    },
  },
  [eventNames.resultGoBack]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.ppgVitals.resultGoBack",
      tags: ["ppgVitals_resultGoBack"],
    },
  },
  [eventNames.cameraGoBack]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.ppgVitals.cameraGoBack",
      tags: ["ppgVitals_cameraGoBack"],
    },
  },
};
