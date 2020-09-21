/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { PureComponent } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { APP_HEADER_NOTIFICATION_CENTER_ICON } from "../../config/images";

export default class NotificationIcon extends PureComponent {
  render() {
    const { icon, count, onPress, iconStyle, countPositionStyle } = this.props;
    return (
      <TouchableOpacity
        onPress={e => {
          e.preventDefault();
          onPress();
        }}
        style={this.props.containerStyle}
      >
        <Image source={icon} style={iconStyle} />
        {/* <View style={[styles.countContainer, countPositionStyle]}>
          <Text style={styles.countStyle}>{count}</Text>
        </View> */}
      </TouchableOpacity>
    );
  }
}

NotificationIcon.propTypes = {
  icon: PropTypes.string,
  count: PropTypes.number,
  onPress: PropTypes.func,
  iconStyle: PropTypes.obj,
  countPositionStyle: PropTypes.obj,
  containerStyle: PropTypes.obj,
};

NotificationIcon.defaultProps = {
  containerStyle: {
    height: 40,
    width: 40,
    alignItems: "center",
  },
  icon: APP_HEADER_NOTIFICATION_CENTER_ICON,
  iconStyle: {
    height: 40,
    width: 40,
    alignItems: "center",
  },
};

const styles = StyleSheet.create({
  countContainer: {
    alignItems: "center",
    backgroundColor: "#ec1c2e",
    borderColor: "white",
    borderRadius: 11 / 2,
    borderWidth: 0.4,
    height: 11,
    justifyContent: "center",
    position: "absolute",
    right: -2,
    top: -2,
    width: 11,
  },
  countStyle: {
    color: "white",
    fontSize: 10,
  },
});
