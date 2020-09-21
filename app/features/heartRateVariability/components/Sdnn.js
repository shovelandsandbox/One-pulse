import React, { PureComponent } from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { safeMetaLabelFinder } from "../../../utils/meta-utils";

import SdnnColumnView from "./SdnnColumnView";

const defaultContainerColor = "rgb(248, 243, 225)";
const heartBeatContainerColor = "rgb(245, 245, 245)";
const heartBeatIndicatorTextColor = "rgb(238, 29, 51)";
const heartBeatAverageTextColor = "rgb(241, 23, 43)";

import { SDNN } from "../../../config/images";

const width = Dimensions.get("window").width; //full width

class Sdnn extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      sdnnRange = { range: { minValue: 2, maxValue: 3 }, disabled: false },
      sdnn = 0,
    } = this.props;

    if (sdnnRange.disabled) return null;
    const valuesProps = {
      numberColor: heartBeatAverageTextColor,
      textColor: "black",
      min: sdnnRange.range.minValue,
      max: sdnnRange.range.maxValue,
    };
    const sdnnResult =
      sdnn === 0
        ? safeMetaLabelFinder("heartRateVariability", "bpmNA")
        : Math.round(sdnn);
    return (
      <View style={styles.container}>
        <View style={styles.valueContainer}>
          <Text style={styles.valueHeaderText}>
            {safeMetaLabelFinder("heartRateVariability", "sdnn")}
          </Text>
          <View style={styles.averageValueContainer}>
            <Text style={styles.valueTextStyle}>{sdnnResult}</Text>
          </View>
          <SdnnColumnView {...valuesProps} />
        </View>
        <View style={styles.defaultValueContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={SDNN}
              style={styles.imageStyle}
              resizeMode={"center"}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  averageValueContainer: {
    flexDirection: "row",
    marginBottom: 30,
    marginLeft: 30,
    marginTop: 10,
  },
  container: {
    flexDirection: "row",
    flexGrow: 1,
    flexWrap: "nowrap",
    minHeight: 200,
    width,
  },
  // eslint-disable-next-line react-native/no-color-literals
  defaultTextColor: {
    color: "white",
    fontWeight: "normal",
  },
  defaultValueContainer: {
    backgroundColor: defaultContainerColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    // flexGrow: 1,
    height: 98,
    width: 98,
  },
  valueContainer: {
    backgroundColor: heartBeatContainerColor,
    flex: 1,
    flexGrow: 0.6,
    paddingTop: 20,
  },
  valueDetailsContainer: {
    paddingLeft: 3,
  },
  valueHeaderText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  valueTextDetails: {
    color: heartBeatIndicatorTextColor,
    fontSize: 10,
    fontWeight: "bold",
  },
  valueTextStyle: {
    color: heartBeatAverageTextColor,
    fontSize: 42,
    lineHeight: 50,
    textAlign: "center",
  },
});

const mapStateToProps = state => {
  return {};
};

Sdnn.propTypes = {
  sdnnRange: PropTypes.object,
  sdnn: PropTypes.number,
};

export default connect(mapStateToProps, {})(Sdnn);
