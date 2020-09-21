import { Alert } from "react-native";
import moment from "moment";
import { path, pathOr } from "ramda";
import Toast from "react-native-root-toast";
import _ from "lodash";

import {
  CoreConfig,
  CoreConstants,
  CoreActionTypes,
} from "@pru-rt-internal/pulse-common";
import * as ActionTypes from "../actions/Types";

const { pageKeys } = CoreConfig;
const { ConsultationType } = CoreConstants;

const doctorAppointmentAlert = (state, payload, type) => {
  // eslint-disable-next-line complexity
  return new Promise((resolve, reject) => {
    //if user is logged out
    if (!state.auth.isLoggedIn) {
      resolve();
      return;
    }
    if (
      state.doctorServices.callType !== ConsultationType.AUDIO_CHAT ||
      payload.response.status.code !== 0
    ) {
      resolve();
      return;
    }

    const displayText = "Appointment request sent. Doctor may call you shortly";
    Toast.show(displayText, {
      duration: 2000,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });

    resolve();
  });
};

const middlewareConfig = {
  [pageKeys.DOC_SERVICE_REGISTER]: {
    [CoreActionTypes.DOC_SERVICE_VERIFY_OTP]: {
      successAction: CoreActionTypes.DOC_SERVICE_VERFIY_OTP_SUCCESS,
      failureAction: CoreActionTypes.DOC_SERVICE_VERFIY_OTP_FAILURE,
      failureHook: () => {
        return {
          // errorMsg: "Invalid OTP",
          errorMsg: "Invalid Code",
        };
      },
      toggleLoader: false,
    },

    [CoreActionTypes.DOC_SERVICE_REGISTER_PATIENT]: {
      successAction: CoreActionTypes.DOC_SERVICE_REGISTER_PATIENT_SUCCESS,
      failureAction: CoreActionTypes.DOC_SERVICE_REGISTER_PATIENT_FAILURE,
      toggleLoader: false,
      dispatchActions: payload => {
        const actions = [];
        const phone = payload.actionPayload.phone.split("-")[1];
        console.log(
          payload,
          "DOC_SERVICE_REGISTER_PATIENT dispatchActionsdispatchActions"
        );
        console.log("phone dispatchActionsdispatchActions", phone);
        const userProfile = {
          surName: payload.actionPayload.surName,
          firstName: payload.actionPayload.firstName,
          sex: payload.actionPayload.sex,
          addressDetails: {
            address: {
              line1: payload.actionPayload.street,
              city: payload.actionPayload.city,
              zipcode: payload.actionPayload.zipcode,
              country: payload.actionPayload.countryName,
            },
          },
          contactDetails: {
            phone: {
              channel: "PHONE",
              value: phone,
            },
            email: {
              channel: "EMAIL",
              value: payload.actionPayload.email,
            },
          },
          dob: moment(payload.actionPayload.dob).format("DD-MM-YYYY"),
        };
        actions.push({
          context: pageKeys.DOC_SERVICE_REGISTER,
          type: CoreActionTypes.DOC_NRIC,
          payload: {
            NRICID: payload.actionPayload.NRICID,
          },
        });
        actions.push({
          context: pageKeys.PROFILE,
          type: CoreActionTypes.UPDATE_PROFILE_DETAILS_NAVIGATE_DOC_REG,
          payload: {
            userProfile,
          },
        });
        return actions;
      },
      postSuccessHook: payload => ({
        docServiceToken: payload.response.doctor_token,
      }),
      failureHook: () => {
        return {
          errorMsg: "Please verify your phone number again",
        };
      },
    },
    [CoreActionTypes.DOC_NRIC]: {
      successAction: CoreActionTypes.DOC_NRIC_SUCCESS,
      dispatchActions: payload => {
        return [
          {
            context: pageKeys.PROFILE,
            type: CoreActionTypes.GET_CUSTOMER_DETAILS_1,
          },
        ];
      },
      failureAction: CoreActionTypes.DOC_NRIC_FAILURE,
    },
  },
  [pageKeys.DOCTOR_PROFILE]: {
    [ActionTypes.GET_DOCTOR_PROFILE]: {
      successAction: ActionTypes.GET_DOCTOR_PROFILE_SUCCESS,
      postSuccessHook: payload => ({
        payload: payload.response.body,
      }),
      failureAction: ActionTypes.GET_DOCTOR_PROFILE_FAILURE,
      failureHook: () => {
        alert("Unable to find the doctor details");
      },
      toggleLoader: false,
    },
    loader: true,
  },
  [pageKeys.DOC_SERVICE_LANDING]: {
    [CoreActionTypes.DOC_SERVICE_GET_EMERGENCY_INFO]: {
      successAction: CoreActionTypes.DOC_SERVICE_GET_EMERGENCY_INFO_SUCCESS,
      postSuccessHook: payload => {
        const body = path(["response", "body"], payload) || {};
        // const body = payload && payload.response && payload.response.hasOwnProperty("body")
        //   ? payload.response.body
        //   : {};
        let id = null;
        let phone = "";
        let firstName = "";
        let allergies = [];
        let attributes = "";
        let middleName = "";
        let medicalHistory = "";

        const relations = body.relations && body.relations[0];

        if (relations) {
          id = relations.id;
          phone = relations.customer.contactDetails.phone.value;
          firstName = relations.customer.surName;
          middleName = relations.customer.middleName;
          allergies = body.lifestyle.allergies;
          attributes =
            body.lifestyle.attributes && body.lifestyle.attributes.medications;
          medicalHistory =
            (body.lifestyle.medicalHistory &&
              body.lifestyle.medicalHistory.length > 0 &&
              body.lifestyle.medicalHistory.map(item => item.name)) ||
            [];
        }
        return {
          allergies: allergies,
          contactInfo: { id, phone, firstName, middleName },
          attributes,
          medicalHistory,
          // doctorToken: payload.response["doctor_token"],
        };
      },
      failureAction: CoreActionTypes.DOC_SERVICE_GET_EMERGENCY_INFO_FAILURE,
      failureHook: payload => {
        return {
          code: payload.response.status.message,
        };
      },
      toggleLoader: false,
    },
  },
  [pageKeys.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS]: {
    [ActionTypes.DOC_SERVICE_UPDATE_FILE]: {
      successAction: CoreActionTypes.DOC_SERVICE_UPDATE_FILE_SUCCESS,
      successHandler: (action, store) => {
        console.log("action, store", action, store);
        if (action.payload.response.status.code !== 0) {
          const displayText = action.payload.response.status.message;
          const options = [
            {
              text: "Ok",
              style: "cancel",
            },
          ];
          Alert.alert("", displayText || "Uploaded successfully", options, {
            cancelable: false,
          });
        }
        action.payload.actionPayload.callback &&
          action.payload.actionPayload.callback();
      },
      postSuccessHook: payload => {
        console.log("2-DOC_SERVICE_UPDATE_FILE", payload);
        return {
          episodeId: payload.response.body.episodeId,
          doctorId: payload.response.body.doctorId,
        };
      },
      failureAction:
        CoreActionTypes.DOC_SERVICE_UPDATE_PRE_CONSULTATION_QUESTIONS_FAILURE,
      failureHandler: (action, store) => {
        console.log("action, store", action, store);
        const displayText = action.payload.response.status.message;
        const options = [
          {
            text: "Ok",
            style: "cancel",
          },
        ];
        Alert.alert("", displayText || "Uploaded failed", options, {
          cancelable: false,
        });
      },
      toggleLoader: false,
    },
    [CoreActionTypes.DOC_SERVICE_UPDATE_PRE_CONSULTATION_QUESTIONS]: {
      successAction:
        CoreActionTypes.DOC_SERVICE_UPDATE_PRE_CONSULTATION_QUESTIONS_SUCCESS,
      dispatchActions: payload => {
        return [
          {
            context: pageKeys.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS,
            type: CoreActionTypes.DOC_SERVICE_REQUEST_CONSULTATION,
            payload: {
              ...payload,
              callType: ConsultationType.VIDEO_CHAT,
            },
          },
        ];
      },
      postSuccessHook: payload => ({
        episodeId: payload.response.body.episodeId,
        doctorId: payload.response.body.doctorId,
      }),
      failureAction:
        CoreActionTypes.DOC_SERVICE_UPDATE_PRE_CONSULTATION_QUESTIONS_FAILURE,
      failureHandler: (action, store) => {
        console.log("action, store", action, store);
        const displayText = action.payload.response.status.message;
        const options = [
          {
            text: "Ok",
            style: "cancel",
          },
        ];
        Alert.alert(
          "",
          displayText || "Consultation request failed, please try again",
          options,
          {
            cancelable: false,
          }
        );
      },
      toggleLoader: false,
    },
    [CoreActionTypes.DOC_SERVICE_REQUEST_CONSULTATION]: {
      successAction: CoreActionTypes.DOC_SERVICE_CONSULTATION_REQUEST_SUCCESS,
      postSuccessHook: payload => {
        const appointmentTimeStr =
          path(["response", "body", "appointmentTime"], payload) || "";
        const appointmentTime = appointmentTimeStr
          ? moment(appointmentTimeStr)
          : null;
        return {
          consultationId: payload.response.body && payload.response.body.id,
          appointmentDate:
            appointmentTimeStr && appointmentTime
              ? appointmentTime.format("YYYY-MM-DD HH:mm:ss")
              : "",
          doctorToken: payload.response["doctor_token"],
        };
      },

      successHandler: (action, store) => {
        console.log("2-dispatchActions-dispatchActions", action);
        if (action.payload.response.status.code !== 0) {
          action.payload.actionPayload.actionPayload.callback &&
            action.payload.actionPayload.actionPayload.callback();
        } else if (action.payload.response.status.code === 0) {
          action.payload.actionPayload.actionPayload.imageCallback &&
            action.payload.actionPayload.actionPayload.imageCallback();
        }
      },
      failureAction:
        CoreActionTypes.DOC_SERVICE_START_CONSULTATION_REQUEST_FAILURE,
      failureHandler: action => {
        if (action.payload.response.status.code !== 0) {
          const displayText = action.payload.response.status.message;
          const options = [
            {
              text: "Ok",
              onPress: () => {
                // store.dispatch({
                //   context: pageKeys.DOC_SERVICE_PLAN_SELECTION,
                //   type: pageKeys.GO_EMERGENCY_QUESTIONS_MODAL_PAGE,
                // });
              },
              style: "cancel",
            },
          ];
          Alert.alert("", displayText, options, {
            cancelable: false,
          });
        }
        // console.log('3-dispatchActions-dispatchActions', action)
        // action.payload.actionPayload.actionPayload.callback && action.payload.actionPayload.actionPayload.callback();
      },
      showAlert: (state, payload) => {
        return doctorAppointmentAlert(state, payload);
      },
      toggleLoader: false,
    },
  },
  [pageKeys.CONSULTATION_HISTORY]: {
    [ActionTypes.CONCIERGE_HISTORY]: {
      successAction: ActionTypes.CONCIERGE_HISTORY_SUCCESS,
      postSuccessHook: payload => {
        console.log("CONCIERGE_HISTORY_SUCCESS!!!:", payload);
        let resp = payload.response.body;
        resp = _.map(resp, respItem => {
          return {
            ...respItem,
            files: [],
          };
        });
        return {
          resp,
        };
      },
      dispatchActions: (payload, state) => {
        console.log(payload, "payload", "state.auth");
        const actions = [];
        if (payload.response && payload.response.body) {
          payload.response.body.forEach((i, j) => {
            actions.push(
              {
                context: pageKeys.CONSULTATION_HISTORY,
                type: ActionTypes.GET_ATTACHMENT,
                payload: {
                  episodeId: i.id,
                  index: j,
                },
              },
              {
                context: pageKeys.CONSULTATION_HISTORY,
                type: ActionTypes.GET_ALLCASENOTES,
                payload: {
                  episodeId: i.id,
                  index: j,
                },
              }
            );
          });
        }
        return actions;
      },
      failureAction: ActionTypes.CONCIERGE_HISTORY_FAILED,
      toggleLoader: false,
    },
    [ActionTypes.IMG_BASE]: {
      successAction: ActionTypes.IMG_BASE_SUCCESS,
      postSuccessHook: payload => {
        console.log("indexxxx:", payload);
        const image = payload.response.body[0].content;
        const i = payload.actionPayload.index;
        return {
          image,
          i,
        };
      },

      failureAction: ActionTypes.IMG_BASE_FAILED,
      toggleLoader: false,
    },
    [ActionTypes.GET_ATTACHMENT]: {
      successAction: ActionTypes.GET_ATTACHMENT_SUCCESS,
      postSuccessHook: payload => {
        console.log("GET_ATTACHMENT!!!!:", payload);
        // const response = payload.response;
        return payload;
      },
      failureHandler: (action, store) => {
        console.log("GET_ATTACHMENT failure!!!!:", action, store);
      },
      failureAction: ActionTypes.GET_ATTACHMENT_FAIL,
    },
    [ActionTypes.GET_ALLCASENOTES]: {
      successAction: ActionTypes.GET_ALLCASENOTES_SUCCESS,
      postSuccessHook: payload => {
        // const response = payload.response;
        return payload;
      },
      failureHandler: (action, store) => {
        console.log("GET_ATTACHMENT failure!!!!:", action, store);
      },
      failureAction: ActionTypes.GET_ATTACHMENT_FAIL,
    },
    [ActionTypes.CONSULTATION_HISTORY_LIST]: {
      successAction: ActionTypes.CONSULTATION_HISTORY_LIST_SUCCESS,
      postSuccessHook: payload => {
        const listDetail = payload.response;
        return {
          listDetail,
        };
      },
      failureAction: ActionTypes.CONSULTATION_HISTORY_LIST_FAILED,
      toggleLoader: false,
    },
    [CoreActionTypes.FETCH_CONSULATION_DETAIL_BY_ID]: {
      successAction: CoreActionTypes.FETCH_CONSULATION_DETAIL_BY_ID_SUCCESS,
      failureAction: CoreActionTypes.FETCH_CONSULATION_DETAIL_BY_ID_FAILED,
      postSuccessHook: (payload, state) => {
        return {
          timestamp: "",
          type: "REPLY",
          body: {
            id: "3221:1549271656333:1549271743:1549271780911",
            type: "VIDEO_CHAT",
            status: "completed",
            consultationTime: {
              date: "Feb 4, 2019 5:15:42 PM",
              startTime: "Feb 4, 2019 5:16:20 PM",
              endTime: "Feb 4, 2019 5:19:12 PM",
            },
            doctor: {
              id: "72",
              name: "Dr John Doe (PRU UAT)",
              specialities: ["gen"],
            },
            prescription: {
              id: "3221:1549271656333:1549271743:1549271780911",
              medications: [
                {
                  medicine: {
                    name: "name",
                  },
                  dosage: {
                    frequency: "string",
                  },
                },
              ],
            },
            attributes: {
              allergies: "test",
              symptoms: "test",
              payment: "success",
              referralId: "id of referral",
              referralLetter: {
                department: "Cardio",
                hospitalName: "KPJ",
                referralNotes: "Cardio issue",
              },
            },
          },
          contentType: "application/json",
          status: {
            code: 0,
          },
        };
      },
      successHandler: () => {},
      failureHook: () => {},
      toggleLoader: false,
    },
    [CoreActionTypes.FETCH_CONSULATION_LETTER_PRESCRIPTIOM]: {
      successAction:
        CoreActionTypes.FETCH_CONSULATION_LETTER_PRESCRIPTIOM_SUCCESS,
      failureAction:
        CoreActionTypes.FETCH_CONSULATION_LETTER_PRESCRIPTIOM_FAILED,
    },
  },

  [pageKeys.MY_DOC_CHAT_SCREEN]: {
    [CoreActionTypes.MYDOC_LOAD_CHAT_MESSAGES]: {
      successAction: CoreActionTypes.MYDOC_LOAD_CHAT_MESSAGES_SUCCESS,
      postSuccessHook: payload => {
        const body = payload.response.body || [];
        const messages = [];
        body.map(message => {
          const item = {};
          const fileNames =
            (message.message.attachments &&
              message.message.attachments[0].url.split("/")) ||
            [];
          const fileName = fileNames[fileNames.length - 1];
          item.message = message.message.text;
          item.senderId = message.sender;
          item.episodeId = message.session.id;
          item.createdTime = message.auditDetail.createTime;
          item.fileType =
            message.message.attachments && message.message.attachments[0].type;
          item.imgUrl =
            message.message.attachments && message.message.attachments[0].url;
          item.fileName = fileName;
          messages.push(item);
        });
        return {
          messages,
        };
      },
      dispatchActions: payload => {
        const actions = [];
        const body = payload.response.body || [];
        body.map((item, index) => {
          if (
            item.message.attachments &&
            item.message.attachments[0].url &&
            (item.message.attachments[0].type === "image" ||
              item.message.attachments[0].type === "emc")
          ) {
            const fileNames = item.message.attachments[0].url.split("/") || [];
            let fileName = fileNames[fileNames.length - 1];
            fileName = fileName.split("?")[0];
            actions.push({
              context: pageKeys.MY_DOC_CHAT_SCREEN,
              type: ActionTypes.MYDOC_GET_IMG_BASE,
              payload: {
                fileName,
                index,
                docType: item.message.attachments[0].type,
              },
            });
          }
        });
        return actions;
      },
      failureAction: CoreActionTypes.INTERNAL_CHAT_LOAD_MESSAGES_FAILURE,
      toggleLoader: false,
    },
    [ActionTypes.MYDOC_GET_IMG_BASE]: {
      successAction: ActionTypes.MYDOC_GET_IMG_BASE_SUCCESS,
      postSuccessHook: payload => {
        const image = payload.response.body[0].content;
        const index = payload.actionPayload.index;
        const fileStatus = payload.actionPayload.fileStatus;
        payload.actionPayload.callback &&
          payload.actionPayload.callback(payload.response.body[0]);
        return {
          image,
          index,
          fileStatus,
        };
      },
      failureAction: ActionTypes.MYDOC_GET_IMG_BASE_ERROR,
      failureHandler: action => {
        const displayText = action.payload.response.status.message;
        const options = [
          {
            text: "Ok",
            style: "cancel",
          },
        ];
        Alert.alert("", displayText || "Failed Response", options, {
          cancelable: false,
        });
      },
      toggleLoader: false,
    },
    [CoreActionTypes.MYDOC_SEND_CHAT_MESSAGE]: {
      successAction: CoreActionTypes.MYDOC_SEND_CHAT_MESSAGE_SUCCESS,
      failureAction: CoreActionTypes.INTERNAL_CHAT_SEND_MESSAGE_FAILURE,
    },
    [ActionTypes.GET_MYDOC_PROFILE]: {
      successAction: ActionTypes.GET_MYDOC_PROFILE_SUC,
      postSuccessHook: payload => {
        const response = payload.response;
        return response;
      },
      failureAction: ActionTypes.GET_MYDOC_PROFILE_FAIL,
      toggleLoader: false,
    },
  },
  ["SUBSCRIPTION"]: {
    [ActionTypes.GET_SUBSCRIPTIONS]: {
      successAction: ActionTypes.GET_SUBSCRIPTIONS_SUCCESS,
      postSuccessHook: payload => {
        const response = pathOr(null, ["response", "body"], payload);
        return {
          response,
        };
      },
      failureAction: ActionTypes.GET_SUBSCRIPTIONS_FAILURE,
    },
    [ActionTypes.GET_ALL_SUBSCRIPTIONS]: {
      successAction: ActionTypes.GET_ALL_SUBSCRIPTIONS_SUCCESS,
      postSuccessHook: payload => {
        const response = pathOr(null, ["response", "body", 0], payload);
        return {
          response,
        };
      },
      failureAction: ActionTypes.GET_ALL_SUBSCRIPTIONS_FAILURE,
    },
    [ActionTypes.CREATE_CUSTOMER_SUBSCRIPTION]: {
      successAction: ActionTypes.CREATE_CUSTOMER_SUBSCRIPTION_SUCCESS,
      postSuccessHook: payload => {
        const response = pathOr(null, ["response", "body"], payload);
        return {
          response,
        };
      },
      failureAction: ActionTypes.CREATE_CUSTOMER_SUBSCRIPTION_FAILURE,
    },
  },
};

export default middlewareConfig;
