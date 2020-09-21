import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Theme } from "../../../themes";
const { Fonts } = Theme;

import Colors from "../utils/colors";
import PostDescription from "./post-description";

export default class TextPost extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, description, options = {} } = this.props;
    return (
      <View style={styles.baseContainer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, styles.boldText]}>{title}</Text>
        </View>
        <PostDescription
          description={description}
          isPreview={options.isPreview}
        />
      </View>
    );
  }
}

TextPost.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  options: PropTypes.object,
};

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: Colors.baseBackground,
  },
  boldText: {
    fontWeight: "bold",
  },
  titleContainer: {
    paddingHorizontal: 5,
  },
  titleText: {
    color: Colors.postTitleText,
    fontFamily: "Avenir-Regular",
    fontSize: 15,
    paddingVertical: 10,
  },
});
