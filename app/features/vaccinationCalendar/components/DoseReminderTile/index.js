/* eslint-disable complexity */
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import moment from "moment";
import styles from "./styles";
import {
  VC_GREY_TICK,
  VC_RINGING_BELL,
  VC_WHITE_TICK,
  VC_RED_RINGING_BELL,
} from "../../../../config/images";

import PropTypes from "prop-types";
import { pathOr } from "ramda";
import { metaFinderVaccinationCalendar } from "../../configs/meta-utils";
import {
  ELEMENT_KEY_DOSE,
  ELEMENT_KEY_DOSES,
} from "../../configs/metaConstant";

const DoseReminderTile = ({
  vaccine,
  isCurrentDate,
  onBellPress,
  onTickPress,
}) => {
  const doseLabel = metaFinderVaccinationCalendar(ELEMENT_KEY_DOSE);
  const dosesLabel = metaFinderVaccinationCalendar(ELEMENT_KEY_DOSES);
  const doseValue = pathOr("", ["dosagePrescribed"], vaccine);
  const plannedDate = pathOr("", ["plannedDate"], vaccine);
  const doseString = isNaN(doseValue)
    ? ""
    : doseValue < 2
    ? doseLabel
    : dosesLabel;
  const date = moment(plannedDate).format("DD MMMM");
  return (
    <View
      style={[styles.container, !isCurrentDate ? styles.whiteContainer : {}]}
    >
      <View style={styles.contentView}>
        {doseString ? (
          <Text
            style={[
              styles.numberText,
              isCurrentDate ? styles.whiteDoseText : {},
            ]}
          >
            {doseValue}
            <Text
              style={[
                styles.descriptionText,
                isCurrentDate ? styles.whiteDoseText : {},
              ]}
            >
              {" "}
              {doseString}
            </Text>
          </Text>
        ) : (
          <Text
            style={[
              styles.numberText,
              isCurrentDate ? styles.whiteDoseText : {},
            ]}
          >
            {doseValue}
          </Text>
        )}
        <View style={styles.imageView}>
          <TouchableOpacity
            onPress={() => {
              onTickPress(vaccine);
            }}
          >
            <Image
              style={styles.tickImage}
              source={isCurrentDate ? VC_WHITE_TICK : VC_GREY_TICK}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onBellPress(vaccine);
            }}
          >
            <Image
              style={styles.tickImage}
              source={isCurrentDate ? VC_RINGING_BELL : VC_RED_RINGING_BELL}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[styles.dateView, !isCurrentDate ? styles.greyDateView : {}]}
      >
        <Text
          style={[styles.dateText, !isCurrentDate ? styles.blackDateText : {}]}
        >
          {date}
        </Text>
      </View>
    </View>
  );
};

DoseReminderTile.propTypes = {
  vaccine: PropTypes.object,
  isCurrentDate: PropTypes.bool,
  onBellPress: PropTypes.func,
  onTickPress: PropTypes.func,
};
export default DoseReminderTile;
