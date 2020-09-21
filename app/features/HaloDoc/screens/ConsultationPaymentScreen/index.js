import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Platform,
  WebView,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  SafeAreaView
} from "react-native";
import styles from "./styles";
import {
  CLOSE_PAGE
} from "../../../../config/images";
import { path } from "ramda";
import { checkConsultationPaymentStatus } from '../../actions'
import metaConstants from "../../meta";
import {
  events
} from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from "../../../../actions";
class ConsultationPaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.metaConstants = { ...metaConstants.talkToDoctorMeta() }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBack);
    this.props.dispatchEvent(events.TalkToDocPaymentSummaryScreen);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBack);
  }

  onBack = () => {
    return true;
  };

  wvOnNavigationStateChange(e) {
    if (e.url === "about:blank") {
      this.props.navigation.navigate("PulseHealth")
    }
  }

  handleOnMessage(data) {
    console.log("handleOnMessage::", JSON.stringify(data));
  }

  onClose = () => {
    const { payment_reference_id, totalAmountPayable, appointmentData } = this.props;
    const consultationId = path(["customer_consultation_id"], appointmentData);
    const params = {
      consultationId,
      body: [{
        amount: totalAmountPayable,
        method: "card",
        payment_reference_id
      }]
    };
    this.props.checkConsultationPaymentStatus(params);
  }

  render() {
    const { url } = this.state
    return (

      <View style={styles.container}>
        <View style={styles.mainView}>
          <TouchableOpacity style={styles.closeBtn} onPress={this.onClose}>
            <Image style={styles.closeImg} source={CLOSE_PAGE} resizeMode={"contain"} />
          </TouchableOpacity>
        </View>

        <View style={styles.webviewContainer}>
          {this.props && this.props.paymentUrl ? <WebView
            ref={ref => (this.webview = ref)}
            originWhitelist={["*"]}
            source={{ uri: this.props.paymentUrl }}
            useWebKit={Platform.OS == "ios" ? false : true}
            scalesPageToFit={true}
            onError={e => console.log("OVO webview", e)}
            onNavigationStateChange={this.wvOnNavigationStateChange.bind(this)}
          /> :
            <Text>{this.metaConstants.invalidUrl}</Text>}
        </View>

      </View>
    );
  }
}


const mapStateToProps = state => ({
  paymentUrl: state.haloDocServices.paymentUrl,
  payment_reference_id: state.haloDocServices.payment_reference_id,
  appointmentData: state.haloDocServices.appointmentData,
  totalAmountPayable: state.haloDocServices.totalAmountPayable,
});

export default connect(
  mapStateToProps,
  {
    checkConsultationPaymentStatus,
    dispatchEvent
  }
)(ConsultationPaymentScreen);