import screens from "./screenNames";
import TransactionHistory from "../screens/TransactionHistory";
import DiscoverRewards from "../screens/DiscoverRewards";
import MyRewards from "../screens/MyRewards";

const navigationOptions = {
  header: null,
};

export const RewardsScreenConfig = {
  [screens.REWARD_TRANSACTION_HISTORY]: {
    screen: TransactionHistory,
    navigationOptions: navigationOptions,
  },
  [screens.REWARDS_DISCOVER_REWARDS]: {
    screen: DiscoverRewards,
    navigationOptions: navigationOptions,
  },
  [screens.REWARDS_MY_REWARDS]: {
    screen: MyRewards,
    navigationOptions: navigationOptions,
  },
};
