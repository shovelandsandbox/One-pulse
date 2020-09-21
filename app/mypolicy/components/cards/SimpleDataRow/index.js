import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Colors } from "../../../configs";
import Styles from "./style";
import { TextM, TextS } from "../../derivatives/Text";
import { Padder as PadderContainer } from "../../containers";

export default class SimpleDataRow extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  static renderValue(value, index = 0) {
    return (
      <TextM key={index} style={Styles.value}>
        {value}
      </TextM>
    );
  }

  renderMain() {
    let noteRender = null;
    if (this.props.note) {
      noteRender = (
        <TextS color={Colors.main.baseGray}>{this.props.note}</TextS>
      );
    }

    let valueRender = SimpleDataRow.renderValue(this.props.value);
    if (Array.isArray(this.props.value)) {
      valueRender = this.props.value.map((value, index) => {
        return SimpleDataRow.renderValue(value, index);
      });
    }

    return (
      <View>
        <View style={{ height: 32 }}>
          <TextS color={Colors.main.baseGray}>{this.props.label}</TextS>
        </View>

        {valueRender}

        {noteRender}
      </View>
    );
  }

  render() {
    const noBottomBorder = { borderBottomWidth: 0 };
    if (this.props.noPadding) {
      return (
        <View style={[Styles.container, this.props.noBorder && noBottomBorder]}>
          {this.renderMain()}
        </View>
      );
    }

    return (
      <View style={[Styles.container, this.props.noBorder && noBottomBorder]}>
        <PadderContainer>{this.renderMain()}</PadderContainer>
      </View>
    );
  }
}

SimpleDataRow.propTypes = {
  note: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  noPadding: PropTypes.bool,
  noBorder: PropTypes.bool,
};
