
import { screenNames } from "./configs/screenNames"
import {
    DOC_SERVICE_TNC_ACCEPTED,
    DOC_SERVICE_VERFIY_OTP_SUCCESS,
    DOC_SERVICE_VERFIY_OTP_FAILURE,
    DOC_SERVICE_REGISTER_PATIENT_SUCCESS,
    DOC_SERVICE_REGISTER_PATIENT_FAILURE,
    DOC_SERVICE_VERIFY_PHONE,
    LOGOUT_DONE,
    DOC_SERVICE_VERIFY_OTP_CANCEL,
    RESET_REGISTRATION_STATUS,
    RESET_REGISTRATION_PHONE_UPDATED_STATUS,
    RESET_BOOKING_STATUS,
    SET_CONSULTATION_STATUS,
    SET_AUDIO_CALL_STATUS,
    SET_VIDEO_CALL_STATUS,
    SET_CALL_DOC_OBJECT,
    RESET_ROOM_DETAILS,
    RESET_SEARCH_RESULTS,
    RESET_HALO_DOC_CALL_ITEMS,
    RESET_CONSULTATION_HISTORY_LIST_RESULTS,
    RESET_JOIN_CALL_DOC_OBJECT,
    ADD_RECENT_SEARCH_ITEM,
    DOC_SERVICE_INITIALIZE_DATA,
    DOC_SERVICE_RESEND_OTP,
    INITIALIZE_DATA,
    DOC_SERVICE_CLEAN_STATE,
    INIT_NOT_REGISTERED,
    DOC_SERVICE_HALO_DOC_GROUPS_SUCCESS,
    DOC_SERVICE_HALO_DOC_GROUPS_FAILURE,
    GET_CONSULTATION_HISTORY_SUCCESS,
    GET_CONSULTATION_HISTORY_FAILURE,
    DOC_SERVICE_HALO_DOC_FILTER_SUCCESS,
    DOC_SERVICE_HALO_DOC_FILTER_FAILURE,
    DOC_SERVICE_HALO_DOC_APPOINTMENT_SUCCESS,
    DOC_SERVICE_HALO_DOC_APPOINTMENT_FAILURE,
    DOC_SERVICE_HALO_DOC_CONFIRM_APPOINTMENT_SUCCESS,
    DOC_SERVICE_HALO_DOC_CONFIRM_APPOINTMENT_FAILURE,
    DOC_SERVICE_HALO_DOC_SEARCH_FAILURE,
    DOC_SERVICE_HALO_DOC_SEARCH_SUCCESS,
    DOC_SERVICE_HALO_DOC_CHAT_SUCCESS,
    DOC_SERVICE_HALO_DOC_CHAT_FAILURE,
    FETCH_CONSULTATION_PAYMENT_URL_SUCCESS,
    FETCH_CONSULTATION_PAYMENT_URL_FAILURE,
    RESET_PROMOCODE_STATUS,
    RESET_PAYMENT_STATUS,
    SET_SELECTED_SPECIALIZATION_CATEGORY,
    SET_TOTAL_AMOUNT_PAYABLE,
    RESET_APPOINTMENT_REQUEST_STATUS,
    HALODOC_ADD_PROMOCODE_SUCCESS,
    HALODOC_ADD_PROMOCODE_FAILURE,
    HALODOC_REMOVE_PROMOCODE_SUCCESS,
    HALODOC_REMOVE_PROMOCODE_FAILURE,
    FETCH_HALODOC_CONSULTATION_DATA_SUCCESS,
    FETCH_HALODOC_CONSULTATION_DATA_FAILURE,
    GET_CONSULTATION_BY_ID_SUCCESS,
    GET_CONSULTATION_BY_ID_JOIN_CALL_SUCCESS,
    GET_CONSULTATION_BY_ID_JOIN_CALL_FAILURE,
    UPDATE_ROOM_DETAILS_INSTORE,
    DOC_SERVICE_DOCTOR_AVAILABILITY_STATUS,
    RESET_CONVERSATION_MESSAGES,
    GET_CONVERSATION_MESSAGES_FAILURE,
    GET_CONVERSATION_MESSAGES_SUCCESS,
    HALODOC_SEND_AV_CALL_START_MESSAGE_SUCCESS,
    HALODOC_SEND_AV_CALL_START_MESSAGE_FAILURE,
    HALODOC_SEND_AV_CALL_END_MESSAGE_SUCCESS,
    HALODOC_SEND_AV_CALL_END_MESSAGE_FAILURE,
    HALODOC_SERVICE_VERFIY_PHONE_SUCCESS,
    HALODOC_SERVICE_VERFIY_PHONE_FAILURE,
    DOC_SERVICE_RESEND_OTP_SUCCESS,
    DOC_SERVICE_RESEND_OTP_FAILURE,
    DOC_SERVICE_UPDATE_PHONE_SUCCESS,
    DOC_SERVICE_UPDATE_PHONE_FAILURE,
    GET_CONSULTATION_STATUS_SUCCESS,
    GET_CONSULTATION_STATUS_FAILED,
    RESET_CONSULTATION,
    CHECK_HALODOC_INVITATION_SUCCESS,
    CHECK_HALODOC_INVITATION_FAILURE,
    CHECK_MED_DEL_INVITATION_SUCCESS,
    CHECK_MED_DEL_INVITATION_FAILURE,
    CHECK_COVID_AVAILABILITY_SUCCESS,
    CHECK_COVID_AVAILABILITY_FAILURE,
    SET_COVID_ASSESSMENT_DETAILS,
    RESET_COVID_ASSESSMENT_DETAILS,
    RESET_CONSULTATION_ID

} from "./configs/actionNames";
import { path } from 'ramda'
import {
    CoreConstants,
} from "@pru-rt-internal/pulse-common";
import { from } from "rxjs";

const {
    ConsultationStatus,
    RegistrationStatus,
} = CoreConstants;

const INITIAL_CONSULTATION_STATE = {
    openTokSession: {
        sessionId: null,
        apiKey: null,
        token: null,
    },
    userFeedback: {
        rating: null,
    },
    symptoms: [],
    availableDoctors: [],
    appointmentDate: null,
    caseFiles: [],
    file: "",
    labReports: [],
    labReportDetails: [],
    emergencyInfo: {
        allergies: [],
        contactInfo: {
            id: null,
            phone: null,
            firstName: "",
            middleName: "",
        },
    },
    upcomingAppointments: [],
};

export const INITIAL_STATE = {
    registrationStatus: RegistrationStatus.NOT_REGISTERED,
    consultationStatus: ConsultationStatus.INIT,
    mobileNumber: null,
    workflowId: null,
    consultation: INITIAL_CONSULTATION_STATE,
    lastRequestTimestamp: null,
    consultationId: null,
    caseFiles: [],
    file: "",
    isAddedToCalendar: false,
    labReports: [],
    labReportDetails: [],
    emergencyInfo: {
        allergies: [],
        contactInfo: {
            id: null,
            phone: null,
            firstName: "",
        },
    },
    paymentConfirmation: {
        refNo: null,
        serviceId: null,
        paymentStatus: null,
    },
    pricing: {},
    upcomingAppointments: [],
    preConsultationQuestions: { questions: [] },
    emergencyQuestions: { EmergencyConditions: "" },
    orderRef: "",
    episodeId: "",
    doctorId: "",
    doctorName: "",
    error: "",
    categoryList: [],
    categoryListError: null,
    docFilterListError: null,
    filteredDocList: [],
    phoneVerified: false,
    appointmentRequestError: null,
    appointmentRequestSuccess: null,
    haloDocRecentSearches: [],
    haloDocSearchResult: null,
    haloDocSearchError: null,
    appointmentData: null,
    isDoctorConfirmedAppointment: false,
    roomId: "",
    token: "",
    halodocUserId: "",
    halodocAccessToken: "",
    chatRoomId: "",
    consultationList: null,
    consultationListError: null,
    joinCallDocObject: null,
    joinCallDocError: false,
    callUid: "",
    isConsultationInProgress: false,
    isConsultationCheckError: false,
    isAudioCallInProgress: false,
    isVideoCallInProgress: false,
    docObject: null,
    consultationHistoryChat: [],
    consultationHistoryChatHasMore: false,
    isPhoneUpdated: false,
    consultationStatusForHealthCard: "",
    halodocInvite: false,
    applyPromoCodeStatus: null,
    applyPromoCodeMessage: null,
    removePromoCodeStatus: null,
    removePromoCodeMessage: null,
    paymentUrl: null,
    fetchPaymentUrlError: false,
    fetchPaymentUrlErrorMsg: null,
    consultationData: null,
    consultationDataError: null,
    getDoctorAppointmentStatus: false,
    specializationCategoryId: null,
    specializationCategoryImage: null,
    specializationCategoryType: null,
    payment_reference_id: null,
    totalAmountPayable: 0,
    medDelInvite: false,
    covidAvailability: false,
    coronaAssessment: {
        coronaRiskFactor: null,
        category: null,
    },
};


const haloDocReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_CONSULTATION_STATUS_SUCCESS: {
            const body = path(["payload", "result", "response", "body"], action);
            const isConsultationInProgress = body && body.length > 0 ? true : false;
            return {
                ...state,
                isConsultationInProgress,
                isConsultationCheckError: false,
                consultationId:
                    body && body.length > 0 ? body[0].id : state.consultationId,
                consultationStatusForHealthCard:
                    body && body.length > 0 ? body[0].status : "",
            };
        }

        case GET_CONSULTATION_STATUS_FAILED: {
            return {
                ...state,
                isConsultationCheckError: true,
            };
        }

        case RESET_CONSULTATION: {
            return {
                ...state,
                isConsultationInProgress: null,
                isConsultationCheckError: null,
            };
        }
        case RESET_CONSULTATION_ID: {
            return {
                ...state,
                consultationId: ""
            };
        }

        case RESET_REGISTRATION_STATUS: {
            return {
                ...state,
                registrationStatus: action.payload.registrationStatus,
                workflowId: null,
            };
        }
        case DOC_SERVICE_VERFIY_OTP_SUCCESS: {
            return {
                ...state,
                registrationStatus: RegistrationStatus.PHONE_OTP_VERIFIED,
                error: null,
            };
        }
        case DOC_SERVICE_VERFIY_OTP_FAILURE: {
            return {
                ...state,
                registrationStatus: RegistrationStatus.TNC_ACCEPTED,
                error: action.payload.errorMsg,
            };
        }

        case DOC_SERVICE_RESEND_OTP_SUCCESS: {
            return {
                ...state,
                registrationStatus: RegistrationStatus.PHONE_OTP_VERIFIED,
                error: null,
            };
        }
        case DOC_SERVICE_RESEND_OTP_FAILURE: {
            return {
                ...state,
                registrationStatus: RegistrationStatus.PHONE_OTP_VERIFIED,
                error: null,
            };
        }

        case HALODOC_SERVICE_VERFIY_PHONE_SUCCESS: {
            return {
                ...state,
                workflowId: action.payload.workflowId,
                phoneVerified: true,
                registrationStatus: action.payload.registrationStatus,
                error: null,
            };
        }

        case HALODOC_SERVICE_VERFIY_PHONE_FAILURE: {
            return {
                ...state,
                phoneVerified: false,
                error: {
                    form: action.payload.errorMsg,
                },
            };
        }

        case DOC_SERVICE_UPDATE_PHONE_SUCCESS: {
            return {
                ...state,
                isPhoneUpdated: true,
                error: null,
            };
        }

        case DOC_SERVICE_UPDATE_PHONE_FAILURE: {
            return {
                ...state,
                isPhoneUpdated: false,
                error: {
                    form: action.payload.errorMsg,
                },
            };
        }

        case RESET_REGISTRATION_PHONE_UPDATED_STATUS: {
            return {
                ...state,
                isPhoneUpdated: false,
            };
        }

        case DOC_SERVICE_RESEND_OTP: {
            return {
                ...state,
                error: null,
            };
        }
        case DOC_SERVICE_CLEAN_STATE: {
            return {
                ...INITIAL_STATE,
            };
        }

        case DOC_SERVICE_REGISTER_PATIENT_SUCCESS: {
            return {
                ...state,
                registrationStatus: RegistrationStatus.REGISTERED,
                error: null,
            };
        }
        case DOC_SERVICE_REGISTER_PATIENT_FAILURE: {
            return {
                ...state,
                workflowId: null,
                registrationStatus: RegistrationStatus.TNC_ACCEPTED,
                error: {
                    form: action.payload.errorMsg,
                },
            };
        }
        case DOC_SERVICE_VERIFY_PHONE: {
            return {
                ...state,
                mobileNumber: action.payload.mobileNumber,
                registrationStatus: RegistrationStatus.TNC_ACCEPTED,
            };
        }
        case RESET_PROMOCODE_STATUS: {
            return {
                ...state,
                applyPromoCodeStatus: null,
                applyPromoCodeMessage: null,
                removePromoCodeStatus: null,
                removePromoCodeMessage: null,
            };
        }
        case SET_TOTAL_AMOUNT_PAYABLE: {
            return {
                ...state,
                totalAmountPayable: action.payload.totalAmountPayable,
            };
        }
        case SET_SELECTED_SPECIALIZATION_CATEGORY: {
            return {
                ...state,
                specializationCategoryId: action.payload.id,
                specializationCategoryImage: action.payload.image,
                specializationCategoryType: action.payload.type,
            };
        }
        case HALODOC_ADD_PROMOCODE_SUCCESS: {
            return {
                ...state,
                applyPromoCodeStatus: "SUCCESS",
                applyPromoCodeMessage: action.payload.message,
                removePromoCodeStatus: null,
                removePromoCodeMessage: null,
            };
        }
        case HALODOC_ADD_PROMOCODE_FAILURE: {
            return {
                ...state,
                applyPromoCodeStatus: "FAILURE",
                applyPromoCodeMessage: action.payload.message,
                removePromoCodeStatus: null,
                removePromoCodeMessage: null,
            };
        }
        case HALODOC_REMOVE_PROMOCODE_SUCCESS: {
            return {
                ...state,
                applyPromoCodeStatus: null,
                applyPromoCodeMessage: null,
                removePromoCodeStatus: "SUCCESS",
                removePromoCodeMessage: action.payload.message,
            };
        }
        case HALODOC_REMOVE_PROMOCODE_FAILURE: {
            return {
                ...state,
                removePromoCodeStatus: "FAILURE",
                removePromoCodeMessage: action.payload.message,
            };
        }
        case FETCH_HALODOC_CONSULTATION_DATA_SUCCESS: {
            return {
                ...state,
                consultationData: action.payload.data,
                consultationDataError: null,
            };
        }
        case FETCH_HALODOC_CONSULTATION_DATA_FAILURE: {
            return {
                ...state,
                consultationData: null,
                consultationDataError: action.payload.errorMessage,
            };
        }
        case RESET_PAYMENT_STATUS: {
            return {
                ...state,
                paymentUrl: null,
                payment_reference_id: null,
                fetchPaymentUrlError: false,
                fetchPaymentUrlErrorMsg: null,
            };
        }
        case FETCH_CONSULTATION_PAYMENT_URL_SUCCESS: {
            return {
                ...state,
                paymentUrl: action.payload.paymentLink,
                payment_reference_id: action.payload.payment_reference_id,
                fetchPaymentUrlError: false,
                fetchPaymentUrlErrorMsg: null,
            };
        }
        case FETCH_CONSULTATION_PAYMENT_URL_FAILURE: {
            return {
                ...state,
                paymentUrl: null,
                payment_reference_id: null,
                fetchPaymentUrlError: true,
                fetchPaymentUrlErrorMsg: action.payload.errorMessage,
            };
        }
        case DOC_SERVICE_HALO_DOC_GROUPS_FAILURE: {
            return {
                ...state,
                categoryListError: action.payload.errorMsg,
                categoryList: [],
            };
        }

        case DOC_SERVICE_HALO_DOC_FILTER_FAILURE: {
            return {
                ...state,
                docFilterListError: action.payload.errorMsg,
                filteredDocList: [],
            };
        }

        // todo need to change this after api working
        case DOC_SERVICE_HALO_DOC_SEARCH_FAILURE: {
            return {
                ...state,
                haloDocSearchResult: null,
                haloDocSearchError: action.payload.errorMsg,
            };
        }

        case DOC_SERVICE_HALO_DOC_SEARCH_SUCCESS: {
            return {
                ...state,
                haloDocSearchResult: {
                    catResult: state.categoryList,
                    docResult: [
                        ...state.haloDocSearchResult.docResult,
                        ...action.payload.body.result,
                    ],
                    next_page: action.payload.body.next_page,
                    isLoading: false,
                },
                haloDocSearchError: null,
            };
        }

        case RESET_BOOKING_STATUS: {
            return {
                ...state,
                appointmentRequestSuccess: null,
                appointmentRequestError: null,
                isDoctorConfirmedAppointment: false,
            };
        }

        case RESET_ROOM_DETAILS: {
            return {
                ...state,
                roomId: null,
                chatRoomId: null,
            };
        }

        case RESET_SEARCH_RESULTS: {
            return {
                ...state,
                haloDocSearchResult: {
                    catResult: [],
                    docResult: [],
                    next_page: false,
                    isLoading: true,
                },
                haloDocSearchError: null,
            };
        }

        case RESET_CONSULTATION_HISTORY_LIST_RESULTS: {
            return {
                ...state,
                consultationList: null,
                consultationListError: null,
            };
        }

        case RESET_JOIN_CALL_DOC_OBJECT: {
            return {
                ...state,
                joinCallDocObject: null,
                joinCallDocError: false,
            };
        }

        case SET_CONSULTATION_STATUS: {
            return {
                ...state,
                isConsultationInProgress: action.payload.isConsultationInProgress,
            };
        }

        case SET_AUDIO_CALL_STATUS: {
            return {
                ...state,
                isAudioCallInProgress: action.payload.isAudioCallInProgress,
                isVideoCallInProgress: false,
            };
        }

        case SET_VIDEO_CALL_STATUS: {
            return {
                ...state,
                isVideoCallInProgress: action.payload.isVideoCallInProgress,
                isAudioCallInProgress: false,
            };
        }

        case SET_CALL_DOC_OBJECT: {
            return {
                ...state,
                docObject: action.payload.docObject,
            };
        }

        case GET_CONVERSATION_MESSAGES_SUCCESS: {
            var consultationHistoryChat = [];
            if (action.payload.response.body == state.consultationHistoryChat) {
                consultationHistoryChat = [...action.payload.response.body];
            } else {
                consultationHistoryChat = action.payload.response.body
                    ? [...state.consultationHistoryChat, ...action.payload.response.body]
                    : [...state.consultationHistoryChat];
            }
            const consultationHistoryChatHasMore =
                path(["payload", "response", "has_more"], action) === true ? true : false;
            return {
                ...state,
                consultationHistoryChat,
                consultationHistoryChatHasMore,
            };
        }

        case GET_CONVERSATION_MESSAGES_FAILURE: {
            return {
                ...state,
                consultationHistoryChat: action.payload.errorMsg,
                consultationHistoryChatHasMore: false,
            };
        }

        case RESET_CONVERSATION_MESSAGES: {
            return {
                ...state,
                consultationHistoryChat: [],
            };
        }

        case RESET_HALO_DOC_CALL_ITEMS: {
            return {
                ...state,
                docObject: null,
                isVideoCallInProgress: false,
                isAudioCallInProgress: false,
                isConsultationInProgress: false,
            };
        }

        case ADD_RECENT_SEARCH_ITEM: {
            let haloDocRecentSearches = state.haloDocRecentSearches;
            haloDocRecentSearches = [
                action.payload.recentSearchItem,
                ...haloDocRecentSearches,
            ];
            haloDocRecentSearches = haloDocRecentSearches.filter(function (elem, pos) {
                return haloDocRecentSearches.indexOf(elem) == pos;
            });

            return {
                ...state,
                haloDocRecentSearches,
            };
        }

        case DOC_SERVICE_HALO_DOC_APPOINTMENT_FAILURE: {
            return {
                ...state,
                getDoctorAppointmentStatus: false,
                appointmentData: null,
                consultationData: null,
                consultationDataError: null,
                appointmentRequestSuccess: null,
                appointmentRequestError: action.payload.errorMsg,
            };
        }

        case DOC_SERVICE_HALO_DOC_CONFIRM_APPOINTMENT_FAILURE: {
            return {
                ...state,
                isDoctorConfirmedAppointment: true,
                getDoctorAppointmentStatus: false,
            };
        }

        case LOGOUT_DONE: {
            return {
                ...state,
                registrationStatus: RegistrationStatus.NOT_REGISTERED,
            };
        }
        case INIT_NOT_REGISTERED: {
            return {
                ...state,
                registrationStatus: RegistrationStatus.NOT_REGISTERED,
            };
        }

        case DOC_SERVICE_HALO_DOC_GROUPS_SUCCESS: {
            return {
                ...state,
                categoryList: action.payload.result,
                categoryListError: null,
            };
        }

        case DOC_SERVICE_HALO_DOC_FILTER_SUCCESS: {
            return {
                ...state,
                filteredDocList: action.payload.result.result,
                docFilterListError: null,
            };
        }

        case RESET_APPOINTMENT_REQUEST_STATUS: {
            return {
                ...state,
                appointmentRequestSuccess: null,
            };
        }

        case DOC_SERVICE_HALO_DOC_APPOINTMENT_SUCCESS: {

            if (action.payload.result) {
                const status =
                    action.payload && action.payload.result && action.payload.result.status
                        ? action.payload.result.status
                        : null;

                return {
                    ...state,
                    getDoctorAppointmentStatus: false,
                    appointmentData: action.payload.result,
                    consultationData: null,
                    consultationDataError: null,
                    appointmentRequestSuccess: status,
                    appointmentRequestError: status ? null : "Status Undefined",
                };
            } else {
                return {
                    ...state,
                    isDoctorConfirmedAppointment: false,
                }
            }

        }

        case DOC_SERVICE_HALO_DOC_CONFIRM_APPOINTMENT_SUCCESS: {
            return {
                ...state,
                isDoctorConfirmedAppointment: true,
                getDoctorAppointmentStatus: true,
            };
        }

        case DOC_SERVICE_HALO_DOC_CHAT_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }

        case UPDATE_ROOM_DETAILS_INSTORE: {
            return {
                ...state,
                token: action.payload.token,
                roomId: action.payload.callRoomId,
                chatRoomId: action.payload.chatRoomId,
                callUid: action.payload.callUid,
            };
        }

        case GET_CONSULTATION_BY_ID_SUCCESS: {
            return {
                ...state,
                chatRoomId: action.payload.chatRoomId,
            };
        }

        case GET_CONSULTATION_BY_ID_JOIN_CALL_SUCCESS: {
            return {
                ...state,
                joinCallDocObject: action.payload.docObject,
                chatRoomId: action.payload.chatRoomId,
                docObject: {
                    ...state.docObject,
                    ...action.payload.docObject.doctor,
                    ...action.payload.docObject.attributes,
                    ...action.payload.docObject.doctor.externalIds,
                },
                joinCallDocError: false,
            };
        }

        case GET_CONSULTATION_BY_ID_JOIN_CALL_FAILURE: {
            return {
                ...state,
                joinCallDocObject: null,
                joinCallDocError: true,
            };
        }

        case DOC_SERVICE_VERIFY_OTP_CANCEL: {
            return {
                ...state,
                workflowId: null,
                error: null,
            };
        }

        case GET_CONSULTATION_HISTORY_SUCCESS: {
            return {
                ...state,
                consultationList: consultData1.result,
                consultationListError: null,
            };
        }

        case GET_CONSULTATION_HISTORY_FAILURE: {
            return {
                ...state,
                consultationList: null,
                consultationListError: action.payload.errorMsg,
            };
        }

        case INITIALIZE_DATA: {
            return omit(["registrationStatus"], ...INITIAL_STATE);
        }
        case DOC_SERVICE_INITIALIZE_DATA: {
            return INITIAL_STATE;
        }
        case DOC_SERVICE_TNC_ACCEPTED: {
            return {
                ...state,
                registrationStatus: RegistrationStatus.TNC_ACCEPTED,
            };
        }
        case DOC_SERVICE_DOCTOR_AVAILABILITY_STATUS: {
            const isConsultationInProgress =
                action.payload.appointmentStatus === ConsultationStatus.IN_PROGRESS
                    ? true
                    : false;
            return {
                ...state,
                consultationStatus: action.payload.appointmentStatus,
                consultationId: action.payload.appointmentId,
                consultation: {
                    ...state.consultation,
                    doctorName: action.payload.doctorName,
                },
                isConsultationInProgress,
            };
        }
        case HALODOC_SEND_AV_CALL_START_MESSAGE_SUCCESS: {
            return {
                ...state,
            };
        }
        case HALODOC_SEND_AV_CALL_START_MESSAGE_FAILURE: {
            return {
                ...state,
            };
        }
        case HALODOC_SEND_AV_CALL_END_MESSAGE_SUCCESS: {
            return {
                ...state,
                chatRoomId: null,
            };
        }
        case HALODOC_SEND_AV_CALL_END_MESSAGE_FAILURE: {
            return {
                ...state,
            };
        }
        case CHECK_HALODOC_INVITATION_SUCCESS: {
            return {
                ...state,
                halodocInvite: true,
            };
        }
        case CHECK_HALODOC_INVITATION_FAILURE: {
            return {
                ...state,
                halodocInvite: false,
            };
        }
        case CHECK_MED_DEL_INVITATION_SUCCESS: {
            return {
                ...state,
                medDelInvite: true,
            };
        }
        case CHECK_MED_DEL_INVITATION_FAILURE: {
            return {
                ...state,
                medDelInvite: false,
            };
        }
        case CHECK_COVID_AVAILABILITY_SUCCESS: {
            return {
                ...state,
                covidAvailability: true,
            };
        }
        case CHECK_COVID_AVAILABILITY_FAILURE: {
            return {
                ...state,
                covidAvailability: false,
            };
        }
        case SET_COVID_ASSESSMENT_DETAILS: {
            return {
                ...state,
                coronaAssessment: {
                    coronaRiskFactor: action.payload.coronaRiskFactor,
                    category: action.payload.category,
                }
            }
        }
        case RESET_COVID_ASSESSMENT_DETAILS: {
            return {
                ...state,
                coronaAssessment: {
                    coronaRiskFactor: null,
                    category: null,
                },
            }
        }
        default:
            return state;


    }
};
export default haloDocReducer;