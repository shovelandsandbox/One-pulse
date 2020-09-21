import { CoreConfig, metaHelpers } from "@pru-rt-internal/pulse-common";

const {
  pageKeys,
  REWARDNRIC,
  REFERAL_CODE,
  REFERAL_CODE_REQUIRED,
  AGENT_BOOST_CODE_MSG,
  ENTER_REFERRAL_CODE,
  AGENT_REFERRAL_TEXT,
  SUBMIT,
  SPLASH,
  SPLASH_SKIP,
} = CoreConfig;

const fetchLabel = (value, defaultValue) =>
  value ? value.label : defaultValue;

const initializeScreenMeta = () => {
  return {
    codeErrorMessage: fetchLabel(
      metaHelpers.findElement(REWARDNRIC, REFERAL_CODE_REQUIRED).label,
      "Referral code required"
    ),
    splashSkip: fetchLabel(
      metaHelpers.findElement(SPLASH, SPLASH_SKIP).label,
      "Skip"
    ),
    referralCode: fetchLabel(
      metaHelpers.findElement(REWARDNRIC, REFERAL_CODE).label,
      "Have a referral Code?"
    ),
    enterReferralCode: fetchLabel(
      metaHelpers.findElement(REWARDNRIC, ENTER_REFERRAL_CODE).label,
      "Enter your referral code"
    ),
    agentReferralText: fetchLabel(
      metaHelpers.findElement(REWARDNRIC, AGENT_REFERRAL_TEXT).label,
      "Agent Referral Code"
    ),
    submit: fetchLabel(
      metaHelpers.findElement(REWARDNRIC, SUBMIT).label,
      "Submit"
    ),
  };
};

export default {
    initializeScreenMeta,
  };