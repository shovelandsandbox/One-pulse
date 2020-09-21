import React, { PureComponent } from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { safeMetaLabelFinder } from "../../../utils/meta-utils";

import HeartBeatThreeColumnView from "./HeartBeatThreeColumnView";

const defaultContainerColor = "rgb(234, 38, 74)";
const heartBeatContainerColor = "rgb(253, 221, 224)";
const heartBeatIndicatorTextColor = "rgb(238, 29, 51)";
const heartBeatAverageTextColor = "rgb(241, 23, 43)";

import { VITALS_HEART_BEAT } from "../../../config/images";

const width = Dimensions.get("window").width; //full width

class HeartBeatCount extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      user = { min: 0, max: 0 },
      range = { lowerBound: 0, upperBound: 0 },
      heartBeat,
      bpm = 0,
    } = this.props;

    if (heartBeat.disabled) return null;
    const valuesProps = {
      numberColor: heartBeatAverageTextColor,
      textColor: "black",
      min: user.min,
      max: user.max,
    };
    const defaultProps = {
      numberColor: "white",
      textColor: "white",
      min: range.lowerBound,
      max: range.upperBound,
    };

    const bpmResult =
      bpm === 0 ? safeMetaLabelFinder("ppgVitals", "bpmNA") : Math.round(bpm);
    return (
      <View style={styles.container}>
        <View style={styles.valueContainer}>
          <Text style={styles.valueHeaderText}>
            {safeMetaLabelFinder("ppgVitals", "heartBeatCount")}
          </Text>
          <View style={styles.averageValueContainer}>
            <Text style={styles.valueTextStyle}>{bpmResult}</Text>
            <View style={styles.valueDetailsContainer}>
              <Text style={styles.valueTextDetails}>
                {safeMetaLabelFinder("ppgVitals", "avgBpm")}
              </Text>
              <Text style={styles.valueTextDetails}>
                {safeMetaLabelFinder("ppgVitals", "minLabel")}
              </Text>
            </View>
          </View>
          <HeartBeatThreeColumnView {...valuesProps} />
        </View>
        <View style={styles.defaultValueContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={VITALS_HEART_BEAT}
              style={styles.imageStyle}
              resizeMode={"center"}
            />
          </View>
          <HeartBeatThreeColumnView {...defaultProps} />
          <Text style={[styles.valueHeaderText, styles.defaultTextColor]}>
            ADULT(18-45 YRS)
          </Text>
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
  },
  imageContainer: {
    flexDirection: "row",
  },
  imageStyle: {
    flexGrow: 1,
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
    color: heartBeatIndicatorTextColor,
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
  },
});

const mapStateToProps = state => {
  return {};
};

HeartBeatCount.propTypes = {
  user: {
    min: PropTypes.number,
    max: PropTypes.number,
  },
  range: {
    lowerBound: PropTypes.number,
    upperBound: PropTypes.number,
  },
  heartBeat: PropTypes.object,
  bpm: PropTypes.number,
};

export default connect(mapStateToProps, {})(HeartBeatCount);
