import React from "react";
import PropTypes from "prop-types";
import { Text, View, Image } from "react-native";
import styles from "./styles";

import { AVATAR } from "../../../../config/images";

const MessageItem = ({ data }) => {
  const { userName, message } = data;
  const userNameArray = userName.split("@");

  return (
    <View style={styles.chatItem}>
      <View>
        <Image source={AVATAR} style={styles.avatar} />
      </View>
      <View style={styles.messageItem}>
        <Text style={styles.name}>
          {userNameArray.length > 0 ? userNameArray[0] : ""}
        </Text>
        <Text style={styles.content}>{message}</Text>
      </View>
    </View>
  );
};

MessageItem.propTypes = {
  data: PropTypes.shape({
    userName: PropTypes.string,
    message: PropTypes.string,
  }),
};
MessageItem.defaultProps = {
  data: {
    userName: "",
    message: "",
  },
};

export default MessageItem;
