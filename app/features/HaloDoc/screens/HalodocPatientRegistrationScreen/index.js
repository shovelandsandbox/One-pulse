import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  Picker as RnPicker,
  BackHandler
} from "react-native";
import { pickBy, values, path, isNil, isEmpty, map } from "ramda";
import Modal from "react-native-modal";
import PropTypes from "prop-types";

import CodeInput from "react-native-confirmation-code-field";
import { dispatchEvent } from "../../../../actions";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import HaloDocActionBar from "../../components/actionBar";
import {
  CoreComponents,
  CoreActionTypes,
  CoreConfig,
  CoreUtils,
  CoreConstants,
  events
} from "@pru-rt-internal/pulse-common";
const { Timer } = CoreComponents;
import { connect } from "react-redux";
import NewTextInput from "../../../../components/NewTextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const {
  pageKeys,
} = CoreConfig;
import styles from "./styles";

import {
  verifyEnteredPhone,
  verifyOtpCancel,
  markTncAccepted,
  resetRegistrationStatus,
  fulfillOtp,
  resetPhoneUpdateStatus,
  updatePhoneNumber,
  registerPatient,
  requestResendOtp,
  gotoHealthScreen,
  loadPrivacypolicy

} from '../../actions'
import { Theme } from "../../../../themes";
const { Colors } = Theme;
import ModalComponent from '../../components/ModalComponent'
import _ from "lodash";
import metaConstants from "../../meta";
import ScrollPicker from "react-native-wheel-scroll-picker";
import { gotoNewCommon } from "../../../../actions";
const {
  RegistrationStatus
} = CoreConstants;

const KEY_OK = "ok";
const KEY_CANCEL = "cancel";
const { isNilOrEmpty } = CoreUtils;

let heightItemList1 = Array.apply(null, { length: 151 })
let heightItemList = _.map(heightItemList1, (item, index) => {
  return index + 50;
});
heightItemList = [...heightItemList, ""];

let weightItemList1 = Array.apply(null, { length: 186 })
let weightItemList = _.map(weightItemList1, ((item, index) => {
  return index + 15;
}));
weightItemList = [...weightItemList, ""];


class HalodocPatientRegistrationScreen extends Component {
  constructor(props) {
    super(props);

    const selectedHeight = props.profile.height ?
      _.findIndex(heightItemList, (item => item === props.profile.height))
      : 100

    const selectedWeight = props.profile.weight ?
      _.findIndex(weightItemList, (item => item === props.profile.weight))
      : 15

    this.state = {
      firstName: props.profile.firstName ? props.profile.firstName : "",
      surName: props.profile.surName ? props.profile.surName : "",
      heightIndex: selectedHeight > -1 ? selectedHeight : 100,
      weightIndex: selectedWeight > -1 ? selectedWeight : 15,
      phone: props.profile.phone ? props.profile.phone.replace(`+${this.props.countryCommonMeta.isdCode}`, "") : this.props.verifiedPhoneNumber,
      dob: props.profile.dob ? props.profile.dob : "",
      isChecked: false,
      showResend: false,
      restartTimer: false,
      error: {
        firstName: false,
        phone: false,
        dob: false
      },
      status: {
        dob: props.profile.dob ? props.profile.dob : "",
      },
      firstNameErr: "",
      phoneErr: "",
      countryErr: "",
      firstNameException: false,
      phoneException: false,
      countryException: false,
      gender: props.profile.gender ? props.profile.gender : "",
      dobModalVisible: false,
      genderMoal: false,
      showOtpModal: false,
      heightModal: false,
      weightModal: false,
      isRegisterCallDone: false
    };
    this.containerProps = { style: styles.otpInputContainer };
    this.otp = "";
    this.resendOtp = "";
    this.metaConstants = { ...metaConstants.talkToDoctorMeta() }

  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPress);
    if (this.props.registrationStatus < RegistrationStatus.TNC_ACCEPTED) {
      this.props.markTncAccepted();
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backPress);
    this.props.dispatchEvent(events.TalkToDocRegistrationScreen);
  }

  backPress = () => {
    this.goBack();
    return true;
  }
  goBack() {
    this.props.dispatchEvent(events.TalkToDoctorPatientRegistrationBackClick);
    this.props.navigation.navigate('PulseHealth')
    return true;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile.phone !== this.props.profile.phone) {
      if (
        this.props.verifiedPhoneNumber &&
        this.props.profile.phone !== this.props.verifiedPhoneNumber
        &&
        this.props.registrationStatus < RegistrationStatus.TNC_ACCEPTED
      ) {
        this.props.resetRegistrationStatus();
      }
    }
  }

  disableProceedBtn() {
    return (
      this.props.registrationStatus < RegistrationStatus.PHONE_OTP_VERIFIED
    );
  }

  getOtpModal = () => {
    const HaloDocOTP = this.metaConstants.HaloDocOTP;
    const HaloDocXX = this.metaConstants.HaloDocXX;
    const HaloDocVerifyIdentity = this.metaConstants.HaloDocVerifyIdentity;
    const Enter_Code = this.metaConstants.Enter_Code;
    const Cancel = this.metaConstants.Cancel;
    const Code_Resend = this.metaConstants.Code_Resend;
    const Code_Not_Received = this.metaConstants.Code_Not_Received

    return (
      <Modal
        isVisible={Boolean(
          this.state.showOtpModal &&
          this.props.registrationStatus === RegistrationStatus.TNC_ACCEPTED
        )}
        style={styles.mainContainer}
        backdropColor={Colors.black}
        backdropOpacity={0.5}
        transparent={true}
      >
        <Text style={[styles.otpHeading]}>
          {
            Enter_Code
          }
        </Text>
        <Text style={[styles.otpSubHeading]}>{`${HaloDocOTP}${
          this.state.phone ? this.state.phone.slice(-2) : HaloDocXX
          } ${HaloDocVerifyIdentity}`}</Text>
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
          {!this.state.showResend && (
            <Timer
              onFinish={this.activateResend}
              onRestart={this.state.restartTimer}
            />
          )}

          {this.props.error && this.props.error.otp ? (
            <View style={styles.errorPadding}>
              <Text style={styles.errorText}>{this.props.error.otp}</Text>
            </View>
          ) : null}

          {this.state.showResend && (
            <TouchableOpacity onPress={this.resendOtpFunc}>
              <Text style={styles.resendOTPLink}>
                {
                  Code_Not_Received
                }
                {" "}
                <Text style={styles.resendOTPLinkRed}>
                  {
                    Code_Resend
                  }
                </Text>
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.cancelOTPContainer}
          onPress={this.removeOTPPopup}
        >
          <Text style={styles.cancelOTP}>
            {Cancel}
          </Text>
        </TouchableOpacity>
      </Modal>
    );
  };

  genderType(genderLabel, sex) {
    const Transparent = this.metaConstants.Transparent;
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
                ? Colors.nevada
                : Transparent
          }
        ]}
        style={[
          profileStyles.gender,
          {
            color:
              (gender ? gender : profile.gender) === sex
                ? Colors.white
                : Colors.silver
          }
        ]}
        onClick={() => {
          this.setState({ gender: sex });
        }}
      />
    );
  }

  genderView() {
    const Male = this.metaConstants.Male;
    const Female = this.metaConstants.Female;
    const Gender = this.metaConstants.Gender;
    return (
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.labelTitle}>{Gender}</Text>
        <View style={profileStyles.flx_rw}>
          {this.genderType(
            Male,
            Male
          )}
          {this.genderType(
            Female,
            Female
          )}
        </View>
      </View>
    );
  }

  getGenderTranslation(value, isEnglish) {
    const Male = this.metaConstants.Male;
    const Female = this.metaConstants.Female;
    if (value == "MALE" || value === Male) {
      if (isEnglish) {
        return "Male";
      } else return value
    } else if (value == "FEMALE" || value === Female) {
      if (isEnglish) {
        return "Female";
      } else return value
    } else {
      return undefined;
    }
  }

  getGender = () => {
    const value = this.metaConstants.Gender;
    const Gender_Required = this.metaConstants.Gender_Required
    const { profile } = this.props;

    return (
      <TouchableOpacity
        style={[styles.dateBtn, { paddingBottom: 0 }]}
        onPress={() => {
          this.setState({
            genderMoal: profile.gender ? false : true,
            status: { ...this.state.status, gender: true }
          });
        }}
      >
        <NewTextInput
          placeholder={
            value
          }
          DownArrow={true}
          butonMode={true}
          buttonModeAction={() => {
            this.setState({
              genderMoal: true
            });
          }}
          presetValue={this.getGenderTranslation(this.state.gender)}
          autoCorrect={false}
          showTipOnFocus={true}
          isEnabled={true}
          isEditable={false}
          errorMessage={`${
            Gender_Required
            }`}
          exception={
            (isNil(this.state[value]) &&
              path(value.split("."), profile) == "" &&
              this.state.status[value]) ||
            this.state[value] == ""
          }
        />
      </TouchableOpacity>
    );
  };

  onProceed = () => {
    const Verify_Phone = this.metaConstants.Verify_Phone
    const Email = this.metaConstants.Email

    if (
      !this.props.registrationStatus === RegistrationStatus.PHONE_OTP_VERIFIED
    ) {
      alert(
        Verify_Phone
      );
      return;
    }

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
    const city = this.state.city ? this.state.city : this.props.profile.city;
    const zipcode = this.state.zipcode
      ? this.state.zipcode
      : this.props.profile.zipcode;
    const gender = this.props.profile.gender
      ? this.props.profile.gender
      : this.state.gender;
    const payload = {
      contactDetails: {
        email: {
          channel: "EMAIL",
          value: this.props.profile.email
        },
        phone: {
          value: phone

        }
      },
      lifestyle: {
        height: heightItemList[this.state.heightIndex],
        weight: weightItemList[this.state.weightIndex]
      },
      firstName,
      dob: dob.format("YYYY-MM-DD"),
      sex: this.getGenderTranslation(gender, true),
    };

    if (this.props.isPhoneUpdated) {
      this.props.registerPatient(payload);
    }
    else {
      this.setState({ isRegisterCallDone: false })
      this.props.updatePhoneNumber(this.state.phone);
    }
  };

  selfInput = (type, value) => {
    this.setState({
      [type]: value
    });
  };
  onFulfill = otp => {
    this.props.fulfillOtp(otp);
    this.state.showOtpModal = false;
  };
  cellProps = ({ /*index, isFocused,*/ hasValue }) => {
    const Transparent = this.metaConstants.Transparent
    const cellProps = {
      underlineColorAndroid: Transparent
    };
    if (hasValue) {
      return {
        ...cellProps,
        style: [styles.otpInput, styles.otpInputNotEmpty]
      };
    }

    return {
      ...cellProps,
      style: styles.otpInput
    };
  };
  activateResend = () => {
    this.setState({
      showResend: true
    });
  };
  resendOtpFunc = () => {
    const { phone, country } = this.props.profile;

    const payload = {
      countryPhoneCode: country.countryPhoneCode,
      mobileNumber: this.appendCountryCodeToPhone(
        country.countryPhoneCode,
        phone
      )
    };
    this.refs.otp.clear();
    this.setState({
      showResend: false,
    });
    this.props.requestResendOtp(payload);
  };

  closeModal = () => {
    const { profile } = this.props;
    const maxDate = this.maxDate;
    const dob = path("dob".split("."), profile) || "";
    const data = {
      dobModalVisible: false
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
        dob: false
      }
    });
  };
  onChangeTextForName = (name, text) => {
    const SurName = this.metaConstants.SurName;
    const LastName = this.metaConstants.LastName;
    const Name = this.metaConstants.Name;
    const value = name == SurName ? LastName : name;
    this.setState({
      [name]: text,
      error: {
        ...this.state.error,
        [value]: !(name.indexOf(Name) === -1
          ? !isNilOrEmpty(text)
          : !isNilOrEmpty(text))
      }
    });
  };

  onChangeTextForPhone = (text) => {
    const re = /^[0]?[8]\d+$/;
    if (isEmpty(text) || re.test(text)) {
      this.setState({
        phone: text,
        error: !isNilOrEmpty(text)
        // {
        //   ...this.state.error,
        //   [phone]: !(phone.indexOf("Name") === -1
        //     ? !isNilOrEmpty(text)
        //     : !isNilOrEmpty(text))
        // }
      });
    }
  };

  appendCountryCodeToPhone = (countryCode, phone) => {
    return countryCode.concat("-").concat(phone);
  };


  removeOTPPopup = () => {
    this.props.verifyOtpCancel();
    this.state.showOtpModal = false;
  };
  resetErr = (err, ect) => {
    this.setState({
      [err]: "",
      [ect]: false
    });
  };
  verifyPhone = () => {
    const { countryCommonMeta } = this.props;
    if (this.props.registrationStatus == 2) {
      return false;
    }
    if (!this.state.phone) {
      return;
    }

    this.state.showOtpModal = true;
    const payload = {
      mobileNumber: this.state.phone,
      countryPhoneCode: `+${countryCommonMeta.isdCode}`
    }
    this.props.verifyEnteredPhone(payload);
  };

  hasErrors() {
    const errorFields = pickBy(val => val, this.state.error);
    return values(errorFields).length > 0;
  }

  getDatePickerModal() {
    const { profile } = this.props;
    const date = moment().format("DD-MM-YYYY");
    const dArr = date.split("-");
    dArr[2] = dArr[2] - 18;

    this.maxDate = new Date(`${dArr[2]}-${dArr[1]}-${dArr[0]}`);
    const maxDate = this.maxDate;
    return (
      <ModalComponent
        isVisible={this.state.dobModalVisible}
        onDonePress={this.closeModal}
      >
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
        />
      </ModalComponent>
    );
  }

  onDOBDatePicked(date) {
    this.newDate = moment(date).format("DD-MM-YYYY");
    this.state.dob = this.newDate;
  }

  getFieldText = (label, value, isDisabled) => {
    const First_Name = this.metaConstants.First_Name;
    const Sur_Name = this.metaConstants.Sur_Name;
    const isRequired = this.metaConstants.isRequired;
    const Alphabet_Valid = this.metaConstants.Alphabet_Valid;
    const { profile } = this.props;
    let type = false;
    const re = /^[a-zA-Z\-\s]*$/;
    if (
      value ===
      First_Name ||
      value === Sur_Name
    ) {
      if (!re.test(this.state.status[value])) {
        type = true;
      }
    }
    return (
      <View>
        {value === "dob" ? (
          <TouchableOpacity
            style={[styles.dateBtn, { paddingBottom: 0 }]}
            onPress={() => {
              this.setState({
                dobModalVisible: profile.dob ? false : true,
                status: { ...this.state.status, dob: true }
              });
            }}
          >
            <NewTextInput
              DownArrow={true}
              buttonModeAction={() => {
                if (!profile.dob) {
                  this.setState({ dobModalVisible: true });
                }
              }}
              placeholder={label}
              autoCorrect={false}
              presetValue={this.state.dob}
              isEnabled={true}
              isEditable={false}
              errorMessage={`${label} ${
                isRequired
                }`}
              exception={
                isNil(this.state.dob) &&
                path(value.split("."), profile) == "" &&
                this.state.status.dob
              }
              exception={
                (isNil(this.state[value]) &&
                  path(value.split("."), profile) == "" &&
                  this.state.status[value]) ||
                this.state[value] == ""
              }
              exception={
                (isNil(this.state.dob) &&
                  path(value.split("."), profile) == "" &&
                  this.state.status.dob) ||
                this.state.dob == ""
              }
              showTipOnFocus={true}
            />
          </TouchableOpacity>
        ) : (
            <NewTextInput
              placeholder={label}
              presetValue={

                !isNil(this.state[value])
                  ? this.state[value]
                  : path(value.split("."), profile)
              }
              autoCorrect={false}
              onChange={text => this.onChangeTextForName(value, text)}
              showTipOnFocus={true}
              errorMessage={
                type
                  ? `${
                  Alphabet_Valid
                  } ${label}`
                  : `${label} ${
                  isRequired
                  }`
              }
              exception={
                (isNil(this.state[value]) &&
                  path(value.split("."), profile) == "" &&
                  this.state.status[value]) ||
                this.state[value] == "" ||
                type
              }
              isEditable={true}
            />
          )}
      </View>
    );
  };

  componentWillReceiveProps(nextProps) {
    if (!this.state.isRegisterCallDone && nextProps.isPhoneUpdated) {
      this.setState({ isRegisterCallDone: true })
      this.onProceed();
    }
  }

  componentWillMount() {
    this.props.resetPhoneUpdateStatus();
  }


  renderFirstName() {
    const First_Name = this.metaConstants.First_Name
    return (
      <NewTextInput
        placeholder={
          First_Name
        }
        presetValue={this.state.firstName}
        exception={false}
        isEditable={false}
        autoCorrect={false}
        isEnabled={false}
        inputRectStyle={styles.inputRectStyle}
        onChange={value => {
          this.selfInput("firstName", value);
        }}
        onBlur={() => { }}
        onFocus={() => { }}
        showTipOnFocus={true}
        errorMessage={this.state.firstNameErr}
        exception={this.state.firstNameException}
        onBlur={() => {
          this.resetErr("firstNameErr", "firstNameException");
        }}
        onFocus={() => {
          this.resetErr("firstNameErr", "firstNameException");
        }}
      />
    )
  }

  renderLastName() {
    const LastName = this.metaConstants.LastName
    return (
      <NewTextInput
        placeholder={
          LastName
        }
        presetValue={this.state.surName}
        exception={false}
        autoCorrect={false}
        isEditable={false}
        isEnabled={false}
        inputRectStyle={styles.inputRectStyle}
        onChange={value => {
          this.selfInput("surName", value);
        }}
        showTipOnFocus={true}
        errorMessage={this.state.surNameErr}
        exception={this.state.surNameException}
        onBlur={() => {
          this.resetErr("surNameErr", "surNameException");
        }}
        onFocus={() => {
          this.resetErr("surNameErr", "surNameException");
        }}
      />

    )
  }

  renderHeightInput() {
    const Height = this.metaConstants.Height
    const { profile } = this.props
    return (
      <NewTextInput
        placeholder={Height}
        DownArrow={true}
        presetValue={`${heightItemList[this.state.heightIndex]} cm`}
        exception={false}
        autoCorrect={false}
        isEditable={false}
        onChange={value => {
          this.selfInput("surName", value);
        }}
        showTipOnFocus={true}
        errorMessage={this.state.surNameErr}
        exception={this.state.surNameException}
        onBlur={() => {
          this.resetErr("surNameErr", "surNameException");
        }}
        onFocus={() => {
          this.resetErr("surNameErr", "surNameException");
        }}
        buttonModeAction={() => {
          this.setState({
            heightModal: true
          });
        }}
      />
    )
  }

  renderWeightInput() {
    const { profile } = this.props
    const Weight = this.metaConstants.Weight
    return (
      <NewTextInput
        placeholder={Weight}
        DownArrow={true}
        presetValue={`${weightItemList[this.state.weightIndex]} kg`}
        exception={false}
        autoCorrect={false}
        isEditable={false}
        onChange={value => {
          this.selfInput("surName", value);
        }}
        showTipOnFocus={true}
        errorMessage={this.state.surNameErr}
        exception={this.state.surNameException}
        onBlur={() => {
          this.resetErr("surNameErr", "surNameException");
        }}
        onFocus={() => {
          this.resetErr("surNameErr", "surNameException");
        }}
        buttonModeAction={() => {
          this.setState({
            weightModal: true
          });
        }}
      />
    )
  }

  renderGenderInput() {
    const dob = this.metaConstants.DOB;
    return (
      <View style={styles.genderView} >
        <View style={styles.genderContainer}>
          {this.getGender()}
        </View>

        <View style={styles.dateView}>
          {this.getFieldText(dob, "dob")}
        </View>
      </View>
    )
  }

  renderMobileVerifyInput() {

    const isRequired = this.metaConstants.isRequired
    let { profile } = this.props;
    this.otp = this.metaConstants.Enter_Otp;
    this.resendOtp = this.metaConstants.Resend_Otp;
    const phoneLabel = this.metaConstants.Phone_Number;
    const phoneKey = this.metaConstants.Phone;
    let phoneNumber = profile.phone;
    return (

      <View style={styles.mobileView} >
        <View style={styles.countrycodeView}>

          <NewTextInput
            placeholder={this.metaConstants.CountryCode}
            DownArrow={false}
            presetValue={`+${this.props.countryCommonMeta.isdCode}`}
            inputRectStyle={styles.inputRectStyle}
            exception={false}
            autoCorrect={false}
            onChange={value => { }}
            onSubmit={value => { }}
            showTipOnFocus={true}
            isEnabled={false}
            isEditable={false}
          />
        </View>
        <View style={styles.countryNo} >
          <View style={styles.phoneNoView}>
            <NewTextInput
              maxLength={12}
              keyboardType="phone-pad"
              values={""}
              placeholder={phoneLabel}
              presetValue={
                !isNil(this.state.phone)
                  ? this.state.phone
                  : phoneNumber
              }
              autoCorrect={false}
              onChange={text =>
                this.onChangeTextForPhone(text)
              }
              showTipOnFocus={true}
              errorMessage={`${phoneLabel} ${isRequired}`}
              exception={
                (profile.phone === "" &&
                  this.state.error["phone"]) ||
                this.state.phone == ""
              }
              isEditable={
                (this.props.registrationStatus <
                  RegistrationStatus.PHONE_OTP_VERIFIED)
              }
              inputRectStyle={{
                color:
                  this.props.registrationStatus ===
                  RegistrationStatus.REGISTERED && Colors.Mischka
              }}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.verifyBtn,
              {
                backgroundColor:
                  !this.state.phone ||
                    this.state.phone.length < 10 ||
                    this.props.registrationStatus ===
                    RegistrationStatus.PHONE_OTP_VERIFIED
                    ? Colors.rgb243
                    : Colors.pulseRed
              }
            ]}
            onPress={this.verifyPhone}
            disabled={
              !this.state.phone ||
              this.state.phone.length < 10 ||
              this.props.registrationStatus ===
              RegistrationStatus.PHONE_OTP_VERIFIED
            }
          >
            <Text
              style={[
                styles.verifyText,
                {
                  color:
                    !this.state.phone ||
                      this.state.phone.length < 10 ||
                      this.props.registrationStatus ===
                      RegistrationStatus.PHONE_OTP_VERIFIED
                      ? Colors.rgb197
                      : Colors.white
                }
              ]}
            >
              {
                this.metaConstants.Verify
              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  loadPdfView = value => {
    this.props.loadPrivacypolicy(value);
  }
  renderPrivacy() {
    const privacyHaloDoc = this.metaConstants.privacyHaloDoc;
    const title = this.metaConstants.title_privacy
    const PRIVACY_POLICY_HALODOC_HEADING = this.metaConstants.PrivacyNotice
    const Pulse_Privacy = this.metaConstants.PulsePrivacyNotice

    return (
      <View style={styles.termsConditionMsgContainerStyle}>
        <Text style={styles.conditionNoticeNotClickableTextStyle}>
          {this.metaConstants.Confirm_Privacy}
          <Text
            style={styles.conditionNoticeClickableTextStyle}
            onPress={() => this.loadPdfView("Pulse")}>
            {` ${
              this.metaConstants.PrivacyNotice
              } `}
          </Text>
        </Text>
      </View>
    )
  }

  renderConfirmButton() {
    const Proceed = this.metaConstants.Proceed

    let disableProceedBtn = true;

    if (
      this.props.profile.email &&
      this.state.phone &&
      this.state.gender &&
      this.state.dob &&
      this.props.registrationStatus >= RegistrationStatus.PHONE_OTP_VERIFIED
    ) {
      disableProceedBtn = false;
    } else {
      disableProceedBtn = true;
    }

    this.otp = this.metaConstants.Enter_Otp;
    this.resendOtp = this.metaConstants.Resend_Otp

    const formHasError = this.hasErrors();


    return (
      <TouchableOpacity
        style={[
          styles.confirmButtonContainerStyle,
          {
            backgroundColor: disableProceedBtn
              ? Colors.rgb243
              : Colors.pulseRed
          }
        ]}
        disabled={disableProceedBtn}
        onPress={() => {
          this.onProceed(formHasError || this.disableProceedBtn());
          this.props.dispatchEvent(events.TalkToDoctorConfirmPatientRegistration);
        }}
      >
        <Text
          style={[
            styles.confirmTextStyle,
            { color: disableProceedBtn ? Colors.rgb190 : Colors.white }
          ]}
        >
          {Proceed}
        </Text>
      </TouchableOpacity>
    )
  }

  renderModalForGender() {
    const Male = this.metaConstants.Male;
    const Female = this.metaConstants.Female;
    return (

      <ModalComponent
        isVisible={this.state.genderMoal}
        onDonePress={() => {
          this.setState({
            genderMoal: false,
            gender:
              this.state.gender ||
              Male
          });
        }}
      >
        <RnPicker
          selectedValue={this.state.gender}
          style={styles.pickerView}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({
              gender: itemValue,
              error: { ...this.state.error, gender: false }
            });
          }}
        >
          <RnPicker.Item
            label={Male}
            value={Male}
          />
          <RnPicker.Item
            label={Female}
            value={Female}
          />
        </RnPicker>
      </ModalComponent>
    )
  }

  renderModalForHeight() {
    return (
      <ModalComponent
        isVisible={this.state.heightModal}
        onDonePress={() => {
          this.setState({
            heightModal: false
          });
        }}
      >
        <ScrollPicker
          dataSource={map((item => `${item} cm`), heightItemList)}
          selectedIndex={this.state.heightIndex}
          onValueChange={(data, selectedIndex) => {
            this.setState({ heightIndex: selectedIndex });
          }}
          wrapperHeight={180}
          wrapperWidth={150}
          wrapperBackground={Colors.offwhite}
          itemHeight={60}
          highlightColor={Colors.GainsboroD8D8D8}
          highlightBorderWidth={2}
          activeItemColor={Colors.Nero}
          itemColor={Colors.pinkSwan}
        />

      </ModalComponent>
    )
  }

  renderModalForweight() {

    return (
      <ModalComponent
        isVisible={this.state.weightModal}
        onDonePress={() => {
          this.setState({
            weightModal: false
          });
        }}>
        <ScrollPicker
          dataSource={map((item => `${item} kg`), weightItemList)}
          selectedIndex={this.state.weightIndex}
          onValueChange={(data, selectedIndex) => {
            this.setState({ weightIndex: selectedIndex });
          }}
          wrapperHeight={180}
          wrapperWidth={150}
          wrapperBackground={Colors.offwhite}
          itemHeight={60}
          highlightColor={Colors.GainsboroD8D8D8}
          highlightBorderWidth={2}
          activeItemColor={Colors.Nero}
          itemColor={Colors.pinkSwan}
        />
      </ModalComponent>
    )
  }

  render() {
    return (
      <View style={styles.firstView} >
        <HaloDocActionBar onGoBack={() => this.goBack()} />

        <KeyboardAwareScrollView onKeyboardWillShow={frames => { }}>

          <ScrollView
            style={styles.scroll} >

            <View style={styles.secondView}>
              {this.renderFirstName()}
              {this.renderLastName()}
              {this.renderHeightInput()}
              {this.renderWeightInput()}
              {this.renderGenderInput()}
              {this.renderMobileVerifyInput()}
            </View>

            {this.renderPrivacy()}
            {this.renderConfirmButton()}

          </ScrollView>

        </KeyboardAwareScrollView>

        {this.getOtpModal()}
        {this.getDatePickerModal()}
        {this.renderModalForGender()}
        {this.renderModalForHeight()}
        {this.renderModalForweight()}

      </View>
    );
  }
}



HalodocPatientRegistrationScreen.propTypes = {
  dispatch: PropTypes.func,
  workflowId: PropTypes.string,
  error: PropTypes.instanceOf(Object),
  registrationStatus: PropTypes.number,
  profile: PropTypes.instanceOf(Object)
};

const profileSelector = state => ({
  ...state.profile,
  country: state.babylonAuth.country,
  street: state.profile.address1 || "",
  gender: state.profile.gender ? state.profile.gender : "",
  city: state.profile.address2 || '',
  zipcode: state.profile.address3 || "",
  dob: state.profile.dob || "",
  phone: path(["phone"], state.profile)
    ? path(["phone"], state.profile).replace(/^65/, "")
    : ""
});

const mapStateToProps = state => {
  return {
    countryCommonMeta: state.meta.countryCommonMeta,
    profile: profileSelector(state),
    workflowId: state.haloDocServices.workflowId,
    registrationStatus: state.haloDocServices.registrationStatus,
    verifiedPhoneNumber: state.haloDocServices.mobileNumber,
    error: state.haloDocServices.error,
    country: state.babylonAuth.country,
    token: state.auth.token,
    IC: state.auth.IC,
    userProfile: state.profile,
    phoneVerified: state.haloDocServices.phoneVerified,
    isPhoneUpdated: state.haloDocServices.isPhoneUpdated,

  };
};
export default connect(
  mapStateToProps,
  {
    dispatchEvent,
    verifyEnteredPhone,
    verifyOtpCancel,
    markTncAccepted,
    resetRegistrationStatus,
    fulfillOtp,
    resetPhoneUpdateStatus,
    updatePhoneNumber,
    registerPatient,
    requestResendOtp,
    gotoNewCommon,
    gotoHealthScreen,
    loadPrivacypolicy,

    goBackToStack: () => ({
      context: pageKeys.All,
      type: CoreActionTypes.GO_BACK_TO_PREVIOUS_STACK
    }),


  }
)(HalodocPatientRegistrationScreen);

