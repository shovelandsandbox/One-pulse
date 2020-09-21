import React from "react";
import { Image, StyleSheet, Text, View, Dimensions, } from "react-native";
import { connect } from "react-redux";

import { ABOUT, ABOUT_VARIED, ABOUT_TAIWAN } from "../../../../config/images";
import MetaConstants from "../../meta";
import { getLineHeight } from "../../../../utils/StyleUtils";

const configureLogo = country => {
  switch (country) {
    case "PH":
      return ABOUT_VARIED;
    case "TW":
      return ABOUT_TAIWAN;
  }
  return ABOUT;
};

const Logo = props => {
  const { country, description } = props;
  const PULSE_LOGO = configureLogo(country);

  return (
    <View style={Styles.container}>
      <Image style={Styles.imageStyle} source={PULSE_LOGO} />
      {
        <Text style={[Styles.description, description ? Styles.subDescription : null]}>
          {description || "Improve Your Health and fitness today"}
        </Text>
      }
    </View>
  )
};

const mapStateToProps = state => ({
  language: state.userPreferences.language,
  description: MetaConstants.initializeScreenMeta().PULSE_SUB_DESC,
});

export default connect(mapStateToProps, {})(Logo);

const paddingHorizontal = Dimensions.get('window').width*0.04;

const Styles = StyleSheet.create({
  container: {
    marginTop: 40, 
    alignItems: "center",
  },
  imageStyle: {
    resizeMode: "contain", 
    width: 170, 
    height: 110,
  },
  description: { 
    fontSize: 24, 
    textAlign: "center", 
    color: "black",
    lineHeight: 40,
  },
  subDescription: {
    paddingHorizontal,
  }
})
