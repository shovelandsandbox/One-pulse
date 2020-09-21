import React, { PureComponent } from "react";
import {
  View,
  WebView,
  BackHandler,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import { CoreActionTypes, CoreConfig, metaHelpers, CoreConstants, events } from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;
const {
  DOC_SERVICE_PAYMENT_CHECKOUT,
  DOC_SERVICE_PAYMENT_CHECKOUT_EXISTING_CARD,
  DOC_SERVICE_PAYMENT_CHECKOUT_SUCCESS,
  DOC_SERVICE_PRE_CONSULTATION_QUESTIONS,
  DOC_SERVICE_LOAD_PRE_CONSULTATION_QUESTIONS,
} = CoreActionTypes;
import MetaConstants from "./meta";
import AppConfig from "./../../../config/AppConfig";
import { gotoPulsehealth, dispatchEvent } from "../../../actions";
import { CustomAlert } from "../../../components";
import { BACK, DOCLOGO, DOC_INLINE_LOGO } from "../../../config/images";
import DocOnCallAction from "../../../features/DocOnCall/configs/actionNames";
import ScreenNames from "../../../features/DocOnCall/configs/ScreenNames";
import { getLocaleFormatCurrency } from "../../../utils/currency-utils";
const {
  PRU_PAYMENT_PAGE,
  PRU_PAYMENT_DEFAULT_PRICE
} = CoreConstants;
class PaymentMethodWebview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      key: 1
    };
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    this.props.loadPreConsultationQuestions();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  UNSAFE_componentWillReceiveProps() {
    if (
      this.props.userLanguagePreference !== nextProps.userLanguagePreference
    ) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }

  handleBackButton = () => {
    return true;
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.paymentStatus === 1) {
      nextProps.gotoPreConsultationQuestion();
    }
    if (nextProps.paymentStatus === 0) {
      CustomAlert.show(
        this.metaConstants.paymentDtlsFailedLabel,
        "Please retry booking the consultation.",
        {
          positiveText: "Ok",
          onPositivePress: () => {
            this.props.gotoPulsehealth();
          },
        }
      );
    }
  }

  onMessage(message) {
    // this.onPaymentSuccessByFeature("RDEN5FfTsBb6mhwg24ZZJ7");
    if (message === "Cancel" || message === "Tryagain") {
      Alert.alert(
        this.metaConstants.paymentDtlsFailedLabel,
        "Please retry booking the consultation.",
        [{ text: "Ok", onPress: () => this.props.gotoPulsehealth() }],
        { cancelable: false }
      );
    } else {
      if (Platform.OS === "ios") {
        message = decodeURI(decodeURI(message));
      }
      const orderRef = message.split("|")[1];
      if (orderRef !== undefined) {
        console.log("on message data = ", orderRef);
        this.props.dispatchEvent(events.PaymentScreenConfirmPayment)
        this.onPaymentSuccessByFeature(orderRef);
      }
    }
  }

  onPaymentSuccessByFeature = orderRef => {
    switch (this.props.featureName) {
      case "DOC_ON_CALL":
        this.props.onDocOnCallPaymentSuccess(orderRef);
        this.props.gotoDocOnCallSymptomCheck();
        break;
      default:
        this.props.paymentCheckoutSuccess(orderRef);
        break;
    }
  };

  getPaymentUrlByFeature = () => {
    const { userLanguagePreference, featureParams, token } = this.props;
    const docOnCallLang = userLanguagePreference == "EN" ? "EN" : "MS";
    switch (this.props.featureName) {
      case "DOC_ON_CALL":
        const price = this.props.totalAmount ? this.props.totalAmount : metaHelpers.findElement(PRU_PAYMENT_PAGE, PRU_PAYMENT_DEFAULT_PRICE).label;
        const currencyCode = this.props.countryCommonMeta.currenyCode ? this.props.countryCommonMeta.currenyCode : "MYR";
        return `${AppConfig.getPruHttpUrl()}/payment/initiate?amt=${price}&serviceCode=${
          featureParams?.serviceCode
          }&cur=${currencyCode}&lang=${docOnCallLang}&pgCode=IPAY88`;
      default:
        const totalAmount = this.props.totalAmount ? getLocaleFormatCurrency(this.props.totalAmount) : getLocaleFormatCurrency(paymentDefaultPrice);
        const { currenyCode } = this.props.countryCommonMeta;
        const currencyCodeValue = this.props.currency ? this.props.currency : currenyCode;
        if (this.props.country == "SG") {
          return `${AppConfig.getPruHttpUrl()}/payment/initiate?amt=${totalAmount}.00&serviceCode=MYDOC&cur=${currencyCodeValue}&pgCode=BRAINTREE`
        }
        return `${AppConfig.getPruHttpUrl()}/payment/initiate?cat=VN_MYDOC_AC_15&lang=${userLanguagePreference}`;

    }
  };

  getHeaderLogoByFeature = () => {
    switch (this.props.featureName) {
      case "DOC_ON_CALL":
        return DOC_INLINE_LOGO;
      default:
        return DOCLOGO;
    }
  };

  onLeftPress = e => {
    e.preventDefault();
    this.props.navigation.goBack();
  };

  renderHeader() {
    const headerLogo = this.getHeaderLogoByFeature();
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={this.onLeftPress}
          style={styles.backCloseBtnWrapper}
        >
          <Image style={styles.leftIconStyle} source={BACK} />
        </TouchableOpacity>
        <View
          accessibilityLabel="home"
          accesible
          style={styles.docLogoContainer}
        >
          <Image
            style={{ width: 80, height: 24 }}
            resizeMode="contain"
            source={headerLogo}
          />
        </View>
      </View>
    );
  }

  render() {
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
    const PAYMENT_URL = this.getPaymentUrlByFeature();
    const { token } = this.props;
    const url = {
      uri: PAYMENT_URL,
      headers: {
        Authorization: "Bearer " + token,
        apikey: AppConfig.getPruApiKey()
      }
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.renderHeader()}
        <WebView
          ref={webview => {
            this.myWebView = webview;
          }}
          useWebKit={Platform.OS === "ios" ? false : true}
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
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  paymentStatus: state.doctorServices.paymentConfirmation.paymentStatus,
  userLanguagePreference: state.userPreferences.language,
  featureName: state.doctorServices.featureName,
  featureParams: state.doctorServices.featureParams,
  country: state.meta.countryCommonMeta.countryCode2,
  totalAmount: state.pruPayment.totalAmt,
  currency: state.pruPayment.currency,
  countryCommonMeta: state.meta.countryCommonMeta,
});

export default connect(mapStateToProps, {
  gotoPulsehealth,
  dispatchEvent,
  gotoPreConsultationQuestion: () => ({
    context: pageKeys.DOC_SERVICE_PAYMENT,
    type: DOC_SERVICE_PRE_CONSULTATION_QUESTIONS
  }),
  loadPreConsultationQuestions: () => ({
    context: pageKeys.DOC_SERVICE_PAYMENT,
    type: DOC_SERVICE_LOAD_PRE_CONSULTATION_QUESTIONS,
  }),
  paymentCheckout: data => ({
    context: pageKeys.DOC_SERVICE_PAYMENT,
    type: DOC_SERVICE_PAYMENT_CHECKOUT,
    payload: {
      category: "SG_MYDOC_VC_30",
      paymentNonce: data.nonce
    }
  }),
  paymentCheckoutExistingCard: data => ({
    context: pageKeys.DOC_SERVICE_PAYMENT,
    type: DOC_SERVICE_PAYMENT_CHECKOUT_EXISTING_CARD,
    payload: {
      category: "SG_MYDOC_VC_30",
      paymentToken: data.paymentToken
    }
  }),
  paymentCheckoutSuccess: orderRef => ({
    type: DOC_SERVICE_PAYMENT_CHECKOUT_SUCCESS,
    payload: {
      orderRef
    }
  }),
  onDocOnCallPaymentSuccess: orderRef => ({
    type: DocOnCallAction.DOC_ON_CALL_PAYMENT_SUCCESS,
    payload: {
      orderRef
    }
  }),
  gotoDocOnCallSymptomCheck: () => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: ScreenNames.DOC_SYMPTOM_INPUT
  })
})(PaymentMethodWebview);

const styles = StyleSheet.create({
  backCloseBtnWrapper: {
    width: 35,
    height: 35,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  headerContainer: {
    width: window.width,
    height: 52,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingLeft: 11,
    paddingRight: 11,
    flexDirection: "row"
  },
  leftIconStyle: { width: 20, height: 20, left: 0 },
  rightIconBtnStyle: { position: "absolute", right: 15 },
  rightIconStyle: { width: 24, height: 24 },
  docLogoContainer: {
    position: "absolute",
    right: 15
  }
});
