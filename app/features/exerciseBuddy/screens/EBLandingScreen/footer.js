import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import { pathOr } from "ramda";
import colors from "../../utils/colors";
import {
  SET_BEGINNER,
  SET_INTERMEDIATE,
  SET_ADVANCED,
} from "../../../../config/images";
const Footer = ({ data, activeTab }) => {
  const sets = pathOr("-", ["sets"], data) + " Sets";
  return (
    <View style={Styles.container}>
      {returnSetIcon(activeTab)}
      <Text style={Styles.statsText}>{sets}</Text>
    </View>
  );
};
const returnSetIcon = activeTab => {
  switch (activeTab) {
    case "advanced":
      return <Image source={SET_ADVANCED} />;
    case "beginner":
      return <Image source={SET_BEGINNER} />;
    case "intermediate":
      return <Image source={SET_INTERMEDIATE} />;
  }
};
Footer.propTypes = {
  data: PropTypes.object,
  activeTab: PropTypes.string,
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 2.3,
  },
  statsText: {
    color: colors.footerText,
    fontFamily: "Avenir-Roman",
    fontSize: 10.7,
    lineHeight: 16.7,
    marginLeft: 6.6,
  },
});

export default Footer;
