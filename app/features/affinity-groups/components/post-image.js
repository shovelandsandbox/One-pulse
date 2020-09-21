import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { StyleSheet, Image, Dimensions } from "react-native";

export default class PostImage extends PureComponent {
  render() {
    const { uri, options: { preview } = {} } = this.props;

    let config = {
      style: {
        ...styles.postImage,
        aspectRatio: 1,
      },
    };

    if (preview) {
      config = {
        resizeMode: "contain",
        style: { ...styles.postImage, aspectRatio: 2.4 },
      };
    }

    return <Image source={{ uri }} {...config} />;
  }
}

PostImage.propTypes = {
  uri: PropTypes.string,
  options: PropTypes.object,
};

const styles = StyleSheet.create({
  postImage: {
    alignSelf: "center",
    width: Dimensions.get("window").width - 40,
  },
});
