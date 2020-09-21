import { innerJoin } from "ramda";
export const RewardSelector = {
  getTotalBadgeCount: loyaltyPoints => {
    const trophyDetails = loyaltyPoints.filter(
      detail => detail.type === "BADGE"
    );
    if (trophyDetails.length == 0) {
      return 0;
    }
    return trophyDetails
      .map(item => parseInt(item.points))
      .reduce((prev, next) => prev + next);
  },
  getBadges: transactions => {
    const transactionList = transactions.filter(
      detail => detail?.currency?.toLowerCase() === "badge"
    );
    if (transactionList.length == 0) {
      return [];
    }
    return transactionList;
  },
  getBadgesAndVouchers: transactions => {
    const transactionList = transactions.filter(
      detail =>
        detail?.currency?.toLowerCase() === "badge" ||
        detail?.currency?.toLowerCase() === "voucher"
    );
    if (transactionList.length == 0) {
      return [];
    }
    return transactionList;
  },
  getCouponsByCategory: (array, category) => {
    if (!array || array.length == 0) {
      return [];
    }
    return array.filter(item => {
      return item.category === category;
    });
  },
  getActiveVouchers: (array = []) => {
    return array.filter(
      item => item.status === "ACTIVE" || item.status === "PARTIALREDEEMED"
    );
  },
  getActiveTeleconVouchers: (walletVouchers = [], teleconVouchers = []) => {
    const activeWalletVouchers = walletVouchers.filter(walletVoucherItem => {
      return walletVoucherItem.status === "ACTIVE";
    });
    const innerJoinByVoucherId = (walletVoucherItem, teleconVoucherItem) =>
      walletVoucherItem.id === teleconVoucherItem.id;
    return innerJoin(innerJoinByVoucherId, walletVouchers, teleconVouchers);
  },
  getVoucherById: (vouchers = [], voucherId) => {
    const index = vouchers.findIndex(voucher => voucher.id === voucherId);
    return index !== -1 ? vouchers[index] : null;
  },
  getTransactionsByVoucherId: (transactions = [], voucherId) => {
    return transactions.filter(
      transaction => transaction.orderRef === voucherId
    );
  },
  getVouchersByTransactions: (transactions = [], voucher) => {
    return transactions.map(transaction => {
      return { ...voucher, transactionDate: transaction.transactionDate };
    });
  },
};
