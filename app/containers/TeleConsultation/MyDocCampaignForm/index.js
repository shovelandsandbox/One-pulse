import React, { PureComponent } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Modal,
  TouchableWithoutFeedback,
  Picker,
  Dimensions,
  Keyboard,
} from "react-native";

import { metaHelpers } from "@pru-rt-internal/pulse-common";
import { PruBackHeader, CustomAlert } from "../../../components";
import { connect } from "react-redux";
import styles from "./styles";
import MetaConstants from "./meta";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { REWARDS_BACKGROUND } from "../../../config/images";
import { Theme } from "../../../themes";
const { Styles, Colors } = Theme;
import { TextField } from "react-native-material-textfield";
import NewTextInput from "../../../components/NewTextInput";
import {
  updateProfileInReducer,
  updateCustomerDetails,
} from "../../../actions/apis";
const window = Dimensions.get("window");
import { CoreComponents, CoreConfig } from "@pru-rt-internal/pulse-common";
import { pathOr, path, isEmpty, isNil } from "ramda";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { gotoBabylonWizardCongrats } from "../../../actions";
const { AppButton } = CoreComponents;
const DOB_DISPLAY_FORMAT = "DD-MM-YYYY";
import PropTypes from "prop-types";
import AddressTextField from "../../../components/AddressTextField";

const {
  NEW_PRPFILE,
  NEW_PRPFILE_PHONENUMBER,
  NEW_PRPFILE_PHONENUMBERERROR,
  NEW_PRPFILE_COUNTRYCODE,
} = CoreConfig;

class MyDocCampaignForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      genderModal: false,
      genderModalSelectedValue: props.gender,
      dobModal: false,
      dobModalSelectedValue: this.defaultDob(),
      phoneNumber: props.phoneNumber,
      nationalId: props.nationalId,
      address: props.address,
      phoneNumberError: null,
    };
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    this.props.getWizardSteps();
  }

  defaultDob = () =>
    moment()
      .add(0 - this.props.minAgeRequired, "y")
      .toDate();

  render() {
    return (
      <SafeAreaView style={styles.screenContainer}>
        {this.renderBackHeader()}
        <ScrollView style={styles.scrollContainer}>
          {this.renderOfferDetails()}
          {this.renderForm()}
          {this.renderContinue()}
        </ScrollView>
        {this.prepareGenderPickerModal()}
        {this.prepareDOBPickerModal()}
      </SafeAreaView>
    );
  }

  renderContinue = () => {
    const { mydocWizContinue } = this.metaConstants;
    return (
      <View style={styles.buttonContainer}>
        <AppButton
          title={mydocWizContinue}
          press={this.pressedContinue}
          type={[Styles.btn, Styles.primary]}
          textStyle={{}}
        />
      </View>
    );
  };

  pressedContinue = () => {
    const {
      countryCode,
      dispatchAction,
      gotoBabylonWizardCongrats,
      gotoMydocWizardDetails,
      nationalId,
    } = this.props;

    const { error, fillFields } = this.metaConstants;

    if (this.validate()) {
      this.updateProfile();
      if (countryCode === "VN") {
        gotoBabylonWizardCongrats();
        return;
      }
      if (countryCode === "MY") {
        gotoBabylonWizardCongrats();
        dispatchAction({ NRICID: nationalId });
        return;
      }
      gotoMydocWizardDetails();
    } else {
      CustomAlert.show(error, fillFields);
    }
  };

  isValidPhone = phone => {
    const {
      countryPhoneRegex,
      countryZipCodeRegex,
    } = this.props.countryCommonMeta;
    const regex = new RegExp(countryPhoneRegex);
    if (!regex.test(phone)) {
      this.setState({
        phoneNumberError: metaHelpers.findErrorMessage(
          metaHelpers.findElement(NEW_PRPFILE, NEW_PRPFILE_PHONENUMBER),
          NEW_PRPFILE_PHONENUMBERERROR
        ).message,
      });
      return false;
    } else {
      this.setState({
        phoneNumberError: null,
      });
    }
    return true;
  };

  validate = () => {
    const {
      dobModalSelectedValue,
      genderModalSelectedValue,
      nationalId,
      phoneNumber,
      address,
    } = this.state;
    const { countryCode } = this.props;

    if (
      isNil(phoneNumber) ||
      !this.isValidPhone(phoneNumber) ||
      (countryCode === "MY" && isNil(nationalId)) ||
      isNil(genderModalSelectedValue) ||
      isNil(dobModalSelectedValue) ||
      isNil(address)
    ) {
      return false;
    }

    return true;
  };

  renderBackHeader = () => {
    const { mydocWizTitle } = this.metaConstants;
    return (
      <View style={styles.backContainer}>
        <PruBackHeader title={mydocWizTitle}></PruBackHeader>
      </View>
    );
  };

  getGenderPreset = () => {
    if (this.state.genderModalSelectedValue === "MALE") {
      return this.metaConstants.male;
    } else if (this.state.genderModalSelectedValue === "FEMALE") {
      return this.metaConstants.female;
    }
  };

  renderForm = () => {
    const dobStr = moment(
      this.state.dobModalSelectedValue,
      DOB_DISPLAY_FORMAT
    ).format(DOB_DISPLAY_FORMAT);
    const { wizardSteps } = this.props;
    const {
      phoneNumber,
      nric,
      yourGender,
      yourdob,
      address,
    } = this.metaConstants;
    console.log(wizardSteps);
    return (
      <View style={styles.formContainer}>
        {isNil(this.props.phoneNumber) && wizardSteps["phoneScreen"] ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 0.3, marginRight: 24, marginTop: 22 }}>
              <NewTextInput
                placeholder={
                  metaHelpers.findElement(NEW_PRPFILE, NEW_PRPFILE_COUNTRYCODE)
                    .label
                }
                DownArrow={false}
                presetValue={`+${this.props.countryCommonMeta.isdCode}`}
                inputRectStyle={{ color: "#afafaf" }}
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
            <View style={{ flex: 0.7 }}>
              <TextField
                ref={this.phoneNumberRef}
                value={this.state.phoneNumber}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={() => {}}
                onChangeText={value => {
                  this.setState({ phoneNumber: value });
                  this.isValidPhone(value);
                }}
                onSubmitEditing={value => {}}
                fontSize={12}
                textColor={"#434343"}
                tintColor={"#afafaf"}
                baseColor={"#afafaf"}
                label={phoneNumber}
                error={this.state.phoneNumberError}
                labelTextStyle={styles.textFieldLabel}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        ) : null}
        {this.props.countryCode === "MY" &&
        isNil(this.props.nationalId) &&
        wizardSteps["nationalIdScreen"] ? (
          <TextField
            ref={this.nationalId}
            value={this.state.nationalId}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={() => {}}
            onChangeText={value => {
              this.setState({ nationalId: value });
            }}
            onSubmitEditing={value => {}}
            fontSize={12}
            textColor={"#434343"}
            tintColor={"#afafaf"}
            baseColor={"#afafaf"}
            label={nric}
            error={this.state.firtNameErrorMessage}
            labelTextStyle={styles.textFieldLabel}
            keyboardType="phone-pad"
          />
        ) : null}
        {isNil(this.props.gender) && wizardSteps["genderScreen"] ? (
          <NewTextInput
            placeholder={yourGender}
            DownArrow={true}
            butonMode={true}
            buttonModeAction={() => {
              const { genderModalSelectedValue } = this.state;
              this.setState({
                genderModal: true,
                genderModalSelectedValue,
              });
            }}
            presetValue={this.getGenderPreset()}
            exception={false}
            autoCorrect={false}
            onChange={value => {}}
            onSubmit={value => {}}
            showTipOnFocus={true}
            isEnabled={true}
            isEditable={false}
            inputRectStyle={{}}
            profile={true}
          />
        ) : null}
        {isNil(this.props.dob) && wizardSteps["birthdateScreen"] ? (
          <NewTextInput
            placeholder={yourdob}
            DownArrow={true}
            butonMode={true}
            buttonModeAction={() => {
              const { dobModalSelectedValue } = this.state;
              this.setState({
                dobModal: true,
                dobModalSelectedValue,
              });
            }}
            presetValue={dobStr}
            exception={false}
            autoCorrect={false}
            onChange={value => {}}
            onSubmit={value => {}}
            showTipOnFocus={true}
            isEnabled={true}
            isEditable={false}
            inputRectStyle={{}}
            profile={true}
          />
        ) : null}
        {isNil(this.props.address) && wizardSteps["addressScreen"] ? (
          <AddressTextField
            ref={this.streetRef}
            presetValue={this.state.address}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onChange={value => {
              this.setState({ address: value });
            }}
            fontSize={12}
            textColor={"#434343"}
            tintColor={"#afafaf"}
            baseColor={"#afafaf"}
            placeholder={address}
            labelTextStyle={styles.textFieldLabel}
            showAddressSuggestion={true}
            onAddressSuggestionPress={value => {
              Keyboard.dismiss();
              this.setState({
                address: value,
                showAddressSuggestion: false,
              });
            }}
          />
        ) : null}
      </View>
    );
  };

  renderOfferDetails = () => {
    const { offerDescription, offerTerms } = this.metaConstants;
    return (
      <ImageBackground
        style={styles.offerContainer}
        source={REWARDS_BACKGROUND}
      >
        <View>
          <Text
            style={[
              styles.textBold,
              styles.textAlignCenter,
              { paddingBottom: 10, color: Colors.pulseRed },
            ]}
          >
            {offerDescription}
          </Text>
          {offerTerms.map(termItem => {
            return (
              <View style={{ flexDirection: "row", paddingHorizontal: 15 }}>
                <MaterialIcons
                  style={{}}
                  pointerEvents="none"
                  name="check"
                  size={18}
                  color={Colors.black}
                />
                <Text>{termItem}</Text>
              </View>
            );
          })}
        </View>
      </ImageBackground>
    );
  };

  prepareDOBPickerModal = () => {
    const { languageList = [], language } = this.props;
    const languageObj =
      languageList.find(
        element => element.languageCode === language.toUpperCase()
      ) || {};
    const locale = pathOr("en", ["locale"], languageObj);
    const minDate = pastYears =>
      moment()
        .add(0 - pastYears, "y")
        .toDate();

    const maxDate = () =>
      moment()
        .add(0, "y")
        .toDate();
    return (
      <Modal
        visible={this.state.dobModal}
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
                  this.setState({ dobModal: false });
                }}
              >
                <Text style={{ fontSize: 15, color: "#007AFF" }}>Done</Text>
              </TouchableOpacity>
            </View>
            {
              <DatePicker
                mode="date"
                minimumDate={minDate(100)}
                maximumDate={maxDate()}
                date={this.state.dobModalSelectedValue}
                onDateChange={date => {
                  this.setState({ dobModalSelectedValue: date });
                }}
                locale={locale}
              />
            }
          </View>
        </View>
      </Modal>
    );
  };

  prepareGenderPickerModal = () => {
    const DONE = "Done";
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
                    genderModalSelectedValue:
                      this.state.genderModalSelectedValue || "MALE",
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
              <Picker.Item label={this.metaConstants.male} value={"MALE"} />
              <Picker.Item label={this.metaConstants.female} value={"FEMALE"} />
            </Picker>
          </View>
        </View>
      </Modal>
    );
  };

  updateProfile = () => {
    const dobStr = moment(
      this.state.dobModalSelectedValue,
      DOB_DISPLAY_FORMAT
    ).format(DOB_DISPLAY_FORMAT);
    this.props.updateProfileInReducer(
      "gender",
      this.state.genderModalSelectedValue
    );
    this.props.updateProfileInReducer("dob", dobStr);
    this.props.updateProfileInReducer("phone", this.state.phoneNumber);
    this.props.updateProfileInReducer(
      "externalIds.NATIONAL_ID",
      this.state.nationalId
    );
    this.props.updateProfileInReducer("address1", this.state.address);
    this.props.updateCustomerDetails();
  };
}

MyDocCampaignForm.propTypes = {
  language: PropTypes.string,
  languageList: PropTypes.array,
};

const mapStateToProps = state => {
  const wizardSteps = pathOr(
    [],
    ["wizardData", "pruWizardSteps", "cards"],
    state
  );
  return {
    dob: state.profile.dob,
    gender: state.profile.gender,
    nationalId: path(["profile", "externalIds", "NATIONAL_ID"], state),
    phoneNumber: state.profile.phone,
    countryCode: state.profile.countryCode,
    address: state.profile.address1,
    language: pathOr("", ["userPreferences", "language"], state),
    languageList: state.meta.languageList,
    minAgeRequired: pathOr(
      18,
      ["meta", "countryCommonMeta", "minimumAge"],
      state
    ),
    wizardSteps,
    countryCommonMeta: state.meta.countryCommonMeta,
  };
};

const mapDispatchToProps = {
  gotoBabylonWizardCongrats,
  updateProfileInReducer,
  updateCustomerDetails,
  dispatchAction: payload => ({
    context: "doc/DOC_REGISTRATION_SCREEN",
    type: "doc/DOC_NRIC",
    payload,
  }),
  getWizardSteps: () => ({
    context: "EmailRegister",
    type: "GET_PRU_WIZARD_ID",
    payload: {
      noNavigation: true,
    },
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDocCampaignForm);
