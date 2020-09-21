import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { connect } from "react-redux";
import PropTypes, { func } from "prop-types";
import { MenuProvider } from "react-native-popup-menu";
import { path, pathOr } from "ramda";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";

//configuration
import screens from "../../configs/screen-names";
import actions from "../../configs/actions";
import { affinityGroupActions } from "../../../affinity-groups/configs/affinity-group-actions";
import { default as affinityGroupscreens } from "../../../../utils/configs/screen-names";
import { NO_CHALLENGE } from "../../../../../assets/images/challenges";
import WearableListModal from "./wearable-list-modal";
import { disconnectAlert } from "../../../../config/images";

import * as Types from "../../types";

//components
import Header from "../../components/header";
import ChallengeTile from "../../components/genericChallengeTile";
import { Colors } from "../../styles";
import { metaFinderChallenges } from "../../utils/meta-utils";
import { gotoWithParams } from "../../../../actions";

//events
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";
import moment from "moment";

//Image Files
import LINKER from "../../../../../assets/images/challenges/linker.png";

const extractKey = item => {
  const key = `PruListItem: ${item.id}`;
  return key;
};

class Challenges extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "myChallenges",
      showWearables: false,
      showLeaveAlert: false,
      groupInfo: {},
    };
  }

  componentDidMount() {
    this.props.getAllChallenges();
    this.props.getMyChallenges();

    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      this.onNavigation
    );
  }

  componentWillUnmount() {
    this.props.registerEvent(eventNames.exitChallenges, {
      completionDate: moment(),
    });
    this.didFocusListener.remove();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.customerConnectedWearables !==
        this.props.customerConnectedWearables &&
      this.wearableType &&
      this.props.customerConnectedWearables.length
    ) {
      const wearable = this.props.customerConnectedWearables.find(
        w => w.wearableType.type === this.wearableType
      );
      wearable && this.onWearableSelection(wearable);
    }
  }

  onNavigation = () => {
    const { navigation } = this.props;
    //if coming from wearable selection page join group
    const wearableType = navigation.getParam("wearableType");

    this.props.navigation.setParams({
      wearableType: undefined,
    });

    //get all connected wearables from backend
    if (wearableType) {
      this.wearableType = wearableType;
      this.props.getAllCustomerWearables();
    }
  };

  joinGroup = selectedGroup => {
    this.setState({
      showWearables: true,
      selectedGroup,
    });
  };

  trackChallenge = selectedGroup => {
    const { unit, name } = pathOr(
      "",
      ["groupActivity", "criteria", "activities", "0", "metrics", "0"],
      selectedGroup
    );
    this.props.trackChallenge({ ...selectedGroup, unit, unitName: name });
  };

  onWearableSelection = wearable => {
    const group = this.state.selectedGroup;

    if (!wearable) {
      this.setState({
        showWearables: false,
      });
      this.props.gotoWearableList(group.id);
    } else {
      if (group) {
        this.setState(
          {
            showWearables: false,
            selectedGroup: null,
          },
          () => {
            this.wearableType = null;
            this.props.joinGroup(group, wearable);
            this.props.registerEvent(eventNames.joinGroup, {
              communityId: group.id,
              communityName: group.name,
            });
          }
        );
      }
    }
  };

  onModalDismiss = () => {
    this.setState({
      showWearables: false,
      selectedGroup: null,
    });
  };

  goToChallenge = challenge => {
    this.setState({ selectedGroup: challenge });
    this.props.registerEvent(eventNames.group, {
      communityId: challenge.id,
      communityName: challenge.name,
      completionDate: moment(),
    });
    if (challenge.url) {
      this.props.goToChallenge(challenge);
    }
  };

  goToWall = challenge => {
    this.props.registerEvent(eventNames.viewWall, {
      communityId: challenge.id,
      communityName: challenge.name,
      completionDate: moment(),
    });
    this.props.setCurrentGroup(challenge);
    this.props.goToWall();
  };

  leaveGroup = group => {
    this.setState({ showLeaveAlert: true, groupInfo: group });
  };

  renderLeaveConfirmationModal = () => {
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
                const { groupInfo } = this.state;
                this.props.leaveGroup(groupInfo);
                this.props.registerEvent(eventNames.leaveGroup, {
                  communityId: groupInfo.id,
                  communityName: groupInfo.name,
                  completionDate: moment(),
                });
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

  goToLeaderboard = challenge => {
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
    this.props.goToLeaderboard({ ...challenge, unit });
  };

  renderItem = ({ item }) => {
    return (
      <ChallengeTile
        challenge={item}
        joinGroup={this.joinGroup}
        trackChallenge={this.trackChallenge}
        goToWall={this.goToWall}
        goToChallenge={this.goToChallenge}
        goToLeaderboard={this.goToLeaderboard}
        leaveGroup={this.leaveGroup}
      />
    );
  };

  renderBody = () => {
    const { allChallenges, myChallenges } = this.props;
    const data = this.isMyChallenges() ? myChallenges : allChallenges;

    if (
      !this.isMyChallenges() ||
      (this.isMyChallenges() && data && data.length > 0)
    )
      return (
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={extractKey}
        />
      );
    return null;
  };

  onTabPress = key => {
    this.setState({
      activeTab: key,
    });
    this.props.registerEvent(eventNames[key]);
  };

  renderheaderNotification = () => {
    const { customerConnectedWearables, gotoWearableList } = this.props;
    const wearables = customerConnectedWearables.length;
    if (wearables === 0)
      return (
        <View style={styles.headerNotificationContainer}>
          <Image source={LINKER} />
          <View style={styles.headerNotificationTextContainer}>
            <Text style={styles.headerNotificationText}>
              {metaFinderChallenges("noConnectedWearables")}
            </Text>
            <Text
              onPress={gotoWearableList}
              style={styles.headerNotificationSubHeader}
            >
              {metaFinderChallenges("connectWearable")}
            </Text>
          </View>
        </View>
      );
    return null;
  };

  renderWelcomePage = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          style={styles.imageBackground}
          resizeMode="stretch"
          resizeMethod="auto"
          source={NO_CHALLENGE}
        />
        <View style={styles.emptyGroup}>
          <View>
            <Text style={styles.welcomeStyle}>
              {metaFinderChallenges("Get Started")}
            </Text>
          </View>
          <View style={styles.welcomeDesc}>
            <Text style={styles.emptyGroupText}>
              {metaFinderChallenges("welcomeDesc")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.onTabPress("allChallenges")}
            style={styles.buttonContainer}
          >
            <LinearGradient
              colors={["#ec1c2e", "#a21421"]}
              style={styles.buttonGradient}
            >
              <Text style={styles.emptyGroupButton}>
                {metaFinderChallenges("allChallenges")}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderHeader = (data, tab) => {
    const noChallenges = this.noChallenges(data);
    return (
      <Header
        containerStyle={noChallenges ? styles.transparentHeader : {}}
        onTabPress={buttonTitle => this.onTabPress(buttonTitle)}
        buttonTitle={tab.key}
        title={metaFinderChallenges(this.state.activeTab)}
        showHeaderRight={!noChallenges}
      />
    );
  };

  noChallenges = data => {
    return this.isMyChallenges() && data && data.length === 0;
  };

  isMyChallenges = () => {
    return this.state.activeTab === "myChallenges";
  };

  render() {
    const TABS = [{ key: "myChallenges" }, { key: "allChallenges" }];
    const tab = TABS.find(tab => tab.key != this.state.activeTab);
    const { allChallenges, myChallenges } = this.props;
    const data = this.isMyChallenges() ? myChallenges : allChallenges;
    return (
      <MenuProvider>
        <View style={styles.baseContainer}>
          {this.noChallenges(data) && this.renderWelcomePage()}
          {this.renderHeader(data, tab)}
          {this.state.showWearables && (
            <WearableListModal
              wearables={this.props.customerConnectedWearables}
              onSelected={this.onWearableSelection}
              onDismiss={this.onModalDismiss}
            />
          )}
          {this.renderheaderNotification()}
          {this.renderBody()}
          {this.state.showLeaveAlert && this.renderLeaveConfirmationModal()}
        </View>
      </MenuProvider>
    );
  }
}

Challenges.propTypes = {
  allChallenges: Types.allChallenges,
  myChallenges: Types.myChallenges,
  customerConnectedWearables: PropTypes.object,
  getAllChallenges: PropTypes.func,
  getMyChallenges: PropTypes.func,
  gotoWearableList: PropTypes.func,
  goToLeaderboard: PropTypes.func,
  setCurrentGroup: PropTypes.func,
  goToWall: PropTypes.func,
  goToChallenge: PropTypes.func,
  joinGroup: func,
  leaveGroup: func,
  registerEvent: PropTypes.func,
  navigation: PropTypes.object,
  getAllCustomerWearables: PropTypes.func,
  trackChallenge: PropTypes.func,
};

const mapStateToProps = state => ({
  allChallenges: path(["challenges", "allChallenges"], state),
  myChallenges: path(["challenges", "myChallenges"], state),
  customerConnectedWearables: pathOr(
    [],
    ["FitnessTrackersReducer", "customerConnectedWearables"],
    state
  ),
});

const mapDispatchToProps = {
  registerEvent,
  getAllChallenges: () => ({
    context: screens.CHALLENGES,
    type: actions.getAllChallenges,
    disableTimeout: true,
  }),
  getMyChallenges: () => ({
    context: screens.CHALLENGES,
    type: actions.getMyChallenges,
    disableTimeout: true,
  }),
  joinGroup: (group, wearable) => ({
    context: screens.CHALLENGES,
    type: actions.joinChallenge,
    payload: {
      group,
      wearable,
    },
  }),
  trackChallenge: challenge => {
    return gotoWithParams(screens.CHALLENGE_DETAILS, { challenge });
  },
  leaveGroup: group => ({
    context: screens.CHALLENGES,
    type: actions.leaveChallenge,
    payload: {
      group,
    },
  }),
  gotoWearableList: () => ({
    context: screens.CHALLENGES,
    type: actions.goToWerableLisstPage,
    payload: {
      fromChallenges: true,
    },
  }),
  goToLeaderboard: group => {
    return gotoWithParams(screens.LEADERBOARD, { group });
  },
  goToWall: () => {
    return gotoWithParams(affinityGroupscreens.affinityGroupWallScreen);
  },
  setCurrentGroup: group => ({
    type: affinityGroupActions.setCurrentGroup,
    payload: {
      group,
    },
  }),
  goToChallenge: challenge => {
    return gotoWithParams(screens.LEARN_MORE, { challenge });
  },
  getAllCustomerWearables: () => ({
    context: screens.CHALLENGES,
    type: actions.getAllCustomerWearables,
    disableTimeout: true,
  }),
};

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: "transparent",
    borderRadius: 130.3,
    height: 37,
    justifyContent: "center",
    marginTop: 10,
    width: 144,
  },
  buttonGradient: {
    alignItems: "center",
    borderRadius: 130.3,
    height: 37,
    justifyContent: "center",
    width: 144,
  },
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
  emptyContainer: {
    // justifyContent: "center",
  },
  emptyGroup: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 60,
    zIndex: 1,
    position: "absolute",
  },
  emptyGroupButton: {
    alignItems: "center",
    alignSelf: "center",
    color: Colors.white,
    display: "flex",
    fontFamily: "Open Sans",
    fontSize: 10,
    fontWeight: "bold",
    lineHeight: 13,
    textAlign: "center",
    textAlignVertical: "center",
  },
  emptyGroupText: {
    alignItems: "center",
    color: Colors.black,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  headerNotificationContainer: {
    alignItems: "center",
    backgroundColor: Colors.wearablePink,
    flexDirection: "row",
    height: 60,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerNotificationSubHeader: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: "bold",
    lineHeight: 12,
    marginTop: 4,
    textDecorationLine: "underline",
  },
  headerNotificationText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 14,
  },
  headerNotificationTextContainer: { marginLeft: 10 },
  imageBackground: {
    height: "100%",
    width: "100%",
    zIndex: 0,
  },
  transparentHeader: {
    backgroundColor: "transparent",
    borderWidth: 0,
    marginBottom: 45,
    position: "absolute",
  },
  welcomeDesc: {
    padding: 10,
  },
  welcomeStyle: {
    color: Colors.black,
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 29,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenges);
