import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import PropTypes from "prop-types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ChatUserMessageStyle as styles } from "./styles";
import { CoreComponents } from "@pru-rt-internal/pulse-common";
import { ICON_AVATAR_HEAD } from "../../config/images";
import {configureLineHeight} from "../../utils/lineHeightsUtils";
const { Label } = CoreComponents;

const ChatUserMessage = props => {
  return (
  <View style={styles.userMessageContainer}>
    {props.item.undoStatus == "ENABLED" && (
      <TouchableOpacity
        style={styles.undoButtonStyle}
        onPress={() => {
          props.undoMessage(props.item.id);
        }}
      >
        <MaterialIcons name="refresh" size={25} color="#a8a8a8" />
      </TouchableOpacity>
    )}
    <View style={styles.userMessage}>
      <Label value={props.value} style={{
        ...styles.labelStyle,
        ...configureLineHeight("16")
        }} />
    </View>
    <Image
      style={{
        height: 42,
        marginLeft: 5,
        width: 42,
      }}
      source={ICON_AVATAR_HEAD} />
  </View>
)};

ChatUserMessage.propTypes = {
  item: PropTypes.object,
  undoMessage: PropTypes.func,
  value: PropTypes.string,
};

export { ChatUserMessage };
