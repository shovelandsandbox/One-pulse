import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Colors } from "../../../configs";
import Styles from "./style";
import { TextS } from "../../derivatives/Text";
import { Padder as PadderContainer } from "../../containers";

export default class SimpleListRow extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <View
        style={[
          this.props.hideBorder ? Styles.containerNoBorder : Styles.container,
          this.props.backgroundColor
            ? { backgroundColor: this.props.backgroundColor }
            : {},
        ]}
      >
        <PadderContainer style={Styles.innerContainer}>
          <TextS color={Colors.main.baseGray}>{this.props.label}</TextS>
          <TextS style={{ lineHeight: 20 }}>{this.props.value}</TextS>
        </PadderContainer>
      </View>
    );
  }
}

SimpleListRow.propTypes = {
  backgroundColor: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};
