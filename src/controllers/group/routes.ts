import { Router } from "restify-router";
import logger = require("../../utils/logger");
import * as errors from "restify-errors";
import { DefaultHTTPHandler } from "../httpHandler";
import winston = require("winston");
import { Next, Response } from "restify";
import { RequestWithContext } from "../../types/restify";
import { APIGroup } from "./data/types";
import { Group } from "../../database/models/group";
import { GroupService } from "./service";

export class GroupHTTPHandler extends DefaultHTTPHandler {
  groupService: GroupService;

  constructor(logger: winston.Logger, groupService: GroupService) {
    super(logger);
    this.groupService = groupService;
  }

  public SetupRoutes(authMiddleware: Function): Router {
    const GroupRouter = new Router();

    GroupRouter.get("/create", authMiddleware, this.create);
    return GroupRouter;
  }

  create = async (req: RequestWithContext, res: Response, next: Next) => {
    try {
      const group = await this.groupService.create();
      const groupDetails = this.convertToAPIGroup(group);
      res.status(201);
      res.send(groupDetails);
      return next();
    } catch (error) {
      next(new errors.InternalServerError(error));
    }
  };

  convertToAPIGroup = (group: Group): APIGroup => {
    const groupDetail: APIGroup = {
      id: group.id,
      name: group.name,
    };
    return groupDetail;
  };
}
