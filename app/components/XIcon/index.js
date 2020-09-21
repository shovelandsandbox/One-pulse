/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Platform,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

import AppConfig from "../../config/AppConfig"
const fontFamily = Platform.OS === "ios" ? "Avenir-Roman" : "pru-regular";

export default class XIcon extends PureComponent {
  source = {}
  render() {
    const {
      width,
      height,
      onPress,
      containerStyle,
      outContainerStyle,
      img,
      imgUrl,
      country
    } = this.props;
    let imgsource = img
    const cmsRootUrl = AppConfig.getCMSUrl()+'pulse/resources';
    //https://apidev.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/
    //https://apiuat.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/pulse/resources/menu-stickers/access_health.png?namespace=MY
    if (imgUrl) {
      imgsource = { uri: cmsRootUrl + imgUrl + `?namespace=${country}` }
    }

    return (
      <TouchableOpacity
        style={[styles.container, styles.center, outContainerStyle]}
        onPress={onPress}
      >
        <LinearGradient
          colors={this.props.colors}
          style={[
            // { flex: 1 },
            styles.center,
            containerStyle,
            { width, height },
          ]}
        >
          <Image
            style={[styles.center, this.props.imgStyle]}
            source={imgsource}
          ></Image>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.label,
              styles.center,
              { width: outContainerStyle.width + 10 },
            ]}
          >
            {this.props.firstLabel}
          </Text>
          <Text
            style={[
              styles.secondLabel,
              styles.center,
              { width: outContainerStyle.width + 10 },
            ]}
          >
            {this.props.secondLabel}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

XIcon.propTypes = {
  img: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  containerStyle: PropTypes.object,
  height: PropTypes.number,
  imgStyle: PropTypes.object,
  firstLabel: PropTypes.string,
  secondLabel: PropTypes.string,
  onPress: PropTypes.func,
  outContainerStyle: PropTypes.object,
  width: PropTypes.number,
};

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center" },
  container: {
    flex: 1,
  },
  label: {
    color: "#21211f",
    flexWrap: "wrap",
    fontFamily,
    fontSize: 10.3,
    marginTop: 5,
    textAlign: "center",
  },
  secondLabel: {
    color: "#636363",
    flexWrap: "wrap",
    fontFamily,
    fontSize: 9.3,
    textAlign: "center",
  },
});
