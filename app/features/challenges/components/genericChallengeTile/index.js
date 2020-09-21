import React, { PureComponent } from "react";
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  LEADERBOARD,
  ACTIVE_CHECK,
} from "../../../../../assets/images/challenges";
import { metaFinderChallenges } from "../../utils/meta-utils";
import HTML from "react-native-render-html";
import PopUpMenu from "../my-challenge/pop-up-menu";
import * as Types from "../../types";
import { path, pathOr } from "ramda";
import { func } from "prop-types";
import styles from "./styles";
import moment from "moment";

class ChallengeTile extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderHeader = () => {
    const { challenge, leaveGroup } = this.props;
    const { joined, name } = challenge;
    const header = `<span style='color:black'>${metaFinderChallenges(
      name + "_header"
    )}</span>`;
    return (
      <View style={[styles.rowItem, styles.header]}>
        <HTML html={header} />
        {joined && (
          <PopUpMenu config={{ onPress: () => leaveGroup(challenge) }} />
        )}
      </View>
    );
  };

  renderDates = (startDate, endDate) => {
    return (
      <View style={[styles.rowItem, styles.dateContainer]}>
        <View style={styles.dateDetails}>
          <Text style={styles.dateLabelStyle}>
            {metaFinderChallenges("startDateCaps")}
          </Text>
          <Text style={styles.dateStyle}>{startDate}</Text>
        </View>
        <View style={styles.dateDetails}>
          <View style={styles.dateSeparator} />
        </View>
        <View style={styles.dateDetails}>
          <Text style={styles.dateLabelStyle}>
            {metaFinderChallenges("endDateCaps")}
          </Text>
          <Text style={styles.dateStyle}>{endDate}</Text>
        </View>
      </View>
    );
  };

  renderLeaderBoard = totalMembers => {
    return (
      <View style={[styles.rowItem, styles.leaderBoardContainer]}>
        <Image source={LEADERBOARD} style={styles.icon} />
        <View style={styles.dateDetails}>
          <Text style={styles.dateStyle}>
            {totalMembers + metaFinderChallenges("peopleJoined")}
          </Text>
        </View>
      </View>
    );
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

  renderLeaderBoardIcon = challenge => {
    return (
      <TouchableOpacity
        style={styles.leaderBoardIconContainer}
        onPress={() => this.props.goToLeaderboard(challenge)}
      >
        <Image
          source={LEADERBOARD}
          style={styles.leaderboardIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  renderBody = () => {
    const { challenge = {} } = this.props;
    const url = pathOr("", ["icon", "url"], challenge);
    const totalMembers = path(["attributes", "membersCount"], challenge);
    const { joined, status } = challenge;

    const startDate = moment(
      path(["groupActivity", "startTime"], challenge)
    ).format("DD MMM YYYY");
    const endDate = moment(
      path(["groupActivity", "endTime"], challenge)
    ).format("DD MMM YYYY");
    return (
      <ImageBackground
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
        source={{ uri: url }}
      >
        <View style={styles.body}>
          <View style={[styles.rowItem, styles.bodyFooter]}>
            {joined && status === "ACTIVE" && this.renderActiveView()}
            {this.renderDates(startDate, endDate)}
            {joined && this.renderLeaderBoardIcon(challenge)}
            {!joined && this.renderLeaderBoard(totalMembers)}
          </View>
        </View>
      </ImageBackground>
    );
  };

  renderDescription = () => {
    const { challenge } = this.props;
    const name = path(["name"], challenge);
    const descriptionText = metaFinderChallenges(name + "_description");
    return (
      <View style={styles.description}>
        <HTML html={descriptionText} />
      </View>
    );
  };

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  renderFooter = () => {
    const { challenge, joinGroup, trackChallenge, goToChallenge } = this.props;
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.knowMoreButton}
          onPress={() => {
            goToChallenge(challenge);
          }}
        >
          <Text style={styles.knowMoreText}>
            {metaFinderChallenges("knowMore")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => {
            if (challenge.joined) {
              trackChallenge(challenge);
            } else {
              joinGroup(challenge);
            }
          }}
        >
          <Text style={styles.joinText}>
            {challenge.joined
              ? metaFinderChallenges("trackNow")
              : metaFinderChallenges("joinNow")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderDescription()}
        {this.renderSeparator()}
        {this.renderFooter()}
      </View>
    );
  }
}

ChallengeTile.propTypes = {
  challenge: Types.group,
  joinGroup: func,
  leaveGroup: func,
  goToChallenge: func,
  goToLeaderboard: func,
  trackChallenge: func,
};

export default ChallengeTile;
