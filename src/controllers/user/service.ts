import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { Sequelize } from "sequelize-typescript";
import winston = require("winston");
import { User } from "../../database/models/user";
import { DefaultService } from "../service";
import { GenericObject } from "./data/types";

export class UserService extends DefaultService implements DefaultService {
  dbConn: Sequelize;
  constructor(logger: winston.Logger, dbConn: Sequelize) {
    super(logger);
    this.dbConn = dbConn;
  }

  ping(auth: boolean): GenericObject<string> {
    return { ping: auth ? "Authorized OK" : "Non-Authorized OK" };
  }

  async getUser(idToken: DecodedIdToken): Promise<User> {
    const user = await User.findOne({
      where: {
        externalUserId: idToken.uid,
      },
    });

    if (!user || !(user instanceof User)) {
      throw new Error("User not registered");
    }
    return user;
  }

  async createOrFetchUser(idToken: DecodedIdToken): Promise<User> {
    const [user, created] = await User.findOrCreate({
      where: {
        externalUserId: idToken.uid,
      },
      defaults: {
        name: idToken.name,
        email: idToken.email,
        avatar: idToken.picture,
        externalUserId: idToken.uid,
      },
    });

    if (!created) {
      return await user.update({
        name: idToken.name,
        email: idToken.email,
        avatar: idToken.picture,
        externalUserId: idToken.uid,
      });
    }
    return user;
  }
}
