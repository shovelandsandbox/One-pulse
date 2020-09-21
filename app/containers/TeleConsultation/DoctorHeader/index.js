import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { CoreActionTypes, events } from "@pru-rt-internal/pulse-common";
import { connect } from "react-redux";
import {
  BACK,
  DOCLOGO,
} from "../../../config/images";
import styles from "./styles";
import { dispatchEvent } from "../../../actions";
const { IS_DRAWER_OPEN } = CoreActionTypes;

class DoctorHeader extends React.PureComponent {
  render() {
    const { style, onLeftPress } = this.props;
    return (
      <View style={[styles.headerContainer, style]}>
        <TouchableOpacity
          onPress={() => {
            this.props.dispatchEvent(events.MyDocBackButtonClick)
            onLeftPress();
          }}
          style={styles.backCloseBtnWrapper}>
          <Image style={styles.leftIconStyle} source={BACK} />
        </TouchableOpacity>
        <View
          accessibilityLabel="home"
          accesible
          style={styles.docLogoContainer}>
          <Image style={{ width: 80, height: 24 }}
            resizeMode="contain"
            source={DOCLOGO} />
        </View>
      </View>
    );
  }
}

DoctorHeader.propTypes = {
  leftIconType: PropTypes.string,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  onLeftPress: PropTypes.func,
  title: PropTypes.string,
};

export default connect(
  null,
  {
    dispatchEvent,
    openCloseDrawer: value => ({
      type: IS_DRAWER_OPEN,
      value,
    }),
  }
)(DoctorHeader);
