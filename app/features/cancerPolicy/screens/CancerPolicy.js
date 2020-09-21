import React, { PureComponent } from "react";
import { path, isNil, isEmpty, pathOr } from "ramda";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cancerPolicyScreens from "../configs/screen-names";
import cancerPolicyActions from "../configs/actions";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { formatCurrency } from "../../../utils";
import { metaFinderCP } from "../utils/meta-utils";

class CancerPolicy extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      jsxStyles = {},
      simCountry,
      moneyFormat,
      transactionDetails = [],
      stepProgress,
    } = this.props;
    const amount = transactionDetails.reduce(
      (curr = 0, item) => curr + item.amount,
      0
    );

    const daysRemain =
      100 -
      (transactionDetails.filter(
        transaction => transaction.transactionType === "DailyStepBooster"
      ).length || 0);

    const referralCount = pathOr(0, ["referralCount"], stepProgress);
    const todaySteps = pathOr(0, ["summaryMetrics", "steps"], stepProgress);

    const remainingSteps = pathOr(
      0,
      ["summaryMetrics", "remainingSteps"],
      stepProgress
    );

    const targetValue = remainingSteps + todaySteps;
    const progress = targetValue === 0 ? 1 : todaySteps / targetValue;

    return (
      <View style={jsxStyles.mainContainer}>
        <View style={jsxStyles.sumAssured}>
          <Text style={jsxStyles.textStyle}>
            {formatCurrency(amount, simCountry, moneyFormat)}
          </Text>
          <Text style={jsxStyles.textLabelStyle}>
            {metaFinderCP("bonusSumAssured")}
          </Text>
        </View>
        <View style={jsxStyles.stepsContainer}>
          <View style={jsxStyles.stepDetails}>
            <View style={jsxStyles.stepWrapper}>
              <Text style={[jsxStyles.stepStyle, jsxStyles.boldText]}>
                {todaySteps}
              </Text>
              <Text style={[jsxStyles.stepStyle, jsxStyles.leftAlign]}>
                {metaFinderCP("todaysSteps")}
              </Text>
            </View>
            <View style={jsxStyles.stepWrapper}>
              <Text style={[jsxStyles.stepStyle, jsxStyles.boldText]}>
                {remainingSteps}
              </Text>
              <Text style={[jsxStyles.stepStyle, jsxStyles.rightAlign]}>
                {metaFinderCP("stepsRemaining")}
              </Text>
            </View>
          </View>
          <View styles={[jsxStyles.stepProgress]}>
            <Progress.Bar
              progress={progress}
              style={jsxStyles.progressBar}
              borderWidth={0}
              color={"#ec1c2e"}
              unfilledColor={"#ececec"}
            />
          </View>
          <View style={jsxStyles.stepDetails}>
            <View style={jsxStyles.otherDetails}>
              <Text style={[jsxStyles.stepStyle, jsxStyles.boldText]}>
                {referralCount}
              </Text>
              <Text style={[jsxStyles.stepStyle, jsxStyles.leftAlign]}>
                {metaFinderCP("friendsReferred")}
              </Text>
            </View>
            <View
              style={[jsxStyles.otherDetails, { justifyContent: "flex-end" }]}
            >
              <Text style={[jsxStyles.stepStyle, jsxStyles.boldText]}>
                {daysRemain}
              </Text>
              <Text style={[jsxStyles.stepStyle, jsxStyles.rightAlign]}>
                {metaFinderCP("daysRemaining")}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

CancerPolicy.propTypes = {
  jsxStyles: PropTypes.Object,
  transactionDetails: PropTypes.array,
  simCountry: PropTypes.string,
  moneyFormat: PropTypes.string,
  stepProgress: PropTypes.Object,
};

const mapStateToProps = state => ({
  simCountry: pathOr("", ["auth", "countryInfo", "simCountry"], state),
  moneyFormat: path(["meta", "countryCommonMeta", "moneyFormat"], state),
  transactionDetails: pathOr([], ["cancerPolicy", "transactionDetails"], state),
  stepProgress: pathOr({}, ["commonData", "daily-progress"], state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CancerPolicy);
