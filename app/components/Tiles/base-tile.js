import React, { PureComponent } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

export default class BaseTile extends PureComponent {
  render() {
    const { style } = this.props;
    return (
      <View style={{ ...style.container, ...style.common }}>
        {this.props.children}
      </View>
    );
  }
}

BaseTile.propTypes = {
  style: PropTypes.object,
  children: PropTypes.object,
};

BaseTile.defaultProps = {
  containerStyle: {},
};
