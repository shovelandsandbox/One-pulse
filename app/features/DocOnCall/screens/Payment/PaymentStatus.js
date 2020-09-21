import React from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import styles from "./styles";
import {
  CoreComponents,
  CoreConstants,
  CoreConfig,
  CoreActionTypes,
  metaHelpers
} from "@pru-rt-internal/pulse-common";
import Modal from "react-native-modal";
import { ACCESS_GRANTED, CLOSE_NEW, AUDIO_CALL, VIDEO_CHAT } from "../../../../config/images";
const {
  PaymentConfirmationStatus,
  ConsultationType,
  SYMPTOMS_COUNTER_LMIT,
  CONSULTATION_SERVICE_ID
} = CoreConstants;
const { AppButton, Header } = CoreComponents;
const { pageKeys } = CoreConfig;
class PaymentStatus extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mode: ConsultationType.AUDIO_CHAT,
      status: PaymentConfirmationStatus.FAILURE,
      isSymptomsModalVisible: false,
      symptoms: ""
    };
  }
  goBack = () => {
    this.props.goBack();
  };
  tryagain = () => {
    this.props.tryagain();
  };
  onNext = () => {
    this.setState({
      isSymptomsModalVisible: true
    });
  };
  requestConsultation = () => {
    this.setState({
      isSymptomsModalVisible: false
    });
    const { serviceId, paymentStatus } = this.props.navigation.state.params;
    const service =
      serviceId === CONSULTATION_SERVICE_ID.VIDEO
        ? ConsultationType.VIDEO_CHAT
        : ConsultationType.AUDIO_CHAT;
    this.props.requestconsult(service, this.state.symptoms);
  };
  renderSymptomsModal = () => {
    return (
      <Modal
        isVisible={this.state.isSymptomsModalVisible}
        onBackdropPress={() => this.setState({ isSymptomsModalVisible: false })}
      >
        <KeyboardAvoidingView behavior="position" enabled>
          <View style={styles.profileModalContent}>
            <View style={styles.modalStyle}>
              <Text style={styles.modalLabel}>{this.symptoms}</Text>
              <View style={styles.modalButtonContainer}>
                <TextInput
                  style={styles.symptomsTextInput}
                  multiline={true}
                  numberOfLines={4}
                  maxLength={500}
                  onChangeText={symptoms =>
                    this.setState({
                      symptoms
                    })
                  }
                />
              </View>
              <View style={styles.counterContainer}>
                <Text style={styles.textContainer}>
                  <Text style={styles.counter}>{this.max}</Text>
                  <Text style={styles.counter}>{SYMPTOMS_COUNTER_LMIT} </Text>
                  <Text style={styles.counter}>{this.chars}</Text>
                  <Text style={styles.counter}>
                    ({this.state.symptoms.length})
                  </Text>
                </Text>
              </View>

              <View style={styles.modalFooterBtnContainer}>
                <TouchableOpacity
                  style={styles.symptomsModalFooterBtn}
                  onPress={e => {
                    e.preventDefault();
                    this.requestConsultation();
                  }}
                >
                  <Text
                    style={[
                      styles.modalFooterLabel,
                      styles.labelBold,
                      styles.textLeft
                    ]}
                  >
                    {"PROCEED"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };
  render() {
    const { serviceId, paymentStatus } = this.props.navigation.state.params;
    const mode =
      serviceId === CONSULTATION_SERVICE_ID.VIDEO ? "Video" : "Audio";
    const status = paymentStatus;
    return (
      <View style={styles.paymentWrapper}>
        <Header
          leftIconType="back"
          onLeftPress={this.goBack}
          showRightIcon={false}
          showRightDocOnCallLogo={true}
        />
        {status === PaymentConfirmationStatus.SUCCESS &&
          this.renderSymptomsModal()}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Online Consultation</Text>
          <Text style={styles.subtitle}>{mode} Appointment</Text>
        </View>
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 0.87 }}
        >
          <Image
            source={
              mode === "Video"
                ? VIDEO_CHAT
                : AUDIO_CALL
            }
            resizeMode="contain"
            style={{ height: 74.2, width: 74.2, marginBottom: 43.5 }}
          />
          <View style={styles.statusWrapper}>
            <Image
              style={{
                width: 27.3,
                height: 27.3,
                alignSelf: "center",
                marginBottom: 8.3
              }}
              resizeMode="contain"
              source={
                status === PaymentConfirmationStatus.SUCCESS
                  ? ACCESS_GRANTED
                  : CLOSE_NEW
              }
            />
            <Text style={styles.status}>Appointment Confirmed</Text>
            <Text style={styles.mode}>{mode + " Consultation"}</Text>
          </View>
        </View>
        <View>
          <Card title={null} containerStyle={styles.box}>
            <Text
              style={{
                marginBottom: 10,
                textAlign: "center",
                color: "#a7a7a7",
                fontFamily: "pru-bold"
              }}
            >
              {status === PaymentConfirmationStatus.SUCCESS
                ? "Payment Successful"
                : "Payment Failure"}
            </Text>
            <Text
              style={{
                marginBottom: 10,
                textAlign: "center",
                color: "#ed1b2e",
                fontSize: 18,
                fontFamily: "pru-bold"
              }}
            >
              {"99 MYR"}
            </Text>
            <Text
              style={{
                marginBottom: 10,
                textAlign: "center",
                color: "#6b6a6d",
                fontFamily: "pru-bold"
              }}
            >
              {"For " + mode + " Call"}
            </Text>
          </Card>
          <View>
            {status === PaymentConfirmationStatus.SUCCESS && (
              <AppButton
                type={[styles.btn, styles.default]}
                title="NEXT"
                press={this.onNext}
                textStyle={styles.btnTextStyle}
              />
            )}
            {status === PaymentConfirmationStatus.FAILURE && (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <AppButton
                  type={[
                    styles.btn,
                    styles.cancelBtn,
                    { width: 106, marginRight: 20 }
                  ]}
                  title="CANCEL"
                  press={this.goBack}
                  textStyle={styles.btnTextStyle}
                />
                <AppButton
                  type={[
                    styles.btn,
                    styles.default,
                    { width: 106, marginRight: 20 }
                  ]}
                  title="TRY AGAIN"
                  press={this.tryagain}
                  textStyle={styles.btnTextStyle}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  meta: state.meta,
  token: state.auth.token,
  symptoms: state.doctorServices.patientSymptoms
});
export default connect(mapStateToProps, {
  goBack: () => ({
    context: pageKeys.DOC_SERVICE_PAYMENT_STATUS,
    type: CoreActionTypes.GO_BACK_TO_PREVIOUS_STACK
  }),
  tryagain: () => ({
    context: pageKeys.DOC_SERVICE_PAYMENT_STATUS,
    type: CoreActionTypes.DOC_SERVICE_LANDING
  }),
  requestConsultation: (serviceId, symptoms) => ({
    context: pageKeys.DOC_SERVICE_PAYMENT_STATUS,
    type: CoreActionTypes.DOC_SERVICE_REQUEST_CONSULTATION,
    payload: {
      callType: serviceId,
      symptoms: symptoms
    }
  })
})(PaymentStatus);
