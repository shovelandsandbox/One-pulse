/* eslint-disable react-native/no-color-literals */
import React, { PureComponent } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { AVATAR } from "../../config/images";

export default class ProfileImage extends PureComponent {
  render() {
    const { profilePicture, onPress, variant, size, style } = this.props;
    return (
      <View>
        {onPress ?
          <TouchableOpacity
            style={styles.mediumSizeContainer}
            onPress={onPress ? onPress : null}
          >
            <Image style={styles.medium} source={
              profilePicture
                ? { uri: `data:image/jpeg;base64,${profilePicture}` }
                : AVATAR
            } />
          </TouchableOpacity> :
          <View style={styles.mediumSizeContainer}>
            <Image style={styles.medium} source={
              profilePicture
                ? { uri: `data:image/jpeg;base64,${profilePicture}` }
                : AVATAR
            } />
          </View>
        }
      </View>
    );
  }
}

ProfileImage.propTypes = {
  profilePicture: PropTypes.string,
  onPress: PropTypes.func,
  variant: PropTypes.string,
};

ProfileImage.defaultProps = {
  variant: "normal", // normal, outline possible values
  size: "medium", //medium , large possible values
};

const styles = StyleSheet.create({
  profile: {
    aspectRatio: 1 / 1,
    overflow: "hidden",
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    right: 14.5,
  },
  outlineContainer: {
    borderWidth: 4,
    borderColor: "#FFF",
    elevation: 3,
  },
  mediumSizeContainer: {
    width: 42,
    borderRadius: 42 / 2,
    height: 42,
    backgroundColor: "#FFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.7,
    borderColor: "#FFFF"
  },
  medium: {
    width: 42,
    height: 42,
    borderRadius: 42 / 2,
    overflow: "hidden",
    aspectRatio: 1 / 1,
  },
  largeSizeContainer: {
    width: 54,
    height: 54,
    borderRadius: 54 / 2,
  },
  large: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
});
