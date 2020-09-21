import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import styles from "./styles";
import { VC_DOWN_ARROW_WHITE, VC_DOWNLOAD } from "../../../../config/images";
import PropTypes from "prop-types";
import { metaFinderVaccinationCalendar } from "../../configs/meta-utils";
import {
  ELEMENT_KEY_DOWNLOAD_CHART,
  ELEMENT_KEY_SELECT_CHILD,
} from "../../configs/metaConstant";

const UserDropDown = ({
  selectedValue,
  profileData,
  onProfileSelect,
  onDownloadPress,
}) => {
  let dropDownRef = null;
  const downloadText = metaFinderVaccinationCalendar(
    ELEMENT_KEY_DOWNLOAD_CHART
  );
  const selectChildText = metaFinderVaccinationCalendar(
    ELEMENT_KEY_SELECT_CHILD
  );
  const dropDownOptions = profileData.map(x => x.name);
  return (
    <View style={styles.container}>
      <View style={styles.dropDownView}>
        <Text style={styles.dropDownTitle}>{selectChildText}</Text>
        <TouchableOpacity
          onPress={() => {
            if (dropDownRef) dropDownRef.show();
          }}
          style={styles.dropDownTouchableView}
        >
          <ModalDropdown
            ref={ref => {
              dropDownRef = ref;
            }}
            textStyle={styles.dropDownText}
            defaultValue={selectedValue}
            dropdownStyle={
              profileData.length > 1
                ? styles.extendedDropdownStyle
                : styles.dropDownStyle
            }
            style={styles.dropDownContainer}
            options={dropDownOptions}
            onSelect={index => {
              onProfileSelect(profileData[index]);
            }}
            showsVerticalScrollIndicator={false}
          />
          <Image style={styles.dropDownImage} source={VC_DOWN_ARROW_WHITE} />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        style={styles.dropDownView}
        onPress={() => {
          onDownloadPress();
        }}
      >
        <Image style={styles.downloadImage} source={VC_DOWNLOAD} />
        <Text style={styles.downloadText}>{downloadText}</Text>
      </TouchableOpacity> */}
    </View>
  );
};

UserDropDown.propTypes = {
  selectedValue: PropTypes.string,
  profileData: PropTypes.array,
  onProfileSelect: PropTypes.func,
  onDownloadPress: PropTypes.func,
};
export default UserDropDown;
