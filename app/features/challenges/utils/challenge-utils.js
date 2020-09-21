import { pathOr, head } from "ramda";

export const getActivityMetrics = challenge => {
  const metrics = pathOr(
    [],
    ["groupActivity", "criteria", "activities", "0", "metrics"],
    challenge
  );

  return head(metrics);
};
