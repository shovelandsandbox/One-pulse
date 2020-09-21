/* eslint-disable react-native/no-unused-styles */
import React, { PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

class HeartBeatThreeColumnView extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { numberColor, textColor, min, max } = this.props;
    const textStyles = getTextStyle({ numberColor, textColor });
    return (
      <View style={styles.parentView}>
        <View style={styles.otherColumns}>
          <View style={styles.textColumnLeft}>
            <View>
              <Text style={[styles.textDecoration, textStyles.numberColor]}>
                {min}
              </Text>
              <Text style={[styles.textDecoration, textStyles.textColor]}>
                MIN
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.midColumn}>
          <Text></Text>
          <Text style={[styles.textDecoration, textStyles.textColor]}>-</Text>
        </View>
        <View style={styles.otherColumns}>
          <View style={styles.textColumnRight}>
            <View>
              <Text style={[styles.textDecoration, textStyles.numberColor]}>
                {max}
              </Text>
              <Text style={[styles.textDecoration, textStyles.textColor]}>
                MAX
              </Text>
            </View>
          </View>
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

HeartBeatThreeColumnView.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  numberColor: PropTypes.string,
  textColor: PropTypes.string,
}

export default HeartBeatThreeColumnView;
