/* eslint-disable react/jsx-key */
import React from "react";
import { View, ScrollView } from "react-native";
import _ from "lodash";
import PropTypes from "prop-types";
import TableRowTitle from "../TableRowTitle";
import TableColumnTitle from "../TableColumnTitle";
import DoseCompletedTile from "../DoseCompletedTile";
import DosePendingTile from "../DosePendingTile";
import DoseReminderTile from "../DoseReminderTile";
import styles from "./styles";
import moment from "moment";
import { metaFinderVaccinationCalendar } from "../../configs/meta-utils";
import { ELEMENT_KEY_VACCINE } from "../../configs/metaConstant";

const DOB_DISPLAY_FORMAT = "YYYY-MM-DD";

const uniqByProp = prop => arr =>
  Array.from(
    arr
      .reduce(
        (acc, item) => (item && item[prop] && acc.set(item[prop], item), acc), // using map (preserves ordering)
        new Map()
      )
      .values()
  );

const isCurrentDate = plannedDate => {
  const currentDate = moment(new Date(), DOB_DISPLAY_FORMAT).format(
    DOB_DISPLAY_FORMAT
  );
  return currentDate === plannedDate;
};

const getHeaderData = vaccines => {
  const uniqueById = uniqByProp("plannedSchedule");
  const modifiedHeader = uniqueById(vaccines);

  return modifiedHeader.map(schedule => {
    let isCompleted = true;
    let isCurrent = false;
    vaccines.map(vaccine => {
      if (schedule.plannedSchedule === vaccine.plannedSchedule) {
        if (isCurrentDate(vaccine.plannedDate)) {
          isCurrent = true;
        }
        if (!vaccine.administered) {
          isCompleted = false;
        }
      }
    });
    return { ...schedule, isCompleted: isCompleted, isCurrentDate: isCurrent };
  });
};

//Displays header names of the table
const renderHeader = headerData => {
  const vaccineLabel = metaFinderVaccinationCalendar(ELEMENT_KEY_VACCINE);
  return (
    <View style={{ flexDirection: "row" }}>
      <TableRowTitle title={vaccineLabel} />
      {headerData.map(item => {
        return (
          <TableColumnTitle
            title={item.plannedSchedule}
            isCurrentDate={item.isCurrentDate}
            isCompleted={item.isCompleted}
          />
        );
      })}
    </View>
  );
};

//Displays row data
const renderRow = (headerData, vaccines, onBellPress, onTickPress) => {
  const groupedVaccine = _.groupBy(vaccines, item => item.name);

  const table = [];
  for (const rowKey of Object.keys(groupedVaccine)) {
    const row = [];
    headerData.map((schedule, scheduleId) => {
      row[scheduleId + 1] = <View style={styles.emptyView} />;
      groupedVaccine[rowKey].map((vaccine, index) => {
        if (index === 0) {
          row[0] = (
            <TableRowTitle title={vaccine.name} subTitle={vaccine.disease} />
          );
        }
        if (schedule.plannedSchedule === vaccine.plannedSchedule) {
          if (vaccine.administered) {
            row[scheduleId + 1] = <DoseCompletedTile vaccine={vaccine} />;
          } else if (vaccine.reminder && vaccine.plannedDate) {
            row[scheduleId + 1] = (
              <DoseReminderTile
                isCurrentDate={isCurrentDate(vaccine.plannedDate)}
                vaccine={vaccine}
                onBellPress={onBellPress}
                onTickPress={onTickPress}
              />
            );
          } else {
            row[scheduleId + 1] = (
              <DosePendingTile
                vaccine={vaccine}
                onBellPress={onBellPress}
                onTickPress={onTickPress}
              />
            );
          }
        }
      });
    });
    table.push(<View style={{ flexDirection: "row" }}>{row}</View>);
  }

  return <View>{table}</View>;
};

const CustomCalendarTable = ({ vaccines, onBellPress, onTickPress }) => {
  if (vaccines.length === 0) {
    return null;
  }
  const headerData = getHeaderData(vaccines);

  return (
    <ScrollView style={styles.flex1} horizontal={true}>
      <View style={styles.flex1}>
        {renderHeader(headerData)}
        {renderRow(headerData, vaccines, onBellPress, onTickPress)}
      </View>
    </ScrollView>
  );
};

CustomCalendarTable.propTypes = {
  vaccines: PropTypes.array,
  onBellPress: PropTypes.func,
  onTickPress: PropTypes.func,
};

export default CustomCalendarTable;
