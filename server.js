((factory) => {
	module.exports = factory();
})(() => {
	const express = require("express");
	const db = require("./db");
	const { graphqlHTTP } = require("express-graphql");
	const schema = require("./Schema");

	const api = {};

	const app = express();

	const Init = () => {
		app.use(
			"/graphql",
			graphqlHTTP({
				schema,
				graphiql: true,
			})
		);
	};

	const Start = () => {
		Init();
		app.listen(4000);
		console.log(
			`Running a GraphQL API server at http://localhost:${4000}/graphql`
		);
	};

	api.Start = Start;

	return api;
});
