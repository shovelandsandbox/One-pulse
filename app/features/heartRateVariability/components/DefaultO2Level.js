import React, { PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { metaHelpers } from "@pru-rt-internal/pulse-common";
import LinearGradient from "react-native-linear-gradient";
import { pathOr } from "ramda";
import { metaFinder } from "../utils/meta-utils";
const borderColor = "rgb(119,114,109)";
const midColor = "rgb(253, 152, 39)";
const highColor = "rgb(78, 165, 88)";
const lowColor = "rgb(205, 8, 20)";

class DefaultO2Level extends PureComponent {
  constructor(props) {
    super(props);
    this.setDataRange(props);
  }

  setDataRange = props => {
    const { range } = props;
    this.dynamicStyles = {
      high: {
        width: "34%",
      },
      low: {
        borderLeftColor: borderColor,
        borderLeftWidth: 1,
        width: "33%",
      },
      mid: {
        width: "33%",
      },
      lowFiller: pathOr(lowColor, ["low", "color"], range),
      lowEndFiller: pathOr(midColor, ["low", "endColor"], range),
      midFiller: pathOr(midColor, ["mid", "color"], range),
      midEndFiller: pathOr(highColor, ["mid", "endColor"], range),
      highFiller: pathOr(highColor, ["high", "color"], range),
      highEndFiller: pathOr(highColor, ["high", "endColor"], range),
    };
  };

  render() {
    const { range } = this.props;
    const lowRange = pathOr(90, ["low", "value"], range);
    const midRange = pathOr(5, ["mid", "value"], range);

    return (
      <View style={{ marginBottom: 20 }}>
        <View style={styles.container}>
          <View style={[styles.common, this.dynamicStyles.low]}>
            <View style={styles.content}>
              <Text>{metaFinder("lowRange")}</Text>
            </View>
          </View>
          <View style={[styles.common, this.dynamicStyles.mid]}>
            <View style={styles.content}>
              <Text>{metaFinder("midRange")}</Text>
            </View>
          </View>
          <View style={[styles.common, this.dynamicStyles.high]}>
            <View style={styles.content}>
              <Text>{metaFinder("highRange")}</Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={[styles.common, this.dynamicStyles.low]}>
            <View>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[
                  this.dynamicStyles.lowFiller,
                  this.dynamicStyles.lowEndFiller,
                ]}
                style={styles.fillerCommon}
              ></LinearGradient>
            </View>
          </View>
          <View style={[styles.common, this.dynamicStyles.mid]}>
            <View>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[
                  this.dynamicStyles.midFiller,
                  this.dynamicStyles.midEndFiller,
                ]}
                style={styles.fillerCommon}
              ></LinearGradient>
            </View>
          </View>
          <View style={[styles.common, this.dynamicStyles.high]}>
            <View>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[
                  this.dynamicStyles.highFiller,
                  this.dynamicStyles.highEndFiller,
                ]}
                style={styles.fillerCommon}
              ></LinearGradient>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={[styles.common, this.dynamicStyles.low]}>
            <View style={styles.content}>
              <Text style={{ textAlign: "center" }}>
                {metaFinder("lowRangeDesc")}
              </Text>
            </View>
          </View>
          <View style={[styles.common, this.dynamicStyles.mid]}>
            <View style={styles.content}>
              <Text style={{ textAlign: "center" }}>
                {metaFinder("midRangeDesc")}
              </Text>
            </View>
          </View>
          <View style={[styles.common, this.dynamicStyles.high]}>
            <View style={styles.content}>
              <Text style={{ textAlign: "center" }}>
                {metaFinder("highRangeDesc")}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  common: {
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  content: { alignItems: "center", margin: 3 },
  fillerCommon: {
    height: 20,
    marginTop: 10,
  },
});

DefaultO2Level.propTypes = {
  low: PropTypes.number,
  normal: PropTypes.number,
  range: PropTypes.object,
};

export default DefaultO2Level;
