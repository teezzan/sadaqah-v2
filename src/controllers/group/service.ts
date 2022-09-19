import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { Sequelize } from "sequelize-typescript";
import winston = require("winston");
import { Group } from "../../database/models/group";
import { User } from "../../database/models/user";
import { DefaultService } from "../service";
import { GroupServiceSchema } from "./serviceSchema";

export class GroupService extends DefaultService implements GroupServiceSchema {
  dbConn: Sequelize;
  constructor(logger: winston.Logger, dbConn: Sequelize) {
    super(logger);
    this.dbConn = dbConn;
  }

  async createGroup(name: string): Promise<Group> {
    return new Group({});
  }
}
