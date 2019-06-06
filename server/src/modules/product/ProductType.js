import { AuthenticationError } from "apollo-server-express";
import { loadAllProducts, addProduct } from "./ProductLoader";

export const typeDefs = `
  type Product {
    id: ID!
    name: String!
    price: Int!
    description: String!
    barcode: String!
    ts: String!
  }
`;

export const resolvers = {
  products: (root, args, { auth }) => {
    if (auth) {
      return loadAllProducts(args);
    }
    throw new AuthenticationError("Please signing again.");
  },
  getProducts: (root, args) => loadAllProducts(args)
};

export const mutations = {
  addProduct: (root, args, { auth }) => {
    if (auth) {
      return addProduct(args);
    }
    throw new AuthenticationError("Please signing again.");
  },
  dev_addProduct: (root, args) => addProduct(args)
};
