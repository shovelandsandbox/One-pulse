export const eventNames = {
  onSkinCareAIGalleryLoad: "onSkinCareAIGalleryLoad",
  onSkinCareAICameraLoad: "onSkinCareAICameraLoad",
  onSkinCareAICameraClick: "onSkinCareAICameraClick",
  onSkinCareAIGalleryClick: "onSkinCareAIGalleryClick",
  takePictureSkinCareAI: "takePictureSkinCareAI",
  savePictureApiSkinCareAI: "savePictureApiSkinCareAI",
  resultPageOnLoadSkinCareAI: "resultPageOnLoadSkinCareAI",
  errorModalSkinCareAI: "errorModalSkinCareAI",
  shareOnClickSkinCareAI: "shareOnClickSkinCareAI",
  retakePictureSkinCareAI: "retakePictureSkinCareAI",
  goToSymptomCheckerkinCareAI: "goToSymptomCheckerkinCareAI",
  goToTeleconsultationSkinCareAI: "goToTeleconsultationSkinCareAI",
  resultGoBackSkinCareAI: "resultGoBackSkinCareAI",
  cameraGoBackSkinCareAI: "cameraGoBackSkinCareAI",
  closeModalSkinCareAI: "closeModalSkinCareAI",
  goToHealthAssessmentSkinCareAI: "goToHealthAssessmentSkinCareAI",
};

export default {
  [eventNames.onSkinCareAIGalleryLoad]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.skinCareAI.onSkinCareAIGalleryLoad",
      tags: ["skinCareAI_onSkinCareAIGalleryLoad"],
    },
  },
  [eventNames.onSkinCareAICameraLoad]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.skinCareAI.onSkinCareAICameraLoad",
      tags: ["skinCareAI_onSkinCareAICameraLoad"],
    },
  },
  [eventNames.onSkinCareAICameraClick]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.skinCareAI.onSkinCareAICameraClick",
      tags: ["skinCareAI_onSkinCareAICameraClick"],
    },
  },
  [eventNames.onSkinCareAIGalleryClick]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.skinCareAI.onSkinCareAIGalleryClick",
      tags: ["skinCareAI_onSkinCareAIGalleryClick"],
    },
  },
  [eventNames.takePictureSkinCareAI]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.skinCareAI.takePictureSkinCareAI",
      tags: ["skinCareAI_takePictureSkinCareAI"],
      attributes,
    }),
  },
  [eventNames.savePictureApiSkinCareAI]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.skinCareAI.savePictureApiSkinCareAI",
      tags: ["skinCareAI_savePictureApiSkinCareAI"],
    },
  },
  [eventNames.resultPageOnLoadSkinCareAI]: {
    platform: {
      type: "ScreenEvent",
      name: "pulse.skinCareAI.resultPageOnLoadSkinCareAI",
      tags: ["skinCareAI_resultPageOnLoadSkinCareAI"],
    },
  },
  [eventNames.errorModalSkinCareAI]: {
    platform: {
      type: "ActivityEvent",
      name: "pulse.skinCareAI.errorModalSkinCareAI",
      tags: ["skinCareAI_errorModalSkinCareAI"],
    },
  },
  [eventNames.shareOnClickSkinCareAI]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.skinCareAI.shareOnClickSkinCareAI",
      tags: ["skinCareAI_shareOnClickSkinCareAI"],
    },
  },
  [eventNames.retakePictureSkinCareAI]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.skinCareAI.retakePictureSkinCareAI",
      tags: ["skinCareAI_retakePictureSkinCareAI"],
    },
  },
  [eventNames.goToSymptomCheckerkinCareAI]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.skinCareAI.goToSymptomCheckerkinCareAI",
      tags: ["skinCareAI_goToBabylonSkinCareAI"],
    },
  },
  [eventNames.goToTeleconsultationSkinCareAI]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.skinCareAI.goToTeleconsultationSkinCareAI",
      tags: ["skinCareAI_goToTeleconsultationSkinCareAI"],
    },
  },
  [eventNames.goToHealthAssessmentSkinCareAI]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.skinCareAI.goToHealthAssessmentSkinCareAI",
      tags: ["skinCareAI_goToHealthAssessmentSkinCareAI"],
    },
  },
  [eventNames.resultGoBackSkinCareAI]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.skinCareAI.resultGoBackSkinCareAI",
      tags: ["skinCareAI_resultGoBackSkinCareAI"],
    },
  },
  [eventNames.cameraGoBackSkinCareAI]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.skinCareAI.cameraGoBackSkinCareAI",
      tags: ["skinCareAI_cameraGoBackSkinCareAI"],
    },
  },
  [eventNames.closeModalSkinCareAI]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.skinCareAI.closeModalSkinCareAI",
      tags: ["skinCareAI_closeModalSkinCareAI"],
    },
  },
};
