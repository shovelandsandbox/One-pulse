import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { AVATAR, SMALLYELLOWROBOT } from "../../../../config/images";
import PropTypes from "prop-types";
import {
  CoreActionTypes,
  CoreComponents,
  CoreConfig
} from "@pru-rt-internal/pulse-common";
import styles from "./styles"
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const { pageKeys } = CoreConfig;
const { Label } = CoreComponents;

const ChatBotMessage = props => {
  const type =
    props.value ===
    "Please remember this isn't a medical diagnosis or a replacement for seeing a doctor. It is only for general well-being purposes. Any health-related information provided should not be treated as medical advice. Please consult a physician for any medical advice required." ||
    props.value ===
    "The following shows possible causes and actions to take relating to these symptoms. This is intended for use only for general wellbeing purpose and is not intended to be used for any medical purpose (such as the detection, diagnosis or treatment of any medical condition or disease). Any health-related information provided should not be treated as medical advice. Please consult a physician for any medical advice required." ||
    props.value ===
    "Please note, Healthcheck is a lifestyle app intended for use only for general wellbeing purposes. Risk profiles are based on population group, not individual risks. Results are for information purposes only, do not constitute diagnosis and are not intended to be used for any medical purpose (such as the detection, diagnosis, monitoring, management or treatment of any medical condition or disease). Any health-related information provided should not be treated as medical advice. Please consult a physician for any medical advice required.";

  return (
    <View style={styles.chatBotMessageContainer}>
      <Image
        style={styles.chatbotIcon}
        source={
          props.isChat
            ? props.portrait
              ? { uri: `${props.profilePicture}` }
              : AVATAR
            : SMALLYELLOWROBOT
        }
      />
      <View style={[styles.triangle, styles.triangleLeft]} />
      {props.type === "card" ? (
        <View style={{ marginLeft: 5 }}>{props.children}</View>
      ) : props.imgBase ? (
        <TouchableOpacity
          onPress={() => props.imgPress && props.imgPress()}
          style={styles.imgBox}
        >
          <Image
            style={styles.imageBase}
            source={{ uri: `${props.imgBase}` }}
          />
        </TouchableOpacity>
      ) : props.isPdf ? (
        props.children ? (
          props.children
        ) : null
      ) : (
              <View style={{
                ...styles.View1, backgroundColor: type ? Colors.whiteSmokeRGB1 : Colors.white,
              }}>
                {props.value &&
                  (props.value.includes("http") || props.value.includes("www")) ? (
                    <Text
                      style={styles.propsValueText1}
                      onPress={() => {
                        Linking.openURL(props.value);
                      }}
                    >
                      {props.value}{" "}
                    </Text>
                  ) : (
                    <Text style={styles.propsValueText2}>
                      {" "}
                      {props.value}{" "}
                    </Text>
                  )}
                {props.children ? props.children : null}
                {props.data && (
                  <TouchableOpacity
                    style={styles.submitButtonStyle}
                    onPress={() => {
                      if (props.goToChatHome) {
                        props.goToChatHome();
                      } else {
                        props.goToChatReport(props.data.id);
                      }
                    }}
                  >
                    <Label value={props.title} style={styles.submitButtonText} />
                  </TouchableOpacity>
                )}
              </View>
            )}
    </View>
  );
};

ChatBotMessage.propTypes = {
  value: PropTypes.string,
  data: PropTypes.object,
  title: PropTypes.string
};

export default connect(null, {
  goToChatReport: id => ({
    context: pageKeys.CHAT_CONVERSATION,
    type: CoreActionTypes.GO_TO_CHAT_REPORT,
    payload: {
      params: {
        id
      }
    }
  })
})(ChatBotMessage);


