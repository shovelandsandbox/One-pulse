/* eslint-disable */
import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { DETAIL_ARROW } from "../../config/images";
import PropTypes from "prop-types";
import { Theme } from "../../themes";
const { Colors, Fonts } = Theme;
import { makeTouchable } from "../../hocs";
const TouchableView = makeTouchable(View);
export default class DetailArrowCell extends Component {
  render() {
    const {
      labelText,
      onPress,
      hideArrow,
      textStyleOverride,
      numberOfLines,
      event,
      rightLabel,
      showRightText,
      heightProp,
      highlightRightText
    } = this.props;
    return (
      <View style={{ width: "100%" }}>
        <TouchableView
          event={event}
          onPress={onPress}
          style={{
            flexDirection: "row",
            height: heightProp || 64,
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <Text
            style={
              textStyleOverride || {
                flex: 1,
                // height: 22,
                color: Colors.grey515B61,
                fontFamily: Fonts.Avenir,
                fontSize: 16,
                fontWeight: highlightRightText ? "400": "900"
                // lineHeight: 22
              }
            }
            numberOfLines={numberOfLines || 1}
          >
            {labelText}
          </Text>
          {!hideArrow && <Image style={{ height: 16 }} source={DETAIL_ARROW} />}
          {showRightText &&
            <Text
              style={
                textStyleOverride || {
                  flex: 1,
                  // height: 22,
                  color: Colors.grey515B61,
                  fontFamily: Fonts.Avenir,
                  fontSize: 16,
                  fontWeight: highlightRightText? "900":"400",
                  textAlign: "right"
                  // lineHeight: 22
                }
              }
              numberOfLines={numberOfLines || 1}
            >
              {rightLabel}
            </Text>
          }
        </TouchableView>

        <View
          style={{
            backgroundColor: Colors.greyd9dcde,
            height: 1
          }}
        />
      </View>
    );
  }
}

DetailArrowCell.PropTypes = {
  labelText: PropTypes.string,
  onPress: PropTypes.func,
  hideArrow: PropTypes.bool,
  textStyleOverride: PropTypes.object,
  numberOfLines: PropTypes.number
};

DetailArrowCell.defaultProps = {
  hideArrow: false
};
