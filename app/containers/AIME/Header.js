import React from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import { CLOSE_NEW, BACK, SOUND_ICON, AIME_LOGO } from "../../config/images";

const Header = props => {
  const leftIcon =
    props.leftIconType == "close"
      ? CLOSE_NEW
      : BACK;
  const rightIcon = SOUND_ICON;
  const aimeLogo = AIME_LOGO;
  return (
    <View style={{ flexDirection: "row" }}>
      {props.sliderStatus ? (
        <View style={[styles.headerContainer, props.style]}>
          <Image style={{ width: 20, height: 20, left: 0 }} source={leftIcon} />
          {props.showRightIcon && (
            <Image style={{ width: 24, height: 24 }} source={rightIcon} />
          )}
        </View>
      ) : (
        <View style={[styles.headerContainer, props.style]}>
          <TouchableOpacity
            onPress={props.onLeftPress}
            style={styles.backCloseBtnWrapper}
          >
            <Image
              style={{ width: 20, height: 20, left: 0 }}
              source={leftIcon}
            />
          </TouchableOpacity>
          {props.showRightIcon && (
            <TouchableOpacity
              onPress={props.onRightPress}
              style={[
                styles.backCloseBtnWrapper,
                { position: "absolute", right: 15 },
              ]}
            >
              <Image style={{ width: 24, height: 24 }} source={rightIcon} />
            </TouchableOpacity>
          )}
        </View>
      )}
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Image style={[styles.aimelogo]} source={aimeLogo} />
      </View>
    </View>
  );
};

const window = Dimensions.get("window");
const styles = {
  headerContainer: {
    width: window.width,
    height: 52,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingLeft: 11,
    paddingRight: 11,
    flexDirection: "row",
    flex: 1,
    backgroundColor: "transparent",
    // marginBottom:10
  },
  backCloseBtnWrapper: {
    width: 35,
    height: 35,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  aimelogo: {
    marginTop: 10,
    marginRight: 5,
    width: 50,
    height: 30,
    resizeMode: "contain",
  },
};

export { Header };
