import React from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const Product = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.contentView}>
        <Text style={styles.heading}>{item.productName}</Text>
        <Text style={styles.description}>{item.productDescription}</Text>
        <Text style={styles.price}>{item.productPrice}</Text>
      </View>
    </View>
  );
};

Product.propTypes = {
  item: PropTypes.object,
};

export default Product;
