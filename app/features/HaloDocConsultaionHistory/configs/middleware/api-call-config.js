import { screenNames } from "../screenNames"
import * as HalodocActions from "../actionNames"
import { CoreActionTypes, CoreConfig } from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;
import { buildPayload, buildPayloadWithAccessToken } from "../../../../utils/apiUtils";
import {
  GET_CONSULTATION_HISTORY,
  GET_CONSULTATION_BY_ID,
  GET_CONVERSATION_MESSAGES,
  FETCH_CONSULTATION_DOCUMENTS_BY_CRITERIA
} from '../actionNames'


//DOC SERVICE SPECIFIC
const getDocServiceParams = store => {
  const state = store.getState();
  return {
    id: state.auth.email,
    realm: "doctor",
  };
};

const consultationHistoryApiCall = {
  [screenNames.CONSULTATION_HISTORY_LIST]: {
    [GET_CONSULTATION_HISTORY]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          pageSize: 20,
          pageNumber: action.payload.pageNumber,
          statuses: "started,closed,requested,completed",
        };
        return buildPayload(store, "getAllConsultations", null, null, params);
      },
    },

    [GET_CONSULTATION_BY_ID]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          id: action.payload.consultationId,
        };
        return buildPayload(store, "getConsultationById", null, null, params);
      },
    },

    [GET_CONVERSATION_MESSAGES]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
          convId: action.payload.convId,
          page: action.payload.page,
          page_size: action.payload.page_size,
        };
        return buildPayload(
          store,
          "getConversationMessages",
          null,
          null,
          params
        );
      },
    },
    [FETCH_CONSULTATION_DOCUMENTS_BY_CRITERIA]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "doctor",
        };

        const body = {
          filter: {
            simpleExpression: {
              lhs: ["ConsultationId", "type"],
              op: "EQ",
              value: {
                value: [action.payload.id, action.payload.type],
              },
            },
          },
        };
        return buildPayload(
          store,
          "findDocumentsByCriteria",
          null,
          body,
          params
        );
      },
    },
  },
}


export default consultationHistoryApiCall;