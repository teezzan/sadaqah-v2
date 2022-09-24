import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { Sequelize } from "sequelize-typescript";
import winston = require("winston");
import { User } from "../../database/models/user";
import { DefaultService } from "../service";
import { GenericObject } from "./data/types";
import { UserServiceSchema } from "./serviceSchema";
import admin = require("../../utils/firebase");

export class UserService extends DefaultService implements UserServiceSchema {
  dbConn: Sequelize;
  constructor(logger: winston.Logger, dbConn: Sequelize) {
    super(logger);
    this.dbConn = dbConn;
  }

  async getByExternalId(externalUserId: string): Promise<User> {
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

  async getById(userId: string): Promise<User> {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async createOrFetchUser(
    idToken: DecodedIdToken
  ): Promise<{ user: User; isNewUser: boolean }> {
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
      await user.update({
        name: idToken.name,
        email: idToken.email,
        avatar: idToken.picture,
        externalUserId: idToken.uid,
      });
    } else {
      await admin.auth().setCustomUserClaims(idToken.uid, {
        id: user.id,
      });
    }
    return { user, isNewUser: created };
  }
}
