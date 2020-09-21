import { pathOr } from "ramda";

export const getHabitDetails = (habit, detail = "name") => 
  pathOr("", ["icons", "labels", detail], habit);
