import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

import Colors from "../utils/colors";
import PostLinkPreview from "./link-preview";

export default class LinkPost extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, link, onPress, options } = this.props;
    return (
      <View style={styles.baseContainer}>
        <View style={styles.htmlContainer}>
          <PostLinkPreview
            text={link}
            title={title}
            titleNumberOfLines={1}
            onPress={onPress}
            options={options}
          />
        </View>
      </View>
    );
  }
}

LinkPost.propTypes = {
  link: PropTypes.string,
  onPress: PropTypes.func,
  title: PropTypes.string,
  options: PropTypes.string,
};

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: Colors.baseBackground,
  },
});
