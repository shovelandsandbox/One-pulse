/* eslint-disable complexity */
import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  NativeModules,
  DeviceEventEmitter,
  NativeEventEmitter,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  Text,
  Linking,
} from "react-native";
import PropTypes from "prop-types";
import { DatePickerDialog } from "react-native-datepicker-dialog";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ChatUserMessage } from "../SymptomChecker/ChatUserMessage";
import { path, pathOr, filter, findLastIndex } from "ramda";
import { connect } from "react-redux";
import { ChatConversationStyle as styles } from "./styles";
import {
  gotoBabylonChatScreen,
  dispatchEvent,
  persistChat,
  getHealthOutcomeById,
} from "../../actions";
import {
  CoreActionTypes,
  CoreComponents,
  CoreConfig,
  CoreConstants,
  colors,
  metaHelpers,
  events,
  CoreSelectors,
} from "@pru-rt-internal/pulse-common";
const { AuthSelector } = CoreSelectors;
import ChatBotMessage from "../../components/ChatBot/ChatBotMessage";
import { goToSymptomSearch } from "./SCActionCreators";
import moment from "moment";
import { CustomAlert } from "../../components";
import {
  dispatchStartConversationEvent,
  dispatchEndConversationEvent,
  dispatchViewResultsEvent,
  dispatchGoBackEvent,
} from "./babylonEvents";
import {configureLineHeight} from "../../utils/lineHeightsUtils";

const { Label, Input, Loader, MultiSelect } = CoreComponents;
const { pageKeys } = CoreConfig;
const {
  SINGLE_OPTION_INPUT,
  SingleOptionInput,
  TEXT_INPUT,
  TextInput,
  SYMPTOM_SUGGESTION_INPUT,
  NO_INPUT,
  MULTI_OPTION_INPUT,
  MultiOptionInput,
  DATE_INPUT,
  BOT,
  TRIAGE_OUTCOME,
  TYPING,
  BUTTON_INPUT,
  SCREEN_KEY_CHAT_CONVERSATION,
  SCREEN_KEY_CHAT_REPORT,
  FEATURE_CONFIGURATION_META_KEY,
  PULSE_PERSONALISED_FLAG_KEY,
} = CoreConstants;

const KEY_VIEW_DIGITAL_TWIN = "viewdigitaltwin";
const KEY_VIEW_DIGITAL_TWIN_EN = "viewdigitaltwin_en";
const KEY_VIEW_DIGITAL_TWIN_BM = "viewdigitaltwin_bm";
const KEY_VIEW_RESULTS = "viewresults";
const KEY_VIEW_RESULTS_EN = "viewresults_en";
const KEY_VIEW_RESULTS_BM = "viewresults_bm";
const KEY_MESSAGE_NOT_SENT = "messagewasnotsent";
const KEY_CANCEL = "cancel";
const KEY_TRYAGAIN = "tryagain";
const KEY_TYPING = "typing";
const KEY_ENTER_DETAIL = "enterdetail";
const KEY_SUBMIT = "submit";
const window = Dimensions.get("window");
const KEY_OK = "ok";
const KEY_REDIRECT = "redirectMsg";
const KEY_STARTNEWCHATBB = "StartanewchatBB";
const KEY_STARTNEWCHATTRIAGE = "StartanewchatTraige";
const KEY_ENTER_TEXT = "please_enter_text";
const KEY_SELECT_OPTION = "please_select_option";
const KEY_LEAVE_CHAT_EN = "leavechat_en";
const KEY_LEAVE_CHAT_BM = "leavechat_bm";
const KEY_CALL = "callKey";
const KEY_CHECK_RESULTS = "checkResults";
// const { BridgeEmitter } = NativeModules;
// const chatBridgeEmitter = new NativeEventEmitter(BridgeEmitter);
// const isIOS = Platform.OS === "ios";
// const eventEmitter = isIOS ? chatBridgeEmitter : DeviceEventEmitter;
let errorAlertEnabled = true;
let chatFinished = false;

const findElement = elementKey =>
  metaHelpers.findElement(SCREEN_KEY_CHAT_CONVERSATION, elementKey) || {
    label: elementKey,
  };

let CTA_RESP_TEXT;
// eslint-disable-next-line react/require-optimization
export class ChatConversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: true,
      chatStartTime: null,
    };
    this.listeners = [];
    this.handleEvent = this.handleEvent.bind(this);
    this.handleErrorEvent = this.handleErrorEvent.bind(this);
    this.onClosePressed = this.onClosePressed.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.multiSelectValue = this.multiSelectValue.bind(this);
    this.goBack = this.goBack.bind(this);
    this.showErrorAlert = this.showErrorAlert.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.undoMessage = this.undoMessage.bind(this);
    this.checkforTabbar = this.checkforTabbar.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSingleOptionInput = this.renderSingleOptionInput.bind(this);
    this.renderMultipleOption = this.renderMultipleOption.bind(this);
    this.renderDateInput = this.renderDateInput.bind(this);
    this.renderTextInput = this.renderTextInput.bind(this);
    this.symptomSuggestionAlert = this.symptomSuggestionAlert.bind(this);
    this.renderNewChat = this.renderNewChat.bind(this);
    this.startNewChat = this.startNewChat.bind(this);
    this.chatUpdateRequestData = this.chatUpdateRequestData.bind(this);
    this.retry = this.retry.bind(this);
    this.didBlurHandler = this.didBlurHandler.bind(this);
    this.leaveChat = this.leaveChat.bind(this);
    if (props.addCustomBackHandler) {
      props.addCustomBackHandler(() => this.goBack(true));
    }
    this.endConversationDispatched = false;
  }

  isTypingMessage = msg =>
    msg && (msg.type === "TYPING" || msg.type === "NO_INPUT");

  isCTA = (e, lastEntry) => {
    const inputVal = path(["inputValues", "0", "value"], e);
    const msg = pathOr(" ", ["data", "textMessage"], lastEntry).toLowerCase();
    return (
      inputVal === CTA_RESP_TEXT ||
      (this.props.userProfile.countryCode != "SG" &&
        inputVal === (findElement(KEY_STARTNEWCHATBB) || {}).label &&
        msg.includes(CTA_RESP_TEXT.toLowerCase()))
    );
  };
  // eslint-disable-next-line complexity
  handleEvent(e) {
    const { chatMessages = [] } = e;
    const msgLength = chatMessages.length;
    if (chatMessages && msgLength) {
      const lastEntry = chatMessages[msgLength - 1];
      this.isResponseCTA = this.isCTA(e, lastEntry);
      if (this.isTypingMessage(lastEntry) || this.isResponseCTA) {
        const ansObj = msgLength > 1 ? chatMessages[msgLength - 2] : {};
        if (ansObj.owner === "USER" || this.isResponseCTA) {
          const babylonResponseData = filter(
            element => !this.isTypingMessage(element),
            chatMessages
          );
          this.persistData(babylonResponseData);
        }
      }
      this.inputValues = e.inputValues;
      this.inputType = e.inputType;
    }

    this.props.updateChatResponse(e);
  }

  handleErrorEvent() {
    const { inputType } = this.props;
    if (
      inputType &&
      inputType !== SYMPTOM_SUGGESTION_INPUT &&
      !NO_INPUT &&
      errorAlertEnabled
    ) {
      errorAlertEnabled = false;
      this.showErrorAlert();
    }
  }
  retry() {
    this.props.resendFailedMessage();
    errorAlertEnabled = true;
  }
  onClosePressed() {
    this.props.navigation.goBack(null);
  }
  componentWillMount() {
    this.props.shouldShowTabBar(false);
    // this.chatManagerListener = eventEmitter.addListener(
    //   "ChatManager",
    //   this.handleEvent
    // );
    // this.chatErrorListener = eventEmitter.addListener(
    //   "ChatError",
    //   this.handleErrorEvent
    // );

    const didBlurSubscription = this.props.navigation.addListener(
      "didBlur",
      payload => {
        try {
          this.didBlurHandler(payload);
        } finally {
          didBlurSubscription.remove();
        }
      }
    );

    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.endConversationDispatched = false;
        this.dispatchEventForType("start");
      }
    );
    // }
    // listenersFlag = false
  }

  componentWillUnmount() {
    const {
      shouldShowTabBar,
      resetChatInputType,
      recordSymptomCheckerEndEvent,
    } = this.props;
    shouldShowTabBar(true);
    resetChatInputType();
    this.chatManagerListener.remove();
    this.chatErrorListener.remove();
    if (chatFinished) {
      recordSymptomCheckerEndEvent();
    }
    this.didFocusListener.remove();
    //this.conversationListen.remove();
  }

  componentDidMount() {
    const {
      recordHealthAssessmentStartEvent,
      navigation,
      emergencyNo,
    } = this.props;
    const callLabel = findElement(KEY_CALL).label;
    CTA_RESP_TEXT = callLabel + " " + emergencyNo;
    if (
      navigation.state.params &&
      navigation.state.params.fromHealthAssesment &&
      navigation.state.params.fromInitialFlow &&
      navigation.state.params.conversationId == 0
    ) {
      recordHealthAssessmentStartEvent();
    }

    const {
      conversationId,
      fromChatHistory,
      SymptomCheckId,
      fromSymptomCheck,
    } = navigation.state.params;
    if (fromChatHistory) {
      this.props.openConveration(conversationId);
    } else if (fromSymptomCheck) {
      this.props.sendSelectedSymptomToBabylon(SymptomCheckId);
    }
  }

  // refreshConversation = res => {
  //   this.props.sendSelectedSymptomToBabylon(res);
  // };
  didBlurHandler = payload => {
    const { navigation } = this.props;
    if (typeof navigation.state.params === "undefined") {
      return;
    }
    const {
      fromHealthAssesment,
      fromInitialFlow,
      fromChatHistory,
    } = navigation.state.params;
    if (fromHealthAssesment) {
      if (fromInitialFlow) {
        this.props.getHealthCheckFlow();
      } else {
        this.props.resetChatInputType();
        this.props.destroyBabylonChat();
      }
    } else if (!fromChatHistory) {
      this.props.resetChatInputType();
      this.props.destroyBabylonChat();
    }
  };

  keyExtractor = item => item.id.toString();

  onMessageChange(message) {
    this.props.chatMessageSend(message);
  }

  getTopic = () => {
    const { navigation } = this.props;
    const fromChatHistory = path(
      ["state", "params", "fromChatHistory"],
      navigation
    );
    const fromHA = path(["state", "params", "fromHealthAssesment"], navigation);
    const fromNT = path(["state", "params", "fromNutrition"], navigation);
    const fromOrgan = path(["state", "params", "organDetailsPage"], navigation);
    if (fromChatHistory || fromHA || fromNT || fromOrgan) {
      return {
        topic: "HealthAssessment",
        subTopic: this.props.currentFlowId,
      };
    }

    return {
      topic: "SymptomChecker",
    };
  };

  dispatchEventForType = (type, additionalParams) => {
    const { navigation, dispatchEvent, auth } = this.props;
    const appVersion = path(["userAgent", "appVersion"], auth);
    const params = pathOr({}, ["state", "params"], navigation);
    const finalParams = {
      ...params,
      ...additionalParams,
      appVersion,
      dispatchEvent,
    };
    switch (type) {
      case "start":
        {
          if (
            !params.fromInitialFlow &&
            (params.fromHealthAssesment || params.fromChatHistory)
          ) {
            dispatchStartConversationEvent(finalParams);
          }
        }
        break;
      case "end":
        {
          if (!this.endConversationDispatched) {
            this.endConversationDispatched = true;
            dispatchEndConversationEvent(finalParams);
          }
        }
        break;
      case "result":
        {
          dispatchViewResultsEvent(finalParams);
        }
        break;
      case "goBack":
        {
          dispatchGoBackEvent(finalParams);
        }
        break;
      default:
        break;
    }
  };

  persistData = (messages = []) => {
    const filteredResult = [];

    let foundBot = false;
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (!foundBot) foundBot = m.owner === "BOT";
      if (foundBot && m.owner === "USER") break;
      filteredResult.unshift(m);
    }

    const { countryMeta } = this.props;

    const startTime = moment()
      .utc()
      .format("YYYY-MM-DDTHH:mm:ss");

    const isChatPersist = pathOr(true, ["persistChat"], countryMeta);
    if (filteredResult.length > 0 && isChatPersist) {
      this.props.persistChat({
        chatMessages: filteredResult,
        startTime,
        conversationId: this.props.conversationId,
        searchedSymptom: this.props.searchedSymptom,
        selectedSymptom: this.props.selectedSymptom,
        topic: this.getTopic(),
        options: this.inputValues,
        inputType: this.inputType,
      });
    }
  };

  persistOutcome = () => {
    const { navigation } = this.props;
    const categoryId = pathOr("", ["state", "params", "category"], navigation);
    if (categoryId) {
      this.props.getHealthOutcomeById(categoryId, true);
    }
  };

  goBack(isBackButtonPressed) {
    // eslint-disable-next-line react/prop-types
    const {
      navigation,
      goToNutrition,
      goToAccessHealth,
      goToChatHome,
    } = this.props;

    const { fromChatHistory } = navigation.state.params;
    const fromHA = path(["state", "params", "fromHealthAssesment"], navigation);
    const fromNT = path(["state", "params", "fromNutrition"], navigation);
    const fromOrgan = path(["state", "params", "organDetailsPage"], navigation);
    this.dispatchEventForType("goBack", {});
    if (typeof navigation.state.params === "undefined") {
      goToChatHome();
      return;
    } else if (fromNT || fromOrgan) {
      // this.props.goToSymptomSearch();
      this.props.goBack();
      return;
    } else if (fromHA) {
      // goToAccessHealth();
      // this.props.navigation.popToTop();
      this.props.goBack();
      return;
    }
    // this.props.goToSymptomSearch();
    this.props.getConversationHistory();

    this.props.clearSymptomData();
    if (isBackButtonPressed && !fromChatHistory) {
      this.props.resetChatInputType();
      //this.props.destroyBabylonChat();
      goToChatHome();
    } else {
      this.props.goBack();
    }
  }
  startNewChat() {
    this.dispatchEventForType("result", {
      value: "Start New Chat",
    });
    this.props.gotoBabylonChatScreen();
  }

  leaveChat() {
    this.props.resetChatInputType();
    this.props.destroyBabylonChat();
    this.goBack();
  }

  showErrorAlert() {
    const msgnotsent = findElement(KEY_MESSAGE_NOT_SENT).label;
    const tryagain = findElement(KEY_TRYAGAIN).label;
    const cancel = findElement(KEY_CANCEL).label;
    CustomAlert.show(
      "",
      msgnotsent,
      {
        positiveText: tryagain,
        onPositivePress: () => {
          this.retry();
        },
      },
      {
        negativeText: cancel,
        onNegativePress: () => {
          this.goBack();
        },
      }
    );
  }
  undoMessage(id) {
    this.props.undoChat(id);
    this.endConversationDispatched = false;
  }
  renderNewChat() {
    const startNewChatTriage = findElement(KEY_STARTNEWCHATTRIAGE).label;
    return (
      <View style={styles.newChatContainer}>
        <View style={styles.newChatBtn}>
          <TouchableOpacity onPress={this.startNewChat}>
            <Text style={{
              ...styles.newChatBtnText,
              ...configureLineHeight("14")
              }}>{startNewChatTriage}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // eslint-disable-next-line complexity
  renderItem(item) {
    const typing = findElement(KEY_TYPING).label;
    const viewRes = findElement(KEY_VIEW_RESULTS).label;
    // const { item } = data;
    const profilePicture = this.props.profilePicture
      ? this.props.profilePicture
      : "";
    if (item.owner == "empty") {
      return <View style={{ height: 50, backgroundColor: "#fff" }}></View>;
    } else if (item.owner === "USER") {
      return (
        <ChatUserMessage
          key={item.id}
          value={item.data.textMessage}
          item={item}
          undoMessage={this.undoMessage}
          profilePicture={profilePicture}
        />
      );
    } else if (item.owner === BOT) {
      if (item.data.textMessage) {
        return (
          <ChatBotMessage
            key={item.id}
            value={item.type === "NO_INPUT" ? ". . ." : item.data.textMessage}
          />
        );
      } else if (item.type === TRIAGE_OUTCOME) {
        chatFinished = !pathOr(
          true,
          ["state", "navigation", "params", "fromHealthAssesment"],
          this.props
        );

        this.props.changeChatInputType(BUTTON_INPUT);
        return (
          <ChatBotMessage
            key={item.id}
            value={item.data.summary}
            data={item.data}
            title={viewRes}
            navigation={this.props.navigation}
            callMe={this.callMe}
          />
        );
      } else if (item.type === TYPING) {
        return <ChatBotMessage key={item.id} value={typing} />;
      }
    }
  }

  getPulsePersonalisedFeatureFlag = () => {
    const metaObj = metaHelpers.findElement(
      FEATURE_CONFIGURATION_META_KEY,
      PULSE_PERSONALISED_FLAG_KEY
    );
    const flagLabel = pathOr("", ["label"], metaObj);
    const flag = flagLabel && flagLabel === "true" ? true : false;
    return flag;
  };

  // eslint-disable-next-line complexity
  selectedValue = (value, type) => {
    const viewDigTwinEn = findElement(KEY_VIEW_DIGITAL_TWIN_EN).label;
    const viewDigTwin = findElement(KEY_VIEW_DIGITAL_TWIN).label;
    const viewDigTwinBm = findElement(KEY_VIEW_DIGITAL_TWIN_BM).label;
    const viewResEn = findElement(KEY_VIEW_RESULTS_EN).label;
    const viewResBm = findElement(KEY_VIEW_RESULTS_BM).label;
    const leaveChatEn = findElement(KEY_LEAVE_CHAT_EN).label;
    const leaveChatBm = findElement(KEY_LEAVE_CHAT_BM).label;
    const startNewChat = findElement(KEY_STARTNEWCHATBB).label;
    const checkResults = findElement(KEY_CHECK_RESULTS).label;
    const categoryType = this.props.navigation.getParam("type");

    if (type === SingleOptionInput) {
      if (value.toLowerCase() === CTA_RESP_TEXT.toLowerCase()) {
        Linking.openURL(`tel:${this.props.emergencyNo}`);
        this.dispatchEventForType("result", {
          value,
        });
        if (!this.props.navigation.state.params) {
          chatFinished = true;
        }
      } else if (
        value === viewDigTwinEn ||
        value === viewDigTwin ||
        value === viewDigTwinBm ||
        value === "View Digital Twin"
      ) {
        const { recordHealthAssessmentEndEvent, navigation } = this.props;
        if (
          navigation.state.params &&
          navigation.state.params.fromHealthAssesment &&
          navigation.state.params.fromInitialFlow &&
          navigation.state.params.conversationId == 0
        ) {
          recordHealthAssessmentEndEvent();
        }

        this.props.updateDigitalTwinResponse({});
        this.persistOutcome();
        this.props.shouldShowTabBar(true);
        const eventPayload = events.BabylonDigitalTwinView;
        eventPayload.attributes.appVersion = path(
          ["auth", "userAgent", "appVersion"],
          this.props
        );
        this.props.dispatchEvent(eventPayload);
        let showConsentScreen = true;
        const { termsConditions } = this.props;
        const pulsePersonalisedFeatureFlag = this.getPulsePersonalisedFeatureFlag();
        if (
          !pulsePersonalisedFeatureFlag ||
          (termsConditions &&
            termsConditions.marketing != undefined &&
            termsConditions.marketing.consent === "ACCEPT")
        ) {
          showConsentScreen = false;
        }
        const payload = {
          fromHealthCheckHome: true,
          refreshData: true,
          navAndResetStack: false,
          categoryType: categoryType,
        };
        if (showConsentScreen) {
          this.props.goToPulsePersonalisedScreen(payload);
        } else {
          this.props.goToFullAssessment(payload);
        }
      } else if (
        value.toLowerCase() === viewResEn.toLowerCase() ||
        value.toLowerCase() === viewResBm.toLowerCase() ||
        value.toLowerCase() === checkResults.toLowerCase() ||
        value === "View results"
      ) {
        const { recordHealthAssessmentEndEvent, navigation } = this.props;
        if (
          navigation.state.params &&
          navigation.state.params.fromHealthAssesment &&
          navigation.state.params.fromInitialFlow &&
          navigation.state.params.conversationId == 0
        ) {
          recordHealthAssessmentEndEvent();
        }

        this.dispatchEventForType("result", {
          value: "View Results",
        });
        this.props.updateDigitalTwinResponse({});
        this.props.getHealthCategories();
        this.props.shouldShowTabBar(true);
        // eslint-disable-next-line no-console
        if (
          this.props.navigation.state.params &&
          this.props.navigation.state.params.fromHealthAssesment
        ) {
          // eslint-disable-next-line max-depth
          if (this.props.navigation.state.params.organDetailsPage) {
            this.props.goToFullAssessment({
              screenTitle: this.props.navigation.state.params.screenTitle,
              value: this.props.navigation,
              organDetailsPage: this.props.navigation.state.params
                .organDetailsPage,
              categoryType: categoryType,
            });
          } else {
            let healthCategory = "full_assessment";
            const healthCategotyFlowID = this.props.navigation.state.params
              .flowId;
            if (
              healthCategotyFlowID.includes("activity_onboarding") ||
              healthCategotyFlowID.includes("activity_on_boarding")
            ) {
              healthCategory = "activity";
            } else if (
              healthCategotyFlowID.includes("nutrition_onboarding") ||
              healthCategotyFlowID.includes("nutrition_on_boarding")
            ) {
              healthCategory = "nutrition";
            } else if (
              healthCategotyFlowID.includes("mood_onboarding") ||
              healthCategotyFlowID.includes("mood_on_boarding")
            ) {
              healthCategory = "mood";
            }
            this.props.showLoader();
            this.props.goToFullAssessment({ categoryType: categoryType });
          }
        } else {
          this.props.goToFullAssessment({ categoryType: categoryType });
        }
      } else if (
        value.toLowerCase() === leaveChatEn.toLowerCase() ||
        value.toLowerCase() === leaveChatBm.toLowerCase() ||
        value === "Leave chat"
      ) {
        this.leaveChat();
      } else if (value === CTA_RESP_TEXT) {
        chatFinished = !pathOr(
          true,
          ["state", "navigation", "params", "fromHealthAssesment"],
          this.props
        );
      } else if (value === startNewChat) {
        this.startNewChat();
      } else {
        this.chatUpdateRequestData(value, type);
      }
    } else {
      this.chatUpdateRequestData(value, type);
    }
  };

  chatUpdateRequestData(value, type) {
    if (type === "SymptomInput") {
      this.props.clearSymptomData();
    } else if (type === "MultiOptionInput") {
      this.props.clearMultiSelectData();
    }
    this.props.chatUpdateRequestData(value, type);
  }

  multiSelectValue(value) {
    this.props.changeChatMultiselect(value);
  }
  onDatePress() {
    let date = this.props.date;

    if (!date || date == null) {
      date = new Date();
      this.props.changeChatDate(date);
    }

    //To open the dialog
    this.dateDialog.open({
      date: date,
      maxDate: new Date(), //To restirct future date
    });
  }
  onDatePicked(date) {
    this.props.chatDatePicked(date);
  }

  checkforTabbar() {
    if (this.props.showTabBar) {
      this.props.shouldShowTabBar(false);
    }
  }
  isViewResultBtn = item => {
    return (
      <View style={styles.btn}>
        <Text style={{
          ...styles.viewResultBtnText,
          ...configureLineHeight("14")
          }}>{item.value}</Text>
      </View>
    );
  };

  singleOptionInputForDTView = () => {};

  renderSingleOptionInput() {
    const inputHeight =
      this.props.inputValues.length < 5
        ? this.props.inputValues.length * 50
        : 200;
    return (
      <ScrollView style={{ height: inputHeight }}>
        {this.props.inputValues.map((item, index) => {
          const isDTView = this.isDigitalTwinView(item);
          const selectStyle = isDTView
            ? styles.selectStyleDigitalTwin
            : styles.selectStyle;
          const viewStyle = isDTView ? styles.digitalTwinStyle : null;
          const labelStyle = isDTView
            ? styles.digitalTwinStyle
            : styles.singleSelectText;
          const textLabel = this.isResponseCTA ? CTA_RESP_TEXT : item.value;

          (isDTView === true ||
            this.isResponseCTA === true ||
            textLabel.toLowerCase() === "view results") &&
            this.dispatchEventForType("end", {
              resultType: textLabel,
              isSymptomChecker: false,
            });

          return (
            <TouchableOpacity
              key={index}
              style={selectStyle}
              onPress={() => this.selectedValue(textLabel, SingleOptionInput)}
            >
              <View style={viewStyle}>
                {textLabel.toLowerCase() === "view results" ? (
                  <View style={styles.btn}>
                    <Text style={{
                      ...styles.viewResultBtnText,
                      ...configureLineHeight("14")
                      }}>{textLabel}</Text>
                  </View>
                ) : (
                  <Label value={textLabel} style={{...labelStyle, ...configureLineHeight("14")}} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  renderTextInput(enterdetail) {
    return (
      <Input
        autoCapitalize="words"
        chatConversation={true}
        value={this.props.message}
        onChangeText={message => this.onMessageChange(message)}
        placeholder={enterdetail}
        style={styles.textinput}
        returnKeyType="done"
        showSend={true}
        onSubmitEditing={() =>
          this.selectedValue(this.props.message, TextInput)
        }
      />
    );
  }

  renderDateInput() {
    return (
      <View style={styles.flexRow}>
        <TouchableOpacity
          onPress={this.onDatePress.bind(this)}
          style={styles.dateContainer}
        >
          <View style={styles.datePickerBox}>
            <Label value={this.props.dateText} style={styles.datePickerText} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={this.props.dateDisabled}
          style={
            this.props.dateDisabled
              ? [styles.sendBtn, styles.dateOpacity]
              : [styles.sendBtn]
          }
          onPress={() => {
            this.selectedValue(this.props.dateText);
          }}
        >
          <MaterialIcons name="send" size={25} color={colors.silver} />
        </TouchableOpacity>
      </View>
    );
  }

  isDigitalTwinView = item => {
    const viewDigTwin = findElement(KEY_VIEW_DIGITAL_TWIN).label;
    return item.value === viewDigTwin;
  };
  renderMultipleOption(inputValues) {
    const disableMultiSelectItems = inputValues
      .filter(input => input.isUniqueChoice)
      .map(input => input.value);
    const submit = findElement(KEY_SUBMIT).label;
    return (
      <MultiSelect
        options={arrayToObject(inputValues, "value")}
        multiple={true}
        returnValue={"label"}
        callback={res => {
          this.multiSelectValue(res);
        }}
        disableMultiSelectItems={disableMultiSelectItems}
        rowBackgroundColor={colors.white}
        rowHeight={40}
        rowRadius={5}
        iconColor={this.props.multiSelectInputColor}
        iconSize={20}
        scrollViewStyle={styles.multiselectViewStyle}
        itemStyle={styles.multiselectItemStyle}
        selectedIconName={"ios-checkmark-circle-outline"}
        unselectedIconName={"ios-radio-button-off"}
        scrollViewHeight={145}
        selected={this.props.multiSelectValue}
        submitButtonStyle={styles.submitButtonStyle}
        onSubmit={() => {
          this.selectedValue(this.props.multiSelectValue, MultiOptionInput);
        }}
        submitLabel={submit}
        submitLabelStyle={{...styles.submitLabelStyle, ...configureLineHeight("14")}}
        configureLineHeight={configureLineHeight}
      />
    );
  }
  checkSymptomSuggestion() {
    const { navigation, inputValues } = this.props;
    const { showAlert } = this.state;
    if (
      inputValues.length != 0 &&
      inputValues[0]["isSuggestionAvailable"] &&
      !path(["state", "params", "fromHealthAssesment"], navigation) &&
      showAlert
    ) {
      this.symptomSuggestionAlert();
    }
  }

  symptomSuggestionAlert() {
    const redirectMsg = findElement(KEY_REDIRECT).label;
    const ok = findElement(KEY_OK).label.toUpperCase();
    CustomAlert.show("", redirectMsg, {
      positiveText: ok,
      onPositivePress: () => {
        this.setState({ showAlert: false });
        this.props.goToChatSuggestion({ newChat: false });
      },
    });
  }

  renderInput() {
    const { inputType, inputValues } = this.props;
    const enterdetail = findElement(KEY_ENTER_DETAIL).label;
    if (inputType == SINGLE_OPTION_INPUT) {
      return this.renderSingleOptionInput();
    } else if (inputType == TEXT_INPUT) {
      return this.renderTextInput(enterdetail);
    } else if (inputType == SYMPTOM_SUGGESTION_INPUT) {
      this.checkSymptomSuggestion();
      return <View />;
    } else if (inputType == NO_INPUT) {
      return <View />;
    } else if (inputType == MULTI_OPTION_INPUT) {
      // const customInput = arrayToObject(inputValues, "value");
      return this.renderMultipleOption(inputValues);
    } else if (inputType == DATE_INPUT) {
      return this.renderDateInput();
    } else if (inputType == BUTTON_INPUT) {
      this.dispatchEventForType("end", {
        resultType: "startNewChat",
        isSymptomChecker: true,
      });
      return this.renderNewChat();
    }
    return <Label value="undefined" />;
  }

  renderMainView = input => {
    const ok = metaHelpers
      .findElement(SCREEN_KEY_CHAT_REPORT, KEY_OK)
      .label.toUpperCase();
    return (
      <View style={styles.container}>
        {this.props.chatHistory && this.props.responseData.length === 0 ? (
          <Loader />
        ) : (
          <React.Fragment>
            <View
              style={[
                styles.flatListContainer,
                { width: (this.props.chatProgress * window.width) / 100 },
              ]}
            />
            <ScrollView
              style={{ flex: 1 }}
              ref={ref => (this.flatList = ref)}
              onLayout={() => {
                setTimeout(() => {
                  console.log("---------");
                  this.flatList &&
                    this.flatList.scrollToEnd({ animated: true }),
                    10;
                });
              }}
            >
              {this.props.responseData.map((item, index) => {
                return this.renderItem(item);
              })}
            </ScrollView>
            <View style={{ backgroundColor: colors.white }}>{input}</View>

            <DatePickerDialog
              okLabel={ok}
              ref={ref => {
                this.dateDialog = ref;
              }}
              onDatePicked={this.onDatePicked.bind(this)}
            />
          </React.Fragment>
        )}
      </View>
    );
  };

  render() {
    this.checkforTabbar();
    const input = this.renderInput();
    if (Platform.OS === "ios") {
      return (
        <KeyboardAvoidingView
          style={styles.flexStyle}
          behavior="padding"
          keyboardVerticalOffset={20}
        >
          {this.renderMainView(input)}
        </KeyboardAvoidingView>
      );
    }
    return this.renderMainView(input);
  }
}
const arrayToObject = (arr, keyField) =>
  Object.assign({}, ...arr.map(item => ({ [item[keyField]]: item[keyField] })));

ChatConversation.propTypes = {
  updateChatResponse: PropTypes.func,
  resendFailedMessage: PropTypes.func,
  shouldShowTabBar: PropTypes.func,
  chatMessageSend: PropTypes.func,
  navigation: PropTypes.object,
  destroyBabylonChat: PropTypes.func,
  message: PropTypes.string,
  undoChat: PropTypes.func,
  updateDigitalTwinResponse: PropTypes.func,
  chatUpdateRequestData: PropTypes.func,
  changeChatMultiselect: PropTypes.func,
  date: PropTypes.object,
  changeChatDate: PropTypes.func,
  chatDatePicked: PropTypes.func,
  inputValues: PropTypes.array,
  inputType: PropTypes.string,
  showTabBar: PropTypes.bool,
  resetChatInputType: PropTypes.func,
  getHealthCheckFlow: PropTypes.func,
  responseData: PropTypes.array,
  chatProgress: PropTypes.number,
  chatHistory: PropTypes.bool,
  dateDisabled: PropTypes.bool,
  dateText: PropTypes.string,
  multiSelectValue: PropTypes.array,
  recordHealthAssessmentStartEvent: PropTypes.func,
  recordHealthAssessmentEndEvent: PropTypes.func,
  recordSymptomCheckerEndEvent: PropTypes.func,
  goBack: PropTypes.func,
  getConversationHistory: PropTypes.func,
  emergencyNo: PropTypes.number,
  countryMeta: PropTypes.object,
  persistChat: PropTypes.func,
  conversationId: PropTypes.string,
  searchedSymptom: PropTypes.string,
  selectedSymptom: PropTypes.string,
  currentFlowId: PropTypes.string,
  dispatchEvent: PropTypes.func,
  userProfile: PropTypes.object,
  gotoBabylonChatScreen: PropTypes.func,
  auth: PropTypes.object,
};

ChatConversation.defaultProps = {
  multiSelectInputColor: colors.crimson, //TODO: sg color - "#a8a8a8";
};

const mapStateToProps = state => {
  return {
    message: state.chat.message,
    inputType: state.chat.inputType,
    multiSelectValue: state.chat.multiSelectValue,
    inputValues: state.chat.inputValues,
    date: state.chat.date,
    dateText: state.chat.dateText,
    dateDisabled: state.chat.dateDisabled,
    responseData: state.chat.responseData,
    chatProgress: state.chat.chatProgress,
    showTabBar: state.chat.shouldShowTabBar,
    token: state.auth.token,
    babylonToken: AuthSelector.getBabylonToken(state),
    userProfile: state.profile,
    profilePicture: state.documents.profilePicture,
    persistHealthRecords: state.meta.persistHealthRecords,
    emergencyNo: path(["meta", "countryCommonMeta", "emergencyNo"], state),
    countryMeta: state.meta.countryCommonMeta,
    conversationId: state.chat.conversationId,
    searchedSymptom: state.chat.searchedSymptom,
    selectedSymptom: state.chat.selectedSymptom,
    currentFlowId: state.healthCheck.currentFlowId,
    termsConditions: state.auth.termsConditions,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  goBack: () => ({
    type: CoreActionTypes.GO_BACK_TO_PREVIOUS_SCREEN,
  }),
  chatMessageSend: message => ({
    type: CoreActionTypes.CHAT_MESSAGE_SEND,
    payload: message,
  }),
  changeChatDate: date => ({
    type: CoreActionTypes.CHAT_CHANGE_DATE,
    payload: date,
  }),
  chatDatePicked: date => ({
    type: CoreActionTypes.CHAT_PICKED_DATE,
    payload: date,
  }),
  changeChatMultiselect: value => ({
    type: CoreActionTypes.CHAT_CHANGE_MULTISELECT,
    payload: value,
  }),
  // eslint-disable-next-line complexity
  chatUpdateRequestData: (value, type) => {
    let sendMessage, errMsg, ok;
    if (type === "TextInput") {
      if (value && value.trim() !== "") {
        sendMessage = { TextInput: value };
        return {
          context: pageKeys.CHAT_CONVERSATION,
          type: CoreActionTypes.CHAT_UPDATE_TEXT_INPUT,
          payload: sendMessage,
        };
      }
      errMsg = metaHelpers.findBackendErrorMessageByScreen(
        SCREEN_KEY_CHAT_CONVERSATION,
        KEY_ENTER_TEXT,
        KEY_SUBMIT
      );
      ok = findElement(KEY_OK).label;

      CustomAlert.show("", errMsg, {
        positiveText: ok,
        onPositivePress: () => {},
      });
      return 0;
    } else if (type === "SingleOptionInput") {
      sendMessage = { SingleOptionInput: value };
      return {
        context: pageKeys.CHAT_CONVERSATION,
        type: CoreActionTypes.CHAT_UPDATE_SINGLE_OPTION_INPUT,
        payload: sendMessage,
      };
    } else if (type === "MultiOptionInput") {
      if (value.length !== 0) {
        const multiselectValue =
          value.indexOf(",") != -1 ? value.split(",") : value;
        sendMessage = { MultiOptionInput: multiselectValue };
        return {
          context: pageKeys.CHAT_CONVERSATION,
          type: CoreActionTypes.CHAT_UPDATE_MULTI_OPTION_INPUT,
          payload: sendMessage,
        };
      }
      errMsg = metaHelpers.findBackendErrorMessageByScreen(
        SCREEN_KEY_CHAT_CONVERSATION,
        KEY_SELECT_OPTION,
        KEY_SUBMIT
      );
      ok = findElement(KEY_OK).label;
      CustomAlert.show("", errMsg, {
        positiveText: ok,
        onPositivePress: () => {},
      });
      return 0;
    } else if (type === "SymptomInput") {
      if (typeof value.symptom != "undefined") {
        sendMessage = {
          SymptomInput: value.symptom,
          suggestionID: value.symptomID,
        };
      } else {
        sendMessage = { SymptomInput: value };
      }
      return {
        context: pageKeys.CHAT_CONVERSATION,
        type: CoreActionTypes.CHAT_UPDATE_SYMPTOM_INPUT,
        payload: sendMessage,
      };
    }
  },
  // chatUpdateRequestData,
  clearSymptomData: () => ({ type: CoreActionTypes.CLEAR_SYMPTOM_DATA }),
  clearMultiSelectData: () => ({
    type: CoreActionTypes.CLEAR_CHAT_MULTISELECT,
  }),
  updateChatResponse: response => ({
    type: CoreActionTypes.CHAT_BOT_RESPONSE,
    payload: response,
  }),
  sendChatSymptom: value => ({
    type: CoreActionTypes.CHAT_SYMPTOM_SEND,
    payload: value,
  }),
  updateFromChatHistory: payload => ({
    type: CoreActionTypes.FROM_CHAT_HISTORY,
    payload,
  }),
  destroyBabylonChat: () => ({
    context: pageKeys.CHAT_CONVERSATION,
    type: CoreActionTypes.DESTROY_BABYLON_CHAT,
  }),
  resendFailedMessage: () => ({
    context: pageKeys.CHAT_CONVERSATION,
    type: CoreActionTypes.RESEND_FAILED_MESSAGE,
  }),
  undoChat: payload => ({
    context: pageKeys.CHAT_CONVERSATION,
    type: CoreActionTypes.UNDO_MESSAGE,
    payload,
  }),
  showLoader: () => ({
    type: CoreActionTypes.TOGGLE_LOADER,
    value: true,
  }),
  updateDigitalTwinResponse: data => {
    if (data.hasOwnProperty("unityStartupComplete")) {
      return { type: CoreActionTypes.UNITY_STARTUP_COMPLETED };
    }
    if (data.hasOwnProperty("digitalTwinLayerType")) {
      return {
        type: CoreActionTypes.DIGITAL_TWIN_LAYER_TYPE_CHANGED,
        payload: data.digitalTwinLayerType,
      };
    }
    if (data.hasOwnProperty("healthCategoryID")) {
      return {
        type: CoreActionTypes.HEALTH_CATEGORY_CHANGED,
        payload: {
          healthCategoryName: data.healthCategoryName,
          healthCategoryID: data.healthCategoryID,
        },
      };
    }
    if (data.hasOwnProperty("digitalTwinShaked")) {
      return {
        context: pageKeys.FULL_ASSESSMENT,
        type: CoreActionTypes.DIGITAL_TWIN_SHAKED,
      };
    }
    return {
      context: pageKeys.FULL_ASSESSMENT,
      type: CoreActionTypes.REFRESH_DIGITAL_TWIN,
    };
  },
  shouldShowTabBar: value => ({
    type: CoreActionTypes.SHOULD_SHOW_TABBAR,
    value,
  }),
  resetChatInputType: () => ({ type: CoreActionTypes.RESET_CHAT_INPUT_TYPE }),
  getHealthCheckFlow: () => ({
    context: pageKeys.HA_GET_STARTED,
    type: CoreActionTypes.GET_HEALTH_FLOWS,
  }),
  changeChatInputType: payload => ({
    type: CoreActionTypes.CHAT_CHANGE_INPUT_TYPE,
    payload,
  }),
  babylonChatInitialisation: startConversation => ({
    context: pageKeys.HA_GET_STARTED,
    type: CoreActionTypes.INIT_BABYLON_CHAT,
    payload: {
      startConversation,
    },
  }),
  recordHealthAssessmentStartEvent: () => ({
    context: pageKeys.HA_GET_STARTED,
    type: CoreActionTypes.RECORD_HEALTH_ASSESSMENT_EVENT,
    payload: {
      start: true,
    },
  }),
  recordHealthAssessmentEndEvent: () => ({
    context: pageKeys.HA_GET_STARTED,
    type: CoreActionTypes.RECORD_HEALTH_ASSESSMENT_EVENT,
    payload: {
      start: false,
    },
  }),
  recordSymptomCheckerEndEvent: () => ({
    context: pageKeys.CHAT_CONVERSATION,
    type: CoreActionTypes.RECORD_SYMPTOM_CHECKER_EVENT,
    payload: {
      start: false,
    },
  }),
  goToChatHome: () => ({
    context: pageKeys.CHAT_CONVERSATION,
    type: CoreActionTypes.GO_TO_CHAT_HOME,
  }),
  goToChatSuggestion: params => ({
    context: pageKeys.CHAT_CONVERSATION,
    type: CoreActionTypes.GO_TO_CHAT_SUGGESTION,
    payload: {
      params,
    },
  }),
  goToPulsePersonalisedScreen: params => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: "PulsePersonalised",
    payload: {
      params,
    },
  }),
  goToFullAssessment: params => ({
    context: pageKeys.CHAT_CONVERSATION,
    type: CoreActionTypes.GO_TO_FULL_ASSESSMENT,
    payload: {
      params,
    },
  }),
  goToNutrition: params => ({
    context: pageKeys.FULL_ASSESSMENT,
    type: CoreActionTypes.GO_TO_NUTRITION,
    payload: {
      params,
    },
  }),
  goToAccessHealth: () => ({
    context: pageKeys.MAIN_PAGE,
    type: CoreActionTypes.GO_TO_ASSESS_HEALTH,
  }),
  getHealthCategories: () => ({
    context: pageKeys.FULL_ASSESSMENT,
    type: CoreActionTypes.FETCH_HEALTH_CATEGORIES,
  }),
  goToSymptomSearch,
  openConveration: id => ({
    context: pageKeys.CHAT_HISTORY,
    type: CoreActionTypes.OPEN_CONVERSATION,
    payload: {
      id,
    },
  }),
  sendSelectedSymptomToBabylon: value => ({
    context: pageKeys.CHAT_CONVERSATION,
    type: CoreActionTypes.CHAT_UPDATE_SYMPTOM_INPUT,
    payload: {
      SymptomInput: value.symptom,
      suggestionID: value.symptomID,
    },
  }),
  getConversationHistory: () => ({
    context: pageKeys.CHAT_HISTORY,
    type: CoreActionTypes.GET_CONVERSATION_HISTORY,
  }),
  gotoBabylonChatScreen,
  dispatchEvent,
  persistChat,
  getHealthOutcomeById,
})(ChatConversation);
