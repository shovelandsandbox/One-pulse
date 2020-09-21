import React from "react";
import { View, TouchableOpacity } from "react-native";
import Svg, { LinearGradient, Rect, Defs, Stop } from "react-native-svg";
import { Theme } from "../../themes";

const { Colors } = Theme;

class PruLinearGradient extends React.PureComponent {
  render() {
    const borderRadius = this.props.style.borderRadius;

    return (
      <TouchableOpacity>
        <View style={{ ...this.props.style, borderRadius }}>
          <Svg height="100%" width="100%">
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="50%">
                <Stop
                  offset=".5"
                  stopColor={this.props.style.stopColor1}
                  stopOpacity="1"
                />
                <Stop
                  offset="2"
                  stopColor={this.props.style.stopColor2}
                  stopOpacity="2"
                />
              </LinearGradient>
            </Defs>
            <Rect
              rx={borderRadius}
              ry={borderRadius}
              width="100%"
              height="100%"
              fill="url(#grad)"
            />
          </Svg>
        </View>
      </TouchableOpacity>
    );
  }
}

PruLinearGradient.defaultProps = {
  style: {
    height: 150,
    borderColor: Colors.greyC7c7c7,
    borderWidth: 0.3,
    backgroundColor: Colors.white,
    margin: 10,
    elevation: 3.7,
    borderRadius: 25,
    stopColor1: Colors.white,
    stopColor2: Colors.greyE8e8e8
  }
};

export default PruLinearGradient;
