import { GET_CONVERSATIONS } from "./conversationsTypes";
import { SET_MESSAGE } from "./conversationsTypes";
import { ADD_ONLINE_USER } from "./conversationsTypes";
import { REMOVE_OFFLINE_USER } from "./conversationsTypes";
import { SET_SEARCHED_USERS } from "./conversationsTypes";
import { CLEAR_SEARCHED_USERS } from "./conversationsTypes";
import { ADD_CONVERSATION } from "./conversationsTypes";


import {
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore
} from "../utils/reducerFunctions";




const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.conversations;
    case SET_MESSAGE:
      return addMessageToStore(state, action.payload);
    case ADD_ONLINE_USER: {
      return addOnlineUserToStore(state, action.id);
    }
    case REMOVE_OFFLINE_USER: {
      return removeOfflineUserFromStore(state, action.id);
    }
    case SET_SEARCHED_USERS:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
      return addNewConvoToStore(state, action.payload.recipientId, action.payload.newMessage);
    default:
      return state;
  }
};

export default reducer;
