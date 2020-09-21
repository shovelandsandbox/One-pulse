//@flow
import React, { PureComponent } from "react";
import { Text, View, Image, Animated, ScrollView, KeyboardAvoidingView, ImageBackground } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../../configs";
import PropTypes from "prop-types";
import Styles from "./styles";
import OTPInput from "../../../components/OtpModal/OTPInput";
import Modal from "react-native-modal";
import { Base as BaseContainer } from "../../../components/containers";
import { PruHeaderText } from "../../../../components";
import { CoreServices, CoreComponents ,metaHelpers} from "@pru-rt-internal/pulse-common";
import UpdateInfoRow from "../../../../components/UpdateInfoRow";
import { ACCESS_GRANTED, ACCESS_DENIED, CONTACT_EMAIL, BACKGROUND_PRODUCT, CONTACT_PHONE, CONTACT_PIN, CONTACT_PIN_BLACK } from "../../../../config/images";
import myPolicyScreens from "../../../configs/screenNames";
import { myPolicyActions } from "../../../configs/myPolicyActions";
import UpdateAddressInfo from "../../../../components/UpdateAddressInfo/UpdateAddressInfo";
import { HeaderBackButton } from "react-navigation";

import lang from "../lang";
import {
  phoneNumberValidator,
  defaultRegExpValidator,
  requiredValidator,
} from "../../../../utils/validators/index";
import { path, pathOr } from "ramda";
import { SafeAreaView } from "react-navigation";
import PulseImageHeader from "../../../../mypolicy/components/containers/PulseImageHeader";
const { AppButton } = CoreComponents;
const { NavigationService } = CoreServices;


class UpdateContactInfo extends PureComponent {
  shakeAnimationValue = new Animated.Value(0);
  constructor(props) {
    super(props);
    this.state = {
      otpEntered: "",
      updateType: "",
      rowData: "",
      shouldDataResetEmail: false,
      shouldDataResetPhone: false,
      shouldDataResetAddress: false,
    };
    this.ref = React.createRef();
  }

  componentWillUnmount() {
    this.props.resetPolicyStatus();
  }

  renderTitle = () => {
    return <PruHeaderText text={lang.updateContactInfo()} />;
  };

  dispatchRequestOtp = () => {
    const { customer_master, requestOtp } = this.props;
    const { rowData, updateType } = this.state;
    requestOtp({
      customer_master,
      updateType,
      newValue: rowData,
    });
  };

  onSave = (updateType, rowData) => {
    this.setState(
      {
        updateType,
        rowData,
      },
      () => {
        this.dispatchRequestOtp();
      }
    );
  };

  onSaveAddress = ({ line1, city, zip }) => {
    const {countryCommonMeta} = this.props;
    const country = metaHelpers.findCommon(countryCommonMeta.countryCode2).label;
    const { policyDetails } = this.props;
    const policyOwner = pathOr(
      {},
      ["roleToCustomers", "OWNER", "0"],
      policyDetails
    );

    let clientId = pathOr("", ["customer", "clientId"], policyOwner);
    if (!clientId) {
      clientId = pathOr("", ["customer", "id"], policyOwner);
    }
    const policyId = policyDetails.id || "";
    const updateType = "address";
    const addressType = policyOwner && policyOwner.customer && policyOwner.customer.addressDetails &&
      (((policyOwner.customer.addressDetails.hasOwnProperty('HOME') && "HOME") ||
        (policyOwner.customer.addressDetails.hasOwnProperty('Current') && "Current"))) || "";

    this.setState(
      {
        updateType,
        rowData: undefined,
      },
      () => {
        this.props.updateAddress({
          clientId,
          line1,
          city,
          zip,
          country,
          updateType,
          addressType,
          policyId,
        });
      }
    );
  };

  onCancel = () => {
    this.props.resetStatus();
  };

  onOTPContinue = () => {
    const { updateType } = this.state;
    const updateInfoPayload = this.updateEditedData();
    this.props.validateOtp({
      otpEntered: this.state.otpEntered,
      updateInfoPayload,
      updateType,
    });
    this.props.resetStatus();
  };

  onSuccessModalClose = () => {
    this.resetRowDataDisable();
    this.props.resetStatus();
  };

  updateEditedData = () => {
    const { updateType, rowData } = this.state;
    const { policyDetails, isdCode } = this.props;
    const policyOwner = pathOr(
      {},
      ["roleToCustomers", "OWNER", "0"],
      policyDetails
    );
    let clientId = pathOr("", ["customer", "clientId"], policyOwner);
    if (!clientId) {
      clientId = pathOr("", ["customer", "id"], policyOwner);
    }
    const email = pathOr(
      "",
      ["customer", "contactDetails", "email", "value"],
      policyOwner
    );
    const policyId = policyDetails.id || "";

    return {
      updateType,
      value: rowData,
      clientId,
      email,
      policyId,
      isdCode,
    };
  };

  mobileOrEmail = () => {
    const { updateType } = this.state;
    if (updateType === "email") return lang.email();
    else if (updateType === "phone") return lang.phone();
    return lang.address();
  };

  renderSuccessModal() {
    const successMsg = `${lang.your()} ${this.mobileOrEmail()} ${lang.successMessage()}`;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={this.props.updateContactStatus === "updateInfoSuccess"}
        style={Styles.modalStyle}
      >
        <View style={Styles.successModalContainer}>
          <View style={Styles.successModalView}>
            <View>
              <Image source={ACCESS_GRANTED} style={Styles.successModalIcon} />
            </View>
            <View style={Styles.successModalMsg}>
              <Text style={Styles.successModalText}>{successMsg}</Text>
            </View>
            <View style={Styles.successModalMargin}>
              <AppButton
                title={lang.close()}
                press={this.onSuccessModalClose}
                type={[Styles.btnContinue, Styles.primary]}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  resetRowDataEnable = () => {
    const { updateType } = this.state;
    if (updateType === "phone") this.setState({ shouldDataResetPhone: true });
    else if (updateType === "email")
      this.setState({ shouldDataResetEmail: true });
    else if (updateType === "address")
      this.setState({ shouldDataResetAddress: true });
  };

  resetRowDataDisable = () => {
    this.setState({
      shouldDataResetPhone: false,
      shouldDataResetEmail: false,
      shouldDataResetAddress: false,
    });
  };

  renderFailureModal(showModal, errorMsg) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={showModal}
        style={Styles.modalStyle}
      >
        <View style={Styles.successModalContainer}>
          <View style={Styles.successModalView}>
            <View>
              <Image source={ACCESS_DENIED} style={Styles.successModalIcon} />
            </View>
            <View style={Styles.successModalMsg}>
              <Text style={Styles.successModalText}>{errorMsg}</Text>
            </View>
            <View style={Styles.successModalMargin}>
              <AppButton
                title={lang.close()}
                press={this.onSuccessModalClose}
                type={[Styles.btnContinue, Styles.primary]}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderOtpModal() {
    const otpMsg = `${lang.otpSentMessage()} ${this.mobileOrEmail()}`;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={this.props.updateContactStatus === "requestOTPSuccess"}
        style={Styles.modalStyle}
      >
        <View style={Styles.successModalContainer}>
          <View style={Styles.otpModalView}>
            <View style={Styles.otpMarginTop}>
              <Text style={Styles.headerText}>
                {lang.authenticationRequired()}
              </Text>
            </View>
            <View style={Styles.otpMarginTop}>
              <Text style={Styles.otpMessageText}>{otpMsg}</Text>
            </View>
            <View>
              <OTPInput
                style={Styles.otpStyle}
                pinCount={6}
                autoFocusOnLoad
                codeInputFieldStyle={Styles.underlineStyleBase}
                codeInputHighlightStyle={Styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                  this.setState({ otpEntered: code });
                }}
              />
            </View>
            <View>
              <Text style={Styles.otpNotReceivedText}>
                {lang.notReceivedYet()}{" "}
                <Text
                  style={Styles.resendTextStyle}
                  onPress={() => {
                    this.dispatchRequestOtp();
                  }}
                >
                  {lang.resend()}
                </Text>
              </Text>
            </View>
            <View style={Styles.otpButtonView}>
              <AppButton
                title={lang.canceled()}
                textStyle={Styles.cancelButtonText}
                press={this.onCancel}
                type={[Styles.btn, Styles.primaryCancel]}
              />
              <AppButton
                title={lang.continue()}
                textStyle={Styles.continueButtonText}
                press={this.onOTPContinue}
                type={[Styles.btnContinue, Styles.primary]}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderDisclaimer = () => {
    return (
      <View>
        <View style={Styles.disclaimerContainer}>
          <View style={Styles.disclaimerContainerIcon}>
            <View>
              <Icon raised name="info-circle" color="#836A27" size={14} />
            </View>
            <View style={Styles.disclaimerTextContainer}>
              <Text style={Styles.disclaimerWarningText}>
                {lang.disclaimer()}
              </Text>
            </View>
          </View>
          <View>
            <Text style={Styles.disclaimerText}>
              {lang.contactInfoDisclaimer()}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  getRequiredAddress = (addressType,policyOwner)=>{
    let requiredAddress = {};
    let addressObject =Object.assign({},pathOr({},["addressDetails", addressType],policyOwner));
    addressObject.country = undefined;
    addressObject.countryCode = undefined; 
    addressObject.addressType = undefined;
    if(addressObject && addressObject.zip){
      requiredAddress.line1 = addressObject.line1;
      requiredAddress.city = addressObject.city;
      requiredAddress.zip = addressObject.zip;
      return requiredAddress;
    }
    addressObject.zip = addressObject.zip || addressObject.zipcode;
    addressObject.zipcode = undefined;
    return addressObject;
  }

  renderUpdateData = () => {
    const {
      shouldDataResetPhone,
      shouldDataResetEmail,
      shouldDataResetAddress,
    } = this.state;

    const {
      policyDetails,
      phoneRegex,
      showPhoneTip,
      emailEditable,
      phoneEditable,
      isdCode,
      zipRegex
    } = this.props;

    const policyOwner = pathOr(
      {},
      ["roleToCustomers", "OWNER", "0", "customer"],
      policyDetails
    );

    let phone = pathOr("", ["contactDetails", "phone", "value"], policyOwner);
    if (!phone) {
      phone = pathOr("", ["contactDetails", "PHONE", "value"], policyOwner);
    }

    if (phone && phone.indexOf(isdCode) === 0) {
      phone = phone.slice(isdCode.length);
    }

    let email = pathOr("", ["contactDetails", "email", "value"], policyOwner);
    if (!email) {
      email = pathOr("", ["contactDetails", "EMAIL", "value"], policyOwner);
    }

    const addressType = policyOwner && policyOwner.addressDetails &&
      (((policyOwner.addressDetails.hasOwnProperty('HOME') && "HOME") || (policyOwner.addressDetails.hasOwnProperty('Current') && "Current"))) || ""
      const addressObject = this.getRequiredAddress(addressType,policyOwner);
      const editableAddress = Object.assign({},addressObject);
      editableAddress.city = undefined;
      editableAddress.zip = undefined;
      const displayAddress = Object.values(addressObject).filter(it => it != undefined).join(", ");
      const editableLine1 = Object.values(editableAddress).filter(it => it != undefined).join(", ");
      const city = pathOr(
      "",
      ["addressDetails", addressType, "city"],
      policyOwner
    );
     const zip = pathOr(
      "",
      ["addressDetails", addressType, "zipcode"],
      policyOwner
    );
    const line1 = pathOr(
      "",
      ["addressDetails", addressType, "line1"],
      policyOwner
    );
   
    const errorMessage = lang.updateFailed();
    const isSourceDigital = pathOr(undefined, ["sourceOfBusiness"], policyDetails) === 'DIGITAL';
    return (
      <SafeAreaView style={Styles.safeAreaContainer}>
        <View style={Styles.welcomeWraper}>
          <View style={Styles.leftHeaderContent}>
            <HeaderBackButton
              onPress={() => NavigationService.goBack()}
              tintColor="#393939"
              backTitleVisible={true}
              pressColorAndroid="rgba(0, 0, 0, 0)"
              titleStyle={Styles.titleStyle}
            />
          </View>
          <ImageBackground source={BACKGROUND_PRODUCT} style={Styles.headerBody}>
            <PulseImageHeader />
          </ImageBackground>
        </View>


        <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingBottom: 120 }}>
          <KeyboardAvoidingView
            style={[{ flex: 1 }]}
            behavior={"padding"}
          >
            <View style={Styles.titleTextContainer}>
              <Text style={Styles.titleText}>
                {lang.updateContactInfo()}
              </Text>
            </View>
            <UpdateInfoRow
              icon={CONTACT_EMAIL}
              validators={[
                {
                  validator: defaultRegExpValidator,
                  regex:
                    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
                },
              ]}
              title={lang.email()}
              data={email}
              onSave={(title, rowData) => this.onSave("email", rowData)}
              onCancel={this.onCancel}
              shouldDataReset={shouldDataResetEmail}
              editable={!isSourceDigital}
            />
            <UpdateInfoRow
              validators={[
                { validator: phoneNumberValidator, regex: phoneRegex },
                { validator: requiredValidator },
              ]}
              icon={CONTACT_PHONE}
              title={lang.phone()}
              data={phone}
              showTip={showPhoneTip}
              onSave={(title, rowData) => this.onSave("phone", rowData)}
              onCancel={this.onCancel}
              shouldDataReset={shouldDataResetPhone}
              editable={phoneEditable}
              isdCode={isdCode}
            />

            <UpdateAddressInfo
              address = {displayAddress}
              line1={editableLine1}
              city={city}
              zip={zip}
              iconImage={CONTACT_PIN}
              maxLengthLine1={100}
              maxLengthLine2={30}
              maxLengthCity={30}
              minLengthZip={zipRegex}
              onSaveAddress={this.onSaveAddress}
              onCancel={this.onCancel}
              shouldDataReset={shouldDataResetAddress}
            />

            {this.renderOtpModal()}
            {this.renderSuccessModal()}
            {this.renderFailureModal(
              pathOr("", ["updateContactStatus"], this.props).endsWith("Failure"),
              errorMessage
            )}
            {pathOr("", ["updateContactStatus"], this.props).endsWith("Failure") &&
              this.resetRowDataEnable()}
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={Styles.disclaimerView}>
          {this.renderDisclaimer()}
        </View>
      </SafeAreaView >
    );
  };

  render() {
    return this.renderUpdateData();
  }
}

UpdateContactInfo.propTypes = {
  customer_master: PropTypes.string,
  policyDetails: PropTypes.object,
  requestOtp: PropTypes.func,
  validateOtp: PropTypes.func,
  updateContactStatus: PropTypes.string,
  resetStatus: PropTypes.func,
  updateAddress: PropTypes.func,
  resetPolicyStatus: PropTypes.string,
  phoneRegex: PropTypes.string,
  showPhoneTip: PropTypes.string,
  phoneEditable: PropTypes.bool,
  emailEditable: PropTypes.bool,
  isdCode: PropTypes.string,
};

const mapStateToProps = state => ({
  customer_master: pathOr("", ["mpolicyProfile", "customer_master"], state),
  updateContactStatus: path(["myPolicy", "updateContactStatus"], state),
  policyDetails: pathOr({}, ["myPolicy", "currentSelectedPolicy"], state),
  policyStatus: path(["myPolicy", "getPolicyStatus"], state),
  showPhoneTip: path(["meta", "countryCommonMeta", "showPhoneTip"], state),
  isdCode: "+" + path(["meta", "countryCommonMeta", "isdCode"], state),
  phoneRegex: pathOr(
    "^[0-9]*$",
    ["meta", "countryCommonMeta", "countryPhoneRegex"],
    state
  ),
  emailEditable: pathOr(
    true,
    ["meta", "countryCommonMeta", "policyEndorsements", "email"],
    state
  ),
  zipRegex: pathOr(
    "\\d{6}",
    ["meta", "countryCommonMeta", "countryZipCodeRegex"], state
  ),
  phoneEditable: pathOr(
    true,
    ["meta", "countryCommonMeta", "policyEndorsements", "phone"],
    state
  ),
  countryCommonMeta: pathOr(undefined,["meta","countryCommonMeta"],state)
});

const mapDispatchToProps = {
  requestOtp: ({ customer_master, updateType, newValue }) => ({
    context: myPolicyScreens.UPDATE_INFO_SCREEN,
    type: myPolicyActions.requestOTP,
    payload: {
      updateType,
      newValue,
      customerMaster: customer_master,
    },
  }),
  validateOtp: ({ otpEntered, updateInfoPayload, updateType }) => ({
    context: myPolicyScreens.UPDATE_INFO_SCREEN,
    type: myPolicyActions.verifyOTP,
    payload: {
      otpToVerify: otpEntered,
      updateInfoPayload,
      updateType,
    },
  }),
  resetStatus: () => ({
    type: myPolicyActions.resetStatus,
  }),
  updateAddress: payload => ({
    context: myPolicyScreens.UPDATE_INFO_SCREEN,
    type: myPolicyActions.updateAddress,
    payload,
  }),
  loadMyPolicyDetail: payload => ({
    context: myPolicyScreens.UPDATE_INFO_SCREEN,
    type: myPolicyActions.getPolicyDetails,
    payload,
  }),
  resetPolicyStatus: () => ({
    context: myPolicyScreens.UPDATE_INFO_SCREEN,
    type: myPolicyActions.resetPolicyStatus,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContactInfo);
