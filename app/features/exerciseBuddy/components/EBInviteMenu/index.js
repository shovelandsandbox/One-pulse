import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const RawItem = ({ item, onItemPress, selectedMenu, customStyle }) => {
  const isSelected = selectedMenu === item.type;
  return (
    <TouchableOpacity
      style={[
        isSelected ? styles.selectedButtonView : styles.buttonView,
        customStyle,
      ]}
      onPress={() => {
        onItemPress(item);
      }}
    >
      <Text style={isSelected ? styles.selectedButtonText : styles.buttonText}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );
};

const InviteMenu = ({ menuList, onMenuClick, selectedMenu }) => {
  return (
    <View style={styles.container}>
      <RawItem
        item={menuList[0]}
        onItemPress={onMenuClick}
        selectedMenu={selectedMenu}
        customStyle={styles.leftBorderRadius}
      />
      <View style={styles.separatorView} />
      <RawItem
        item={menuList[1]}
        onItemPress={onMenuClick}
        selectedMenu={selectedMenu}
      />
      <View style={styles.separatorView} />
      <RawItem
        item={menuList[2]}
        onItemPress={onMenuClick}
        selectedMenu={selectedMenu}
        customStyle={styles.rightBorderRadius}
      />
    </View>
  );
};

RawItem.propTypes = {
  item: PropTypes.object,
  onItemPress: PropTypes.func,
  selectedMenu: PropTypes.string,
  customStyle: PropTypes.object,
};

InviteMenu.propTypes = {
  menuList: PropTypes.array,
  onMenuClick: PropTypes.func,
  selectedMenu: PropTypes.string,
};

export default InviteMenu;
