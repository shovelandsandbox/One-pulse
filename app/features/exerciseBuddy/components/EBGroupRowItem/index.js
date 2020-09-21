import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { pathOr } from "ramda";

import styles from "./styles";

import { AVATAR } from "../../../../config/images";

const GroupRowItem = ({ item, onSelected }) => {
  const imageUrl = pathOr(null, ["icon", "url"], item);
  const groupName = pathOr("", ["name"], item);
  return (
    <TouchableOpacity
      onPress={e => {
        e.preventDefault();
        onSelected(item);
      }}
      style={styles.container}
    >
      <View style={styles.imageView}>
        <Image
          style={styles.imgStyle}
          source={
            item.imageUrl
              ? {
                  uri: imageUrl,
                }
              : AVATAR
          }
        />
      </View>
      <View style={styles.groupView}>
        <Text style={styles.groupName}>{groupName}</Text>
      </View>
    </TouchableOpacity>
  );
};

GroupRowItem.propTypes = {
  item: PropTypes.object,
  onSelected: PropTypes.func,
};

export default GroupRowItem;
