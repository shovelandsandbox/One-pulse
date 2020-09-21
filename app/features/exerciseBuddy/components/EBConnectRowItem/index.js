import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

import { AVATAR } from "../../../../config/images";

const ConnectRowItem = ({ item, onSelected }) => {
  const imageUrl = item.imageUrl ? item.imageUrl : null;
  const firstName = item.firstName ? item.firstName + " " : "";
  const lastName = item.lastName ? item.lastName + " " : "";
  const name = firstName + " " + lastName;

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
          style={styles.imgstyle}
          source={
            item.imageUrl
              ? {
                  uri: imageUrl,
                }
              : AVATAR
          }
        />
      </View>
      <View style={styles.contactView}>
        <Text style={styles.contactName}>{name}</Text>
        <Text style={styles.emailText} numberOfLines={1}>
          {item.email}
        </Text>
      </View>
      <View
        style={
          item.isSelectedForInvite ? styles.selectedView : styles.unSelectedView
        }
      >
        {item.isSelectedForInvite && <View style={styles.redView} />}
      </View>
    </TouchableOpacity>
  );
};

ConnectRowItem.propTypes = {
  item: PropTypes.object,
  onSelected: PropTypes.func,
};

export default ConnectRowItem;
