import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { pathOr } from "ramda";
import PropTypes from "prop-types";
import styles from "./styles";
import ProfileImage from "../../ProfileImage";
import { CLOSE } from "../../../../../config/images";

const RowItem = ({ item, onCancelContactPress }) => {
  const image = pathOr("", ["profilePic"], item);
  const name = pathOr("", ["fullName"], item);
  return (
    <View style={styles.container}>
      <ProfileImage
        userInfo={name}
        profilePicture={image}
        contact={true}
        fromGroup={true}
      />
      <TouchableOpacity
        onPress={() => {
          onCancelContactPress(item);
        }}
        style={styles.crossView}
      >
        <Image source={CLOSE} style={styles.crossImage} />
      </TouchableOpacity>
    </View>
  );
};

RowItem.propTypes = {
  item: PropTypes.object,
  onCancelContactPress: PropTypes.func,
};

export default RowItem;
