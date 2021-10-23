const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id"],
      order: [[Message, "createdAt"]],
      include: [
        { model: Message, order: ["createdAt"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    conversations.sort((a, b) => {
      return Date.parse(b.messages[b.messages.length - 1].createdAt) - Date.parse(a.messages[a.messages.length - 1].createdAt);
    });
    for (let i = 0; i < conversations.length; i++) {
			const convo = conversations[i];
			const convoJSON = convo.toJSON();

			// set a property "otherUser" so that frontend will have easier access
			if (convoJSON.user1) {
				convoJSON.otherUser = convoJSON.user1;
				delete convoJSON.user1;
			} else if (convoJSON.user2) {
				convoJSON.otherUser = convoJSON.user2;
				delete convoJSON.user2;
			}

			// set property for online status of the other user
			if (onlineUsers.includes(convoJSON.otherUser.id)) {
				convoJSON.otherUser.online = true;
			} else {
				convoJSON.otherUser.online = false;
			}
			//setting unread count in each conversation
			convoJSON.unreadCount = await Message.count({
				where: {
					[Op.and]: [
						{
							conversationId: convoJSON.id,
						},
						{
							read: false,
						},
						{
							[Op.not]: {
								senderId: userId,
							},
						},
					],
				},
			});
			//setting last seen message for each conversation
			const lastSeenMessage = await Message.findOne({
				attributes: ["id"],
				where: {
					[Op.and]: [
						{
							conversationId: convoJSON.id,
						},
						{
							read: true,
						},
						{
							senderId: userId,
						},
					],
				},
				order: [["id", "DESC"]],
			});
			// set properties for notification count and latest message preview
			convoJSON.latestMessageText = convoJSON.messages[convoJSON.messages.length - 1].text;
			//if no messaged was read from the other user the last seen is null
			convoJSON.lastSeenMessageId = lastSeenMessage ? lastSeenMessage.id : null;
			conversations[i] = convoJSON;
		}

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

// Route form updating all read status for all messages in the passed conversation
router.put("/readMessages/:conversationId", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const { conversationId } = req.params;

    await Message.update(
      { read: true },
      {
        where: {
          conversationId: conversationId,
          senderId: {
            [Op.not]: userId,
          },
        },
      }
    );

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
