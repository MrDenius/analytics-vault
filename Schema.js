const graphql = require("graphql");

const User = require("./mongo-models/user");
const Log = require("./mongo-models/log");

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLBoolean,
	GraphQLSchema,
	GraphQLID,
	GraphQLFloat,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObject,
} = graphql;

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		UUID: {
			type: GraphQLString,
		},
		data: {
			type: GraphQLList(LogType),
			resolve(parent, args) {
				return Log.find({ UUID: parent.UUID });
			},
		},
	}),
});

const LogType = new GraphQLObjectType({
	name: "Log",
	fields: () => ({
		UUID: {
			type: GraphQLString,
		},
		type: {
			type: GraphQLString,
		},
		date: {
			type: GraphQLString,
		},
		roomsHistory: {
			type: GraphQLList(GraphQLString),
		},
		RoomsPath: {
			type: GraphQLString,
		},
		VERSION: {
			type: GraphQLString,
		},
		User: {
			type: UserType,
			resolve(parent, args) {
				return User.findOne({ UUID: parent.UUID });
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return User.find({});
			},
		},
		user: {
			type: UserType,
			args: { UUID: { type: new GraphQLNonNull(GraphQLString) } },
			resolve(parent, args) {
				return User.findOne({ UUID: args.UUID });
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addUser: {
			type: UserType,
			args: {
				UUID: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				const user = new User({
					UUID: args.UUID,
				});
				return user.save();
			},
		},
		addLog: {
			type: LogType,
			args: {
				UUID: { type: new GraphQLNonNull(GraphQLString) },
				type: { type: new GraphQLNonNull(GraphQLString) },
				date: { type: new GraphQLNonNull(GraphQLString) },
				roomsHistory: {
					type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
				},
				RoomsPath: { type: new GraphQLNonNull(GraphQLString) },
				VERSION: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				const log = new Log({
					UUID: args.UUID,
					type: args.type,
					date: args.date,
					roomsHistory: args.roomsHistory,
					RoomsPath: args.RoomsPath,
					VERSION: args.VERSION,
				});
				return log.save();
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
