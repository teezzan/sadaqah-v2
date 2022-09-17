import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { Sequelize } from "sequelize-typescript";
import winston = require("winston");
import { User } from "../../database/models/user";
import { DefaultService } from "../service";
import { GenericObject } from "./data/structures";

export class UserService extends DefaultService implements DefaultService {
  dbConn: Sequelize;
  constructor(logger: winston.Logger, dbConn: Sequelize) {
    super(logger);
    this.dbConn = dbConn;
  }

  ping(auth: boolean): GenericObject<string> {
    return { ping: auth ? "Authorized OK" : "Non-Authorized OK" };
  }

  async createOrFetchUser(idToken: DecodedIdToken): Promise<User> {
    const [userDetail, _] = await User.findOrCreate({
      where: {
        externalUserId: idToken.uid,
      },
      defaults: {
        name: idToken.name,
        email: idToken.email,
        avatar: idToken.phone_number,
        externalUserId: idToken.uid,
      },
    });
    return userDetail;
  }
}
