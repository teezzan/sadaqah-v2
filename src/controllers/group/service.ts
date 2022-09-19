import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { Sequelize } from "sequelize-typescript";
import winston = require("winston");
import { Group } from "../../database/models/group";
import { User } from "../../database/models/user";
import { DefaultService } from "../service";
import { UserService } from "../user/service";
import { GroupServiceSchema } from "./serviceSchema";

export class GroupService extends DefaultService implements GroupServiceSchema {
  dbConn: Sequelize;
  userService: UserService;
  constructor(
    logger: winston.Logger,
    dbConn: Sequelize,
    userService: UserService
  ) {
    super(logger);
    this.dbConn = dbConn;
    this.userService = userService;
  }

  async createGroup(name: string, creatorID: string): Promise<Group> {
    const user = await this.userService.getUserByExternalId(creatorID);
    const group = await Group.create({
      name,
      members: [user],
    });

    return group;
  }
}
