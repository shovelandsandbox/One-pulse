import React, { Component } from "react";
import {
  Picker,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from "react-native";
import DatePicker from "react-native-date-picker";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { isValidEmail } from "../../utils/UserCredentials";
import { gotoBLChatScreen } from "../../actions";
import {
  CoreActionTypes,
  CoreActions,
  CoreComponents,
  CoreConfig,
  CoreConstants,
  CoreUtils,
  ElementErrorManager,
  metaHelpers,
  CoreSelectors,
} from "@pru-rt-internal/pulse-common";
const { AuthSelector, BabylonAuthSelector } = CoreSelectors;
const {
  pageKeys,
  SCREEN_KEY_PROFILE,
  NEW_PRPFILE,
  NEW_PRPFILE_FIRSTNAME,
  NEW_PRPFILE_FIRSTNAME_REQUIRED,
  NEW_PRPFILE_LASTNAME,
  NEW_PRPFILE_LASTNAME_REQUIRED,
  SCREEN_KEY_PROFILE_GENDER_REQUIRED,
  NEW_PRPFILE_GENDER,
  NEW_PRPFILE_DATEOFBIRTH,
  NEW_PRPFILE_DATEOFBIRTHERROR,
  NEW_PRPFILE_EMAIL,
  NEW_PRPFILE_DONE,
  NEW_PRPFILE_CountryResidence,
  NEW_PRPFILE_YConfirm,
  SCREEN_KEY_PROFILE_MALE,
  SCREEN_KEY_PROFILE_FEMALE,
  TALKTOADOCTOR,
  TALKTOADOCTOR_BYCLICK,
} = CoreConfig;
import NewTextInput from "../../components/NewTextInput";
import { BABYLON_LOGO_BLUE, BACK } from "../../config/images";
const { BABYLON_PICKED_DOBDATE } = CoreActionTypes;
const {
  babylonFirstNameChange,
  babylonLastNameChange,
  changeBabylonDobDate,
  babylonChangeGender,
  babylonCountryChange,
  setError,
  babylonDobDatePicked,
  clearBabylonUserData,
  clearError,
  setdefaultErrorMsg,
  recordBabylonRegisterationEvent,
  setBabylonLoaderState,
} = CoreActions;
import { ChatOnboardStyle as styles } from "./CheckSymptomsStyles";

import moment from "moment";
import { isEmpty, isNil, path, pathOr } from "ramda";
import { metaLabelFinder } from "../../utils/meta-utils";

const { Label } = CoreComponents;
const { SCREEN_KEY_CHAT_REGISTER } = CoreConstants;
const { isNilOrEmpty } = CoreUtils;
const KEY_NEW_SELECT = "Select";
const KEY_SEND = "send";
const KEY_REQUIRED = "required";
const KEY_DOB_ERROR = "doberror";
const KEY_COUNTRY_ERROR = "countryerror";
const KEY_BIRTHDAY = "birthday";

const window = Dimensions.get("window");
const DOB_DISPLAY_FORMAT = "DD-MM-YYYY";

import {configureLineHeight} from "../../utils/lineHeightsUtils";

// eslint-disable-next-line react/require-optimization
class CheckSymptoms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      gender: "",
      genderModalSelectedValue: "",
      cityList: ["Cambodia"],
      showDatePickerModal: false,
      genderModal: false,
      cityModal: false,
      firtNameErrorMessage: "",
      lastNameErrorMessage: "",
      genderErrorMessage: "",
      birthErrorMessage: "",
      firstNameException: false,
      lastNameException: false,
      genderException: false,
      birthException: false,
      email: "",
      emailException: false,
      emailErrorMessage: "",
      dob: this.defaultDob(),
    };
    this.currentScreen = SCREEN_KEY_CHAT_REGISTER;
    this.enableBabylonRegister = true;
  }

  defaultDob = () =>
    moment()
      .add(this.props.numYearsToAdd - this.props.minAgeRequired, "y")
      .toDate();

  componentDidMount() {
    // Setting the babylon loading state to false, as at this stage component mounts itself
    this.props.setBabylonLoaderState(false);
    this.props.updateLanguage(this.props.language);
    const { firstName, surName, gender, dob: dobStr } = this.props.profile;
    let dob;
    if (isNil(dobStr) || isEmpty(dobStr)) {
      dob = moment(this.defaultDob());
    } else {
      dob = moment(dobStr, DOB_DISPLAY_FORMAT).add(
        this.props.numYearsToAdd,
        "y"
      );
    }
    this.setState({
      firstName: firstName,
      lastName: surName,
      gender,
      dob: dob.toDate(),
    });
  }
  componentWillUnmount() {
    ElementErrorManager.setCurrentScreen(this.currentScreen);
    const required = metaHelpers.findBackendErrorMessage(
      KEY_REQUIRED,
      KEY_SEND
    );
    const dobError = metaHelpers.findBackendErrorMessage(
      KEY_DOB_ERROR,
      KEY_SEND
    );
    const countryError = metaHelpers.findBackendErrorMessage(
      KEY_COUNTRY_ERROR,
      KEY_SEND
    );
    this.props.setdefaultErrorMsg(required, dobError, countryError);
  }
  backHealthAssessmentPage = () => {
    this.props.gotoBLChatScreen({
      type: "go_Health_Assessment_private_page",
      healthFlowsData: this.props.navigation.state.params.healthFlowsData,
    });
  };

  // eslint-disable-next-line complexity
  validateForm = () => {
    const { profile, minAgeRequired, babylonError } = this.props;
    const { firstName, lastName, gender, email } = this.state;
    if (!firstName) {
      this.setState({
        firtNameErrorMessage: metaHelpers.findErrorMessage(
          metaHelpers.findElement(NEW_PRPFILE, NEW_PRPFILE_FIRSTNAME),
          NEW_PRPFILE_FIRSTNAME_REQUIRED
        ).message,
        firstNameException: true,
      });
      return false;
    }
    if (!lastName) {
      this.setState({
        lastNameErrorMessage: metaHelpers.findErrorMessage(
          metaHelpers.findElement(NEW_PRPFILE, NEW_PRPFILE_LASTNAME),
          NEW_PRPFILE_LASTNAME_REQUIRED
        ).message,
        lastNameException: true,
      });
      return false;
    }
    if (!gender) {
      this.setState({
        genderErrorMessage: metaLabelFinder(
          SCREEN_KEY_PROFILE,
          SCREEN_KEY_PROFILE_GENDER_REQUIRED
        ),
        genderException: true,
      });
      return false;
    }
    if (!this.props.profile.email && (!email || !isValidEmail(email))) {
      this.setState({
        emailErrorMessage: "Invalid email",
        emailException: true,
      });
      return false;
    }
    const maxAllowedDob = this.minDate(minAgeRequired);
    const dob = moment(this.state.dob);
    if (dob.isAfter(maxAllowedDob)) {
      this.setState({
        birthErrorMessage: metaHelpers.findErrorMessage(
          metaHelpers.findElement(NEW_PRPFILE, NEW_PRPFILE_DATEOFBIRTH),
          NEW_PRPFILE_DATEOFBIRTHERROR
        ).message,
        birthException: true,
      });
      return false;
    }

    const formData = {
      firstName: firstName,
      surName: lastName,
      sex: gender,
      dob: moment(this.state.dob)
        .subtract(this.props.numYearsToAdd, "years")
        .format(DOB_DISPLAY_FORMAT),
      countryCode: profile.countryCode,
    };
    if (email) {
      formData.contactDetails = { email: { value: email } };
    }
    if (this.enableBabylonRegister || babylonError) {
      this.updateSelfProfile(formData); // submit Form
      this.enableBabylonRegister = false;
    }
    const owntype = this.props.navigation.state.params.owntype;
    owntype && this.backHealthAssessmentPage();
  };

  updateSelfProfile = formData => {
    const { token, navigation, profile, updateProfileData } = this.props;
    const userProfile = formData;
    userProfile["id"] = profile.id;
    if (!isNilOrEmpty(token)) {
      updateProfileData(userProfile, navigation.state.params);
    }
  };

  isAllDataValid = () => {
    const { profile } = this.props;
    if (
      isNilOrEmpty(profile.firstName) ||
      isNilOrEmpty(profile.surName) ||
      isNilOrEmpty(profile.gender) ||
      isNilOrEmpty(profile.dob) ||
      isNilOrEmpty(profile.countryCode)
    ) {
      return false;
    }
    return true;
  };

  setDob = dob => this.setState({ dob });

  minDate = pastYears =>
    moment()
      .add(this.props.numYearsToAdd - pastYears, "y")
      .toDate();

  maxDate = () =>
    moment()
      .add(this.props.numYearsToAdd, "y")
      .toDate();

  closeModal = () => {
    this.props.close(this.state.dob);
    this.setState({
      showDatePickerModal: false,
      birthErrorMessage: "",
      birthException: false,
    });
  };

  getFirstName = () => {
    const { profile } = this.props;
    return (
      <View>
        <NewTextInput
          placeholder={metaLabelFinder(NEW_PRPFILE, NEW_PRPFILE_FIRSTNAME)}
          presetValue={this.state.firstName}
          exception={false}
          autoCorrect={false}
          onChange={value => this.selfInput("firstName", value)}
          onBlur={() => {
            this.resetErr("firtNameErrorMessage", "firstNameException");
          }}
          onFocus={() => {
            this.resetErr("firtNameErrorMessage", "firstNameException");
          }}
          showTipOnFocus={true}
          errorMessage={this.state.firtNameErrorMessage}
          exception={this.state.firstNameException}
        />
      </View>
    );
  };
  getLastName = () => {
    const { profile } = this.props;
    return (
      <View>
        <NewTextInput
          placeholder={metaLabelFinder(NEW_PRPFILE, NEW_PRPFILE_LASTNAME)}
          presetValue={this.state.lastName}
          exception={false}
          autoCorrect={false}
          onChange={value => {
            this.selfInput("lastName", value);
          }}
          onBlur={() => {
            this.resetErr("lastNameErrorMessage", "lastNameException");
          }}
          onFocus={() => {
            this.resetErr("lastNameErrorMessage", "lastNameException");
          }}
          showTipOnFocus={true}
          errorMessage={this.state.lastNameErrorMessage}
          exception={this.state.lastNameException}
        />
      </View>
    );
  };
  getGender = () => {
    const { profile } = this.props;
    return (
      <View>
        <NewTextInput
          placeholder={metaLabelFinder(NEW_PRPFILE, NEW_PRPFILE_GENDER)}
          DownArrow={true}
          butonMode={true}
          buttonModeAction={() => {
            const { genderModalSelectedValue } = this.state;
            if (!profile.gender) {
              this.setState({
                genderModal: true,
                genderModalSelectedValue: genderModalSelectedValue || "MALE",
              });
            }
          }}
          presetValue={
            this.state.gender
              ? metaLabelFinder(SCREEN_KEY_PROFILE, this.state.gender)
              : metaLabelFinder(SCREEN_KEY_PROFILE, KEY_NEW_SELECT)
          }
          autoCorrect={false}
          showTipOnFocus={true}
          isEnabled={true}
          isEditable={false}
          errorMessage={this.state.genderErrorMessage}
          exception={this.state.genderException}
        />
      </View>
    );
  };
  renderDob = () => {
    const { profile } = this.props;
    const dobStr = moment(this.state.dob).format(DOB_DISPLAY_FORMAT);

    return (
      <View>
        <NewTextInput
          placeholder={metaLabelFinder(NEW_PRPFILE, NEW_PRPFILE_DATEOFBIRTH)}
          DownArrow={true}
          butonMode={true}
          buttonModeAction={() => this.setState({ showDatePickerModal: true })}
          autoCorrect={false}
          presetValue={dobStr}
          isEnabled={true}
          isEditable={false}
          errorMessage={this.state.birthErrorMessage}
          exception={this.state.birthException}
          showTipOnFocus={true}
        />
      </View>
    );
  };
  getEmail = () => {
    const { profile } = this.props;
    const emailValue = profile.email || this.state.email;
    return (
      <View>
        <NewTextInput
          placeholder={metaLabelFinder(NEW_PRPFILE, NEW_PRPFILE_EMAIL)}
          presetValue={emailValue}
          exception={false}
          autoCorrect={false}
          onChange={value => {
            this.selfInput("email", value);
          }}
          inputRectStyle={{ color: "#A7A8AA" }}
          isEnabled={true}
          isEditable={profile.email ? false : true}
          onBlur={() => {
            this.resetErr("emailErrorMessage", "emailException");
          }}
          onFocus={() => {
            this.resetErr("emailErrorMessage", "emailException");
          }}
          showTipOnFocus={true}
          errorMessage={this.state.emailErrorMessage}
          exception={this.state.emailException}
        />
      </View>
    );
  };
  getCity = () => {
    const { countryCode2 } = this.props.countryCommonMeta;
    return (
      <View>
        <NewTextInput
          placeholder={metaLabelFinder(
            NEW_PRPFILE,
            NEW_PRPFILE_CountryResidence
          )}
          exception={false}
          autoCorrect={false}
          inputRectStyle={{ color: "#A7A8AA" }}
          presetValue={metaHelpers.findCommon(countryCode2).label}
          isEnabled={true}
          isEditable={false}
          showTipOnFocus={true}
          DownArrow={false}
          butonMode={true}
          buttonModeAction={() => {
            this.setState({
              cityModal: true,
            });
          }}
        />
      </View>
    );
  };
  selfInput = (type, value) => {
    this.setState({
      [type]: value,
    });
  };
  resetErr = (err, ect) => {
    this.setState({
      [err]: "",
      [ect]: false,
    });
  };

  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={() => {
            this.props.navigation.goBack();
          }}
          accessibilityLabel="home"
          accesible
        >
          <Image style={styles.backButton} source={BACK} />
        </TouchableOpacity>
        <View style={styles.headerLogoContainer} />
        <Image style={styles.headerLogo} source={BABYLON_LOGO_BLUE} />
      </View>
    );
  };

  renderBody = () => {
    const birthday = metaLabelFinder(SCREEN_KEY_CHAT_REGISTER, KEY_BIRTHDAY);
    return (
      <View>
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.formSection, { paddingTop: 20 }]}>
            {this.getFirstName()}
            {this.getLastName()}
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 2, marginRight: 24 }}>
                {this.getGender()}
              </View>
              <View style={{ flex: 3 }}>{this.renderDob(birthday, "dob")}</View>
            </View>
            {this.getEmail()}
            {this.getCity()}
          </View>
          <Text style={{ fontSize: 12, marginLeft: 10, marginRight: 10, ...configureLineHeight("12") }}>
            {metaLabelFinder(TALKTOADOCTOR, TALKTOADOCTOR_BYCLICK)}
          </Text>
        </ScrollView>

        <TouchableOpacity
          style={styles.button}
          disabled={this.props.babylonLoading || this.props.babylonUserLoggedIn}
          onPress={this.validateForm}
          activeOpacity={0.5}
        >
          <Label
            value={metaLabelFinder(NEW_PRPFILE, NEW_PRPFILE_YConfirm)}
            style={{
              ...styles.buttonText,
              ...configureLineHeight("13")
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderDateModal = () => {
    const { languageList = [], language } = this.props;
    const languageObj =
      languageList.find(
        element => element.languageCode === language.toUpperCase()
      ) || {};
    const locale = pathOr("en", ["locale"], languageObj);
    return (
      <Modal
        visible={this.state.showDatePickerModal}
        transparent={true}
        style={styles.modalStyle}
        onBackButtonPress={() => this.closeModal(this, this.props.dobDate)}
        onBackdropPress={() => this.closeModal(this, this.props.dobDate)}
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
                onPress={() => this.closeModal()}
              >
                <Text style={{ fontSize: 15, color: "#007AFF", ...configureLineHeight("15") }}>
                  {metaLabelFinder(NEW_PRPFILE, NEW_PRPFILE_DONE)}
                </Text>
              </TouchableOpacity>
            </View>
            {
              <DatePicker
                style={{
                  flex: 1,
                  width: window.width - window.width / 8,
                  margin: 10,
                  alignSelf: "center",
                }}
                mode="date"
                minimumDate={this.minDate(100)}
                maximumDate={this.maxDate()}
                date={this.state.dob}
                onDateChange={date => this.setDob(date)}
                locale={locale}
              />
            }
          </View>
        </View>
      </Modal>
    );
  };

  renderGenderModal = () => {
    const MALE = metaLabelFinder(SCREEN_KEY_PROFILE, SCREEN_KEY_PROFILE_MALE);
    const FEMALE = metaLabelFinder(
      SCREEN_KEY_PROFILE,
      SCREEN_KEY_PROFILE_FEMALE
    );
    return (
      <Modal
        visible={this.state.genderModal}
        transparent={true}
        style={styles.modalStyle}
        onRequestClose={() => {
          this.setState({
            genderModal: false,
          });
        }}
      >
        <View style={styles.genderModalContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({
                genderModal: false,
              });
            }}
          >
            <View
              style={{
                height: window.height - 260,
                width: "100%",
                alignItems: "center",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </TouchableWithoutFeedback>
          <View style={styles.genderModalListContainer}>
            <View style={styles.genderModalDoneContainer}>
              <TouchableOpacity
                style={{ height: 44, justifyContent: "center" }}
                onPress={() =>
                  this.setState({
                    genderModal: false,
                    gender: this.state.genderModalSelectedValue,
                    genderErrorMessage: "",
                    genderException: false,
                  })
                }
              >
                <Text style={{ fontSize: 15, color: "#007AFF", ...configureLineHeight("15") }}>
                  {metaLabelFinder(NEW_PRPFILE, NEW_PRPFILE_DONE)}
                </Text>
              </TouchableOpacity>
            </View>

            <Picker
              selectedValue={this.state.genderModalSelectedValue}
              style={{ height: 90, width: "100%" }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ genderModalSelectedValue: itemValue })
              }
            >
              <Picker.Item label={MALE} value={"MALE"} />
              <Picker.Item label={FEMALE} value={"FEMALE"} />
            </Picker>
          </View>
        </View>
      </Modal>
    );
  };

  renderCityModal = () => {
    const { cityList } = this.state;
    return (
      <Modal
        visible={this.state.cityModal}
        transparent={true}
        style={styles.modalStyle}
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
                onPress={() => {
                  this.setState({
                    cityModal: false,
                    cityFlag: true,
                  });
                }}
              >
                <Text style={{ fontSize: 15, color: "#007AFF" }}>
                  {metaLabelFinder(NEW_PRPFILE, NEW_PRPFILE_DONE)}
                </Text>
              </TouchableOpacity>
            </View>

            <Picker
              selectedValue={this.state.city}
              style={{ height: 90, width: "100%" }}
              onValueChange={itemValue => this.setState({ city: itemValue })}
            >
              {cityList.map(item => (
                <Picker.Item label={item} value={item} key={item} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    ElementErrorManager.setCurrentScreen(this.currentScreen);
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderDateModal()}
        {this.renderGenderModal()}
        {this.renderCityModal()}
      </View>
    );
  }
}

CheckSymptoms.propTypes = {
  firstName: PropTypes.string,
  numYearsToAdd: PropTypes.number,
  token: PropTypes.string,
  navigation: PropTypes.object,
  gender: PropTypes.string,
  dobDate: PropTypes.object,
  babylonLoading: PropTypes.bool,
  babylonUserLoggedIn: PropTypes.bool,
  setdefaultErrorMsg: PropTypes.func,
  setBabylonLoaderState: PropTypes.func,
  profile: PropTypes.object,
  minAgeRequired: PropTypes.number,
  languageList: PropTypes.array,
  language: PropTypes.string,
  babylonError: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    meta: state.meta,
    firstName: state.babylonAuth.firstName,
    lastName: state.babylonAuth.lastName,
    email: AuthSelector.getUserEmail(state),
    token: state.auth.token,
    gender: state.babylonAuth.gender,
    dobText: BabylonAuthSelector.getDobText(state),
    dobDate: new Date(BabylonAuthSelector.getDobDate(state)),
    country: state.babylonAuth.country,
    countryList: state.meta.countryList,
    firstNameErr: state.babylonAuth.firstNameErr,
    lastNameErr: state.babylonAuth.lastNameErr,
    genderErr: state.babylonAuth.genderErr,
    dobErr: state.babylonAuth.dobErr,
    showError: state.babylonAuth.showError,
    dobErrorMessage: state.babylonAuth.dobErrorMessage,
    errorMessage: state.babylonAuth.errorMessage,
    babylonLoading: state.babylonAuth.babylonLoading,
    babylonUserLoggedIn: state.babylonAuth.babylonUserLoggedIn,
    countryErr: state.babylonAuth.countryErr,
    countryErrorMessage: state.babylonAuth.countryErrorMessage,
    babylonToken: AuthSelector.getBabylonToken(state),
    babylonRegistered: state.auth.babylonRegistered,
    currentScreen: state.trigger.currentScreen,
    profile: state.profile,
    language: state.userPreferences.language,
    userPreferences: state.userPreferences,
    userCountryDetails: state.auth.countryInfo,
    countryCommonMeta: state.meta.countryCommonMeta,
    babylonError: state.babylonAuth.babylonError,
    minAgeRequired: pathOr(
      18,
      ["meta", "countryCommonMeta", "minimumAge"],
      state
    ),
    calenderSelected: state.profile.calenderSelected,
    numYearsToAdd:
      Platform.OS !== "ios" &&
      path(["auth", "countryInfo", "simCountry"], state) === "TH" &&
      moment().get("year") < 2500
        ? 543
        : 0,
    languageList: state.meta.languageList,
    // numYearsToAdd:
    //   Platform.OS !== "ios" &&
    //   path(["auth", "countryInfo", "simCountry"], state) === "TH"
    //     ? 543
    //     : 0,
  };
};

export default connect(mapStateToProps, {
  babylonFirstNameChange,
  babylonLastNameChange,
  changeBabylonDobDate,
  babylonChangeGender,
  babylonCountryChange,
  setError,
  babylonDobDatePicked,
  doBabylonRegistration: params => ({
    context: pageKeys.CHAT_ONBOARD,
    type: CoreActionTypes.BABYLON_SIGNUP,
    payload: {
      params,
    },
  }),
  close: params => ({
    type: BABYLON_PICKED_DOBDATE,
    payload: params,
  }),
  goToProfile: params => ({
    context: pageKeys.CHAT_ONBOARD,
    type: CoreActionTypes.GO_TO_MANAGE_PROFILE,
    payload: { params },
  }),
  updateLanguage: language => ({
    context: pageKeys.BABYLON_REGISTRATION,
    type: CoreActionTypes.UPDATE_BABYLON_LANGUAGE,
    payload: language,
  }),
  updateProfileData: (userProfile, params) => ({
    context: pageKeys.PROFILE,
    type: CoreActionTypes.UPDATE_PROFILE_DETAILS_1,
    payload: {
      userProfile,
      params,
    },
  }),
  clearBabylonUserData,
  clearError,
  setdefaultErrorMsg,
  recordBabylonRegisterationEvent,
  setBabylonLoaderState,
  gotoBLChatScreen,
})(CheckSymptoms);
