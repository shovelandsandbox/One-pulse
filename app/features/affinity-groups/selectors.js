import { pathOr, find, propEq, path } from "ramda";

//notifications selector
export const unreadCountSelector = ({ affinityGroup }) => {
  const notificationList = pathOr(
    [],
    ["notifications", "notificationList"]
  )(affinityGroup);

  return notificationList.reduce(
    (acc, notification) => (notification.read ? acc : ++acc),
    0
  );
};

//groups selector
export const groupSelector = ({ affinityGroup, challenges }, { id }) => {
  const allGroups = pathOr([], ["allGroups"])(affinityGroup);
  const myGroups = pathOr([], ["myGroups"])(affinityGroup);

  const allChallenges = pathOr([], ["allChallenges"])(challenges);
  const myChallenges = pathOr([], ["myChallenges"])(challenges);

  const groups = allGroups.length ? allGroups : myGroups;
  const searchableChallenges = allChallenges.length
    ? allChallenges
    : myChallenges;

  const findById = propEq("id", id);
  return find(findById)(groups) || find(findById)(searchableChallenges);
};

//posts selector
export const currentPostGroupSelector = state => {
  const group = pathOr({}, ["currentPost", "post", "group"])(
    state.affinityGroup
  );
  return groupSelector(state, group);
};

//like selector
export const likeSelector = ({ affinityGroup }, id) => {
  const { likes = {} } = affinityGroup;
  return !!likes[id];
};
