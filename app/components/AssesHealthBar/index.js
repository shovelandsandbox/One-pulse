import React, { PureComponent } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import { CoreConstants, metaHelpers } from "@pru-rt-internal/pulse-common";
import { Theme } from "../../themes";
import { configureLineHeight } from "../../utils/lineHeightsUtils";
const { Colors, Fonts } = Theme;
const { BABYLON_CHATBOT, BABYLON_MIN, BABYLON_ABOUT } = CoreConstants;
export default class AssesHealthBar extends PureComponent {
  render() {
    let { onPress, Info, Numeral } = this.props;
    let About = metaHelpers.findElement(BABYLON_CHATBOT, BABYLON_ABOUT).label;
    let Min = metaHelpers.findElement(BABYLON_CHATBOT, BABYLON_MIN).label;
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: Colors.greyEEEEEE,
          borderRadius: 4,
          flexDirection: "row",
          justifyContent: "space-between",
          height: 44,
          alignItems: "center",
          marginTop: 5,
          paddingLeft: 12,
          paddingRight: 12
        }}
        onPress={() => {
          onPress && onPress();
        }}
      >
        <Text
          style={{
            ...{
              fontFamily: Fonts.AvenirHeavy,
              fontSize: 16,
              color: Numeral ? Colors.grey515B61 : Colors.grey596268
            },
            ...configureLineHeight("16")
          }}
        >
          {Info}
        </Text>
        {Numeral && (
          <View
            style={{
              fontFamily: Fonts.AvenirHeavy,
              fontSize: 12,
              lineHeight: 20,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text
              style={{
                color: Colors.grey7D7D7D
              }}
            >
              {About}{" "}
            </Text>
            <Text
              style={{
                color: Colors.pulseRed
              }}
            >
              {Numeral}
            </Text>
            <Text
              style={{
                color: Colors.grey7D7D7D
              }}
            >
              {" "}
              {Min}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

AssesHealthBar.propTypes = {
  Info: PropTypes.string.isRequired,
  Numeral: PropTypes.string,
  onPress: PropTypes.func.isRequired
};
