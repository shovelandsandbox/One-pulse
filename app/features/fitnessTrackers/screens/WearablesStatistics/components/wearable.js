/* eslint-disable  react/require-optimization */
import React from "react";
import { ScrollView } from "react-native";
import styles from "../styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import metaKeys from "../../../screenMetaKeys";
import actions from "../../../configs/actionNames";
import screens from "../../../configs/screenNames";
import { pathOr, filter, isEmpty } from "ramda";
import { ActivityChart } from "./ActivityChart";
import { ActivitySummary } from "./ActivitySummary";
import {
  CALORIES_INACTIVE_LOGO,
  BICYCLE_INACTIVE_ICON,
  SWIM_INACTIVE_LOGO,
  STEPS_ACTIVE_LOGO,
  CALORIES_ACTIVE_LOGO,
  BICYCLE_ACTIVE_ICON,
  SWIM_ACTIVE_LOGO,
  STEPS_INACTIVE_LOGO,
  SLEEP_INACTIVE_LOGO,
  SLEEP_ACTIVE_LOGO,
  HEART_INACTIVE_LOGO,
  HEART_ACTIVE_LOGO,
  DISTANCE_INACTIVE_ICON,
  DISTANCE_ACTIVE_ICON,
  STEPS_FITNESS_LOGO,
  DURATION_FITNESS_LOGO,
  DURATION_ACTIVE_LOGO,
  DURATION_INACTIVE_LOGO,
  CALORIES_FITNESS_LOGO,
  HEART_LOGO,
  DISTANCE_FITNESS_LOGO,
  SWIM_LOGO,
  SLEEP_LOGO,
  BICYCLE_LOGO,
} from "../../../../../config/images";

const activities = [
  {
    title: "Distance",
    type: "distance",
    selected: false,
    image: DISTANCE_INACTIVE_ICON,
    activeImage: DISTANCE_ACTIVE_ICON,
    logo: DISTANCE_FITNESS_LOGO,
    name: "Distance",
  },
  {
    title: "Active Mins",
    type: "duration",
    selected: false,
    image: DURATION_INACTIVE_LOGO,
    activeImage: DURATION_ACTIVE_LOGO,
    logo: DURATION_FITNESS_LOGO,
    name: "Active Mins",
  },
  {
    title: "Steps",
    type: "steps",
    selected: false,
    image: STEPS_INACTIVE_LOGO,
    activeImage: STEPS_ACTIVE_LOGO,
    logo: STEPS_FITNESS_LOGO,
    name: "Steps",
  },
  {
    title: "Calories",
    type: "calories",
    selected: false,
    image: CALORIES_INACTIVE_LOGO,
    activeImage: CALORIES_ACTIVE_LOGO,
    logo: CALORIES_FITNESS_LOGO,
    name: "Calories",
  },
  {
    title: "Swimming",
    type: "swimming",
    selected: false,
    image: SWIM_INACTIVE_LOGO,
    activeImage: SWIM_ACTIVE_LOGO,
    logo: SWIM_LOGO,
    name: "Swimming",
  },
  {
    title: "Heart Rate",
    type: "heartrate",
    selected: false,
    image: HEART_INACTIVE_LOGO,
    activeImage: HEART_ACTIVE_LOGO,
    logo: HEART_LOGO,
    name: "Heart Rate",
  },
  {
    title: "Sleep",
    type: "sleep",
    selected: false,
    image: SLEEP_INACTIVE_LOGO,
    activeImage: SLEEP_ACTIVE_LOGO,
    logo: SLEEP_LOGO,
    name: "Sleep",
  },
  {
    title: "Cycling",
    type: "cycling",
    selected: false,
    image: BICYCLE_INACTIVE_ICON,
    activeImage: BICYCLE_ACTIVE_ICON,
    logo: BICYCLE_LOGO,
    name: "Cycling",
  },
];

class WearablesStatistics extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedActivity: "",
      selectedRange: "today",
    };

    this._findDeviceName = this._findDeviceName.bind(this);
  }

  componentDidMount() {
    this.props.getAllConnectedWearables();
  }

  static getDerivedStateFromProps(nextProps, currentState) {
    const defaultSelectedActivity = pathOr(
      "",
      ["activityTrends", "0", "categories", "0", "type"],
      nextProps
    );

    if (isEmpty(currentState.selectedActivity)) {
      return {
        selectedActivity: defaultSelectedActivity,
      };
    }
    return currentState;
  }

  _findDeviceName(obj) {
    return (
      pathOr("", ["wearable", "wearableType", "type"], obj) ===
      this.props.wearableType
    );
  }

  _getCleanData(metricsObj) {
    return {
      ...metricsObj.defaultMetric,
      ...metricsObj.type,
    };
  }

  _transformAttributes(attributes, type) {
    const result = [];
    for (const [key, value] of Object.entries(attributes)) {
      result.push({
        label: key,
        value:
          type === "steps" ? Math.round(value.value) : parseFloat(value.value),
      });
    }
    return result;
  }

  _getSelectedActivityData(activities, activityTrends) {
    const { selectedActivity } = this.state;
    const selectedType = filter(
      activity => activity.type === selectedActivity,
      activities
    );
    if (
      !isEmpty(selectedType) &&
      !isEmpty(activityTrends) &&
      activityTrends[0].categories
    ) {
      const type = selectedType[0].type;
      const title = selectedType[0].title;
      const selectedTrend = filter(
        category => category.type === type,
        activityTrends[0].categories
      );
      if (!isEmpty(selectedTrend)) {
        const trend = selectedTrend[0];
        return {
          data: this._transformAttributes(trend.attributes, type),
          selectedActivity: {
            type: trend.type,
            value: trend.value,
            metrics: trend.metrics,
            title,
          },
        };
      }
    }
    return {
      data: [],
      selectedActivity: {},
    };
  }

  _fetchForRangeFilter(rangeFilter, type) {
    this.props.getActivityTrends({
      tab: isEmpty(this.props.wearableType) ? type : this.props.wearableType,
      endTime: rangeFilter.endTime ? rangeFilter.endTime() : null,
      startTime: rangeFilter.startTime(),
      frequency: rangeFilter.frequency,
    });
  }

  onActivityFilterChange(selectedFilter) {
    this.setState({
      selectedActivity: selectedFilter.type,
    });
  }

  onRangeFilterChange(selectedFilter) {
    this.setState({
      selectedRange: selectedFilter.type,
    });
    this._fetchForRangeFilter(selectedFilter);
  }

  render() {
    const {
      customerActivitiesList,
      wearableList,
      wearableType,
      activityTrends,
      rangeFilters,
    } = this.props;
    const wearableActivities = customerActivitiesList.find(
      this._findDeviceName
    );

    const summaryData = pathOr([], ["summaryMetrics"], wearableActivities);

    const activitiesData = pathOr([], ["activities"], wearableActivities).map(
      this._getCleanData
    );

    const wearable =
      wearableList.find(wearable => wearable.type === wearableType) || {};

    const { selectedActivity, data } = this._getSelectedActivityData(
      activities,
      activityTrends
    );

    const activitiesArr = [];
    const headerData = pathOr([], ["0", "categories"], activityTrends);

    headerData.forEach(item => {
      const icon = activities.find(x => x.type === item.type);
      icon && activitiesArr.push(icon);
      if (!icon) {
        activitiesArr.push({
          title: item.type,
          type: item.type,
          selected: false,
        });
        activities.push({
          title: item.type,
          type: item.type,
          selected: false,
        });
      }
    });

    const config = {
      rangeFilters,
      activities: activitiesArr,
    };

    return (
      <ScrollView style={styles.CONTAINER}>
        <ActivitySummary
          data={[...summaryData, ...activitiesData]}
          config={activities}
          status={wearable.status}
          type={wearableType}
        />
        <ActivityChart
          data={data}
          config={config}
          onRangeFilterChange={this.onRangeFilterChange.bind(this)}
          onActivityFilterChange={this.onActivityFilterChange.bind(this)}
          selectedActivity={selectedActivity}
          selectedRange={this.state.selectedRange}
        />
      </ScrollView>
    );
  }
}

WearablesStatistics.propTypes = {
  getActivityTrends: PropTypes.func,
  getCustomerActivities: PropTypes.func,
  getAllConnectedWearables: PropTypes.func,
  customerActivitiesList: PropTypes.object,
  activityTrends: PropTypes.array,
  wearableType: PropTypes.string,
  wearableList: PropTypes.object,
  rangeFilters: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    customerActivitiesList: pathOr(
      [],
      ["FitnessTrackersReducer", "customerActivitiesList"],
      state
    ),
    activityTrends: pathOr(
      [],
      ["FitnessTrackersReducer", "activityTrends"],
      state
    ),
    wearableList: pathOr([], ["FitnessTrackersReducer", "wearableList"], state),
  };
};

export default connect(mapStateToProps, {
  getCustomerActivities: () => ({
    context: screens.WEARABLES_STATISTICS,
    type: actions.getCustomerActivities,
  }),
  getAllConnectedWearables: () => ({
    context: screens.WEARABLES_STATISTICS,
    type: actions.getAllCustomerWearables,
    disableTimeout: true,
  }),
  getActivityTrends: payload => ({
    context: screens.WEARABLES_STATISTICS,
    type: actions.getActivityTrends,
    payload,
  }),
})(WearablesStatistics);
