import { GET_CONVERSATIONS } from './conversationsTypes';
import { SET_MESSAGE } from './conversationsTypes';
import { ADD_ONLINE_USER } from './conversationsTypes';
import { REMOVE_OFFLINE_USER } from './conversationsTypes';
import { SET_SEARCHED_USERS } from './conversationsTypes';
import { CLEAR_SEARCHED_USERS } from './conversationsTypes';
import { ADD_CONVERSATION } from './conversationsTypes';
import { READ_MESSAGES } from './conversationsTypes';
import { SET_LAST_SEEN } from "./conversationsTypes";

export const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
    conversations,
  };
};

export const setNewMessage = (message, sender , isActive = false) => {
  return {
    type: SET_MESSAGE,
    payload: { message, sender: sender || null, isActive },
  };
};

export const addOnlineUser = (id) => {
  return {
    type: ADD_ONLINE_USER,
    id,
  };
};

export const removeOfflineUser = (id) => {
  return {
    type: REMOVE_OFFLINE_USER,
    id,
  };
};

export const setSearchedUsers = (users) => {
  return {
    type: SET_SEARCHED_USERS,
    users,
  };
};

export const clearSearchedUsers = () => {
  return {
    type: CLEAR_SEARCHED_USERS,
  };
};

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => {
  return {
    type: ADD_CONVERSATION,
    payload: { recipientId, newMessage },
  };
};

export const addReadMessages = (conversation) => {
  return {
    type: READ_MESSAGES,
    payload: conversation
  };
}

export const updateLastSeen = (conversation) => {
  return {
    type: SET_LAST_SEEN,
    payload: conversation,
  };
};
