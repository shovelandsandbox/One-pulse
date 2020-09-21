import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pathOr } from "ramda";
import images from "../../../../images/ExerciseBuddy";
import {
  getPlanDetails,
  getPlanUrlDetails,
  getPlanOutcomeDetails,
} from "../../utils/utilityFunction";
import { PruBackHeader } from "../../../../components";
import { getHabitById } from "../../actions";
import styles from "./styles";
import { metaFinderExerciseBuddy } from "../../utils/meta-utils";
import metaKeys from '../../meta';

class ExerciseDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      exerciseId: "",
      actionId: "",
      habit: {},
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const id = pathOr("", ["state", "params", "id"], navigation);
    const habit = pathOr("", ["params", "habit", "habit"], navigation.state);
    const actionPlanId = pathOr(
      "",
      ["state", "params", "actionPlanId"],
      navigation
    );
    this.setState({ exerciseId: id, actionId: actionPlanId, habit });
    this.props.getHabitById({ habitId: id, actionId: actionPlanId });
  }

  goBack = () => {
    // this.props.gotoMainPage();
  };

  render() {
    const { habit } = this.state;
    const headerTitle = getPlanDetails(habit, "name") || "Burpee";
    const warmupDesc =
      getPlanDetails(habit, "comments") ||
      metaFinderExerciseBuddy(metaKeys.exerciseDetail.ankleWarmup);
    const instructions = getPlanDetails(habit, "content").split("\n");
    const exerciseUrl = getPlanUrlDetails(habit, "600*600");
    const videoUrl = getPlanDetails(habit, "instruction_video_url");
    const workoutDescText = metaFinderExerciseBuddy(metaKeys.exerciseDetail.workoutDescText);
    const warmUpText = metaFinderExerciseBuddy(metaKeys.exerciseDetail.warmUpText);
    const instructionsText = metaFinderExerciseBuddy(metaKeys.exerciseDetail.instructionsText);
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.headerView}>
          <PruBackHeader
            title={headerTitle}
            customStyles={styles.headerStyle}
          />
        </View>
        <ScrollView>
          <View>
            <Image
              source={
                exerciseUrl ? { uri: exerciseUrl } : images.burpeeExercise
              }
              style={styles.exerciseImg}
            />
            {/* <Image source={images.exerciseBg} style={styles.exerciseImgBgImg} /> */}
            <View style={styles.headerImage}>
              <Text style={styles.exerciseTitle}>{headerTitle}</Text>
              {/* <View style={styles.calRow}>
                <Image source={images.calories} style={styles.caloriesImg} />
                <Text style={styles.calTxt}>
                  {getPlanOutcomeDetails(habit, "burn")}{" "}
                  {getPlanOutcomeDetails(habit, "metric")}/
                  {getPlanOutcomeDetails(habit, "duration")}
                </Text>
              </View> */}
            </View>
          </View>
          <Text style={styles.exerciseDesc}>
            {getPlanDetails(habit, "desc") || 
            "The Burpee, is a full body exercise used in strength trainman and as an aerobic exercise. The basic movement is performed in four steps and known as a ' four-count burpee '."}
          </Text>
          <Text style={styles.workoutDescTitle}>{workoutDescText}</Text>
          <View style={{alignItems: 'center'}}>
            <Image
              source={exerciseUrl ? { uri: exerciseUrl } : images.burpeeExercise}
              style={styles.exerciseVideoImg} />
          </View>
          <View style={styles.warmupContainer}>
            <Text style={styles.warmupTitle}>{warmUpText}</Text>
            <Text style={styles.warmupDesc}>{warmupDesc}</Text>
          </View>
          <Text style={styles.instructionTitle}>{instructionsText}</Text>
          <FlatList
            data={instructions}
            keyExtractor={(item, index) => index}
            // extraData={selectedValue}
            renderItem={({ item, index }) => (
              <View style={styles.instructionRowView}>
                <Text style={styles.instructionIndex}>{index + 1}. </Text>
                <Text style={styles.instructionDesc}>{item}</Text>
              </View>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  habitDetails: state.workoutPlans.habitDetails,
});

const mapDispatchToProps = {
  getHabitById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseDetailScreen);
