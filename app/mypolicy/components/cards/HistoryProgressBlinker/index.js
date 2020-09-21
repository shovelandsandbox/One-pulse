import React, { Component } from "react";
import { Animated } from "react-native";
import Styles from "./style";

export default class HistoryProgressBlinker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      top: new Animated.Value(this.props.top),
      left: new Animated.Value(this.props.left),
      size: new Animated.Value(this.props.size),
    };
  }

  componentDidMount() {
    const sizeModifier = this.props.maxSize - this.props.size;
    const positionModifier = -(sizeModifier / 2);

    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          this.animate(this.state.top, this.props.top + positionModifier),
          this.animate(this.state.left, this.props.left + positionModifier),
          this.animate(this.state.size, this.props.size + sizeModifier),
        ]),

        Animated.parallel([
          this.animate(this.state.top, this.props.top),
          this.animate(this.state.left, this.props.left),
          this.animate(this.state.size, this.props.size),
        ]),
      ])
    ).start();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    if (this.state != nextState) {
      return true;
    }

    return false;
  }

  animate(object, newValue) {
    return Animated.timing(object, {
      toValue: newValue,
      duration: 700,
      delay: 0,
    });
  }

  render() {
    if (!this.props.isActive) {
      return null;
    }

    return (
      <Animated.View
        style={[
          Styles.blinker,
          { backgroundColor: this.props.color },
          {
            top: this.state.top,
            left: this.state.left,
            width: this.state.size,
            height: this.state.size,
          },
        ]}
      />
    );
  }
}
