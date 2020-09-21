import React from "react";
import { View, Text, SectionList } from "react-native";
import { connect } from "react-redux";

import styles from "./styles";
import { EBCardView } from "../../components";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import metaKeys from "../../meta";
import { PruBackHeader } from "../../../../components";
import { getAllCustomerHabits } from "../../actions";
import {  getPlanDetails } from "../../utils/utilityFunction";

import moment from "moment";
import { pathOr } from "ramda";

const actionPlanId= "Workout::1";

class EBWorkoutHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      customerHabits: [],
    };
  }

  componentDidMount() {
    const { getAllCustomerHabits } = this.props;
    getAllCustomerHabits(actionPlanId);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.customerHabitsByPlanId &&
      nextProps.customerHabitsByPlanId !== this.props.customerHabitsByPlanId
    ) {
      const id = actionPlanId;
      const index = nextProps.customerHabitsByPlanId.findIndex(
        el => el.actionPlanId === id
      );
      const customerHabits = index !== -1 ? nextProps.customerHabitsByPlanId[index].habits : [];
      this.setState({ customerHabits });
    }
  }

  checkLevel(level) {
    switch (level) {
      case "advanced":
        return 3;
      case "intermediate":
        return 2;
      case "beginner":
        return 1;
    }
  }

  getHabitsByDate = customerHabits => {
    const today = moment(moment().format("YYYY-MM-DD"));
    const yesterday = moment(
      moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD")
    );
    const sectionListData = [];
    const todaysData = customerHabits.filter(item =>
      this.matchDates(item, today)
    );
    const yesterdayData = customerHabits.filter(item =>
      this.matchDates(item, yesterday)
    );
    if (todaysData.length > 0) {
      sectionListData.push({ title: safeMetaLabelFinder(metaKeys.screenName, metaKeys.workoutHistory.today), data: todaysData });
    }
    if (yesterdayData.length > 0) {
      sectionListData.push({ title: safeMetaLabelFinder(metaKeys.screenName, metaKeys.workoutHistory.yesterday), data: yesterdayData });
    }
    return sectionListData;
  };

  matchDates = (item, date) => {
    const milestones = pathOr([], ["habitMilestones"], item);
    let result = false;
    result = milestones.some(element => {
      const habitDate = moment(element.reportedDate, "YYYY-MM-DD");
      if (date.diff(habitDate) == 0) {
        result = true;
        return true;
      }
      return false;
    });
    return result;
  };

  goToExercise = habit => {
    this.props.navigation.navigate("SquatChallenge", 
      { 
        exercise: getPlanDetails(habit),
        habit,
      })
  }

  renderWorkoutItem = workout => (
    <EBCardView
      whichFooter={"completed"}
      habit={workout.habit}
      mainAction={this.goToExercise}
    />
  );

  render() {
    const { customerHabits } = this.state;
    const workoutHistoryData = this.getHabitsByDate(customerHabits);
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <PruBackHeader
            title={safeMetaLabelFinder(metaKeys.screenName, metaKeys.workoutHistory.historyTitle)}
            customStyles={styles.headerStyle}
          />
        </View>
        <View style={styles.listView}>
          <SectionList
            sections={workoutHistoryData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => this.renderWorkoutItem(item)}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.dayTitle}>{title}</Text>
            )}
            SectionSeparatorComponent={() => <View style={styles.sectionSeperator} />}
            ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  customerHabitsByPlanId: state.workoutPlans.customerHabitsByPlanId,
});

const mapDispatchToProps = {
  getAllCustomerHabits,
};

export default connect(mapStateToProps, mapDispatchToProps)(EBWorkoutHistory);
