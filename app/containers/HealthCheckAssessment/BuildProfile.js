import React from "react";
import { Text, View } from "react-native";
import { OfflineImage } from "react-native-image-offline";
import styles from "./BuildStyle";
import {
  metaHelpers,
  CoreConstants,
} from "@pru-rt-internal/pulse-common";
const {
  SCREEN_KEY_HEALTH_CHECK_BUILD_YOUR_PROFILE,
  COMMON_KEY_BABYLON_LOGO,
} = CoreConstants;
import { HEALTH_GET_STARTED, BABYLON_LOGO_BLUE } from "../../config/images";
import {configureLineHeight} from "../../utils/lineHeightsUtils";
const KEY_DESCRIPTION = "healthcheckbuildyourprofiledescription";
const KEY_SUB_DESCRIPTION = "healthcheckbuildyourprofilesubdescription";

class BuildProfile extends React.PureComponent {
  render() {
    const buildYouProfilePage = metaHelpers.findScreen(
      SCREEN_KEY_HEALTH_CHECK_BUILD_YOUR_PROFILE
    );
    return (
      <View style={styles.container}>
        <View
          style={[styles.headerLogo,{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }]}
        >
          <OfflineImage
            accessibilityLabel="babylonLogo"
            resizeMode="contain"
            accesible
            key={COMMON_KEY_BABYLON_LOGO}
            style={{ width: 100, height: 50, marginRight: 10 }}
            fallbackSource={BABYLON_LOGO_BLUE}
            source={{
              uri: metaHelpers.findCommon(COMMON_KEY_BABYLON_LOGO).image,
            }}
          />
        </View>
        <Text style={{...styles.headerText, ...configureLineHeight("22")}}>{buildYouProfilePage.label}</Text>
        <Text style={{...styles.textStyle, ...configureLineHeight("14")}}>
          {
            metaHelpers.findElement(
              SCREEN_KEY_HEALTH_CHECK_BUILD_YOUR_PROFILE,
              KEY_DESCRIPTION
            ).label
          }
        </Text>
        <Text style={{...styles.textStyle, ...configureLineHeight("14")}}>
          {
            metaHelpers.findElement(
              SCREEN_KEY_HEALTH_CHECK_BUILD_YOUR_PROFILE,
              KEY_SUB_DESCRIPTION
            ).label
          }
        </Text>
        <OfflineImage
          style={styles.imgBackground}
          resizeMode="cover"
          key={buildYouProfilePage.key}
          fallbackSource={HEALTH_GET_STARTED}
          source={{ uri: buildYouProfilePage.image }}
        />
      </View>
    );
  }
}

export default BuildProfile;
