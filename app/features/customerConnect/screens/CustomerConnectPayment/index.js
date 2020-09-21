import React, { PureComponent } from "react";
import { View, WebView, Platform } from "react-native";
import { PruBackHeader, CustomAlert } from "../../../../components";
import { connect } from "react-redux";
import AppConfig from "../../../../config/AppConfig";
import { CoreServices } from "@pru-rt-internal/pulse-common";
const { NavigationService } = CoreServices;
import { updatePaymentDetails } from "../../redux/actions";

class CustomerConnectPayment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    NavigationService.goBack(null);
  };

  onMessage(message) {
    if (Platform.OS === "ios") {
      message = decodeURI(decodeURI(message));
    }
    const queryParams = this.props.navigation.getParam("paymentParams");
    const msgParams = queryParams.msgAttrs;
    if (message === "Cancel" || message === "Tryagain") {
      CustomAlert.show(
        "Payment failed",
        "Please retry the payment by request new link from Agent",
        {
          positiveText: "Ok",
          onPositivePress: () => {
            this.goBack();
          },
        }
      );
    } else {
      const orderRef = message.split("|")[1];
      console.log("on message data = ", orderRef);
      const payload = {
        paymentAmount: msgParams.paymentAmount,
        orderRef,
        serviceCode: "EPOS_POLICY",
        currency: msgParams.currency,
        pgCode: "FIRSTDATA",
        type: "payment-status",
      };
      this.props.updatePaymentDetails(payload);
      this.goBack();
    }
  }

  render() {
    const paymentBaseUrl = `${AppConfig.getPruHttpUrl()}/payment/initiate`;
    const queryParams = this.props.navigation.getParam("paymentParams");
    const msgParams = queryParams.msgAttrs;
    const patchPostMessageFunction = () => {
      const originalPostMessage = window.postMessage;
      const patchedPostMessage = function(message, targetOrigin, transfer) {
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
    const { userLanguagePreference } = this.props;

    const patchPostMessageJsCode =
      "(" + String(patchPostMessageFunction) + ")();";
    const PAYMENT_URL = `${paymentBaseUrl}?lang=${userLanguagePreference}&amt=${msgParams.paymentAmount}&serviceCode=${msgParams.serviceCode}&cur=${msgParams.currency}&pgCode=${msgParams.pgCode}&orderRef=${msgParams.orderRef}`;
    const { token } = this.props;
    const url = {
      uri: PAYMENT_URL,
      headers: {
        Authorization: "Bearer " + token,
        apikey: AppConfig.getPruApiKey(),
      },
    };
    return (
      <View style={{ flex: 1 }}>
        <PruBackHeader title={"Back"}></PruBackHeader>
        <WebView
          ref={webview => {
            this.myWebView = webview;
          }}
          useWebKit={true}
          style={{ flex: 1 }}
          scrollEnabled={true}
          source={url}
          onNavigationStateChange={webViewState => {
            console.log("web view state = ", webViewState);
          }}
          startInLoadingState={true}
          javaScriptEnabled={true}
          onMessage={event => {
            this.onMessage(event.nativeEvent.data);
          }}
          injectedJavaScript={patchPostMessageJsCode}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  userLanguagePreference: state.userPreferences.language,
});

export default connect(mapStateToProps, {
  updatePaymentDetails,
})(CustomerConnectPayment);
