import { SET_ACTIVE_CHAT } from "./activeConversationTypes";

export const setActiveChat = (username) => {
  return {
    type: SET_ACTIVE_CHAT,
    username,
  };
};
