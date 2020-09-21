import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  BackHandler,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Picker,
  Text,
  Modal,
  Alert,
  Platform,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { TextField } from "react-native-material-textfield";

import {
  CoreActionTypes,
  metaHelpers,
  CoreConfig,
  CoreUtils,
  CoreActions,
  events,
  CoreSelectors,
} from "@pru-rt-internal/pulse-common";

import NewTextInput from "../../components/NewTextInput";
import AddressTextField from "../../components/AddressTextField";

const {
  pageKeys,
  SCREEN_KEY_MANAGE_PROFILE,
  SCREEN_KEY_PROFILE,
  SCREEN_KEY_PROFILE_LIST,
  SCREEN_KEY_CHAT_REPORT,
  KEY_CAMERA_PERMISSION,
  KEY_GALLERY_PERMISSION,
  NEW_PRPFILE,
  NEW_PRPFILE_FIRSTNAME,
  NEW_PRPFILE_FIRSTNAME_REQUIRED,
  NEW_PRPFILE_LASTNAME,
  NEW_PRPFILE_LASTNAME_REQUIRED,
  NEW_PRPFILE_GENDER,
  NEW_PRPFILE_DATEOFBIRTH,
  NEW_PRPFILE_DATEOFBIRTHERROR,
  NEW_PRPFILE_COUNTRYCODE,
  NEW_PRPFILE_PHONENUMBER,
  NEW_PRPFILE_PHONENUMBERERROR,
  NEW_PRPFILE_EMAIL,
  NEW_PRPFILE_ADDRESS,
  NEW_PRPFILE_POSTALCODE,
  NEW_PRPFILE_POSTALCODEERROR,
  NEW_PRPFILE_CountryResidence,
  SCREEN_KEY_PROFILE_MALE,
  SCREEN_KEY_PROFILE_FEMALE,
  EDIT_PROFILE_SAVE,
  EDIT_PROFILE_DONE,
  AGENT_REFERRAL_CODE,
  TALKTOADOCTOR,
  TALKTOADOCTOR_Verify,
} = CoreConfig;
import ProfileHeader from "../../components/ProfileHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ImagePicker from "react-native-image-crop-picker";
import moment from "moment";
import Icons from "react-native-vector-icons/FontAwesome";

import styles from "./styles";
const { dispatchFeedbackReset } = CoreActions;
const {
  BABYLON_PICKED_DOBDATE,
  UPDATE_PROFILE_DETAILS_NAVIGATE,
  DELETE_CUSTOMER_CONNECT,
} = CoreActionTypes;
const { isNilOrEmpty } = CoreUtils;
import { path, isNil, isEmpty, pathOr } from "ramda";
import PropTypes from "prop-types";

import OpenSettings from "react-native-open-settings";
import { CustomAlert } from "../../components";

const KEY_OK = "ok";
const KEY_CAMERA = "camera";
const KEY_GALLERY = "gallery";
const KEY_SELECT = "selectphoto";
const KEY_CANCEL = "cancel";
// NEW
const KEY_NEW_SELECT = "Select";

const window = Dimensions.get("window");

const DOB_DISPLAY_FORMAT = "DD-MM-YYYY";

// eslint-disable-next-line react/require-optimization
export class NewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relation: "",
      firstname: null,
      lastname: null,
      street: null,
      city: "",
      zipcode: null,
      phone: "",
      gender: "",
      genderModalSelectedValue: "",
      genderFemaleArr: ["MOTHER", "SISTER"],
      genderMaleArr: ["FATHER", "BROTHER"],
      image: "",
      imageFileName: "",
      imageFormat: "",
      modalVisible: false,
      showDatePickerModal: false,
      // pickerDate1: currentTime,
      genderModal: false,
      countryModal: false,
      phoneErrorMessage: "",
      phoneException: false,
      postErrorMessage: "",
      postException: false,
      firtNameErrorMessage: "",
      firstNameException: false,
      lastNameErrorMessage: "",
      lastNameException: false,
      birthErrorMessage: "",
      birthException: false,
      autoFocus: false,
      dob: this.defaultDob(),
      showAddressSuggestion: false,
    };
    this.dobNewDialog = React.createRef();
    this.showCamera = this.showCamera.bind(this);
    this.showGallery = this.showGallery.bind(this);
    this.updateUserDetail = this.updateUserDetail.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.changePhone = this.changePhone.bind(this);
    this.validateData = this.validateData.bind(this);
    this.getUserFormData = this.getUserFormData.bind(this);
    this.validateUpdateUserDetail = this.validateUpdateUserDetail.bind(this);
    this.pickerValue = this.pickerValue.bind(this);
    this.setUserRelation = this.setUserRelation.bind(this);
    this.scrollViewRef = React.createRef();
  }

  defaultDob = () =>
    moment()
      .add(this.props.numYearsToAdd - this.props.minAgeRequired, "y")
      .toDate();

  componentDidMount() {
    this.props.resetPassword();
    this.props.resetProfileNotification();
    this.props.dispatchFeedbackReset();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick.bind(this)
    );
    const { navigation } = this.props;
    const { userData } = navigation.state.params;
    this.updateProfile(userData);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick.bind(this)
    );
  }

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
    this.props.dispatch({
      type: BABYLON_PICKED_DOBDATE,
      payload: this.state.dob,
    });

    this.setState({
      showDatePickerModal: false,
    });
  };

  imageCallbackHandler(image) {
    this.setState(
      {
        image: image.data,
        imageFileName: image.path.split("/").pop() || "",
        imageFormat: image.mime || null,
        modalVisible: false,
      },
      () => {}
    );
  }

  showGallery() {
    const galleryPermission = metaHelpers.findElement(
      SCREEN_KEY_MANAGE_PROFILE,
      KEY_GALLERY_PERMISSION
    ).label;
    const ok = metaHelpers
      .findElement(SCREEN_KEY_CHAT_REPORT, KEY_OK)
      .label.toUpperCase();
    const cancel = metaHelpers.findElement(
      SCREEN_KEY_MANAGE_PROFILE,
      KEY_CANCEL
    ).label;
    ImagePicker.openPicker({
      mediaType: "photo",
      width: 200,
      height: 200,
      includeBase64: true,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      compressImageQuality: 0.8,
      photo: "photo",
    })
      .then(this.imageCallbackHandler.bind(this))
      .catch(error => {
        if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
          CustomAlert.show(
            "",
            galleryPermission,
            {
              positiveText: ok,
              onPositivePress: () => {
                OpenSettings.openSettings();
              },
            },
            {
              negativeText: cancel,
              onNegativePress: () => {},
            }
          );
        }
      });
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  showCamera() {
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

    ImagePicker.openCamera({
      width: 200,
      height: 200,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      useFrontCamera: true,
      includeBase64: true,
      compressImageQuality: 0.8,
      photo: "photo",
    })
      .then(this.imageCallbackHandler.bind(this))
      .catch(error => {
        if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
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
              onNegativePress: () => {},
            }
          );
        }
      });
  }

  // eslint-disable-next-line complexity
  updateProfile(data) {
    const { navigation } = this.props;
    const { related } = navigation.state.params;
    if (data) {
      if (((data || {}).phone || "").indexOf("-") !== -1) {
        const splitPhone = data.phone.split("-");
        data.phone = splitPhone[1];
      }
      this.setState({
        //relation: path(["relation"], data),
        firstname: path(["firstName"], data),
        lastname: path(["surName"], data),
        street: path(["address1"], data),
        city: path(["address2"], data),
        zipcode: path(["address3"], data),
        phone: path(["phone"], data)
          ? path(["phone"], data).replace(/\+855/, "")
          : "",
        gender: path(["gender"], data),
        image: path(["profilePicture"], data),
      });
      if (!related) {
        this.setState({ email: path(["email"], data) });
      }
      if (path(["relation"], data)) {
        this.setUserRelation(data.relation);
      }
      const dobStr = path(["dob"], data);
      let dob;
      if (isNil(dobStr) || isEmpty(dobStr)) {
        dob = moment(this.defaultDob());
      } else {
        dob = moment(dobStr, DOB_DISPLAY_FORMAT).add(
          this.props.numYearsToAdd,
          "y"
        );
      }
      this.setState({ dob: dob.toDate() });
    }
  }

  changePhone(number) {
    const regex = /^[0-9]*$/;
    const isValid = regex.test(number);
    if (isValid) {
      this.setState({
        phone: number,
      });
    }
  }

  setUserRelation(val) {
    const { relationList: RelationList } = this.props;
    const itemValue = RelationList.map(data => ({
      ...data,
      key: metaHelpers.findElement(SCREEN_KEY_PROFILE_LIST, data.name).label,
    })).find(x => x.name === val);
    this.pickerValue(itemValue.key);
  }

  pickerValue(val) {
    const { genderFemaleArr, genderMaleArr } = this.state;
    const { relationList: RelationList } = this.props;
    const itemValue = RelationList.map(data => ({
      ...data,
      key: metaHelpers.findElement(SCREEN_KEY_PROFILE_LIST, data.name).label,
    })).find(x => x.key === val);
    if (genderFemaleArr.indexOf(itemValue.name) !== -1) {
      this.setState({
        relation: itemValue,
        gender: "FEMALE",
        genderEditable: false,
      });
    } else if (genderMaleArr.indexOf(itemValue.name) !== -1) {
      this.setState({
        relation: itemValue,
        gender: "MALE",
        genderEditable: false,
      });
    } else {
      this.setState({
        relation: itemValue,
        genderEditable: true,
      });
    }
  }

  // eslint-disable-next-line complexity
  validateData() {
    const { firstname, lastname } = this.state;
    const { minAgeRequired } = this.props;

    if (!firstname) {
      this.setState({
        firtNameErrorMessage: metaHelpers.findErrorMessage(
          metaHelpers.findElement(NEW_PRPFILE, NEW_PRPFILE_FIRSTNAME),
          NEW_PRPFILE_FIRSTNAME_REQUIRED
        ).message,
        firstNameException: true,
      });
      return false;
    }
    if (!lastname) {
      this.setState({
        lastNameErrorMessage: metaHelpers.findErrorMessage(
          metaHelpers.findElement(NEW_PRPFILE, NEW_PRPFILE_LASTNAME),
          NEW_PRPFILE_LASTNAME_REQUIRED
        ).message,
        lastNameException: true,
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
    this.validateUpdateUserDetail();
  }

  getUserFormData = () => {
    const {
      phone,
      lastname,
      street,
      city,
      zipcode,
      gender,
      image,
      imageFileName,
      imageFormat,
      firstname,
      email,
    } = this.state;
    const { email: Email, navigation, country, userProfile } = this.props;

    const {
      country: { countryName: CountryName },
    } = this.props;
    const { related, userData } = navigation.state.params;

    const structUserData = {};
    structUserData["firstName"] = firstname;
    structUserData["surName"] = lastname;
    structUserData["addressDetails"] = {};
    structUserData["addressDetails"]["address"] = {
      line1: street,
      city,
      zipcode,
      country: CountryName,
    };
    structUserData["dob"] = moment(this.state.dob)
      .subtract(this.props.numYearsToAdd, "years")
      .format(DOB_DISPLAY_FORMAT);
    structUserData["sex"] = gender;
    structUserData["contactDetails"] = {};
    if (!related && !isNilOrEmpty(phone)) {
      structUserData["contactDetails"]["phone"] = {
        channel: "PHONE",
        value: phone,
      };
    }
    if (!related) {
      structUserData["contactDetails"]["email"] = {
        channel: "EMAIL",
        value: Email || email,
      };
    }
    if (!isNilOrEmpty(image)) {
      structUserData["documents"] = [
        {
          content: image.toString(),
          contentType: "Image",
          filename: imageFileName,
          format: imageFormat,
        },
      ];
      if (path(["documents"], userData)) {
        structUserData["documents"][0]["id"] =
          userData.documents[userData.documents.length - 1]["id"];
      }
    }
    return structUserData;
  };

  static relationCheck(relation) {
    return (
      relation.toLowerCase() !== "spouse" &&
      relation.toLowerCase() !== "children"
    );
  }

  getRelation(relation) {
    return relation ? relation : "BROTHER";
  }

  validateUpdateUserDetail() {
    const { relation: Relation } = this.state;
    const { userData, newProfile } = this.props.navigation.state.params;
    if (userData && userData.relation !== Relation.name && !newProfile) {
      this.updateMemberRelationShip(userData, Relation.name);
    } else {
      this.updateUserDetail(userData, Relation.name);
    }
  }

  updateMemberRelationShip(userData, Relation) {
    const { userProfile: pastUserDetails } = this.props;
    const relation = this.getRelation(Relation);
    const formData = this.getUserFormData();
    let connectId = null;
    if (userData.linked) {
      connectId = userData.connectId;
    } else {
      connectId = userData.id;
    }
    this.props.dispatch({
      context: pageKeys.PROFILE,
      type: DELETE_CUSTOMER_CONNECT,
      payload: {
        relationId: userData.id,
        relation,
        pastUserDetails,
        formData,
        connectId,
      },
    });
    NewProfile.newFamilyMember(relation, pastUserDetails, formData, this.props);
  }

  updateUserDetail(userData, Relation) {
    const { related, newProfile } = this.props.navigation.state.params;
    //Read user details to get the user id from the profile object
    const { userProfile: pastUserDetails } = this.props;
    const relation = this.getRelation(Relation);
    const formData = this.getUserFormData();
    this.setState({ saveLoader: false });
    if (newProfile) {
      // new family members
      NewProfile.newFamilyMember(
        relation,
        pastUserDetails,
        formData,
        this.props
      );
    } else if (!newProfile && related) {
      // update family members
      this.updateFamilyMember(relation, pastUserDetails, formData, userData);
    } else {
      // update Self members
      this.updateSelfProfile(formData, pastUserDetails);
    }
  }

  updateSelfProfile(formData, pastUserDetails) {
    const { sessionId: SessionID, navigation } = this.props;
    formData["id"] = pastUserDetails.id;
    const userProfile = formData;
    if (this.state.phone && !this.regularExprPhone.test(this.state.phone)) {
      this.setState({
        // KEY_PHONE_ERR
        // phoneErrorMessage: metaHelpers.findElement(
        //   SCREEN_KEY_PROFILE,
        //   KEY_PHONE_ERR
        // ).label,
        phoneErrorMessage: metaHelpers.findErrorMessage(
          metaHelpers.findElement(NEW_PRPFILE, NEW_PRPFILE_PHONENUMBER),
          NEW_PRPFILE_PHONENUMBERERROR
        ).message,
        phoneException: true,
        autoFocus: true,
      });
      return false;
    }
    // if (this.state.zipcode && !regularExprZipCode.test(this.state.zipcode)) {
    if (
      this.state.zipcode &&
      !this.regularExprZipCode.test(this.state.zipcode)
    ) {
      this.setState({
        postErrorMessage: metaHelpers.findErrorMessage(
          metaHelpers.findElement(NEW_PRPFILE, NEW_PRPFILE_POSTALCODE),
          NEW_PRPFILE_POSTALCODEERROR
        ).message,
        postException: true,
        phoneErrorMessage: "",
        phoneException: false,
        autoFocus: true,
      });
      return false;
    }
    if (!isNilOrEmpty(SessionID)) {
      this.props.dispatch({
        context: pageKeys.PROFILE,
        type: UPDATE_PROFILE_DETAILS_NAVIGATE,
        payload: {
          userProfile,
          self: true,
          fromManageProfile:
            navigation.state.params.updateConnectedMembers !== undefined,
        },
      });
    }
  }

  updateFamilyMember(relation, pastUserDetails, formData, userData) {
    const userProfile = {};
    const { navigation, sessionId: SessionID } = this.props;
    if (NewProfile.relationCheck(relation)) {
      userProfile["id"] = pastUserDetails.id;
      formData["id"] = userData.id;
      userProfile["relatesTo"] = {};
      userProfile["relatesTo"][relation.toLowerCase()] = [];
      userProfile["relatesTo"][relation.toLowerCase()].push(formData);
    } else {
      formData["id"] = userData.id;
      NewProfile.checkRelationSpouse(
        relation,
        userProfile,
        pastUserDetails,
        formData
      );
    }
    if (!isNilOrEmpty(SessionID)) {
      this.props.dispatch({
        context: pageKeys.PROFILE,
        type: UPDATE_PROFILE_DETAILS_NAVIGATE,
        payload: {
          userProfile,
          fromManageProfile:
            navigation.state.params.updateConnectedMembers !== undefined,
        },
      });
    }
  }

  static newFamilyMember(relation, pastUserDetails, formData, props) {
    const userProfile = {};
    const { sessionId: SessionID, dispatch, navigation } = props;
    if (NewProfile.relationCheck(relation)) {
      userProfile["id"] = pastUserDetails.id;
      userProfile["relatesTo"] = {};
      userProfile["relatesTo"][relation.toLowerCase()] = [];
      userProfile["relatesTo"][relation.toLowerCase()].push(formData);
    } else {
      NewProfile.checkRelationSpouse(
        relation,
        userProfile,
        pastUserDetails,
        formData
      );
    }
    if (!isNilOrEmpty(SessionID)) {
      dispatch({
        context: pageKeys.PROFILE,
        type: UPDATE_PROFILE_DETAILS_NAVIGATE,
        payload: {
          userProfile,
          self: false,
          fromManageProfile:
            navigation.state.params.updateConnectedMembers !== undefined,
        },
      });
    }
  }

  static checkRelationSpouse(relation, userProfile, pastUserDetails, formData) {
    if (relation.toLowerCase() == "spouse") {
      userProfile["id"] = pastUserDetails.id;
      userProfile[relation.toLowerCase()] = {};
      userProfile[relation.toLowerCase()] = formData;
    } else {
      userProfile["id"] = pastUserDetails.id;
      userProfile[relation.toLowerCase()] = [];
      userProfile[relation.toLowerCase()].push(formData);
    }
  }

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

  onSubmitreferralCode = () => {
    this.props.navigation.navigate("RewardsRecommend", {
      referralCode: this.state.referralCode,
    });
  };

  // eslint-disable-next-line complexity
  render() {
    const {
      countryPhoneRegex,
      countryZipCodeRegex,
    } = this.props.countryCommonMeta;
    this.regularExprPhone = new RegExp(countryPhoneRegex);
    this.regularExprZipCode = new RegExp(countryZipCodeRegex);

    const {
      userProfile,
      countryList,
      userPreferences,
      countryCommonMeta,
    } = this.props;
    const selectfrom = metaHelpers.findElement(SCREEN_KEY_PROFILE, KEY_SELECT)
      .label;
    const camera = metaHelpers.findElement(SCREEN_KEY_PROFILE, KEY_CAMERA)
      .label;
    const gallery = metaHelpers.findElement(SCREEN_KEY_PROFILE, KEY_GALLERY)
      .label;
    const saveProfile = metaHelpers.findElement(
      SCREEN_KEY_PROFILE,
      EDIT_PROFILE_SAVE
    ).label;
    let { language } = userPreferences;
    let displayDate = this.pickerDate
      ? this.pickerDate
      : userProfile.dob
      ? userProfile.dob
      : "";
    if (this.props.calenderSelected != "Gregorian") {
      displayDate = this.pickerDate
        ? this.pickerDate
        : userProfile.dob
        ? this.formatDate(userProfile.dob)
        : "";
    }

    const dobStr = moment(this.state.dob).format(DOB_DISPLAY_FORMAT);
    const emailNilOrEmpty = isNilOrEmpty(this.props.email);

    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <ProfileHeader
          user={""}
          closePageHandler={() => {
            this.props.navigation.goBack();
          }}
          hideRightAccessory={false}
          rightAccessoryAction={() => {
            this.validateData();
          }}
          rightAccesoryLabel={saveProfile}
          type={"centerIcon"}
          editIconActionHandler={() => {
            this.setState({ modalVisible: true });
            this.props.dispatchEvent(events.ProfilePhoto);
          }}
          icon={
            this.state.image
              ? { uri: `data:image/jpeg;base64,${this.state.image}` }
              : null
          }
        />
        <KeyboardAwareScrollView
          nestedScrollEnabled={true}
          ref={ref => (this.scrollViewRef = ref)}
          style={styles.container}
          enableOnAndroid
          keyboardShouldPersistTaps={"handled"}
          extraScrollHeight={Platform.OS == "ios" ? 10 : 50}
        >
          <View style={{ paddingHorizontal: 20, marginTop: 20, flex: 1 }}>
            {this.state.firstname !== null && (
              <TextField
                ref={this.firstnameRef}
                value={this.state.firstname}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={() => {
                  this.resetErr("firtNameErrorMessage", "firstNameException");
                }}
                onChangeText={value => {
                  this.selfInput("firstname", value);
                }}
                onSubmitEditing={value => {}}
                fontSize={12}
                textColor={"#434343"}
                tintColor={"#afafaf"}
                baseColor={"#afafaf"}
                label={
                  metaHelpers.findElement(NEW_PRPFILE, NEW_PRPFILE_FIRSTNAME)
                    .label
                }
                error={this.state.firtNameErrorMessage}
                labelTextStyle={styles.textFieldLabel}
              />
            )}
            {this.state.lastname !== null && (
              <TextField
                ref={this.firstnameRef}
                value={this.state.lastname}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={() => {
                  this.resetErr("lastNameErrorMessage", "lastNameException");
                }}
                onChangeText={value => {
                  this.selfInput("lastname", value);
                }}
                onSubmitEditing={value => {}}
                fontSize={12}
                textColor={"#434343"}
                tintColor={"#afafaf"}
                baseColor={"#afafaf"}
                label={
                  metaHelpers.findElement(NEW_PRPFILE, NEW_PRPFILE_LASTNAME)
                    .label
                }
                error={this.state.lastNameErrorMessage}
                labelTextStyle={styles.textFieldLabel}
              />
            )}
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 2.5, marginRight: 10 }}>
                <NewTextInput
                  placeholder={
                    metaHelpers.findElement(NEW_PRPFILE, NEW_PRPFILE_GENDER)
                      .label
                  }
                  DownArrow={true}
                  butonMode={true}
                  buttonModeAction={() => {
                    const { genderModalSelectedValue } = this.state;
                    if (!userProfile.gender) {
                      this.setState({
                        genderModal: true,
                        genderModalSelectedValue:
                          genderModalSelectedValue || "MALE",
                      });
                    }
                  }}
                  presetValue={
                    this.state.gender
                      ? metaHelpers.findElement(
                          SCREEN_KEY_PROFILE,
                          this.state.gender
                        ).label
                      : metaHelpers.findElement(
                          SCREEN_KEY_PROFILE,
                          KEY_NEW_SELECT
                        ).label
                  }
                  exception={false}
                  autoCorrect={false}
                  onChange={value => {}}
                  onSubmit={value => {}}
                  showTipOnFocus={true}
                  isEnabled={true}
                  isEditable={false}
                  inputRectStyle={styles.genderValueContainer}
                  profile={true}
                />
              </View>
              <View style={{ flex: 2, marginLeft: 10 }}>
                <NewTextInput
                  placeholder={
                    metaHelpers.findElement(
                      NEW_PRPFILE,
                      NEW_PRPFILE_DATEOFBIRTH
                    ).label
                  }
                  DownArrow={true}
                  butonMode={true}
                  buttonModeAction={() => {
                    this.setState({
                      showDatePickerModal: true,
                    });
                  }}
                  exception={false}
                  autoCorrect={false}
                  presetValue={dobStr}
                  onChange={value => {}}
                  onSubmit={value => {}}
                  isEnabled={true}
                  isEditable={false}
                  errorMessage={this.state.birthErrorMessage}
                  exception={this.state.birthException}
                  showTipOnFocus={true}
                  profile={true}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              <View style={{ flex: 2, marginRight: 24 }}>
                <NewTextInput
                  placeholder={
                    metaHelpers.findElement(
                      NEW_PRPFILE,
                      NEW_PRPFILE_COUNTRYCODE
                    ).label
                  }
                  DownArrow={false}
                  presetValue={`+${countryCommonMeta.isdCode}`}
                  inputRectStyle={{ color: "#A7A8AA" }}
                  exception={false}
                  autoCorrect={false}
                  onChange={value => {
                    // this.onEmailChange(value)
                  }}
                  onSubmit={value => {}}
                  showTipOnFocus={true}
                  isEnabled={true}
                  isEditable={false}
                  profile={true}
                />
              </View>
              <View style={{ flex: 3 }}>
                <NewTextInput
                  placeholder={
                    metaHelpers.findElement(
                      NEW_PRPFILE,
                      NEW_PRPFILE_PHONENUMBER
                    ).label
                  }
                  DownArrow={false}
                  exception={false}
                  autoCorrect={false}
                  errorMessage={this.state.phoneErrorMessage}
                  exception={this.state.phoneException}
                  keyboardType={"phone-pad"}
                  onChange={value => {
                    this.selfInput("phone", value);
                  }}
                  autoFocus={this.state.autoFocus}
                  onBlur={() => {
                    this.resetErr("phoneErrorMessage", "phoneException");
                  }}
                  onFocus={() => {
                    this.resetErr("phoneErrorMessage", "phoneException");
                  }}
                  inputRectStyle={{
                    color: userProfile.phone ? "#A7A8AA" : "#000000",
                  }}
                  isEditable={userProfile.phone ? false : true}
                  isEnabled={true}
                  presetValue={
                    userProfile.phone
                      ? userProfile.phone.replace(/\+855/, "")
                      : this.state.phone
                  }
                  showTipOnFocus={true}
                  profile={true}
                />
              </View>
            </View>

            <NewTextInput
              placeholder={
                metaHelpers.findElement(NEW_PRPFILE, NEW_PRPFILE_EMAIL).label
              }
              exception={false}
              autoCorrect={false}
              onChange={value => {
                this.selfInput("email", value);
              }}
              inputRectStyle={{ color: "#A7A8AA" }}
              isEnabled={false}
              presetValue={this.state.email}
              onSubmit={value => {}}
              showTipOnFocus={true}
              isEnabled={true}
              isEditable={emailNilOrEmpty}
              profile={true}
            />
            <NewTextInput
              placeholder={
                metaHelpers.findElement(
                  NEW_PRPFILE,
                  NEW_PRPFILE_CountryResidence
                ).label
              }
              exception={false}
              autoCorrect={false}
              inputRectStyle={{ color: "#A7A8AA" }}
              isEnabled={false}
              presetValue={
                metaHelpers.findCommon(countryCommonMeta.countryCode2).label
              }
              onSubmit={value => {}}
              showTipOnFocus={true}
              isEnabled={true}
              isEditable={false}
              profile={true}
            />
            {this.state.street !== null && (
              // <View style={{ position: "relative" }}>
              <AddressTextField
                ref={this.streetRef}
                presetValue={this.state.street}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onChange={value => {
                  this.selfInput("street", value);
                }}
                fontSize={12}
                textColor={"#434343"}
                tintColor={"#afafaf"}
                baseColor={"#afafaf"}
                placeholder={
                  metaHelpers.findElement(NEW_PRPFILE, NEW_PRPFILE_ADDRESS)
                    .label
                }
                labelTextStyle={styles.textFieldLabel}
                showAddressSuggestion={this.state.showAddressSuggestion}
                onAddressSuggestionPress={address => {
                  Keyboard.dismiss();
                  this.setState(() => ({
                    street: address,
                    showAddressSuggestion: false,
                  }));
                }}
                onBlur={()=>{
                  this.setState({
                    showAddressSuggestion: false
                  });
                }}
                onFocus={() => {
                  // scroll to end
                  this.scrollViewRef &&
                    this.scrollViewRef.scrollToEnd({ animated: true });
                    this.setState({
                      showAddressSuggestion: true
                    });
                }}
              />
            )}
            {this.state.zipcode !== null && (
              <NewTextInput
                ref={this.zipcodeRef}
                presetValue={this.state.zipcode}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={() => {
                  this.resetErr("postErrorMessage", "postException");
                }}
                onChange={value => {
                  this.selfInput("zipcode", value);
                }}
                onSubmitEditing={value => {}}
                fontSize={12}
                textColor={"#434343"}
                tintColor={"#afafaf"}
                baseColor={"#afafaf"}
                placeholder={
                  metaHelpers.findElement(NEW_PRPFILE, NEW_PRPFILE_POSTALCODE)
                    .label
                }
                error={this.state.postErrorMessage}
                labelTextStyle={styles.textFieldLabel}
              />
            )}
            {/* Agent refferal Button */}
            {/* <TouchableOpacity onPress={()=>{
              this.props.navigation.navigate("AgentReferralCode")
            }}>
              <Text>
                agentreferral code
              </Text>
            </TouchableOpacity> */}
            {this.props.auth.agentId !== undefined && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 40,
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text style={styles.existingCustomerText}>
                    {
                      metaHelpers.findElement(NEW_PRPFILE, AGENT_REFERRAL_CODE)
                        .label
                    }
                  </Text>
                </View>
                <TouchableOpacity
                  dataTestRef="agentReferralButton"
                  disabled={
                    this.props.auth.agentId &&
                    this.props.auth.agentId !== undefined
                      ? true
                      : false
                  }
                  style={[
                    styles.verifyBtn,
                    {
                      backgroundColor: this.props.auth.agentId
                        ? "rgb(229,125,131)"
                        : "#ED1B2E",
                    },
                  ]}
                  onPress={this.onSubmitreferralCode}
                >
                  <Text style={[styles.verifyText, { color: "#fff" }]}>
                    {this.props.auth.agentId
                      ? "Verified"
                      : metaHelpers.findElement(
                          TALKTOADOCTOR,
                          TALKTOADOCTOR_Verify
                        ).label}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={{ height: 40 }}></View>
          </View>
        </KeyboardAwareScrollView>

        {this.prepareDOBPickerModal()}
        {this.prepareGenderPickerModal()}
        {this.prepareCountryModal(countryList)}
        {this.prepareProfilePicSelectModal(selectfrom, camera, gallery)}
      </View>
    );
  }

  prepareCityListModal = cityList => {
    const Done = metaHelpers.findElement(SCREEN_KEY_PROFILE, EDIT_PROFILE_DONE)
      .label;

    return (
      <Modal
        visible={this.state.cityModal}
        transparent={true}
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.7)",
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
                <Text style={{ fontSize: 15, color: "#007AFF" }}>{Done}</Text>
              </TouchableOpacity>
            </View>

            <Picker
              selectedValue={this.state.city}
              style={{ height: 90, width: "100%" }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ city: itemValue })
              }
            >
              {cityList.map((item, inde) => {
                return <Picker.Item label={item} value={item} />;
              })}
            </Picker>
          </View>
        </View>
      </Modal>
    );
  };

  prepareGenderPickerModal = () => {
    const DONE = metaHelpers.findElement(SCREEN_KEY_PROFILE, EDIT_PROFILE_DONE)
      .label;
    return (
      <Modal
        visible={this.state.genderModal}
        transparent={true}
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
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
                height: window.height - 260,
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
                  this.setState({
                    genderModal: false,
                    gender: this.state.genderModalSelectedValue,
                  });
                }}
              >
                <Text style={{ fontSize: 15, color: "#007AFF" }}>{DONE}</Text>
              </TouchableOpacity>
            </View>

            <Picker
              selectedValue={this.state.genderModalSelectedValue}
              style={{ height: 90, width: "100%" }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ genderModalSelectedValue: itemValue })
              }
            >
              <Picker.Item
                label={
                  metaHelpers.findElement(
                    SCREEN_KEY_PROFILE,
                    SCREEN_KEY_PROFILE_MALE
                  ).label
                }
                value="MALE"
              />
              <Picker.Item
                label={
                  metaHelpers.findElement(
                    SCREEN_KEY_PROFILE,
                    SCREEN_KEY_PROFILE_FEMALE
                  ).label
                }
                value="FEMALE"
              />
            </Picker>
          </View>
        </View>
      </Modal>
    );
  };

  prepareDOBPickerModal = () => {
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
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.7)",
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
                  this.closeModal();
                  this.resetErr("birthErrorMessage", "birthException");
                }}
              >
                <Text style={{ fontSize: 15, color: "#007AFF" }}>Done</Text>
              </TouchableOpacity>
            </View>
            {
              <DatePicker
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

  prepareCountryModal = countryList => {
    return (
      <Modal
        visible={this.state.countryModal}
        transparent={true}
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.7)",
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
                    countryModal: false,
                  });
                }}
              >
                <Text style={{ fontSize: 15, color: "#007AFF" }}>Done</Text>
              </TouchableOpacity>
            </View>

            <Picker
              selectedValue={this.state.country}
              style={{ height: 90, width: "100%" }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ country: itemValue })
              }
            >
              {countryList.map((item, inde) => {
                return (
                  <Picker.Item
                    label={item.countryName}
                    value={item.countryCode}
                  />
                );
              })}
            </Picker>
          </View>
        </View>
      </Modal>
    );
  };

  prepareProfilePicSelectModal = (selectfrom, camera, gallery) => {
    return (
      <Modal visible={this.state.modalVisible}>
        <TouchableOpacity
          style={styles.profileModalContent}
          onPress={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View style={styles.modalStyle}>
            <Text style={styles.modalLabel}>{selectfrom}</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalLeftButton}
                onPress={e => {
                  e.preventDefault();
                  this.showCamera();
                }}
              >
                <View style={styles.link}>
                  <Icons name="camera" size={50} color="#ed1b2e" />
                </View>
                <Text style={styles.modalButtonLabel}>{camera}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalRightButton}
                onPress={e => {
                  e.preventDefault();
                  this.showGallery();
                }}
              >
                <View style={styles.link}>
                  <Icons name="photo" size={50} color="#ed1b2e" />
                </View>
                <Text style={styles.modalButtonLabel}>{gallery}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
}

NewProfile.propTypes = {
  numYearsToAdd: PropTypes.number,
};

const mapStateToProps = state => {
  return {
    dobErrorMessage: state.babylonAuth.dobErrorMessage,
    dobErr: state.babylonAuth.dobErr,
    showError: state.babylonAuth.showError,
    country: state.babylonAuth.country,
    countryList: state.meta.countryList,
    meta: state.meta,
    auth: state.auth,
    sessionId: state.auth.token,
    email: state.profile.email,
    userProfile: state.profile,
    updatingUser: state.profile.updatingUser,
    updateUser: state.profile.updateUser,
    profilePicture: state.documents.profilePicture,
    relationList: state.relationData.relationList,
    updateConnects: state.profile.updateConnects,
    relation: state.profile.relation,
    pastUserDetails: state.profile.pastUserDetails,
    formData: state.profile.formData,
    userPreferences: state.userPreferences,
    countryCommonMeta: state.meta.countryCommonMeta,
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
    language: pathOr("", ["userPreferences", "language"], state),
    languageList: state.meta.languageList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: () => ({
      context: pageKeys.ACCOUNT_SCREEN,
      type: CoreActionTypes.CHANGE_PASSWORD_RESET,
    }),
    resetProfileNotification: () => ({
      context: pageKeys.ACCOUNT_SCREEN,
      type: CoreActionTypes.RESET_UPDATE_NOTIFICATION,
    }),
    dispatchFeedbackReset,
    dispatch,
    dispatchEvent: payload => {
      dispatch({
        context: pageKeys.COMMON,
        type: CoreActionTypes.SEND_EVENT,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProfile);
