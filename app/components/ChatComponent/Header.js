// Usage
//
// <Header
//   leftIconType="back"
//   onLeftPress={()=>this.props.navigation.goBack()}
//   onRightPress={()=>}
//   showRightIcon={true}
//   hideLeftIcon={true}
// />

import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { CoreConstants, metaHelpers } from "@pru-rt-internal/pulse-common";
const { COMMON_KEY_BABYLON_LOGO, COMMON_KEY_DOC_ON_CALL_LOGO } = CoreConstants;
import { BABYLON_LOGO_BLUE, DOC_INLINE_LOGO, BACK, SOUND_ICON, CLOSE_NEW } from "../../config/images";
import { OfflineImage } from "react-native-image-offline";
import { Theme } from "../../themes";
const { Colors } = Theme;

const Header = props => {
  const leftIcon =
    props.leftIconType == "close"
      ? CLOSE_NEW
      : BACK;
  const rightIcon = SOUND_ICON;
  return (
    <View
      style={[styles.headerContainer, props.style]}
      accessibilityLabel="goBackContainer"
      testId="goBackContainer"
    >
      {!props.hideLeftIcon && (
        <TouchableOpacity
          onPress={props.onLeftPress}
          style={styles.backCloseBtnWrapper}
          accessibilityLabel="goBack"
          testId="goBack"
          accesible
        >
          <Image style={{ width: 20, height: 20, left: 0 }} source={leftIcon} />
        </TouchableOpacity>
      )}
      {props.hideLeftIcon && (
        <TouchableOpacity
          onPress={() => {}}
          style={styles.backCloseBtnWrapper}
        />
      )}
      {props.showRightIcon && (
        <TouchableOpacity
          onPress={props.onRightPress}
          style={[
            styles.backCloseBtnWrapper,
            { position: "absolute", right: 15 }
          ]}
        >
          <Image style={{ width: 24, height: 24 }} source={rightIcon} />
        </TouchableOpacity>
      )}
      {!props.showRightDocOnCallLogo && (
        <OfflineImage
          accessibilityLabel="babylonLogo"
          resizeMode="contain"
          accesible
          key={COMMON_KEY_BABYLON_LOGO}
          style={styles.babylonHeader}
          fallbackSource={BABYLON_LOGO_BLUE}
          source={{
            uri: metaHelpers.findCommon(COMMON_KEY_BABYLON_LOGO).image
          }}
        />
      )}
      {props.showRightDocOnCallLogo && (
        <OfflineImage
          accessibilityLabel="docOnCallLogo"
          resizeMode="contain"
          accesible
          key={COMMON_KEY_DOC_ON_CALL_LOGO}
          style={styles.doclogo}
          fallbackSource={DOC_INLINE_LOGO}
          source={{
            uri: metaHelpers.findCommon(COMMON_KEY_DOC_ON_CALL_LOGO).image
          }}
        />
      )}
      {props.showHistory && (
        <Text onPress={() => props.navigation.navitage("PulseHealth")}>
          2345
        </Text>
      )}
    </View>
  );
};

const styles = {
  headerContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: Colors.white,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  backCloseBtnWrapper: {
    width: 35,
    height: 35,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  babylonHeader: {
    width: 100,
    height: 50
  },
  doclogo: {
    paddingTop: 5,
    width: 50,
    height: 30,
    marginLeft: 2,
    marginRight: 2,
    justifyContent: "center",
    paddingBottom: 2,
    resizeMode: "contain"
  }
};

export { Header };
