import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../../themes";
const { Colors, Fonts } = Theme;

class PruNumberCard extends React.PureComponent {
  render() {
    const cardStyle = this.props.cardStyle ? this.props.cardStyle : {};
    const numberStyle = this.props.numberStyle ? this.props.numberStyle : {};
    const textStyle = this.props.textStyle ? this.props.textStyle : {};
    return (
      <View
        style={{
          ...styles.cardContainer,
          ...cardStyle
        }}
      >
        <Text style={{ ...styles.number, ...numberStyle }}>{this.props.number}</Text>
        <Text style={{ ...styles.text, ...textStyle }}>{this.props.numberDesc}</Text>
      </View>
    );
  }
}

export default PruNumberCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.lightSlateGrey,
    elevation: 2
  },
  number: {
    fontSize: 26,
    color: Colors.white
  },
  text: {
    fontSize: 16,
    color: Colors.white
  }
});
