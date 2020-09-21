import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import moment from "moment";

const Voucher = ({ item }) => {
  const expiryDate = moment(item.expiry).format("DD MMM YYYY");
  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        <Text style={styles.desc}>{`Voucher Code: ${item.code}`}</Text>
        <Text style={styles.desc}>{`Voucher ID: ${item.id}`}</Text>
        <Text style={styles.code}>{`Expiry: ${expiryDate}`}</Text>
      </View>
    </View>
  );
};

Voucher.propTypes = {
  item: PropTypes.object,
};

export default Voucher;
