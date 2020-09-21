import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import PropTypes from "prop-types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ChatUserMessageStyle as styles } from "./styles";
import { CoreComponents } from "@pru-rt-internal/pulse-common";
import { ICON_AVATAR_HEAD, AVATAR } from "../../config/images";
import { configureLineHeight } from "../../utils/lineHeightsUtils";
const { Label } = CoreComponents;

const ChatUserMessage = props => (
  <View style={styles.userMessageContainer}>
    {props.item.undoStatus == "ENABLED" && (
      <TouchableOpacity
        style={styles.undoButtonStyle}
        onPress={() => props.undoMessage(props.item.id)}
      >
        <MaterialIcons name="refresh" size={25} color="#a8a8a8" />
      </TouchableOpacity>
    )}
    <View style={styles.userMessage}>
      <Label value={props.value} style={{...styles.labelStyle, ...configureLineHeight("16")}} />
    </View>
    <Image
      style={{
        height: 42,
        marginLeft: 5,
        width: 42,
        borderRadius: 21
      }}

      source={props.profilePicture ? { uri: `data:image/jpeg;base64,${props.profilePicture}` } : AVATAR} />
  </View>
);

ChatUserMessage.propTypes = {
  item: PropTypes.object,
  undoMessage: PropTypes.func,
  value: PropTypes.string,
};

export { ChatUserMessage };
