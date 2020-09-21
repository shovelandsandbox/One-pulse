import React, { Component } from "react";
import { View, Text } from "react-native";
import { Theme } from "../../themes";
const { Colors, Fonts } = Theme;

class PruProgressSteps extends Component {
  createSteps = steps => {
    const stepHeight = this.props.height ? this.props.height : 30;
    return steps.map((value, index) => {
      return (
        <View
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {index > 0 && index < steps.length - 1 && (
              <View
                style={[{
                  borderBottomWidth: 1,
                  borderColor: Colors.pulseRed,
                  width: "100%",
                  position: "absolute",

                  flex: 1,
                  top: stepHeight / 2
                }, this.props.stepsStyle]}
              ></View>
            )}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1
              }}
            >
              <View
                style={[{
                  height: stepHeight,
                  width: stepHeight,
                  backgroundColor: Colors.pulseRed,
                  borderRadius: stepHeight / 2,
                  justifyContent: "center",
                  alignItems: "center"
                }, this.props.stepsStyle]}
              >
                <Text style={[{ color: Colors.white }, this.props.stepsNumberStyle]}>{value.stepNumber}</Text>
              </View>
              <Text style={[{ textAlign: "center", color: Colors.pulseRed }, this.props.stepNameStyle]}>{value.stepName}</Text>
            </View>
            {index < steps.length - 1 && (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.pulseRed,
                  width: "100%",
                  position: "absolute",
                  left: "50%",
                  flex: 1,
                  top: stepHeight / 2
                }}
              ></View>
            )}
          </View>
        </View>
      );
    });
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          margin: 5,
          flex: 1
        }}
      >
        {this.createSteps(this.props.steps)}
      </View>
    );
  }
}

export default PruProgressSteps;
