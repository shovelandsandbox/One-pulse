import { Text, View, ScrollView, Image } from "react-native";
import React, { PureComponent } from "react";
import { Product, Toast, PaymentMethod, CustomButton } from "./components";
import {
  TELECON,
  CREDIT_CARD,
  VOUCHER_CARD,
  CLOSE_WHITE,
  Yhcard,
  Yao,
  WENHAO,
} from "../../config/images";
import MetaConstants from "./meta";
import { connect } from "react-redux";
import { RewardSelector } from "../../features/rewards/Selector";
import { CoreConfig, CoreActionTypes, events } from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;
import { PruBackHeader } from "../../components";
import _ from "lodash";
import { Theme } from "../../themes";
const { Colors } = Theme;

import screens from "./screenNames";
import actions from "./actionNames";
import styles from "./styles";
import {
  checkoutPayment,
  gotoPreconScreen,
  goToScreens,
} from "./actionsBuilder";
import { getLocaleFormatCurrency } from "../../utils/currency-utils";

import { getCustomerWallet } from "../rewards/actions";
import { dispatchEvent } from "../../actions";
const paymentMethods = [
  { name: "Credit/Debit Card", logo: CREDIT_CARD, id: 1 },
  { name: "Voucher", logo: VOUCHER_CARD, id: 2 },
];
class PaymentMethodScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: null,
      isVoucherRadioSelected: false,
      selectedVoucher: {},
      selectedPaymentMethod: paymentMethods[0],
    };
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    this.props.getPaymentPolicyDecision();
    this.props.getCustomerWallet();
    this.props.dispatchEvent(events.PaymentScreen)
  }

  onDetailPress = item => {
    const { goToScreens } = this.props;
    goToScreens({ id: item.id }, "VoucherDetails");
  };

  renderPaymentHeader() {
    return (
      <View style={styles.headerLayout}>
        <PruBackHeader title={this.metaConstants.paymentTitle} onPress={() => {
          this.props.dispatchEvent(events.PaymentScreenBackClick)
          this.props.navigation.goBack()
        }}></PruBackHeader>
      </View>
    );
  }

  handleContinuePress = () => {
    const {
      checkoutPayment,
      gotoPreconScreen,
      dispatchActionObject,
      navigation,
    } = this.props;
    const dispatchActions = navigation.getParam("dispatchActions");
    if (this.state.isVoucherRadioSelected) {
      if (!_.isEmpty(this.state.selectedVoucher)) {
        //this.props.performRedemption(this.state.selectedVoucher, this.props.navigation.getParam("dispatchActions"));
        const referenceNo = this.state.selectedVoucher.id;
        const paymentMode = "VOUCHER";
        if (dispatchActions && dispatchActions.length > 0) {
          dispatchActions.forEach(dispatchAction => {
            dispatchAction.payload = {
              orderRef: referenceNo,
            };
            dispatchActionObject(dispatchAction);
          });
        } else {
          this.props.dispatchEvent(events.PaymentScreenContinueClickVoucher)
          checkoutPayment(referenceNo, paymentMode);
          gotoPreconScreen();
        }
      }
    } else {
      this.props.dispatchEvent(events.PaymentScreenContinueClickCard)
      // this.props.gotoPreConsultationQuestion()
      this.props.gotoPaymentMethodWebview();
    }
  };

  handlePaymentMethodPress = radioButtonSrc => {
    if (radioButtonSrc.name === "Voucher") {
      this.setState({
        isVoucherRadioSelected: true,
        selectedPaymentMethod: radioButtonSrc,
      });
    } else {
      this.setState({ isVoucherRadioSelected: false, selectedVoucher: {}, selectedPaymentMethod: radioButtonSrc });
    }
  };

  handleTnCPress = link => {
    const { goToScreens } = this.props;
    const params = {
      source: {
        uri: link,
      },
    };
    goToScreens(params, "PdfView");
  };

  updateVoucherSelected = selectedVoucher => {
    if (selectedVoucher.id === this.state.selectedVoucher.id) {
      this.setState({ selectedVoucher: {} });
    } else {
      this.setState({ selectedVoucher: selectedVoucher });
    }
  };

  onVoucherSelected = selectedVoucher => {
    this.setState({ selectedVoucher: selectedVoucher });
  };

  onVoucherUnselected = () => {
    this.setState({ selectedVoucher: {} });
  };

  renderSingaporeOnlyview() {
    return (
      <ScrollView style={styles.paymentDetailsContainer}>
        <View
          style={styles.whatIsThisFor}>
          <View
            style={styles.alignRowsWithBottomMargin}>
            <Image
              resizeMode="contain"
              style={styles.whenIsThisImage}
              source={WENHAO} />
            <Text style={styles.detailTextHeader}>
              {this.metaConstants.paymentDtlsWhatThisForLabel}
            </Text>
          </View>
          <View style={styles.detailInfoContainer}>
            <Text style={styles.detailText}>
              {this.metaConstants.paymentDtlsFeeDetailsLabel}
            </Text>
          </View>
        </View>
        <View
          style={styles.doesItIncludeContainer}>
          <View
            style={styles.alignRowsWithBottomMargin}>
            <Image
              resizeMode="contain"
              style={styles.doesItIncludeMedicationImage}
              source={Yao} />
            <Text style={styles.detailTextHeader}>
              {this.metaConstants.paymentDtlsDoesItIncludeMedicationLabel}
            </Text>
          </View>
          <View style={styles.detailInfoContainer}>
            <Text style={styles.detailText}>
              {this.metaConstants.paymentDtlsCostOfMedicationLabel}
            </Text>
          </View>
        </View>
        <View
          style={styles.doesItIncludeContainer}>
          <View
            style={styles.alignRowsWithBottomMargin}>
            <Image
              resizeMode="contain"
              style={styles.doesItIncludeMedicationImage}
              source={Yhcard} />
            <Text style={styles.detailTextHeader}>
              {this.metaConstants.paymentDtlsWhenWillBeChargedLabel}
            </Text>
          </View>
          <View style={styles.detailInfoContainer}>
            <Text style={styles.detailText}>
              {this.metaConstants.paymentDtlsAmountChargedDtlsLabel}
            </Text>
          </View>
        </View>
      </ScrollView>
    )
  }
  render() {
    const {
      paymentProductHeading,
      paymentMethodHeading,
      paymentProductName,
      paymentProductDesc,
      paymentTotalAmountLabel,
      paymentContinueLabel,
      paymentVoucherApplied,
      paymentDefaultPrice
    } = this.metaConstants;
    const { currenyCode } = this.props.countryCommonMeta;
    const currencyCodeValue = this.props.currency ? this.props.currency : currenyCode;
    const unFormattedPrice = this.props.totalAmount ? getLocaleFormatCurrency(this.props.totalAmount) : getLocaleFormatCurrency(paymentDefaultPrice);
    const productPrice = `${currencyCodeValue} ${unFormattedPrice}`;;// this.props.featureName === "DOC_ON_CALL" ? "MYR 1.00" : `${this.props.currency} 190.000`;
    const buttonColors = ["#ec1c2e", "#a21421"];
    const buttonDisabled = [Colors.grey747474, Colors.grey747474]
    const isVoucherSelected = !_.isEmpty(this.state.selectedVoucher);
    return (
      <View style={styles.container}>
        {this.renderPaymentHeader()}
        {isVoucherSelected && (
          <Toast
            description={paymentVoucherApplied}
            onClosePress={this.handleClosePress}
            closeIcon={CLOSE_WHITE}
          />
        )}
        <ScrollView style={styles.scrollView}>
          <Text style={styles.heading}>{paymentProductHeading}</Text>
          <View style={styles.contentView}>
            <Product
              item={{
                productName: paymentProductName,
                productDescription: paymentProductDesc,
                productPrice,
                image: TELECON,
              }}
            />
          </View>
          <Text style={styles.heading}>{paymentMethodHeading}</Text>
          <View style={styles.contentView}>
            <PaymentMethod
              data={paymentMethods}
              selectedPaymentMethod={this.state.selectedPaymentMethod}
              radioButtonPress={this.handlePaymentMethodPress}
              discountData={this.props.adjustments}
              appliedVoucher={this.state.selectedVoucher}
              isVoucherRadioSelected={this.state.isVoucherRadioSelected}
              onVoucherSelection={this.onVoucherSelected}
              onDeleteSelectedVoucher={this.onVoucherUnselected}
              activeVouchers={this.props.activeVouchers}
              language={this.props.userLanguagePreference}
              onDetailPress={this.onDetailPress}
              onTnCPress={this.handleTnCPress}
              country={this.props.country}
            />
          </View>
          {this.props.country === "SG" ? this.renderSingaporeOnlyview() : null}
        </ScrollView>
        <View style={styles.bottomView}>
          <View style={styles.pricingView}>
            <Text style={styles.amount}>{paymentTotalAmountLabel}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  styles.price,
                  isVoucherSelected ? styles.lineThrough : {},
                ]}
              >
                {productPrice}
              </Text>
              {isVoucherSelected ? (
                <Text style={styles.discountedPrice}>
                  {`0 ${currencyCodeValue}`}
                </Text>
              ) : null}
            </View>
          </View>
          <CustomButton
            text={paymentContinueLabel}
            onTextPress={this.handleContinuePress}
            colors={this.state.isVoucherRadioSelected && !isVoucherSelected ? buttonDisabled : buttonColors}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {
    pruPayment,
    rewardCenter: { walletDetails },
    auth: { countryInfo },
  } = state;
  return {
    allowPayment: pruPayment.allowPayment,
    paymentCode: pruPayment.paymentCode,
    totalAmount: pruPayment.totalAmt,
    adjustedAmount: pruPayment.adjustedAmount,
    currency: pruPayment.currency,
    countryCommonMeta: state.meta.countryCommonMeta,
    adjustments: pruPayment.adjustments,
    redemptionResponse: pruPayment.redemptionResponse,
    userLanguagePreference: state.userPreferences.language,
    activeVouchers: RewardSelector.getActiveTeleconVouchers(walletDetails.vouchers, pruPayment.adjustments),
    featureName: state.doctorServices.featureName,
    country: countryInfo.simCountry,
  };
};

export default connect(mapStateToProps, {
  dispatchEvent,
  getPaymentPolicyDecision: () => ({
    context: screens.PRU_PAYMENT,
    type: actions.CHECK_PAYMENT_POLICY,
  }),
  performRedemption: (selectedVoucher, dispatchActions) => ({
    context: screens.PRU_PAYMENT,
    type: actions.PERFORM_REDEMPTION,
    payload: {
      dispatchActions,
      ...selectedVoucher
    }
  }),
  gotoPreConsultationQuestion: () => ({
    context: pageKeys.DOC_SERVICE_PAYMENT,
    type: CoreActionTypes.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS
  }),
  gotoPaymentMethodWebview: () => ({
    context: pageKeys.DOC_SERVICE_PLAN_SELECTION,
    type: pageKeys.GO_PAYMENT_METHOD_WEBVIEW_PAGE,
  }),
  dispatchActionObject: actionObject => ({
    ...actionObject,
  }),
  checkoutPayment,
  gotoPreconScreen,
  getCustomerWallet,
  goToScreens,
})(PaymentMethodScreen);
