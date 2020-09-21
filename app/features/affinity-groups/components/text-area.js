import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import PropTypes from "prop-types";
import Colors from "../utils/colors";

export default class TextArea extends PureComponent {
  static defaultProps = {
    maxLength: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      count: +(!!props.defaultValue && props.defaultValue.length),
    };
  }

  onChangeText = text => {
    const { onChangeText } = this.props;

    this.setState({ count: text.length });

    if (onChangeText) onChangeText(text);
  };

  renderCount() {
    const { maxLength } = this.props;
    const { count } = this.state;

    if (!maxLength) return null;

    return <Text style={styles.count}>{`${count}/${maxLength}`}</Text>;
  }

  render() {
    const { containerStyle, maxLength, ...rest } = this.props;
    if (maxLength) {
      rest.maxLength = maxLength;
    }
    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput
          multiline
          {...rest}
          onChangeText={this.onChangeText}
          ref={ref => (this.ref = ref)}
        />
        {this.renderCount()}
      </View>
    );
  }
}

TextArea.propTypes = {
  containerStyle: PropTypes.object,
  maxLength: PropTypes.number,
  onChangeText: PropTypes.func,
  defaultValue: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: "100%",
  },
  count: {
    bottom: 8,
    color: Colors.lightGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 10,
    position: "absolute",
    right: 2,
  },
});
