const router = require("express").Router();
const { User } = require("../../db/models");
const Sequelize = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// find users by username
router.get("/:username", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { username } = req.params;
    //changing the search query to be more inclusive
    const users = await User.findAll({
      where: {
        [Sequelize.Op.and]: [
          Sequelize.where(Sequelize.fn("lower", Sequelize.col("username")), "like", `%${username.toLocaleLowerCase()}%`),
          {
            id: {
              [Sequelize.Op.not]: req.user.id,
            },
          },
        ],
      },
    });
    
    // add online status to each user that is online
    for (let i = 0; i < users.length; i++) {
      const userJSON = users[i].toJSON();
      if (onlineUsers.includes(userJSON.id)) {
        userJSON.online = true;
      }
      users[i] = userJSON;
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
