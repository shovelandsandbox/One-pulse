import React, { PureComponent } from "react";
import { 
  ImageBackground,
  ScrollView,
  Text, 
  TouchableOpacity,
  View,  
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Status from "./status";
import Styles from "./styles";

import { createCustomerHabitMilestone, getAllCustomerHabits } from "../../actions";
import { determineLevel } from "../../utils/utilityFunction";
import actions from "../../configs/actionNames";
import screens from "../../configs/screenNames";
import { EBCardView } from "../../components";
import images from "../../../../images/ExerciseBuddy";
import getConstants from "./constants";
import { metaFinderExerciseBuddy } from "../../utils/meta-utils";
import metaKeys from '../../meta';

class EBConclusion extends PureComponent {
  componentDidMount() {
    const {
      createCustomerHabitMilestone,
      exercise,
      timeTaken,
      units,
      getAllCustomerHabits,
      type,
    } = this.props;
    const habitId = exercise.id;
    const body = {
      status: "ACHIEVED",
      milestoneData: {
        "timeTaken": "00:30",
        "timeTakenUnits": "mins",
        "count": `${units.get(type)}`,
        "set": "1"
      }
    };
    getAllCustomerHabits("Workout::1");
    createCustomerHabitMilestone({ habitId, body });
  }

  goToExerciseDetail = habit => {
    const { goToExerciseDetail } = this.props;

    goToExerciseDetail({ habit });
  }

  render() {
    const { exercise, goToExerciseBuddyHome } = this.props;
    const {level} = determineLevel(this.props);
    const Constants = getConstants();
    return (
      <ScrollView style={Styles.container}>
        <ImageBackground
          style={Styles.imgBackgroundStyle}
          source={images.squat_woman}
        >
          <TouchableOpacity 
            onPress={goToExerciseBuddyHome} 
            style={[Styles.absolute, Styles.done]}
          >
            <Text style={[Styles.doneText, Styles.boldText]}>{metaFinderExerciseBuddy(metaKeys.conclusion.done)}</Text>
          </TouchableOpacity>
          <Status {...this.props} />
        </ImageBackground>
        <View style={[Styles.secondaryStatus]}>
          <Text style={[Styles.secondaryStatusText, Styles.font14, Styles.centerText ]}>
            {Constants[level].suggestion}
          </Text>
        </View>
        <EBCardView
          habit={exercise}
          supportAction={this.goToExerciseDetail}
          mainAction={goToExerciseBuddyHome}
          paused
        />
      </ScrollView>
    )
  }
};

EBConclusion.PropTypes = {
  createCustomerHabitMilestone: PropTypes.func,
  exercise: PropTypes.object,
  goToExerciseBuddyHome: PropTypes.func,
  goToExerciseDetail: PropTypes.func,
  timeTaken: PropTypes.any,
  units: PropTypes.number,
  customerHabitsByPlanId: PropTypes.object,
  getAllCustomerHabits: PropTypes.func,
}

const mapStateToProps = state => ({
  customerHabitsByPlanId: state.workoutPlans.customerHabitsByPlanId,
});

export default connect(mapStateToProps, {
  createCustomerHabitMilestone,
  getAllCustomerHabits,
  goToExerciseBuddyHome: () => ({
    type: "GO_TO_SCREEN",
    navigateTo: "ExerciseBuddyHome",
  }),
  goToExerciseDetail: (habit) => {
    return {
      type: actions.goToExerciseDetail,
      context: screens.EXERCISE_BUDDY,
      payload: {
        habit
      },
    };
  },
})(EBConclusion);
