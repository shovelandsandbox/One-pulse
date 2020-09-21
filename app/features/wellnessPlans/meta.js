import { metaHelpers as helpers } from "@pru-rt-internal/pulse-common";
import {
  WELLNESS_GOAL,
  WELCOME,
  WELCOME_DESC,
  YOU_NEED,
  BADGES,
  TO_UNLOCK_GOAL,
  COMPLETE_GOAL_ON,
  CONFIRM_HABIT_CHANGE,
  HABIT_MODAL_DESC,
  CONFIRM_UNLOCK,
  YOU_HAVE,
  WELLNESS_DONT_HAVE_BADGES,
  HABIT,
  GOAL,
  DO_YOU_WANT_UNLOCK,
  BADGES_TO_UNLOCK_THIS,
  HOW_TO_REDEEM,
  CONGRATULATION,
  WELLNESS_REDEEM,
  OUT_OF,
  CONGRAT_REWARD_DESC,
  COLLECTED_REWARD,
  LEARN_MORE,
  BADGE_UPON_COMPLETION,
  WELLNESS_GET,
  DAYS,
  WELLNESS_DETAILS,
  WELLNESS_UNLOCK,
  WELLNESS_COMPLETED,
  UPON_COMPLETION,
  WELLNESS_CONTINUE,
  WELLNESS_JOIN,
  IN_PROGRESS,
  WELLNESS_MORE_INFO,
  HABITS_IN_PROGRESS,
  WELLNESS_BADGE_ON_COMPLETION,
  ON_COMPLETION,
  COLSE,
  WELLNESS_MARK_COMPLETE,
  BADGES_UNLOCK_HABIT,
  WELLNESS_OK,
  YES_UNLOCK,
  WELLNESS_NO,
  YES_CHANGE,
  WELLNESS_ADD,
  WELLNESS_CANCEL,
  AVAILABLE_HABITS,
  TAP_TO_ADD_HABIT,
  CURRENT_HABITS,
  WELLNESS_CHANGE_HABIT,
  WELLNESS_ADD_HABIT,
  DONT_HAVE_BADGES_FOR_GOAL,
  WELLNESS_GOAL_HEADER,
  BADGES_TO_UNLOCK_THIS_GOAL,
  HABITS,
  COMPLETE_HEALTH_ASSESSMENT,
  FIFTEEN_X,
  COMPLETE_CURRENT_HABITS,
  TENX,
  REFER_FIVE,
  OOPS,
  YOU_NEED_FOUR,
  OKAY,
  COMPLETE,
  MORE_BADGES_TO_UNLOCK,
  CHEAT_SHEET,
  WELLNESS_REWARD,
  WELLNESS_DURATION,
  BADGES_UPON_SMALL,
  FAILED,
  MAX_HABITS,
  MASTER_HABITS,
  CHECK_OF_HABIT_TOM,
  ALREADY_COMPLETED_HABITS,
  FEEL_PROUD,
  AWESOME,
  CONSENTBODY,
  GOFORIT,
  MAYBELATER,
} from "./metaConstants";

const fetchLabel = (value, defaultValue) =>
  value ? value.label : defaultValue;

const screenMeta = () => {
  return {
    welcomeTitle: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELCOME),
      "WELCOME TO WELLNESS GOALS"
    ),
    welcomeDescription: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELCOME_DESC),
      "Congrats on taking first step towards your betterment. Our health experts have designed simple goals and habits. You follow them daily, check it off, and repeat for 7 times to move onto the next one"
    ),
    you_need: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, YOU_NEED),
      "You'll be rewarded"
    ),
    badges: fetchLabel(helpers.findElement(WELLNESS_GOAL, BADGES), "Badges"),
    to_unlock_goal: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, TO_UNLOCK_GOAL),
      "on completion of the goal"
    ),
    complete_goal_on: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, COMPLETE_GOAL_ON),
      "You have completed the Goal on"
    ),
    confirm_habit_change: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, CONFIRM_HABIT_CHANGE),
      "Confirm Habit Change?"
    ),
    habit_change_desc: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, HABIT_MODAL_DESC),
      "All your progress in your current habit will be lost, are you sure you want to proceed?"
    ),
    confirm_unlock: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, CONFIRM_UNLOCK),
      "Confirm Unlock"
    ),
    you_have: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, YOU_HAVE),
      "You Have"
    ),
    wellness_dont_have_badges: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_DONT_HAVE_BADGES),
      "You don't have enough badges to unlock this"
    ),
    habit: fetchLabel(helpers.findElement(WELLNESS_GOAL, HABIT), "Habit"),
    goal: fetchLabel(helpers.findElement(WELLNESS_GOAL, GOAL), "Goal"),
    do_you_want_unlock: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, DO_YOU_WANT_UNLOCK),
      "badges. Do you want to unlock?"
    ),
    badges_to_unlock_this: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, BADGES_TO_UNLOCK_THIS),
      "Badges to unlock this"
    ),
    how_to_redeem: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, HOW_TO_REDEEM),
      "How To Redeem"
    ),
    wellness_congratulation: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, CONGRATULATION),
      "Congratulations"
    ),
    redeem: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_REDEEM),
      "Redeem"
    ),
    out_of: fetchLabel(helpers.findElement(WELLNESS_GOAL, OUT_OF), "out of"),
    congrats_reward_desc: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, CONGRAT_REWARD_DESC),
      "You have completed the habit and are one step towards a better lifestyle.Here is your reward"
    ),
    collect_reward: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, COLLECTED_REWARD),
      "Collect Reward"
    ),
    learn_more: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, LEARN_MORE),
      "Learn More"
    ),
    badge_upon_completion: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, BADGE_UPON_COMPLETION),
      "Badges upon completion"
    ),
    get: fetchLabel(helpers.findElement(WELLNESS_GOAL, WELLNESS_GET), "Get"),
    wellness_days: fetchLabel(helpers.findElement(WELLNESS_GOAL, DAYS), "Days"),
    wellness_details: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_DETAILS),
      "Details"
    ),
    wellness_unlock: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_UNLOCK),
      "Unlock"
    ),
    wellness_completed: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_COMPLETED),
      "Completed"
    ),
    upon_completion: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, UPON_COMPLETION),
      "upon completion"
    ),
    continue: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_CONTINUE),
      "Continue"
    ),
    join: fetchLabel(helpers.findElement(WELLNESS_GOAL, WELLNESS_JOIN), "Join"),
    in_progress: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, IN_PROGRESS),
      "In Progress"
    ),
    wellness_more_info: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_MORE_INFO),
      "More Info"
    ),
    habits_in_progress: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, HABITS_IN_PROGRESS),
      "Habits In Progress"
    ),
    wellness_badge_on_completion: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_BADGE_ON_COMPLETION),
      "+30 Badges on completion"
    ),
    on_completion: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, ON_COMPLETION),
      "on completion"
    ),
    close: fetchLabel(helpers.findElement(WELLNESS_GOAL, COLSE), "Close"),
    wellness_mark_complete: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_MARK_COMPLETE),
      "Mark Complete"
    ),
    dont_have_badges_unlock_habit: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, BADGES_UNLOCK_HABIT),
      "You don't have enough badges to unlock this Habit"
    ),
    wellness_ok: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_OK),
      "Ok"
    ),
    yes_unlock: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, YES_UNLOCK),
      "Yes,Unlock"
    ),
    wellness_no: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_NO),
      "Skip"
    ),
    yes_change: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, YES_CHANGE),
      "Continue"
    ),
    wellness_add: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_ADD),
      "Add"
    ),
    cancel: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_CANCEL),
      "Cancel"
    ),
    available_habits: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, AVAILABLE_HABITS),
      "Challenge yourself with New Habits"
    ),
    tab_to_add_habit: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, TAP_TO_ADD_HABIT),
      "Tap on a habit to get started"
    ),
    current_habit: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, CURRENT_HABITS),
      "Habits In progress"
    ),
    wellness_change_habit: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_CHANGE_HABIT),
      "Change Habit"
    ),
    wellness_add_habit: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_ADD_HABIT),
      "Add Habit"
    ),
    dont_have_badges_for_goal: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, DONT_HAVE_BADGES_FOR_GOAL),
      "You don't have enough badges to unlock this Goal"
    ),
    wellness_goal_header: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_GOAL_HEADER),
      "Wellness Goals"
    ),
    badges_to_unlock_this_goal: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, BADGES_TO_UNLOCK_THIS_GOAL),
      "badges to unlock this goal?"
    ),
    habits: fetchLabel(helpers.findElement(WELLNESS_GOAL, HABITS), "Habits"),
    complete_health_assess: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, COMPLETE_HEALTH_ASSESSMENT),
      "- Complete your Health Assessment"
    ),
    fifteen_x: fetchLabel(helpers.findElement(WELLNESS_GOAL, FIFTEEN_X), "15x"),
    ten_x: fetchLabel(helpers.findElement(WELLNESS_GOAL, TENX), "10x"),
    complete_your_current: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, COMPLETE_CURRENT_HABITS),
      "- Complete your current habits"
    ),
    refer_five_friends: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, REFER_FIVE),
      "- Refer 5 Friends"
    ),
    oops: fetchLabel(helpers.findElement(WELLNESS_GOAL, OOPS), "Oops..."),
    you_need_for: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, YOU_NEED_FOUR),
      "You need"
    ),
    okay: fetchLabel(helpers.findElement(WELLNESS_GOAL, OKAY), "Okay"),

    complete: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, COMPLETE),
      "Complete"
    ),
    more_badges_to_unlock: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, MORE_BADGES_TO_UNLOCK),
      "more badges to unlock this"
    ),
    cheat_sheet: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, CHEAT_SHEET),
      "Here is a cheat sheet to earn more badges"
    ),
    wellness_reward: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_REWARD),
      "Rewards"
    ),
    wellness_duration: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, WELLNESS_DURATION),
      "Duration"
    ),
    badge_upon_small: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, BADGES_UPON_SMALL),
      "upon completion"
    ),
    failed: fetchLabel(helpers.findElement(WELLNESS_GOAL, FAILED), "Failed"),
    max_habits: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, MAX_HABITS),
      "You have already selected maximum no of Habits, please complete them to add more"
    ),
    master_habits: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, MASTER_HABITS),
      "You have already mastered this habit."
    ),
    check_habits_tom: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, CHECK_OF_HABIT_TOM),
      "Great to see your perseverance! You can check off a habit only once in a day. We would love to see you come back and complete it tomorrow"
    ),
    already_completed_habit: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, ALREADY_COMPLETED_HABITS),
      "You have already completed this habit. Why don’t you select a habit from the available list and get going?"
    ),
    feel_proud: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, FEEL_PROUD),
      "Feel Proud about your Completed Habits"
    ),
    awesome: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, AWESOME),
      "Awesome!"
    ),
    consentBody: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, CONSENTBODY),
      "Congratulation you have unlocked a premium affinity group. Get health tips from expert members and motivate others by sharing progress."
    ),
    goForIt: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, GOFORIT),
      "Go, For it"
    ),
    maybeLater: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, MAYBELATER),
      "Not Now, may be later"
    ),
    reminderHeading: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, "reminderHeading"),
      "Set Reminder"
    ),
    selectReminder: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, "selectReminder"),
      "Select Reminder Times"
    ),
    reminderError: fetchLabel(
      helpers.findElement(WELLNESS_GOAL, "reminderError"),
      "Please select at least one slot as you have 'enabled' reminders"
    ),
    reminderValues: helpers.findElement(WELLNESS_GOAL, "reminderValues"),
  };
};

export default { screenMeta };
