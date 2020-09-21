import { path } from "ramda";

export const healthCategoriesDataSelector = healthCategoriesData =>
  path(["categoriesDetails", "0"], healthCategoriesData);

export const healthMetricsSelector = healthCategoriesData =>
  path(["categoriesDetails", "0", "healthMatrics"], healthCategoriesData);

export const categoriesDataStatusSelector = healthCheckData => {
  const categoriesDataStatus = path(
    ["categoryDetailsWithDatamap", "dataMaping"],
    healthCheckData
  );
  return categoriesDataStatus;
};

export const genderSelector = userProfile =>
  userProfile && userProfile.gender && userProfile.gender.toLowerCase();
