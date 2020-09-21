import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

import PropTypes from "prop-types";

const TableRowTitle = ({ title, subTitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      {subTitle && <Text style={styles.subtitleText}>{subTitle}</Text>}
    </View>
  );
};

TableRowTitle.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.array,
};
export default TableRowTitle;
