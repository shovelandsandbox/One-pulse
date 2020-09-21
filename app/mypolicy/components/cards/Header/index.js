/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Colors, Sizes } from "../../../configs";
import Styles from "./style";
import { TextMX } from "../../derivatives/Text";
import Icon from "../../generics/Icon";
import PulseImageHeader from "../../../../mypolicy/components/containers/PulseImageHeader";

export default class Base extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  renderLeftButton() {
    if (!this.props.onLeftPress) {
      return null;
    }

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1000
        }}
      >
        <TouchableOpacity
          style={Styles.button.navBack}
          onPress={
            this.props.onLeftPress ? () => this.props.onLeftPress() : () => { }
          }
        >
          <Icon
            name="back"
            color={
              !this.props.inverse ? Colors.main.iconGray : Colors.main.baseWhite
            }
          />
          <Text style={{ color: Colors.main.baseWhite }}>{this.props.showTitle}</Text>
        </TouchableOpacity>

        {
          // !this.props.disablePruIcon && <View style={{ alignItems: "flex-end" }}>
          //   {/* <PulseImageHeader /> */}
          // </View>
        }
      </View>
    );
  }

  renderRightButton() {
    if (!this.props.onRightPress && !this.props.rightContentRender) {
      return null;
    }

    if (this.props.rightContentRender) {
      return this.props.rightContentRender;
    }

    return (
      <TouchableOpacity
        style={[Styles.button.container, { alignItems: "flex-end" }]}
        onPress={
          this.props.onRightPress ? () => this.props.onRightPress() : () => { }
        }
      >
        <Icon
          name="close"
          color={
            !this.props.inverse ? Colors.main.iconGray : Colors.main.baseWhite
          }
        />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View
        style={[
          Styles.grouper,
          this.props.floating
            ? {
              position: "absolute",
              top: Sizes.isIphoneX
                ? 44
                : this.props.isModal && Sizes.isAndroid
                  ? 0
                  : 20
            }
            : {},
          this.props.noPadding ? { paddingVertical: 0 } : {},
          this.props.backgroundColor
            ? { backgroundColor: this.props.backgroundColor }
            : {},
          this.props.backgroundColorCustom
            ? { backgroundColor: this.props.backgroundColorCustom }
            : {}
        ]}
      >
        {this.renderLeftButton()}

        <View style={Styles.title.container}>
          <TextMX
            color={
              this.props.inverse ? Colors.main.baseWhite : Colors.main.fontGray
            }
            ellipsizeMode={"tail"}
            numberOfLines={1}
          >
            {this.props.title}
          </TextMX>
        </View>

        {this.renderRightButton()}
      </View>
    );
  }
}
