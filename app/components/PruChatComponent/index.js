import React, { PureComponent } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
  Button,
  TouchableHighlight,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./styles";
const bgImageId = "7598d482-b446-4507-8e0d-c1229065494a";
import {
  Bubble,
  GiftedChat,
  Time,
  Day,
  InputToolbar,
} from "react-native-gifted-chat";
import attachIcon from "../../images/ChatBot/attach.png";
import sendIcon from "../../images/ChatBot/send.png";
import { AVATAR } from "../../config/images";
import { isEmpty } from "ramda";
import { metaFinderCB } from "../../features/chatBot/meta-utils";

export class PruChatComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: this.props.messages,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.messages !== state.messages) {
      return { messages: props.messages };
    }
    return state;
  }

  renderDay = props => null; //<Day {...props} textStyle={{ color: "#000" }} />;

  customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderTopColor: "#E8E8E8",
          borderTopWidth: 1,
          padding: 8,
        }}
      />
    );
  };

  renderAvatar = () => {
    const base64Prefix = "data:image/png;base64,";
    const base64Icon = base64Prefix.concat(this.props.profilePicture);

    return <Image source={{ uri: base64Icon }} style={styles.avatarStyle} />;
  };

  customInput = props => {
    const { message } = this.state;
    const base64Prefix = "data:image/png;base64,";
    const base64Icon = base64Prefix.concat(this.props.profilePicture);
    return (
      // <ScrollView style={{ flexGrow: 1 }}>
      <View style={styles.searchSection}>
        <TouchableOpacity
          style={{
            alignSelf: "flex-start",
            alignItems: "center",
            justifyContent: "center",
            height: 34,
            width: 34,
            backgroundColor: "#ffffff",
            borderRightColor: "black",
            borderRightWidth: 1,
          }}
        >
          <Image style={{ width: 20, height: 19.7 }} source={attachIcon} />
        </TouchableOpacity>
        <View
          style={{
            borderLeftWidth: 1,
            borderRightColor: "red",
          }}
        />
        <TextInput
          style={styles.input}
          placeholder={metaFinderCB("writeMessageHere")}
          returnKeyType={"send"}
          //multiline={true}
          //numberOfLines={3}
          onChangeText={text => this.setState({ message: text })}
          value={message}
          blurOnSubmit={false}
          ref={"chatInputRef"}
        />
        {!isEmpty(message) && (
          <TouchableOpacity
            onPress={() => {
              this.props.handleSend([
                {
                  createdAt: new Date(),
                  text: message,
                  user: {
                    _id: "userId",
                    avatar: AVATAR, //base64Icon,
                  },
                  _id: Math.round(Math.random() * 1000000),
                },
              ]);
              this.setState({ message: "" });
            }}
            style={{ alignSelf: "flex-start" }}
          >
            <Image source={sendIcon} style={{ width: 34, height: 34 }} />
          </TouchableOpacity>
        )}
      </View>
      //</ScrollView>
    );
  };

  render() {
    const {
      bubbleStyles,
      user,
      messages,
      handleSend,
      renderCustomActions,
      renderCustomView,
      inverted,
      alignTop,
      showUserAvatar,
      renderBubble,
      renderToolbar,
      renderAvatar,
      profilePicture,
    } = this.props;

    return (
      <GiftedChat
        styles={bubbleStyles}
        user={user}
        messages={messages}
        extraData={this.state.messages}
        onSend={handleSend}
        inverted={inverted}
        alignTop={alignTop}
        showUserAvatar={showUserAvatar}
        //renderAvatar={this.renderAvatar}
        onLongPress={null}
        //renderCustomView={renderCustomView}
        renderActions={renderCustomActions}
        renderDay={this.renderDay}
        renderBubble={renderBubble}
        renderInputToolbar={renderToolbar ? () => null : this.customInput}
        renderAvatarOnTop={true}
        bottomOffset={Platform.OS === "ios" ? 0 : -18}
      />
    );
  }
}

PruChatComponent.propTypes = {};

export default PruChatComponent;
