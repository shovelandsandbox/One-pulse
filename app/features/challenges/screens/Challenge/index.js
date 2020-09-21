import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FOOT_PRINT, BOTTOM_BG_IMAGE } from "../../../../config";
import { BarChart } from "./components/BarChart";
import screens from "../../configs/screen-names";
import actions from "../../configs/actions";
import { connect } from "react-redux";
import { pathOr, path, filter, isEmpty } from "ramda";
import { Theme } from "../../../../themes";
import LEADERBOARD from "../../../../../assets/images/challenges/leaderboard.png";
import moment from "moment";
import LEFT_ARROW from "../../../../../assets/images/challenges/leftArrow.png";
import HTML from "react-native-render-html";
import { metaFinderChallenges } from "../../utils/meta-utils";
import { getActivityMetrics } from "../../utils/challenge-utils";
import { CoreServices, CoreActionTypes } from "@pru-rt-internal/pulse-common";
const { NavigationService } = CoreServices;
import LinearGradient from "react-native-linear-gradient";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";

const { height } = Dimensions.get("window");

const { Colors } = Theme;

class ChallengesContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getChallengeActivityTrends } = this.props;
    const challenge = this.getChallenge();
    const params = {
      type: "WEARABLE",
      tab: challenge.id,
      frequency: "daily",
    };

    getChallengeActivityTrends(params);
  }

  getChallengeDatesInFormat = (challenge, format) => {
    const startDate = moment(
      path(["groupActivity", "startTime"], challenge)
    ).format(format);
    const endDate = moment(
      path(["groupActivity", "endTime"], challenge)
    ).format(format);
    return { startDate, endDate };
  };
  getChallenge = () => {
    return pathOr(
      {},
      ["navigation", "state", "params", "challenge"],
      this.props
    );
  };

  renderHeader = challenge => {
    const { name, icon = {} } = challenge;
    const header = `<span style='color:white'>${metaFinderChallenges(
      name + "_header"
    )}</span>`;
    const challengeType = `<span style='color:white'>${metaFinderChallenges(
      name + "_challengeType"
    )}</span>`;

    return (
      <View>
        <ImageBackground
          source={{ uri: icon.url }}
          resizeMode="cover"
          style={styles.headerImage}
          imageStyle={styles.headerImageStyle}
        >
          <TouchableOpacity
            style={styles.leftArrow}
            onPress={() => NavigationService.goBack()}
          >
            <Image source={LEFT_ARROW} />
          </TouchableOpacity>
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.72)", "rgba(0, 0, 0, 0.41)"]}
            style={styles.gradientContainerHeader}
          >
            <View>
              <HTML html={header} />
              <HTML html={challengeType} />
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  };

  getChallengeTimeline = () => {
    const challenge = this.getChallenge();

    const { startDate, endDate } = this.getChallengeDatesInFormat(
      challenge,
      "DD-MMM-YYYY"
    );
    const totalDays = moment(endDate).diff(moment(startDate), "days");
    const timeline = [];
    for (let i = 0; i <= totalDays; i++) {
      const date = moment(startDate).add(i, "days");
      timeline.push(moment(date).format("MMM-DD"));
    }
    return timeline;
  };

  transformAttributes(attributes, type) {
    const timeline = this.getChallengeTimeline();
    const result = [];
    for (let i = 0; i < timeline.length; i++) {
      const date = timeline[i];
      const metric = attributes[date] || { value: null };
      result.push({
        label: date,
        value:
          type === "steps"
            ? Math.round(metric.value)
            : parseFloat(metric.value),
      });
    }
    return result;
  }

  getSelectedActivityData(activityTrends) {
    if (!isEmpty(activityTrends) && activityTrends[0].categories) {
      const type = this.getChallenge().unitName;
      const selectedTrend = filter(
        category => category.type === type,
        activityTrends[0].categories
      );
      if (!isEmpty(selectedTrend)) {
        const trend = selectedTrend[0];
        return this.transformAttributes(trend.attributes, type);
      }
    }
    return this.transformAttributes({});
  }

  getTrendsData = (activityTrends, challenge) => {
    const myTotalValue = pathOr(
      0,
      ["attributes", "totalMetricCount"],
      challenge
    );
    const myTodayValue = pathOr(
      0,
      ["attributes", "todayMetricCount"],
      challenge
    );
    const metrics = getActivityMetrics(challenge);
    const { value: targetValue } = metrics;
    const remainingValue = targetValue - myTotalValue;
    const challengeType = `<span style='color:black'>${metaFinderChallenges(
      challenge.name + "_challengeType"
    )}</span>`;

    const { startDate, endDate } = this.getChallengeDatesInFormat(
      challenge,
      "DD MMM, YYYY"
    );

    const data = this.getSelectedActivityData(activityTrends);

    return {
      myTotalValue,
      myTodayValue,
      remainingValue,
      challengeType,
      targetValue,
      startDate,
      endDate,
      data,
    };
  };

  renderChart() {
    const challenge = this.getChallenge();
    const { activityTrends } = this.props;
    const {
      myTotalValue,
      myTodayValue,
      remainingValue,
      challengeType,
      targetValue,
      startDate,
      endDate,
      data,
    } = this.getTrendsData(activityTrends, challenge);

    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>
          {metaFinderChallenges("overallProgress")}
        </Text>
        <View style={styles.chartTargetContainer}>
          <View style={styles.currentProgressValue}>
            <Text style={styles.currentValueText}>{myTotalValue}</Text>
            <Text style={styles.currentLabelText}>
              {challenge.unit + metaFinderChallenges("completed")}
            </Text>
          </View>
          <View style={styles.remainingValue}>
            <Text style={styles.remainingValueText}>{remainingValue}</Text>
            <Text style={styles.remainingLabelText}>
              {challenge.unit + metaFinderChallenges("remaining")}
            </Text>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.chartArea}
          >
            <BarChart
              maxHeight={140}
              rows={data}
              trends={activityTrends}
              challenge={challenge}
            />
          </ScrollView>
          <View style={styles.chartBottomBar}></View>
        </View>
        <View style={styles.chartTargetContainer}>
          <View style={styles.chartTitleContainer}>
            <Text style={styles.startDate}>{startDate}</Text>
          </View>
          <View style={styles.chartTitleContainer}>
            <HTML html={challengeType} />
          </View>
          <View style={styles.chartTitleContainer}>
            <Text style={styles.endDate}>{endDate}</Text>
          </View>
        </View>
        <View style={styles.targetContainer}>
          <ImageBackground source={BOTTOM_BG_IMAGE} style={styles.bgImage}>
            <View style={styles.activityIconContainer}>
              <View style={styles.activityIconWrapper}>
                <Image
                  source={FOOT_PRINT}
                  style={styles.activityIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.activityStatisticsContainer}>
              <View style={styles.currentActivity}>
                <Text style={styles.statText}>{myTodayValue}</Text>
                <Text style={styles.text}>
                  {metaFinderChallenges("todays") + challenge.unit}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }

  renderLeaderBoardIcon = challenge => {
    return (
      <TouchableOpacity
        style={styles.leaderboardContainer}
        onPress={() => this.goToLeaderBoard(challenge)}
      >
        <Image source={LEADERBOARD} />
      </TouchableOpacity>
    );
  };

  goToLeaderBoard = challenge => {
    this.props.registerEvent(eventNames.leaderboard, {
      communityId: challenge.id,
      communityName: challenge.name,
      completionDate: moment(),
    });
    const unit = pathOr(
      "",
      ["groupActivity", "criteria", "activities", "0", "metrics", "0", "unit"],
      challenge
    );
    this.props.goToLeaderBoard({ ...challenge, unit });
  };

  renderDateSection = challenge => {
    const startDate = moment(
      path(["groupActivity", "startTime"], challenge)
    ).format("DD MMM YYYY");
    const endDate = moment(
      path(["groupActivity", "endTime"], challenge)
    ).format("DD MMM YYYY");
    return (
      <View style={[styles.rowAlign, styles.dateView]}>
        <View style={styles.rowAlign}>
          <View>
            <Text style={styles.dateHeader}>
              {metaFinderChallenges("startDateCaps")}
            </Text>
            <Text style={styles.dateSubHeader}>{startDate}</Text>
          </View>
          <View style={styles.dateSeperator} />
          <View>
            <Text style={styles.dateHeader}>
              {metaFinderChallenges("endDateCaps")}
            </Text>
            <Text style={styles.dateSubHeader}>{endDate}</Text>
          </View>
        </View>
        {this.renderLeaderBoardIcon(challenge)}
      </View>
    );
  };

  render() {
    const challenge = this.getChallenge();
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.renderHeader(challenge)}
        {this.renderDateSection(challenge)}
        {this.renderChart()}
      </ScrollView>
    );
  }
}

ChallengesContainer.propTypes = {
  getChallengeActivityTrends: PropTypes.func,
  registerEvent: PropTypes.func,
  goToLeaderBoard: PropTypes.func,
  activityTrends: PropTypes.array,
};

const mapDispatchToProps = {
  getChallengeActivityTrends: payload => ({
    context: screens.CHALLENGE_DETAILS,
    type: actions.getChallengeActivityTrends,
    payload,
  }),
  goToLeaderBoard: group => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: screens.LEADERBOARD,
    payload: {
      params: {
        group,
      },
    },
  }),
  gotoMainTab: () => ({ type: "GO_TO_SCREEN", navigateTo: "MainTab" }),
  registerEvent,
};

const mapStateToProps = state => {
  return {
    activityTrends: pathOr([], ["challenges", "activityTrends"], state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChallengesContainer);

const styles = StyleSheet.create({
  activityIcon: {
    height: 20,
    width: 20,
  },
  activityIconContainer: {
    alignContent: "center",
    flex: 1,
    flexDirection: "row",
    maxHeight: 40,
  },
  activityIconWrapper: {
    backgroundColor: Colors.pulseRed,
    borderRadius: 40,
    height: 40,
    justifyContent: "center",
    padding: 10,
    width: 40,
  },
  activityStatisticsContainer: {
    alignContent: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  bgImage: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    resizeMode: "cover",
  },
  chartArea: {
    alignSelf: "stretch",
    flexGrow: 1,
    height: "100%",
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 100,
    paddingTop: 5,
  },
  chartBottomBar: {
    alignSelf: "stretch",
    backgroundColor: Colors.pulseRed,
    borderRadius: 5,
    minHeight: 5,
  },
  chartContainer: {
    height: 140,
    minHeight: 140,
  },
  chartTargetContainer: {
    flex: 3,
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 10,
  },
  chartTitleContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  currentActivity: {
    alignItems: "center",
    padding: 15,
  },
  currentLabelText: {
    color: Colors.black,
    fontSize: 12,
    lineHeight: 14,
  },
  currentProgressValue: {
    alignSelf: "flex-start",
  },
  currentValueText: {
    color: Colors.black,
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 14,
  },
  dateHeader: {
    color: "rgb(142, 142, 142)",
    fontSize: 11,
    lineHeight: 13,
  },
  dateSeperator: {
    borderColor: "rgb(142, 142, 142)",
    borderRightWidth: 1,
    marginHorizontal: 25,
  },
  dateSubHeader: {
    color: "rgb(64, 64, 64)",
    fontSize: 14,
    lineHeight: 16,
  },
  dateView: {
    alignItems: "center",
    backgroundColor: Colors.chablis,
    borderColor: "rgba(0, 0, 0, 0.16)",
    borderWidth: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  divider: {
    borderLeftColor: Colors.grayaf,
    borderLeftWidth: 1,
    height: 40,
    marginBottom: 15,
    marginTop: 15,
  },
  endDate: {
    fontSize: 12,
    textAlign: "right",
  },
  gradientContainerHeader: {
    alignItems: "center",
    bottom: 0,
    flexDirection: "row",
    height: 47,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    width: "100%",
  },
  headerImage: { height: 199.5, paddingTop: 60, width: "100%" },
  headerImageStyle: {
    height: 199.5,
    width: "100%",
  },
  leaderboardContainer: {
    alignItems: "center",
    backgroundColor: Colors.pulseRed,
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  leftArrow: {
    height: 40,
    marginLeft: 20,
    position: "absolute",
    top: height * 0.05,
    width: 40,
  },
  progressContainer: {
    backgroundColor: Colors.white,
    flex: 0,
    flexDirection: "column",
    padding: 15,
    minHeight: 350,
  },
  progressTitle: {
    alignSelf: "center",
    color: Colors.pulseRed,
    fontSize: 15,
    fontWeight: "bold",
  },
  remainingLabelText: {
    color: Colors.black,
    fontSize: 12,
    lineHeight: 14,
    textAlign: "right",
  },
  remainingValue: {
    marginLeft: "auto",
  },
  remainingValueText: {
    color: Colors.black,
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 14,
    textAlign: "right",
  },
  rowAlign: { flexDirection: "row" },
  startDate: {
    fontSize: 12,
  },
  statText: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: "bold",
  },
  targetActivity: {
    alignItems: "center",
    padding: 15,
  },
  targetContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: "column",
    height: 200,
    marginTop: 30,
  },
  text: {
    color: Colors.black,
  },
});
