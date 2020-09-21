/* eslint-disable complexity */
import actions from "./configs/actions";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import { pathOr, map, find } from "ramda";

const INITIAL_STATE = {
  allChallenges: [],
  myChallenges: undefined, //result not yet available - different than []
  leaderboard: undefined,
  activityTrends: [],
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case actions.getAllChallengesSuccess:
      return updateAllChallenges(state, payload);
    case actions.getMyChallengesSuccess:
    case CoreActionTypes.GET_CUSTOMER_CHALLENGES_SUCCESS:
      return updateMyChallenges(state, payload);
    case actions.getChallengeLeaderboardSuccess:
      return updateLeaderboard(state, payload);
    case actions.joinChallengeSuccess:
      return challengeSubscription(state, payload, true);
    case actions.leaveChallengeSuccess:
      return challengeSubscription(state, payload, false);
    case actions.getProfilePicSuccess:
      return updateProfilePic(state, payload);
    case actions.clearLeaderboard:
      return clearLeaderboard(state);
    case actions.getChallengeActivityTrendsSuccess: {
      return {
        ...state,
        activityTrends: pathOr(
          [],
          ["response", "body", "contestants"],
          action.payload
        ),
      };
    }

    case actions.getChallengeActivityTrendsFailure: {
      return {
        ...state,
        activityTrends: [],
      };
    }
    default:
      return state;
  }
};

//Challenges
const updateAllChallenges = (state, payload) => {
  const allChallengesResponse = pathOr([], ["response", "body"], payload);
  const allChallenges = transformAllChallenges(
    state.myChallenges,
    allChallengesResponse
  );

  return {
    ...state,
    allChallenges,
  };
};

const updateMyChallenges = (state, payload) => {
  const myChallenges = pathOr([], ["response", "body"], payload);
  myChallenges.forEach(grp => (grp.joined = true));

  const allChallenges = transformAllChallenges(
    myChallenges,
    state.allChallenges
  );

  return {
    ...state,
    allChallenges,
    myChallenges,
  };
};

const transformAllChallenges = (myChallenges = [], allChallenges = []) => {
  if (myChallenges.length === 0 || allChallenges.length == 0) {
    return allChallenges;
  }
  return map(grp => {
    const joined = find(g => g.id === grp.id, myChallenges);
    return {
      ...grp,
      joined: !!joined,
    };
  })(allChallenges);
};

const challengeSubscription = (state, payload, joined) => {
  const {
    actionPayload: {
      group: { id },
    },
  } = payload;

  if (joined) {
    return joinGroup(state, payload, id);
  }
  return leaveGroup(state, payload, id);
};

const joinGroup = (state, payload, id) => {
  //if joined then add to myGroups and set join true
  //increase count of members
  const allChallenges = state.allChallenges.map(group => {
    if (group.id === id) {
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

  const myChallenges = allChallenges.filter(group => group.joined === true);

  return {
    ...state,
    allChallenges,
    myChallenges,
  };
};

const leaveGroup = (state, payload, id) => {
  //if left then add to myGroups and set join false
  //decrease count of members
  //update myGroups
  const allChallenges = state.allChallenges.map(group => {
    if (group.id === id) {
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

  const myChallenges = allChallenges.filter(group => group.joined === true);
  return {
    ...state,
    allChallenges,
    myChallenges,
  };
};

//leader board
const updateLeaderboard = (state, payload) => {
  const { contestants = [] } = pathOr({}, ["response", "body"], payload);
  //1st contestant is self
  if (contestants.length > 0) {
    contestants[0].currentUser = true;
  }
  return {
    ...state,
    leaderboard: {
      contestants,
    },
  };
};

const clearLeaderboard = state => {
  return {
    ...state,
    leaderboard: [],
  };
};

const updateProfilePic = (state, payload) => {
  const profilePic = pathOr("", ["response", "body", "content"], payload);
  const contestants = state.leaderboard.contestants.map(contestant => {
    const documents = pathOr([], ["customer", "documents"], contestant);
    if (documents.length > 0 && documents[0].id === payload.actionPayload.id) {
      return {
        ...contestant,
        customer: {
          ...contestant.customer,
          profilePic,
        },
      };
    }
    return contestant;
  });
  return {
    ...state,
    leaderboard: {
      contestants,
    },
  };
};
