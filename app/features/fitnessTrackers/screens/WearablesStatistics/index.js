import React, { PureComponent } from "react";
import WearableTab from "./components/wearable";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import FontIcon from "react-native-vector-icons/FontAwesome";
import { fontSize } from "./styles";
import {
  GOOGLE_FIT_ICON_ACTIVE,
  GOOGLE_FIT_ICON,
  FITBIT_ICON,
  FITBIT_ICON_ACTIVE,
  GARMIN_ICON,
  GARMIN_ICON_ACTIVE,
  APPLEHEALTH_ICON,
  APPLEHEALTH_ICON_ACTIVE,
} from "../../../../config";
import screenNames from "../../configs/screenNames";
import { connect } from "react-redux";
import { pathOr, isEmpty } from "ramda";
import metaKeys from "../../screenMetaKeys";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import actions from "../../configs/actionNames";
import { Theme } from "../../../../themes";
import moment from "moment";
const { Colors } = Theme;

const dateFormat = "YYYY-MM-DD";
export const rangeFilters = [
  {
    name: "Today",
    type: "today",
    selected: true,
    metaKey: metaKeys.statistics.todaysActivity,
    frequency: "hourly",
    startTime: () =>
      moment()
        .startOf("day")
        .format(dateFormat),
    title: "Today's Activity",
  },
  {
    name: "Last 7 Days",
    type: "day7",
    metaKey: metaKeys.statistics.weeksActivity,
    frequency: "daily",
    endTime: () => moment().format(dateFormat),
    startTime: () =>
      moment()
        .subtract(7, "d")
        .format(dateFormat),
    title: "This Week's Activity",
  },
  {
    name: "Last 15 Days",
    type: "day15",
    frequency: "daily",
    metaKey: metaKeys.statistics.lastFifteenDaysActivity,
    endTime: () => moment().format(dateFormat),
    startTime: () =>
      moment()
        .subtract(15, "d")
        .format(dateFormat),
    title: "Last 15 Day's Activity",
  },
];

class WearablesStatisticsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "",
    };
  }

  componentDidMount() {
    this.props.getAllWearables();
  }

  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.iconContainerLeft}
          onPress={() => this.props.gotoMainTab()}
        >
          <FontIcon
            raised
            name="chevron-left"
            size={20}
            color={Colors.blizzardBlue}
          />
        </TouchableOpacity>
        <Text style={{ flex: 1, ...styles.TEXT, fontSize: fontSize.large }}>
          {safeMetaLabelFinder(
            metaKeys.screenName,
            metaKeys.statistics.wearables
          )}
        </Text>
        <Icon
          name="md-settings"
          type="ionicon"
          color="#8a8a8a"
          containerStyle={{ paddingHorizontal: "5%" }}
          onPress={() => this.props.onSettingPress()}
        />
      </View>
    );
  };

  onTabPress = key => {
    this.setState({ selectedTab: key });
    this.props.getCustomerActivities({ tab: key });
    // this._fetchForRangeFilter(rangeFilters[0], key);
  };

  _fetchForRangeFilter(rangeFilter, key) {
    this.props.getActivityTrends({
      tab: key,
      endTime: rangeFilter.endTime ? rangeFilter.endTime() : null,
      startTime: rangeFilter.startTime(),
      frequency: rangeFilter.frequency,
    });
  }

  renderTabHeaderItem = ({ title, key, image, imageFocused }, isActive) => {
    const style = [styles.toggleText];
    const icon = isActive ? imageFocused : image;
    if (isActive) {
      style.push({ fontWeight: "bold", color: "red" });
    }

    return (
      <TouchableOpacity
        onPress={() => this.onTabPress(key)}
        style={styles.toggleButtonArea}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Image
            source={icon}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
          <Text style={style}>{title}</Text>
        </View>
        {isActive && <View style={styles.groupSelectedLine}></View>}
      </TouchableOpacity>
    );
  };

  renderTabHeader = () => {
    const TABS = [
      {
        key: "googlefit",
        title: safeMetaLabelFinder(metaKeys.screenName, "googlefit"),
        imageFocused: GOOGLE_FIT_ICON_ACTIVE,
        image: GOOGLE_FIT_ICON,
      },
      {
        key: "fitbit",
        title: safeMetaLabelFinder(metaKeys.screenName, "fitbit"),
        imageFocused: FITBIT_ICON_ACTIVE,
        image: FITBIT_ICON,
      },
      {
        key: "garmin",
        title: safeMetaLabelFinder(metaKeys.screenName, "garmin"),
        imageFocused: GARMIN_ICON_ACTIVE,
        image: GARMIN_ICON,
      },
      {
        key: "applehealth",
        title: safeMetaLabelFinder(metaKeys.screenName, "applehealth"),
        imageFocused: APPLEHEALTH_ICON_ACTIVE,
        image: APPLEHEALTH_ICON,
      },
    ];

    const { wearableList } = this.props;
    const { selectedTab } = this.state;

    if (wearableList.length === 0) {
      return null;
    }

    const activeTab = wearableList.find(x => x.status === "ACTIVE");

    if (isEmpty(selectedTab) && activeTab && activeTab.type) {
      this.setState({ selectedTab: activeTab.type });
    }

    const wearableListArr = [];

    TABS.forEach(item => {
      const icon = wearableList.find(x => x.type === item.key);
      icon && wearableListArr.push(item);
    });

    const tabs = wearableListArr.map(tab => {
      const isActive = tab.key === this.state.selectedTab;
      return this.renderTabHeaderItem(tab, isActive);
    });

    return <View style={styles.toggleButtonStyle}>{tabs}</View>;
  };

  renderBody = () => {
    return (
      <View style={styles.body}>
        <WearableTab
          wearableType={this.state.selectedTab}
          rangeFilters={rangeFilters}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderHeader()}
        {this.renderTabHeader()}
        {this.renderBody()}
      </View>
    );
  }
}

WearablesStatisticsContainer.propTypes = {
  getAllWearables: PropTypes.func,
  wearableList: PropTypes.array,
  gotoMainTab: PropTypes.func,
  onSettingPress: PropTypes.func,
  getCustomerActivities: PropTypes.func,
  getActivityTrends: PropTypes.func,
};

const mapDispatchToProps = {
  getCustomerActivities: payload => ({
    context: screenNames.WEARABLES_STATISTICS,
    type: actions.getCustomerActivities,
    payload,
  }),
  getActivityTrends: payload => ({
    context: screenNames.WEARABLES_STATISTICS,
    type: actions.getActivityTrends,
    payload,
  }),
  getAllWearables: () => ({
    context: screenNames.WEARABLE_LIST,
    type: actions.getAllSupportedWearables,
    disableTimeout: true,
  }),
  gotoMainTab: () => ({ type: "GO_TO_SCREEN", navigateTo: "MainTab" }),
  onSettingPress: () => ({
    type: "GO_TO_SCREEN",
    navigateTo: screenNames.WEARABLE_LIST,
  }),
};

const mapStateToProps = state => {
  return {
    customerConnectedWearables: pathOr(
      [],
      ["FitnessTrackersReducer", "customerConnectedWearables"],
      state
    ),
    wearableList: pathOr([], ["FitnessTrackersReducer", "wearableList"], state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WearablesStatisticsContainer);

const styles = StyleSheet.create({
  TEXT: {
    color: Colors.black,
    fontSize: 15,
    marginLeft: 10,
  },
  body: {
    flex: 1,
    width: Dimensions.get("screen").width,
  },
  groupSelectedLine: {
    borderBottomColor: Colors.red,
    borderBottomWidth: 3,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: Colors.white,
    elevation: 5,
    flexDirection: "row",
    padding: 10,
  },
  iconContainerLeft: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
  },
  toggleButtonArea: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  toggleButtonStyle: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  toggleText: {
    color: Colors.black,
    fontSize: 14,
    paddingVertical: 10,
    textAlign: "center",
  },
});
