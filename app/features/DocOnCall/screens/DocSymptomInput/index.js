import React, { PureComponent } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { CoreConstants, metaHelpers } from "@pru-rt-internal/pulse-common";
const {
  ConsultationType,
  CONSULTATION_SERVICE_ID,
  SCREEN_KEY_DOC_ON_CALL_LANDING
} = CoreConstants;
const KEY_SYMPTOMS = "symptoms";
const KEY_PROCEED = "proceed";
import styles from "./styles";
import ScreenNames from "../../configs/ScreenNames";
import actionNames from "../../configs/actionNames";

class DocSymptomInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      symptoms: "",
      isSymptomsModalVisible: true
    };
  }

  requestConsultation = () => {
    const { paymentConfirmation } = this.props;
    this.setState({
      isSymptomsModalVisible: false
    });
    const { serviceId } = this.props;
    this.props.dispatch({
      context: ScreenNames.DOC_SERVICE_PAYMENT_STATUS,
      type: actionNames.DOC_SERVICE_REQUEST_CONSULTATION,
      payload: {
        callType:
          serviceId === CONSULTATION_SERVICE_ID.VIDEO
            ? ConsultationType.VIDEO_CHAT
            : ConsultationType.AUDIO_CHAT,
        symptoms: this.state.symptoms,
        orderRefNumber: paymentConfirmation?.refNo
      }
    });
    if (serviceId === CONSULTATION_SERVICE_ID.AUDIO) {
      this.props.dispatch({
        context: ScreenNames.DOC_SERVICE_PAYMENT_STATUS,
        type: actionNames.GO_BACK_TO_PREVIOUS_STACK
      });
    }
    this.setState({
      symptoms: ""
    });
  };

  render() {
    const docConsultScreen = metaHelpers.findScreen(
      SCREEN_KEY_DOC_ON_CALL_LANDING
    );
    this.symptoms = metaHelpers.findElementWithScreen(
      docConsultScreen,
      KEY_SYMPTOMS
    ).label;
    const proceed = metaHelpers.findElementWithScreen(
      docConsultScreen,
      KEY_PROCEED
    ).label;

    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={this.state.isSymptomsModalVisible}
          onBackdropPress={() =>
            this.setState({ isSymptomsModalVisible: false })
          }
        >
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={64}
            enabled
          >
            <View style={[styles.profileModalContent, { borderRadius: 10 }]}>
              <View style={styles.modalStyle}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#515B61",
                    textAlign: "center",
                    marginVertical: 22
                  }}
                >
                  Please enter any symptoms you have{" "}
                </Text>
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
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginTop: 38
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 162,
                      height: 38,
                      backgroundColor: "#ED1B2E",
                      borderRadius: 22,
                      justifyContent: "center"
                    }}
                    onPress={e => {
                      e.preventDefault();
                      this.requestConsultation();
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFF",
                        textAlign: "center",
                        fontSize: 16
                      }}
                    >
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  paymentConfirmation: state.doctorOnCallService.paymentConfirmation,
  serviceId: state.doctorOnCallService.serviceId
});
export default connect(mapStateToProps)(DocSymptomInput);
