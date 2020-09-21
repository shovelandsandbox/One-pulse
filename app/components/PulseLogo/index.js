import React, { PureComponent } from "react";
import { Image, StyleSheet, View } from "react-native";

import {
  pulseLogo,
  pulseByPrudentialLogo,
  NEW_PULSE_LOGO_TAIWAN,
} from "../../config/images";
import PropTypes from "prop-types";

const configureLogo = country => {
  switch (country) {
    case "PH":
      return pulseLogo;
    case "TW":
      return NEW_PULSE_LOGO_TAIWAN;
  }
  return pulseByPrudentialLogo;
};
export default class PulseLogo extends PureComponent {
  render() {
    const { country } = this.props;
    const PULSE_LOGO = configureLogo(country);

    return (
      <View style={Styles.container}>
        <Image style={Styles.imageStyle} source={PULSE_LOGO} />
      </View>
    );
  }
}

PulseLogo.propTypes = {
  country: PropTypes.string,
};

const Styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imageStyle: {
    height: 37.7,
    resizeMode: "contain",
    width: 75.5,
  },
});
