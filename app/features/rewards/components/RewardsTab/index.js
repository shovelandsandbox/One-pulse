/* eslint-disable react/require-optimization */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import styles from "./style";
import FilterHomeTab from "../FilterHomeTab";
import VoucherTab from "../VoucherTab";
import { SR_ICON } from "../../../../config/images";
import LinearButton from "../LinearButton";
import { metaFinderRewards } from "../../configs/meta-utils";
import {
  ELEMENT_KEY_VOUCHERS,
  ELEMENT_KEY_BADGES,
  ELEMENT_KEY_EARN_MORE,
  ELEMENT_KEY_TOTAL_BADGES,
} from "../../configs/metaConstant";
import MetaConstants from "../../meta";
const redGradient = ["#ec1c2e", "#a21421"];

class RewardsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "Vouchers",
      tileName: "activeVouchers",
    };
    this.subs = [];
    this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  }
  componentDidMount() {
    const { tilename } = this.props;

    this.setState({ filter: tilename });
  }
  handleTabPress = tile => {
    this.setState({ tileName: tile });
  };
  renderEarnMore = (filter, totalBadgeCount) => {
    const bonusActivityList = this.MetaConstants.bonusActivityList;
    if (filter === "Badges") {
      const earnMore = metaFinderRewards(ELEMENT_KEY_EARN_MORE);
      const totalBadge = metaFinderRewards(ELEMENT_KEY_TOTAL_BADGES);
      const { onEarnPress } = this.props;
      return (
        <View style={styles.earnContainer}>
          <View style={styles.earnFlex1}>
            <View style={styles.flexDirec}>
              <Image source={SR_ICON} style={styles.IconsStyle} />
              <Text style={styles.earnBadgeCount}>{totalBadgeCount}</Text>
            </View>
            <Text style={styles.earnTotalBadge}>{totalBadge}</Text>
          </View>
          {
            bonusActivityList.length > 0 &&
            <View style={styles.earnFlex2}>
              <LinearButton
                colors={redGradient}
                text={earnMore}
                onTextPress={() => {
                  onEarnPress();
                }}
                isDisabled={false}
              />
            </View>
          }
        </View>
      );
    }
  };
  render() {
    const { filter, tileName } = this.state;
    const {
      BadgeComponent,
      onTabPress,
      totalBadge,
      showFaqIcon,
      handleFaqPress,
    } = this.props;
    const vouchers = metaFinderRewards(ELEMENT_KEY_VOUCHERS);
    const badges = metaFinderRewards(ELEMENT_KEY_BADGES);
    return (
      <View style={styles.whiteContainer}>
        <FilterHomeTab
          onPress={filter => {
            this.setState({ filter });
            onTabPress(filter);
          }}
          filterItems={[
            { text: badges, value: "Badges" },
            { text: vouchers, value: "Vouchers" },
          ]}
          icon={true}
          showFaq={showFaqIcon}
          selectedValue={filter}
          onFaqPress={() => handleFaqPress()}
        />
        {this.renderEarnMore(filter, totalBadge)}
        {filter === "Badges" && (
          <View style={styles.whiteContainerBody}>{BadgeComponent}</View>
        )}
        {filter === "Vouchers" && (
          <VoucherTab tileName={tileName} onTabPress={this.handleTabPress} />
        )}
      </View>
    );
  }
}

export default RewardsTab;
