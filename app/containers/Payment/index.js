import React from "react";
import {
  ActivityIndicator,
  WebView,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import styles from "./styles";
import {
  CoreComponents,
  CoreServices,
  CoreConfig,
  CoreConstants,
  CoreActionTypes,
  metaHelpers,
  urlConfig
} from "@pru-rt-internal/pulse-common";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import Header from "../../components/Header"
const helpers = metaHelpers;
const KEY_SYMPTOMS = "symptoms";
const KEY_PROCEED = "proceed";
const {
  DOC_SERVICE_LANDING,
  DOC_SERVICE_PAYMENT_STATUS,
  ConsultationStatus,
  ConsultationType,
  SCREEN_KEY_DOC_ON_CALL_LANDING,
  SYMPTOMS_COUNTER_LMIT,
  DOC_SERVICE_REQUEST_CONSULTATION,
  GO_BACK_TO_PREVIOUS_STACK,
  CONSULTATION_SERVICE_ID,
} = CoreConstants;
import { BACK } from "../../config/images";
const { pageKeys } = CoreConfig;
const { PAYMENT_URL } = urlConfig;
// const PAYMENT_URL =
//   "https://apiuat.prudential.com.my/api/v1_0_0/payment/initiate?cat=";
// const PAYMENT_URL ="https://api.prudential.com.my/api/v1_0_0/payment/initiate?cat=";
class PaymentWebView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postMessage: null,
      orderRefnumber: "",
      isSymptomsModalVisible: false,
      symptoms: "",
      backButtonEnabled: false,
    };
    this.symptoms = "";
    this.handleBackButton = this.handleBackButton.bind(this);
    this._onNavigationStateChange = this._onNavigationStateChange.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    if (this.state.backButtonEnabled) {
      this.myWebView.goBack();
    }
    return true;
  }
  goBack = () => {
    this.props.dispatch({
      context: pageKeys.DOC_SERVICE_PAYMENT_STATUS,
      type: CoreActionTypes.GO_BACK_TO_PREVIOUS_STACK,
    });
  };
  tryagain = () => {
    this.props.dispatch({
      context: pageKeys.DOC_SERVICE_PAYMENT_STATUS,
      type: CoreActionTypes.DOC_SERVICE_LANDING,
    });
  };
  onNext = () => {
    this.setState({
      isSymptomsModalVisible: true,
    });
  };
  requestConsultation = () => {
    this.setState({
      isSymptomsModalVisible: false,
    });
    const { serviceId, paymentStatus } = this.props.navigation.state.params;
    this.props.dispatch({
      context: pageKeys.DOC_SERVICE_PAYMENT_STATUS,
      type: CoreActionTypes.DOC_SERVICE_REQUEST_CONSULTATION,
      payload: {
        callType:
          serviceId === CONSULTATION_SERVICE_ID.VIDEO
            ? ConsultationType.VIDEO_CHAT
            : ConsultationType.AUDIO_CHAT,
        symptoms: this.state.symptoms,
        orderRefNumber: this.state.orderRefnumber,
      },
    });
    if (serviceId === CONSULTATION_SERVICE_ID.AUDIO) {
      this.goBack();
    }
    this.setState({
      symptoms: "",
    });
  };
  webview = null;

  renderSymptomsModal = () => {
    const { meta } = this.props;
    const { screens } = meta.metaDetail;
    const docConsultScreen = helpers.findScreen(SCREEN_KEY_DOC_ON_CALL_LANDING);
    this.symptoms = helpers.findElementWithScreen(
      docConsultScreen,
      KEY_SYMPTOMS
    ).label;
    const proceed = helpers.findElementWithScreen(docConsultScreen, KEY_PROCEED)
      .label;
    return (
      <Modal
        isVisible={this.state.isSymptomsModalVisible}
        onBackdropPress={() => this.setState({ isSymptomsModalVisible: false })}
      >
        <KeyboardAvoidingView behavior="position" enabled>
          <View style={[styles.profileModalContent, { borderRadius: 10 }]}>
            <View style={styles.modalStyle}>
              <Text style={{
                fontSize: 16,
                color: "#515B61",
                textAlign: "center",
                marginVertical: 22
              }}>Please enter any symptoms you have </Text>

              <View style={styles.modalButtonContainer}>
                <TextInput
                  style={styles.symptomsTextInput}
                  multiline={true}
                  numberOfLines={4}
                  maxLength={500}
                  onChangeText={symptoms =>
                    this.setState({
                      symptoms,
                    })
                  }
                />
              </View>

              <View style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: 38
              }}>
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
                    style={{ color: "#FFF", textAlign: "center", fontSize: 16 }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  activityIndicatorLoadingView() {
    return (
      <ActivityIndicator
        color="#009688"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  onMessage(message) {
    const ordermessage = message.split("|");

    this.setState({
      postMessage: ordermessage[0],
      orderRefnumber: ordermessage[1],
    });
    switch (ordermessage[0]) {
      case "Next":
        this.onNext();
        break;
      case "Tryagain":
        this.tryagain();
        break;
      case "Cancel":
        this.goBack();
        break;
      default:
        this.goBack();
    }
  }

  _onNavigationStateChange(webViewState) {
    this.setState({
      backButtonEnabled:
        webViewState.url === "https://payment.ipay88.com/privacy.asp",
    });
  }

  render() {
    const { serviceId } = this.props.navigation.state.params;
    const { token, email } = this.props;
    const patchPostMessageFunction = () => {
      const originalPostMessage = window.postMessage;
      const patchedPostMessage = function (message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
      };

      patchedPostMessage.toString = () => {
        return String(Object.hasOwnProperty).replace(
          "hasOwnProperty",
          "postMessage"
        );
      };
      window.postMessage = patchedPostMessage;
    };

    const patchPostMessageJsCode =
      "(" + String(patchPostMessageFunction) + ")();";

    // TODO : URL change as in SG?
    const url = {
      uri: PAYMENT_URL + serviceId + "&email=" + email,
      headers: {
        Authorization: "Bearer " + token,
        apikey:
          "a3b0c44298fc1c149afbf4c8996fb92427ac41e4649b934ca495991b7852b855",
      },
    };
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack()
          }
          }
          style={{
            width: 55,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 5,
          }}
        >
          <Image
            style={{
              // tintColor: "#fff",
              width: 20, height: 20, left: 0
            }} source={BACK} />
        </TouchableOpacity>
        <WebView
          ref={webview => {
            this.myWebView = webview;
          }}
          scrollEnabled={true}
          source={url}
          onNavigationStateChange={this._onNavigationStateChange}
          renderLoading={this.activityIndicatorLoadingView}
          startInLoadingState={true}
          javaScriptEnabled={true}
          style={[{ flex: 1 }, styles.container]}
          useWebKit={true}
          onMessage={event => {
            this.onMessage(event.nativeEvent.data);
          }}
          injectedJavaScript={patchPostMessageJsCode}
        />
        {this.state.postMessage === "Next" && this.renderSymptomsModal()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  meta: state.meta,
  token: state.auth.token,
  email: state.auth.email,
  symptoms: state.doctorServices.patientSymptoms,
});
export default connect(mapStateToProps)(PaymentWebView);
