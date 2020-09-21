/* eslint-disable react/prop-types */
import React, { PureComponent } from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { metaHelpers } from "@pru-rt-internal/pulse-common";
import { getDataForVital } from "../utils";

const width = Dimensions.get("window").width; //full width

import { VITALS_BREATH } from "../../../config/images";

const containerColor = "rgb(10, 11, 13)";
const subContainerColor = "rgb(32, 33, 35)";
const defaultTextColor = "rgb(81,82,83)";
const normalGreen = "rgb(78,165,88)";

class RespiratoryRate extends PureComponent {
  constructor(props) {
    super(props);
  }

  getAgeRange({ range }) {
    return `Adult(Age ${range.lowerBound}-${range.upperBound} years)`;
  }

  render() {
    const { user, range, resp, respiratoryRate } = this.props;

    const lowerBound = getDataForVital(
      "range",
      "minValue",
      12,
      respiratoryRate
    );
    const upperBound = getDataForVital(
      "range",
      "maxValue",
      20,
      respiratoryRate
    );

    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={[styles.rateContainer, styles.fitToSize]}>
            <Text style={[styles.textColor, styles.textMakeBold]}>
              Respiratory Rate
            </Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueTextStyle}>{Math.round(resp)}</Text>
              <View style={styles.valueDetailsContainer}>
                <Text style={styles.valueTextDetails}>Avg. BREATHS </Text>
                <Text style={styles.valueTextDetails}>/ MIN</Text>
              </View>
            </View>
          </View>
          <View style={styles.fitToSize}>
            <View style={[styles.defaultRateContainer, styles.fitToSize]}>
              <View style={styles.defaultRateLine}>
                <Text
                  style={[
                    styles.textColor,
                    styles.textMakeBold,
                    styles.textShowLargeForDefault,
                  ]}
                >
                  {`${lowerBound}-${upperBound}`}
                </Text>
              </View>
              <Text style={styles.textColor}>BREATH PER MINUTE</Text>
            </View>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View style={[styles.imageContainer, styles.fitToSize]}>
            <Image
              source={VITALS_BREATH}
              style={styles.imageStyle}
              resizeMode={"stretch"}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: containerColor,
    minHeight: 200,
    width,
  },
  defaultRateContainer: {
    backgroundColor: subContainerColor,
    margin: 10,
    padding: 10,
  },
  defaultRateLine: {
    flexDirection: "row",
  },
  fitToSize: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: subContainerColor,
  },
  imageStyle: {
    width,
  },
  rateContainer: {
    flexGrow: 0.6,
    padding: 10,
  },
  subContainer: {
    flex: 1,
    flexDirection: "row",
    height: 80,
  },
  // eslint-disable-next-line react-native/no-color-literals
  textColor: {
    color: "white",
  },
  textDefaultColor: {
    color: defaultTextColor,
    marginTop: 5,
  },
  textMakeBold: {
    fontWeight: "bold",
  },
  textShowLargeForDefault: {
    fontSize: 20,
    marginRight: 5,
  },
  valueContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  valueDetailsContainer: {
    paddingLeft: 3,
  },
  // eslint-disable-next-line react-native/no-color-literals
  valueTextDetails: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  valueTextStyle: {
    color: normalGreen,
    fontSize: 42,
    lineHeight: 50,
  },
});

const mapStateToProps = state => {
  return {};
};

RespiratoryRate.propTypes = {
  user: PropTypes.number,
  range: {
    lowerBound: PropTypes.number,
    upperBound: PropTypes.number,
  },
  normalRange: {
    lowerBound: PropTypes.number,
    upperBound: PropTypes.number,
  },
  respiratoryRate: PropTypes.object,
};

export default connect(mapStateToProps, {})(RespiratoryRate);
