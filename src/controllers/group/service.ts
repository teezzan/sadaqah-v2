import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { Sequelize } from "sequelize-typescript";
import winston = require("winston");
import { Group } from "../../database/models/group";
import { User } from "../../database/models/user";
import { DefaultService } from "../service";

export class GroupService extends DefaultService implements DefaultService {
  dbConn: Sequelize;
  constructor(logger: winston.Logger, dbConn: Sequelize) {
    super(logger);
    this.dbConn = dbConn;
  }

  async create(): Promise<Group> {
    return new Group({});
  }
}
