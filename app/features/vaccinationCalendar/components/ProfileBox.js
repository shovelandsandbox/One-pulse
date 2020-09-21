import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { PropTypes } from "prop-types";
import { pathOr } from "ramda";
import styles from "./styles";
import { AVATAR } from "../../../config/images";

const ProfileBox = ({ item, onSelect, selectedUser }) => {
  const userId = pathOr("", ["id"], item);
  const selectedUserId = pathOr("", ["id"], selectedUser);
  const name = pathOr("", ["name"], item);
  const profilePic = pathOr(AVATAR, ["profilePic"], item);
  const relation = pathOr("", ["relation"], item);
  const isSelected = userId === selectedUserId;
  const bgColor = isSelected ? "#ffe1e1" : "#fff";
  return (
    <TouchableOpacity
      style={[styles.boxContainer, { backgroundColor: bgColor }]}
      onPress={() => {
        onSelect(item);
      }}
    >
      <Image source={profilePic} style={styles.profilePic} />
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.normalText}>{relation}</Text>
    </TouchableOpacity>
  );
};

ProfileBox.propTypes = {
  item: PropTypes.string,
  onSelect: PropTypes.array,
  selectedUser: PropTypes.func,
};

export default ProfileBox;
