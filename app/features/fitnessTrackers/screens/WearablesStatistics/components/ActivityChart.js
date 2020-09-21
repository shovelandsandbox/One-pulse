import React from "react";
import PropTypes from "prop-types";
import { BarChart } from "./BarChart";
import metaKeys from "../../../screenMetaKeys";
import { filter, isEmpty } from "ramda";
import { ActivitySelector } from "./ActivitySelector";
import styles, { spacing, fontSize, colors } from "../styles";
import { safeMetaLabelFinder } from "../../../../../utils/meta-utils";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const renderHeaderTitle = rangeFilters => {
  const selectedFilter = filter(
    rangeFilter => rangeFilter.selected,
    rangeFilters
  );
  const titleKey = isEmpty(selectedFilter)
    ? metaKeys.statistics.todaysActivity
    : selectedFilter[0].metaKey;
  return (
    <Text style={{ ...styles.TEXT, ...compStyles.headerText }}>
      {safeMetaLabelFinder(metaKeys.screenName, titleKey)}
    </Text>
  );
};
const isSelected = (selectedActivity, activity) => {
  return selectedActivity.type == activity.type;
};

const renderActivityFilters = (
  activities,
  selectedActivity,
  onActivityFilterChange
) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {activities.map((activity, index) => (
        <ActivitySelector
          key={index}
          title={activity.title}
          image={activity.image}
          onPress={() => onActivityFilterChange(activity)}
          selected={isSelected(selectedActivity, activity)}
          activeImage={activity.activeImage}
        />
      ))}
    </ScrollView>
  );
};

const renderChartSection = (selectedActivity, data) => {
  return (
    <View style={compStyles.chartContainer}>
      <View style={compStyles.chartTitleContainer}>
        <Text style={compStyles.chartTitleLabel}>{selectedActivity.title}</Text>
        <Text style={compStyles.chartTitleValue}>
          {selectedActivity.type === "steps"
            ? Math.round(selectedActivity.value)
            : selectedActivity.value.toFixed(2)}
        </Text>
        <Text style={compStyles.chartTitleUnit}>
          {selectedActivity.metrics}
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={compStyles.chartArea}
      >
        <BarChart maxHeight={100} rows={data} />
      </ScrollView>
    </View>
  );
};

const renderRangeFilters = (
  rangeFilters,
  selectedRange,
  onRangeFilterChange
) => {
  return (
    <View style={compStyles.rangeFilterContainer}>
      {rangeFilters.map((value, index) => {
        const isFirst = index == 0;
        const selected = value.type === selectedRange;
        const isLast = index + 1 == rangeFilters.length;

        const textStyle = selected
          ? compStyles.rangeFilterActiveText
          : compStyles.rangeFilterText;
        const viewStyle = compStyles.rangeFilter(isFirst, isLast, selected);

        return (
          <TouchableOpacity
            key={index}
            style={{ ...viewStyle }}
            onPress={() => onRangeFilterChange(value)}
          >
            <Text style={textStyle}>
              {safeMetaLabelFinder(metaKeys.screenName, value.metaKey)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const ActivityChart = ({
  config,
  selectedActivity,
  data = [],
  onRangeFilterChange,
  onActivityFilterChange,
  selectedRange,
}) => {
  if (data.length < 1) {
    return <View></View>;
  }
  return (
    <View style={compStyles.activityChartSummary}>
      {renderHeaderTitle(config.rangeFilters)}
      {renderActivityFilters(
        config.activities,
        selectedActivity,
        onActivityFilterChange
      )}
      {renderChartSection(selectedActivity, data)}
      {renderRangeFilters(
        config.rangeFilters,
        selectedRange,
        onRangeFilterChange
      )}
    </View>
  );
};

ActivityChart.propTypes = {
  config: {
    activities: PropTypes.object,
    rangeFilters: PropTypes.object,
  },
  selectedActivity: {
    type: PropTypes.string,
    value: PropTypes.string,
    metrics: PropTypes.string,
  },
  data: PropTypes.arrayOf({
    label: PropTypes.string,
    value: PropTypes.number,
  }),
  onRangeFilterChange: PropTypes.func,
  onActivityFilterChange: PropTypes.func,
};

ActivityChart.defaultProps = {
  config: {
    activities: [],
    rangeFilters: [],
  },
  selectedActivity: {},
  data: [],
};

const compStyles = StyleSheet.create({
  activityChartSummary: {
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 5,
    marginTop: spacing.small,
    paddingBottom: 30,
    paddingTop: spacing.base,
    shadowColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 8,
  },

  chartArea: {
    alignSelf: "stretch",
    backgroundColor: colors.chartAreaBG,
    flexGrow: 1,
    height: "100%",
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 100,
    paddingTop: 5,
  },
  chartContainer: {
    backgroundColor: colors.chartAreaBG,
    flex: 1,
    flexDirection: "row",
    paddingRight: 10,
  },
  chartTitleContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.chartTitleBG,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 100,
    minWidth: 100,
  },
  chartTitleLabel: {
    color: colors.black,
    fontSize: fontSize.small,
  },
  chartTitleUnit: {
    color: colors.unitTextColor,
    fontSize: fontSize.small,
  },
  chartTitleValue: {
    color: colors.boldTextColor,
    fontWeight: "bold",
  },

  headerText: {
    fontSize: fontSize.large,
    marginBottom: 10,
    marginLeft: 18,
  },

  rangeFilter: (isFirst, isLast, active) => ({
    alignItems: "center",
    color: colors.textColor,
    flex: 1,
    flexDirection: "column",
    height: 35,
    paddingVertical: 10,
    borderBottomLeftRadius: isFirst ? 8 : 0,
    borderBottomRightRadius: isLast ? 8 : 0,
    justifyContent: "center",
    backgroundColor: active ? colors.pulseRed : colors.white,
  }),
  rangeFilterActiveText: {
    color: colors.white,
  },
  rangeFilterContainer: {
    flexDirection: "row",
    height: 35,
  },
  rangeFilterText: {
    color: colors.textColor,
    fontSize: fontSize.small,
  },
});
