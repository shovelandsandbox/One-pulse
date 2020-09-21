import {
  CoreConfig,
  metaHelpers as helpers,
} from "@pru-rt-internal/pulse-common";
import {
  ELEMENT_KEY_YOUR_OFFER,
  ELEMENT_KEY_EARN_MORE,
  ELEMENT_KEY_EARNED_DATE,
  ELEMENT_KEY_EXPIRED_DATE,
  ELEMENT_KEY_ACTIVE_VOUCHERS,
  ELEMENT_KEY_ALL_VOUCHERS,
  ELEMENT_KEY_TOTAL_BADGES,
  BONUS_ACTIVITY_LIST,
} from "./configs/metaConstant";

const {
  REWARDS,
  NO_TRANSACTIONS,
  EARN_MORE_REWARDS,
  TRANSACTIONS,
  FAQ,
  SUCCESSFUL_REFERRAL,
  CHA,
  CSC,
  VIEW_ALL,
  MY_REWARD,
  YOU_CURRENTLY_HAVE,
  FAQ_QA_LIST,
  COMING_SOON,
  BONUS_REWARDED,
  ELEMENT_KEY_MY_REWARDS,
  ELEMENT_KEY_NO_REWARDS,
  ELEMENT_KEY_CHECK_REGULARLY,
  ELEMENT_KEY_CURATED_CONTENT,
  ELEMENT_KEY_EXPERIENCES,
  ELEMENT_KEY_VOUCHERS,
  ELEMENT_KEY_BADGES,
  REWARD_PROGRESS_LIST,
  REWARD_PROGRESS_INFO,
  NO_EXPERIANCE,
  NO_BADGES,
  NO_VOUCHERS,
  EARN_MORE_VOUCHERS,
  COMPLETE_YOUR_HEALTH,
  COMPLETE_YOUR_PROFILE,
  YOUR_OFFER,
  ELEMENT_KEY_NO_REWARDS_YET,
  ELEMENT_KEY_DISCOVER_REWARDS,
  ELEMENT_KEY_FAQ,
} = CoreConfig;

const fetchLabel = (value, defaultValue) =>
  value ? value.label : defaultValue;

const fetchQAList = (value, defaultValue) =>
  value ? value.faqQaList : defaultValue;

const fetchRewardProgressList = (value, defaultValue) =>
  value ? value.rewardProgressList : defaultValue;

const bonusActivityList = (value, defaultValue) =>
  value.bonusActivityList ? value.bonusActivityList : defaultValue;

const initializeScreenMeta = () => {
  return {
    noTransactions: fetchLabel(
      helpers.findElement(REWARDS, NO_TRANSACTIONS),
      "noTransactions"
    ),
    earnMoreRewards: fetchLabel(
      helpers.findElement(REWARDS, EARN_MORE_REWARDS),
      "earnMoreRewards"
    ),
    transactions: fetchLabel(
      helpers.findElement(REWARDS, TRANSACTIONS),
      "transactions"
    ),
    faq: fetchLabel(helpers.findElement(REWARDS, FAQ), "faq"),
    succesfulReferreal: fetchLabel(
      helpers.findElement(REWARDS, SUCCESSFUL_REFERRAL),
      "succesfulReferreal"
    ),
    changeHealthCare: fetchLabel(
      helpers.findElement(REWARDS, CHA),
      "changeHealthCare"
    ),
    completeSystemChecker: fetchLabel(
      helpers.findElement(REWARDS, CSC),
      "completeSystemChecker"
    ),
    viewAll: fetchLabel(helpers.findElement(REWARDS, VIEW_ALL), "View All"),
    rewards: fetchLabel(helpers.findElement(REWARDS, MY_REWARD), "rewards"),
    youCurrentlyHave: fetchLabel(
      helpers.findElement(REWARDS, YOU_CURRENTLY_HAVE),
      "youCurrentlyHave"
    ),
    faqQAList: fetchQAList(helpers.findElement(REWARDS, FAQ_QA_LIST), []),
    comingSoon: fetchLabel(
      helpers.findElement(REWARDS, COMING_SOON),
      "comingSoon"
    ),
    bonusRewarded: fetchLabel(
      helpers.findElement(REWARDS, BONUS_REWARDED),
      "bonusRewarded"
    ),
    myRewards: fetchLabel(
      helpers.findElement(REWARDS, ELEMENT_KEY_MY_REWARDS),
      "myRewards"
    ),
    noRewards: fetchLabel(
      helpers.findElement(REWARDS, ELEMENT_KEY_NO_REWARDS),
      "noRewards"
    ),
    checkRegularly: fetchLabel(
      helpers.findElement(REWARDS, ELEMENT_KEY_CHECK_REGULARLY),
      "checkRegularly"
    ),
    curatedContent: fetchLabel(
      helpers.findElement(REWARDS, ELEMENT_KEY_CURATED_CONTENT),
      "curatedContent"
    ),
    vouchers: fetchLabel(
      helpers.findElement(REWARDS, ELEMENT_KEY_VOUCHERS),
      "vouchers"
    ),
    experiences: fetchLabel(
      helpers.findElement(REWARDS, ELEMENT_KEY_EXPERIENCES),
      "experiences"
    ),
    badges: fetchLabel(
      helpers.findElement(REWARDS, ELEMENT_KEY_BADGES),
      "badges"
    ),
    rewardProgressInfo: fetchLabel(
      helpers.findElement(REWARDS, REWARD_PROGRESS_INFO),
      "rewardProgressInfo"
    ),
    rewardProgressList: fetchRewardProgressList(
      helpers.findElement(REWARDS, REWARD_PROGRESS_LIST),
      []
    ),
    noExperiance: fetchLabel(
      helpers.findElement(REWARDS, NO_EXPERIANCE),
      "noExperiance"
    ),
    noBadge: fetchLabel(helpers.findElement(REWARDS, NO_BADGES), "noBadge"),
    noVouchers: fetchLabel(
      helpers.findElement(REWARDS, NO_VOUCHERS),
      "noVouchers"
    ),
    earnMoreVouchers: fetchLabel(
      helpers.findElement(REWARDS, EARN_MORE_VOUCHERS),
      "earnMoreVouchers"
    ),
    completeYourHealth: fetchLabel(
      helpers.findElement(REWARDS, COMPLETE_YOUR_HEALTH),
      "completeYourHealth"
    ),
    completeYourProfile: fetchLabel(
      helpers.findElement(REWARDS, COMPLETE_YOUR_PROFILE),
      "completeYourProfile"
    ),
    earnedDate: fetchLabel(
      helpers.findElement(REWARDS, ELEMENT_KEY_EARNED_DATE),
      "Earned Date:"
    ),
    expiredDate: fetchLabel(
      helpers.findElement(REWARDS, ELEMENT_KEY_EXPIRED_DATE),
      "Expiry Date:"
    ),
    activeVouchers: fetchLabel(
      helpers.findElement(REWARDS, ELEMENT_KEY_ACTIVE_VOUCHERS),
      "Active Vouchers"
    ),
    allVouchers: fetchLabel(
      helpers.findElement(REWARDS, ELEMENT_KEY_ALL_VOUCHERS),
      "All Vouchers"
    ),
    totalBadge: fetchLabel(
      helpers.findElement(REWARDS, ELEMENT_KEY_TOTAL_BADGES),
      "Total Badges"
    ),
    yourOffer: fetchLabel(
      helpers.findElement(REWARDS, ELEMENT_KEY_YOUR_OFFER),
      "Your Offer"
    ),
    //faq: fetchLabel(helpers.findElement(REWARDS, FAQ), "FAQ's"),
    earnMore: fetchLabel(
      helpers.findElement(REWARDS, ELEMENT_KEY_EARN_MORE),
      "Earn More"
    ),
    bonusActivityList: bonusActivityList(
      helpers.findElement(REWARDS, BONUS_ACTIVITY_LIST),
      []
    ),
    noRewardsYet: fetchLabel(
      helpers.findElement(REWARDS, ELEMENT_KEY_NO_REWARDS_YET),
      "No Rewards Yet"
    ),
    discoverRewards: fetchLabel(
      helpers.findElement(REWARDS, ELEMENT_KEY_DISCOVER_REWARDS),
      "Discover Rewards"
    ),
    faq: fetchLabel(helpers.findElement(REWARDS, ELEMENT_KEY_FAQ), "FAQ's"),
  };
};

export default {
  initializeScreenMeta,
};
