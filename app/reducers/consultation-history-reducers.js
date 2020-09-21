import {
  CONCIERGE_HISTORY_SUCCESS,
  CONCIERGE_HISTORY_FAILED,
  GET_ATTACHMENT_SUCCESS,
  IMG_BASE_SUCCESS,
  GET_ALLCASENOTES_SUCCESS,
  GET_MYDOC_PROFILE_SUC,
  GET_MYDOC_PROFILE_FAIL
} from "../actions/Types";

const INITIAL_STATE = {
  response: [],
  documents: []
};

// eslint-disable-next-line complexity
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONCIERGE_HISTORY_SUCCESS: {
      console.log("conceirge history reducer", action.payload);
      return {
        ...state,
        response: action.payload.resp,
      };
    }
    case GET_ATTACHMENT_SUCCESS:
      // console.log("GET_ATTACHMENT_SUCCESS statewwwww", state);
      const history = state.response.map((i, j) => {
        // console.log("GET_ATTACHMENT_SUCCESS action", action);
        if (j === action.payload.actionPayload.index) {
          let arr = [];
          let types = [];
          const body = action.payload.response.body ? action.payload.response.body : [];
          body.forEach((x) => {
            if (types.indexOf(x.category) < 0) {
              types.push(x.category);
              arr.push({
                category: x.category,
                list: [x]
              })
            }
            else {
              arr.forEach((is) => {
                if (x.category == is.category) {
                  is.list.push(x);
                }
              })
            }
          })
          i.files.map((x) => {
            types.push(x.category);
            arr.push({
              category: x.category,
              list: x.list
            })
          })
          i.files = arr;
        }
        return i;
      });
      return {
        ...state,
        response: history
      };
    case GET_ALLCASENOTES_SUCCESS:
      const casenote = state.response.map((i, j) => {
        // console.log("GET_ATTACHMENT_SUCCESS action", action);
        if (j === action.payload.actionPayload.index) {
          const arr = [];
          const types = [];
          const body = action.payload.response.body ? action.payload.response.body : [];
          body.forEach((x) => {
            if (i.id == x.items[0].episode_id) {
              i.files.push({
                category: "casenotes",
                list: [x.items[0]]
              })
            }
          })
        }
        return i;
      });
      return {
        ...state,
        response: casenote
      };
    case IMG_BASE_SUCCESS:
      console.log("statewwwww", state);
      const concierge = state.response.map((i, j) => {
        console.log("action", action);
        console.log("i", i);
        if (j === action.payload.i) {
          i.message.attachments[0].base64 = action.payload.image
        }
        return i;
      })

      return {
        ...state,
        response: concierge
      };
    case CONCIERGE_HISTORY_FAILED: {
      return {
        ...state,
        response: [],
      };
    }
    case GET_MYDOC_PROFILE_SUC:
      return {
        ...state,
        documents: action.payload.body,
      };
    case GET_MYDOC_PROFILE_FAIL:
      return {
        ...state,
        documents: [],
      };

    default:
      return state;
  }
};
