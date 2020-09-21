/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./styles";
import SocialAppTile from "../SocialAppTile";

export default InviteStart = ({
  title,
  skip,
  data,
  onTilePress,
  onSkipPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onSkipPress} style={styles.skipView}>
        <Text style={styles.skipText}>{skip}</Text>
      </TouchableOpacity>
      <FlatList
        horizontal={true}
        contentContainerStyle={styles.contentContainer}
        data={data}
        renderItem={({ item }) => (
          <SocialAppTile item={item} onTilePress={onTilePress} />
        )}
      />
    </View>
  );
};
