import React from "react";
import { View, Image, Dimensions, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import { connect } from "react-redux";
import { BACK, CLOSE_NEW } from "../../config/images";

const { IS_DRAWER_OPEN } = CoreActionTypes;

class Header extends React.PureComponent {
  render() {
    const { leftIconType, style, onLeftPress, title, titleStyle } = this.props;
    let leftIcon;
    if (leftIconType === "close") {
      leftIcon = CLOSE_NEW;
    } else {
      leftIcon = BACK;
    }
    return (
      <View style={[styles.headerContainer, style]}>
        <TouchableOpacity
          onPress={onLeftPress}
          style={styles.backCloseBtnWrapper}
        >
          <Image style={styles.leftIconStyle} source={leftIcon} />
        </TouchableOpacity>
        {title && <Text style={titleStyle}>{title}</Text>}
      </View>
    );
  }
}

Header.propTypes = {
  leftIconType: PropTypes.string,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  onLeftPress: PropTypes.func,
  title: PropTypes.string,
};

export default connect(null, {
  openCloseDrawer: value => ({
    type: IS_DRAWER_OPEN,
    value,
  }),
})(Header);

const window = Dimensions.get("window");
const styles = {
  backCloseBtnWrapper: {
    width: 35,
    height: 35,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerContainer: {
    width: window.width,
    height: 52,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingLeft: 11,
    paddingRight: 11,
    flexDirection: "row",
  },
  leftIconStyle: { width: 20, height: 20, left: 0 },
  rightIconBtnStyle: { position: "absolute", right: 15 },
  rightIconStyle: { width: 24, height: 24 },
};
