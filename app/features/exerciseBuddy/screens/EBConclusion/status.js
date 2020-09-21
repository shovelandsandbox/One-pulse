import React, { Fragment } from "react";
import { Image, Text, View } from "react-native";

import Styles from "./styles";
import getConstants from "./constants";

import { determineLevel } from "../../utils/utilityFunction";
import images from "../../../../images/ExerciseBuddy";

const determineMoreOrLess = (level, bestVal, val) => {
  if (level === "more") {
    return ` (+ ${val-bestVal})`
  } 
  if (level === "less") {
    return ` (- ${bestVal-val})`
  }
  return;
}

const determineVal = (level, val, bestVal, units) => {
  if (level === "new" && val === "Previous Best") {
    return '-'
  }
  if (val === "Previous Best") {
    return bestVal;
  }
  if (val === "Current") {
    return units;
  }
  return '00:30';
}

const Stats = ({ bestVal, units, type = "Squats", level }) => {
  const exeUnits = units.get(type);
  const Constants = getConstants();

  return (
    <View style={[Styles.absolute, Styles.stats, Styles.flexRow, Styles.spaceBetween]}>
      {
        Constants.statsFields.map(val => {
          return (
            <View style={Styles.statsContent} key={val}>
              {/* {
                (val === "Current" && level === "more") &&
                (
                  <View style={Styles.crown}>
                    <Image src={images.crown} />
                  </View>
                )
              } */}
              <Text style={[Styles.font14, Styles.day]}>{val}</Text>
              <View style={[Styles.flexRow]}>
                <Text style={[Styles.day, Styles.boldText, Styles.font33]}>
                  {determineVal(level, val, bestVal, exeUnits)}
                </Text>
                {
                  val === "Current" &&
                  <Text style={[Styles.font14, Styles.supportNum]}>
                    {determineMoreOrLess(level, bestVal, exeUnits)}
                  </Text>
                }
              </View>
              <Text style={[Styles.font14, Styles.day]}>{type}</Text>
            </View>
          )
        })
      }
    </View>
  )
}

export default Status = props => {
  const {level, val} = determineLevel(props);
  const Constants = getConstants();

  return (
    <Fragment>
      <View style={[Styles.absolute, Styles.statusText]}>
        <Text style={[Styles.font20, Styles.boldText, Styles.centerText, Styles.day]}>
          {Constants[level].main}
        </Text>
        <Text style={[Styles.font14, Styles.centerText, Styles.day]}>
          {Constants[level].subText}
        </Text>
      </View>
      <Stats {...props} level={level} bestVal={val} />
    </Fragment>
  )
};
