import React, { Component } from "react";
import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  NativeModules,
  DeviceEventEmitter,
  NativeEventEmitter,
  Platform,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Text,
  Image,
  BackHandler,
} from "react-native";
import PropTypes from "prop-types";
import { DatePickerDialog } from "react-native-datepicker-dialog";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ChatUserMessage } from "../SymptomChecker/ChatUserMessage";
import GetStarted from "../HealthCheckAssessment/GetStarted";
import { StackActions } from "react-navigation";
import { path, pathOr } from "ramda";
import { connect } from "react-redux";
import { OfflineImage } from "react-native-image-offline";
import ChatHeader from "./ChatHeader";
import { ChatConversationStyle as styles } from "./styles";
import {configureLineHeight} from "../../utils/lineHeightsUtils";

import {
  gotoPulsehealth,
  gotoCheckSymptopms,
  dispatchEvent,
} from "../../actions";
import {
  CoreActionTypes,
  CoreComponents,
  CoreConfig,
  CoreConstants,
  EventUtils,
  colors,
  metaHelpers,
  CoreUtils,
  CoreSelectors,
  CoreServices,
  events,
} from "@pru-rt-internal/pulse-common";
const { AuthSelector } = CoreSelectors;
const { NavigationService } = CoreServices;
import ChatBotMessage, {
  StaticChatMessageCard,
} from "../../components/ChatBot/ChatBotMessage";
import { BABYLON_LOGO_BLUE, BACK } from "../../config/images";
import ChatHome from "./ChatHome";
import { CustomAlert } from "../../components";
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
  COMMON_KEY_BABYLON_LOGO,
  CHATBOTSYMPTOM,
  NEW_HOME,
  NEW_HOME_GETSTARTED,
  CHATBOTSYMPTOM_DESCRIPTION,
  SCREEN_KEY_GET_STARTED,
  CHATBOTPROFILE,
  CHATBOTPROFILE_COMPLETEYOURDIGITAL,
} = CoreConstants;
const { LinkingHelpers } = CoreUtils;

const KEY_VIEW_DIGITAL_TWIN = "viewdigitaltwin";
const KEY_VIEW_DIGITAL_TWIN_EN = "viewdigitaltwin_en";
const KEY_VIEW_DIGITAL_TWIN_BM = "viewdigitaltwin_bm";
const KEY_VIEW_RESULTS = "viewresults";
const KEY_VIEW_RESULTS_EN = "viewresults_en";
const KEY_VIEW_RESULTS_BM = "viewresults_bm";
const KEY_NONE_OF_THE_ABOVE = "noneoftheabove";
const KEY_DONT_KNOW = "idontknow";
const KEY_CANT_BE_SURE = "icantbesure";
const KEY_NO = "no";
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

// const { BridgeEmitter } = NativeModules;
// const chatBridgeEmitter = new NativeEventEmitter(BridgeEmitter);
// const isIOS = Platform.OS === "ios";
// const eventEmitter = isIOS ? chatBridgeEmitter : DeviceEventEmitter;
let errorAlertEnabled = true;
let chatFinished = false;
export class ChatConversation extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      ShowHealthAssessmentCarousal: false,
    };
    this.listeners = [];
    this.handleEvent = this.handleEvent.bind(this);
    this.handleErrorEvent = this.handleErrorEvent.bind(this);
    this.onClosePressed = this.onClosePressed.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.selectedValue = this.selectedValue.bind(this);
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
    this.renderMainView = this.renderMainView.bind(this);
    this.symptomSuggestionAlert = this.symptomSuggestionAlert.bind(this);
    this.renderNewChat = this.renderNewChat.bind(this);
    this.startNewChat = this.startNewChat.bind(this);
    this.chatUpdateRequestData = this.chatUpdateRequestData.bind(this);
    this.retry = this.retry.bind(this);
    this.leaveChat = this.leaveChat.bind(this);
    if (props.addCustomBackHandler) {
      props.addCustomBackHandler(this.goBack);
    }
  }

  handleEvent(e) {
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
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    const {
      shouldShowTabBar,
      resetChatInputType,
      recordSymptomCheckerEndEvent,
    } = this.props;
    shouldShowTabBar(true);
    resetChatInputType();
    EventUtils.removeListeners(this.listeners);
    if (chatFinished) {
      recordSymptomCheckerEndEvent();
    }
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    const fromHealthAIScreen = pathOr(
      false,
      ["navigation", "state", "params", "fromHealthAIScreen"],
      this.props
    );
    if (fromHealthAIScreen) {
      NavigationService.goBack();
      return true;
    }
    this.props.gotoPulsehealth();
    return true;
  }

  componentDidMount() {
    const { recordHealthAssessmentStartEvent, navigation } = this.props;
    if (
      navigation.state.params &&
      navigation.state.params.fromHealthAssesment &&
      navigation.state.params.fromInitialFlow &&
      navigation.state.params.conversationId == 0
    ) {
      recordHealthAssessmentStartEvent();
    }
    // this.listeners.push(
    //   eventEmitter.addListener("ChatManager", this.handleEvent)
    // );
    // this.listeners.push(
    //   eventEmitter.addListener("ChatError", this.handleErrorEvent)
    // );
  }

  keyExtractor = item => item.id.toString();

  onMessageChange(message) {
    this.props.chatMessageSend(message);
  }
  goBack() {
    // eslint-disable-next-line react/prop-types
    const {
      navigation,
      goToNutrition,
      goToAccessHealth,
      goToChatHome,
    } = this.props;
    const fromHA = path(["state", "params", "fromHealthAssesment"], navigation);
    const fromNT = path(["state", "params", "fromNutrition"], navigation);
    const fromOrgan = path(["state", "params", "organDetailsPage"], navigation);

    const fromHealthAIScreen = pathOr(
      false,
      ["navigation", "state", "params", "fromHealthAIScreen"],
      this.props
    );
    if (fromHealthAIScreen) {
      NavigationService.goBack();
      return;
    }
    if (typeof navigation.state.params === "undefined") {
      goToChatHome();
      return;
    } else if (fromNT || fromOrgan) {
      //goToNutrition();
      this.props.goBack();
      return;
    } else if (fromHA) {
      goToAccessHealth();
      return;
    }
    this.props.goBack();
  }
  startNewChat() {
    this.props.resetChatInputType();
    this.props.clearSymptomData();
    this.props.destroyBabylonChat();
    this.props.babylonChatInitialisation(true);
    this.props.goToChatSuggestion({ newChat: true });
  }

  leaveChat() {
    this.props.resetChatInputType();
    this.props.destroyBabylonChat();
    this.goBack();
  }

  findElement = elementKey =>
    metaHelpers.findElement(SCREEN_KEY_CHAT_CONVERSATION, elementKey);

  showErrorAlert() {
    const msgnotsent = this.findElement(KEY_MESSAGE_NOT_SENT).label;
    const tryagain = this.findElement(KEY_TRYAGAIN).label;
    const cancel = this.findElement(KEY_CANCEL).label;
    CustomAlert.show("", msgnotsent, {
      positiveText: tryagain,
      onPositivePress: () => {
        this.retry();
      },
      negativeText: cancel,
      onNegativePress: () => {
        this.goBack();
      },
    });
  }
  undoMessage(id) {
    this.props.undoChat(id);
  }
  renderNewChat() {
    const startNewChatTriage = this.findElement(KEY_STARTNEWCHATTRIAGE).label;
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
  renderItem(data) {
    const typing = this.findElement(KEY_TYPING).label;
    const viewRes = this.findElement(KEY_VIEW_RESULTS).label;
    const { item } = data;
    if (item.owner !== BOT) {
      return (
        <ChatUserMessage
          key={item.id}
          value={item.data.textMessage}
          item={item}
          undoMessage={this.undoMessage}
        />
      );
    } else if (item.owner === BOT) {
      if (item.data.textMessage) {
        return <ChatBotMessage key={item.id} value={item.data.textMessage} />;
      } else if (item.type === TRIAGE_OUTCOME) {
        if (!this.props.navigation.state.params) {
          chatFinished = true;
        }
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

  // eslint-disable-next-line complexity
  selectedValue(value, type) {
    const viewDigTwinEn = this.findElement(KEY_VIEW_DIGITAL_TWIN_EN).label;
    const viewDigTwinBm = this.findElement(KEY_VIEW_DIGITAL_TWIN_BM).label;
    const viewResEn = this.findElement(KEY_VIEW_RESULTS_EN).label;
    const viewResBm = this.findElement(KEY_VIEW_RESULTS_BM).label;
    const leaveChatEn = this.findElement(KEY_LEAVE_CHAT_EN).label;
    const leaveChatBm = this.findElement(KEY_LEAVE_CHAT_BM).label;
    const startNewChat = this.findElement(KEY_STARTNEWCHATBB).label;

    if (type === SingleOptionInput) {
      if (value === "Call 995") {
        LinkingHelpers.phonecall("995", true);
        if (!this.props.navigation.state.params) {
          chatFinished = true;
        }
      } else if (value === "Call 999" || value === "Hubungi 999") {
        LinkingHelpers.phonecall("999", true);
        if (!this.props.navigation.state.params) {
          chatFinished = true;
        }
      } else if (
        value === viewDigTwinEn ||
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
        this.props.shouldShowTabBar(true);
        this.props.goToFullAssessment({
          fromHealthCheckHome: true,
          refreshData: true,
          navAndResetStack: true,
        });
      } else if (
        value.toLowerCase() === viewResEn.toLowerCase() ||
        value.toLowerCase() === viewResBm.toLowerCase() ||
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
            });
          } else {
            this.props.goToNutrition({
              screenTitle: this.props.navigation.state.params.screenTitle,
              value: this.props.navigation,
              flowId: this.props.navigation.state.params.flowId,
              organDetailsPage: this.props.navigation.state.params
                .organDetailsPage,
              refreshCategoriesDetails: true,
              fromNutrition: true,
            });
          }
        } else {
          this.props.goToFullAssessment({});
        }
      } else if (value === startNewChat) {
        this.startNewChat();
      } else if (
        value.toLowerCase() === leaveChatEn.toLowerCase() ||
        value.toLowerCase() === leaveChatBm.toLowerCase() ||
        value === "Leave chat"
      ) {
        this.leaveChat();
      } else {
        this.chatUpdateRequestData(value, type);
      }
    } else {
      this.chatUpdateRequestData(value, type);
    }
  }

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
            ? {...styles.digitalTwinStyle, ...configureLineHeight("14") }
            : {...styles.singleSelectText,  ...configureLineHeight("14")};
          return (
            <TouchableOpacity
              key={index}
              style={selectStyle}
              onPress={() => this.selectedValue(item.value, SingleOptionInput)}
            >
              <View style={viewStyle}>
                {item.value.toLowerCase() === "view results" ? (
                  <View style={styles.btn}>
                    <Text style={{
                      ...styles.viewResultBtnText,
                      ...configureLineHeight("14")
                      }}>{item.value}</Text>
                  </View>
                ) : (
                  <Label value={item.value} style={labelStyle} />
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
            <Label value={this.props.dateText} style={{
              ...styles.datePickerText,
              ...configureLineHeight("14")
              }} />
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
    const viewDigTwin = this.findElement(KEY_VIEW_DIGITAL_TWIN).label;
    return item.value === viewDigTwin;
  };
  renderMultipleOption(customInput) {
    const msg1 = this.findElement(KEY_NONE_OF_THE_ABOVE).label;
    const msg2 = this.findElement(KEY_DONT_KNOW).label;
    const msg3 = this.findElement(KEY_CANT_BE_SURE).label;
    const msg4 = this.findElement(KEY_NO).label;
    const submit = this.findElement(KEY_SUBMIT).label;
    return (
      <MultiSelect
        options={customInput}
        multiple={true}
        returnValue={"label"}
        callback={res => {
          this.multiSelectValue(res);
        }}
        disableMultiSelectItems={[msg1, msg2, msg3, msg4]}
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
      />
    );
  }
  checkSymptomSuggestion() {
    const { navigation, inputValues } = this.props;
    if (
      inputValues.length != 0 &&
      inputValues[0]["isSuggestionAvailable"] &&
      !path(["state", "params", "fromHealthAssesment"], navigation)
    ) {
      this.symptomSuggestionAlert();
    }
  }

  symptomSuggestionAlert() {
    const redirectMsg = this.findElement(KEY_REDIRECT).label;
    const ok = this.findElement(KEY_OK).label.toUpperCase();
    CustomAlert.show("", redirectMsg, {
      positiveText: ok,
      onPositivePress: () => {
        this.props.goToChatSuggestion({ newChat: false });
      },
    });
  }

  renderInput() {
    const { inputType, inputValues } = this.props;
    const enterdetail = this.findElement(KEY_ENTER_DETAIL).label;
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
      const customInput = arrayToObject(inputValues, "value");
      return this.renderMultipleOption(customInput);
    } else if (inputType == DATE_INPUT) {
      return this.renderDateInput();
    } else if (inputType == BUTTON_INPUT) {
      return this.renderNewChat();
    }
    return <Label value="undefined" />;
  }

  dispatchGetStartedEvent = () => {
    const eventPayload = {
      type: "ClickEvent",
      tags: ["babylon"],
      name: "pulse.babylon.healthAssessment.getStarted",
      source: "pulse",
      attributes: {
        appVersion: path(["auth", "userAgent", "appVersion"], this.props),
      },
    };
    this.props.dispatchEvent(eventPayload);
  };

  renderMainView() {
    const BabylonGetStartMsg = metaHelpers.findElement(
      CHATBOTSYMPTOM,
      CHATBOTSYMPTOM_DESCRIPTION
    ).label;
    const GetStartedMsg = metaHelpers.findElement(NEW_HOME, NEW_HOME_GETSTARTED)
      .label;
    const CompleteyourDigital = metaHelpers.findElement(
      CHATBOTPROFILE,
      CHATBOTPROFILE_COMPLETEYOURDIGITAL
    ).label;
    const { ShowHealthAssessmentCarousal } = this.state;
    const ok = metaHelpers
      .findElement(SCREEN_KEY_CHAT_REPORT, KEY_OK)
      .label.toUpperCase();
    const stateParams = this.props.navigation.state.params || {};
    let dom = null;

    const { babylonToken } = this.props;

    if (!babylonToken) {
      dom = (
        <View style={{ backgroundColor: "#fff" }}>
          <ChatHeader goback={() => NavigationService.navigate("MainTab")} />
          <View style={{ marginTop: 24 }}>
            <StaticChatMessageCard
              value={BabylonGetStartMsg}
              title={GetStartedMsg}
              _onPress={() =>
                this.props.gotoCheckSymptopms({
                  healthFlowsData: stateParams.healthFlowsData,
                  owntype: stateParams.owntype,
                })
              }
            />
          </View>
        </View>
      );
    } else if (babylonToken) {
      dom = (
        <View style={{ backgroundColor: "#fff" }}>
          <ChatHeader goback={() => NavigationService.navigate("MainTab")} />
          <StaticChatMessageCard
            value={CompleteyourDigital}
            title={GetStartedMsg}
            _onPress={() => {
              this.dispatchGetStartedEvent();
              this.setState({
                ShowHealthAssessmentCarousal: true,
              });
            }}
          />
          {ShowHealthAssessmentCarousal && (
            <View
              style={{
                width: "100%",
                height: "60%",
              }}
            >
              <GetStarted
                navigation={this.props.navigation}
                data={this.props}
              />
            </View>
          )}
        </View>
      );
    }
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
            {dom}
          </React.Fragment>
        )}
      </View>
    );
  }

  render() {
    this.checkforTabbar();

    if (Platform.OS === "ios" && !this.state.ShowHealthAssessmentCarousal) {
      return (
        <View
          style={{
            width: "100%",
            flex: 1,
          }}
        >
          <KeyboardAvoidingView
            style={styles.flexStyle}
            behavior="padding"
            keyboardVerticalOffset={20}
          >
            {this.renderMainView()}
          </KeyboardAvoidingView>
        </View>
      );
    }
    return this.renderMainView();
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
  babylonToken: PropTypes.string,
  babylonChatInitialisation: PropTypes.func,
  recordHealthAssessmentStartEvent: PropTypes.func,
  recordHealthAssessmentEndEvent: PropTypes.func,
  recordSymptomCheckerEndEvent: PropTypes.func,
  dispatchEvent: PropTypes.func,
  auth: PropTypes.object,
};

ChatConversation.defaultProps = {
  multiSelectInputColor: colors.crimson, //TODO: sg color - "#a8a8a8";
};

const mapStateToProps = state => ({
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
  countryCode: state.profile.countryCode,
  token: state.auth.token,
  babylonToken: AuthSelector.getBabylonToken(state),
  healthFlowsData: state.healthCheck.healthFlows,
  auth: state.auth,
});

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
    let sendMessage;
    if (type === "TextInput") {
      if (value && value.trim() !== "") {
        sendMessage = { TextInput: value };
        return {
          context: pageKeys.CHAT_CONVERSATION,
          type: CoreActionTypes.CHAT_UPDATE_TEXT_INPUT,
          payload: sendMessage,
        };
      }
      alert(
        metaHelpers.findBackendErrorMessageByScreen(
          SCREEN_KEY_CHAT_CONVERSATION,
          KEY_ENTER_TEXT,
          KEY_SUBMIT
        )
      );
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
      alert(
        metaHelpers.findBackendErrorMessageByScreen(
          SCREEN_KEY_CHAT_CONVERSATION,
          KEY_SELECT_OPTION,
          KEY_SUBMIT
        )
      );
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
  getassesmentdata: () => ({
    context: pageKeys.MAIN_PAGE,
    type: CoreActionTypes.GET_HEALTH_FLOWS,
  }),
  presshealthassessment: () => ({
    context: pageKeys.MAIN_PAGE,
    type: CoreActionTypes.GO_TO_ASSESS_HEALTH,
  }),
  gotoPulsehealth,
  gotoCheckSymptopms,
  dispatchEvent,
})(ChatConversation);
