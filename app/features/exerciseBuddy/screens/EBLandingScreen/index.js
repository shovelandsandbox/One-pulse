import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pathOr, path } from "ramda";

import { styles } from "./styles";
import Footer from "./footer";
import actions from "../../configs/actionNames";
import screens from "../../configs/screenNames";
import { getPlanDetails } from "../../utils/utilityFunction";
import { EBCardView } from "../../components";
import {
  getAllCustomerActionPlans,
} from "../../actions";

import colors from "../../utils/colors";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import metaKeys from "../../meta";
import { PruRoundedButton, PruBackHeader } from "../../../../components";
import { CLOCK_ICON_WHITE } from "../../../../config/images";
import images from "../../../../images/ExerciseBuddy";

const active = {
  beginner: colors.beginner,
  intermediate: colors.intermediate,
  advanced: colors.advanced,
};

class EBLandingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "beginner",
      footerItem: {},
    };
  }

  componentDidMount() {
    const { data, getAllCustomerActionPlans } = this.props;
    const footer = pathOr("1", ["attributes", "_0"], data);
    getAllCustomerActionPlans();
    this.setState({ footerItem: footer });
  }

  onTabPress = key => {
    this.setState({
      activeTab: key,
    });
    const beginner = path(["attributes", "_0"], this.props.data);
    const intermediate = path(["attributes", "_1"], this.props.data);
    const advanced = path(["attributes", "_2"], this.props.data);
    switch (key) {
      case "beginner":
        this.setState({ footerItem: beginner });
        break;
      case "intermediate":
        this.setState({ footerItem: intermediate });
        break;
      case "advanced":
        this.setState({ footerItem: advanced });
        break;
    }
  };

  renderTabHeaderItem = (key, title, isActive) => {
    const levelHeading = [styles.levelHeading];
    if (isActive) {
      levelHeading.push({
        color: active[this.state.activeTab],
        fontSize: 16,
        lineHeight: 28,
      });
    } else {
      levelHeading.push({ color: "#cccccc", fontSize: 12, lineHeight: 20 });
    }
    return (
      <TouchableOpacity
        onPress={() => this.onTabPress(key)}
        style={styles.toggleButtonArea}
      >
        <Text style={levelHeading}>{title}</Text>
        {isActive && (
          <View>
            <Footer
              data={this.state.footerItem}
              activeTab={this.state.activeTab}
            />
            <View
              style={[
                { backgroundColor: active[this.state.activeTab] },
                styles.groupSelectedLine,
              ]}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  renderTabHeader = () => {
    const TABS = [
      {
        key: "beginner",
        title: safeMetaLabelFinder(metaKeys.screenName, "beginner"),
      },
      {
        key: "intermediate",
        title: safeMetaLabelFinder(metaKeys.screenName, "intermediate"),
      },
      {
        key: "advanced",
        title: safeMetaLabelFinder(metaKeys.screenName, "advance"),
      },
    ];
    const tabs = TABS.map(tab => {
      const isActive = tab.key === this.state.activeTab;
      return this.renderTabHeaderItem(tab.key, tab.title, isActive);
    });
    return (
      <View style={{ marginTop: 16.7 }}>
        <Text style={styles.headerTitle}>
          {safeMetaLabelFinder(
            metaKeys.screenName,
            metaKeys.landing.tryOurWorkout
          )}
        </Text>
        <View style={styles.toggleButtonStyle}>{tabs}</View>
      </View>
    );
  };

  rightImageRenderMethod = () => {
    return (
      <TouchableOpacity onPress={this.props.goToEBWorkoutHistory}>
        <Text style={styles.rightText}>
          {safeMetaLabelFinder(metaKeys.screenName, metaKeys.landing.history)}
        </Text>
      </TouchableOpacity>
    );
  };

  goToExerciseDetail = habit => {
    const { goToExerciseDetail } = this.props;

    goToExerciseDetail({ habit });
  };

  goToExercise = habit => {
    this.props.navigation.navigate("Exercises", {
      exercise: getPlanDetails(habit),
      habit,
      level: this.state.activeTab,
    });
  };

  renderExercises = () => {
    const { exercises } = this.props;

    return (
      <FlatList
        data={exercises[0] && exercises[0].habits}
        renderItem={this.renderExercise}
        keyExtractor={(item, index) => index}
        style={styles.flatList}
      />
    );
  };

  renderExercise = ({ item, index }) => (
    <EBCardView
      habit={item}
      supportAction={this.goToExerciseDetail}
      mainAction={this.goToExercise}
      isLast={index + 1 === this.props.exercises[0].habits.length}
    />
  );

  assembleCrew = () => {
    //do not remove this
    // this.props.goToInvite({ group: {}, type: '_0' });
  }

  render() {
    return (
      <View style={styles.container}>
        <PruBackHeader
          title={safeMetaLabelFinder(
            metaKeys.screenName,
            metaKeys.landing.exerciseBuddyTitle
          )}
          rightImage={true}
          rightImageRenderMethod={this.rightImageRenderMethod}
        />
        <View style={styles.headerContainer}>
          <ImageBackground
            source={images.exerciseBuddyHome}
            style={styles.imageHeaderContainer}
            imageStyle={styles.imageHeader}
          >
            <View style={{ padding: 10 }}>
              <Text style={styles.pageTitle}>
                {safeMetaLabelFinder(
                  metaKeys.screenName,
                  metaKeys.landing.welcomeTo
                )}
              </Text>
              <Text style={styles.pageClose}>
                {safeMetaLabelFinder(metaKeys.screenName, metaKeys.landing.our)}
                <Text style={{ fontWeight: "bold" }}>
                  {safeMetaLabelFinder(
                    metaKeys.screenName,
                    metaKeys.landing.aiBuddy
                  )}
                </Text>
                {safeMetaLabelFinder(
                  metaKeys.screenName,
                  metaKeys.landing.willProvideSuggestion
                )}
              </Text>
              <PruRoundedButton
                buttonTitle={safeMetaLabelFinder(
                  metaKeys.screenName,
                  metaKeys.landing.assembleCrew
                )}
                style={styles.buttonContainer}
                supportText={safeMetaLabelFinder(
                  metaKeys.screenName,
                  metaKeys.landing.comingSoon
                )}
                supportIcon={CLOCK_ICON_WHITE}
                textStyling={styles.buttonTextStyling}
                // import rgba from 'polished';
                // linearGradient={[rgba("#ec1c2e", 0), rgba("#7b1c24", 0)]}
                linearGradient={["#ec1c2e", "#7b1c24"]}
                onPress={this.assembleCrew}
              />
            </View>
          </ImageBackground>
          {this.renderTabHeader()}
        </View>
        {this.renderExercises()}
      </View>
    );
  }
}

EBLandingScreen.defaultProps = {
  data: {
    attributes: {
      _0: {
        sets: 1,
      },
      _1: {
        sets: 2,
      },
      _2: {
        sets: 3,
      },
    },
  },
};

EBLandingScreen.propTypes = {
  exercises: PropTypes.array,
  goToInvite: PropTypes.func,
  getAllActionPlans: PropTypes.func,
  getAllHabits: PropTypes.func,
  goToEBWorkoutHistory: PropTypes.func,
  goToExerciseDetail: PropTypes.func,
};

const mapStateToProps = state => {
  const {
    workoutPlans: { habitsByWorkoutPlanId },
  } = state;

  return {
    exercises: habitsByWorkoutPlanId,
  };
};

export default connect(mapStateToProps, {
  goToInvite: payload => ({
    type: actions.goToSelectFriends,
    context: screens.EXERCISE_BUDDY,
    payload,
  }),
  getAllCustomerActionPlans,
  goToEBWorkoutHistory: () => {
    return {
      type: actions.goToEBWorkoutHistory,
      context: screens.EXERCISE_BUDDY,
      payload: {},
    };
  },
  goToExerciseDetail: habit => {
    return {
      type: actions.goToExerciseDetail,
      context: screens.EXERCISE_BUDDY,
      payload: {
        habit,
      },
    };
  },
})(EBLandingScreen);
