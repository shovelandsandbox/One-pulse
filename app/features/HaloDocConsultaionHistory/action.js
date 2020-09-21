import { screenNames } from "./configs/screenNames"
import * as consultationHistoryActions from "./configs/actionNames"
import { CoreActionTypes, CoreConstants, CoreConfig } from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;

const {
    RegistrationStatus
} = CoreConstants;

export const getList = (pageNumber, payload) => ({
    context: screenNames.CONSULTATION_HISTORY_LIST,
    type: consultationHistoryActions.GET_CONSULTATION_HISTORY,
    payload: {
        access_token: payload,
        toggleLoader: true,
        pageNumber: pageNumber,
    },
})

export const resetChatHistory = () => ({
    type: consultationHistoryActions.RESET_CONVERSATION_MESSAGES
})

export const getConsultationMessages = (consultationID, page) => ({
    context: screenNames.CONSULTATION_HISTORY_LIST,
    type: consultationHistoryActions.GET_CONVERSATION_MESSAGES,
    payload: {
        convId: consultationID,
        page: page,
        page_size: 50,
        toggleLoader: true
    }
})

export const findDocumentsByCriteria = (consultationId, type) => ({
    context: screenNames.CONSULTATION_HISTORY_LIST,
    type: consultationHistoryActions.FETCH_CONSULTATION_DOCUMENTS_BY_CRITERIA,
    payload: {
        id: consultationId,
        type,
        toggleLoader: true,
    },
})

export const resetHaloDocProfile = () => ({
    type: consultationHistoryActions.RESET_HALO_DOC_PROFILE,
})

