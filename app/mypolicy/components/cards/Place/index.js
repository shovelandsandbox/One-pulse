/*
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 *  IMPORTS
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 */

// ----------------------------------------
// PACKAGE IMPORTS
// ----------------------------------------
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
  PanResponder,
  Animated
} from "react-native";

// ----------------------------------------
// LOCAL & CONFIG IMPORTS
// ----------------------------------------
import { Colors, Sizes } from "../../../configs";
import Styles from "./style";

// ----------------------------------------
// COMPONENT IMPORTS
// ----------------------------------------
import { TextMX, TextM, TextS } from "../../derivatives/Text";
import Icon from "../../generics/Icon";

/*
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 *  MAIN CLASS
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 */
export default class Place extends Component {
  // ----------------------------------------
  // ----------------------------------------
  // CONSTRUCTOR AND LIFE CYCLES
  // ----------------------------------------

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  // ----------------------------------------
  // ----------------------------------------
  // METHODS
  // ----------------------------------------

  getTitle() {
    let composedTitle = [];

    if (this.props.searchQuery) {
      let title = this.props.title.split(this.props.searchQuery);
      title = title.map((titleSplit, splitIndex) => {
        composedTitle.push(<TextM key={splitIndex}>{titleSplit}</TextM>);

        if (splitIndex < title.length - 1) {
          composedTitle.push(
            <TextMX key={splitIndex + "x"}>{this.props.searchQuery}</TextMX>
          );
        }
      });
    } else {
      composedTitle = this.props.title;
    }

    return composedTitle;
  }

  // ----------------------------------------
  // ----------------------------------------
  // RENDERS
  // ----------------------------------------

  _renderIcon(isLoading = false) {
    if (this.props.type === "hospital" && !isLoading) {
      let selectedStarRender = null;
      if (this.props.isFeatured) {
        selectedStarRender = (
          <View style={Styles.starMark.container}>
            <Icon name="star-white" size={16} color={Colors.main.baseWhite} />
            <Icon
              name="star-white"
              size={14}
              color={Colors.icon.heart}
              style={Styles.starMark.innerStar}
            />
          </View>
        );
      }

      return (
        <View style={Styles.icon.container}>
          <Icon name="hospital-location" color={Colors.icon.pin} size={29} />

          {selectedStarRender}
        </View>
      );
    }

    return (
      <View
        style={[
          Styles.icon.container,
          {
            backgroundColor: !isLoading
              ? Colors.main.baseRed
              : Colors.main.borderGray
          }
        ]}
      >
        <Icon name="my-location" color={Colors.main.baseWhite} />
      </View>
    );
  }

  // ----------------------------------------

  _renderAddress() {
    if (this.props.type === "hospital") {
      const subDetail =
        this.props.distance + "  •  " + this.props.partnershipType;

      return (
        <View>
          <TextS color={Colors.main.inactiveGray} style={{ marginBottom: 8 }}>
            {subDetail}
          </TextS>

          <TextS
            color={Colors.main.inactiveGray}
            ellipsizeMode={"tail"}
            numberOfLines={3}
          >
            {this.props.address}
          </TextS>
        </View>
      );
    }

    return (
      <TextS
        color={Colors.main.inactiveGray}
        ellipsizeMode={"tail"}
        numberOfLines={2}
      >
        {this.props.address}
      </TextS>
    );
  }

  // ----------------------------------------

  _renderLoading() {
    return (
      <View style={[Styles.container, { borderBottomWidth: 0 }]}>
        <View style={Styles.icon.outerContainer}>{this._renderIcon(true)}</View>

        <View style={Styles.detail.container}>
          <View style={Styles.loading.title.container}>
            <View style={Styles.loading.title.content} />
            <View
              style={[
                Styles.loading.title.content,
                { backgroundColor: Colors.main.baseWhite }
              ]}
            />
          </View>

          <View style={Styles.loading.description} />

          <View style={Styles.loading.description} />

          <View style={Styles.loading.description} />
        </View>
      </View>
    );
  }

  // ----------------------------------------
  // ----------------------------------------
  // MAIN RENDER
  // ----------------------------------------

  render() {
    if (this.props.isLoading) {
      return this._renderLoading();
    }

    return (
      <TouchableOpacity
        style={[
          Styles.container,
          this.props.noBorder ? { borderBottomWidth: 0 } : {}
        ]}
        onPress={this.props.onPress ? () => this.props.onPress() : () => {}}
      >
        <View style={Styles.icon.outerContainer}>{this._renderIcon()}</View>

        <View style={Styles.detail.container}>
          <TextM ellipsizeMode={"tail"} numberOfLines={1}>
            {this.getTitle()}
          </TextM>

          {this._renderAddress()}
        </View>
      </TouchableOpacity>
    );
  }

  // ----------------------------------------
}
