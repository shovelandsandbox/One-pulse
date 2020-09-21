/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { PropTypes } from "prop-types";
import { isNil, isEmpty, pathOr, path } from "ramda";
import { styles } from "./style";
import DatePicker from "react-native-date-picker";
import moment from "moment";
// import NewTextInput from "../../../../components/NewTextInput";
import PruTextInput from "../../../../components/PruTextInput";
import theme from "../../../../themes/default";

import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import metaKeys from "../../screenMetaKeys";
import { CoreActionTypes, CoreUtils } from "@pru-rt-internal/pulse-common";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";
const { EVENT_TYPE_USER_ACTIVITY } = CoreActionTypes;
const { logFirebaseEvent, setScreen } = CoreUtils;

const DATE_FORMAT = "DD-MM-YYYY";
const DOB = "dob";

export default class CardDob extends PureComponent {
  constructor(props) {
    super(props);
    const { config, fieldValues } = props;
    const { fields } = config;
    const { model } = fields[DOB];
    const value = path(model.split("."), fieldValues);
    this.state = {
      datePickerModal: false,
      dob: value && moment(value, DATE_FORMAT).toDate(),
      pickerDob: value
        ? moment(value, DATE_FORMAT).toDate()
        : this.defaultDob(),
    };
  }

  onChange = (model, dob) => {
    this.setState({ [model]: dob, pickerDob: dob }, () => {
      this.props.onChange(model, this.getFormattedDob());
    });
  };

  getFormattedDob = () =>
    this.state.dob && moment(this.state.dob).format(DATE_FORMAT);

  minDate = pastYears =>
    moment()
      .subtract(pastYears, "y")
      .toDate();

  maxDate = () => {
    const minAgeRequired = pathOr(
      18,
      ["countryCommonMeta", "minimumAge"],
      this.props
    );
    return moment()
      .subtract(minAgeRequired, "y")
      .toDate();
  };

  defaultDob = () => {
    const minAgeRequired = pathOr(
      18,
      ["countryCommonMeta", "minimumAge"],
      this.props
    );
    return moment()
      .subtract(minAgeRequired, "y")
      .toDate();
  };

  onDatePickerDone = () => {
    const { config } = this.props;

    const { fields } = config;

    const { model } = fields[DOB];
    this.setState({ datePickerModal: false });
    this.onChange(model, this.state.pickerDob);
  };

  render() {
    const { config, fieldErrors, languageList = [], language } = this.props;
    const languageObj =
      languageList.find(
        element => element.languageCode === language.toUpperCase()
      ) || {};
    const locale = pathOr("en", ["locale"], languageObj);

    const { fields } = config;

    const { model } = fields[DOB];
    const error = path(model.split("."), fieldErrors);

    return (
      <View style={styles.cardContainer}>
        <View style={styles.subQuestionContainer}>
          <Text style={styles.yourNumberText}>
            {safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.dob.yourBirthday
            )}
          </Text>
          <Text style={{...styles.yourNumberDesc, ...configureLineHeight("16")}}>
            {safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.dob.qualifyProtection
            )}
          </Text>
        </View>
        <View style={styles.dobPlaceHolderContainer}>
          <PruTextInput
            txtInputStyle={{
              borderWidth: 1,
              borderColor: theme.Colors.greyd9dcde,
            }}
            placeholder={safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.dob.dob
            )}
            pointerEvents="none"
            title={safeMetaLabelFinder(metaKeys.screenName, metaKeys.dob.dob)}
            DownArrow={true}
            buttonModeAction={() => {
              this.setState({ datePickerModal: true });
            }}
            value={this.getFormattedDob()}
            messageType={!isNil(error) && !isEmpty(error) && "error"}
            message={error}
            editable={false}
            onFocus={() => this.props.resetErrors(model)}
            onContainerPress={() => {
              this.setState({ datePickerModal: true });
            }}
          />
          {/* <NewTextInput
            placeholder={safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.dob.dob
            )}
            DownArrow={true}
            butonMode={true}
            buttonModeAction={() => {
              this.setState({ datePickerModal: true });
            }}
            presetValue={this.getFormattedDob()}
            exception={!isNil(error) && !isEmpty(error)}
            errorMessage={error}
            autoCorrect={false}
            onFocus={() => this.props.resetErrors(model)}
            showTipOnFocus={true}
            isEnabled={true}
            isEditable={false}
            inputRectStyle={styles.genderValueContainer}
          /> */}
        </View>

        <Modal
          visible={this.state.datePickerModal}
          transparent={true}
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            margin: 0,
          }}
          onBackButtonPress={() => this.setState({ datePickerModal: false })}
          onBackdropPress={() => this.setState({ datePickerModal: false })}
        >
          <View style={styles.datePickerModalContainer}>
            <View style={styles.datePickerModalInnerContainer}>
              <View style={styles.doneContainer}>
                <TouchableOpacity
                  style={{ height: 44, justifyContent: "center" }}
                  onPress={this.onDatePickerDone}
                >
                  <Text style={{ fontSize: 15, color: "#007AFF" }}>
                    {safeMetaLabelFinder(
                      metaKeys.screenName,
                      metaKeys.dob.done
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
              <DatePicker
                mode={"date"}
                date={this.state.pickerDob}
                minimumDate={this.minDate(150)}
                maximumDate={this.maxDate()}
                onDateChange={newVal => this.onChange(model, newVal)}
                locale={locale}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

CardDob.propTypes = {
  config: PropTypes.object,
  fieldErrors: PropTypes.object,
  fieldValues: PropTypes.object,
  onChange: PropTypes.func,
  resetErrors: PropTypes.func,
  language: PropTypes.string,
  languageList: PropTypes.array,
};
