import { CoreConfig, metaHelpers } from "@pru-rt-internal/pulse-common";

const {
    REWARDNRIC,
    REWARDNRIC_TAKELOOKAROUND,
    REWARDNRIC_WATCHOUTFOR,
    REWARDNRIC_WILLDO,
} = CoreConfig;

const fetchLabel = (value, defaultValue) =>
  value ? value.label : defaultValue;

const initializeScreenMeta = () => {
  return {
    takelookAroundLabel: fetchLabel(
        metaHelpers.findElement(REWARDNRIC,REWARDNRIC_TAKELOOKAROUND),
      "Thanks! Happy exploring!"
    ),
    watchoutforLabel: fetchLabel(
        metaHelpers.findElement(REWARDNRIC,REWARDNRIC_WATCHOUTFOR),
      "Watch out for more perks coming your way."
    ),
    willdoLabel: fetchLabel(
        metaHelpers.findElement(REWARDNRIC,REWARDNRIC_WILLDO),
      "Will do"
    ),
  };
};

export default {
    initializeScreenMeta,
  };