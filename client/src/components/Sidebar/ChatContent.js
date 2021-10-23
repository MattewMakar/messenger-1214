import React from "react";
import { Badge,Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

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
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
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
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, unreadCount } = conversation;
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>{otherUser.username}</Typography>
        <Typography className={clsx(classes.previewText, { [classes.unread]: !!unreadCount })}>{latestMessageText}</Typography>
      </Box>
      {unreadCount ? <Badge color="primary" badgeContent={unreadCount} className={classes.unreadBadge} /> : null}
    </Box>
  );
};

export default ChatContent;
