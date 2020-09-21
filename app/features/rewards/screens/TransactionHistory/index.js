import React, { PureComponent } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import { SR_ICON, REWARD_VOUCHER_HEAD } from "../../../../config/images";
import moment from "moment";
import styles from "./styles";
import { PruBackHeader } from "../../../../components";
import { metaFinderRewards } from "../../configs/meta-utils";
import { ELEMENT_KEY_TRANS_HISTORY } from "../../configs/metaConstant";
import { RewardSelector } from "../../Selector";
class TransactionHistory extends PureComponent {
  renderAllTransactions = item => {
    const type = item.item.transactionType;
    const date = moment(item.item.transactionDate).format("DD-MMM-YYYY");
    const value = type === "credit" ? "+" : "-";
    return (
      <View
        style={
          type === "credit" ? styles.creditContainer : styles.debitContainer
        }
      >
        <View style={styles.imageContainer}>
          <View>
            <Image
              source={
                item.item.currency === "badge" ? SR_ICON : REWARD_VOUCHER_HEAD
              }
              style={styles.imageStyles}
            />
          </View>
          <View style={styles.descriptionStyle}>
            <Text style={styles.detailStyles}>{item.item.detail}</Text>
            <Text style={{ padding: 5, color: "#a8a8a8", fontSize: 11 }}>
              {date}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={
              type === "credit" ? styles.crAmountStyles : styles.debAmountStyles
            }
          >
            {item.item?.amount
              ? `${value}${item.item.amount}`
              : `${item.item.transactionType}`}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <PruBackHeader title={metaFinderRewards(ELEMENT_KEY_TRANS_HISTORY)} />
        <FlatList
          style={styles.flatlistStyles}
          data={this.props.item}
          renderItem={item => this.renderAllTransactions(item)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  item: RewardSelector.getBadges(state.rewardCenter.transactions),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);
