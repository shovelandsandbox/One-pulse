import React from "react";
import {
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { PruBackHeader } from "../../../components";
import UserDropDown from "../components/UserDropDown";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import PropTypes from "prop-types";
import { BACK, VC_BANNER } from "../../../config/images";
import { metaFinderVaccinationCalendar } from "../configs/meta-utils";
import { ELEMENT_KEY_VACCINATION_SCHEDULE } from "../configs/metaConstant";

const HeaderWithImage = ({
  profileData,
  enableCustomDropDown,
  selectedValue,
  onProfileSelect,
  onDownloadPress,
}) => {
  const vaccineScheduleLabel = metaFinderVaccinationCalendar(
    ELEMENT_KEY_VACCINATION_SCHEDULE
  );
  return (
    <ImageBackground source={VC_BANNER} style={styles.headerImagecontainer}>
      <PruBackHeader customStyles={{ backgroundColor: "transparent" }} />
      <Text style={styles.headerTitle}>{vaccineScheduleLabel}</Text>
      {enableCustomDropDown && (
        <UserDropDown
          profileData={profileData}
          selectedValue={selectedValue}
          onProfileSelect={onProfileSelect}
          onDownloadPress={onDownloadPress}
        />
      )}
    </ImageBackground>
  );
};

HeaderWithImage.propTypes = {
  selectedValue: PropTypes.string,
  profileData: PropTypes.array,
  onProfileSelect: PropTypes.func,
  onDownloadPress: PropTypes.func,
  enableCustomDropDown: PropTypes.bool,
};
export default HeaderWithImage;
