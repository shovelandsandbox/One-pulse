import React, { PureComponent } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import {
  colors,
  CoreActionTypes,
  CoreComponents,
  CoreConfig,
  events
} from "@pru-rt-internal/pulse-common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { AppButton } = CoreComponents;
const { pageKeys } = CoreConfig;
const {
  DOC_SERVICE_UPDATE_EMERGENCY_INFO,
  DOC_SERVICE_LOAD_PRE_CONSULTATION_QUESTIONS
} = CoreActionTypes;
import styles from "../EmergencyQuestions/styles";
import { Theme } from "../../../themes";
const { Styles } = Theme;
import { isEmpty, pickBy, values } from "ramda";
import moment from "moment";
import localStyles from "./styles";
import MetaConstants from "./meta";
import { dispatchEvent } from "../../../actions";

class MedicalProfile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contactName: "",
      contactNumber: "",
      contactId: null,
      attributes: "",
      medicalHistory: "",
      error: {
        contactNumber: false,
        contactName: false,
        allergies: false,
        attributes: false,
        medicalHistory: false,
      },
      allergies: "",
    };
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    this.props.resetPaymentStatus();
    if (this.props.emergencyQuestionResponseReceived) {
      this.setState({
        allergies: this.props.allergies.join(),
        contactName: this.props.emergencyContactName,
        contactNumber: this.props.emergencyContactPhone,
        contactId: this.props.emergencyContactId,
        attributes: this.props.attributes || "",
        medicalHistory:
          this.props.medicalHistory instanceof Array
            ? this.props.medicalHistory.join()
            : this.props.medicalHistory,
      });
    };
    this.props.loadPreConsultationQuestions();
    this.props.dispatchEvent(events.MyDocMedicalProfileScreen)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userLanguagePreference !== nextProps.userLanguagePreference) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }

  // eslint-disable-next-line complexity
  render() {
    const {
      contactName,
      contactNumber,
      attributes,
      medicalHistory,
      allergies,
    } = this.state;
    const { countryCommonMeta } = this.props;

    return (
      <SafeAreaView
        style={{
          backgroundColor: "#ffffff",
          flex: 1,
        }}>
        <KeyboardAwareScrollView
          enableOnAndroid
          extraScrollHeight={Platform.OS === "ios" ? 10 : -52}>
          <View style={localStyles.medicalProfileHeader}>
            <Text style={localStyles.medicalProfileHeaderText}>
              {this.metaConstants.medProfileTitleLabel}
            </Text>
            <View style={localStyles.allergyPadding}>
              <Text style={styles.labelTitle}>{this.metaConstants.medProfileAllergiesLabel}</Text>
              <TextInput
                onBlur={this.handleBlur}
                style={[
                  styles.inputBox,
                  {
                    borderColor: this.state.error.allergies
                      ? colors.red
                      : "#BDBDBD",
                    textAlignVertical: "top",
                  },
                ]}
                multiline={true}
                numberOfLines={4}
                onChangeText={allergies => this.setState({ allergies })}
                placeholder={this.metaConstants.medProfileNoAllergiesLabel}
                value={this.state.allergies}
              />
              <Text style={styles.labelTitle}>{this.metaConstants.medProfileMedConditionsLabel}</Text>
              <TextInput
                onBlur={this.handleBlur}
                style={[
                  styles.inputBox,
                  {
                    borderColor: this.state.error.medicalHistory
                      ? colors.red
                      : "#BDBDBD",
                    textAlignVertical: "top",
                  },
                ]}
                multiline={true}
                numberOfLines={4}
                onChangeText={medicalHistory =>
                  this.setState({ medicalHistory })
                }
                placeholder={this.metaConstants.medProfileNoMedConditionsLabel}
                value={medicalHistory || null} />
              <Text style={styles.labelTitle}>{this.metaConstants.medProfileMedicationsLabel}</Text>
              <TextInput
                onBlur={this.handleBlur}
                style={[
                  styles.inputBox,
                  {
                    borderColor: this.state.error.attributes
                      ? colors.red
                      : "#BDBDBD",
                  },
                ]}
                onChangeText={text => this.setState({ attributes: text })}
                value={attributes || null}
                placeholder={this.metaConstants.medProfileNoMedicationsLabel} />
              <Text style={styles.labelTitle}>{this.metaConstants.medProfileEmergencyContactLabel}</Text>
              <TextInput
                onBlur={this.handleBlur}
                style={[
                  styles.inputBox,
                  {
                    borderColor: this.state.error.contactName
                      ? colors.red
                      : "#BDBDBD",
                  },
                ]}
                onChangeText={text => this.setState({ contactName: text })}
                value={this.state.contactName}
                placeholder={this.metaConstants.medProfileEmergencyContactNamePlaceLabel} />
              {this.state.error.contactName ? (
                <Text style={styles.errorMsg}>
                  {this.state.error.contactName}
                </Text>
              ) : null}
              <Text style={styles.labelTitle}>
                {this.metaConstants.medProfileEmergencyContactNumberLabel}
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  borderWidth: 1,
                  paddingLeft: 10,
                  borderColor: this.state.error.contactNumber
                    ? colors.red
                    : "#BDBDBD",
                }}>
                <Text
                  style={[
                    styles.inputBox,
                    {
                      borderWidth: 0,
                      width: "auto",
                      paddingHorizontal: 0,
                      paddingLeft: 0,
                    },
                  ]}>
                  {`+${countryCommonMeta.isdCode}`}
                </Text>
                <TextInput
                  onBlur={this.handleBlur}
                  style={[
                    styles.inputBox,
                    { borderWidth: 0, width: "80%", paddingHorizontal: 0 },
                  ]}
                  keyboardType="phone-pad"
                  onChangeText={text => this.setState({ contactNumber: text })}
                  value={this.state.contactNumber} />
              </View>
              {this.state.error.contactNumber ? (
                <Text style={styles.errorMsg}>
                  {this.state.error.contactNumber}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={{ height: 40 }}></View>
        </KeyboardAwareScrollView>
        <View style={localStyles.proceedButton}>
          <AppButton
            type={[
              Styles.btn,
              Styles.primary,
              {
                fontSize: 20,
                fontWeight: "900",
                borderRadius: 20,
              },
            ]}
            disable={
              !(
                contactName &&
                contactNumber &&
                attributes &&
                medicalHistory &&
                allergies
              )
            }
            title={this.metaConstants.medProfileProceedLabel}
            press={this.validate} />
        </View>
      </SafeAreaView>
    );
  }

  validate = () => {
    const {
      contactName,
      contactNumber,
      allergies,
      attributes,
      medicalHistory,
    } = this.state;

    const { userNumber, countryCommonMeta } = this.props;

    const valueErrs = {
      contactName:
        isEmpty(contactName)
          ? this.metaConstants.medProfileEnterValidNameLabel
          : false,
      contactNumber:
        isEmpty(contactNumber) || !contactNumber.match(/^[1-9](\d{7,10})$/)
          ? this.metaConstants.medProfileEnterValidPhoneLabel
          : userNumber &&
            userNumber.substring(2, userNumber.length) === contactNumber
            ? this.metaConstants.medProfileEnterNumberDiffThanProfileLabel
            : false,
      allergies: isEmpty(allergies),
      attributes: isEmpty(attributes),
      medicalHistory: isEmpty(medicalHistory),
    };
    this.props.dispatchEvent(events.MyDocMedicalProfileOnProceedClick)
    this.setState(
      {
        error: valueErrs,
      },
      () => {
        const errorFields = pickBy(val => val, this.state.error);
        if (!(values(errorFields).length > 0)) {
          this.startConsultation();
        }
      }
    );
  };

  getNextSlot = () => {
    const roundedUpTime =
      Math.ceil(
        moment()
          .add(15, "minutes")
          .minute() / 15
      ) * 15;
    if (roundedUpTime === 15 && moment().minute() !== 0) {
      return moment()
        .minute(roundedUpTime)
        .second(0)
        .add("1", "hour");
    }
    return moment()
      .minute(roundedUpTime)
      .second(0);
  };

  startConsultation = () => {
    const {
      contactId,
      contactName,
      contactNumber,
      allergies,
      attributes,
      medicalHistory,
    } = this.state;

    const medicalHistoryArray = [medicalHistory];
    const appointmentDate = this.getNextSlot().format("YYYY-MM-DD HH:mm:ss");
    const payload = {
      contactId,
      contactName,
      contactNumber,
      allergies: [allergies],
      attributes,
      medicalHistory: medicalHistoryArray,
    }
    this.props.updateEmergencyInfo(payload);
    this.props.setAppointmentDate(appointmentDate);
    this.props.clearSelectedDoctor();
  };
}

const mapStateToProps = state => {
  return {
    meta: state.meta,
    error: state.doctorServices.error,
    allergies: state.doctorServices.emergencyInfo.allergies,
    attributes: state.doctorServices.emergencyInfo.attributes,
    medicalHistory: state.doctorServices.emergencyInfo.medicalHistory,
    emergencyQuestions: state.doctorServices.emergencyQuestions,
    emergencyContactId: state.doctorServices.emergencyInfo.contactInfo.id,
    emergencyContactPhone: state.doctorServices.emergencyInfo.contactInfo.phone,
    emergencyContactName:
      (state.doctorServices.emergencyInfo.contactInfo.firstName
        ? state.doctorServices.emergencyInfo.contactInfo.firstName
        : "") +
      " " +
      (state.doctorServices.emergencyInfo.contactInfo.middleName
        ? state.doctorServices.emergencyInfo.contactInfo.middleName
        : ""),
    emergencyQuestionResponseReceived:
      state.doctorServices.emergencyQuestionResponseReceived,
    userNumber: state.profile.phone,
    userLanguagePreference: state.userPreferences.language,
    countryCommonMeta: state.meta.countryCommonMeta,
  };
};

export default connect(mapStateToProps, {
  dispatchEvent,
  resetPaymentStatus: () => ({
    type: CoreActionTypes.DOC_SERVICE_RESET_PAYMENT_STATUS,
  }),
  updateEmergencyInfo: (payload) => ({
    context: pageKeys.DOC_SERVICE_EMERGENCY_QUESTIONS,
    type: DOC_SERVICE_UPDATE_EMERGENCY_INFO,
    payload: {
      ...payload
    }
  }),
  setAppointmentDate: (appointmentDate) => ({
    type: CoreActionTypes.SET_APPOINTMENT_DATE,
    payload: {
      appointmentDate,
      now: true,
    },
  }),
  clearSelectedDoctor: () => ({
    type: CoreActionTypes.DOC_SERVICE_SELECTED_DOCTOR,
    payload: {
      doctorName: "",
      doctorId: "",
    },
  }),
  loadPreConsultationQuestions: () => ({
    context: pageKeys.DOC_SERVICE_PAYMENT,
    type: DOC_SERVICE_LOAD_PRE_CONSULTATION_QUESTIONS
  }),
})(MedicalProfile);
