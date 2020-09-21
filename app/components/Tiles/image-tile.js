import React, { PureComponent } from "react";
import { Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";
export default class ImageTile extends PureComponent {
  render() {
    const {
      properties: { uri },
      handler,
      style,
    } = this.props;
    const { width, ...rest } = style;
    return (
      <TouchableOpacity onPress={() => handler("click")}>
        <FastImage
          // defaultSource={{ uri }}
          source={{
            uri,
            // cache: FastImage.cacheControl.web,
            // headers: {
            //   "if-modified-since": moment(this.props.timeStamp).format(
            //     "ddd, DD MMM YYYY HH:mm:ss Z"
            //   ),
            // },
          }}
          style={rest}
          // resizeMode="stretch"
          resizeMode={FastImage.resizeMode.stretch}
        />
      </TouchableOpacity>
    );
  }
}

ImageTile.propTypes = {
  properties: PropTypes.object,
  handler: PropTypes.func,
  style: PropTypes.object,
};

ImageTile.defaultProps = {};
