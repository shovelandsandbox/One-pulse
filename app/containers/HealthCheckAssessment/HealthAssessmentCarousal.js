import React from "react";
import { View } from "react-native";
import BuildProfile from "./BuildProfile";
import GetStarted from "./GetStarted";
import {
  CoreConfig,
  CoreComponents,
} from "@pru-rt-internal/pulse-common";
const { height, width } = CoreConfig;
const { CarouselView } = CoreComponents;

class HealthAssessmentCarousal extends React.PureComponent {
  render() {
    return (
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <CarouselView
          count={2}
          indicatorOffset={35}
          animate={false}
          width={width}
          height={"100%"}
        >
          <View
            style={{
              width: width,
              height: height - 63,
            }}
          >
            <BuildProfile data={this.props} />
          </View>
          <View
            style={{
              width: width,
              height: height - 63,
            }}
          >
            <GetStarted data={this.props} />
          </View>
        </CarouselView>
      </View>
    );
  }
}

export default HealthAssessmentCarousal;
