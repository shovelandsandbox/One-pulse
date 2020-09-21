import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { any, values, path } from "ramda";
import {
  colors,
  CoreActionTypes,
  CoreActions,
  CoreComponents,
  CoreConfig,
  CoreConstants,
  CoreUtils,
  ElementErrorManager,
  metaHelpers,
  CoreSelectors
} from "@pru-rt-internal/pulse-common";
const { AuthSelector, BabylonAuthSelector } = CoreSelectors;
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
} = CoreActions;
import { OfflineImage } from "react-native-image-offline";
import { ChatOnboardStyle as styles } from "./styles";
import { BABYLON_LOGO_BLUE } from "../../config/images";

const { Label } = CoreComponents;
const { pageKeys } = CoreConfig;
const { SCREEN_KEY_CHAT_REGISTER, COMMON_KEY_BABYLON_LOGO } = CoreConstants;
const { isNilOrEmpty } = CoreUtils;
const helpers = metaHelpers;
const KEY_FIRSTNAME = "firstname";
const KEY_LASTNAME = "lastname";
const KEY_BIRTHDAY = "birthday";
const KEY_GENDER_LABEL = "gender";
const KEY_COUNTRY = "country";
const KEY_TITLE = "title";
const KEY_SUBTITLE = "subtitle";
const KEY_SEND = "send";
const KEY_REQUIRED = "required";
const KEY_DOB_ERROR = "doberror";
const KEY_COUNTRY_ERROR = "countryerror";
const KEY_UPDATE_PROFILE = "updateProfileText";
const KEY_HERE = "here";

class ChatOnboard extends Component {
  itemRefs = [];
  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
    this.currentScreen = SCREEN_KEY_CHAT_REGISTER;
    this.validateForm = this.validateForm.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    // if (this.props.userProfile) {
    //   this.updateUserDetail(this.props.userProfile);
    // }
  }
  componentWillUnmount() {
    ElementErrorManager.setCurrentScreen(this.currentScreen);
    const required = helpers.findBackendErrorMessage(KEY_REQUIRED, KEY_SEND);
    const dobError = helpers.findBackendErrorMessage(KEY_DOB_ERROR, KEY_SEND);
    const countryError = helpers.findBackendErrorMessage(
      KEY_COUNTRY_ERROR,
      KEY_SEND
    );
    this.props.setdefaultErrorMsg(required, dobError, countryError);
  }

  closeModal(date) {
    if (isNilOrEmpty(date)) {
      const {
        babylonDobDatePicked: babylonDobDatePickedFunc,
        dobDate,
      } = this.props;
      babylonDobDatePickedFunc(dobDate);
    }
    this.setState({
      modalVisible: false,
    });
  }

  validateForm() {
    const { profile, doBabylonRegistration } = this.props;
    // let healthFlowsData=
    this.props.clearError();
    const errObj = {
      dobErr: isNilOrEmpty(profile.dob),
      firstNameErr: isNilOrEmpty(profile.firstName),
      lastNameErr: isNilOrEmpty(profile.surName),
      genderErr: isNilOrEmpty(profile.gender),
      countryErr: profile.countryCode === null,
    };
    errObj.errorMessage =
      errObj.firstNameErr ||
      errObj.lastNameErr ||
      errObj.genderErr ||
      errObj.countryErr;
    const hasError = any(x => x, values(errObj));

    doBabylonRegistration(this.props.navigation.state.params);

    this.props.setError(hasError, errObj);
  }

  findElement(elementKey) {
    return helpers.findElement(this.currentScreen, elementKey);
  }

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

  renderTopSection() {
    const title = this.findElement(KEY_TITLE).label;
    const subtitle = this.findElement(KEY_SUBTITLE).label;

    return (
      <View style={styles.headerSection}>
        <Label value={title} style={styles.heading} />
        <Label value={subtitle} style={styles.subhead} />
        {/* {!isNilOrEmpty(this.props.errorMessage) && (
          <Label
            value={this.props.errorMessage}
            style={styles.errorDefaultText}
          />
        )}
        {this.props.dobErr && (
          <Label value={this.props.dobErrorMessage} style={styles.errorText} />
        )}
        {this.props.countryErr && (
          <Label
            value={this.props.countryErrorMessage}
            style={styles.errorText}
          />
        )} */}
      </View>
    );
  }

  getField = (label, value) => {
    const { profile } = this.props;
    return (
      <View>
        <Label value={label} style={styles.label} />
        <Label
          value={path(value.split("."), profile)}
          style={[
            styles.textinput,
            {
              borderBottomColor:
                path(value.split("."), profile) === undefined ||
                  path(value.split("."), profile) === ""
                  ? colors.red
                  : colors.white,
            },
          ]}
        />
      </View>
    );
  };

  goToManageProfile = () => {
    this.props.goToProfile({
      userData: this.props.profile,
      editable: true,
      related: false,
      newProfile: false,
    });
  };

  render() {
    ElementErrorManager.setCurrentScreen(this.currentScreen);
    const firstName = this.findElement(KEY_FIRSTNAME).label;
    const lastname = this.findElement(KEY_LASTNAME).label;
    const birthday = this.findElement(KEY_BIRTHDAY).label;
    const countryLabel = this.findElement(KEY_COUNTRY).label;
    const genderLabel = this.findElement(KEY_GENDER_LABEL).label;
    const send = this.findElement(KEY_SEND).label;
    let buttonStyle = styles.button;
    const isAllDataValid = this.isAllDataValid();
    if (!isAllDataValid) {
      buttonStyle = [
        buttonStyle,
        { backgroundColor: "#F08080", borderColor: "#F08080" },
      ];
    }
    const updateProfile = this.findElement(KEY_UPDATE_PROFILE).label;
    const here = this.findElement(KEY_HERE).label;
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          backdropColor={colors.black}
          backdropOpacity={0.6}
          isVisible={this.state.modalVisible}
          onBackButtonPress={this.closeModal.bind(this, this.props.dobDate)}
          onBackdropPress={this.closeModal.bind(this, this.props.dobDate)}
        />
        {/* <View style={styles.flexRow}>
          <OfflineImage
            accessibilityLabel="babylonLogo"
            resizeMode="contain"
            accesible
            key={COMMON_KEY_BABYLON_LOGO}
            style={styles.babylonHeader}
            fallbackSource={BABYLON_LOGO_BLUE}
            source={{
              uri: helpers.findCommon(COMMON_KEY_BABYLON_LOGO).image,
            }}
          />
        </View> */}
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {this.renderTopSection()}
          <View style={[styles.formSection, { paddingTop: 20 }]}>
            {this.getField(firstName, "firstName")}
            {this.getField(lastname, "surName")}
            {this.getField(genderLabel, "gender")}
            {this.getField(birthday, "dob")}
            {this.getField(countryLabel, "countryCode")}

            <Text style={styles.profileLink}>
              <Text style={{ color: colors.nevada }}>{updateProfile}</Text>
              <Text
                onPress={() => this.goToManageProfile()}
                style={{ color: colors.crimson }}
              >
                {" "}
                {here}{" "}
              </Text>
            </Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={buttonStyle}
          disabled={!isAllDataValid}
          onPress={this.validateForm.bind(this)}
          activeOpacity={0.5}
        >
          <Label value={send} style={styles.buttonText} />
        </TouchableOpacity>
      </View>
    );
  }
}

ChatOnboard.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  token: PropTypes.string,
  gender: PropTypes.string,
  dobText: PropTypes.string,
  dobDate: PropTypes.object,
  country: PropTypes.object,
  countryList: PropTypes.array,
  firstNameErr: PropTypes.bool,
  lastNameErr: PropTypes.bool,
  genderErr: PropTypes.bool,
  dobErr: PropTypes.bool,
  showError: PropTypes.bool,
  dobErrorMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  babylonLoading: PropTypes.bool,
  babylonUserLoggedIn: PropTypes.bool,
  countryErr: PropTypes.bool,
  countryErrorMessage: PropTypes.string,
  userProfile: PropTypes.object,
  babylonToken: PropTypes.string,
  babylonRegistered: PropTypes.bool,
  currentScreen: PropTypes.string,
  babylonFirstNameChange: PropTypes.func,
  babylonLastNameChange: PropTypes.func,
  changeBabylonDobDate: PropTypes.func,
  babylonChangeGender: PropTypes.func,
  babylonCountryChange: PropTypes.func,
  setError: PropTypes.func,
  babylonDobDatePicked: PropTypes.func,
  doBabylonRegistration: PropTypes.func,
  clearBabylonUserData: PropTypes.func,
  clearError: PropTypes.func,
  setdefaultErrorMsg: PropTypes.func,
};

const mapStateToProps = state => ({
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
});

export default connect(
  mapStateToProps,
  {
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
    goToProfile: params => ({
      context: pageKeys.CHAT_ONBOARD,
      type: CoreActionTypes.GO_TO_MANAGE_PROFILE,
      payload: { params },
    }),
    clearBabylonUserData,
    clearError,
    setdefaultErrorMsg,
    recordBabylonRegisterationEvent,
  }
)(ChatOnboard);
