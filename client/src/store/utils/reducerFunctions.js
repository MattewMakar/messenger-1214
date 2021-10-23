export const addMessageToStore = (state, payload) => {
  const { message, sender, isActive } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    //if it's a new conversation the counter is always starting from 1
    newConvo.unreadCount = 1;
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }
  return state
    .map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      //if the sender is the conversation other user but the conversation is not active increase the read counter 
      if (message.senderId === convoCopy.otherUser.id && !isActive) {
        convoCopy.unreadCount++;
      }
      //if the sender is the other user nd the conversation is active set the last seen to the last message sent
      if (message.senderId === convoCopy.otherUser.id && isActive) {
        convoCopy.lastSeenMessageId = message.id;
      }

      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo ;
    }
  })
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo ;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

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

  return newState;
};
//the problem is the reducer function was returning the same state reference to fix this I used the spread operator to copy the object
export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = { ...convo };
      convoCopy.id = message.conversationId;
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};
//once a conversation is selected update all the messages read status and set the counter to 0
export const addReadMessagesToStore = (state, conversation) => {
  return state.map((convo) => {
    if (convo.id === conversation.id) {
      const convoCopy = { ...convo };
      convoCopy.unreadCount = 0;
      convoCopy.messages = convoCopy.messages.map((message) => {
        const read = !message.read && message.senderId === conversation.otherUserId
          return { ...message, read }
      });
      return convoCopy;
    } else {
      return convo;
    }
  });
};
//keeps track of the active conversation by adding an active attribute to each conversation
export const setActiveConversation = (state, username) => {
  return state.map((convo) => {
    const convoCopy = { ...convo };
    convoCopy.active = convo.otherUser.username === username;
    return convoCopy;
  });
};
//setting the last seen once the socket emits the read status to the last message from the conversation
export const setLastSeen = (state, conversation) => {
  return state.map((convo) => {
    if (convo.id === conversation.id) {
      const convoCopy = { ...convo };
      convoCopy.lastSeenMessageId = convoCopy.messages[convoCopy.messages.length - 1].id;
      return convoCopy;
    } else return convo;
  });
};
