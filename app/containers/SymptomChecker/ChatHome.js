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
import PropTypes from "prop-types";
import { OfflineImage } from "react-native-image-offline";
import { connect } from "react-redux";
import {
  CoreComponents,
  CoreConfig,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";
import { ChatHomeStyle as styles } from "./styles";
import {
  CHATBOT_ICON_IMAGE,
  CHAT_HISTORY_ICON,
  BABYLON_LOGO_BLUE,
 } from "../../config/images";
import { userFirstNameSelector } from "../../selectors/SCSelectors";
import {
  initBabylonChat,
  goToSymptomSearch,
  goToChatHistory,
} from "./SCActionCreators";

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
  constructor(props) {
    super(props);
    this.onInputPress = this.onInputPress.bind(this);
  }

  onInputPress() {
    this.props.initBabylonChat(true);
    this.props.goToSymptomSearch();
  }

  goToChatHistory = () => {
    this.props.initBabylonChat(false);
    this.props.goToChatHistory();
  };

  renderChatHistoryButton() {
    const chatHistory = metaHelpers.findElement(
      SCREEN_KEY_CHAT_HOME,
      KEY_CHAT_HISTORY
    ).label;
    return (
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
    );
  }

  render() {
    const title = metaHelpers.findElement(SCREEN_KEY_CHAT_HOME, KEY_TITLE)
      .label;
    const hi = metaHelpers.findElement(SCREEN_KEY_CHAT_HOME, KEY_HI_TEXT).label;
    const bg = metaHelpers.findScreen(SCREEN_KEY_CHAT_HOME).image;
    const placeholder = metaHelpers.findElement(
      SCREEN_KEY_CHAT_HOME,
      KEY_PLACEHOLDER
    ).label;

    return (
      <React.Fragment>
        <OfflineImage
          accessibilityLabel="babylonLogo"
          resizeMode="contain"
          accesible
          key={COMMON_KEY_BABYLON_LOGO}
          style={styles.babylonHeader}
          fallbackSource={BABYLON_LOGO_BLUE}
          source={{
            uri: metaHelpers.findCommon(COMMON_KEY_BABYLON_LOGO).image,
          }}
        />
        <ScrollView style={styles.container}>
          <View style={styles.topContainer}>
            <ImageBackground
              style={styles.chatBackground}
              resizeMode="stretch"
              source={{ uri: bg }}
            >
              <View style={styles.chatBotWithBack}>
                <View style={styles.chatbotContainer}>
                  <Image
                    style={styles.chatbotIcon}
                    source={CHATBOT_ICON_IMAGE}
                  />
                  <Text
                    style={[styles.headText, styles.textMaxWidth]}
                    numberOfLines={1}
                  >
                    {hi}
                    {this.props.userFirstName},
                  </Text>
                  <Text style={styles.headText}>{title}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={this.onInputPress}>
              <View pointerEvents="none">
                <TextInput
                  editable={false}
                  placeholder={placeholder}
                  style={styles.textinput}
                />
              </View>
            </TouchableOpacity>
            {this.renderChatHistoryButton()}
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

ChatHome.propTypes = {
  userFirstName: PropTypes.string,
};

const mapStateToProps = state => ({
  userFirstName: userFirstNameSelector(state.profile),
});

export default connect(
  mapStateToProps,
  {
    initBabylonChat,
    goToSymptomSearch,
    goToChatHistory,
  }
)(ChatHome);
