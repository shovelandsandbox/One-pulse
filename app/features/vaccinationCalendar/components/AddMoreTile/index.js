import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import styles from "./styles";
import { VC_ADD_PROFILE } from "../../../../config/images";
import { metaFinderVaccinationCalendar } from "../../configs/meta-utils";
import { ELEMENT_KEY_ADD_MORE } from "../../configs/metaConstant";

import PropTypes from "prop-types";

const AddMore = ({ onSelect }) => {
  const addMore = metaFinderVaccinationCalendar(ELEMENT_KEY_ADD_MORE);
  return (
    <TouchableOpacity style={styles.boxContainer} onPress={() => onSelect()}>
      <Image source={VC_ADD_PROFILE} style={styles.addProfilePic} />
      <Text style={styles.addMoreText}>{addMore}</Text>
    </TouchableOpacity>
  );
};

AddMore.propTypes = {
  onSelect: PropTypes.func,
};
export default AddMore;
