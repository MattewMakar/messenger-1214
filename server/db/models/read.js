const Sequelize = require("sequelize");
const db = require("../db");

const Read = db.define("read", {
	read: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

module.exports = Read;
