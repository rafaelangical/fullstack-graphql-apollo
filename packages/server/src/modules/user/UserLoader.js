import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { AuthenticationError } from "apollo-server-express";
import UserModel from "./UserModel";

const { ObjectId } = mongoose.Types;
const secret = "super-secret";

export const loadAllUsers = () => {
  return UserModel.find({}).then(result => {
    return result;
  });
};

export const getToken = ({ req }) => {
  const { token } = req.headers;

  if (!token) {
    return Promise.resolve();
  }

  return new Promise((res, rej) => {
    jwt.verify(token, secret, e => {
      if (e) {
        rej(new AuthenticationError("Please sign in again"));
      }
      res({ auth: token });
    });
  }).catch(e => {
    throw e;
  });
};

export const newToken = user =>
  jwt.sign(user, secret, {
    expiresIn: "99999s"
  });

export const comparePassword = (password, user) =>
  new Promise((res, rej) => {
    bcrypt
      .compare(password, user.hash)
      .then(success => {
        if (!success) {
          return rej(Error("Incorrect passwordd"));
        }
        return res(true);
      })
      .catch(e => rej(Error(`Server Error: ${JSON.stringify(e)}`)));
  });

export const createUser = ({ name: inputName, password, age, cpf }) => {
  const name = inputName;

  return UserModel.find({ name }).then(res => {
    const hash = bcrypt.hashSync(password, 4);
    const _id = new ObjectId();
    const user = new UserModel({ name, hash, _id, age, cpf });
    user.save();
    const token = newToken({ name });
    return { token };
  });
};

export const getUserDetails = async id => {
  let user = [];
  try {
    user = await UserModel.findById(id);
    console.log("user", user);
  } catch (error) {
    console.log("error", error);
  }

  return user;
 };