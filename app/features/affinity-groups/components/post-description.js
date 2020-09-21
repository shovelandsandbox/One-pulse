import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { StyleSheet, View, Text, ColorPropType } from "react-native";
import Colors from "../utils/colors";
import { isEmpty } from "ramda";
import { Theme } from "../../../themes";
const { Fonts } = Theme;
import { metaFinderAG } from "../utils/meta-utils";

export default class PostDescription extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { description = "", isPreview = false } = this.props;
    return (
      <View style={styles.titleContainer}>
        {!isEmpty(description) && (
          <Text style={styles.descStyle} numberOfLines={isPreview ? 3 : 0}>
            {description}
          </Text>
        )}
        {isPreview && (
          <Text style={styles.learnMoreText}>{metaFinderAG("learnMore")}</Text>
        )}
      </View>
    );
  }
}

PostDescription.propTypes = {
  description: PropTypes.string,
  isPreview: PropTypes.bool,
};

const styles = StyleSheet.create({
  descStyle: {
    color: Colors.descText,
    flexWrap: "wrap",
    fontFamily: "Avenir-Regular",
    fontSize: 14,
    paddingBottom: 4,
    paddingTop: 4,
  },
  learnMoreText: {
    color: Colors.red,
    fontFamily: "Avenir-Regular",
    fontSize: 10,
    paddingBottom: 4,
    paddingTop: 4,
  },
  titleContainer: {
    backgroundColor: Colors.baseBackground,
    paddingHorizontal: 5,
  },
});
