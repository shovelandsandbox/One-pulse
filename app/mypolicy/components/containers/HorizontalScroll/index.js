//#region IMPORTS

// PACKAGE IMPORTS
import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import PropTypes from "prop-types";

// LOCAL & CONFIG IMPORTS
import Styles from "./style";

//#endregion

export default class HorizontalScroll extends Component {
  //#region PROPTYPES, CONSTRUCTOR, AND LIFECYCLE HOOKS

  static propTypes = {
    children: PropTypes.any,
    itemSpacing: PropTypes.number,
    style: PropTypes.instanceOf(Object),
  };

  static defaultProps = {
    children: null,
    itemSpacing: 0,
    style: {},
  };

  shouldComponentUpdate(nextProps) {
    return this.props != nextProps;
  }

  //#endregion

  renderItems() {
    if (!this.props.children) {
      return null;
    }

    return this.props.children.map((child, index) => {
      if (index < this.props.children.length - 1) {
        const style = {
          marginRight: this.props.itemSpacing ? this.props.itemSpacing : 0,
        };
        child = (
          <View key={index} style={[Styles.wrapper, style]}>
            {child}
          </View>
        );
      }

      return child;
    });
  }

  render() {
    return (
      <ScrollView
        style={[Styles.list.container, this.props.style]}
        {...this.props}
        contentContainerStyle={Styles.list.contentContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {this.renderItems()}
      </ScrollView>
    );
  }
}
