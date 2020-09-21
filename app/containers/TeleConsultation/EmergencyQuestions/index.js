import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import { path } from "ramda";
import {
  CoreConfig,
  CoreActionTypes,
  CoreUtils,
  events
} from "@pru-rt-internal/pulse-common";
import DoctorChatBotMessage, { StaticChatMessageCard } from "../DoctorChatBotMessage";
import { ChatUserMessage } from "../PatientChatMessage";
import MetaConstants from "./meta";
import { dispatchEvent } from "../../../actions";

const { pageKeys } = CoreConfig;
const { isNilOrEmpty } = CoreUtils;

class EmergencyQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userResponse: null,
    };
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    this.props.getEmergencyQuestions();
    this.props.resetEmergencyQuestionUserInput();
    this.props.getEmergencyInfo();
    this.props.dispatchEvent(events.MyDocEmergencyQuestionScreen)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error != "" && nextProps.error !== this.props.error) {
      Alert.alert(nextProps.error);
    }
    if (nextProps.emergencyQuestionResponseReceived) {
      this.checkEmergencyQuestionResponseAndNavigate(
        nextProps.emergencyQuestionResponse,
        nextProps.emergencyQuestionResponseReceived
      );
    }
    if (this.props.userLanguagePreference !== nextProps.userLanguagePreference) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }

  submitEmergencyQuestion = option => {
    const selectedKey = option ? option.key : path(["userResponse", "key"], this.state);
    this.props.resetEmergencyQuestionUserInput();
    this.props.updateEmergencyQuestionUserInput(selectedKey);
  };

  checkEmergencyQuestionResponseAndNavigate = (emergencyQuestionResponse, isEmergencyQuestionResponseReceived) => {
    if (isEmergencyQuestionResponseReceived && isNilOrEmpty(emergencyQuestionResponse)) {
      this.props.gotoMedicalProfile();
    } else {
      const options = [
        {
          text: this.metaConstants.preConOkayLabel,
        },
      ];
      Alert.alert(this.metaConstants.preConAlertLabel, emergencyQuestionResponse, options, {
        cancelable: false,
      });
      this.props.resetEmergencyQuestionUserInput();
      this.props.goBackToPreviousStack();
    }
  };

  userResponseOptionClicked = option => {
    if (option.key === 1) {
      this.submitEmergencyQuestion(option);
      this.props.dispatchEvent(events.MyDocEmergencyQuestionYesClick)
    } else {
      this.setState({ userResponse: option });
      this.props.dispatchEvent(events.MyDocEmergencyQuestionNoneOfAboveClick)
    }
  };

  renderUserResponseOptions = () => {
    const userResponseOptions = [
      { name: this.metaConstants.yesLabel, key: 1 },
      { name: this.metaConstants.noneOfTheAboveLabel, key: 0 },
    ];
    return userResponseOptions.map((option, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={styles.userResponseOptionButton}
          onPress={() => {

            this.userResponseOptionClicked(option);
          }}>
          <Text
            style={styles.userResponseOptionText}>
            {option.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  emergencyQuestions = () => {
    const {
      EmergencyConditions,
      emergencyConditionTitle,
      emergencyConditionSubTitle,
    } = this.props.emergencyQuestions;

    if (EmergencyConditions.length === 0) {
      return null;
    }

    return (
      <View>
        <DoctorChatBotMessage value={emergencyConditionTitle} />
        <DoctorChatBotMessage>
          <View>
            <Text style={styles.emergencyConditionSubTitleText}>
              {emergencyConditionSubTitle}
            </Text>
            {EmergencyConditions.map((option, index) => {
              return (
                <View key={index}>
                  <Text style={styles.optionText}>{`- ${option}`}</Text>
                </View>
              );
            })}
          </View>
        </DoctorChatBotMessage>
      </View>
    );
  };

  undoMessage = () => {
    this.setState({ userResponse: null });
  };

  render() {
    const profilePicture = this.props.profilePicture || "";
    const data = { undoStatus: "ENABLED" };
    const { EmergencyConditions } = this.props.emergencyQuestions;
    return (
      <SafeAreaView style={styles.wrapper}>
        <ScrollView
          style={styles.wrapper}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ref={ref => (this.flatList = ref)}
          onContentSizeChange={() => {
            setTimeout(() => {
              this.flatList && this.flatList.scrollToEnd({ animated: true });
            });
          }}>
          {EmergencyConditions ? this.emergencyQuestions() : null}
          {this.state.userResponse && (
            <ChatUserMessage
              style={styles.chatUserMessageResponse}
              value={this.state.userResponse.name}
              item={data}
              profilePicture={profilePicture}
              undoMessage={this.undoMessage}
            />
          )}
          {this.state.userResponse && (
            <StaticChatMessageCard
              value={this.metaConstants.preConCompleteMedicalProfileLabel}
              title={this.metaConstants.preConOkayLabel}
              titleType={1}
              _onPress={() => {
                this.props.dispatchEvent(events.MyDocEmergencyQuestionOkClick)
                this.submitEmergencyQuestion();
              }}
            />
          )}
        </ScrollView>
        {!this.state.userResponse && (
          <View style={[styles.buttonStyle, { justifyContent: "center" }]}>
            <Text style={styles.chatBotQuestionaire}>
              {this.metaConstants.preConSelectAnswerLabel}
            </Text>
            <View style={styles.userResponseOptionContainer}>
              {this.renderUserResponseOptions()}
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    meta: state.meta,
    profilePicture: state.profile.profilePicture,
    emergencyQuestions: state.doctorServices.emergencyQuestions || {},
    emergencyQuestionResponse: state.doctorServices.emergencyQuestionResponse,
    emergencyQuestionResponseReceived: state.doctorServices.emergencyQuestionResponseReceived,
    userLanguagePreference: state.userPreferences.language
  };
};

export default connect(mapStateToProps, {
  dispatchEvent,
  getEmergencyQuestions: () => ({
    context: pageKeys.DOC_SERVICE_EMERGENCY_QUESTIONS,
    type: CoreActionTypes.DOC_SERVICE_GET_EMERGENCY_QUESTIONS,
  }),
  resetEmergencyQuestionUserInput: () => ({
    type: CoreActionTypes.RESET_DOC_SERVICE_UPDATE_EMERGENCY_QUESTION_USER_INPUT,
  }),
  getEmergencyInfo: () => ({
    context: pageKeys.DOC_SERVICE_LANDING,
    type: CoreActionTypes.DOC_SERVICE_GET_EMERGENCY_INFO,
  }),
  updateEmergencyQuestionUserInput: (selectedKey) => ({
    context: pageKeys.DOC_SERVICE_EMERGENCY_QUESTIONS,
    type: CoreActionTypes.DOC_SERVICE_UPDATE_EMERGENCY_QUESTION_USER_INPUT,
    payload: {
      emergencyInput: selectedKey === 1 ? "true" : "false",
    },
  }),
  goBackToPreviousStack: () => ({
    context: pageKeys.ALL,
    type: CoreActionTypes.GO_TO_MAIN_PAGE,
  }),
  gotoMedicalProfile: () => ({
    context: pageKeys.DOC_SERVICE_PLAN_SELECTION,
    type: pageKeys.MYDOC_MEDICAL_PROFILE,
  })
})(EmergencyQuestions);
