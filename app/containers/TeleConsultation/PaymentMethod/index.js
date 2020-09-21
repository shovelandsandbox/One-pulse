import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
} from "react-native";
import { connect } from "react-redux";
import {
  CoreActionTypes,
  CoreComponents,
  CoreConfig,
} from "@pru-rt-internal/pulse-common";
import {
  checkScreenFeatures,
} from "../../../actions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { AppButton } = CoreComponents;
const { pageKeys } = CoreConfig;
import { Theme } from "../../../themes";
const { Styles } = Theme;
import localStyles from "./styles";
import MetaConstants from "./meta";
import { Yao, HEHEB, WENHAO } from "../../../config/images"
class PaymentMethod extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    this.props.fetchDocServicePricing();
    const payload = {
      query: "service.teleconsultation.payment"
    }
    this.props.checkScreenFeatures(payload);
  }

  componentWillReceiveProps() {
    if (this.props.userLanguagePreference !== nextProps.userLanguagePreference) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={localStyles.paymentMethodContainer}>
        <View
          style={localStyles.paymentMethodContainerBlock}>
          <View
            style={localStyles.centerAlignment}>
            <Image
              resizeMode="contain"
              style={localStyles.paymentHeader}
              source={HEHEB}/>
            <Text style={localStyles.paymentHeaderText}>
              {this.metaConstants.paymentDtlsHeaderLabel}
            </Text>

            <View style={localStyles.paymentDetailsContainer}>
              <View
                style={localStyles.whatIsThisFor}>
                <View
                  style={localStyles.alignRowsWithBottomMargin}>
                  <Image
                    resizeMode="contain"
                    style={localStyles.whenIsThisImage}
                    source={WENHAO}/>
                  <Text style={localStyles.detailTextHeader}>
                    {this.metaConstants.paymentDtlsWhatThisForLabel}
                  </Text>
                </View>
                <View style={localStyles.detailInfoContainer}>
                  <Text style={localStyles.detailText}>
                    {this.metaConstants.paymentDtlsFeeDetailsLabel}
                  </Text>
                </View>
              </View>

              <View
                style={localStyles.doesItIncludeContainer}>
                <View
                  style={localStyles.alignRowsWithBottomMargin}>
                  <Image
                    resizeMode="contain"
                    style={localStyles.doesItIncludeMedicationImage}
                    source={Yao}/>
                  <Text style={localStyles.detailTextHeader}>
                    {this.metaConstants.paymentDtlsDoesItIncludeMedicationLabel}
                  </Text>
                </View>
                <View style={localStyles.detailInfoContainer}>
                  <Text style={localStyles.detailText}>
                    {this.metaConstants.paymentDtlsCostOfMedicationLabel}
                  </Text>
                </View>
              </View>

              <View
                style={localStyles.buttonContainer}>
                <AppButton
                  type={[
                    Styles.btn,
                    Styles.primary,
                    localStyles.buttonOverride,
                  ]}
                  title={this.metaConstants.paymentDtlsEnterCardDtlsLabel}
                  press={() => {
                    this.props.gotoPaymentMethodWebview();
                  }}/>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLanguagePreference: state.userPreferences.language,
  };
};

export default connect(mapStateToProps, {
  fetchDocServicePricing: () => ({
    context: pageKeys.DOC_SERVICE_LANDING,
    type: CoreActionTypes.DOC_SERVICE_PRICING,
  }),
  gotoPaymentMethodWebview: () => ({
    context: pageKeys.DOC_SERVICE_PLAN_SELECTION,
    type: pageKeys.GO_PAYMENT_METHOD_WEBVIEW_PAGE,
  }),
  checkScreenFeatures
})(PaymentMethod);
