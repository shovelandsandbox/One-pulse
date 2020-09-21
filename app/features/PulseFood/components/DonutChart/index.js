import React, { Component } from 'react';
import Pie from "react-native-pie";
import { Text, View, StyleSheet } from "react-native"
import MetaConstants from "../../meta";
import { pathOr } from "ramda";

class DonutChart extends Component {
  constructor(props) {
    super(props);
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() }
  }
  render() {
    const calories = parseFloat(pathOr(0, ["mealPlanData", "mealPlan", "calories"], this.props)).toFixed(2);

    return (
      <>
        <View style={styles.donutContainer}>

          <View style={styles.donutTextContainer}>
            <Text style={styles.donutValueText}>
              {
                calories
              }
            </Text>
            <Text style={[styles.donutText,{fontSize: 10, flex: 1,}]}>
              {this.metaConstants.kcal}
            </Text>
            <Text style={[styles.donutText,{fontSize: 10, flex: 1,}]}>
              {this.metaConstants.calIntake}
            </Text>
          </View>

          <Pie
            radius={80}
            innerRadius={64}
            series={[100]}
            colors={["#ec1c2e", "#e8e8e8"]}
          >
          </Pie>
        </View>


      </>

    )
  }
}

const styles = StyleSheet.create({
  donutContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8
  },
  donutTextContainer: {
    position: "absolute",
    zIndex: 1,
  },
  donutText: {
    color: "#888888",
    textAlign: "center"
  },
  donutValueText: {
    color: "#313131",
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center"
  },
  calorieIntakeText: {
    color: "#313131",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 16
  }
});

export default DonutChart;