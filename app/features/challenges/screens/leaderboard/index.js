import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import screens from "../../configs/screen-names";
import actions from "../../configs/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pathOr, path } from "ramda";
import moment from "moment";
import { Colors, fontWeight } from "../../styles";
import { metaFinderChallenges } from "../../utils/meta-utils";
//events
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";

import { getActivityMetrics } from "../../utils/challenge-utils";
import ProfileImage from "./profile-image";
import { CoreServices } from "@pru-rt-internal/pulse-common";
const { NavigationService } = CoreServices;
import {
  LEADERBOARD_BACKGROUND,
  LEADERBOARD_STAND,
  CROWN,
  LEFT_ARROW,
} from "../../../../../assets/images/challenges";

class Leaderboard extends PureComponent {
  componentDidMount() {
    const group = this.getChallenge();
    this.props.getLeaderBoard(group.id);
  }
  componentWillUnmount() {
    this.props.registerEvent(eventNames.exitLeaderboard, {
      completionDate: moment(),
    });
    this.props.clearLeaderboard();
  }

  getChallenge = () => {
    return this.props.navigation.getParam("group") || {};
  };

  //empty strings are appended for oppo and one plus phone issue
  //https://github.com/facebook/react-native/issues/15114
  renderLeaderboardHeader = () => {
    const challenge = this.getChallenge();
    const { status } = challenge;

    const startDate = moment(path(["groupActivity", "startTime"], challenge));
    const day = moment().diff(startDate, "days");

    const metrics = getActivityMetrics(challenge);
    const { value, name } = metrics;

    return (
      <View style={styles.leaderboardHeader}>
        <View style={styles.rowItem}>
          <Text style={[styles.stepsChallenge, styles.textBold]}>
            {" " + value + " " + challenge.unit}
          </Text>
          <Text style={styles.stepsChallenge}>{` ${name} ${metaFinderChallenges(
            "Challenge"
          )}`}</Text>
        </View>
        {status === "ONGOING" ? (
          <View>
            <Text style={[styles.stepsChallenge, styles.textBold]}>
              {metaFinderChallenges("day")} {day + " "}
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  getStepsLabel = (item, labelStyles) => {
    //take the first element always - ideally should be matched with challenge unit
    const stepsCategory = item.categories[0];
    const challenge = this.getChallenge();
    return (
      <View style={[styles.rowItem, labelStyles]}>
        <Text style={styles.steps}>
          {stepsCategory.value + " " + challenge.unit}
        </Text>
      </View>
    );
  };

  placeHolderView = ({ index, topAlign, item }) => {
    return (
      <View key={index} style={[styles.topContestant, topAlign]}>
        <ProfileImage customer={item.customer} rank={index} />
        <Text style={[styles.textBold, styles.name, styles.currentUser]}>
          {""}
        </Text>
      </View>
    );
  };

  getRank = index => {
    let rank = "";
    switch (index) {
      case 0:
        rank = "2";
        break;
      case 1:
        rank = "1";
        break;
      case 2:
        rank = "3";
        break;
      default:
        break;
    }
    return rank;
  };

  getMarginTop = (index, offset) => {
    let marginTop = 10;
    switch (index) {
      case 0:
        marginTop = 35;
        break;
      case 1:
        marginTop = 5;
        break;
      case 2:
        marginTop = 45;
        break;
      default:
        break;
    }
    return { marginTop: marginTop + offset };
  };

  renderTopContestantItem = items => {
    return items.map((item, index) => {
      const topAlign = this.getMarginTop(index, 0);
      const rank = this.getRank(index);

      if (item.placeHolder === true) {
        return this.placeHolderView({ topAlign, index, item });
      }
      return (
        <View key={item.customer.id} style={[styles.topContestant, topAlign]}>
          {index === 1 && <Image source={CROWN} style={styles.crown} />}
          <ProfileImage customer={item.customer} rank={index} />
          <Text style={[styles.name, styles.currentUser]}>
            {this.isCurrentUser(item)
              ? `${metaFinderChallenges("you")}`
              : this.getCustomerName(item.customer)}
          </Text>
          {index !== 1 && (
            <View style={styles.rankContainer}>
              <Text style={[styles.rankStyle, styles.textBold]}>{rank}</Text>
            </View>
          )}
        </View>
      );
    });
  };

  renderStepsDetails = items => {
    return items.map((item, index) => {
      const topAlign = this.getMarginTop(index, 30);
      const stepsCategory = pathOr({ value: 0 }, ["categories", "0"], item);
      const challenge = this.getChallenge();
      return (
        <View key={index} style={topAlign}>
          <Text style={[styles.stepsBig, styles.textBold]}>
            {stepsCategory.value}
          </Text>
          <Text style={[styles.stepsMedium, styles.stepsLabel]}>
            {" " + challenge.unit}
          </Text>
        </View>
      );
    });
  };

  getCurrentUserRank = () => {
    const { contestantsList } = this.props;
    const currentUser = contestantsList.filter(item => item.currentUser);
    return currentUser.length ? currentUser[0].rank : 0;
  };

  renderCurrentRank = () => {
    return (
      <View style={styles.yourRankContainer}>
        <Text style={styles.yourRankText}>
          {metaFinderChallenges("yourRankIs")}
        </Text>
        <Text style={styles.yourRankValueText}>
          {this.getCurrentUserRank()}
        </Text>
      </View>
    );
  };
  isCurrentUser = item => {
    return item.currentUser;
  };

  getTextColor = item => {
    return this.isCurrentUser(item) ? styles.currentUser : null;
  };

  getBackgroundColor = item => {
    return this.isCurrentUser(item) ? styles.currentUserContainer : null;
  };

  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.leftArrow}
          onPress={() => NavigationService.goBack()}
        >
          <Image source={LEFT_ARROW} />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {metaFinderChallenges("leaderboard")}
        </Text>
      </View>
    );
  };

  renderTopThreeBoard = () => {
    const { contestantsList } = this.props;
    contestantsList.sort((item1, item2) => item1.rank - item2.rank);
    const topThreeContestants = [];

    topThreeContestants[0] =
      contestantsList.length > 1 ? contestantsList[1] : { placeHolder: true };
    topThreeContestants[1] =
      contestantsList.length > 0 ? contestantsList[0] : { placeHolder: true };
    topThreeContestants[2] =
      contestantsList.length > 2 ? contestantsList[2] : { placeHolder: true };

    return (
      <ImageBackground
        source={LEADERBOARD_BACKGROUND}
        style={styles.imgBackground}
      >
        {this.renderHeader()}
        <View style={[styles.topThreeBoard, styles.rowItem]}>
          {this.renderTopContestantItem(topThreeContestants)}
        </View>
        <ImageBackground
          source={LEADERBOARD_STAND}
          style={styles.imgStandBackground}
          resizeMode={"cover"}
        >
          {this.renderStepsDetails(topThreeContestants)}
        </ImageBackground>
      </ImageBackground>
    );
  };

  extractKey = item => {
    const key = `ContestantsList: ${item.rank}`;
    return key;
  };

  //TODO : what if a customer does not have either of these
  getCustomerName = customer => {
    return `${customer.firstName} ${customer.surName}`;
  };

  renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          styles.itemContainer,
          styles.rowItem,
          this.getBackgroundColor(item),
        ]}
      >
        <View style={styles.itemImage}>
          <ProfileImage customer={item.customer} rank={index} />
        </View>
        <View>
          <Text numberOfLines={1} style={[styles.itemName, styles.textBold]}>
            {this.isCurrentUser(item)
              ? "You"
              : this.getCustomerName(item.customer)}
          </Text>
          {this.getStepsLabel(item, { marginLeft: 17, marginTop: 10 })}
        </View>
        <View style={styles.itemRankContainer}>
          <Text style={[styles.rankStyle, styles.textBold]}>{item.rank}</Text>
        </View>
      </View>
    );
  };

  separatorItem = () => {
    return <View style={styles.itemSeparator} />;
  };

  renderContestantsList = () => {
    const { contestantsList } = this.props;
    contestantsList.sort((item1, item2) => item1.rank - item2.rank);
    const topThreeExcludedContestants =
      contestantsList.length > 3 ? contestantsList.slice(3) : contestantsList;
    return (
      <View style={styles.listWrapper}>
        <FlatList
          data={topThreeExcludedContestants}
          renderItem={this.renderItem}
          keyExtractor={this.extractKey}
          ItemSeparatorComponent={this.separatorItem}
          contentContainerStyle={styles.listContainer}
        />
        {this.renderCurrentRank()}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.baseContainer}>
        {this.renderTopThreeBoard()}
        {this.renderContestantsList()}
      </View>
    );
  }
}

Leaderboard.propTypes = {
  getLeaderBoard: PropTypes.func,
  registerEvent: PropTypes.func,
  clearLeaderboard: PropTypes.func,
  contestantsList: PropTypes.array,
  navigation: PropTypes.object,
};

const mapStateToProps = state => ({
  contestantsList: pathOr(
    [],
    ["challenges", "leaderboard", "contestants"],
    state
  ),
  userId: path(["profile", "id"], state),
});

const mapDispatchToProps = {
  getLeaderBoard: id => ({
    context: screens.LEADERBOARD,
    type: actions.getChallengeLeaderboard,
    payload: { id },
  }),
  clearLeaderboard: () => ({
    context: screens.LEADERBOARD,
    type: actions.clearLeaderboard,
  }),
  registerEvent,
};

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  crown: {
    height: 22.5,
    width: 33.5,
  },
  currentUser: {
    color: Colors.white,
  },
  currentUserContainer: {
    backgroundColor: Colors.pulseRed,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  headerText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 21,
    marginTop: 10,
    textAlign: "center",
  },
  imgBackground: {
    justifyContent: "center",
  },
  imgStandBackground: {
    alignSelf: "center",
    flexDirection: "row",
    height: 170,
    justifyContent: "space-between",
    marginTop: -50,
    paddingHorizontal: 30,
    width: 300,
    zIndex: 1,
  },
  itemContainer: {
    alignItems: "center",
    height: 69,
  },
  itemImage: {
    height: 49,
    marginLeft: 30,
    width: 49,
  },
  itemName: {
    color: Colors.grey393939,
    fontSize: 14,
    lineHeight: 18,
    marginLeft: 17,
    width: 150,
  },
  itemRankContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.lightSlateGrey,
    borderRadius: 38 / 2,
    borderWidth: 0.5,
    bottom: 10.7,
    height: 38,
    justifyContent: "center",
    marginTop: 5,
    position: "absolute",
    right: 21,
    width: 38,
  },
  itemSeparator: {
    backgroundColor: Colors.separator,
    height: 1,
  },
  leaderboardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 17,
    marginTop: 15,
  },
  leftArrow: { left: 10, marginLeft: 20, position: "absolute", top: 20 },
  listContainer: {
    marginTop: 10,
    paddingBottom: 180,
  },
  listWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginTop: -20,
    paddingBottom: 180,
    paddingTop: 40,
  },
  name: {
    color: Colors.pulseRed,
    fontSize: 12,
    lineHeight: 16.7,
    marginTop: 2,
    textAlign: "center",
  },
  rankContainer: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    height: 30,
    justifyContent: "center",
    marginTop: 5,
    width: 30,
  },
  rankStyle: {
    color: Colors.pulseRed,
    fontSize: 14,
    lineHeight: 16.7,
    textAlign: "center",
  },
  rowItem: {
    flexDirection: "row",
  },
  steps: {
    color: "rgba(109, 109, 109, 1)",
    fontSize: 13,
    lineHeight: 15,
    textAlign: "center",
  },
  stepsBig: {
    color: Colors.black,
    fontSize: 15,
    lineHeight: 18,
    textAlign: "center",
  },
  stepsChallenge: {
    color: Colors.grey393939,
    fontSize: 14,
    lineHeight: 16.7,
  },
  stepsLabel: {
    width: "auto",
  },
  stepsMedium: {
    color: Colors.black,
    fontSize: 14,
    lineHeight: 16,
    marginTop: 5,
    textAlign: "center",
  },
  textBold: {
    fontWeight: fontWeight.Bold,
  },
  topContestant: {
    alignItems: "center",
    paddingHorizontal: 15,
    width: 102,
  },
  topThreeBoard: {
    justifyContent: "center",
    marginHorizontal: 17,
    zIndex: 2,
  },
  yourRankContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderRadius: 20,
    elevation: 4,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    position: "absolute",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    top: -20,
    width: 309,
  },
  yourRankText: { color: Colors.gray, fontSize: 14, lineHeight: 16 },
  yourRankValueText: {
    color: Colors.pulseRed,
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
