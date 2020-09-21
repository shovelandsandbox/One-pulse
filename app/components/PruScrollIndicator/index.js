/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from "react";
import { View, Animated, Easing } from "react-native";

class PruScrollIndicator extends PureComponent {
  state = {
    height: new Animated.Value(0),
  };

  animate = () => {
    Animated.timing(this.state.height, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
    }).start();
  };

  componentDidMount() {
    this.animate();
  }

  createCounters = pages => {
    return pages.map((item, index) => {
      return (
        <Animated.View
          key={index}
          style={{
            height: 5.7,
            width: 5.7,
            borderRadius: 3,
            backgroundColor: index === this.props.index ? "#838b9a" : "#d0d0d0",
            marginHorizontal: 3,
          }}
        ></Animated.View>
      );
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          marginBottom: 5,
        }}
      >
        {this.createCounters(this.props.pages)}
      </View>
    );
  }
}

export default PruScrollIndicator;
