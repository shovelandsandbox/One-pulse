import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { AVATAR, SMALLYELLOWROBOT } from "../../../config/images";
import PropTypes from "prop-types";
import {
  colors,
  CoreActionTypes,
  CoreComponents,
  CoreConfig,
} from "@pru-rt-internal/pulse-common";
import styles from "./styles";

const { pageKeys } = CoreConfig;
const { Label } = CoreComponents;
const { width } = CoreConfig;

const DoctorChatBotMessage = props => {
  const type = (props.value === "Please remember this isn't a medical diagnosis or a replacement for seeing a doctor. It is only for general well-being purposes. Any health-related information provided should not be treated as medical advice. Please consult a physician for any medical advice required."
    || props.value === "The following shows possible causes and actions to take relating to these symptoms. This is intended for use only for general wellbeing purpose and is not intended to be used for any medical purpose (such as the detection, diagnosis or treatment of any medical condition or disease). Any health-related information provided should not be treated as medical advice. Please consult a physician for any medical advice required."
    || props.value === "Please note, Healthcheck is a lifestyle app intended for use only for general wellbeing purposes. Risk profiles are based on population group, not individual risks. Results are for information purposes only, do not constitute diagnosis and are not intended to be used for any medical purpose (such as the detection, diagnosis, monitoring, management or treatment of any medical condition or disease). Any health-related information provided should not be treated as medical advice. Please consult a physician for any medical advice required.");

  return (
    <View style={styles.chatBotMessageContainer}>
      <Image style={styles.chatbotIcon} source={props.isChat ? props.portrait ? { uri: `data:image/jpeg;base64,${props.portrait}` } : AVATAR : SMALLYELLOWROBOT} />
      <View style={[styles.triangle, styles.triangleLeft]} />
      {
        props.type === 'card' ? (
          <View style={{ marginLeft: 5 }}>{props.children}</View>
        ) : props.imgBase ? (
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
        ) : props.isPdf ? (
          props.children ? props.children : null
        ) : (
                <View style={{
                  backgroundColor: type ? "rgb(248, 238, 237)" : colors.white,
                  alignItems: "center",
                  maxWidth: width - 110,
                  padding: 10,
                  paddingBottom: 15,
                  borderBottomLeftRadius: 0,
                  borderRadius: 20,
                  shadowColor: "#343A40",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 12,
                  justifyContent: "center",
                  borderColor: "rgb(244,244,244)",
                  borderWidth: 3,
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                }}>
                  {
                    props.value && (props.value.includes("http") || props.value.includes("www")) ? <Text style={{ lineHeight: 22, color: "#210000", textDecorationLine: 'underline', fontSize: 14, fontFamily: "Avenir-Heavy" }} onPress={() => {
                      Linking.openURL(props.value)
                    }}>{props.value} </Text> : <Text style={{ lineHeight: 22, color: "#210000", fontSize: 14, fontFamily: "Avenir-Heavy" }} > {props.value} </Text>
                  }
                  {
                    props.children ? props.children : null
                  }
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
              )
      }
    </View>
  );
};

DoctorChatBotMessage.propTypes = {
  value: PropTypes.string,
  data: PropTypes.object,
  title: PropTypes.string,
};

export default connect(
  null,
  {
    goToChatReport: id => ({
      context: pageKeys.CHAT_CONVERSATION,
      type: CoreActionTypes.GO_TO_CHAT_REPORT,
      payload: {
        params: {
          id,
        },
      },
    }),
  }
)(DoctorChatBotMessage);

export function StaticChatMessageCard(props) {
  const { value, _onPress, title } = props;
  return (
    <View style={styles.chatBotMessageContainer}>
      <Image style={styles.chatbotIcon} source={SMALLYELLOWROBOT} />
      <View style={styles.chatBotMessage}>
        <Label value={value} style={styles.labelStyle} />
        {
          _onPress && <TouchableOpacity
            style={styles.submitButtonStyle}
            onPress={_onPress}
          >
            <Label value={title} style={styles.submitButtonText} />
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export function StaticChatMessageCardTow(props) {
  const { value, _onPress, title } = props;
  return (
    <View style={styles.chatBotMessageContainer}>
      <Image style={styles.chatbotIcon} source={SMALLYELLOWROBOT} />
      <View style={styles.chatBotTowMessage}>
        <View style={{ padding: 10, paddingBottom: 20, borderBottomWidth: 1, borderColor: "#ECEEEF" }}>
          <Label value={value} style={styles.labelStyle} />
        </View>
        {
          _onPress && <TouchableOpacity
            style={[styles.submitButtonStyle, { backgroundColor: "#FFF", marginTop: 0, paddingTop: 12, paddingBottom: 12, }]}
            onPress={_onPress}
          >
            <Text style={{ color: "#ED1B2E", fontFamily: "Avenir-Medium", fontSize: 14 }}>{title}</Text>
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}