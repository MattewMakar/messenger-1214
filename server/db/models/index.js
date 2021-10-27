const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Read = require("./read");

// associations

Conversation.belongsToMany(User, { through: "convo_users" }); // will create a bridge table between conversations and users
Message.belongsToMany(User, { through: Read });  // will use the read table as a bridge table between Message and users

Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message
};
