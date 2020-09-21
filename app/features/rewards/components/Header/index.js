import React, { PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
} from "react-native";
import { connect } from "react-redux";
import {
  AVATAR,
  REWARDS_BACKGROUND_NEW,
  REWARD_VOUCHER_HEAD,
  SR_ICON,
} from "../../../../config/images";
import { metaFinderRewards } from "../../configs/meta-utils";
import {
  ELEMENT_KEY_TRANS_HISTORY,
  ELEMENT_KEY_VOUCHERS,
  ELEMENT_KEY_BADGES,
} from "../../configs/metaConstant";
import { PruBackHeader } from "../../../../components";
import { styles } from "./styles";
import screens from "../../configs/screenNames";
import actions from "../../configs/actionNames";
import MetaConstants from "../../meta";
import { withNavigation } from "react-navigation";
import { RewardSelector } from "../../Selector";

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  onTransactionHistoryPress = () => {
    const { navigation } = this.props;
    navigation.navigate(screens.REWARD_TRANSACTION_HISTORY);
  };

  render() {
    const { vouchers, badges, isLoading, transactions } = this.props;
    const vouchersLabel = metaFinderRewards(ELEMENT_KEY_VOUCHERS);
    const badgesLabel = metaFinderRewards(ELEMENT_KEY_BADGES);
    return (
      <ImageBackground
        style={styles.container}
        source={REWARDS_BACKGROUND_NEW}
        resizeMode={"cover"}
      >
        <PruBackHeader customStyles={styles.customStyles} inverse={true} />
        <View style={styles.content}>
          <Text style={styles.rewardsText}>{this.MetaConstants.rewards}</Text>
          <View>
            <View style={styles.vouchersContainer}>
              {metaFinderRewards("enableVoucher") ? (
                <>
                  <Image
                    source={REWARD_VOUCHER_HEAD}
                    style={styles.voucherImage}
                    resizeMode={"contain"}
                  />
                  <View style={styles.voucherWrapper}>
                    <Text style={styles.voucherCount}>
                      {isLoading ? "-" : vouchers?.length || 0}
                    </Text>
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
                    <Text style={styles.voucherCount}>
                      {isLoading ? "-" : badges}
                    </Text>
                    <Text style={styles.voucherLabel}>{badgesLabel}</Text>
                  </View>
                </>
              ) : null}
            </View>
            {transactions.length > 0 ? (
              <TouchableOpacity onPress={this.onTransactionHistoryPress}>
                <Text style={styles.transactionHistory}>
                  {metaFinderRewards(ELEMENT_KEY_TRANS_HISTORY)}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  const loyaltyPoints = state.rewardCenter.loyaltyPoints;
  return {
    badges: RewardSelector.getTotalBadgeCount(loyaltyPoints),
    vouchers: state.rewardCenter.vouchers,
    isLoading: state.rewardCenter.isLoading,
    transactions: RewardSelector.getBadges(state.rewardCenter.transactions),
  };
};

export default withNavigation(connect(mapStateToProps, {})(Header));
