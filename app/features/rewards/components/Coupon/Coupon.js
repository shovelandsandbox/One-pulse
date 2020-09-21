/* eslint-disable react/require-optimization */
import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import styles from "./style";
import moment from "moment";
import MetaConstants from "../../meta";
import { pathOr } from "ramda";
class Coupon extends Component {
  constructor(props) {
    super(props);

    this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  dateDiff(date) {
    const result = moment(date).format("DD MMM YY");
    return `${this.MetaConstants.expired_in} ${result}`;
  }
  componentDidMount() { }

  render() {
    const { items, onCouponPress } = this.props;
    const imageUrl = pathOr(null, ["icon", "url"], items);
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onCouponPress(items)}
      >
        <View style={styles.logo}>
          <Image
            style={styles.imgstyle}
            source={{
              uri: imageUrl,
            }}
          />
        </View>
        <View style={styles.flex}>
          <View style={styles.paddingStyle}>
            <Text style={styles.textColor}>{items.name}</Text>
          </View>
          <View style={styles.paddingStyle}>
            <Text style={styles.descrptionColor}>{items.description}</Text>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.typeContiner}>
              <Text style={styles.typeColor}>{items.category}</Text>
            </View>
            {items.expiry && (
              <View style={styles.expiryContiner}>
                <Text style={styles.expiryColor}>
                  {this.dateDiff(items.expiry)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Coupon;
