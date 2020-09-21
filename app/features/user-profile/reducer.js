import { CoreActionTypes, pageKeys } from "@pru-rt-internal/pulse-common";
const {
  CUSTOMER_DETAILS_FETCHED,
  FETCH_AIME,
  INITIALIZE_DATA,
  SET_RELATED_MEMBER_LIST,
  REMOVE_RELATED_MEMBER_LIST,
  UPDATE_RELATED_MEMBER_DOCUMENT,
  PROFILE_PICTURE_SAVED,
  ADD_TO_ACCEPTED_REQUEST,
  GET_ALL_RELATIONS,
  GET_ALL_RELATIONS_ERROR,
  GET_ALL_RELATIONS_SUCCESS,
  UPDATE_PROFILE_DETAILS,
  UPDATE_PROFILE_DETAILS_SUCCESS,
  UPDATE_PROFILE_DETAILS_ERROR,
  UPDATE_PROFILE_DETAILS_SUCCESS_NAVIGATE,
  GET_CUSTOMER_DETAILS_SUCCESS,
  REMOVE_RELATED_MEMBER_SUCCESS,
  UPDATE_CUSTOMER_CONNECT,
  UPDATE_CUSTOMER_CONNECT_SUCCESS,
  UPDATE_CUSTOMER_CONNECT_ERROR,
  DELETE_CUSTOMER_CONNECT_SUCCESS,
  UPDATE_DOCUMENTS_FOR_CONNECTED_MEMBERS_SUCCESS,
  UPDATE_PROFILE_DETAILS_NAVIGATE,
  LOGOUT_DONE,
  SET_WHETHER_PERMISSIONS,
  SET_ACCESS_DENIED,
  RESET_UPDATE_NOTIFICATION,
  SET_SELECTED_CALENDER,
} = CoreActionTypes;

import { assocPath, pathOr } from "ramda";

const INITIAL_STATE = {
  // userProfile: cleanUserData,
  updatingUser: false,
  updateUser: false,
  localUserDetails: {},
  aimeResponse: {},
  relationList: [],
  updatingConnects: false,
  loading: false,
  connectedList: [],
  isPermissions: false,
  isAccessDenied: false,
  updatingUserNotification: false,
  calenderSelected: "Gregorian",
};

import profileActions from "./actionNames";

const updateProfile = (state, action) => {
  if (action.type === profileActions.updateProfile) {
    const path = action.payload.key.split(".");
    const newState = assocPath(path, action.payload.value, state);

    if (path[0] === "mapAddress" || path[0] === "houseNo") {
      return {
        ...newState,
        address1:
          pathOr("", ["houseNo"], newState) +
          " " +
          pathOr("", ["mapAddress"], newState),
      };
    }
    return {
      ...newState,
    };
  }
};
// eslint-disable-next-line complexity
const reducers = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CUSTOMER_DETAILS_FETCHED:
      return { ...state, ...payload };
    case GET_CUSTOMER_DETAILS_SUCCESS:
      return { ...state, ...payload.customer };
    case FETCH_AIME: {
      const data = action.payload.content;

      const countryOutbreaks = [];
      const countryCases = [];

      data.forEach(stateData => {
        stateData.outbreaks.forEach((outbreakNumber, index) => {
          const countryOutBreakNumber =
            countryOutbreaks[index] === undefined
              ? outbreakNumber
              : countryOutbreaks[index] + outbreakNumber;
          countryOutbreaks[index] = countryOutBreakNumber;
        });

        stateData.cases.forEach((caseNumber, index) => {
          const countryCaseNumber =
            countryCases[index] === undefined
              ? caseNumber
              : countryCases[index] + caseNumber;
          countryCases[index] = countryCaseNumber;
        });
      });

      const countryObject = {
        name: "Vietnam",
        latitude: 14.0583,
        longitude: 108.2772,
        outbreaks: countryOutbreaks,
        cases: countryCases,
      };

      const dataWithCountry = [countryObject, ...data];
      return { ...state, aimeResponse: dataWithCountry };
    }
    case INITIALIZE_DATA:
      return INITIAL_STATE;
    case UPDATE_PROFILE_DETAILS:
      return {
        ...state,
        updatingUser: true,
        tips: true,
        updateConnects: false,
      };
    case UPDATE_PROFILE_DETAILS_SUCCESS:
      return {
        ...state,
        updatingUser: false,
        updateConnects: false,
      };
    case UPDATE_PROFILE_DETAILS_NAVIGATE:
      return {
        ...state,
        updatingUser: true,
        tips: true,
      };
    case UPDATE_PROFILE_DETAILS_SUCCESS_NAVIGATE:
      return {
        ...state,
        updatingUser: false,
        updateConnects: false,
        updatingUserNotification: true,
      };
    case UPDATE_PROFILE_DETAILS_ERROR:
      return { ...state, updatingUser: false };
    case GET_ALL_RELATIONS:
      return { ...state, loading: true };
    case GET_ALL_RELATIONS_SUCCESS:
      return {
        ...state,
        relationList: payload.connectedMembers || [],
        loading: false,
      };
    case GET_ALL_RELATIONS_ERROR:
      return { ...state, loading: false };
    case SET_RELATED_MEMBER_LIST:
      return { ...state, connectedList: payload };
    case UPDATE_DOCUMENTS_FOR_CONNECTED_MEMBERS_SUCCESS:
      return { ...state, connectedList: payload.connectedList };
    case REMOVE_RELATED_MEMBER_LIST: {
      const connectedList = state.connectedList.filter(
        list => list.id !== payload
      );
      return { ...state, connectedList };
    }
    case REMOVE_RELATED_MEMBER_SUCCESS: {
      const connectedList = state.connectedList.filter(
        list => list.id !== payload.actionPayload.relationId
      );
      return { ...state, connectedList };
    }
    case DELETE_CUSTOMER_CONNECT_SUCCESS: {
      const connectedList = state.connectedList.filter(
        list => list.connectId !== payload.actionPayload.connectId
      );
      return {
        ...state,
        connectedList,
        updateConnects: true,
      };
    }
    case UPDATE_RELATED_MEMBER_DOCUMENT: {
      const connectedList = state.connectedList.filter(list => {
        if (
          list.documents &&
          list.documents[list.documents.length - 1].id == payload.id
        ) {
          return (list["profilePicture"] = payload.content);
        }
        return list;
      });
      return { ...state, connectedList };
    }
    case PROFILE_PICTURE_SAVED:
      return {
        ...state,
        profilePicture: payload.profilePicture,
      };
    case ADD_TO_ACCEPTED_REQUEST: {
      const tempConnectedList = state.connectedList;
      tempConnectedList.push(payload);
      return { ...state, connectedList: tempConnectedList };
    }
    case UPDATE_CUSTOMER_CONNECT:
      return { ...state, updatingConnects: true };
    case UPDATE_CUSTOMER_CONNECT_SUCCESS:
      return {
        ...state,
        updatingConnects: false,
        connectResponse: payload,
      };
    case UPDATE_CUSTOMER_CONNECT_ERROR:
      return { ...state, updatingConnects: false, connectError: payload };
    case LOGOUT_DONE:
      return INITIAL_STATE;
    case SET_WHETHER_PERMISSIONS:
      return { ...state, isPermissions: payload };
    case SET_ACCESS_DENIED:
      return { ...state, isAccessDenied: payload };
    case RESET_UPDATE_NOTIFICATION:
      return { ...state, updatingUserNotification: false };
    case SET_SELECTED_CALENDER:
      return { ...state, calenderSelected: payload.calender };
    case "updateFullCustomerSuccess": {
      return { ...state }
    }
    case "updateFullCustomerFailure": {
      return { ...state }
    }
    default:
      return state;
  }
};

export default (state = INITIAL_STATE, action) => {
  return updateProfile(state, action) || reducers(state, action);
};
