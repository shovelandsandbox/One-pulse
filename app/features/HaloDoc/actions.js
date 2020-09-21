import { screenNames } from "./configs/screenNames"
import * as HalodocActions from "./configs/actionNames"
import { CoreActionTypes, CoreConstants, CoreConfig } from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;

const {
  RegistrationStatus
} = CoreConstants;

//Halo Doc Tile
export const gotoHaloDoc = payload => ({
  context: screenNames.HALODOC,
  type: HalodocActions.GO_TO_HALODOC_SERVICE,
  payload: {
    payload
  }
})

export const getConsultationStatus = () => ({
  context: screenNames.HALODOC,
  type: HalodocActions.GET_CONSULTATION_STATUS,
  payload: {
    toggleLoader: true,
  },
})

export const resetConsultationStatus = () => ({
  type: HalodocActions.RESET_CONSULTATION,
})


//Halo Doc TNC Screen
export const gotoHealthScreen = payload => ({
  type: HalodocActions.GO_TO_SCREEN,
  navigateTo: pageKeys.PULSE_HEALTH_PAGE,
  payload: {
    params: payload
  }
})

export const gotoPatientRegistrationScreen = () => ({
  type: HalodocActions.GO_TO_SCREEN,
  navigateTo: screenNames.HALODOC_PATIENT_REGISTRATION
});

export const goToSearchScreen = () => ({
  type: HalodocActions.GO_TO_SCREEN,
  navigateTo: screenNames.HALODOC_DOCTOR_SEARCH,
})

export const goToDoctorListScreen = () => ({
  type: HalodocActions.GO_TO_SCREEN,
  navigateTo: screenNames.HALODOC_DOCTORLIST,
})

export const gotoDocListScreen = (value, type, image) => ({
  type: HalodocActions.GO_TO_SCREEN,
  navigateTo: screenNames.HALODOC_DOCTORLIST,
  payload: {
    params: {
      value,
      type,
      image,
    },
  },
})

export const gotoHalodocTnCScreen = payload => ({
  type: HalodocActions.GO_TO_SCREEN,
  navigateTo: screenNames.HALODOC_SERVICE_INTRO,
  payload: {
    params: payload
  }
})

export const gotoDocInfoScreen = (docObject) => ({
  type: HalodocActions.GO_TO_SCREEN,
  navigateTo: screenNames.HALODOC_DOCTOR_INFO,
  payload: {
    params: {
      docObject,
    },
  },
})



export const gotoWaitingScreen = docObject => ({
  type: HalodocActions.GO_TO_SCREEN,
  navigateTo: screenNames.HALODOC_PATIENT_WAITING,
  payload: {
    params: {
      docObject,
    },
  },
})


export const gotoPaymentSummaryScreen = (appointmentData, docObject) => ({
  type: HalodocActions.GO_TO_SCREEN,
  navigateTo: screenNames.HALODOC_CONSULTATION_PAYMENT_SUMMARY,
  payload: {
    params: {
      appointmentData,
      docObject,
    },
  },
})





//TNC
export const handleDocTnCAcceptance = payload => ({
  context: screenNames.HALODOC_SERVICE_INTRO, // Todo : need to check
  type: HalodocActions.DOC_SERVICE_TNC_ACCEPTED,
  payload: {
    payload
  }
})




//Halo Doc Patient Registration Screen


export const verifyEnteredPhone = payload => ({
  context: screenNames.HALODOC_PATIENT_REGISTRATION,
  type: HalodocActions.DOC_SERVICE_VERIFY_PHONE,
  payload: {
    ...payload
  }
})

export const verifyOtpCancel = () => ({
  context: screenNames.HALODOC_PATIENT_REGISTRATION,
  type: HalodocActions.DOC_SERVICE_VERIFY_OTP_CANCEL
});

export const markTncAccepted = () => ({
  context: screenNames.HALODOC_PATIENT_REGISTRATION,
  type: HalodocActions.DOC_SERVICE_TNC_ACCEPTED,
  payload: {
    registrationStatus: RegistrationStatus.TNC_ACCEPTED
  }
});
export const resetRegistrationStatus = () => ({
  context: screenNames.HALODOC_PATIENT_REGISTRATION,
  type: HalodocActions.RESET_REGISTRATION_STATUS,
  payload: {
    registrationStatus: RegistrationStatus.TNC_ACCEPTED
  }
});
export const fulfillOtp = otp => ({
  context: screenNames.HALODOC_PATIENT_REGISTRATION,
  type: HalodocActions.DOC_SERVICE_VERIFY_OTP,
  payload: {
    otp
  }
});

export const resetPhoneUpdateStatus = () => ({
  type: HalodocActions.RESET_REGISTRATION_PHONE_UPDATED_STATUS
});

export const updatePhoneNumber = mobileNumber => ({
  context: screenNames.HALODOC_PATIENT_REGISTRATION,
  type: HalodocActions.DOC_SERVICE_UPDATE_PHONE,
  payload: {
    countryPhoneCode: "+62",
    mobileNumber: mobileNumber
  }
});

export const registerPatient = payload => ({
  context: screenNames.HALODOC_PATIENT_REGISTRATION,
  type: HalodocActions.DOC_SERVICE_REGISTER_PATIENT,
  payload: {
    ...payload
  }
});
export const requestResendOtp = payload => ({
  context: screenNames.HALODOC_PATIENT_REGISTRATION,
  type: HalodocActions.DOC_SERVICE_RESEND_OTP,
  payload: {
    ...payload
  }
});

//specialization screen 

export const setSpecializationDetails = (id, type, image) => ({
  type: HalodocActions.SET_SELECTED_SPECIALIZATION_CATEGORY,
  payload: {
    id,
    type,
    image
  }
});

export const getDocCategories = () => ({
  context: screenNames.HALODOC_SPECIALIZATIONS,
  type: HalodocActions.DOC_SERVICE_HALO_DOC_GROUPS,
  payload: {
    toggleLoader: true
  }
});

export const resetCovidAssessmentDetails = () => ({
  type: HalodocActions.RESET_COVID_ASSESSMENT_DETAILS,
  payload: {
    coronaRiskFactor: null,
    category: null,
  },
})

//search screen 

export const haloDocSearch = (searchText, pageNo) => ({
  context: screenNames.HALODOC_DOCTOR_SEARCH,
  type: HalodocActions.DOC_SERVICE_HALO_DOC_SEARCH,
  payload: {
    body: {
      projs: null,
      limit: null,
      filter: {
        logicalExpression: null,
        simpleExpression: {
          lhs: ["getAllDoctors", "search_text"],
          op: "EQ",
          value: {
            value: ["getAllDoctors", searchText],
          },
        },
      },
      limit: null,
      orderBy: null,
      toggleLoader: true,
    },
    pageNo: pageNo,
  },
})

export const resetSearchResults = () => ({
  type: HalodocActions.RESET_SEARCH_RESULTS
})

export const addRecentSearchItem = recentSearchItem => ({
  type: HalodocActions.ADD_RECENT_SEARCH_ITEM,
  payload: {
    recentSearchItem,
  },
})

export const setConsultationDocObject = docObject => ({
  type: HalodocActions.SET_CALL_DOC_OBJECT,
  payload: {
    docObject,
  },
})


//info screen 

export const resetBookingStatus = () => ({
  type: HalodocActions.RESET_BOOKING_STATUS,
})

export const resetRoomDetails = () => ({
  type: HalodocActions.RESET_ROOM_DETAILS,
})

export const resetAppointmentStatus = () => ({
  type: HalodocActions.RESET_APPOINTMENT_REQUEST_STATUS,
})

export const takeDocAppointment = body => ({
  context: screenNames.HALODOC_DOCTOR_INFO,
  type: HalodocActions.DOC_SERVICE_HALO_DOC_APPOINTMENT,
  payload: {
    ...body,
    toggleLoader: true,
  },
})


export const confirmDocAppointment = consultation_id => ({
  context: screenNames.HALODOC_DOCTOR_INFO,
  type: HalodocActions.DOC_SERVICE_HALO_DOC_CONFIRM_APPOINTMENT,
  payload: {
    consultation_id,
    toggleLoader: true,
  },
})


export const updateDoctorAppointment = (body, consultationId) => ({
  context: screenNames.HALODOC_DOCTOR_INFO,
  type: HalodocActions.DOC_SERVICE_HALO_DOC_UPDATE_DOCTOR_APPOINTMENT,
  payload: {
    body,
    consultationId,
  },
})


//payment screen 

export const addPromoCode = (promoCode, consultationId) => ({
  context: screenNames.HALODOC_DOCTOR_INFO,
  type: HalodocActions.HALODOC_ADD_PROMOCODE,
  payload: {
    promoCode,
    consultationId
  }
})

export const removePromoCode = (promoCode, consultationId) => ({
  context: screenNames.HALODOC_DOCTOR_INFO,
  type: HalodocActions.HALODOC_REMOVE_PROMOCODE,
  payload: {
    promoCode,
    consultationId
  }
})

export const gotoPaymentPage = (consultationId) => ({
  context: screenNames.HALODOC_DOCTOR_INFO,
  type: HalodocActions.FETCH_CONSULTATION_PAYMENT_URL,
  payload: {
    consultationId,
    paymentMethod: "card"
  }
})

export const setAmountPayable = (totalAmountPayable) => ({
  type: HalodocActions.SET_TOTAL_AMOUNT_PAYABLE,
  payload: {
    totalAmountPayable
  }
})

export const resetPromoCodeStatus = () => ({
  type: HalodocActions.RESET_PROMOCODE_STATUS,
})

export const resetPaymentStatus = () => ({
  type: HalodocActions.RESET_PAYMENT_STATUS
})

//payment webview 

export const checkConsultationPaymentStatus = (params) => ({
  context: screenNames.HALODOC_DOCTOR_INFO,
  type: HalodocActions.HALODOC_CONSULTATION_PAYMENT_STATUS,
  payload: {
    consultationId: params.consultationId,
    body: params.body
  }
})

//consultation screen 

export const getImageData = payload => ({
  context: screenNames.MY_DOC_CHAT_SCREEN,
  type: HalodocActions.MYDOC_GET_IMG_BASE,
  payload: {
    value: payload
  }
})

export const setFile = params => ({
  context: screenNames.HALODOC_CONSULTATION,
  type: HalodocActions.HALODOC_SEND_CHAT_ATTACHMENT,
  payload: {
    content: params.content,
    consultationId: params.consultationId,
    toggleLoader: true,
    filename: params.filename,
  }
})

export const getConsultationById = consultationId => ({
  context: screenNames.HALODOC_CONSULTATION,
  type: HalodocActions.GET_CONSULTATION_BY_ID,
  payload: {
    consultationId,
    toggleLoader: true
  }
})

export const gotoVoiceCallScreen = (docObject, roomDetails) => ({
  type: HalodocActions.GO_TO_SCREEN,
  navigateTo: screenNames.HALODOC_VOICE_CALL,
  payload: {
    params: {
      docObject,
      roomDetails
    }
  }
})

export const gotoVideoScreen = (docObject, roomDetails) => ({
  type: HalodocActions.GO_TO_SCREEN,
  navigateTo: screenNames.HALODOC_VIDEO_CALL,
  payload: {
    params: {
      docObject,
      roomDetails
    }
  }
})

export const setConsultationStatus = () => ({
  type: HalodocActions.SET_CONSULTATION_STATUS,
  payload: {
    isConsultationInProgress: true
  }
})

//   List Screen



export const getFilteredDocList = value => ({
  context: screenNames.HALODOC_DOCTORLIST,
  type: HalodocActions.DOC_SERVICE_HALO_DOC_FILTER,
  payload: {
    value,
    toggleLoader: true,
  },
})

export const gotoDocInfoScreenfromListScreen = (coronaRiskFactor, category) => ({
  type: HalodocActions.GO_TO_SCREEN,
  navigateTo: screenNames.HALODOC_DOCTOR_INFO,
  payload: {
    params: { coronaRiskFactor, category },
  },
})

//   video

export const sendCallStartMessageVideo = (payload) => ({
  context: screenNames.HALODOC_VIDEO_CALL,
  type: HalodocActions.HALODOC_SEND_AV_CALL_START_MESSAGE,
  payload: {
    ...payload
  }
});

export const sendCallEndMessageVideo = (payload) => ({
  context: screenNames.HALODOC_VIDEO_CALL,
  type: HalodocActions.HALODOC_SEND_AV_CALL_END_MESSAGE,
  payload: {
    ...payload
  }
});


export const fetchRoomDetailsFromNotifcaiton = roomDetails => ({
  type: HalodocActions.UPDATE_ROOM_DETAILS_INSTORE,
  payload: {
    ...roomDetails
  }
});


export const setVideoCallStatus = isVideoCallInProgress => ({
  type: HalodocActions.SET_VIDEO_CALL_STATUS,
  payload: {
    isVideoCallInProgress
  }
});

export const gotoConsultationScreenVideo = docObject => ({
  type: HalodocActions.GO_TO_SCREEN,
  navigateTo: HalodocActions.HALODOC_CONSULTATION,
  payload: {
    params: {
      docObject,
      showJoinCall: false,
    }
  }
});

export const haloDocChatVideo = body => ({
  context: screenNames.HALODOC_VIDEO_CALL,
  type: HalodocActions.DOC_SERVICE_HALO_DOC_CHAT,
  payload: {
    ...body
  }
});

//   voice

export const sendCallStartMessageVoice = payload => ({
  context: screenNames.HALODOC_VOICE_CALL,
  type: HalodocActions.HALODOC_SEND_AV_CALL_START_MESSAGE,
  payload: {
    ...payload
  }
});

export const sendCallEndMessageVoice = payload => ({
  context: screenNames.HALODOC_VOICE_CALL,
  type: HalodocActions.HALODOC_SEND_AV_CALL_END_MESSAGE,
  payload: {
    ...payload
  }
});


export const setAudioCallStatus = isAudioCallInProgress => ({
  type: HalodocActions.SET_AUDIO_CALL_STATUS,
  payload: {
    isAudioCallInProgress
  }
});

export const gotoConsultationScreenVoice = (docObject) => ({
  type: HalodocActions.GO_TO_SCREEN,
  navigateTo: screenNames.HALODOC_CONSULTATION,
  payload: {
    params: {
      docObject,
      switchToVideo: true,
      showJoinCall: false,
    }
  }
});

export const haloDocChatVoice = body => ({
  context: screenNames.HALODOC_VOICE_CALL,
  type: HalodocActions.DOC_SERVICE_HALO_DOC_CHAT,
  payload: {
    ...body
  }
});


export const loadTermsAndCondition = source => ({
  context: "LOAD_TNC_AND_PRIVACY_POLICY",
  type: "TncandPrivacyPolicy/getTnCandPrivacyPolicy",
  payload: {
      source,
      value: "TermAndConditions",
  },
})

export const loadPrivacypolicy = source => ({
  context: "LOAD_TNC_AND_PRIVACY_POLICY",
  type: "TncandPrivacyPolicy/getTnCandPrivacyPolicy",
  payload: {
      source,
      value: "PrivacyPolicy",
  },
})

