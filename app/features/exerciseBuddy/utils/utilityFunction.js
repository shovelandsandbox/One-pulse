import { pathOr, pluck, max, reduce } from "ramda";
import moment from "moment";

export const getPlanDetails = (plans, detail = "name") =>
  pathOr("", ["icons", "labels", detail], plans);

export const getPlanUrlDetails = (plans, detail = "200*200") =>
  pathOr("", ["icons", "badge", "tags", detail], plans);

export const getCustomerPreferences = (plans, detail = "totalBurn") =>
  pathOr("0", ["customer", "attributes", detail], plans);

export const getRemainingDays = item => {
  const streakDays = getCustomerPreferences(item, "streakDays");
  const attributes = pathOr({}, ["actionPlan", "attributes"], item);
  const level = pathOr("_0", ["actionPlan", "level"], item);
  const noOfDays = pathOr("7", [level, "days"], attributes);
  const daysLeft = Number(noOfDays) - Number(streakDays);
  return daysLeft;
};

export const getFormatted12HourTime = time => {
  let hours = moment(time).get("hours");
  const minutes = moment(time).get("minutes");
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const formattedTime = hours + " : " + minutes + " " + period;
  return formattedTime;
};

export const getPlanOutcomeDetails = (plans, detail = "name") =>
  pathOr("", ["attributes", "outcome", detail], plans);

export const determineLevel = props => {
  const {
    customerHabitsByPlanId,
    exercise: { id },
    timeTaken,
    type,
    units,
  } = props;
  const exeUnits = units.get(type);
  const habitsByPlanId = pathOr([], [0, "habits"], customerHabitsByPlanId);
  let requiredHabit = habitsByPlanId.filter(habit => {
    const habitId = pathOr("", ["habit", "id"], habit);
    return id === habitId;
  });
  requiredHabit = requiredHabit.length > 0 ? requiredHabit[0] : null;

  if (requiredHabit) {
    const maxValue = findMaxValue(requiredHabit);

    return {
      level: exeUnits < maxValue ? "less" : "more",
      val: maxValue,
    };
  }

  return {
    level: "new",
    val: 0,
  };
};

const findMaxValue = habit => {
  const habitMilestones = pluck("milestoneData", habit.habitMilestones);
  let milestonesCount = pluck("count", habitMilestones);
  milestonesCount = milestonesCount.map(count => parseInt(count));

  return reduce(max, -Infinity, milestonesCount);
};
