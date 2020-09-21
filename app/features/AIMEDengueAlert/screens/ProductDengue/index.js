import React, { Component } from "react";
import {
  Alert,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Picker
} from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { withNavigationFocus } from "react-navigation";
import {
  CoreActionTypes,
  CoreComponents,
  CoreConstants,
  CoreConfig,
  CoreUtils,
  ElementErrorManager,
  metaHelpers
} from "@pru-rt-internal/pulse-common";
import { goto } from "../../../../actions";
const {
  pageKeys,
  colors,
  NEW_PRPFILE,
  NEW_PRPFILE_FIRSTNAME,
  NEW_PRPFILE_LASTNAME,
  NEW_PRPFILE_GENDER,
  NEW_PRPFILE_CITY,
  NEW_PRPFILE_DATEOFBIRTH,
  NEW_PRPFILE_EMAIL,
  NEW_PRPFILE_CountryResidence,
  NEW_PRPFILE_YConfirm,
  SCREEN_KEY_PROFILE,
  SCREEN_KEY_PROFILE_MALE,
  SCREEN_KEY_DENGUE,
  ELEMENT_KEY_MISSING_FIELD,
  ELEMENT_KEY_MANDATORY_FIELD,
  ELEMENT_KEY_NRIC_FORMAT,
  ERROR_KEY_ENTER_VALID_NRIC,
  ELEMENT_KEY_PHONE_NUMBER,
  ELEMENT_KEY_COUNTRY_CODE,
  ERROR_KEY_INVALID_PHONE_NUMBER,
  ERROR_KEY_INVALID_NRIC,
  ELEMENT_KEY_INSURED_DETAILS,
  ELEMENT_KEY_CONTINUE,
  ELEMENT_KEY_NRIC
} = CoreConfig;
import NewTextInput from "../../../../components/NewTextInput";
import DengueNavigationHeader from "./Header";
import { ProductDengueContainerStyle as styles } from "./styles";

const { GO_TO_NEW_PROFILE } = CoreActionTypes;
const { Label } = CoreComponents;
const { SCREEN_KEY_CHAT_REGISTER } = CoreConstants;
const { isNilOrEmpty, isNRICValid } = CoreUtils;
const KEY_OK = "ok";
const KEY_CANCEL = "cancel";

// eslint-disable-next-line react/require-optimization
class ProductDengueIndex extends Component {
  constructor(props) {
    super(props);
    const { profile } = props;
    this.state = {
      phonenumber: profile.phone || "",
      nric: "",
      nricErrorMessage: "",
      nricException: false,
      phoneErrorMessage: "",
      phoneException: false
    };
    this.currentScreen = SCREEN_KEY_CHAT_REGISTER;
  }

  componentDidMount() {
    this.validateProfileInfo(this.props);
  }

  checkChangeInUserInfo(oldProfile, newProfile) {
    return (
      oldProfile.firstName !== newProfile.firstName ||
      oldProfile.surName !== newProfile.surName ||
      oldProfile.email !== newProfile.email ||
      oldProfile.phone !== newProfile.phone
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.checkChangeInUserInfo(this.props.profile, nextProps.profile)) {
      const { profile } = nextProps;
      this.setState({
        phonenumber: profile.phone
      });
    }

    if (nextProps.isUserEligibleForProduct) {
      this.props.goto(pageKeys.DENGUE_PRODUCT_BENEFICIEARY_DETAIL);
    }
  }

  componentDidUpdate() {
    if (this.props.isFocused && !this.props.profile.updatingUser) {
      this.validateProfileInfo(this.props);
    }
  }

  gotoEditUserProfile = () => {
    this.isAlertShown = false;
    const { profile } = this.props;
    this.props.navigation.navigate('newProfile', {
      path: pageKeys.ACCOUNT_PROFILE,
      userData: {
        ...profile,
        profilePicture: profile.profilePicture
      },
      editable: true,
      related: false,
      newProfile: false
    });
  };

  // eslint-disable-next-line complexity
  validateProfileInfo = data => {
    const {
      firstName,
      surName,
      email,
      phone,
      address1,
      address2,
      address3
    } = data.profile;

    if (
      !firstName ||
      !surName ||
      !email ||
      !phone ||
      !address1 ||
      !address2 ||
      !address3
    ) {
      const ok = this.findElement(KEY_OK).label.toUpperCase();
      const cancel = this.findElement(KEY_CANCEL).label.toUpperCase();
      const missingFieldText = metaHelpers.findElement(
        SCREEN_KEY_DENGUE,
        ELEMENT_KEY_MISSING_FIELD
      ).label;
      const mandatoryFieldText = metaHelpers.findElement(
        SCREEN_KEY_DENGUE,
        ELEMENT_KEY_MANDATORY_FIELD
      ).label;
      if (!this.isAlertShown) {
        this.isAlertShown = true;
        Alert.alert(
          missingFieldText,
          mandatoryFieldText,
          [
            {
              text: cancel,
              onPress: () => this.goBack(),
              style: "cancel"
            },
            { text: ok, onPress: () => this.gotoEditUserProfile() }
          ],
          { cancelable: false }
        );
      }
    }
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  setErrorMessage = (value, errMsg, profile, label, msg, obj) => {
    if (!value) {
      const tLabel = metaHelpers.findElement(profile, label);
      obj[errMsg] = msg
        ? metaHelpers.findErrorMessage(tLabel, msg).message
        : tLabel;
      this.setState(obj);
      return false;
    }
    return true;
  };

  validateForm = () => {
    this.setState({
      phoneErrorMessage: "",
      phoneException: false,
      nricException: false,
      nricErrorMessage: ""
    });
    const isAllDataValid = this.isAllDataValid();
    const { profile } = this.props;
    const {
      firstName,
      surName,
      gender,
      dob,
      email,
      address1,
      address2,
      address3,
      countryCode
    } = profile;
    // const male = metaHelpers.findElement(
    //   SCREEN_KEY_PROFILE,
    //   SCREEN_KEY_PROFILE_MALE
    // ).label;
    if (isAllDataValid) {
      const lifeAssured = [
        {
          firstName: firstName,
          surName: surName,
          clientId: "000",
          // "nationality": "Permanent Resident", //TODO: change to dynamic value
          // "dob": dob.replace(/-/g, "/"),
          // "sex": gender === male ? "M" : "F",
          externalIds: {
            NRIC: this.state.nric
          },
          contactDetails: {
            EMAIL: {
              channel: "EMAIL",
              value: email
            },
            PHONE: {
              channel: "PHONE",
              value: this.state.phonenumber
            }
          },
          addressDetails: {
            Residence: {
              type: "permanent",
              line1: address1,
              city: address2,
              zipcode: address3,
              country: countryCode
            }
          }
        }
      ];
      this.props.updateLifeAssured({ lifeAssured });
      this.props.checkNricAvailability(email, this.state.nric);
    }
  };

  findElement(elementKey) {
    return metaHelpers.findElement(this.currentScreen, elementKey);
  }

  isAllDataValid = () => {
    const validateNRIC = this.validateNRIC();
    const validatePhone = this.validatePhone();
    if (!validateNRIC || !validatePhone) {
      return false;
    }
    return true;
  };

  getTextInput = (
    placeholderTxtLbl,
    presetVal,
    inputIdentifier,
    isEditable = false,
    err = null,
    ect = null,
    errMsg = null,
    exMsg = null
  ) => {
    const placeholderTxt = metaHelpers.findElement(
      NEW_PRPFILE,
      placeholderTxtLbl
    ).label;
    const eFn = () => {
      err &&
        ect &&
        this.setState({
          [err]: "",
          [ect]: false
        });
    };
    textStyle = isEditable ? styles.editable : styles.nonEditable;
    return (
      <View>
        <NewTextInput
          placeholder={placeholderTxt}
          presetValue={presetVal}
          autoCorrect={false}
          onChange={value =>
            inputIdentifier && this.setState({ [inputIdentifier]: value })
          }
          inputRectStyle={textStyle}
          onSubmit={() => { }}
          onBlur={eFn}
          onFocus={eFn}
          showTipOnFocus={true}
          errorMessage={errMsg ? errMsg : ""}
          exception={exMsg ? exMsg : false}
          isEnabled={true}
          isEditable={isEditable}
        />
      </View>
    );
  };

  getStaticData = (label, value) => {
    return this.getTextInput(label, value);
  };

  getPhoneNumber = () => {
    const phoneNumberLabel = metaHelpers.findElement(
      SCREEN_KEY_DENGUE,
      ELEMENT_KEY_PHONE_NUMBER
    ).label;
    const countryCodeLabel = metaHelpers.findElement(
      SCREEN_KEY_DENGUE,
      ELEMENT_KEY_COUNTRY_CODE
    ).label;
    const isPhoneVerified =
      !!this.props.profile.isVerified || this.props.isPhoneVerified;
    return (
      <View style={styles.phoneView}>
        <NewTextInput
          placeholder={countryCodeLabel}
          DownArrow={false}
          presetValue={"+60"}
          exception={false}
          autoCorrect={false}
          inputRectStyle={styles.phoneViewText}
          onChange={value => {
            this.setState({ phonenumber: value });
          }}
          onSubmit={() => { }}
          showTipOnFocus={true}
          isEnabled={true}
          isEditable={false}
        />
        <View style={styles.phoneViewContainer}>
          {this.getTextInput(
            phoneNumberLabel,
            this.getPhone(this.state.phonenumber),
            "phonenumber",
            false,
            "phoneErrorMessage",
            "phoneException",
            this.state.phoneErrorMessage,
            this.state.phoneException
          )}
        </View>
        <TouchableOpacity
          style={[
            styles.verifyBtn,
            isPhoneVerified ? { borderColor: colors.green } : {}
          ]}
          disabled={isPhoneVerified}
          onPress={this.verifyPhone}
        >
          <Text
            style={[
              styles.phoneVerifyText,
              isPhoneVerified ? { color: colors.green } : {}
            ]}
          >
            {isPhoneVerified ? "Verified" : "Verify"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  onCloseVerifyPhone = () => {
    this.props.closeOtpModal();
  };

  showPhoneOTPModal = () => {
    const phonenumber = this.state.phonenumber;
    return (
      <Modal
        style={{ margin: 0, backgroundColor: "white" }}
        visible={this.props.verifyPhone === true}
      >
        <ScrollView
          style={styles.popContent}
          keyboardShouldPersistTaps="always"
        >
          {/* {
            <Validation
              phone={phonenumber}
              onCloseAction={this.onCloseVerifyPhone}
            />
          } */}
        </ScrollView>
      </Modal>
    );
  };

  getNRIC = () => {
    const shouldShowMessage = !this.state.nric;
    const nricFormat = metaHelpers.findElement(
      SCREEN_KEY_DENGUE,
      ELEMENT_KEY_NRIC_FORMAT
    ).label;
    const validNRIC = metaHelpers.findErrorMessage(
      metaHelpers.findElement(SCREEN_KEY_DENGUE, ELEMENT_KEY_NRIC),
      ERROR_KEY_ENTER_VALID_NRIC
    ).message;
    return (
      <View style={styles.phoneView}>
        <View style={styles.nricViewContainer}>
          {this.getTextInput(
            nricFormat,
            this.state.nric,
            "NRIC",
            true,
            "NRIC is in use",
            "Invalid NRIC",
            shouldShowMessage ? validNRIC : this.state.nricErrorMessage,
            shouldShowMessage ? true : this.state.nricException
          )}
        </View>
      </View>
    );
  };

  validateNRIC = () => {
    const invalidNRIC = metaHelpers.findErrorMessage(
      metaHelpers.findElement(SCREEN_KEY_DENGUE, ELEMENT_KEY_NRIC),
      ERROR_KEY_INVALID_NRIC
    ).message;
    if (!this.state.nric || this.state.nric.length !== 12) {
      this.setState({
        nricErrorMessage: invalidNRIC,
        nricException: true
      });
      return false;
    }
    return true;
  };

  validatePhone = () => {
    const invalidPhoneNumber = metaHelpers.findErrorMessage(
      metaHelpers.findElement(SCREEN_KEY_DENGUE, ELEMENT_KEY_PHONE_NUMBER),
      ERROR_KEY_INVALID_PHONE_NUMBER
    ).message;
    const phoneno = /^(\+?6?0?[1-9])[0-9]-*[0-9]{7,8}$/;
    if (!this.state.phonenumber || !this.state.phonenumber.match(phoneno)) {
      this.setState({
        phoneErrorMessage: invalidPhoneNumber,
        phoneException: true
      });
      return false;
    }
    return true;
  };

  getPhone = phonenumber => {
    let p = phonenumber;
    if (phonenumber) {
      p = phonenumber.replace("+60", "");
    }
    return p;
  };

  verifyPhone = () => {
    if (!this.state.phonenumber) {
      return;
    }
    //api to request otp
    this.props.requestOtp("+60" + this.getPhone(this.state.phonenumber));
  };

  render() {
    ElementErrorManager.setCurrentScreen(this.currentScreen);
    const { profile } = this.props;
    const {
      firstName,
      surName,
      gender,
      dob,
      email,
      address1,
      address2,
      address3,
      isVerified
    } = profile;
    const insuredDetails = metaHelpers.findElement(
      SCREEN_KEY_DENGUE,
      ELEMENT_KEY_INSURED_DETAILS
    ).label;
    const continueLabel = metaHelpers.findElement(
      SCREEN_KEY_DENGUE,
      ELEMENT_KEY_CONTINUE
    ).label;

    const isPhoneVerified = !!isVerified || this.props.isPhoneVerified;

    return (
      <View style={styles.container}>
        <DengueNavigationHeader
          handlePress={this.goBack}
          text={insuredDetails}
        />
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formSection}>
            {this.getStaticData(NEW_PRPFILE_FIRSTNAME, firstName)}
            {this.getStaticData(NEW_PRPFILE_LASTNAME, surName)}
            {this.getNRIC()}
            {/* <View style={styles.genderContainer}>
              <View style={styles.gender}>
                {this.getStaticData(NEW_PRPFILE_GENDER, gender)}
              </View>
              <View style={styles.dob}>
                {this.getStaticData(NEW_PRPFILE_DATEOFBIRTH, dob)}
              </View>
            </View> */}
            {this.getPhoneNumber()}
            {this.getStaticData(NEW_PRPFILE_EMAIL, email)}
            {this.getStaticData("Address", address1)}
            {this.getTextInput("Postal Code", address3)}
            {this.getTextInput("City", address2)}
            {this.getStaticData(NEW_PRPFILE_CountryResidence, "Malaysia")}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={this.gotoEditUserProfile}
        >
          <Text style={styles.editProfileButtonText}>Go to Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            !this.state.nric || !isPhoneVerified ? { opacity: 0.5 } : {}
          ]}
          disabled={!this.state.nric || !isPhoneVerified}
          onPress={this.validateForm}
          activeOpacity={0.5}
        >
          <Label value={continueLabel} style={styles.buttonText} />
        </TouchableOpacity>
        {this.showPhoneOTPModal()}
      </View>
    );
  }
}

ProductDengueIndex.propTypes = {
  profile: PropTypes.object,
  gotoProfile: PropTypes.func,
  navigation: PropTypes.object,
  isFocused: PropTypes.bool,
  isUserEligibleForProduct: PropTypes.bool,
  isFreshProduct: PropTypes.bool,
  requestOtp: PropTypes.func,
  isPhoneVerified: PropTypes.bool,
  closeOtpModal: PropTypes.bool,
  getCustomerDetails: PropTypes.func
};

const mapStateToProps = state => ({
  meta: state.meta,
  currentScreen: state.trigger.currentScreen,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  gotoProfile: payload => ({
    context: pageKeys.MANAGE_PROFILE,
    type: GO_TO_NEW_PROFILE,
    payload: {
      ...payload
    }
  }),
  updateLifeAssured: payload => ({
    context: pageKeys.DENGUE_PRODUCT,
    type: CoreActionTypes.UPDATE_LIFE_ASSURED,
    payload: {
      ...payload
    }
  }),
  checkNricAvailability: (email, nric) => ({
    context: pageKeys.DENGUE_PRODUCT,
    type: CoreActionTypes.CHECK_NRIC_AVAILABILITY,
    payload: {
      email,
      nric
    }
  }),
  requestOtp: params => ({
    context: pageKeys.DENGUE_PRODUCT,
    type: CoreActionTypes.DENGUE_REQUEST_OTP,
    payload: { params }
  }),
  closeOtpModal: () => ({
    type: CoreActionTypes.CLOSE_DENGUE_PRODUCT_VERIFY_PHONE
  }),
  goto
})(withNavigationFocus(ProductDengueIndex));
