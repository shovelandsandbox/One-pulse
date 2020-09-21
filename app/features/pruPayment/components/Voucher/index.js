import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import { CLOSE_RED } from "../../../../config/images";
import moment from "moment";

const Voucher = ({ item, onRemovePress }) => {
  const remove = "Remove";
  const expiryDate = moment(item.expiry).format("DD MMM YYYY");
  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.code}>{`Expiry: ${expiryDate}`}</Text>
      </View>
      <TouchableOpacity onPress={() => {
          onRemovePress(item);
        }}>
        <View style={styles.removeView}>
          <Image source={CLOSE_RED} style={styles.closeImage} />
          <Text style={styles.removeStyle}>{remove}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

Voucher.propTypes = {
  item: PropTypes.object,
  onRemovePress: PropTypes.func,
};

export default Voucher;
