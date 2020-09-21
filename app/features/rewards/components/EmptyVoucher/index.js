import React from "react";
import { Image, Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import { TRANSACATIONS_BACKGROUND } from "../../../../config/images";

const EmptyVoucher = props => {
  const { message } = props;

  return (
    <View style={styles.noCouponContainer}>
      <View style={styles.topView}>
        <Image source={TRANSACATIONS_BACKGROUND} style={styles.bgImage} />
        <Text style={styles.noObjectText}>{message}</Text>
      </View>
    </View>
  );
};
EmptyVoucher.propTypes = {
  message: PropTypes.string,
};
export default EmptyVoucher;
