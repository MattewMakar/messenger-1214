import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  updateLastSeen
} from "./store/conversations/conversationsActions";
import { updateMessagesReadStatus } from "./store/utils/thunkCreators";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  //if the new message in an active conversation set the message with a flag isActive to update the status to read then if the message is not sent from the current user dispatch the message read status for the current user
  socket.on("new-message", (data) => {
    const { conversations } = store.getState();
    const activeConversation = conversations.find((convo) => convo.active);
    const isActive = activeConversation && data.message.senderId.username === activeConversation.otherUser.username;
    store.dispatch(setNewMessage(data.message, data.sender, isActive));
    if (activeConversation && activeConversation.id === data.message.conversationId && data.message.senderId.username !== activeConversation.otherUser.username) {
			store.dispatch(updateMessagesReadStatus(activeConversation));
		}
  });

  socket.on("read-message", (data) => {
    store.dispatch(updateLastSeen(data));
  });
});

export default socket;
