/* eslint-disable react-native/no-unused-styles */
import React, { PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { safeMetaLabelFinder } from "../../../utils/meta-utils";

class SdnnColumnView extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { numberColor, textColor, min, max } = this.props;
    const textStyles = getTextStyle({ numberColor, textColor });
    return (
      <View>
        <View style={styles.parentView}>
          <View style={styles.otherColumns}>
            <View style={styles.textColumnLeft}>
              <View>
                <Text style={[styles.textDecoration, textStyles.textColor]}>
                  {min}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.midColumn}>
            <Text style={[styles.textDecoration, textStyles.textColor]}>-</Text>
          </View>
          <View style={styles.otherColumns}>
            <View style={styles.textColumnRight}>
              <View>
                <Text style={[styles.textDecoration, textStyles.textColor]}>
                  {max}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={[styles.textDecoration, textStyles.textColor]}>
            {safeMetaLabelFinder("heartRateVariability", "normalRange")}
          </Text>
        </View>
      </View>
    );
  }
}

const getTextStyle = ({ numberColor, textColor }) =>
  StyleSheet.create({
    numberColor: {
      color: numberColor,
    },
    textColor: {
      color: textColor,
      fontSize: 14,
    },
  });

const styles = StyleSheet.create({
  midColumn: {
    flexGrow: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  otherColumns: {
    flexGrow: 1,
  },
  parentView: {
    flexDirection: "row",
  },
  textColumnLeft: {
    flexDirection: "row-reverse",
  },
  textColumnRight: {
    flexDirection: "row",
  },
  textDecoration: {
    flexGrow: 0,
    fontWeight: "bold",
    textAlign: "center",
  },
});

SdnnColumnView.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  numberColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default SdnnColumnView;
