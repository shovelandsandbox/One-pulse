/**
 * Example Usage:
 * 
 * const indicator = 20;
 * const colorRanges = [
      {range: 25, color: Colors.green},
      {range: 5, color: Colors.blue},
      {range: 9, color: Colors.amber},
      {range: 11, color: Colors.red}
    ];
 * const range = [...Array(50).keys()];
 * <PruRagIndicator
          indicator={indicator}
          range={range}
          colorRanges={colorRanges}
        ></PruRagIndicator>
 */

import React, { Component } from "react";
import { View, Text } from "react-native";
import _ from "lodash";
import pruRagIndicatorStyle from "./styles";

class PruRagIndicator extends Component {

  render() {
    const { range, value, colorRanges } = this.props;
    return (
    <View style={pruRagIndicatorStyle.mainContainer}>
        { this.props.ticksRequired &&
           <View style={pruRagIndicatorStyle.absoluteSubContainer}>
           {
               range.map((item) => (
                 (item % 10 !== 0) ? 
                       <Text style={pruRagIndicatorStyle.smallTicks}>|</Text> :
                       <Text style={pruRagIndicatorStyle.bigTicks}>|</Text>
               ))
           }
           </View>
        }
        <View style={pruRagIndicatorStyle.indicatorContainer}>
        {
            range.map((item) => (
                (item == value) ?
                    <Text style={pruRagIndicatorStyle.indicatorTick}>|</Text> :
                    <Text></Text>
            ))
        }
        </View>
        {
            colorRanges.map((item, index) => (
                index === 0 ? 
                    <View style={[{flex: item.range, backgroundColor: item.color}, pruRagIndicatorStyle.roundupStartingBox]}></View> :
                    index === colorRanges.length - 1 ? 
                        <View style={[{flex: item.range, backgroundColor: item.color}, pruRagIndicatorStyle.roundupEndingBox]}></View> :
                        <View style={{flex: item.range, backgroundColor: item.color}}></View>
            ))
        }
      </View>
    );
  }
}

export default PruRagIndicator;
