import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation/activeConversationActions";
import { updateMessagesReadStatus } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    //if every message in the conversation was read no need to dispatch the update
    const everyMessageRead = conversation.messages && conversation.messages.every((m) => m.senderId !== conversation.otherUser.id || (m.senderId === conversation.otherUser.id && !!m.read));
    const shouldUpdate = conversation.id && conversation.otherUser && !everyMessageRead;
    if (shouldUpdate)
      await props.updateMessagesReadStatus(conversation);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar photoUrl={otherUser.photoUrl} username={otherUser.username} online={otherUser.online} sidebar={true} />
      <ChatContent conversation={conversation} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    updateMessagesReadStatus: (id) => {
      dispatch(updateMessagesReadStatus(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
