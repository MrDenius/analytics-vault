const mongo = require("mongoose");
const Schema = mongo.Schema;

const userSchema = new Schema({
	UUID: String,
});

module.exports = mongo.model("Users", userSchema);
