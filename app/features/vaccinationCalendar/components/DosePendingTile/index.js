import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { VC_GREY_TICK, VC_GREY_BELL } from "../../../../config/images";

import PropTypes from "prop-types";
import { pathOr } from "ramda";
import { metaFinderVaccinationCalendar } from "../../configs/meta-utils";
import {
  ELEMENT_KEY_DOSE,
  ELEMENT_KEY_DOSES,
} from "../../configs/metaConstant";

const DosePendingTile = ({ vaccine, onBellPress, onTickPress }) => {
  const doseLabel = metaFinderVaccinationCalendar(ELEMENT_KEY_DOSE);
  const dosesLabel = metaFinderVaccinationCalendar(ELEMENT_KEY_DOSES);
  const doseValue = pathOr("", ["dosagePrescribed"], vaccine);
  const doseString = isNaN(doseValue)
    ? ""
    : doseValue < 2
    ? doseLabel
    : dosesLabel;
  return (
    <View style={styles.container}>
      {doseString ? (
        <Text style={styles.numberText}>
          {doseValue}
          <Text style={styles.descriptionText}> {doseString}</Text>
        </Text>
      ) : (
        <Text style={styles.numberText}>{doseValue}</Text>
      )}
      <View style={styles.imageView}>
        <TouchableOpacity
          onPress={() => {
            onTickPress(vaccine);
          }}
        >
          <Image style={styles.tickImage} source={VC_GREY_TICK} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onBellPress(vaccine);
          }}
        >
          <Image style={styles.tickImage} source={VC_GREY_BELL} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

DosePendingTile.propTypes = {
  vaccine: PropTypes.object,
  onBellPress: PropTypes.func,
  onTickPress: PropTypes.func,
};
export default DosePendingTile;
