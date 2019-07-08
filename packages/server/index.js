import express from "express";
import { ApolloServer } from "apollo-server-express";
import { getToken } from "./src/modules/user/UserLoader";

import * as ProductType from "./src/modules/product/ProductType";
import * as UserType from "./src/modules/user/UserType";

import "./src/utils/db";

const port = 5000;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
  type Query {
    products: [Product]
    getProducts: [Product]
    getUsers: [User]
  }
  type Mutation {
    login( name: String, password: String ): Token!
    addProduct( name: String, price: Int, barcode: String, description: String ): Product!
    createUser( name: String, password: String, age: Int, cpf: String ): Token!
    dev_addProduct( name: String, price: Int, barcode: String, description: String ): Product!
    getProductDetails(id: String ): Product!
    getUserDetails(id: String): User
  }
`;

const typeDefs = [
  ProductType.typeDefs,
  UserType.typeDefs,
];

const resolvers = {
  Query: {
    ...ProductType.resolvers,
    ...UserType.resolvers
  },
  Mutation: {
    ...ProductType.mutations,
    ...UserType.mutations
  }
};

const server = new ApolloServer({
  typeDefs: [SchemaDefinition, ...typeDefs],
  resolvers,
  context: getToken
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port }, (url) =>
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
);
