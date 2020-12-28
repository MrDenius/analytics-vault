const mongo = require("mongoose");
mongo.connect(
	"mongodb+srv://av-app:OuN9gBq2qy13c9GQ@cluster0.b9kkv.mongodb.net/analytics-vault?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);
mongo.connection.once("open", () => {
	console.log("connected to mongodb");
});

module.exports = mongo;
