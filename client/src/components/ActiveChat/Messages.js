import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

/**
 * To sort Message by date
 * @param {Message} a
 * @param {Message} b
 * @returns {number}
 */

const sortingMessagesByDate = (a, b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf();

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  // sorting the messages by it's Epoch time milliseconds
  return (
    <Box>
      {messages.sort(sortingMessagesByDate).map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        return message.senderId === userId ? <SenderBubble key={message.id} text={message.text} time={time} /> : <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />;
      })}
    </Box>
  );
};

export default Messages;
