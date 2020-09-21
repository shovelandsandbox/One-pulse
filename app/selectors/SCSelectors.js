import { path } from "ramda";

export const userFirstNameSelector = userProfile => {
  if (userProfile && userProfile.firstName) {
    return userProfile.firstName;
  }
  return "";
};
