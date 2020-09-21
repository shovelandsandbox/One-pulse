export const eventNames = {
  onGalleryLoad: "onGalleryLoad",
  onCameraLoad: "onCameraLoad",
  onCameraClick: "onCameraClick",
  onGalleryClick: "onGalleryClick",
  takePicture: "takePicture",
  savePictureApi: "savePictureApi",
  resultPageOnLoad: "resultPageOnLoad",
  errorOccured: "errorOccured",
  shareOnClick: "shareOnClick",
  retakePicture: "retakePicture",
  goToSymptomChecker: "goToSymptomChecker",
  goToTeleconsultation: "goToTeleconsultation",
  resultGoBack: "resultGoBack",
  cameraGoBack: "cameraGoBack",
  closeModal: "closeModal",
  cameraPermissionDenied: "cameraPermissionDenied",
  goToHealthAssessment: "goToHealthAssessment",
};

export default {
  [eventNames.onGalleryLoad]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.faceDetection.onGalleryLoad",
      tags: ["faceDetection_onGalleryLoad"],
    },
  },
  [eventNames.onCameraLoad]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.faceDetection.onCameraLoad",
      tags: ["faceDetection_onCameraLoad"],
    },
  },
  [eventNames.cameraPermissionDenied]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.faceDetection.cameraPermissionDenied",
      tags: ["faceDetection_cameraPermissionDenied"],
    },
  },
  [eventNames.onCameraClick]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.faceDetection.onCameraClick",
      tags: ["faceDetection_onCameraClick"],
    },
  },
  [eventNames.onGalleryClick]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.faceDetection.onGalleryClick",
      tags: ["faceDetection_onGalleryClick"],
    },
  },
  [eventNames.takePicture]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.faceDetection.takePicture",
      tags: ["faceDetection_takePicture"],
      attributes,
    }),
  },
  [eventNames.savePictureApi]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.faceDetection.savePictureApi",
      tags: ["faceDetection_savePictureApi"],
    },
  },
  [eventNames.resultPageOnLoad]: {
    platform: {
      type: "ScreenEvent",
      name: "pulse.faceDetection.resultPageOnLoad",
      tags: ["faceDetection_resultPageOnLoad"],
    },
  },
  [eventNames.errorOccured]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.faceDetection.errorOccured",
      tags: ["faceDetection_errorOccured"],
    },
  },
  [eventNames.shareOnClick]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.faceDetection.shareOnClick",
      tags: ["faceDetection_shareOnClick"],
    },
  },
  [eventNames.retakePicture]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.faceDetection.retakePicture",
      tags: ["faceDetection_retakePicture"],
    },
  },
  [eventNames.goToSymptomChecker]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.faceDetection.goToSymptomChecker",
      tags: ["faceDetection_goToSymptomChecker"],
    },
  },
  [eventNames.goToHealthAssessment]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.faceDetection.goToHealthAssessment",
      tags: ["faceDetection_goToHealthAssessment"],
    },
  },
  [eventNames.goToTeleconsultation]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.faceDetection.goToTeleconsultation",
      tags: ["faceDetection_goToTeleconsultation"],
    },
  },
  [eventNames.resultGoBack]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.faceDetection.resultGoBack",
      tags: ["faceDetection_resultGoBack"],
    },
  },
  [eventNames.cameraGoBack]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.faceDetection.cameraGoBack",
      tags: ["faceDetection_cameraGoBack"],
    },
  },
  [eventNames.closeModal]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.faceDetection.closeModal",
      tags: ["faceDetection_closeModal"],
    },
  },
};
