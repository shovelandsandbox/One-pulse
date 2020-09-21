import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { func } from "prop-types";
import { EDIT } from "../../../../../assets/images/affinityGroup";

export default function CreatePost({ onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={onPress}>
        <Image source={EDIT} style={styles.editIcon} />
      </TouchableOpacity>
    </View>
  );
}

CreatePost.propTypes = {
  onPress: func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editIcon: {
    height: 18,
    width: 18,
  },
  icon: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 5,
  },
});
