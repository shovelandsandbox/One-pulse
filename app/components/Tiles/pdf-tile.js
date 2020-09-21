import React, { PureComponent } from "react";
import { Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

export default class PdfTile extends PureComponent {
  render() {
    const {
      properties: { uri },
      handler,
      style,
    } = this.props;
    const { width, ...rest } = style;
    return (
      <TouchableOpacity onPress={() => handler("click")}>
        <Image source={{ uri: uri }} style={rest} resizeMode="stretch" />
      </TouchableOpacity>
    );
  }
}

PdfTile.propTypes = {
  properties: PropTypes.object,
  handler: PropTypes.func,
  style: PropTypes.object,
};

PdfTile.defaultProps = {};
