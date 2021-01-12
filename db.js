const mongo = require("mongoose");
mongo.connect(
	"mongodb+srv://server:UygfvHycWJwBJvec@cluster0.m3vo2.mongodb.net/<dbname>?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);
mongo.connection.once("open", () => {
	console.log("connected to mongodb");
});

module.exports = mongo;
