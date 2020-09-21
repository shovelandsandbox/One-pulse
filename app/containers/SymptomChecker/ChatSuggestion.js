import React, { Component } from "react";
import {
  TextInput,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { path } from "ramda";
import { ChatSuggestionStyle as styles } from "./styles";
import { Header } from "../../components/ChatComponent/Header";
import {
  CoreActionTypes,
  CoreComponents,
  CoreConfig,
  metaHelpers,
  CoreConstants,
  EventUtils,
  CoreActions,
} from "@pru-rt-internal/pulse-common";
import { CLOSE } from "../../config/images";
const { Label } = CoreComponents;
const { pageKeys } = CoreConfig;
const { SCREEN_KEY_CHAT_SUGGESTION } = CoreConstants;
const KEY_PLACEHOLDER = "placeholder";
const KEY_DESCRIPTION = "description";

export class ChatSuggestion extends Component {
  constructor(props) {
    super(props);
    this.onClear = this.onClear.bind(this);
  }
  componentDidMount() {
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
    this.props.clearSymptomData();
  }

  didBlurHandler = () => {
    const { navigation, resetChatInputType, destroyBabylonChat } = this.props;
    if (path(["state", "params", "newChat"], navigation)) {
      resetChatInputType();
      //destroyBabylonChat();
    }
    this.props.clearSymptomData();
    return true;
  };

  getSymptomSuggestion(message) {
    this.props.sendChatSymptom(message);
    this.props.updateFromChatHistory(false);
    if (message.length >= 3) {
      this.props.getSymptomSuggestionData(message);
    }
  }

  selectSymptom = item => {
    const { recordSymptomCheckerStartEvent } = this.props;
    recordSymptomCheckerStartEvent();
    this.symptomTextInput.blur();
    this.props.clearSymptomData(); //clear symptom data
    this.props.sendSelectedSymptomToBabylon(item.suggestedSymptoms[0]);
    this.props.resetChatInputType(); //set inputType: "NO_INPUT", inputValues: []
    this.props.goToChatConversation();
  };
  onClear() {
    this.props.clearSymptomData();
  }

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
          value={item.suggestedSymptoms[0].symptom}
          style={styles.suggestionHead}
        />
        <Text style={styles.suggestionDescription}>
          {item.suggestedSymptoms[0].symptomDescription}
        </Text>
      </TouchableOpacity>
    ));
    const placeholder = metaHelpers.findElement(
      SCREEN_KEY_CHAT_SUGGESTION,
      KEY_PLACEHOLDER
    ).label;
    const description = metaHelpers.findElement(
      SCREEN_KEY_CHAT_SUGGESTION,
      KEY_DESCRIPTION
    ).label;
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <TextInput
            ref={ref => {
              this.symptomTextInput = ref;
            }}
            autoFocus
            value={this.props.symptomMessage}
            onChangeText={val => this.getSymptomSuggestion(val)}
            placeholder={placeholder}
            style={[styles.textinput, styles.textFlex]}
          />
          <TouchableOpacity
            style={styles.contentCenter}
            onPress={() => {
              this.props.clearSymptomData();
            }}
          >
            <Image style={styles.clearImage} source={CLOSE} />
          </TouchableOpacity>
        </View>
        {symptomList && symptomList.length > 0 && (
          <Text style={styles.chatDescription}>{description}</Text>
        )}
        {this.props.isError && (
          <Text style={styles.errorMessage}>{this.props.chatErrorMsg}</Text>
        )}
        <ScrollView
          style={styles.symptomContainer}
          showsVerticalScrollIndicator={false}
        >
          {symptomList}
        </ScrollView>
      </View>
    );
  }
}

ChatSuggestion.propTypes = {
  symptomMessage: PropTypes.string,
  isError: PropTypes.bool,
  chatErrorMsg: PropTypes.string,
  responseSuggestionData: PropTypes.array,
  navigation: PropTypes.object,
  getSymptomSuggestionData: PropTypes.func,
  clearSymptomData: PropTypes.func,
  sendSelectedSymptomToBabylon: PropTypes.func,
  resetChatInputType: PropTypes.func,
  destroyBabylonChat: PropTypes.func,
};

const mapStateToProps = state => {
  return{
  symptomMessage: state.chat.symptomMessage,
  isError: state.babylonAuth.isError,
  chatErrorMsg: state.babylonAuth.chatErrorMsg,
  responseSuggestionData: state.chat.responseSuggestionData,
  responseSelectedData: state.chat.responseSelectedData,
  meta: state.meta,
  token: state.auth.token,
}};

export default connect(
  mapStateToProps,
  {
    sendChatSymptom: value => ({
      type: CoreActionTypes.CHAT_SYMPTOM_SEND,
      payload: value,
    }),
    updateFromChatHistory: payload => ({
      type: CoreActionTypes.FROM_CHAT_HISTORY,
      payload,
    }),
    getSymptomSuggestionData: payload => ({
      context: pageKeys.CHAT_CONVERSATION,
      type: CoreActionTypes.GET_SYMPTOM_SUGGESTION,
      payload,
    }),
    clearSymptomData: () => ({
      type: CoreActionTypes.CLEAR_SYMPTOM_DATA,
    }),
    sendSelectedSymptomToBabylon: value => ({
      context: pageKeys.CHAT_CONVERSATION,
      type: CoreActionTypes.CHAT_UPDATE_SYMPTOM_INPUT,
      payload: {
        SymptomInput: value.symptom,
        suggestionID: value.symptomID,
      },
    }),
    resetChatInputType: () => ({ type: CoreActionTypes.RESET_CHAT_INPUT_TYPE }),
    updateSelectedData: value => ({
      type: CoreActionTypes.UPDATE_SELECTED_SUGGESSTION,
      payload: value,
    }),
    destroyBabylonChat: () => ({
      context: pageKeys.CHAT_CONVERSATION,
      type: CoreActionTypes.DESTROY_BABYLON_CHAT,
    }),
    recordSymptomCheckerStartEvent: () => ({
      context: pageKeys.CHAT_CONVERSATION,
      type: CoreActionTypes.RECORD_SYMPTOM_CHECKER_EVENT,
      payload: {
        start: true,
      },
    }),
    goToChatConversation: () => ({
      context: pageKeys.CHAT_SUGGESTION,
      type: CoreActionTypes.GO_TO_CHAT_CONVERSATION,
    }),
    updateChatResponse: response => ({
      type: CoreActionTypes.CHAT_BOT_RESPONSE,
      payload: response,
    }),
  }
)(ChatSuggestion);
