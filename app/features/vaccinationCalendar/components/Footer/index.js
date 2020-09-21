import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import styles from "./styles";
import { VC_RINGING_BELL } from "../../../../config/images";
import PropTypes from "prop-types";
import { metaFinderVaccinationCalendar } from "../../configs/meta-utils";
import {
  ELEMENT_KEY_NEXT_VACCINATION_DUE_ON,
  ELEMENT_KEY_SET_MULTIPLE_REMINDER,
} from "../../configs/metaConstant";

const Footer = ({ nextDate, vaccine, onReminderPress }) => {
  const nextVaccination = metaFinderVaccinationCalendar(
    ELEMENT_KEY_NEXT_VACCINATION_DUE_ON
  );
  const setMultipleReminderText = metaFinderVaccinationCalendar(
    ELEMENT_KEY_SET_MULTIPLE_REMINDER
  );
  return (
    <View style={styles.container}>
      <View style={styles.dateView}>
        <Text style={styles.dateText}>{nextVaccination}</Text>
        {nextDate && vaccine ? (
          <Text style={styles.dateText}>
            {" "}
            {nextDate}
            <Text style={styles.VaccineText}> {vaccine}</Text>
          </Text>
        ) : (
          <Text style={[styles.VaccineText, { textAlign: "center" }]}> --</Text>
        )}
      </View>
      {/* <TouchableOpacity
        style={styles.reminderView}
        onPress={() => {
          onReminderPress();
        }}
      >
        <Image style={styles.reminderImage} source={VC_RINGING_BELL} />
        <Text style={styles.reminderText}>{setMultipleReminderText}</Text>
      </TouchableOpacity> */}
    </View>
  );
};

Footer.propTypes = {
  nextDate: PropTypes.string,
  vaccine: PropTypes.string,
  onReminderPress: PropTypes.func,
};
export default Footer;
