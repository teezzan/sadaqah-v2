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

  async createGroup(name: string, userId: string): Promise<Group> {
    const user = await this.userService.getById(userId);
    const groupWithDuplicateName = await this.getUserGroupByName(name, user.id);
    if (groupWithDuplicateName.length != 0) {
      throw new Error("Duplicate Group Name");
    }
    const group = await Group.create({
      name,
    });
    await group.$add("members", user);
    await group.$add("admins", user);
    return group;
  }

  async getUserGroupByName(name: string, userId: string): Promise<Group[]> {
    const group = await Group.findAll({
      where: {
        name,
      },
      include: [
        {
          model: User,
          as: "members",
          through: {
            where: {
              userId: userId,
            },
          },
        },
      ],
    });
    return group;
  }
}
