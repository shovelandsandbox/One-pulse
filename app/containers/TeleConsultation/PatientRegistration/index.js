import React from "react";
import {
  View,
  Picker,
  Text,
  TouchableOpacity,
  Keyboard,
  Platform,
  Alert,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CheckBox from "react-native-check-box";
import Modal from "react-native-modal";
import CodeInput from "react-native-confirmation-code-field";
import { pickBy, values, path, isNil, pathOr } from "ramda";
import styles from "./styles";
import { Theme } from "../../../themes";
const { Colors } = Theme;
import profileStyles from "../../Profile/styles";
import {
  metaHelpers,
  CoreConstants,
  CoreComponents,
  CoreActionTypes,
  CoreConfig,
  CoreUtils,
  colors,
  events
} from "@pru-rt-internal/pulse-common";
const { Label, Timer, Button, CameraGalleryModal } = CoreComponents;
import moment from "moment";
import OpenSettings from "react-native-open-settings";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from "react-native-date-picker";
import NewTextInput from "../../../components/NewTextInput";
import { CLOSE_ICON, REDO } from "../../../config/images";
import { CustomAlert } from "../../../components";
import { dispatchEvent } from "../../../actions";

const { height, width } = Dimensions.get("window");
const {
  RESET_REGISTRATION_STATUS,
  RegistrationStatus,
  SCREEN_KEY_DOC_ON_CALL_REGISTER,
  SCREEN_KEY_CHAT_REPORT,
} = CoreConstants;
const {
  pageKeys,
  SCREEN_KEY_MANAGE_PROFILE,
  TALKTOADOCTOR,
  TALKTOADOCTOR_ONLINECON,
  TALKTOADOCTOR_FIRSTNAME,
  TALKTOADOCTOR_LASTNAME,
  KEY_CAMERA_PERMISSION,
  NEW_PRPFILE,
  NEW_PRPFILE_FIRSTNAME,
  NEW_PRPFILE_LASTNAME,
  NEW_PRPFILE_FIRSTNAME_INVALID,
  NEW_PRPFILE_LASTNAME_INVALID,
  SCREEN_KEY_PROFILE,
  NEW_PRPFILE_GENDER,
  TALKTOADOCTOR_NRIC,
  TALKADOCTOR_NRIC_FIN_IMAGE,
  SCREEN_KEY_PROFILE_MALE,
  SCREEN_KEY_PROFILE_FEMALE,
  PRECON_MY_DOC_CONSENT,
  PRECON_PHONE_VERIFY_ERROR,
  DONE_KEY,
} = CoreConfig;
const { isNilOrEmpty } = CoreUtils;
const KEY_TITLE1 = "docRegisterPageTitle1";
const KEY_TITLE2 = "docRegisterPageTitle2";
const KEY_EMAIL = "docRegisterPageEmail";
const KEY_COUNTRY = "docRegisterPageCountry";
const KEY_DOB = "docRegisterPageDob";
const KEY_PHONE = "docRegisterPagePhone";
const KEY_UPDATE_TEXT = "docRegisterPageUpdateText";
const KEY_UPDATE_HERE_LINK = "docRegisterPageHereLinkText";
const KEY_CONSENT = "docRegisterPageConsentText";
const KEY_UPLOAD = "docRegisterPageUploadText";
const KEY_VERIFY_NOW = "docRegisterPageVerifyBtn";
const KEY_PROCEED = "docRegisterPageProceedBtn";
const KEY_OK = "ok";
const KEY_REQUIRED = "required";
const KEY_FIRSTNAME = "firstname";
const KEY_LASTNAME = "lastname";
const KEY_ADDRESS = "street";
const KEY_ZIPCODE = "zipcode";
const KEY_CANCEL = "cancel";
const KEY_GENDER_MALE = "male";
const KEY_GENDER_FEMALE = "female";
const KEY_GENDER_LABEL = "gender";
const KEY_STREET = "street";
const KEY_CITY = "city";
const KEY_NRIC = "NRIC";
const KEY_UNVERIFIRD = "unverified";
const KEY_VERIFIED = "verified";
const KEY_IS_REQUIRED = "docRegisterPageIsRequired";
const KEY_ZIPCODE_NOTVALID = "not_valid";
const OTP = "docRegisterPageOtp";
const KEY_NEW_SELECT = "Select";
const KEY_NRIC_REQUIRED = "docRegisterNricRequired";

class DocRegister extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      genderModal: false,
      isChecked: true,
      showResend: false,
      restartTimer: false,
      NRICNumber: null,
      firstName: null,
      surName: null,
      dob: null,
      phone: null,
      gender: null,
      street: null,
      city: null,
      zipcode: null,
      isVerfity: false,
      error: {
        firstName: false,
        surName: false,
        phone: false,
        dob: false,
        gender: false,
        street: false,
        city: false,
        zipcode: false,
        NRICNumber: false,
        NRICdocument: false
      },
      errormessage: {
        firstName: "",
        surName: "",
        phone: "",
        dob: "",
        gender: "",
        street: "",
        city: "",
        zipcode: "",
        NRICNumber: "",
        NRICdocument: ""
      },
      errorflag: {
        firstName: false,
        surName: false,
        phone: false,
        dob: false,
        gender: false,
        street: false,
        city: false,
        zipcode: false,
        NRICNumber: false,
        NRICdocument: false
      },
      status: {
        firstName: false,
        surName: false,
        phone: false,
        dob: false,
        street: false,
        city: false,
        gender: false,
        zipcode: false,
        NRICNumber: false,
        NRICdocument: false
      },
      NRICdocument: {
        fileName: null,
        base64: null,
        id: null
      },
      dobModalVisible: false,
      modalVisible: false,
    };
    this.newDate = "";
    this.containerProps = { style: styles.otpInputContainer };
    this.otp = "";
    this.zipCodeMandatory = true;
  }

  showModal = modalState => {
    this.setState({ modalVisible: modalState });
  };

  imageCallbackHandler(imageResponse) {
    const filename = imageResponse.imageName;
    const isValid = DocRegister.validateDocument(filename);
    const error = {
      ...this.state.error,
      document: !isValid,
    };
    this.setState({
      NRICdocument: {
        fileName: filename,
        base64: imageResponse.image,
        id: this.state.NRICNumber,
      },
      modalVisible: false,
      error,
    });
  }

  handleBlur = () => {
    Keyboard.dismiss();
    this.setState({
      flag: false,
    });
  };

  handleFocus = () => {
    this.setState({
      flag: true,
    });
  };

  static getDerivedStateFromProps(nextProps, state) {
    const nextState = DocRegister.validateForm(nextProps, state);
    if (nextProps.error && nextProps.error.otp) {
      return {
        ...nextState,
        showResend: true,
      };
    }
    return nextState;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile.phone !== this.props.profile.phone) {
      if (
        this.props.verifiedPhoneNumber &&
        this.props.profile.phone !== this.props.verifiedPhoneNumber
      ) {
        this.props.resetRegistrationStatus();
      }
    }
  }

  componentDidMount() {
    const { markTncAccepted } = this.props.navigation.state.params;
    if (markTncAccepted) {
      this.props.setRegistrationStatusToTncAccepted();
    }
    this.props.dispatchEvent(events.MyDocRegistrationScreen);
  }

  componentWillUnmount() {
    this.props.setRegistrationStatusToTncAccepted();
  }

  appendCountryCodeToPhone = (countryCode, phone) => {
    if (phone.indexOf("-") !== -1) {
      const splitPhone = phone.split("-");
      phone = splitPhone[1];
    }
    return `+${this.props.countryCommonMeta.isdCode}-${phone}`;
  };

  static validPhone(phone) {
    const MOBILE_PATTERN = /(\D*\d){8,}/;
    return MOBILE_PATTERN.test(phone);
  }

  static validName(name) {
    return !isNilOrEmpty(name);
  }
  static validateDocument(value) {
    return !isNilOrEmpty(value);
  }
  static validateDOB(value) {
    return !isNilOrEmpty(value);
  }
  static validateNRICNumber(value, countryNationalID, countryCode) {
    if (value) {
      if (!isNilOrEmpty(countryCode) && countryCode === "SG") {
        const reg = /^[stfgSTFG]\d{7}[a-zA-Z]$/g;
        return !reg.test(value);
      } else {
        const reg = new RegExp(countryNationalID.regex);
        return !reg.test(value);
      }
    }
    return true;
  }

  static validateForm(props, state) {
    const {
      phone,
      firstName,
      surName,
      dob,
      street,
      city,
      zipcode,
      gender,
      NRICNumber,
      countryCode
    } = props.profile;
    const { countryNationalID } = props.countryCommonMeta;
    const newFirstName = pathOr(firstName, ["firstName"], state);
    const newSurName = pathOr(surName, ["surName"], state);
    const newDob = state.dob ? state.dob : dob;
    const newPhone = state.phone ? state.phone : phone;
    const newStreet = state.street ? state.street : street;
    const newCity = state.city ? state.city : city;
    const newZipcode = state.zipcode ? state.zipcode : zipcode;
    const newGender = gender ? gender : state.gender;
    const newNRICNumber = state.NRICNumber ? state.NRICNumber : NRICNumber;
    const NRICdocument = state.NRICdocument.fileName ? state.NRICdocument.fileName : null;
    if (countryCode === "SG")
      var error = {
        phone: !DocRegister.validPhone(newPhone),
        firstName: !DocRegister.validName(newFirstName),
        lastName: !DocRegister.validName(newSurName),
        dob: !DocRegister.validateDOB(newDob),
        NRICNumber: DocRegister.validateNRICNumber(
          newNRICNumber,
          countryNationalID,
          countryCode
        ),
        street: !DocRegister.validateDOB(newStreet),
        zipcode: this.zipCodeMandatory
          ? !DocRegister.validateDOB(newZipcode)
          : false,
        gender: !DocRegister.validateDOB(newGender),
        NRICdocument: !DocRegister.validateDocument(NRICdocument)
      };
    else {
      var error = {
        phone: !DocRegister.validPhone(newPhone),
        firstName: !DocRegister.validName(newFirstName),
        lastName: !DocRegister.validName(newSurName),
        dob: !DocRegister.validateDOB(newDob),
        NRICNumber: DocRegister.validateNRICNumber(
          newNRICNumber,
          countryNationalID,
          countryCode
        ),
        street: !DocRegister.validateDOB(newStreet),
        city: !DocRegister.validateDOB(newCity),
        zipcode: this.zipCodeMandatory
          ? !DocRegister.validateDOB(newZipcode)
          : false,
        gender: !DocRegister.validateDOB(newGender)
      };
    }
    return {
      error: error,
    };
  }

  activateResend = () => {
    this.setState({
      showResend: true,
    });
  };

  hasErrors() {
    const errorFields = pickBy(val => val, this.state.error);
    const errorFlagFields = pickBy(val => val, this.state.errorflag);
    return (
      values(errorFields).length > 0 ||
      values(errorFlagFields).length > 0 ||
      !this.state.isChecked
    );
  }

  isRegStatusPhoneNotVerified() {
    return (
      this.props.registrationStatus < RegistrationStatus.PHONE_OTP_VERIFIED
    );
  }

  onProceed = formHasErrorOrPhoneNotVerified => {
    if (formHasErrorOrPhoneNotVerified) {
      const status = {
        firstName: true,
        surName: true,
        phone: true,
        dob: true,
        gender: true,
        document: true,
        street: true,
        city: true,
        NRICNumber: true,
        zipcode: true,
        NRICdocument: true
      };
      this.setState({
        status,
      });

      const formHasError = this.hasErrors();
      if (!formHasError) {
        if (!this.isRegStatusPhoneNotVerified()) {
          this.setState({
            isVerfity: false,
          });
        } else {
          this.setState({
            isVerfity: true,
          });
        }
      }
      return;
    }
    const countryCode = this.props.countryCommonMeta.countryCode2
    const userCountry = metaHelpers.findCommon(
      this.props.countryCommonMeta.countryCode2
    ).label;
    const { country } = this.props.profile;
    const firstName = this.state.firstName
      ? this.state.firstName
      : this.props.profile.firstName;
    const surName = this.state.surName
      ? this.state.surName
      : this.props.profile.surName;
    const dobDate = this.state.dob ? this.state.dob : this.props.profile.dob;
    const phone = this.state.phone
      ? this.state.phone
      : this.props.profile.phone;
    const dob = moment(dobDate, "DD-MM-YYYY");
    const street = this.state.street
      ? this.state.street
      : this.props.profile.street;
    const city = countryCode === "SG" ? userCountry : this.state.city ? this.state.city : this.props.profile.city;
    const zipcode = this.state.zipcode
      ? this.state.zipcode
      : this.props.profile.zipcode;
    const sex = this.props.profile.gender
      ? this.props.profile.gender
      : this.state.gender;
    const documents = {
      id: this.state.NRICNumber,
      type: "NRIC",
    };
    const documentsSG = {
      id: this.state.NRICNumber,
      type: "NRIC",
      filename: this.state.NRICdocument.fileName,
      format: this.state.NRICdocument.fileType,
      contentType: this.state.NRICdocument.fileType,
      extension: this.state.NRICdocument.fileType,
      content: this.state.NRICdocument.base64,
    };


    const patientRegistrationPayload = {
      ...this.props.profile,
      workflowId: this.props.workflowId,
      dob: dob.format("YYYY-MM-DD"),
      firstName,
      surName,
      documents: (!isNilOrEmpty(countryCode) && countryCode.includes("SG")) ? documentsSG : documents,
      phone: this.appendCountryCodeToPhone(
        `+${this.props.countryCommonMeta.isdCode}`,
        phone
      ),
      street,
      city,
      zipcode,
      sex,
      countryName: this.props.countryCommonMeta.countryCode2,
      countryPhoneCode: `+${this.props.countryCommonMeta.isdCode}`,
    };
    this.props.mydocRegisterPatient(patientRegistrationPayload);
  };

  removeOTPPopup = () => {
    this.props.dispatchEvent(events.MyDocRegistrationOTPCrossClick)
    this.props.verifyOtpCancel();
  };

  resendOtpfunc = () => {
    const { phone, country } = this.props.profile;
    const resendOtpPayload = {
      countryPhoneCode: `+${this.props.countryCommonMeta.isdCode}`,
      mobileNumber: this.appendCountryCodeToPhone(
        `+${this.props.countryCommonMeta.isdCode}`,
        phone
      ),
    };
    // this.refs.otp.clear();
    this.setState({
      showResend: false,
    });
    this.props.resendOtp(resendOtpPayload);
    this.props.dispatchEvent(events.MyDocRegistrationOTPResendClick)
  };

  onFulfill = otp => {
    this.props.verifyOtp(otp);
  };

  verifyPhone = () => {
    const { country, email } = this.props.profile;
    const phone = this.state.phone
      ? this.state.phone
      : this.props.profile.phone;
    if (!phone) return;
    const verifyPhonePayload = {
      countryPhoneCode: `+${this.props.countryCommonMeta.isdCode}`,
      mobileNumber: this.appendCountryCodeToPhone(
        `+${this.props.countryCommonMeta.isdCode}`,
        phone
      ),
      email,
    };
    this.props.verifyPhone(verifyPhonePayload);
    this.props.dispatchEvent(events.MyDocRegistrationVerifyPhoneClickSuccess)
  };

  cellProps = ({ /*index, isFocused,*/ hasValue }) => {
    const cellProps = {};
    if (hasValue) {
      return {
        ...cellProps,
        style: [styles.otpInput, styles.otpInputNotEmpty],
      };
    }

    return {
      ...cellProps,
      style: styles.otpInput,
    };
  };

  getOtpModal = () => {
    return (
      <Modal
        isVisible={
          this.props.workflowId &&
          this.props.registrationStatus === RegistrationStatus.TNC_ACCEPTED
        }
        style={styles.mainContainer}
        backdropColor={colors.black}
        backdropOpacity={0.5}
        transparent={true}
      >
        <Text style={styles.otpHeading}>{this.otp}</Text>
        <CodeInput
          inputPosition="full-width"
          variant="clear"
          size={40}
          activeColor={Colors.nevada}
          inactiveColor={Colors.nevada}
          onFulfill={code => this.onFulfill(code)}
          containerStyle={styles.otpInputContainer}
          containerProps={this.containerProps}
          cellProps={this.cellProps}
          keyboardType="numeric"
          codeLength={6}
          ref="otp"
        />
        <View style={styles.resendOTPContainer}>
          {this.props.error && this.props.error.otp && (
            <View style={[styles.errorPadding, { marginBottom: 10 }]}>
              <Text style={styles.errorText}>{this.props.error.otp}</Text>
            </View>
          )}
          {!this.state.showResend && (
            <View
              style={{
                backgroundColor: "rgb(229,125,131)",
                width: "52%",
                height: 42,
                borderRadius: 21,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Timer
                style={{ color: "#fff" }}
                onFinish={this.activateResend}
                onRestart={this.state.restartTimer}
                time={true}
              />
            </View>
          )}
          {this.state.showResend && (
            <TouchableOpacity
              onPress={this.resendOtpfunc}
              style={{
                flexDirection: "row",
                backgroundColor: "#ED1B2E",
                width: "52%",
                height: 42,
                borderRadius: 21,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 16, height: 16 }}
                source={REDO}
                resizeMode={"contain"}
              />
              <Text
                style={[
                  styles.resendOTPLink,
                  { marginLeft: 10, color: "#fff", fontSize: 16 },
                ]}
              >
                Resend
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.cancelOTPContainer}
          onPress={this.removeOTPPopup}
        >
          <Image
            style={{ width: 14, height: 14 }}
            source={CLOSE_ICON}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </Modal>
    );
  };

  getNonEditableField = (label, value) => {
    const { profile } = this.props;
    const isRequiredLabel = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_IS_REQUIRED
    ).label;
    return (
      <View>
        <NewTextInput
          placeholder={label}
          presetValue={path(value.split("."), profile)}
          autoCorrect={false}
          onChange={text => { }}
          showTipOnFocus={true}
          errorMessage={`${label} ${isRequiredLabel}`}
          exception={path(value.split("."), profile) == ""}
          isEditable={false}
        />
      </View>
    );
  };

  getCountryField = (label, value) => {
    const { profile } = this.props;
    const isRequiredLabel = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_IS_REQUIRED
    ).label;
    const userCountry = metaHelpers.findCommon(
      this.props.countryCommonMeta.countryCode2
    ).label;
    return (
      <View>
        <NewTextInput
          placeholder={label}
          presetValue={userCountry}
          autoCorrect={false}
          onChange={text => { }}
          showTipOnFocus={true}
          errorMessage={`${label} ${isRequiredLabel}`}
          exception={path(value.split("."), profile) == ""}
          isEditable={false}
        />
      </View>
    );
  };

  validateChangedAddressandZip = (value, text) => {
    const { countryZipCodeRegex } = this.props.countryCommonMeta;
    if (!text) {
      let displaytext;
      if (value === "street") {
        displaytext = metaHelpers.findErrorMessage(
          metaHelpers.findElement(SCREEN_KEY_MANAGE_PROFILE, KEY_STREET),
          KEY_REQUIRED
        ).message;
      } else if (value === "city") {
        displaytext = metaHelpers.findErrorMessage(
          metaHelpers.findElement(SCREEN_KEY_MANAGE_PROFILE, KEY_CITY),
          KEY_REQUIRED
        ).message;
      } else if (value === "zipcode") {
        displaytext = metaHelpers.findErrorMessage(
          metaHelpers.findElement(SCREEN_KEY_MANAGE_PROFILE, KEY_ZIPCODE),
          KEY_REQUIRED
        ).message;
      } else if (value === "firstName") {
        displaytext = metaHelpers.findErrorMessage(
          metaHelpers.findElement(SCREEN_KEY_MANAGE_PROFILE, KEY_FIRSTNAME),
          KEY_REQUIRED
        ).message;
      } else if (value === "surName") {
        displaytext = metaHelpers.findErrorMessage(
          metaHelpers.findElement(SCREEN_KEY_MANAGE_PROFILE, KEY_LASTNAME),
          KEY_REQUIRED
        ).message;
      }
      this.setState({
        errormessage: {
          ...this.state.errormessage,
          [value]: `${displaytext}`,
        },
        errorflag: {
          ...this.state.errorflag,
          [value]: true,
        },
      });
    } else if (value === "zipcode") {
      const flag = false;
      const invalidzipcode = metaHelpers.findErrorMessage(
        metaHelpers.findElement(SCREEN_KEY_MANAGE_PROFILE, KEY_ZIPCODE),
        KEY_ZIPCODE_NOTVALID
      ).message;
      const zipcoderegexcondition = new RegExp(countryZipCodeRegex);
      if (!zipcoderegexcondition.test(text)) {
        this.setState({
          errormessage: {
            ...this.state.errormessage,
            [value]: `${invalidzipcode}`,
          },
          errorflag: {
            ...this.state.errorflag,
            [value]: true,
          },
        });
      } else {
        this.setState({
          errormessage: {
            ...this.state.errormessage,
            [value]: ``,
          },
          errorflag: {
            ...this.state.errorflag,
            [value]: false,
          },
        });
      }
    } else {
      this.setState({
        errormessage: {
          ...this.state.errormessage,
          [value]: ``,
        },
        errorflag: {
          ...this.state.errorflag,
          [value]: false,
        },
      });
    }
  };

  getDOBField = (label, value) => {
    const { profile } = this.props;
    const isRequiredLabel = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_IS_REQUIRED
    ).label;
    return (
      <TouchableOpacity
        style={[styles.dateBtn, { paddingBottom: 0 }]}
        onPress={() => {
          this.setState({
            dobModalVisible: profile.dob ? false : true,
            status: { ...this.state.status, dob: true },
          });
        }}
      >
        <NewTextInput
          DownArrow={true}
          buttonModeAction={() => {
            if (!profile.dob) {
              this.setState({ dobModalVisible: true });
            }
            this.props.dispatchEvent(events.MyDocRegistrationDobClick)
          }}
          placeholder={label}
          autoCorrect={false}
          presetValue={
            this.state.dob
              ? this.state.dob
              : path(value.split("."), profile)
                ? path(value.split("."), profile)
                : "DD-MM-YYYY"
          }
          isEnabled={true}
          isEditable={false}
          errorMessage={`${label} ${isRequiredLabel}`}
          exception={
            this.state.dob === null &&
            path(value.split("."), profile) == "" &&
            this.state.status.dob
          }
          showTipOnFocus={true}
        />
      </TouchableOpacity>
    );
  };

  onChangeNRICNumber = text => {
    const { countryNationalID } = this.props.countryCommonMeta;
    const { countryCode } = this.props.profile
    const isValid = DocRegister.validateNRICNumber(text, countryNationalID, countryCode);
    this.setState({
      status: { ...this.state.status, NRICNumber: true },
      NRICNumber: text,
      error: {
        ...this.state.error,
        NRICNumber: isValid,
      },
      errorflag: {
        ...this.state.errorflag,
        NRICNumber: isValid,
      },
    });
  };

  onChangeInputField = (name, text) => {
    this.validateChangedAddressandZip(name, text);
    const value = name == "surName" ? "lastName" : name;
    this.setState({
      [name]: text,
      error: {
        ...this.state.error,
        [value]: !(name.indexOf("Name") === -1)
          ? !isNilOrEmpty(text)
          : !isNilOrEmpty(text),
      },
      status: {
        ...this.state.status,
        [value]: true,
      },
    });
  };

  getNricTextField = label => {
    const enterValidNRICErrorMessage = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_NRIC_REQUIRED
    ).label;
    const { countryNationalID } = this.props.countryCommonMeta;
    const { countryCode } = this.props.profile
    const NRICNumber = this.state.NRICNumber || this.props.profile.NRICNumber;
    return (
      <View>
        <NewTextInput
          placeholder={label}
          presetValue={NRICNumber}
          autoCorrect={false}
          onChange={text => this.onChangeNRICNumber(text)}
          maxLength={20}
          showTipOnFocus={true}
          errorMessage={enterValidNRICErrorMessage}
          exception={
            (DocRegister.validateNRICNumber(NRICNumber, countryNationalID, countryCode) &&
              this.state.status.NRICNumber) ||
            this.state.NRICNumber == ""
          }
          isEditable={true}
        />
      </View>
    );
  };

  getFieldText = (label, value) => {
    const { profile } = this.props;
    const isRequiredLabel = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_IS_REQUIRED
    ).label;
    let errorMessage = this.state.errormessage[value] || `${label} ${isRequiredLabel}`
    return (
      <View>
        <NewTextInput
          placeholder={label}
          presetValue={
            this.state[value] !== null
              ? this.state[value]
              : path(value.split("."), profile)
          }
          autoCorrect={false}
          onChange={text => this.onChangeInputField(value, text)}
          showTipOnFocus={true}
          errorMessage={errorMessage}
          exception={(this.state.errorflag[value] || this.state.error[value]) && this.state.status[value]}
          isEditable={true}
        />
      </View>
    );
  };

  getZipCodeFieldText = (label, value) => {
    const { profile } = this.props;
    const { countryZipCodeRegex } = this.props.countryCommonMeta;
    return (
      <View>
        <NewTextInput
          placeholder={label}
          presetValue={
            this.state[value] !== null
              ? this.state[value]
              : path(value.split("."), profile)
          }
          autoCorrect={false}
          onChange={text => {
            if (countryZipCodeRegex !== "") {
              this.onChangeInputField(value, text);
            }
          }}
          showTipOnFocus={true}
          errorMessage={this.state.errormessage[value]}
          exception={this.state.errorflag[value]}
          isEditable={true}
        />
      </View>
    );
  };

  // eslint-disable-next-line complexity
  getPhoneField = (label, value) => {
    const { profile, registrationStatus, countryCommonMeta } = this.props;
    const { error, status } = this.state;

    const verifyNowText = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_VERIFY_NOW
    ).label;
    const verifiedLabel = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_VERIFIED
    ).label;
    const isRequiredLabel = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_IS_REQUIRED
    ).label;

    let phoneNumber = profile[value];
    if (
      profile !== null &&
      profile[value] &&
      profile[value].indexOf("-") !== -1
    ) {
      const splitPhone = profile[value].split("-");
      phoneNumber = splitPhone[1];
    }
    const verifyNowButtonText =
      registrationStatus < RegistrationStatus.PHONE_OTP_VERIFIED
        ? verifyNowText
        : verifiedLabel;
    return (
      <View>
        <NewTextInput
          maxLength={28}
          buttonText={verifyNowButtonText}
          buttonType={
            registrationStatus < RegistrationStatus.PHONE_OTP_VERIFIED
          }
          buttonAction={
            registrationStatus < RegistrationStatus.PHONE_OTP_VERIFIED
              ? this.verifyPhone
              : null
          }
          values={`+${countryCommonMeta.isdCode}`}
          placeholder={label}
          presetValue={
            this.state[value] !== null ? this.state[value] : phoneNumber
          }
          autoCorrect={false}
          onChange={text => this.onChangeInputField(value, text)}
          showTipOnFocus={true}
          errorMessage={`${label} ${isRequiredLabel}`}
          exception={
            (profile[value] === "" && error[value] && status[value]) ||
            this.state[value] == ""
          }
          isEditable={
            this.props.registrationStatus <
            RegistrationStatus.PHONE_OTP_VERIFIED
          }
        />
      </View>
    );
  };

  getNRICUploadField = (countryCode) => {
    const uploadText = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_UPLOAD
    ).label;
    const nric = metaHelpers.findElement(
      TALKTOADOCTOR,
      TALKADOCTOR_NRIC_FIN_IMAGE
    ).label;
    const isRequiredLabel = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_IS_REQUIRED
    ).label;

    return (
      <>
        {countryCode === "SG"
          ? <View>
            <NewTextInput
              buttonText={uploadText}
              buttonAction={() => {
                this.props.dispatchEvent(events.MyDocRegistrationUploadClick)
                this.showModal(true)
              }}
              buttonType={true}
              placeholder={nric}
              presetValue={this.state.NRICdocument.fileName || " "}
              autoCorrect={false}
              onChange={() => { }}
              showTipOnFocus={true}
              errorMessage={`${nric} ${isRequiredLabel}`}
              exception={
                this.state.NRICdocument.fileName === null &&
                this.state.status.document
              }
              isEditable={false}
            />
          </View>
          : null
        }
      </>
    );
  };

  closeDOBModal = () => {
    const { profile } = this.props;
    const maxDate = this.maxDate;
    const dob = path("dob".split("."), profile) || "";
    const data = {
      dobModalVisible: false,
    };
    data.dob = this.state.dob
      ? this.state.dob
      : dob
        ? dob
        : moment(maxDate).format("DD-MM-YYYY");

    this.setState({
      ...data,
      error: {
        ...this.state.error,
        dob: false,
      },
    });
  };

  onDOBDatePicked(date) {
    this.newDate = moment(date).format("DD-MM-YYYY");
    this.state.dob = this.newDate;
  }

  getDatePickerModal() {
    const ok = metaHelpers
      .findElement(SCREEN_KEY_CHAT_REPORT, KEY_OK)
      .label.toUpperCase();
    const cancel = metaHelpers
      .findElement(SCREEN_KEY_CHAT_REPORT, KEY_CANCEL)
      .label.toUpperCase();
    const DONE_LABEL = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      DONE_KEY
    ).label;
    const { profile } = this.props;
    const dob = path("dob".split("."), profile) || "";
    const date = moment().format("DD-MM-YYYY");
    const dArr = date.split("-");
    dArr[2] = dArr[2] - 18;

    this.maxDate = new Date(`${dArr[2]}-${dArr[1]}-${dArr[0]}`);
    const maxDate = this.maxDate;
    const { languageList = [], language } = this.props;
    const languageObj =
      languageList.find(
        element => element.languageCode === language.toUpperCase()
      ) || {};
    const locale = pathOr("en", ["locale"], languageObj);
    return (
      <Modal
        visible={this.state.dobModalVisible}
        transparent={true}
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          height,
          width,
          margin: 0,
        }}
      >
        <View
          style={{
            flex: 1,
            position: "relative",
          }}
        >
          <View
            style={{
              height: 260,
              width: "100%",
              backgroundColor: "#fff",
              alignItems: "center",
              position: "absolute",
              bottom: 0,
            }}
          >
            <View
              style={{
                height: 44,
                backgroundColor: "#FAFAF8",
                alignItems: "flex-end",
                width: "100%",
                justifyContent: "center",
                paddingRight: 10,
              }}
            >
              <TouchableOpacity
                style={{ height: 44, justifyContent: "center" }}
                onPress={() => this.closeDOBModal()}
              >
                <Text style={{ fontSize: 15, color: "#007AFF" }}>
                  {DONE_LABEL}
                </Text>
              </TouchableOpacity>
            </View>
            <DatePicker
              mode="date"
              date={
                new Date(
                  (this.state.dob
                    ? this.state.dob
                    : moment(maxDate).format("DD-MM-YYYY")
                  )
                    .split("-")
                    .reverse()
                    .join("-")
                )
              }
              onDateChange={date => {
                this.onDOBDatePicked(date);
              }}
              locale={locale}
            />
          </View>
        </View>
      </Modal>
    );
  }

  genderType(genderLabel, sex) {
    const { gender } = this.state;
    const { profile } = this.props;
    return (
      <Button
        text={genderLabel}
        wrapper={[
          profileStyles.genderView,
          {
            backgroundColor:
              (gender ? gender : profile.gender) === sex
                ? colors.nevada
                : "transparent",
          },
        ]}
        style={[
          profileStyles.gender,
          {
            color:
              (gender ? gender : profile.gender) === sex
                ? colors.white
                : colors.silver,
          },
        ]}
        onClick={() => {
          this.setState({ gender: sex });
        }}
      />
    );
  }

  getGender = () => {
    const value = "gender";
    const { profile } = this.props;

    const MALE = metaHelpers.findElement(
      SCREEN_KEY_PROFILE,
      SCREEN_KEY_PROFILE_MALE
    ).label;
    const FEMALE = metaHelpers.findElement(
      SCREEN_KEY_PROFILE,
      SCREEN_KEY_PROFILE_FEMALE
    ).label;
    const newProfileGender = metaHelpers.findElement(
      NEW_PRPFILE,
      NEW_PRPFILE_GENDER
    ).label;
    const isRequiredLabel = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_IS_REQUIRED
    ).label;
    return (
      <TouchableOpacity
        style={[styles.dateBtn, { paddingBottom: 0 }]}
        onPress={() => {
          this.setState({
            genderModal: profile.gender ? false : true,
            status: { ...this.state.status, gender: true },
          });
        }}
      >
        <NewTextInput
          placeholder={newProfileGender}
          DownArrow={true}
          butonMode={true}
          buttonModeAction={() => {
            if (!profile.gender) {
              this.setState({
                genderModal: true,
              });
            }
            this.props.dispatchEvent(events.MyDocRegistrationGenderClick);
          }}
          presetValue={
            this.state.gender
              ? this.state.gender.toUpperCase() == "MALE"
                ? MALE
                : FEMALE
              : profile.gender
                ? profile.gender.toUpperCase() == "MALE"
                  ? MALE
                  : FEMALE
                : metaHelpers.findElement(SCREEN_KEY_PROFILE, KEY_NEW_SELECT)
                  .label
          }
          autoCorrect={false}
          showTipOnFocus={true}
          isEnabled={true}
          onSubmit={value => { }}
          onChange={value => { }}
          isEditable={false}
          errorMessage={`Gender ${isRequiredLabel}`}
          exception={
            (this.state[value] === null &&
              path(value.split("."), profile) == "" &&
              this.state.status[value]) ||
            this.state[value] == ""
          }
        />
      </TouchableOpacity>
    );
  };

  getGenderModal = () => {
    const MALE = metaHelpers.findElement(
      SCREEN_KEY_PROFILE,
      SCREEN_KEY_PROFILE_MALE
    ).label;
    const FEMALE = metaHelpers.findElement(
      SCREEN_KEY_PROFILE,
      SCREEN_KEY_PROFILE_FEMALE
    ).label;
    const DONE_LABEL = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      DONE_KEY
    ).label;
    return (
      <Modal
        visible={this.state.genderModal}
        transparent={true}
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        onRequestClose={() => {
          this.setState({
            genderModal: false,
          });
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.7)",
            position: "relative",
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({
                genderModal: false,
              });
            }}
          >
            <View
              style={{
                height: height - 260,
                width: "100%",
                alignItems: "center",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </TouchableWithoutFeedback>

          <View
            style={{
              height: 260,
              width: "100%",
              backgroundColor: "#fff",
              alignItems: "center",
              position: "absolute",
              bottom: 0,
            }}
          >
            <View
              style={{
                height: 44,
                backgroundColor: "#FAFAF8",
                alignItems: "flex-end",
                width: "100%",
                justifyContent: "center",
                paddingRight: 10,
              }}
            >
              <TouchableOpacity
                style={{ height: 44, justifyContent: "center" }}
                onPress={() => {
                  const { gender } = this.state;
                  this.setState({
                    genderModal: false,
                    gender: gender || "MALE",
                    error: { ...this.state.error, gender: false },
                    status: { ...this.state.status, gender: false },
                  });
                }}
              >
                <Text style={{ fontSize: 15, color: "#007AFF" }}>
                  {DONE_LABEL}
                </Text>
              </TouchableOpacity>
            </View>

            <Picker
              selectedValue={this.state.gender}
              style={{ height: 90, width: "100%" }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({
                  gender: itemValue,
                  error: { ...this.state.error, gender: false },
                });
              }}
            >
              <Picker.Item label={MALE} value={"MALE"} />
              <Picker.Item label={FEMALE} value={"FEMALE"} />
            </Picker>
          </View>
        </View>
      </Modal>
    );
  };

  prepareCameraGalleryModal = () => {
    const cameraPermission = metaHelpers.findElement(
      SCREEN_KEY_MANAGE_PROFILE,
      KEY_CAMERA_PERMISSION
    ).label;
    const ok = metaHelpers
      .findElement(SCREEN_KEY_CHAT_REPORT, KEY_OK)
      .label.toUpperCase();
    const cancel = metaHelpers.findElement(
      SCREEN_KEY_MANAGE_PROFILE,
      KEY_CANCEL
    ).label;
    const selectfrom = metaHelpers.findElement(SCREEN_KEY_PROFILE, "selectphoto")
      .label;
    return (
      <CameraGalleryModal
        isModalVisible={this.state.modalVisible}
        title={selectfrom}
        showModal={this.showModal}
        modalContainer={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        successAction={response => {
          console.log(response);
          this.setState({ modalVisible: false });
          this.imageCallbackHandler(response);
        }}
        failedAction={errorObject => {
          this.setState({ modalVisible: false });
          console.log(errorObject);
          if (errorObject.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
            CustomAlert.show(
              "",
              cameraPermission,
              {
                positiveText: ok,
                onPositivePress: () => {
                  OpenSettings.openSettings();
                },
              },
              {
                negativeText: cancel,
                onNegativePress: () => { },
              }
            );
          }
        }}
      ></CameraGalleryModal>
    );
  };

  // eslint-disable-next-line complexity
  render() {
    const genderLabel = metaHelpers.findElement(
      SCREEN_KEY_MANAGE_PROFILE,
      KEY_GENDER_LABEL
    ).label;
    const title1 = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_TITLE1
    ).label;
    const title2 = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_TITLE2
    ).label;
    const firstName = metaHelpers.findElement(
      TALKTOADOCTOR,
      TALKTOADOCTOR_FIRSTNAME
    ).label;
    const lastName = metaHelpers.findElement(
      TALKTOADOCTOR,
      TALKTOADOCTOR_LASTNAME
    ).label;
    const email = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_EMAIL
    ).label;
    const country = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_COUNTRY
    ).label;
    const dob = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_DOB
    ).label;
    const nricNumber = metaHelpers.findElement(
      TALKTOADOCTOR,
      TALKTOADOCTOR_NRIC
    ).label;
    const phone = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_PHONE
    ).label;
    const updateText = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_UPDATE_TEXT
    ).label;
    const updateHereLink = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_UPDATE_HERE_LINK
    ).label;
    const consentText = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_CONSENT
    ).label;
    const proceedBtn = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_REGISTER,
      KEY_PROCEED
    ).label;
    const city = metaHelpers.findElement(SCREEN_KEY_MANAGE_PROFILE, KEY_CITY)
      .label;
    const address = metaHelpers.findElement(
      SCREEN_KEY_MANAGE_PROFILE,
      KEY_STREET
    ).label;
    const zipcode = metaHelpers.findElement(
      SCREEN_KEY_MANAGE_PROFILE,
      KEY_ZIPCODE
    ).label;

    const ONLINECON = metaHelpers.findElement(
      TALKTOADOCTOR,
      TALKTOADOCTOR_ONLINECON
    ).label;
    const preConMydocConsent = metaHelpers.findElement(
      TALKTOADOCTOR,
      PRECON_MY_DOC_CONSENT
    ).label;
    const preConVerifyPhoneError = metaHelpers.findElement(
      TALKTOADOCTOR,
      PRECON_PHONE_VERIFY_ERROR
    ).label;
    const docRegisterScreen = metaHelpers.findScreen(
      SCREEN_KEY_DOC_ON_CALL_REGISTER
    );
    this.otp = metaHelpers.findElementWithScreen(docRegisterScreen, OTP).label;
    const countryCode = this.props.countryCommonMeta.countryCode2;
    const countryNameFromMeta = metaHelpers.findCommon(countryCode).label;
    const { countryZipCodeRegex } = this.props.countryCommonMeta;
    if (this.zipCodeMandatory && countryZipCodeRegex === "") {
      const status = {
        ...this.state.status,
        zipcode: true,
      };
      const error = {
        ...this.state.error,
        zipcode: false,
      };
      this.setState({
        status,
        error,
      });
      this.zipCodeMandatory = false;
    }
    const formHasError = this.hasErrors();

    return (
      <View
        style={{
          backgroundColor: "#fff",
          width,
          height,
        }}
      >
        <KeyboardAwareScrollView
          enableOnAndroid
          extraScrollHeight={Platform.OS == "ios" ? 10 : -52}
        >
          <View style={{ paddingBottom: 50 }}>
            <View style={styles.headerSection}>
              <Label value={ONLINECON} style={styles.heading} />
              <Label value={title1} style={styles.subhead} />
              <View style={{ marginTop: 16 }}>
                <Label
                  value={title2}
                  style={[styles.subhead, { color: "#858585", fontSize: 12 }]}
                />
              </View>
            </View>
            <View style={styles.formSection}>
              {countryCode === "VN" ? <View>
                {this.getFieldText(firstName, "firstName")}
                {this.getFieldText(lastName, "surName")}
                {this.getGender()}
                {this.getNonEditableField(email, "email")}
                {this.getCountryField(country, "country.countryName")}
                {this.getDOBField(dob, "dob")}
                {this.getFieldText(city, "city")}
                {this.getFieldText(address, "street")}
                {this.getNricTextField(nricNumber)}
                {this.getPhoneField(phone, "phone")}
                {this.getZipCodeFieldText(zipcode, "zipcode")}</View> :
                <View>
                  {this.getFieldText(firstName, "firstName")}
                  {this.getFieldText(lastName, "surName")}
                  {this.getGender()}
                  {this.getNonEditableField(email, "email")}
                  {this.getCountryField(country, "country.countryName")}
                  {this.getDOBField(dob, "dob")}
                  {this.getCountryField(city, "country.countryName")}
                  {this.getFieldText(address, "street")}
                  {this.getZipCodeFieldText(zipcode, "zipcode")}
                  {this.getNricTextField(nricNumber)}
                  {this.getNRICUploadField(countryCode)}
                  {this.getPhoneField(phone, "phone")}
                </View>
              }

              {!isNil(this.props.error) && !isNil(this.props.error.form) && (
                <View style={styles.errorPadding}>
                  <Text style={styles.errorText}>{this.props.error.form}</Text>
                </View>
              )}
              {this.state.isVerfity ? (
                <Text style={styles.errorText}>{preConVerifyPhoneError}</Text>
              ) : null}

              <View style={{ marginTop: 20 }}>
                <CheckBox
                  onClick={() => {
                    const nextCheckedState = !this.state.isChecked;
                    this.setState({
                      isChecked: nextCheckedState,
                    });
                  }}
                  style={styles.iAccept}
                  isChecked={this.state.isChecked}
                  // rightText={consentText}
                  rightText={`${preConMydocConsent}`}
                  rightTextStyle={styles.iAcceptText}
                  checkBoxColor={"#ED1B2E"}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  marginTop: 20,
                  marginBottom: 40,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: !formHasError
                      ? "#ED1B2E"
                      : "rgb(229,125,131)",
                    width: "80%",
                    height: 45,
                    borderRadius: 45,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    this.props.dispatchEvent(events.MyDocRegistrationOnProceedClick)
                    this.onProceed(
                      formHasError || this.isRegStatusPhoneNotVerified()
                    )
                  }}>
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    {proceedBtn}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>

        {this.getOtpModal()}
        {this.getDatePickerModal()}
        {this.getGenderModal()}
        {this.prepareCameraGalleryModal()}
      </View>
    );
  }
}

DocRegister.propTypes = {
  dispatch: PropTypes.func,
  workflowId: PropTypes.string,
  languageList: PropTypes.array,
  language: PropTypes.string,
  error: PropTypes.instanceOf(Object),
  registrationStatus: PropTypes.number,
  profile: PropTypes.instanceOf(Object),
};

const profileSelector = state => ({
  ...state.profile,
  street: state.profile.address1 || "",
  gender: state.profile.gender ? state.profile.gender : "",
  city: "",
  zipcode: state.profile.address3 || "",
  dob: state.profile.dob || "",
  phone: path(["phone"], state.profile)
    ? path(["phone"], state.profile).replace(/^65/, "")
    : "",
  NRICNumber: pathOr("", ["profile", "externalIds", "NATIONAL_ID"], state),
});

const mapStateToProps = state => {
  return {
    meta: state.meta,
    profile: profileSelector(state),
    workflowId: state.doctorServices.workflowId,
    registrationStatus: state.doctorServices.registrationStatus,
    verifiedPhoneNumber: state.doctorServices.mobileNumber,
    error: state.doctorServices.error,
    countryCommonMeta: state.meta.countryCommonMeta,
    language: pathOr("", ["userPreferences", "language"], state),
    languageList: state.meta.languageList,
  };
};

export default connect(mapStateToProps, {
  dispatchEvent,
  mydocRegisterPatient: patientRegistrationPayload => ({
    context: pageKeys.DOC_SERVICE_REGISTER,
    type: CoreActionTypes.DOC_SERVICE_REGISTER_PATIENT,
    payload: {
      ...patientRegistrationPayload,
    },
  }),
  verifyPhone: verifyPhonePayload => ({
    context: pageKeys.DOC_SERVICE_REGISTER,
    type: CoreActionTypes.DOC_SERVICE_VERIFY_PHONE,
    payload: {
      ...verifyPhonePayload,
    },
  }),
  verifyOtpCancel: () => ({
    context: pageKeys.DOC_SERVICE_REGISTER,
    type: CoreActionTypes.DOC_SERVICE_VERIFY_OTP_CANCEL,
  }),
  verifyOtp: otp => ({
    context: pageKeys.DOC_SERVICE_REGISTER,
    type: CoreActionTypes.DOC_SERVICE_VERIFY_OTP,
    payload: {
      otp,
    },
  }),
  resendOtp: resendOtpPayload => ({
    context: pageKeys.DOC_SERVICE_REGISTER,
    type: CoreActionTypes.DOC_SERVICE_RESEND_OTP,
    payload: {
      ...resendOtpPayload,
    },
  }),
  resetRegistrationStatus: () => ({
    type: RESET_REGISTRATION_STATUS,
    payload: {
      registrationStatus: RegistrationStatus.TNC_ACCEPTED,
    },
  }),
  setRegistrationStatusToTncAccepted: () => ({
    type: "DOC_SERVICE_TNC_ACCEPTED",
    payload: {
      registrationStatus: RegistrationStatus.TNC_ACCEPTED,
    },
  }),
})(DocRegister);
