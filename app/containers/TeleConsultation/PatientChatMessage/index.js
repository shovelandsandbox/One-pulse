import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import { CoreComponents } from "@pru-rt-internal/pulse-common";
import { AVATAR } from "../../../config/images";
const { Label } = CoreComponents;

const ChatUserMessage = props => (
  <View style={styles.userMessageContainer}>
    {props.item.undoStatus == "ENABLED" && (
      <TouchableOpacity style={styles.undoButtonStyle}
        onPress={() => props.undoMessage(props.item.id)}>
        <MaterialIcons name="refresh" size={25} color="#a8a8a8" />
      </TouchableOpacity>
    )}
    {props.imgBase ? (
      <TouchableOpacity onPress={() => props.imgPress && props.imgPress()} style={styles.imgBox}>
        <Image
          style={{
            height: 60,
            width: 60,
            resizeMode: 'contain',
          }}
          source={props.imgBase}
        />
      </TouchableOpacity>
    ) : (<View style={styles.userMessage}>
      <Label value={props.value} style={styles.labelStyle} />
    </View>)}
    <Image style={styles.userProfileImage}
      source={props.profilePicture ?
        { uri: `data:image/jpeg;base64,${props.profilePicture}` }
        : AVATAR} />
  </View>
);

ChatUserMessage.propTypes = {
  item: PropTypes.object,
  undoMessage: PropTypes.func,
  value: PropTypes.string,
};

export { ChatUserMessage };
