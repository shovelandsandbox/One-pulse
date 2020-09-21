import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  REWARD_VOUCHER_HEAD,
  SR_ICON,
  REWARD_BG,
} from "../../../../config/images";

import MetaConstants from "../../meta";
import { PruBackHeader } from "../../../../components";
import { RewardCard } from "../../components";
import { metaFinderRewards } from "../../configs/meta-utils";
import {
  ELEMENT_KEY_VOUCHERS,
  ELEMENT_KEY_BADGES,
  ELEMENT_KEY_DISCOVER_REWARDS,
} from "../../configs/metaConstant";
import { RewardSelector } from "../../Selector";

class DiscoverRewards extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bonusActivityList: [],
    };
    this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    const bonusActivityList = this.MetaConstants.bonusActivityList;
    this.setState({ bonusActivityList });
  }

  handleBadgesAndVouchers = () => {
    const { vouchers, badges } = this.props;
    const vouchersLabel = metaFinderRewards(ELEMENT_KEY_VOUCHERS);
    const badgesLabel = metaFinderRewards(ELEMENT_KEY_BADGES);
    return (
      <View style={styles.vouchersContainer}>
        {metaFinderRewards("enableVoucher") ? (
          <>
            <Image
              source={REWARD_VOUCHER_HEAD}
              style={styles.voucherImage}
              resizeMode={"contain"}
            />
            <View style={styles.voucherWrapper}>
              <Text style={styles.voucherCount}>{vouchers?.length || 0}</Text>
              <Text style={styles.voucherLabel}>{vouchersLabel}</Text>
            </View>
          </>
        ) : null}
        {metaFinderRewards("enableBadge") ? (
          <>
            <Image
              source={SR_ICON}
              style={styles.badgeImage}
              resizeMode={"contain"}
            />
            <View style={styles.badgeWrapper}>
              <Text style={styles.voucherCount}>{badges}</Text>
              <Text style={styles.voucherLabel}>{badgesLabel}</Text>
            </View>
          </>
        ) : null}
      </View>
    );
  };

  renderHeader() {
    return (
      <View style={styles.backContainer}>
        <PruBackHeader
          title={metaFinderRewards(ELEMENT_KEY_DISCOVER_REWARDS)}
          rightImage={true}
          rightImageRenderMethod={this.handleBadgesAndVouchers}
        />
      </View>
    );
  }

  render() {
    const { bonusActivityList } = this.state;
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ImageBackground
          source={REWARD_BG}
          style={{ width: "100%", height: "100%" }}
          resizeMode={"stretch"}
        >
          <FlatList
            data={bonusActivityList}
            contentContainerStyle={{
              justifyContent: "center",
              alignSelf: "center",
              paddingTop: 20,
              paddingBottom: 40,
            }}
            numColumns={2}
            columnWrapperStyle={{ margin: 0 }}
            renderItem={({ item, index }) => {
              return (
                <RewardCard
                  item={item}
                  style={{
                    width: Dimensions.get("window").width / 2 - 20,
                    height: 210,
                    margin: 10,
                  }}
                />
              );
            }}
          />
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const loyaltyPoints = state.rewardCenter.loyaltyPoints;
  return {
    badges: RewardSelector.getTotalBadgeCount(loyaltyPoints),
    vouchers: state.rewardCenter.vouchers,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverRewards);

const styles = StyleSheet.create({
  backContainer: {
    borderBottomWidth: 0.2,
    shadowColor: "#e2e2e2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    backgroundColor: "#fff",
    elevation: 4,
  },
  container: { backgroundColor: "#f4f7fc", flex: 1 },
  voucherCount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  voucherImage: {
    height: 20,
    width: 20,
  },
  voucherLabel: {
    fontSize: 12,
  },
  voucherWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 8,
  },
  vouchersContainer: {
    alignItems: "center",
    backgroundColor: "#FFFA",
    borderRadius: 30,
    flexDirection: "row",
    paddingHorizontal: 26,
  },
  badgeImage: {
    height: 20,
    width: 20,
    paddingHorizontal: 15,
  },
  badgeWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});
