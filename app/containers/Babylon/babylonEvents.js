import moment from "moment";
import { events } from "@pru-rt-internal/pulse-common";

export const logActivityEvent = ({
  categoryType,
  name,
  isStartEvent,
  isSymptomChecker,
  additionalAttributes,
  dispatchEvent,
  appVersion,
  eventType,
}) => {
  let activityEvent = getActivityEvent(categoryType, name, isStartEvent);
  const activityDate = moment.utc().format("YYYY-MM-DDTHH:mm:ss");
  if (isSymptomChecker) {
    activityEvent = events.SymptomCheckerChatEnd;
  }
  const dateField = isStartEvent ? "startDate" : "completionDate";
  activityEvent[dateField] = activityDate;
  if (eventType) activityEvent.type = eventType;
  activityEvent.attributes = {
    ...activityEvent.attributes,
    ...additionalAttributes,
    appVersion,
  };
  dispatchEvent(activityEvent);
};

/* eslint-disable-next-line */
const getActivityEvent = (type, name, isStartEvent) => {
  let activityEvent = null;

  switch (type) {
    case "mood":
      activityEvent = isStartEvent
        ? { ...events.BabylonMoodAssessmentStart }
        : { ...events.BabylonMoodAssessmentEnd };
      break;
    case "full_assessment":
      activityEvent = isStartEvent
        ? { ...events.BabylonFullAssessmentStart }
        : { ...events.BabylonFullAssessmentEnd };
      break;
    case "activity":
      activityEvent = isStartEvent
        ? { ...events.BabylonActivityAssessmentStart }
        : { ...events.BabylonActivityAssessmentEnd };
      break;
    case "nutrition":
      activityEvent = isStartEvent
        ? { ...events.BabylonNutritionAssessmentStart }
        : { ...events.BabylonNutritionAssessmentEnd };
      break;
    default: {
      activityEvent = isStartEvent
        ? { ...events.BabylonNutritionAssessmentStart }
        : { ...events.BabylonNutritionAssessmentEnd };
      activityEvent.name = name;
      activityEvent.attributes = {};
    }
  }
  return activityEvent;
};

const getCategoryDetails = params => {
  const {
    fromHealthAssesment,
    fromChatHistory,
    category,
    fromInitialFlow,
    type,
    organDetailsPage,
    healthCategory,
  } = params;
  const chatType =
    fromHealthAssesment || fromChatHistory
      ? "healthAssessment"
      : "symptomCheck";
  let categoryType = "";
  if (organDetailsPage) {
    categoryType = "organAssessment";
  } else if (fromHealthAssesment) {
    categoryType = fromInitialFlow ? type : category;
  }

  return {
    chatType,
    categoryType,
    typeKey: categoryType ? `.${categoryType}` : "",
    healthCategory,
  };
};

export const dispatchStartConversationEvent = params => {
  const {
    categoryType,
    chatType,
    typeKey,
    healthCategory,
  } = getCategoryDetails(params);
  const additionalAttributes = {
    category: params.screenTitle,
    retakeAssessment: params.retakeAssessment ? params.retakeAssessment : false,
    fromChatHistory: params.fromChatHistory,
  };
  if (healthCategory) additionalAttributes.organ = healthCategory;
  logActivityEvent({
    categoryType,
    name: `pulse.babylon.${chatType}.chat${typeKey}.start`,
    isStartEvent: true,
    additionalAttributes,
    ...params,
  });
};

export const dispatchEndConversationEvent = params => {
  const {
    categoryType,
    chatType,
    typeKey,
    healthCategory,
  } = getCategoryDetails(params);
  const additionalAttributes = {
    resultType: params.resultType,
    fromChatHistory: params.fromChatHistory,
  };
  if (healthCategory) additionalAttributes.organ = healthCategory;
  logActivityEvent({
    categoryType,
    name: `pulse.babylon.${chatType}.chat${typeKey}.end`,
    isStartEvent: false,
    additionalAttributes,
    ...params,
  });
};

export const dispatchViewResultsEvent = params => {
  const { chatType, typeKey, healthCategory } = getCategoryDetails(params);
  const additionalAttributes = {
    actionType: params.value,
    fromChatHistory: params.fromChatHistory,
  };
  if (healthCategory) additionalAttributes.organ = healthCategory;
  logActivityEvent({
    name: `pulse.babylon.${chatType}.chat${typeKey}.viewResults`,
    isStartEvent: false,
    additionalAttributes,
    ...params,
    eventType: "ClickEvent",
  });
};

export const dispatchGoBackEvent = params => {
  const { chatType, typeKey, healthCategory } = getCategoryDetails(params);
  const additionalAttributes = {
    actionType: params.value,
    fromChatHistory: params.fromChatHistory,
  };
  if (healthCategory) additionalAttributes.organ = healthCategory;
  logActivityEvent({
    name: `pulse.babylon.${chatType}.chat${typeKey}.goBack`,
    isStartEvent: false,
    additionalAttributes,
    ...params,
    eventType: "ClickEvent",
  });
};
