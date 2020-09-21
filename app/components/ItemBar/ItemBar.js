import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import { find } from "ramda";
import { configureLineHeight } from "../../utils/lineHeightsUtils";

const statusToStyle = {
  LOW: styles.goodLine,
  MEDIUM: styles.cautionLine,
  HIGH: styles.alertLine,
  CRITICAL: styles.alertLine,
};
export default class ItemBar extends React.PureComponent {
  render() {
    const { items } = this.props;
    let line = styles.horizontalLine;
    const { value, range } = items;
    const valueRange = find(
      range => range.min <= value && range.max >= value,
      range
    );
    if (valueRange) {
      line = statusToStyle[valueRange.status];
    }

    return (
      <View>
        <View style={styles.flxRow}>
          <Text style={{...styles.split, ...configureLineHeight("15")}}>{items.component1}</Text>
          <Text style={[styles.split, styles.rightText, {...configureLineHeight("15")}]}>
            {items.component5}
          </Text>
        </View>
        <View style={line} />
      </View>
    );
  }
}

ItemBar.propTypes = {
  items: PropTypes.object.isRequired,
};
