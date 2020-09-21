import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import { VC_GREEN_TICK } from "../../../../config/images";

import PropTypes from "prop-types";
import { pathOr } from "ramda";
import { metaFinderVaccinationCalendar } from "../../configs/meta-utils";
import {
  ELEMENT_KEY_DOSE,
  ELEMENT_KEY_DOSES,
} from "../../configs/metaConstant";

const DoseCompletedTile = ({ vaccine }) => {
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
      <Image style={styles.tickImage} source={VC_GREEN_TICK} />
    </View>
  );
};

DoseCompletedTile.propTypes = {
  vaccine: PropTypes.object,
};
export default DoseCompletedTile;
