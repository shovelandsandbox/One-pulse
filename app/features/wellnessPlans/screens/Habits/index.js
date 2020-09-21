import React, { PureComponent } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import { dispatchEvent } from "../../../../actions";
import { events, CoreActionTypes, CoreComponents } from "@pru-rt-internal/pulse-common";
import MetaConstants from "../../meta";
const { Loader } = CoreComponents;

import Actions from "../../config/actions";
import {
  WPHabitTile,
  ShadowWrapper,
  PruBackHeader,
  WPDarkModal,
  WPHabitDetailModal,
  WPConfirmModal,
  WPChangeHabitModal,
  WPEarnBadges,
  WPDetailsModal,
  WPMenuButton,
  WPActivityProgressModal
} from "../../components";
import { CustomAlert, ConnectedProfileImage } from "../../../../components";

import Styles from "./styles";
import { pathOr, pluck } from "ramda";

class Habits extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      goalId: "",
      badges: 0,
      isHabitChanging: false,
      firstHabit: {},
      for: "",
      goalName: "",
      customerHabitsCallMade: props.customerHabitsCallMade,
    };
    this.metaConstants = { ...MetaConstants.screenMeta() };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextBadges = pathOr(0, ["badges"], nextProps);
    const prevBadges = pathOr(0, ["badges"], prevState);
    const nextHabits = pathOr(0, ["customerHabitsCallMade"], nextProps);
    const prevHabits = pathOr(0, ["customerHabitsCallMade"], prevState);

    if (nextBadges !== prevBadges) {
      return {
        badges: nextBadges
      };
    }
    if (nextHabits !== prevHabits) {
      return {
        customerHabitsCallMade: nextHabits
      };
    }
  }

  componentDidMount() {
    const {
      navigation: { state },
      getAllHabits,
      getCustomerWalletDetail
    } = this.props;
    const goalId = state.params.actionPlan || state.params.id;
    const goalName = state.params.name;

    this.setState(
      {
        goalId,
        goalName
      },
      () => {
        getAllHabits({ id: goalId });
        getCustomerWalletDetail();
      }
    );
    this.props.dispatchEvent(events.wellnessGoalsHabits);
  }

  onChangeHabit = (firstHabit, habit) => {
    const { badges } = this.state;
    const units = pathOr(0, ["unlockReward", "units"], habit);

    if (habit.status === "LOCKED" && units > badges) {
      WPDarkModal.show({
        Component: () => (
          <WPEarnBadges availableBadges={units - badges} forHabit={true} />
        )
      });
    } else if (habit.status === "LOCKED") {
      WPDarkModal.show({
        Component: () => (
          <WPConfirmModal habit={habit} badges={badges} isItHabit={true} />
        ),
        positiveText: this.metaConstants.yes_change,
        positivePress: () => {
          this.props.changeHabit({
            actionPlanId: this.state.goalId,
            habitId: firstHabit.id,
            newHabitId: habit.id
          });
        },
        negativeText: this.metaConstants.wellness_no
      });
    } else {
      this.props.changeHabit({
        actionPlanId: this.state.goalId,
        habitId: firstHabit.id,
        newHabitId: habit.id
      });
    }
  };

  selectHabit = habit => {
    const { firstHabit } = this.state;

    if (this.state.isHabitChanging && this.state.for === "changing") {
      this.setState(
        {
          isHabitChanging: false,
          firstHabit: {}
        },
        () => {
          WPDarkModal.show({
            Component: () => (
              <WPChangeHabitModal firstHabit={firstHabit} newHabit={habit} />
            ),
            positiveText: this.metaConstants.yes_change,
            positivePress: () => this.onChangeHabit(firstHabit, habit),
            negativeText: this.metaConstants.wellness_no
          });
        }
      );
      return;
    } else if (this.state.isHabitChanging && this.state.for !== "changing") {
      this.setState(
        {
          isHabitChanging: false,
          firstHabit: {}
        },
        () => {
          this.activateHabit(habit);
        }
      );
      return;
    }
    if (habit.status === "LOCKED") {
      const { badges } = this.state;
      if (habit.unlockReward.units > badges) {
        WPDarkModal.show({
          Component: () => (
            <WPEarnBadges
              availableBadges={habit.unlockReward.units - badges}
              forHabit={true}
            />
          )
        });
      } else {
        this.unlockHabit(habit);
      }
    } else if (habit.status === "COMPLETED") {
      const str = this.metaConstants.already_completed_habit;
      CustomAlert.show("", str, {
        positiveText: "Ok",
        invert: false
      });
    } else {
      this.activateHabit(habit);
    }
  };

  activateHabit = habit => {
    this.props.activateCustomerHabit({
      actionPlanId: this.state.goalId,
      habitId: habit.id
    });
    events.wellnessGoalsHabitJoin.attributes = {
      actionPlanId: this.state.goalId,
      habitId: habit.id
    };
    this.props.dispatchEvent(events.wellnessGoalsHabitJoin);
  };

  selectStartWithFriends = () => {
    WPDarkModal.hide();
    this.props.goToScreen("WellnessInvite");
  }

  showDetails = habit => {
    WPDarkModal.show({
      Component: () => <WPDetailsModal habit={habit} tabCount={1} />,
      positiveText: "Get Started",
      largePositiveButton: true,
      positivePress: () => this.selectHabit(habit),
    });
    this.props.dispatchEvent(events.wellnessGoalsHabitDetails);
  };

  showActivityProgress = () => {
    WPDarkModal.show({
      isBottomCloseRequired: true,
      Component: () => (
        <WPActivityProgressModal
          onPress={() => {
            WPDarkModal.hide();
            this.props.navigation.navigate("WellnessProfile");
          }}
        />
      )
    });
  };

  unlockHabit = habit => {
    const { badges } = this.state;
    const units = pathOr(0, ["unlockReward", "units"], habit);

    if (habit.status === "LOCKED" && units > badges) {
      WPDarkModal.show({
        Component: () => (
          <WPEarnBadges availableBadges={units - badges} forHabit={true} />
        )
      });
    } else {
      WPDarkModal.show({
        Component: () => (
          <WPConfirmModal habit={habit} badges={badges} isItHabit={true} />
        ),
        positiveText: this.metaConstants.yes_change,
        positivePress: () => {
          this.selectHabit({ ...habit, status: "ACTIVE" });
          events.wellnessGoalsHabitUnlock.attributes = {
            habitId: habit.id
          };
          this.props.dispatchEvent(events.wellnessGoalsHabitUnlock);
        },
        negativeText: this.metaConstants.wellness_no
      });
    }
  };

  getAllHabits = () => {
    let { allHabits, customerHabits } = this.props;
    const subscribedHabits = pluck("habit", customerHabits);
    const subscribedHabitIds = pluck("id", subscribedHabits);

    allHabits = allHabits.filter(habit => {
      return (
        subscribedHabitIds.indexOf(habit.id) < 0 && habit.status !== "COMPLETED"
      );
    });

    return (
      <View style={[Styles.availableHabits, Styles.innerContainer]}>
        <View style={Styles.headerContainer}>
          <Text style={Styles.mainHeading}>
            {this.metaConstants.available_habits}
          </Text>
          <Text style={Styles.subHeading}>
            {this.metaConstants.tab_to_add_habit}
          </Text>
        </View>
        <FlatList
          data={allHabits}
          numColumns={3}
          extraData={allHabits}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <WPHabitTile
              habit={item}
              selectHabit={this.selectHabit}
              showDetails={this.showDetails}
              unlockHabit={this.unlockHabit}
            />
          )}
        />
      </View>
    );
  };

  getCompletedHabits = () => {
    let { allHabits } = this.props;

    allHabits = allHabits.filter(habit => {
      return habit.status === "COMPLETED";
    });

    if (allHabits.length === 0) {
      return null;
    }

    return (
      <View style={[Styles.availableHabits, Styles.innerContainer]}>
        <View style={Styles.headerContainer}>
          <Text style={Styles.mainHeading}>
            {this.metaConstants.feel_proud}
          </Text>
        </View>
        <FlatList
          data={allHabits}
          numColumns={3}
          extraData={allHabits}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <WPHabitTile
              habit={item}
              selectHabit={this.selectHabit}
              showDetails={this.showDetails}
              unlockHabit={this.unlockHabit}
            />
          )}
        />
      </View>
    );
  };

  markDone = habit => {
    this.props.createHabitMilestone({
      habitId: habit.habit.id,
      actionPlanId: this.state.goalId,
      date: moment().format("YYYY-MM-DD"),
      status: "done",
      completedMilestoneCount: habit.completedMilestoneCount,
      habit
    });
  };

  changeHabit = habit => {
    this.setState({
      isHabitChanging: true,
      firstHabit: habit,
      for: "changing"
    });
    events.wellnessGoalsChangeHabit.attributes = {
      ...habit
    };
    this.props.dispatchEvent(events.wellnessGoalsChangeHabit);
  };

  addHabit = () => {
    this.setState({
      isHabitChanging: true,
      for: "firstHabit"
    });
  };

  calculatePercentage = () => {
    const { customerHabits } = this.props;
    let totalMilestone = 0;
    let completedMilestone = 0;
    let completedPercentage = 0;

    customerHabits.map(habit => {
      totalMilestone = totalMilestone + habit.habit.milestoneCount;
      completedMilestone = completedMilestone + habit.completedMilestoneCount;
      completedPercentage = Math.floor(
        (100 * completedMilestone) / totalMilestone
      );
    });

    return completedPercentage;
  };

  getInProgressHabits = () => {
    const { customerHabits } = this.props;
    const maxHabits = 3;
    const emptyHabitsLength = maxHabits - customerHabits.length;
    const emptyHabits = Array.from(
      Array(emptyHabitsLength >= 0 ? emptyHabitsLength : 0).keys()
    );
    const progressBarProgress = {
      backgroundColor: "#e84c5a",
      width: Dimensions.get("window").width * (this.calculatePercentage() / 100)
    };

    return (
      <View style={Styles.currentHabits}>
        <View style={Styles.progressBar} />
        <View style={[Styles.progressBar, progressBarProgress]} />
        <View>
          <Text style={Styles.progressBarText}>
            {this.calculatePercentage()}% {this.metaConstants.complete}
          </Text>
        </View>
        <View
          style={[Styles.innerContainer, Styles.currentHabitsInnerContainer]}
        >
          <Text style={Styles.mainHeading}>
            {this.metaConstants.habits_in_progress}
          </Text>
          <View style={[Styles.inprogressHabits, Styles.inprogressHabit]}>
            {customerHabits.map(habit => {
              return (
                <View style={Styles.inprogressHabit} key={habit.id}>
                  <WPHabitTile
                    footerType={"habitTileInProgress"}
                    habit={habit}
                    markDone={this.markDone}
                    inProgress={true}
                    onPress={() => this.showActivityProgress()}
                  />
                  <TouchableOpacity onPress={() => this.changeHabit(habit)}>
                    <Text style={Styles.changeHabit}>
                      {this.metaConstants.wellness_change_habit}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            {emptyHabits.map((e, index) => (
              <TouchableOpacity
                style={Styles.inprogressHabit}
                key={index}
                onPress={this.addHabit}
              >
                <View style={Styles.addInProgressHabit}>
                  <View style={Styles.crossUp} />
                  <View style={Styles.crossFlat} />
                </View>
                <Text style={Styles.changeHabit}>
                  {this.metaConstants.wellness_add_habit}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  renderProfile = () => {
    return (
      <ConnectedProfileImage
        variant="outline"
        size="medium"
        onPress={() => {
          // this.props.navigation.navigate("WellnessProfile");
        }}
      />
    );
  };

  render() {
    const { allHabits, customerHabits } = this.props;
    const { 
      customerHabitsCallMade, 
      isHabitChanging,
      goalId,
      goalName, 
    } = this.state;
    
    if (!customerHabitsCallMade) {
      return <Loader />;
    }

    if (customerHabits.length === 0 || isHabitChanging) {
      return (
        <View style={Styles.container}>
          <ShadowWrapper>
            <PruBackHeader
              title={goalName}
              rightImage
              rightImageRenderMethod={this.renderProfile}
            />
          </ShadowWrapper>
          <ScrollView style={{ flex: 1 }}>
            {this.getAllHabits()}
            {this.getCompletedHabits()}
          </ScrollView>
          {
            allHabits.length !== 0 && customerHabits.length !== 0 &&
            <WPMenuButton habits={customerHabits} />
          }
        </View>
      );
    }

    return (
      <View style={Styles.container}>
        <PruBackHeader
          title={goalName}
          rightImage
          rightImageRenderMethod={this.renderProfile}
        />
        {this.getInProgressHabits()}
        <ScrollView style={{ flex: 1 }}>
          {this.getAllHabits()}
          {this.getCompletedHabits()}
        </ScrollView>
        {
          allHabits.length !== 0 && customerHabits.length !== 0 &&
          <WPMenuButton habits={customerHabits} actionPlanId={goalId} />
        }
      </View>
    );
  }
}

const mapStateToProps = ({
  wellnessPlans: { allHabits, customerHabits, badges, customerHabitsCallMade }
}) => ({
  allHabits,
  badges,
  customerHabits,
  customerHabitsCallMade,
});

export default connect(mapStateToProps, {
  goTo: Actions.goto,
  getAllHabits: Actions.getAllHabits,
  getAllCustomerHabits: Actions.getAllCustomerHabits,
  activateCustomerHabit: Actions.activateCustomerHabit,
  getCustomerWalletDetail: Actions.getCustomerWalletDetail,
  createHabitMilestone: Actions.createHabitMilestone,
  changeHabit: Actions.changeHabit,
  dispatchEvent,
  goToScreen: (screen) => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: screen
  }),
})(Habits);
