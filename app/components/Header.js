import React from "react";
import { View, Image, Dimensions, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import { CLOSE_NEW, BACK } from "../config/images";

class Header extends React.PureComponent {
  render() {
    const { leftIconType, style, onClick, title } = this.props;
    let leftIcon;
    if (leftIconType === "close") {
      leftIcon = CLOSE_NEW;
    } else {
      leftIcon = BACK;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onClick} style={styles.backCloseBtnWrapper}>
          <Image style={styles.leftIconStyle} source={leftIcon} />
        </TouchableOpacity>
        {
          title && <Text style={{ fontSize: 16 }}>{title}</Text>
        }
      </View>
    );
  }
}

Header.propTypes = {
  leftIconType: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Header;

const window = Dimensions.get("window");
const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft:20,
    marginTop:20
  },
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
  leftIconStyle: {
    width: 20,
    height: 20,
    left: 0,
    marginLet: 10
  },
  rightIconBtnStyle: { position: "absolute", right: 15 },
  rightIconStyle: { width: 24, height: 24 },
};
