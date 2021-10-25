import React from "react";
import { Badge,Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "space-between",
		marginLeft: 20,
		flexGrow: 1,
	},
	username: {
		fontWeight: "bold",
		letterSpacing: -0.2,
	},
	previewText: (props) => ({
		fontSize: 12,
		color: !!props.conversation.unreadCount ? "#000000" : "#9CADC8",
		letterSpacing: -0.17,
		fontWeight:!!props.conversation.unreadCount ? 700 : "inherit",
	}),
	unread: {
		color: "#000000",
		fontWeight: 700,
	},
	unreadBadge: {
		position: "relative",
		right: 50,
		top: 20,
	},
}));

const ChatContent = (props) => {
  const classes = useStyles(props);

  const { conversation } = props;
  const { latestMessageText, otherUser, unreadCount } = conversation;
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>{otherUser.username}</Typography>
        <Typography className={classes.previewText}>{latestMessageText}</Typography>
      </Box>
      {!!unreadCount && <Badge color="primary" badgeContent={unreadCount} className={classes.unreadBadge} /> }
    </Box>
  );
};

export default ChatContent;
