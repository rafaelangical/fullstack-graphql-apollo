import * as UserLoader from "./UserLoader";
import UserModel from "./UserModel";

const {
  createUser,
  loadAllUsers,
  newToken,
  comparePassword,
  getUserDetails,
} = UserLoader;

export const typeDefs = `
  type User {
    id: ID!
    name: String!
    hash: String!
    age: Int!
    cpf: String!
  }
  type Token {
    id: ID!
    token: String!
  }
`;

export const resolvers = {
  getUsers: () => loadAllUsers()
};

export const mutations = {
  createUser: (root, args) => createUser(args),
  getUserDetails: (root, args) => {
    return getUserDetails(args.id);
  },
  login: (root, { name: inputName, password }) => {
    const name = inputName;
    return UserModel.find({ name }).then(result => {
      if (!result.length) {
        throw Error("User not found");
      }

      const [user] = result;
      return comparePassword(password, user)
        .then(res => {
          if (res) {
            const token = newToken({ name });
            return { token };
          }
          throw Error("Server Error");
        })
        .catch(e => {
          throw e;
        });
    });
  }
};
