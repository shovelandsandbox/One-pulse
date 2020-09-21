import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import moment from "moment";

const DiscountRowItem = ({ item, onPress }) => {
  const expiryDate = moment(item.expiry).format("DD MMM YYYY");
  return (
    <TouchableOpacity onPress={() => {
      onPress(item);
    }}>
      <View style={styles.container}>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.code}>{`Expiry: ${expiryDate}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

DiscountRowItem.propTypes = {
  item: PropTypes.object,
};

export default DiscountRowItem;
