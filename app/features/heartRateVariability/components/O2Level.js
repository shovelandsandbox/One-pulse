import React, { PureComponent } from "react";
import DefaultO2Level from "./DefaultO2Level";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pathOr } from "ramda";

const width = Dimensions.get("window").width; //full width

const containerBackground = "rgb(247, 249, 251)";
const o2textContainerHeight = 22;

class O2Level extends PureComponent {
  constructor(props) {
    super(props);
  }

  getUserOxygenLevel(level) {
    return `${level}%`;
  }

  render() {
    const { o2Level = {}, range, spo2 } = this.props;
    const rangeValue = o2Level.range;
    const lowRange = pathOr(90, ["low", "value"], rangeValue);
    const midRange = pathOr(5, ["mid", "value"], rangeValue);
    if (!spo2) return null;
    const lowColor = pathOr("rgb(205, 8, 20)", ["low", "color"], rangeValue);
    const midColor = pathOr(
      "rgb(253, 152, 39)",
      ["mid", "endColor"],
      rangeValue
    );
    const normalColor = pathOr(
      "rgb(78,165,88)",
      ["high", "endColor"],
      rangeValue
    );

    const normalIndicator =
      spo2 <= lowRange
        ? lowColor
        : spo2 < lowRange + midRange
        ? midColor
        : normalColor;

    return (
      <View style={styles.container}>
        <View style={styles.horizontalRow}>
          <Text style={[{ color: normalIndicator }, styles.textIndicator]}>
            {this.getUserOxygenLevel(spo2)}
          </Text>
          <View
            style={[styles.circle, { backgroundColor: normalIndicator }]}
          ></View>
          <Text style={[styles.subText, { color: normalIndicator }]}>2</Text>
        </View>
        <Text style={styles.highlightedText}>Saturated Oxygen Level</Text>
        <DefaultO2Level {...o2Level} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: (o2textContainerHeight - 2) / 2,
    height: o2textContainerHeight - 2,
    width: o2textContainerHeight - 2,
  },
  container: {
    backgroundColor: containerBackground,
    paddingLeft: 10,
    paddingRight: 10,
  },
  highlightedText: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  horizontalRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  subText: {
    fontSize: 13,
    fontWeight: "bold",
    height: o2textContainerHeight / 2,
    lineHeight: 13,
    marginTop: o2textContainerHeight / 2,
  },
  textIndicator: {
    fontSize: o2textContainerHeight - 2,
    fontWeight: "bold",
    height: o2textContainerHeight,
    lineHeight: o2textContainerHeight,
    marginRight: 7,
  },
});

const mapStateToProps = state => {
  return {};
};

O2Level.propTypes = {
  spo2: PropTypes.number,
  range: PropTypes.object,
};

export default connect(mapStateToProps, {})(O2Level);
