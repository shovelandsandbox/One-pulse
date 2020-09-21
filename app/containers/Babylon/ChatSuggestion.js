import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  NativeModules,
  NativeEventEmitter,
  DeviceEventEmitter,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { path, pathOr } from "ramda";
import { ChatSuggestionStyle as styles } from "./styles";
import {
  CoreActionTypes,
  CoreComponents,
  CoreConfig,
  metaHelpers,
  CoreConstants,
  CoreActions,
  events,
} from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from "../../actions";
import ChatHeader from "./ChatHeader";
import moment from "moment";
import {configureLineHeight} from "../../utils/lineHeightsUtils";

const { initCheckSymptoms, toggleLoader } = CoreActions;
const { Label } = CoreComponents;
const { pageKeys } = CoreConfig;
const {
  SCREEN_KEY_CHAT_SUGGESTION,
  CHATBOTPROFILE,
  CHATBOTPROFILE_SYMPTOMS,
  CHATBOTPROFILE_WHICHSYMPTOMISBOTHERING,
  SYMPTOM_SUGGESTION_INPUT,
} = CoreConstants;
import { initBabylonChat } from "./SCActionCreators";
const KEY_PLACEHOLDER = "placeholder";
const KEY_DESCRIPTION = "description";
const { BridgeEmitter } = NativeModules;
// const chatBridgeEmitter = new NativeEventEmitter(BridgeEmitter);
// const eventEmitter =
//   Platform.OS === "ios" ? chatBridgeEmitter : DeviceEventEmitter;

// eslint-disable-next-line react/require-optimization
export class ChatSuggestion extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   message: "",
    // };
    this.onClear = this.onClear.bind(this);
    this.isBabylonChatInitialized = false;
  }

  handleEvent = e => {
    if (e.inputType === SYMPTOM_SUGGESTION_INPUT) {
      this.props.toggleLoader(false);
      this.props.newConversationCreated(e.conversationId);
    }
  };

  handleErrorEvent = () => {
    this.props.toggleLoader(false);
  };

  componentDidMount() {
    this.didBlurSubscription = this.props.navigation.addListener(
      "didBlur",
      () => this.didBlurHandler()
    );
    this.props.clearSymptomData();
    if (!this.isBabylonChatInitialized && this.isNewChat()) {
      // this.chatManagerListener = eventEmitter.addListener(
      //   "ChatManager",
      //   this.handleEvent
      // );
      // this.chatErrorListener = eventEmitter.addListener(
      //   "ChatError",
      //   this.handleErrorEvent
      // );
      this.props.toggleLoader(true);
      this.isBabylonChatInitialized = true;
      this.props.initBabylonChat(true);
    }
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
    this.props.clearCreateConversationState();
    // eventEmitter.removeAllListeners();
    if (this.chatManagerListener) {
      this.chatManagerListener.remove();
      this.chatManagerListener = null;
    }
    if (this.chatErrorListener) {
      this.chatErrorListener.remove();
      this.chatErrorListener = null;
    }
  }

  didBlurHandler = () => {
    const { navigation, resetChatInputType } = this.props;
    if (path(["state", "params", "newChat"], navigation)) {
      resetChatInputType();
    }
    this.props.clearSymptomData();
    // eventEmitter.removeAllListeners();
    if (this.chatManagerListener) {
      this.chatManagerListener.remove();
      this.chatManagerListener = null;
    }
    if (this.chatErrorListener) {
      this.chatErrorListener.remove();
      this.chatErrorListener = null;
    }
    return true;
  };

  getSymptomSuggestion(message) {
    const langToMinChars = {
      MY: 2,
      HK: 2,
      TH: 3,
      EN: 3,
      VI: 3,
      PH: 3,
      TW: 2,
      KM: 2,
      BM: 3,
      LO: 3,
    };

    const minChars = pathOr(3, [this.props.language], langToMinChars);
    this.props.sendChatSymptom(message);
    this.props.updateFromChatHistory(false);
    if (message.length >= minChars) {
      this.props.getSymptomSuggestionData(message);
    } else {
      this.props.initCheckSymptoms();
    }
  }

  selectSymptom = item => {
    const { recordSymptomCheckerStartEvent } = this.props;
    recordSymptomCheckerStartEvent();
    this.symptomTextInput.blur();
    this.props.clearSymptomData(); //clear symptom data
    this.props.sendSelectedSymptomToBabylon(item.suggestedSymptoms[0]);
    this.props.resetChatInputType();
    this.props.goToChatConversation();
    const activityEvent = events.SymptomCheckerChat;
    activityEvent.startDate = moment()
      .utc()
      .format("YYYY-MM-DDTHH:mm:ss");
    this.props.dispatchEvent(activityEvent);
  };
  onClear() {
    this.props.clearSymptomData();
  }

  isNewChat = () => {
    const { params } = this.props.navigation.state;
    // return params ? params.newChat : true;
    return params === undefined ||
      params.newChat === undefined ||
      params.newChat
      ? true
      : false;
  };

  handleBackNavigation = () => {
    /**
     * If user is coming directly to chat suggestion, we'll send them back to chat home.
     * Otherwise if the user is open previously opened chat we'll send them back to chat history.
     */
    if (this.isNewChat()) {
      this.props.navigation.goBack();
    } else {
      this.props.goToChatHistory();
    }
  };

  render() {
    const symptomList = this.props.responseSuggestionData.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.symptomCard}
        onPress={e => {
          e.preventDefault();
          this.selectSymptom(item);
        }}
      >
        <Label
          // value={item.suggestedSymptoms[0].symptom}
          value={item.suggestion}
          style={{
            ...styles.suggestionHead,
            ...configureLineHeight("14")
          }}
        />
        <Text style={{
          ...styles.suggestionDescription,
          ...configureLineHeight("14")
        }}>
          {item.suggestedSymptoms[0].symptomDescription}
        </Text>
      </TouchableOpacity>
    ));
    const placeholder = metaHelpers.findElement(
      SCREEN_KEY_CHAT_SUGGESTION,
      KEY_PLACEHOLDER
    ).label;
    const SymptomsText = metaHelpers.findElement(
      CHATBOTPROFILE,
      CHATBOTPROFILE_SYMPTOMS
    ).label;
    const WhichSymptomisBotheringYou = metaHelpers.findElement(
      CHATBOTPROFILE,
      CHATBOTPROFILE_WHICHSYMPTOMISBOTHERING
    ).label;
    return (
      <View style={styles.container}>
        <ChatHeader goback={this.handleBackNavigation} />
        {(this.props.isNewConversationCreated || !this.isNewChat()) && (
          <View style={{ paddingHorizontal: 37 }}>
            <View
              style={{ alignItems: "center", marginTop: 34, marginBottom: 28 }}
            >
              <Text style={{
                ...styles.queryHeading,
                ...configureLineHeight("22")
                }}>
                {SymptomsText}
                {/* Symptoms */}
              </Text>
            </View>
            <View style={{ marginBottom: 22 }}>
              <Text style={{
                ...styles.queryDesc,
                ...configureLineHeight("12")
                }}>{WhichSymptomisBotheringYou}</Text>
            </View>
            <View style={styles.contentContainer}>
              <View
                style={{
                  flex: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: "#515B61"
                }}
              >
                <TextInput
                  ref={ref => {
                    this.symptomTextInput = ref;
                  }}
                  autoFocus
                  value={this.props.symptomMessage}
                  onChangeText={val => this.getSymptomSuggestion(val)}
                  placeholder={placeholder}
                  style={styles.textinput}
                />
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {symptomList}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

ChatSuggestion.propTypes = {
  language: PropTypes.string,
  symptomMessage: PropTypes.string,
  responseSuggestionData: PropTypes.array,
  navigation: PropTypes.object,
  getSymptomSuggestionData: PropTypes.func,
  clearSymptomData: PropTypes.func,
  sendSelectedSymptomToBabylon: PropTypes.func,
  resetChatInputType: PropTypes.func,
  goToChatHistory: PropTypes.func,
  isNewConversationCreated: PropTypes.bool,
  clearCreateConversationState: PropTypes.func,
  initBabylonChat: PropTypes.func,
  toggleLoader: PropTypes.func,
  newConversationCreated: PropTypes.func,
};

const mapStateToProps = state => ({
  inputType: state.chat.inputType,
  symptomMessage: state.chat.symptomMessage,
  responseSuggestionData: state.chat.responseSuggestionData,
  responseSelectedData: state.chat.responseSelectedData,
  meta: state.meta,
  token: state.auth.token,
  isNewConversationCreated: state.chat.isNewConversationCreated,
  language: state.userPreferences.language,
});

export default connect(mapStateToProps, {
  sendChatSymptom: value => ({
    type: CoreActionTypes.CHAT_SYMPTOM_SEND,
    payload: value
  }),
  updateFromChatHistory: payload => ({
    type: CoreActionTypes.FROM_CHAT_HISTORY,
    payload
  }),
  getSymptomSuggestionData: payload => ({
    context: pageKeys.CHAT_CONVERSATION,
    type: CoreActionTypes.GET_SYMPTOM_SUGGESTION,
    payload
  }),
  clearSymptomData: () => ({
    type: CoreActionTypes.CLEAR_SYMPTOM_DATA
  }),
  sendSelectedSymptomToBabylon: value => ({
    context: pageKeys.CHAT_CONVERSATION,
    type: CoreActionTypes.CHAT_UPDATE_SYMPTOM_INPUT,
    payload: {
      SymptomInput: value.symptom,
      suggestionID: value.symptomID
    }
  }),
  resetChatInputType: () => ({ type: CoreActionTypes.RESET_CHAT_INPUT_TYPE }),
  updateSelectedData: value => ({
    type: CoreActionTypes.UPDATE_SELECTED_SUGGESSTION,
    payload: value
  }),
  recordSymptomCheckerStartEvent: () => ({
    context: pageKeys.CHAT_CONVERSATION,
    type: CoreActionTypes.RECORD_SYMPTOM_CHECKER_EVENT,
    payload: {
      start: true
    }
  }),
  goToChatConversation: params => ({
    context: pageKeys.CHAT_SUGGESTION,
    type: CoreActionTypes.GO_TO_CHAT_CONVERSATION,
    payload: {
      params
    }
  }),
  newConversationCreated: response => ({
    type: CoreActionTypes.BL_CREATE_CONVERSATION_SUCCESSFUL,
    payload: response
  }),
  initCheckSymptoms,
  initBabylonChat,
  clearCreateConversationState: () => ({
    type: CoreActionTypes.CLEAR_CREATE_CONVERSATION_STATE
  }),
  creatNewChat: () => ({
    context: pageKeys.HA_GET_STARTED,
    type: CoreActionTypes.CREATE_NEW_CONVERSATION
  }),
  goToChatHistory: () => ({
    context: pageKeys.CHAT_SUGGESTION,
    type: CoreActionTypes.GO_TO_CHAT_HISTORY
  }),
  dispatchEvent,
  toggleLoader
})(ChatSuggestion);
