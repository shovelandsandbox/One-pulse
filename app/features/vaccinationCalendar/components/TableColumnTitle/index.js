import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

import PropTypes from "prop-types";

const TableColumnTitle = ({ title, subTitle, isCurrentDate, isCompleted }) => {
  return (
    <View
      style={[
        styles.container,
        isCompleted
          ? styles.greenContainer
          : isCurrentDate
          ? styles.yellowContainer
          : {},
      ]}
    >
      <Text style={[styles.titleText, isCompleted ? styles.whiteText : {}]}>
        {title}
      </Text>
      {subTitle && (
        <Text
          style={[styles.subtitleText, isCompleted ? styles.whiteText : {}]}
        >
          {subTitle}
        </Text>
      )}
    </View>
  );
};

TableColumnTitle.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.array,
  isCurrentDate: PropTypes.bool,
  isCompleted: PropTypes.bool,
};
export default TableColumnTitle;
