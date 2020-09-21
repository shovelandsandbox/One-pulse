import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import { metaFinderChallenges } from "../../utils/meta-utils";
import { Colors } from "../../styles";
import LEADERBOARD from "../../../../../assets/images/challenges/leaderboard.png";
import INFO from "../../../../../assets/images/challenges/info.png";
import REWARDSUN from "../../../../../assets/images/challenges/rewardSUN.png";
import BADGEGOLD from "../../../../../assets/images/challenges/BadgeGold.png";
import BADGESILVER from "../../../../../assets/images/challenges/BadgeSilver.png";
import BADGEBRONZE from "../../../../../assets/images/challenges/BadgeBronze.png";
import SCATTERED_DOTS from "../../../../../assets/images/challenges/DOTSSCATTER.png";
import LEFT_ARROW from "../../../../../assets/images/challenges/leftArrow.png";
import PopUpMenu from "../../components/my-challenge/pop-up-menu";
import { disconnectAlert } from "../../../../config/images";
import {
  PDF_ICON,
  ACTIVE_CHECK,
  LEADERBOARD_BLACK,
} from "../../../../../assets/images/challenges";
import { MenuProvider } from "react-native-popup-menu";
import Modal from "react-native-modal";
import { pathOr, path } from "ramda";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";
import moment from "moment";
import screens from "../../configs/screen-names";
import actions from "../../configs/actions";
import { CoreServices, CoreActionTypes } from "@pru-rt-internal/pulse-common";
const { NavigationService } = CoreServices;
import HTML from "react-native-render-html";
import WearableListModal from "../challenges/wearable-list-modal";

const { height } = Dimensions.get("window");

class LearnMore extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showLeaveAlert: false,
      showWearables: false,
    };
  }

  componentDidMount() {
    this.props.registerEvent(eventNames.viewKnowMore);
  }

  getChallenge = () => {
    return pathOr(
      {},
      ["navigation", "state", "params", "challenge"],
      this.props
    );
  };

  renderHeader = challenge => {
    const { name, url, joined, icon = {} } = challenge;
    const header = `<span style='color:white'>${metaFinderChallenges(
      name + "_header"
    )}</span>`;
    const challengeType = `<span style='color:white'>${metaFinderChallenges(
      name + "_challengeType"
    )}</span>`;

    return (
      <View>
        <ImageBackground
          source={{ uri: icon.url }}
          resizeMode="cover"
          style={styles.headerImage}
          imageStyle={styles.headerImageStyle}
        >
          <TouchableOpacity
            style={styles.leftArrow}
            onPress={() => NavigationService.goBack()}
          >
            <Image source={LEFT_ARROW} />
          </TouchableOpacity>
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.72)", "rgba(0, 0, 0, 0.41)"]}
            style={styles.gradientContainerHeader}
          >
            <View>
              <HTML html={header} />
              <HTML html={challengeType} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.pdfContainer}
                onPress={() => this.props.openPDF(url)}
              >
                <Image source={PDF_ICON} resizeMode={"contain"} />
              </TouchableOpacity>
              {joined && (
                <PopUpMenu
                  config={{ onPress: () => this.leaveGroup() }}
                  style={{ color: "#ffffff" }}
                />
              )}
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  };

  leaveGroup = () => {
    this.setState({ showLeaveAlert: true });
  };

  renderActiveView = () => {
    return (
      <View style={styles.activeContainer}>
        <Image
          source={ACTIVE_CHECK}
          style={styles.activeIcon}
          resizeMode="contain"
        />
        <Text style={styles.activeStyle}>{metaFinderChallenges("active")}</Text>
      </View>
    );
  };

  renderLeaveConfirmationModal = challenge => {
    return (
      <Modal
        isVisible={this.state.showLeaveAlert}
        style={styles.disconnectModal}
        onBackButtonPress={() => this.setState({ showLeaveAlert: false })}
      >
        <View style={styles.disconnectContainer}>
          <Image
            source={disconnectAlert}
            style={styles.disconnectAlert}
            resizeMode="contain"
          />
          <Text style={styles.disconnectMsg}>
            {metaFinderChallenges("leaveAlert")}
          </Text>
          <Text style={styles.disconnectDesc}>
            {metaFinderChallenges("leaveAlertDesc")}
          </Text>
          <View style={styles.disconnectSeparator} />
          <View style={styles.disconnectBtnContainer}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                this.setState({ showLeaveAlert: false });
                this.props.leaveGroup(challenge);
                this.props.registerEvent(eventNames.leaveGroup, {
                  communityId: challenge.id,
                  communityName: challenge.name,
                  completionDate: moment(),
                });
                NavigationService.goBack();
              }}
            >
              <Text style={styles.cancelText}>
                {metaFinderChallenges("leaveAlertOk")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.disconnectBtn}
              onPress={() => {
                this.setState({ showLeaveAlert: false });
              }}
            >
              <LinearGradient
                colors={["#ec1c2e", "#a21421"]}
                style={styles.disconnectBtnGradient}
              >
                <Text style={styles.disconnectText}>
                  {metaFinderChallenges("leaveAlertCancel")}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  onWearableSelection = wearable => {
    const challenge = this.getChallenge();
    if (!wearable) {
      this.setState({
        showWearables: false,
      });
      this.props.gotoWearableList(challenge.id);
    } else {
      if (challenge) {
        this.setState(
          {
            showWearables: false,
          },
          () => {
            this.props.joinGroup(challenge, wearable);
            this.props.registerEvent(eventNames.joinGroup, {
              communityId: challenge.id,
              communityName: challenge.name,
            });
            NavigationService.goBack();
          }
        );
      }
    }
  };

  onModalDismiss = () => {
    this.setState({
      showWearables: false,
    });
  };

  joinGroup = () => {
    this.setState({
      showWearables: true,
    });
  };

  goToLeaderBoard = challenge => {
    this.props.registerEvent(eventNames.leaderboard, {
      communityId: challenge.id,
      communityName: challenge.name,
      completionDate: moment(),
    });
    const unit = pathOr(
      "",
      ["groupActivity", "criteria", "activities", "0", "metrics", "0", "unit"],
      challenge
    );
    this.props.goToLeaderBoard({ ...challenge, unit });
  };

  renderLeaderBoardIcon = challenge => {
    return (
      <TouchableOpacity
        style={styles.leaderboardContainer}
        onPress={() => this.goToLeaderBoard(challenge)}
      >
        <Image source={LEADERBOARD} />
      </TouchableOpacity>
    );
  };

  renderLeaderBoard = totalMembers => {
    return (
      <View style={[styles.rowItem, styles.leaderBoardContainerDetailed]}>
        <Image source={LEADERBOARD_BLACK} style={styles.icon} />
        <View style={styles.dateDetails}>
          <Text style={styles.dateStyle}>
            {totalMembers + metaFinderChallenges("peopleJoined")}
          </Text>
        </View>
      </View>
    );
  };

  renderDateSection = challenge => {
    const totalMembers = path(["attributes", "membersCount"], challenge);
    const startDate = moment(
      path(["groupActivity", "startTime"], challenge)
    ).format("DD MMM YYYY");
    const endDate = moment(
      path(["groupActivity", "endTime"], challenge)
    ).format("DD MMM YYYY");
    return (
      <View style={[styles.rowAlign, styles.dateView]}>
        {challenge.joined && this.renderActiveView()}
        <View style={styles.rowAlign}>
          <View>
            <Text style={styles.dateHeader}>
              {metaFinderChallenges("startDateCaps")}
            </Text>
            <Text style={styles.dateSubHeader}>{startDate}</Text>
          </View>
          <View style={styles.dateSeperator} />
          <View>
            <Text style={styles.dateHeader}>
              {metaFinderChallenges("endDateCaps")}
            </Text>
            <Text style={styles.dateSubHeader}>{endDate}</Text>
          </View>
        </View>
        {challenge.joined && this.renderLeaderBoardIcon(challenge)}
        {!challenge.joined && this.renderLeaderBoard(totalMembers)}
      </View>
    );
  };

  renderAlertSection = challenge => {
    const { name } = challenge;
    return (
      <View style={[styles.alertContainer, styles.rowAlign]}>
        <Image source={INFO} />
        <View style={{ width: 283, marginLeft: 10 }}>
          <HTML html={metaFinderChallenges(name + "_info")} />
        </View>
      </View>
    );
  };

  renderBadgesProgramSection = () => {
    return (
      <View style={styles.badgesContainer}>
        <View style={styles.badgesHeaderContainer}>
          <Image source={REWARDSUN} style={styles.sunImage} />
          <Text style={styles.badgesHeaderText}>
            {metaFinderChallenges("badgesProgram")}
          </Text>
        </View>
        <Text style={styles.BadgesCenterText}>
          {metaFinderChallenges("badgeCriteria")}
        </Text>
        <View style={[styles.rowAlign, styles.badgesListingContainer]}>
          <View
            style={[
              styles.badgeCenterAlignContainer,
              styles.badgeRightMarginContainer,
            ]}
          >
            <Image source={BADGEGOLD} style={styles.badgeImage} />
            <Text style={styles.badgeText}>500 Badges</Text>
          </View>
          <View
            style={[
              styles.badgeCenterAlignContainer,
              styles.badgeRightMarginContainer,
            ]}
          >
            <Image source={BADGESILVER} style={styles.badgeImage} />
            <Text style={styles.badgeText}>300 Badges</Text>
          </View>
          <View style={styles.badgeCenterAlignContainer}>
            <Image source={BADGEBRONZE} style={styles.badgeImage} />
            <Text style={styles.badgeText}>150 Badges</Text>
          </View>
        </View>
      </View>
    );
  };

  handleOnPress = challenge => {
    if (challenge.joined) {
      this.goToLeaderBoard(challenge);
    } else {
      this.joinGroup();
    }
  };

  render() {
    const challenge = this.getChallenge();
    return (
      <MenuProvider>
        <ScrollView>
          {this.renderHeader(challenge)}
          {this.renderDateSection(challenge)}
          {this.renderAlertSection(challenge)}
          {/*this.renderBadgesProgramSection(challenge)*/}
          <ImageBackground source={SCATTERED_DOTS} style={styles.dotsImage}>
            <TouchableOpacity
              style={styles.trackNowContainer}
              onPress={() => this.handleOnPress(challenge)}
            >
              <Text style={styles.trackNowText}>
                {challenge.joined
                  ? metaFinderChallenges("trackNow")
                  : metaFinderChallenges("joinNow")}
              </Text>
            </TouchableOpacity>
          </ImageBackground>
          {this.state.showWearables && (
            <WearableListModal
              wearables={this.props.customerConnectedWearables}
              onSelected={this.onWearableSelection}
              onDismiss={this.onModalDismiss}
            />
          )}
          {this.state.showLeaveAlert &&
            this.renderLeaveConfirmationModal(challenge)}
        </ScrollView>
      </MenuProvider>
    );
  }
}

const mapStateToProps = state => ({
  customerConnectedWearables: pathOr(
    [],
    ["FitnessTrackersReducer", "customerConnectedWearables"],
    state
  ),
});

const mapDispatchToProps = {
  registerEvent,
  leaveGroup: group => ({
    context: screens.CHALLENGES,
    type: actions.leaveChallenge,
    payload: {
      group,
    },
  }),
  goToLeaderBoard: group => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: screens.LEADERBOARD,
    payload: {
      params: {
        group,
      },
    },
  }),
  joinGroup: (group, wearable) => ({
    context: screens.CHALLENGES,
    type: actions.joinChallenge,
    payload: {
      group,
      wearable,
    },
  }),
  gotoWearableList: () => ({
    context: screens.CHALLENGES,
    type: actions.goToWerableLisstPage,
    payload: {
      fromChallenges: true,
    },
  }),
  openPDF: uri => {
    return {
      type: CoreActionTypes.GO_TO_SCREEN,
      navigateTo: "PolicyPdfViewer",
      payload: {
        params: {
          source: {
            uri,
          },
          hideDownloadOption: true,
        },
      },
    };
  },
};

const styles = StyleSheet.create({
  BadgesCenterText: {
    color: "rgb(64, 64, 64)",
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 20,
  },
  activeContainer: {
    alignItems: "center",
    backgroundColor: "rgba(92,180,21,1)",
    borderRadius: 5,
    height: 46,
    justifyContent: "center",
    width: 47,
  },
  activeIcon: {
    height: 11.9,
    marginVertical: 5,
    width: 15.9,
  },
  activeStyle: {
    color: Colors.white,
    fontSize: 11,
    lineHeight: 13,
  },
  alertContainer: {
    backgroundColor: "rgb(255, 243, 243)",
    borderRadius: 7,
    elevation: 1,
    marginBottom: 13,
    marginHorizontal: 20,
    marginTop: 18,
    padding: 12,
    shadowColor: "rgba(0, 0, 0, 0.16)",
  },
  badgeCenterAlignContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  badgeImage: { marginBottom: 20 },
  badgeRightMarginContainer: {
    marginRight: 46,
  },
  badgeText: {
    color: "rgb(47, 47, 47)",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
  },
  badgesContainer: {
    alignItems: "center",
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 7,
    elevation: 1,
    justifyContent: "center",
    marginHorizontal: 20,
    paddingBottom: 24,
    paddingLeft: 13,
    paddingRight: 24,
    paddingTop: 13,
    shadowColor: "rgba(0, 0, 0, 0.11)",
  },
  badgesHeaderContainer: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    marginBottom: 8,
  },
  badgesHeaderText: {
    color: "rgb(47, 47, 47)",
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 15,
  },
  badgesListingContainer: { paddingTop: 22 },
  cancelBtn: {
    alignItems: "center",
    alignSelf: "center",
    height: 32,
    justifyContent: "center",
    width: 80,
  },
  cancelText: {
    alignSelf: "center",
    color: Colors.pulseRed,
    fontSize: 14,
    lineHeight: 17,
    textAlign: "center",
  },
  dateDetails: {
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 10,
  },
  dateHeader: {
    color: "rgb(142, 142, 142)",
    fontSize: 11,
    lineHeight: 13,
  },
  dateSeperator: {
    borderColor: "rgb(142, 142, 142)",
    borderRightWidth: 1,
    marginHorizontal: 25,
  },
  dateStyle: {
    alignSelf: "flex-start",
    color: "rgba(47, 47, 47, 1)",
    fontSize: 13,
    lineHeight: 15,
  },
  dateSubHeader: {
    color: "rgb(64, 64, 64)",
    fontSize: 14,
    lineHeight: 16,
  },
  dateView: {
    alignItems: "center",
    backgroundColor: Colors.white,
    borderColor: "rgba(0, 0, 0, 0.16)",
    borderWidth: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  disconnectAlert: {
    height: 87,
    marginBottom: 10,
    marginTop: 42,
    width: 186,
  },
  disconnectBtn: {
    alignSelf: "center",
    borderRadius: 59,
    height: 32,
    margin: 10,
    width: 106,
  },
  disconnectBtnContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  disconnectBtnGradient: {
    alignItems: "center",
    borderRadius: 59,
    height: 32,
    justifyContent: "center",
    width: 106,
  },
  disconnectContainer: {
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 7,
    height: 322,
    justifyContent: "center",
    width: 336,
  },
  disconnectDesc: {
    color: "rgba(68,68,68,1)",
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  disconnectModal: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  disconnectMsg: {
    color: "rgba(47,47,47,1)",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 21,
    marginBottom: 10,
    textAlign: "center",
  },
  disconnectSeparator: {
    backgroundColor: Colors.lightSlateGrey,
    height: 0.5,
    marginHorizontal: 50,
    marginTop: 20,
    width: 250,
  },
  disconnectText: {
    alignSelf: "center",
    color: Colors.white,
    fontSize: 10,
    fontWeight: "bold",
    lineHeight: 12,
    textAlign: "center",
  },
  dotsImage: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 63,
  },
  gradientContainerHeader: {
    alignItems: "center",
    bottom: 0,
    flexDirection: "row",
    height: 47,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    width: "100%",
  },
  headerImage: { height: 199.5, paddingTop: 60, width: "100%" },
  headerImageStyle: {
    height: 199.5,
    width: "100%",
  },
  icon: {
    height: 25,
    marginLeft: 10,
    width: 25,
  },
  leaderBoardContainerDetailed: {
    alignItems: "center",
    backgroundColor: "rgba(255,254, 219, 1)",
    borderColor: "rgba(228,228, 228, 1)",
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    margin: 10,
    maxWidth: 114,
  },
  leaderboardContainer: {
    alignItems: "center",
    backgroundColor: Colors.pulseRed,
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  leftArrow: {
    height: 40,
    marginLeft: 20,
    position: "absolute",
    top: height * 0.05,
    width: 40,
  },
  pdfContainer: {
    alignItems: "center",
    height: 20,
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 5,
    width: 20,
  },
  rowAlign: { flexDirection: "row" },
  rowItem: {
    flexDirection: "row",
  },
  subHeaderText: { color: Colors.white, fontSize: 12, lineHeight: 14 },
  sunImage: { marginRight: 6 },
  trackNowContainer: {
    alignItems: "center",
    backgroundColor: Colors.pulseRed,
    borderRadius: 30,
    height: 40,
    justifyContent: "center",
    width: 221,
  },
  trackNowText: { color: "rgb(255, 255,255)", fontSize: 14, lineHeight: 30 },
});

export default connect(mapStateToProps, mapDispatchToProps)(LearnMore);

LearnMore.propTypes = {
  leaveGroup: PropTypes.func,
  registerEvent: PropTypes.func,
  goToLeaderBoard: PropTypes.func,
  joinGroup: PropTypes.func,
  customerConnectedWearables: PropTypes.object,
  gotoWearableList: PropTypes.func,
  openPDF: PropTypes.func,
};
