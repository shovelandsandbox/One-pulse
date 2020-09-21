import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Styles from "./style";

export default class Padder extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <View style={[Styles.container, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}

Padder.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};
