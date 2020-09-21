import React from "react";
import { connect } from "react-redux";
import { Platform, View, StyleSheet, Image, Linking, Text, TouchableOpacity } from "react-native";
import { SMALLYELLOWROBOT } from "../../config/images";
import { Theme } from "../../themes";
const { Colors, Fonts } = Theme;
import PropTypes from "prop-types";
import {
  CoreActionTypes,
  CoreComponents,
  CoreConfig,
  events,
} from "@pru-rt-internal/pulse-common";
import moment from "moment";
import { dispatchEvent } from "../../actions";
import { safeObjectFinder } from "../../utils/meta-utils";
import { configureLineHeight } from "../../utils/lineHeightsUtils";
const { pageKeys } = CoreConfig;
const { Label } = CoreComponents;

const ChatBotMessage = props => {
  const type = safeObjectFinder("babylonchatbot", "highlightedText").includes(props.value);
  return (
    <View style={styles.chatBotMessageContainer}>
      <Image style={styles.chatbotIcon} source={SMALLYELLOWROBOT} />
      <View style={[styles.triangle, styles.triangleLeft]} />
      <View
        style={[
          styles.chatBotMessage,
          { backgroundColor: type ? "rgb(248, 238, 237)" : Colors.white },
        ]}
      >
        {props.value && (props.value.includes("http") || props.value.includes("www")) ? <Text style={{...styles.url, ...configureLineHeight("16")}} onPress={() => { Linking.openURL(props.value) }}>{props.value} </Text> : <Label value={props.value} style={{...styles.labelStyle, ...configureLineHeight("16")}} />}
        {props.data && (
          <TouchableOpacity
            style={styles.submitButtonStyle}
            onPress={() => {
              props.goToChatReport(props.data.id);
              props.dispatchEvent(events.SymptomCheckerChatResult);
            }}
          >
            <Label value={props.title} style={{...styles.submitButtonText, ...configureLineHeight("12")}} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

ChatBotMessage.propTypes = {
  value: PropTypes.string,
  data: PropTypes.object,
  title: PropTypes.string,
};

export default connect(null, {
  goToChatReport: id => ({
    context: pageKeys.CHAT_CONVERSATION,
    type: CoreActionTypes.GO_TO_CHAT_REPORT,
    payload: {
      params: {
        id,
      },
    },
  }),
  dispatchEvent,
})(ChatBotMessage);

const { width } = CoreConfig;
// CHATBOT MESSAGE STYLE
const styles = StyleSheet.create({
  chatBot: {
    alignItems: "center",
    backgroundColor: Colors.white,
    maxWidth: width - 110,
    // flex: 1,
    padding: 10,
    paddingBottom: 15,
    borderBottomLeftRadius: 0,
    borderRadius: 20,
    shadowColor: Colors.grey343A40,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    width: "70%",
    // height: 40,
    justifyContent: "center",
    borderColor: Colors.greyF4F4F4,
    borderWidth: 3,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    // alignItems: "center",
  },
  url: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.black222529,
    textDecorationLine: 'underline', 
    fontFamily: Fonts.fontFamilyAvenirRegular,
    lineHeight: 24,
  },
  chatBotMessage: {
    alignItems: "flex-start",
    backgroundColor: Colors.white,
    maxWidth: width - 110,
    // flex: 1,
    padding: 10,
    paddingBottom: Platform.OS === "ios" ? 10 : 15,
    borderBottomLeftRadius: 0,
    borderRadius: 20,
    shadowColor: Colors.grey343A40,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    width: "70%",
    // height: 40,
    justifyContent: "center",
    borderColor: Colors.greyF4F4F4,
    borderWidth: 3,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    // alignItems: "center",
  },
  chatBotMessageContainer: {
    flexDirection: "row",
    margin: 7.5,
    width: width,
  },
  chatbotIcon: {
    height: 42,
    marginRight: 5,
    width: 42,
  },
  labelStyle: {
    flex: 1,
    flexWrap: "wrap",
    color: Colors.black222529,
    fontFamily: Fonts.fontFamilyAvenirRegular,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: Platform.OS === "ios" ? 26 : 22,
  },
  staticLabelStyle: {
    color: Colors.black222529,
    fontFamily: Fonts.fontFamilyAvenirRegular,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: Platform.OS === "ios" ? 26 : 22
  },
  submitButtonStyle: {
    alignItems: "center",
    backgroundColor: Colors.pulseRed,
    // borderColor: colors.warmGray,
    borderRadius: 6,
    // borderWidth: 0.5,
    // height: 40,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 26,
    paddingRight: 26,
    justifyContent: "center",
    // margin: 10,
    marginBottom: 0,
    marginTop: 20,
    // width: 102
  },
  submitButtonText: {
    color: Colors.white,
    fontFamily: Fonts.AvenirMediums,
    fontSize: 12,
    letterSpacing: 1.07,
    lineHeight: 15,
  },
  triangle: {},
  triangleLeft: {},
});

export function StaticChatMessageCard(props) {
  const { value, _onPress, title } = props;
  return (
    <View style={styles.chatBotMessageContainer}>
      <Image style={styles.chatbotIcon} source={SMALLYELLOWROBOT} />
      <View style={styles.chatBot}>
        <Label value={value} style={{...styles.staticLabelStyle, ...configureLineHeight("16")}} />
        {_onPress && (
          <TouchableOpacity style={styles.submitButtonStyle} onPress={_onPress}>
            <Label value={title} style={{...styles.submitButtonText, ...configureLineHeight("12")}} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
