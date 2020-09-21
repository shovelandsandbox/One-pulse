import React from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import { CLOSE_NEW, BACK, SOUND_ICON, AIME_LOGO, BABYLON_LOGO_BLUE, DOC_INLINE_LOGO, SLIDER_LOGO_WHITE } from "../../config/images";

const Header = props => {
  const leftIcon =
    props.leftIconType == "close"
      ? CLOSE_NEW
      : BACK;
  const rightIcon = SOUND_ICON;
  const aimeLogo = AIME_LOGO;
  const babylonLogo = BABYLON_LOGO_BLUE;
  const doconcallLogo = DOC_INLINE_LOGO;
  const pulseLogo = SLIDER_LOGO_WHITE;
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={[styles.headerContainer, props.style]}>
        <TouchableOpacity
          onPress={props.onLeftPress}
          style={styles.backCloseBtnWrapper}
        >
          <Image style={{ width: 20, height: 20, left: 0 }} source={leftIcon} />
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
      {props.showRightLogo && (
        <Image style={[styles.babylonHeader]} source={babylonLogo} />
      )}
      {props.showRightDocOnCallLogo && (
        <Image style={[styles.babylonHeader]} source={doconcallLogo} />
      )}
      {props.showRightPulseLogo && (
        <Image style={[styles.doclogo]} source={pulseLogo} />
      )}
       {props.showRightAimeLogo && (
          <Image style={[styles.doclogo]} source={aimeLogo} />
      )}
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
  babylonHeader: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  doclogo: {
    paddingTop: 5,
    width: 50,
    height: 30,
    marginLeft: 2,
    marginRight: 2,
    justifyContent: "center",
    paddingBottom: 2,
    resizeMode: "contain",
  },
};

export { Header };
