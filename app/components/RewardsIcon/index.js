/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { PureComponent } from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { APP_HEADER_REWARDS_ICON } from "../../config/images";

export default class RewardsIcon extends PureComponent {
  render() {
    const { icon, onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={e => {
          e.preventDefault();
          onPress();
        }}
        style={styles.containerStyle}
      >
        <Image source={icon} style={styles.iconStyle} />
      </TouchableOpacity>
    );
  }
}

RewardsIcon.propTypes = {
  icon: PropTypes.string,
  onPress: PropTypes.func,
};

RewardsIcon.defaultProps = {
  icon: APP_HEADER_REWARDS_ICON,
};

const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  iconStyle: {
    height: 40,
    width: 40,
    alignItems: "center",
  },
});
