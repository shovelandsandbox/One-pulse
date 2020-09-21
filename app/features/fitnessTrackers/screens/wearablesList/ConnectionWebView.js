import React, { PureComponent } from "react";
import {
  View,
  BackHandler,
  TouchableOpacity,
  Image,
  WebView,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { WebviewStyles } from "./styles";
import { BACK } from "../../../../config/images";
import actions from "../../configs/actionNames";
import screens from "../../configs/screenNames";
import AppConfig from "./../../../../config/AppConfig";
import { withNavigation } from "react-navigation";
const height = Dimensions.get("window").height - 70;
const width = Dimensions.get("window").width;

class ConnectionWebView extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.closeModal();
    return true;
  };

  _handleSuccesss = () => {
    if (!this.props.fromChallenges) {
      this.props.getAllWearables();
      this.props.getAllConnectedWearables();
      this.props.goToWearablesStatistics();
    }
  };

  onMessage = () => {
    if (this.props.fromChallenges) {
      this.props.gotoChallenges({
        wearableType: this.props.itemId,
      });
    }
    this.props.closeModal(true);
  };

  _onNavigationStateChange(navState) {
    if (navState.title === "SUCCESS") {
      this._handleSuccesss();
    }

    this.setState({
      canGoBack: navState.canGoBack,
    });
  }
  handleBackButton = () => {
    if (this.state.canGoBack === true) {
      this.myWebView.goBack();
      return true;
    }
    this.props.closeModal(true);
  };
  render() {
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
    const connectionBaseUrl = `${AppConfig.getPruHttpUrl()}/wearable/authorize?name=${
      this.props.itemId
    }`;
    const patchPostMessageJsCode =
      "(" + String(patchPostMessageFunction) + ")();";
    const CONNECTION_URL = `${connectionBaseUrl}`;
    const { token } = this.props;
    const url = {
      uri: CONNECTION_URL,
      headers: {
        Authorization: "Bearer " + token,
        apikey: AppConfig.getPruApiKey(),
      },
    };
    return (
      <View style={WebviewStyles.container}>
        <View style={WebviewStyles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              this.handleBackButton();
            }}
            style={WebviewStyles.backButtonContainer}
          >
            <Image style={WebviewStyles.backButton} source={BACK} />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={WebviewStyles.scrollContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <WebView
              ref={webview => {
                this.myWebView = webview;
              }}
              originWhitelist={["*"]}
              userAgent="Mozilla (Windows NT ) AppleWebKit(KHTML, like Gecko) Chrome Safari"
              useWebKit={Platform.OS === "ios" ? false : true}
              style={{ width, height }}
              scrollEnabled={true}
              source={url}
              onNavigationStateChange={this._onNavigationStateChange.bind(this)}
              startInLoadingState={true}
              javaScriptEnabled={true}
              onMessage={event => {
                this.onMessage(event.nativeEvent.data);
              }}
              scalesPageToFit={true}
              injectedJavaScript={patchPostMessageJsCode}
            />
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

ConnectionWebView.propTypes = {
  closeModal: PropTypes.func,
  getAllWearables: PropTypes.func,
  getAllConnectedWearables: PropTypes.func,
  goToWearablesStatistics: PropTypes.func,
  itemId: PropTypes.string,
  token: PropTypes.string,
  fromChallenges: PropTypes.bool,
  gotoChallenges: PropTypes.func,
};
const mapStateToProps = state => ({
  token: state.auth.token,
  paymentStatus: state.doctorServices.paymentConfirmation.paymentStatus,
});
export default withNavigation(
  connect(mapStateToProps, {
    getAllWearables: () => ({
      context: screens.WEARABLE_LIST,
      type: actions.getAllSupportedWearables,
      disableTimeout: true,
    }),
    getAllConnectedWearables: () => ({
      context: screens.WEARABLES_STATISTICS,
      type: actions.getAllCustomerWearables,
      disableTimeout: true,
    }),
    goToWearablesStatistics: () => ({
      context: screens.WEARABLE_LIST,
      type: actions.goToWearablesStatistics,
    }),
    gotoChallenges: payload => ({
      context: screens.CHALLENGES,
      type: "challenges/goToChallenges",
      payload,
    }),
  })(ConnectionWebView)
);
