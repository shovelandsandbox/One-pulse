import React, { PureComponent } from "react";
import { View, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { isNil } from "ramda";
import styles from "./styles";

export default class AssessmentProgressBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  horizontalLine(color, value) {
    return <View style={[color, { flex: value / 100 }]} />;
  }

  circle() {
    return <View style={[styles.circle, { left: this.state.circleLeft }]} />;
  }

  layoutChanged = input => {
    if (isNil(this.state.circleLeft)) {
      const { value } = this.props;
      const { nativeEvent } = input;
      const { layout } = nativeEvent;
      const { width } = layout;
      const circleLeft = (width * value) / 100;
      this.setState({
        circleLeft,
      });
    }
  };

  render() {
    return (
      <View style={styles.rowFlex} onLayout={this.layoutChanged}>
        {this.horizontalLine(styles.green, this.props.green)}
        {this.horizontalLine(styles.orange, this.props.orange)}
        {this.horizontalLine(styles.red, this.props.red)}
        {this.circle()}
      </View>
    );
  }
}

AssessmentProgressBar.propTypes = {
  green: PropTypes.number.isRequired,
  red: PropTypes.number.isRequired,
  orange: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
