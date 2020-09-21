import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";

class PruIcon extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { color, size, type, name } = this.props; //eslint-disable-line
    return (
      <View>
        <Icon
          name={name}
          type={type}
          color={color ? color : "red"}
          size={size ? size : 20}
        />
      </View>
    );
  }
}

PruIcon.PropTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number
};
export default PruIcon;
