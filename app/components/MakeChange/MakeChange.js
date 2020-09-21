import React from "react";
import { Text, View, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import { configureLineHeight } from "../../utils/lineHeightsUtils";

export default class MakeChange extends React.PureComponent {
  render() {
    const { actions } = this.props;
    return (
      <View style={[styles.rowFlexMt]}>
        <View style={{ width: 30, height: 30, marginRight: 10 }}>
          <Image
            style={{ width: 30, height: 30, marginRight: 10 }}
            source={{ uri: actions.asset }}
          />
        </View>
        <View style={{ marginRight: 10, paddingRight: 20 }}>
          <Text style={{...styles.title, ...configureLineHeight("16")}}>{actions.summary}</Text>
          <Text style={{...styles.timestamp, ...configureLineHeight("14")}}>{actions.description}</Text>
        </View>
        <View style={styles.horizontalLine} />
      </View>
    );
  }
}

MakeChange.propTypes = {
  actions: PropTypes.object.isRequired,
};
