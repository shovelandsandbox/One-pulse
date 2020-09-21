import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import {getLineHeight} from "../../utils/StyleUtils";

const PruHeaderText = ({ text, style = {} }) => (
  <Text style={[Styles.header, style]}>{text}</Text>
);

const Styles = StyleSheet.create({
  header: {
    color: "#515B61",
    fontFamily: "Avenir",
    fontSize: 22,
    fontWeight: "400",
    letterSpacing: 1,
    lineHeight: 38,
    textAlign: "center",
  }
});

PruHeaderText.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default PruHeaderText;
