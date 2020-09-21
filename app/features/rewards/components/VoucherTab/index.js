/* eslint-disable react/require-optimization */
import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./style";
import FilterHomeTab from "../FilterHomeTab";
import VoucherView from "../VoucherView";
import { pathOr } from "ramda";
import { metaFinderRewards } from "../../configs/meta-utils";
import {
  ELEMENT_KEY_ALL_VOUCHERS,
  ELEMENT_KEY_ACTIVE_VOUCHERS,
  NO_VOUCHERS,
} from "../../configs/metaConstant";
import { RewardSelector } from "../../Selector";
import EmptyVoucher from "../EmptyVoucher";
class VoucherTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "activeVouchers",
    };
    this.subs = [];
  }
  componentDidMount() {
    const { tileName } = this.props;

    this.setState({ filter: tileName });
  }

  render() {
    const { filter } = this.state;
    const { onTabPress, allVouchers, activeVouchers } = this.props;
    const activeVouchersText = metaFinderRewards(ELEMENT_KEY_ACTIVE_VOUCHERS);
    const allVouchersText = metaFinderRewards(ELEMENT_KEY_ALL_VOUCHERS);
    const noVoucherMessage = metaFinderRewards(NO_VOUCHERS);
    if (allVouchers.length === 0) {
      return <EmptyVoucher message={noVoucherMessage} />;
    }
    return (
      <View style={styles.whiteContainer}>
        <FilterHomeTab
          onPress={filter => {
            this.setState({ filter });
            onTabPress(filter);
          }}
          filterItems={[
            {
              text: `${activeVouchersText} (${activeVouchers.length})`,
              value: "activeVouchers",
            },
            { text: allVouchersText, value: "allVouchers" },
          ]}
          showFaq={false}
          selectedValue={filter}
          icon={false}
        />
        <VoucherView
          data={filter === "allVouchers" ? allVouchers : activeVouchers}
        />
      </View>
    );
  }
}

VoucherTab.propTypes = {
  tileName: PropTypes.string,
  onTabPress: PropTypes.func,
  allVouchers: PropTypes.array,
  activeVouchers: PropTypes.array,
};

const mapStateToProps = state => {
  const {
    rewardCenter: { transactions, walletDetails },
  } = state;
  return {
    transactions,
    allVouchers: pathOr([], ["vouchers"], walletDetails),
    activeVouchers: RewardSelector.getActiveVouchers(walletDetails.vouchers),
  };
};

export default connect(mapStateToProps, {})(VoucherTab);
