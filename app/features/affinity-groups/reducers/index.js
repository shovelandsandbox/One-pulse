import { INITIAL_STATE as GROUP_STATE, groupsReducer } from "./group";
import {
  INITIAL_STATE as NOTIFICATION_STATE,
  notificationReducer,
} from "./notification";
import { INITIAL_STATE as POST_STATE, postsReducer } from "./post";

const INITIAL_STATE = {
  ...GROUP_STATE,
  ...POST_STATE,
  ...NOTIFICATION_STATE,
};

export default (state = INITIAL_STATE, action) => {
  return (
    groupsReducer(state, action) ||
    postsReducer(state, action) ||
    notificationReducer(state, action) ||
    state
  );
};
