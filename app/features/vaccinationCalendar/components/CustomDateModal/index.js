import React from "react";
import { Modal, Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { pathOr } from "ramda";
import moment from "moment";
import DatePicker from "react-native-date-picker";
import styles from "./styles";

const CustomDateModal = ({
  languageList = [],
  language,
  onDonePress,
  dobModalSelectedValue,
  onDateChange,
  showModal,
  maxYear = 0,
  minYear = 0,
}) => {
  const languageObj =
    languageList.find(
      element => element.languageCode === language.toUpperCase()
    ) || {};
  const locale = pathOr("en", ["locale"], languageObj);
  const minDate = pastYears =>
    moment()
      .add(0 - pastYears, "y")
      .toDate();

  const maxDate = maxYear =>
    moment()
      .add(maxYear, "y")
      .toDate();
  const doneLabel = "Done";
  return (
    <Modal visible={showModal} transparent={true} style={styles.container}>
      <View style={styles.contentView}>
        <View style={styles.datePickerView}>
          <View style={styles.doneView}>
            <TouchableOpacity
              style={styles.doneTextView}
              onPress={() => {
                onDonePress();
              }}
            >
              <Text style={styles.doneText}>{doneLabel}</Text>
            </TouchableOpacity>
          </View>
          {
            <DatePicker
              mode="date"
              minimumDate={minDate(minYear)}
              maximumDate={maxDate(maxYear)}
              date={dobModalSelectedValue}
              onDateChange={date => {
                onDateChange(date);
              }}
              locale={locale}
            />
          }
        </View>
      </View>
    </Modal>
  );
};

CustomDateModal.propTypes = {
  showModal: PropTypes.bool,
  languageList: PropTypes.array,
  language: PropTypes.string,
  onDonePress: PropTypes.func,
  onDateChange: PropTypes.func,
  dobModalSelectedValue: PropTypes.object,
  maxYear: PropTypes.number,
  minYear: PropTypes.number,
};

export default CustomDateModal;
