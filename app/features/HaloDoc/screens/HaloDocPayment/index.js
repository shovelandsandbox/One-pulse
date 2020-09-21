
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Image,
  BackHandler,
  Platform,
  ImageBackground,
  Alert
} from "react-native";
import {
  CoreComponents,
  CoreConfig,
  CoreUtils,
  events
} from "@pru-rt-internal/pulse-common";
import { connect } from "react-redux";
import { path } from "ramda";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { isEmpty, isNil, forEach } from 'ramda'
import {
  addPromoCode,
  removePromoCode,
  gotoPaymentPage,
  setAmountPayable,
  resetPromoCodeStatus,
  resetPaymentStatus,
  confirmDocAppointment,
} from '../../actions'
import { CardView } from '../../components/CardViewPayment'
import _ from "lodash";
import { CustomAlert } from "../../../../components";
const { setScreen } = CoreUtils;
import { AVATAR } from "../../../../config/images";
import HaloDocActionBar from "../../components/actionBar";
import { dispatchEvent } from "../../../../actions";
const { pageKeys } = CoreConfig;
import { Theme } from "../../../../themes";
const { Colors } = Theme;
import metaConstants from '../../meta'
import { screenNames } from '../../configs/screenNames'
class HaloDocPaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promoCode: "",
      isPromoCodeApplied: false,
      isPromoCodeError: false,
      promoCodeErrorMsg: ""
    };
    this.metaConstants = { ...metaConstants.talkToDoctorMeta() }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPress);
  }

  componentDidMount() {
    setScreen("HaloDocPaymentScreen", "UserActivity");
    BackHandler.addEventListener("hardwareBackPress", this.backPress);
  }

  showAlert(message) {
    CustomAlert.show("", message);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.applyPromoCodeStatus !== this.props.applyPromoCodeStatus && this.state.promoCode && nextProps.applyPromoCodeStatus === "SUCCESS") {
      this.setState({
        isPromoCodeApplied: true,
        isPromoCodeError: false,
        promoCodeErrorMsg: ""
      });
    } else if (nextProps.applyPromoCodeStatus !== this.props.applyPromoCodeStatus && this.state.promoCode && nextProps.applyPromoCodeStatus === "FAILURE") {
      this.setState({
        isPromoCodeApplied: false,
        isPromoCodeError: true,
        promoCodeErrorMsg: this.metaConstants.promoCodeErrorMsg
      });
    } else if (nextProps.removePromoCodeStatus !== this.props.removePromoCodeStatus && nextProps.removePromoCodeStatus === "SUCCESS") {
      this.setState({
        isPromoCodeApplied: false,
        promoCode: "",
        isPromoCodeError: false,
        promoCodeErrorMsg: ""
      });
    } else if (nextProps.removePromoCodeStatus !== this.props.removePromoCodeStatus && nextProps.removePromoCodeStatus === "FAILURE") {
      const removeCodeFailureMsg = this.metaConstants.promoCodeErrorMsg.removeCodeFailureMsg
      this.showAlert(removeCodeFailureMsg);
    }
    if (nextProps.fetchPaymentUrlError && isNil(nextProps.paymentUrl)) {
      this.showAlert(nextProps.fetchPaymentUrlErrorMsg);
    }
  }

  backPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  onPaymentBtnClick = (totalValue, cardDiscount) => {
    const { appointmentData } = this.props;
    const totalAmountPayable = totalValue - cardDiscount;
    this.props.dispatchEvent(events.TalkToDocProceedForConsultation);
    if (totalValue > 0) {
      this.props.resetPaymentStatus();
      this.props.setAmountPayable(totalAmountPayable);
      this.props.gotoPaymentPage(appointmentData.customer_consultation_id);
    } else {
      this.props.confirmDocAppointment(appointmentData.customer_consultation_id);
    }
  };

  onPromoCodeButtonClicked = () => {
    const { appointmentData } = this.props;
    const { isPromoCodeApplied, promoCode } = this.state;
    this.props.dispatchEvent(events.TalkToDocApplyPromoCodeBtnClick);
    if (!isPromoCodeApplied && !promoCode) {
      this.setState({
        isPromoCodeError: true,
        promoCodeErrorMsg: this.metaConstants.emptyPromoCodeErrorMsg
      });
      return;
    }
    if (isPromoCodeApplied) {
      this.props.removePromoCode(this.state.promoCode, appointmentData.customer_consultation_id)
    } else {
      this.props.resetPromoCodeStatus();
      this.props.addPromoCode(this.state.promoCode, appointmentData.customer_consultation_id);
    }
  }

  moveToWaitingScreen = () => {
    const { docObject } = this.props;
    this.props.navigation.replace(screenNames.HALODOC_PATIENT_WAITING, {
      docObject
    });
  };

  retrieveLeastPackage(packagesList) {
    let minPricePackage = null;
    if (packagesList && packagesList.length > 0) {
      minPricePackage = packagesList[0];
      forEach(value => {
        if (value.price < minPricePackage.price) {
          minPricePackage = value;
        }
      }, packagesList);
    }
    return minPricePackage;
  }

  PromoCardView = () => {
    const removeText = this.metaConstants.removeText
    return (
      <View style={styles.promoCardViewStyle} >
        <View style={{ flexDirection: 'row' }}>
          <View>
            <View style={styles.promoCodeView}>
              <Icon name="md-checkmark-circle" size={26} color={Colors.chateauGreen} />
              <Text style={styles.promoCodeText2}>
                {this.state.promoCode}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={this.onPromoCodeButtonClicked}>
          <Text style={styles.applyButtonText}>{removeText}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  PromoCardErrorView = () => {
    const { isPromoCodeError, promoCodeErrorMsg } = this.state;
    const applyText = this.metaConstants.applyText
    const applyPlaceholderText = this.metaConstants.applyPlaceholderText
    return (
      <View>
        <View style={styles.summarySubContainer}>
          <View style={{ width: '80%' }}>
            <TextInput
              placeholder={applyPlaceholderText}
              onChangeText={text => this.setState({ promoCode: text })}
              style={styles.promoCodeText} />
          </View>
          <TouchableOpacity onPress={this.onPromoCodeButtonClicked} style={styles.applyTexts}>
            <Text style={styles.applyButtonText}>{applyText}</Text>
          </TouchableOpacity>
        </View>
        {isPromoCodeError ?
          <View style={styles.summarySubContainer}>
            <Text
              style={styles.promoCodeErrorText}
            >
              {promoCodeErrorMsg}
            </Text>
          </View> : null}
      </View>
    )
  }

  renderPromoCodeCard(totalValue) {
    const { isPromoCodeApplied } = this.state;
    if ((totalValue && totalValue > 0) || (totalValue == 0 && isPromoCodeApplied)) {
      if (isPromoCodeApplied) {
        return (
          <CardView>
            {this.PromoCardView()}
          </CardView>
        );
      } else {
        return (
          <CardView style={styles.renderPromoCardView}>
            {this.PromoCardErrorView()}
          </CardView>
        );
      }
    } else {
      return null;
    }
  }

  cardViewDoctorDetails = () => {
    const Dr = this.metaConstants.Dr
    const { docObject } = this.props;
    let speciality = "";
    let docProfileResponse = path(["doctor_profile_sections"], docObject)
    let specialResponse = path(["doctor_profile_sections", 'speciality'], docObject)

    if (docProfileResponse && specialResponse && specialResponse.length > 0) {
      forEach(value => {
        speciality = !isEmpty(speciality) ? speciality + ', ' + value.name : value.name;
      }, specialResponse);
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <ImageBackground source={AVATAR} style={styles.docImageStyle}>
          <Image
            style={styles.docImageStyle}
            source={{ uri: docObject.image_url }}
          />
        </ImageBackground>
        <View style={styles.doctorDescription}>
          <Text style={styles.doctorName}>{`${Dr} ${docObject.first_name} ${docObject.last_name}`}</Text>
          {!isNil(speciality) && speciality ? <Text style={styles.doctorProfession}>{speciality}</Text> : null}
        </View>
      </View>
    )

  }

  paymentSummaryView = () => {
    const rp = this.metaConstants.Rp
    const sessionStr = this.metaConstants.sessionFee
    const { appointmentData, consultationData } = this.props;
    const packagesList = consultationData ? path(["attributes", "packages"], consultationData) : path(["packages"], appointmentData);
    const packages = this.retrieveLeastPackage(packagesList);
    const adjustmentsObj = consultationData ? path(["attributes", "adjustments"], consultationData) : path(["adjustments"], appointmentData);
    const appliedAdjustmentObj = consultationData ? path(["attributes", "applicable_adjustments"], consultationData) : path(["applicable_adjustments"], appointmentData);
    let promoCodeDiscountValue = 0;
    let systemDiscountValue = 0;
    let totalSavingsValue = 0;
    let sessionAmount = path(["price"], packages);
    let disclaimerAmount = 0;
    let currencyUnit = "IDR";
    if (adjustmentsObj && adjustmentsObj.length > 0) {
      forEach(value => {
        if (value.attributes.applied_by === "user") {
          promoCodeDiscountValue += value.value;
        } else {
          systemDiscountValue += value.value;
        }
        totalSavingsValue += value.value;
      }, adjustmentsObj);
    }
    if (appliedAdjustmentObj && appliedAdjustmentObj.length > 0) {
      forEach(value => {
        if (value.value === "card") {
          disclaimerAmount += value.amount;
          currencyUnit = value.currency ? value.currency : currencyUnit;
        }
      }, appliedAdjustmentObj);
    }
    const totalAmountValue = sessionAmount - totalSavingsValue;
    return (
      <View>
        <View style={styles.summarySubContainer}>
          <Text style={styles.sessionFeeText}>
            {sessionStr}
          </Text>
          <Text style={styles.sessionFee}>{`${rp} ${sessionAmount.toFixed(2)}`}</Text>
        </View>
        <View style={styles.summarySubContainer}>
          <Text style={styles.sessionFeeText}>
            {this.metaConstants.couponDiscount}
          </Text>
          <Text style={styles.sessionFee}>{`${rp} ${promoCodeDiscountValue.toFixed(2)}`}</Text>

        </View>
        <View style={styles.summarySubContainer}>
          <Text style={styles.sessionFeeText}>
            {this.metaConstants.AutoApplied}
          </Text>
          <Text style={styles.sessionFee}>{`${rp} ${systemDiscountValue.toFixed(2)}`}</Text>

        </View>
        <View style={styles.summarySubContainer}>
          <Text style={styles.sessionFeeText}>
            {this.metaConstants.totalSaving}
          </Text>
          <Text style={styles.sessionFee}>{`${rp} ${totalSavingsValue.toFixed(2)}`}</Text>

        </View>
        <View style={styles.summarySubContainer}>
          <Text style={styles.sessionFeeText}>
            {this.metaConstants.totalAmount}
          </Text>
          <Text style={styles.sessionFee}>{`${rp} ${totalAmountValue.toFixed(2)}`}</Text>

        </View>
      </View>
    )
  }

  paymentOptionContainer = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.cardTitleText}>
          {this.metaConstants.paymentSummery}
        </Text>
        <Text style={{ marginHorizontal: 10 }}>{this.metaConstants.creditOrDebit}</Text>
      </View>
    )
  }

  disclaimerView = (currencyUnit, disclaimerAmount) => {
    const disclaimerText = this.metaConstants.getDiscount;
    return (
      <View style={[styles.ItemViewStyle, { flex: 1 }]}>
        <Icon name="ios-pricetags" size={20} color={Colors.chateauGreen} />
        <Text style={styles.disclaimerText}>
          {`${disclaimerText} ${currencyUnit} ${disclaimerAmount.toFixed(2)}`}
        </Text>
      </View>
    )
  }

  render() {
    if (this.props.getDoctorAppointmentStatus) {
      this.moveToWaitingScreen();
    }
    const { appointmentData, docObject, consultationData } = this.props;
    const packagesList = consultationData ? path(["attributes", "packages"], consultationData) : path(["packages"], appointmentData);
    const packages = this.retrieveLeastPackage(packagesList);
    const adjustmentsObj = consultationData ? path(["attributes", "adjustments"], consultationData) : path(["adjustments"], appointmentData);
    const appliedAdjustmentObj = consultationData ? path(["attributes", "applicable_adjustments"], consultationData) : path(["applicable_adjustments"], appointmentData);
    let promoCodeDiscountValue = 0;
    let systemDiscountValue = 0;
    let totalSavingsValue = 0;
    let sessionAmount = path(["price"], packages);
    let disclaimerAmount = 0;
    let currencyUnit = "IDR";

    if (adjustmentsObj && adjustmentsObj.length > 0) {
      forEach(value => {
        if (value.attributes.applied_by === "user") {
          promoCodeDiscountValue += value.value;
        } else {
          systemDiscountValue += value.value;
        }
        totalSavingsValue += value.value;
      }, adjustmentsObj);
    }

    if (appliedAdjustmentObj && appliedAdjustmentObj.length > 0) {
      forEach(value => {
        if (value.value === "card") {
          disclaimerAmount += value.amount;
          currencyUnit = value.currency ? value.currency : currencyUnit;
        }
      }, appliedAdjustmentObj);
    }
    const totalAmountValue = sessionAmount - totalSavingsValue;
    const paymentSummaryTitle = this.metaConstants.paymentSummery
    const proceedBtnText = totalAmountValue > 0 ? this.metaConstants.payAndContinueBtn : this.metaConstants.ProceedBtn

    return (
      <View style={{ flex: 1, backgroundColor: Colors.aliceBlue }}>
        <HaloDocActionBar
          onGoBack={() => this.props.navigation.goBack()}
        ></HaloDocActionBar>
        <ScrollView style={{ flex: 1 }}>
          <CardView style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
            {this.cardViewDoctorDetails()}
          </CardView>
          {this.renderPromoCodeCard(totalAmountValue)}
          <CardView cardTitle={paymentSummaryTitle}>
            {this.paymentSummaryView()}
          </CardView>
          <CardView>
            {this.paymentOptionContainer()}
          </CardView>
          {disclaimerAmount ? (
            this.disclaimerView(currencyUnit, disclaimerAmount)
          ) : null}
        </ScrollView>
        <View style={{ justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => { this.onPaymentBtnClick(totalAmountValue, disclaimerAmount) }}>
            <View style={styles.proceedButton}>
              <Text style={{ color: Colors.white }}>{proceedBtnText}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    meta: state.meta,
    appointmentRequestSuccess: state.haloDocServices.appointmentRequestSuccess,
    appointmentRequestError: state.haloDocServices.appointmentRequestError,

    appointmentData: state.haloDocServices.appointmentData,
    docObject: state.haloDocServices.docObject,

    applyPromoCodeStatus: state.haloDocServices.applyPromoCodeStatus,
    applyPromoCodeStatus: null,
    applyPromoCodeMessage: state.haloDocServices.applyPromoCodeMessage,
    removePromoCodeStatus: state.haloDocServices.removePromoCodeStatus,
    removePromoCodeMessage: state.haloDocServices.removePromoCodeMessage,
    fetchPaymentUrlError: state.haloDocServices.fetchPaymentUrlError,
    consultationData: state.haloDocServices.consultationData,
    consultationDataError: state.haloDocServices.consultationDataError,
    paymentUrl: state.haloDocServices.paymentUrl,
    fetchPaymentUrlErrorMsg: state.haloDocServices.fetchPaymentUrlErrorMsg,
    isDoctorConfirmedAppointment:
      state.haloDocServices.isDoctorConfirmedAppointment,
    getDoctorAppointmentStatus: state.haloDocServices.getDoctorAppointmentStatus
  };
};
export default connect(mapStateToProps, {
  dispatchEvent,
  addPromoCode,
  removePromoCode,
  gotoPaymentPage,
  setAmountPayable,
  resetPromoCodeStatus,
  resetPaymentStatus,
  confirmDocAppointment,

})(HaloDocPaymentScreen);
