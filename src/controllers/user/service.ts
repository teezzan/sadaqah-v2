import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { Sequelize } from "sequelize-typescript";
import winston = require("winston");
import { User } from "../../database/models/user";
import { DefaultService } from "../service";
import { GenericObject } from "./data/types";
import { UserServiceSchema } from "./serviceSchema";

export class UserService extends DefaultService implements UserServiceSchema {
  dbConn: Sequelize;
  constructor(logger: winston.Logger, dbConn: Sequelize) {
    super(logger);
    this.dbConn = dbConn;
  }

  async getUserByExternalId(externalUserId: string): Promise<User> {
    const user = await User.findOne({
      where: {
        externalUserId,
      },
    });

    if (!user) {
      throw new Error("User not found");
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
