/* eslint-disable react/display-name */
import React from "react";
import { FlatList, View } from "react-native";
import PropTypes from "prop-types";
import ProfileBox from "../ProfileBox";
import AddMoreTile from "../AddMoreTile";
import { isEmpty } from "ramda";
import styles from "./styles";

const renderItem = (item, onSelect, selectedUser) => {
  if (isEmpty(item)) {
    return <AddMoreTile onSelect={onSelect} />;
  }
  return (
    <ProfileBox item={item} onSelect={onSelect} selectedUser={selectedUser} />
  );
};

const ProfileList = ({ data, onSelect, selectedUser }) => {
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      renderItem={({ item }) => renderItem(item, onSelect, selectedUser)}
      columnWrapperStyle={styles.columnWrapperStyle}
    />
  );
};

ProfileList.propTypes = {
  data: PropTypes.object,
  onSelect: PropTypes.func,
  selectedUser: PropTypes.object,
};

export default ProfileList;
