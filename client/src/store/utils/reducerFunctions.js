export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }
  //the problem is the reducer function was returning the same state reference to fix this I used the spread operator to copy the object
  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      convo.messages.push(message);
      convo.latestMessageText = message.text;
      return { ...convo };
    } else {
      return { ...convo };
    }
  });
};
//the problem is the reducer function was returning the same state reference to fix this I used the spread operator to copy the object
export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return {
        ...convoCopy,
      };
    } else {
      return { ...convo };
    }
  });
};
//the problem is the reducer function was returning the same state reference to fix this I used the spread operator to copy the object
export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return { ...convoCopy };
    } else {
      return { ...convo };
    }
  });
};
//the problem is the reducer function was returning the same state reference to fix this I used the spread operator to copy the array
export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return [...newState];
};
//the problem is the reducer function was returning the same state reference to fix this I used the spread operator to copy the object
export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      convo.id = message.conversationId;
      convo.messages.push(message);
      convo.latestMessageText = message.text;
      return { ...convo };
    } else {
      return { ...convo };
    }
  });
};
