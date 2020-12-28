const mongo = require("mongoose");
const Schema = mongo.Schema;

const logSchema = new Schema({
	UUID: String,
	type: String,
	date: String,
	roomsHistory: Array,
	RoomsPath: String,
	VERSION: String,
});

module.exports = mongo.model("Logs", logSchema);
