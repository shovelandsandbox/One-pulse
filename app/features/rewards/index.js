/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-optimization */
import React from "react";
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  Easing,
} from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import { pathOr } from "ramda";
import {
  DetailCell,
  RewardsTab,
  EmptyVoucher,
  Header,
  FAQComponent,
  SnapView,
  MyRewardsView,
} from "./components";
import { metaFinderRewards } from "../../features/rewards/configs/meta-utils";
import styles from "./styles";
import PruBackHeader from "../../components/PruBackHeader";
import {
  getCustomerTransactions,
  goToScreens,
  getCustomerWallet,
  setLoader,
} from "./actions";
import { RewardSelector } from "./Selector";
import CarousalView from "../rewards/components/CarousalView";
import {
  ELEMENT_KEY_MY_REWARDS,
  ELEMENT_KEY_NO_BADGES,
  ELEMENT_KEY_BONUS_REWARDED,
  ELEMENT_KEY_NOREWARDS,
} from "../../features/rewards/configs/metaConstant";
import { REWARD_BG } from "../../config/images";
import screens from "./configs/screenNames";
import MetaConstants from "./meta";
import { PruLoader } from "../../components";

const formatDate = date => moment(date).format("DD MMM YY");
class Rewards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tileName: "Badges",
      bonusActivityList: [],
    };
    this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    const {
      getCustomerWallet,
      getCustomerTransactions,
      setLoader,
    } = this.props;
    const bonusActivityList = this.MetaConstants.bonusActivityList;
    this.setState({ bonusActivityList });
    setLoader();
    getCustomerWallet();
    getCustomerTransactions();
  }

  handleTabPress = tile => {
    this.setState({ tileName: tile });
  };

  earnPress = () => {
    const { goToScreens } = this.props;
    goToScreens(null, "EarnBadges");
  };

  handleViewDetailPress = () => {
    const { goToScreens } = this.props;
    goToScreens(null, "VoucherDetails");
  };

  onViewAllPress = () => {
    const { navigation } = this.props;
    navigation.navigate(screens.REWARDS_DISCOVER_REWARDS);
  };

  onMyRewardsViewAllPress = () => {
    const { navigation } = this.props;
    navigation.navigate(screens.REWARDS_MY_REWARDS);
  };

  getBadges() {
    const { badges } = this.props;
    const noTransctionsMsg = metaFinderRewards(ELEMENT_KEY_NO_BADGES);
    if (badges.length === 0) {
      return <EmptyVoucher message={noTransctionsMsg} />;
    }
    return (
      <View>
        {badges.slice(0, 3).map(transaction => (
          <DetailCell
            text={transaction.detail}
            noOfBadges={transaction.amount}
            transactionType={transaction.transactionType}
            subText={formatDate(transaction.transactionDate)}
            key={transaction.id}
            isBonusRewarded={pathOr(
              false,
              ["attributes", "isBonus"],
              transaction
            )}
            type={transaction.type}
            bonusRewardedText={metaFinderRewards(ELEMENT_KEY_BONUS_REWARDED)}
            onBonusTagPress={this.enableRewardProgressModal}
          />
        ))}
      </View>
    );
  }

  handleFaqPress = () => {
    const { goToScreens } = this.props;
    goToScreens(null, "FAQ");
  };

  noRewards() {
    return (
      <View style={styles.noRewardsContainer}>
        <Text style={styles.noRewardsHeading}>
          {this.MetaConstants.noRewardsYet}
        </Text>
        <Text style={styles.noRewardsText}>
          {metaFinderRewards(ELEMENT_KEY_NOREWARDS)}
        </Text>
        <TouchableOpacity
          style={styles.noRewardsButton}
          onPress={this.onViewAllPress}
        >
          <Text style={styles.noRewardsButtonText}>
            {this.MetaConstants.discoverRewards}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderNewUi() {
    const { badges, vouchers, isLoading } = this.props;
    return (
      <>
        <Image
          source={REWARD_BG}
          style={styles.imageBg}
          resizeMode={"stretch"}
        ></Image>
        <ScrollView style={styles.container}>
          <Header />
          {isLoading ? (
            <View style={{ flex: 1, marginVertical: 100 }}>
              <PruLoader />
            </View>
          ) : (
            <ScrollView style={styles.flex}>
              {this.state.bonusActivityList.length !== 0 ? (
                <View style={styles.sectionHeader}>
                  <Text style={styles.label}>
                    {this.MetaConstants.discoverRewards}
                  </Text>
                  <TouchableOpacity onPress={this.onViewAllPress}>
                    <Text style={styles.highlight}>
                      {this.MetaConstants.viewAll}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              <SnapView />
              {metaFinderRewards("enableMyRewards") ? (
                <View style={[styles.sectionHeader, { marginTop: 0 }]}>
                  <Text style={styles.label}>
                    {metaFinderRewards(ELEMENT_KEY_MY_REWARDS)}
                  </Text>
                  {vouchers.length !== 0 ? (
                    <TouchableOpacity onPress={this.onMyRewardsViewAllPress}>
                      <Text style={styles.highlight}>
                        {this.MetaConstants.viewAll}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              ) : null}
              {metaFinderRewards("enableMyRewards") && vouchers.length === 0 ? (
                <View style={styles.contentView}>{this.noRewards()}</View>
              ) : (
                <MyRewardsView />
              )}
              {metaFinderRewards("enableFAQ") ? (
                <>
                  <Text style={[styles.label, { marginTop: 10 }]}>
                    {this.MetaConstants.faq}
                  </Text>
                  <View style={styles.contentView}>
                    <FAQComponent />
                  </View>
                </>
              ) : null}
            </ScrollView>
          )}
        </ScrollView>
      </>
    );
  }

  render() {
    const { totalBadgeCount, offers } = this.props;
    const { tileName } = this.state;

    if (metaFinderRewards("enableNewRewardsUI")) {
      return this.renderNewUi();
    }

    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <PruBackHeader
            title={metaFinderRewards(ELEMENT_KEY_MY_REWARDS)}
            customStyles={styles.headerStyle}
          />
        </View>
        <ScrollView style={styles.flex}>
          {offers.length !== 0 && (
            <CarousalView
              carouselImage={offers}
              handleFaqPress={this.handleFaqPress}
            />
          )}

          <ScrollView style={styles.contentView}>
            <RewardsTab
              tilename={tileName}
              showFaqIcon={offers.length === 0 ? true : false}
              totalBadge={totalBadgeCount}
              BadgeComponent={this.getBadges()}
              onTabPress={this.handleTabPress}
              onEarnPress={this.earnPress}
              handleFaqPress={this.handleFaqPress}
              onViewDetailPress={this.handleViewDetailPress}
            />
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {
    rewardCenter: {
      transactions,
      vouchers,
      experience,
      loyaltyPoints,
      offers,
      isLoading,
    },
  } = state;

  return {
    transactions,
    vouchers,
    experience,
    offers,
    badges: RewardSelector.getBadges(transactions),
    totalBadgeCount: RewardSelector.getTotalBadgeCount(loyaltyPoints),
    isLoading,
  };
};

export default connect(mapStateToProps, {
  getCustomerTransactions,
  goToScreens,
  getCustomerWallet,
  setLoader,
})(Rewards);
