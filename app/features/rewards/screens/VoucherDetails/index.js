/* eslint-disable react/require-optimization */
import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import PropTypes from "prop-types";
import moment from "moment";
import { PruBackHeader } from "../../../../components";
import { VoucherRowItem, EmptyVoucher } from "../../components";
import { RewardSelector } from "../../Selector";
import { metaFinderRewards } from "../../configs/meta-utils";
import {
  ELEMENT_KEY_MY_REWARDS,
  ELEMENT_KEY_NO_TRANSACTION,
} from "../../configs/metaConstant";
import styles from "./styles";

class VoucherDetails extends Component {
  formatDate = date => moment(date).format("DD MMM YYYY");

  renderVoucher = item => {
    return (
      <View style={styles.transactionView}>
        <Text style={styles.transactionDate}>
          {this.formatDate(item.transactionDate)}
        </Text>
        <VoucherRowItem item={item} fromVoucherDetails={true} />
      </View>
    );
  };
  renderEmptyComponent = () => {
    const noTransctionsMsg = metaFinderRewards(ELEMENT_KEY_NO_TRANSACTION);
    return <EmptyVoucher message={noTransctionsMsg} />;
  };

  render() {
    const headerText = metaFinderRewards(ELEMENT_KEY_MY_REWARDS);
    const { allVouchers, transactions, navigation } = this.props;
    const id = pathOr("", ["state", "params", "id"], navigation);
    const selectedVoucher = RewardSelector.getVoucherById(allVouchers, id);
    const transactionList = RewardSelector.getTransactionsByVoucherId(
      transactions,
      id
    );
    const vouchers = RewardSelector.getVouchersByTransactions(
      transactionList,
      selectedVoucher
    );
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <PruBackHeader title={headerText} customStyles={styles.headerStyle} />
        </View>
        <FlatList
          style={styles.flatListView}
          data={vouchers}
          renderItem={({ item }) => this.renderVoucher(item)}
          ListEmptyComponent={this.renderEmptyComponent}
        />
      </View>
    );
  }
}

VoucherDetails.propTypes = {
  allVouchers: PropTypes.array,
  transactions: PropTypes.array,
  navigation: PropTypes.object,
};

const mapStateToProps = state => {
  const {
    rewardCenter: { transactions, walletDetails },
  } = state;
  return {
    transactions,
    allVouchers: walletDetails.vouchers,
  };
};

export default connect(mapStateToProps, null)(VoucherDetails);
