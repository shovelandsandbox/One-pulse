import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import moment from "moment";
import Styles from "./styles";
import missPrudence from "../../images/ChatBot/missPrudence.png";
import { pathOr } from "ramda";

class BubbleComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      image: missPrudence,
    };
  }

  // eslint-disable-next-line max-params
  onClickOption(
    message,
    enable,
    handleSend,
    setMessage,
    messages,
    userInfo,
    payload
  ) {
    if (enable) {
      const newMessageList = messages;
      newMessageList[newMessageList.length - 1].quickReplies.enable = false;
      setMessage(newMessageList);
      handleSend([
        {
          createdAt: new Date(),
          text: message,
          payload,
          user: userInfo,
          _id: Math.round(Math.random() * 1000000),
        },
      ]);
    }
  }

  // eslint-disable-next-line complexity
  render() {
    const {
      isChatBot,
      isChatBotStartMessage,
      currentMessage,
      handleSend,
      setMessage,
      messages,
      userInfo,
    } = this.props;

    if (isChatBotStartMessage) {
      return (
        <View style={Styles.imageContainer}>
          <Image
            style={Styles.tinyLogo}
            source={this.state.image}
            resizeMode={"contain"}
          />
        </View>
      );
    }
    if (pathOr(0, ["quickReplies", "values", "length"], currentMessage)) {
      return (
        <View style={Styles.chatBotOptionContainer}>
          <Text style={[Styles.chatBotTextColor, { fontWeight: "bold" }]}>
            {currentMessage.text}
          </Text>
          <FlatList
            data={currentMessage.quickReplies.values}
            keyExtractor={(item, index) => item.text + index}
            listKey={new Date().toString()}
            columnWrapperStyle={{ flexWrap: "wrap" }}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={e => {
                  e.preventDefault();
                  this.onClickOption(
                    item.title,
                    currentMessage.quickReplies.enable,
                    handleSend,
                    setMessage,
                    messages,
                    userInfo,
                    item.payload
                  );
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    maxWidth: 113,
                    height: 49,
                    minWidth: 56,
                    borderColor: "#efefef",
                    borderRadius: 10,
                    margin: 5,
                    backgroundColor: "#fff5f5",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#ec2328",
                      textAlign: "center",
                      fontSize: 13,
                      lineHeight: 14,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <Text
            style={[
              Styles.timeText,
              isChatBot ? Styles.chatBotTimeText : Styles.userTimeText,
            ]}
          >
            {moment(currentMessage.createdAt).format("HH:mm a")}
          </Text>
        </View>
      );
    }

    return (
      <View style={{ flexDirection: "row" }}>
        {isChatBot && currentMessage.firstMessage && (
          <View
            style={{
              transform: [{ rotateZ: "45deg" }],
              width: 15.3,
              height: 16.3,
              backgroundColor: "white",
              marginTop: 14,
              position: "absolute",
              marginLeft: -6,
            }}
          ></View>
        )}
        <View
          style={
            isChatBot ? Styles.chatBotViewContainer : Styles.userViewContainer
          }
        >
          <Text
            style={isChatBot ? Styles.chatBotTextColor : Styles.userTextColor}
          >
            {currentMessage.text}
          </Text>
          <Text
            style={[
              Styles.timeText,
              isChatBot ? Styles.chatBotTimeText : Styles.userTimeText,
            ]}
          >
            {moment(currentMessage.createdAt).format("HH:mm a")}
          </Text>
        </View>
        {!isChatBot && (
          <View
            style={{
              transform: [{ rotateZ: "45deg" }],
              width: 15.3,
              height: 16.3,
              backgroundColor: "#ec2341",
              marginTop: 13,
              marginLeft: -8,
            }}
          ></View>
        )}
      </View>
    );
  }
}

BubbleComponent.propTypes = {};

export default BubbleComponent;
