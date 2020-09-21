import { affinityGroupActions as actions } from "../configs/affinity-group-actions";
import { pathOr, find } from "ramda";

export const INITIAL_STATE = {
  allGroups: [],
  myGroups: null,
  currentGroup: {
    group: undefined,
    posts: [],
    pagination: {
      page: 0,
      done: false,
    },
  },
};

export const groupsReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case actions.getAllGroupsSuccess:
      return setAllGroups(state, payload);
    case actions.getMyGroupsSuccess:
    case "GET_CUSTOMER_GROUPS_SUCCESS":
      return updateGroups(state, payload);
    case actions.setCurrentGroup:
      return setCurrentGroup(state, payload);
    case actions.joinOrLeaveGroupSuccess:
      return updateGroupSubscription(state, payload);
  }
};

//group list response
const updateGroups = (state, payload) => {
  const myGroups = pathOr([], ["response", "body"], payload);
  myGroups.forEach(grp => (grp.joined = true));

  const allGroupsTemp = state.allGroupsTemp || [];
  const allGroups = allGroupsTemp.map(grp => {
    const matchingMyGrp = find(g => g.id === grp.id, myGroups);
    return {
      ...grp,
      joined: !!matchingMyGrp,
    };
  });

  return {
    ...state,
    allGroups,
    myGroups,
  };
};

//group setter
const setCurrentGroup = (state, payload) => {
  return {
    ...state,
    currentGroup: payload || INITIAL_STATE.currentGroup,
  };
};
const setAllGroups = (state, payload) => {
  return {
    ...state,
    allGroupsTemp: pathOr([], ["response", "body"], payload), //TODO remove this when joined flag starts coming
  };
};

//add & leave group
const joinGroup = (state, payload) => {
  //if joined then add to myGroups and set join true
  //increase count of members
  const { groupId } = payload;
  const allGroups = state.allGroups.map(group => {
    if (group.id === groupId) {
      return {
        ...group,
        joined: true,
        attributes: {
          ...group.attributes,
          membersCount: group.attributes.membersCount + 1,
        },
      };
    }
    return group;
  });

  const myGroups = allGroups.filter(group => group.joined === true);
  return {
    ...state,
    allGroups,
    myGroups,
  };
};

const leaveGroup = (state, payload) => {
  //if left then add to myGroups and set join false
  //decrease count of members
  //update myGroups
  const { groupId } = payload;
  const allGroups = state.allGroups.map(group => {
    if (group.id === groupId) {
      return {
        ...group,
        joined: false,
        attributes: {
          ...group.attributes,
          membersCount: group.attributes.membersCount - 1,
        },
      };
    }
    return group;
  });

  const myGroups = allGroups.filter(group => group.joined === true);
  return {
    ...state,
    allGroups,
    myGroups,
  };
};

const updateGroupSubscription = (state, payload) => {
  const { join } = payload;
  if (join) {
    return joinGroup(state, payload);
  }
  return leaveGroup(state, payload);
};
