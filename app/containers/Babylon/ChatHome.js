import React, { PureComponent } from "react";
import {
  TextInput,
  Image,
  View,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
const { width } = CoreConfig;
import PropTypes from "prop-types";
import { OfflineImage } from "react-native-image-offline";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import {
  colors,
  CoreComponents,
  CoreConfig,
  CoreServices,
  metaHelpers,
  CoreConstants,
  events,
} from "@pru-rt-internal/pulse-common";
const { NavigationService } = CoreServices;
import { ChatHomeStyle as styles } from "./styles";
import {
  CHATBOT_ICON_IMAGE,
  CHAT_HISTORY_ICON,
  BABYLON_LOGO_BLUE,
  SEARCH_ICON, SMALLYELLOWROBOT } from "../../config/images";
import { userFirstNameSelector } from "../../selectors/SCSelectors";
import {
  goToSymptomSearch,
  goToChatHistory,
  initBabylonChat
} from "./SCActionCreators";
import { dispatchEvent } from "../../actions";
import {configureLineHeight} from "../../utils/lineHeightsUtils";

const {
  SYMPOTOM_INFO,
  VIEW_CHAT_HISTORY,
  BABYLON_CHATBOT,
  CHATBOTPROFILE,
  CHATBOTPROFILE_SYMPTOMS,
  CHATBOTPROFILE_WHICHSYMPTOMISBOTHERING,
  CHATBOTPROFILE_SEARCHSYMPTOM
} = CoreConstants;
import ChatBotMessage from "../../components/ChatBot/ChatBotMessage";
import ChatHeader from "./ChatHeader";


const { Label } = CoreComponents;
const {
  SCREEN_KEY_CHAT_HOME,
  COMMON_KEY_BABYLON_LOGO,
  COMMON_KEY_CHAT_HISTORY_ICON,
} = CoreConfig;

const KEY_TITLE = "title";
const KEY_PLACEHOLDER = "placeholder";
const KEY_CHAT_HISTORY = "chathistory";
const KEY_HI_TEXT = "hiText";

export class ChatHome extends PureComponent {
  constructor(props){
    super(props);
  }
  onInputPress = () => {
    this.props.goToSymptomSearch();
  };

  goToChatHistory = () => {
    this.props.initBabylonChat(false);
    this.props.goToChatHistory();
    this.props.dispatchEvent(events.SymptompCheckerChatHistory);
  };

  renderChatHistoryButton() {
    const chatHistory = metaHelpers.findElement(
      SCREEN_KEY_CHAT_HOME,
      KEY_CHAT_HISTORY
    ).label;
    return (
      <View>
        <TouchableOpacity onPress={this.goToChatHistory}>
          <View style={styles.chatHistoryTouch}>
            <OfflineImage
              accessibilityLabel="chatHistoryIcon"
              resizeMode="contain"
              accessible
              key={COMMON_KEY_CHAT_HISTORY_ICON}
              style={styles.chatHistoryIcon}
              fallbackSource={CHAT_HISTORY_ICON}
              source={{
                uri: metaHelpers.findCommon(COMMON_KEY_BABYLON_LOGO).image,
              }}
            />
            <Label value={chatHistory} style={styles.label} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  goBack = () => {
    const fromHealthAIScreen = pathOr(
      false,
      ["navigation", "state", "params", "fromHealthAIScreen"],
      this.props
    );
    if (fromHealthAIScreen) {
      NavigationService.goBack();
    } else NavigationService.navigate("MainTab");
  };

  render() {
    const placeholder = metaHelpers.findElement(
      SCREEN_KEY_CHAT_HOME,
      KEY_PLACEHOLDER
    ).label;
    const SymptomInfo = metaHelpers.findElement(BABYLON_CHATBOT, SYMPOTOM_INFO)
      .label;
    const viewchathistory = metaHelpers.findElement(
      BABYLON_CHATBOT,
      VIEW_CHAT_HISTORY
    ).label;
    const SymptomsText = metaHelpers.findElement(
      CHATBOTPROFILE,
      CHATBOTPROFILE_SYMPTOMS
    ).label;
    const WhichSymptomisBotheringYou = metaHelpers.findElement(
      CHATBOTPROFILE,
      CHATBOTPROFILE_WHICHSYMPTOMISBOTHERING
    ).label;
    const SearchSymptom = metaHelpers.findElement(
      CHATBOTPROFILE,
      CHATBOTPROFILE_SEARCHSYMPTOM
    ).label;
    return (
      <View style={{ flex: 1, backgroundColor: "rgb(255,255,255)" }}>
        <ChatHeader goback={() => this.goBack()} />
        <View style={styles.wrapper}>
          {/* <ChatBotMessage value='Please input your symptoms' /> */}
          <View
            style={{
              flexDirection: "row",
              margin: 7.5,
            }}
          >
            <Image
              style={{
                height: 42,
                marginRight: 5,
                width: 42,
              }}
              source={SMALLYELLOWROBOT}
            />
            <View
              style={{
                alignItems: "center",
                overflow: "hidden",
                backgroundColor: colors.white,
                shadowColor: "#343A40",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                width: "70%",
                justifyContent: "center",
                borderColor: "rgb(244,244,244)",
                borderWidth: 2,
                borderRadius: 20,
                borderBottomLeftRadius: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: " #515B61",
                  padding: 15,
                  ...configureLineHeight("12")
                }}
              >
                {SymptomInfo}
                {/* Hi there! I can help you look into your symptoms, or you can click on the button below to check our chat history. */}
              </Text>
              <TouchableOpacity
                style={{
                  width: "100%",
                  backgroundColor: "#ED1B2E",
                  height: 47,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={this.goToChatHistory}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#FFF",
                    ...configureLineHeight("16")
                  }}
                >
                  {viewchathistory}
                  {/* View Chat History */}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomPart}>
            <Text style={{
              ...styles.heading,
              ...configureLineHeight("20")
              }}>
              {SymptomsText}
              {/* Symptoms */}
            </Text>
            <Text style={{
              ...styles.desc,
              ...configureLineHeight("12")
              }}>
              {WhichSymptomisBotheringYou}
              {/* Which symptom is bothering you. */}
            </Text>
            <TouchableOpacity onPress={this.onInputPress}>
              <View pointerEvents="none" style={styles.searchBox}>
                <View style={{ marginRight: 14 }}>
                  <Image
                    source={SEARCH_ICON}
                    style={{ width: 20, height: 20 }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: "#515B61",
                  }}
                >
                  <TextInput
                    editable={false}
                    placeholder={SearchSymptom}
                    // 'Search a symptom'
                    style={styles.textinput}
                  />
                </View>
              </View>
            </TouchableOpacity>
            {/* {this.renderChatHistoryButton()} */}
          </View>
        </View>
      </View>
    );
  }
}

ChatHome.propTypes = {
  userFirstName: PropTypes.string,
};

const mapStateToProps = state => ({
  userFirstName: userFirstNameSelector(state.profile),
});

export default connect(mapStateToProps, {
  goToSymptomSearch,
  goToChatHistory,
  initBabylonChat,
  dispatchEvent,
})(ChatHome);
