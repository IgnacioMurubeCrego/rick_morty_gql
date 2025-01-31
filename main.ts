import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.ts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
});

const apolloServer = await startStandaloneServer(server);

console.info(`Server ready at ${apolloServer.url}`);
