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
import {
  schemaName,
  CreateGroupPayload,
  BodyValidatonMiddleware,
} from "./validator";
import { Static } from "runtypes";

export class GroupHTTPHandler extends DefaultHTTPHandler {
  groupService: GroupService;

  constructor(logger: winston.Logger, groupService: GroupService) {
    super(logger);
    this.groupService = groupService;
  }

  public SetupRoutes(authMiddleware: Function): Router {
    const GroupRouter = new Router();

    GroupRouter.post(
      "/create",
      authMiddleware,
      BodyValidatonMiddleware(schemaName.CREATE_GROUP),
      this.createGroup
    );
    return GroupRouter;
  }

  createGroup = async (req: RequestWithContext, res: Response, next: Next) => {
    try {
      const payload = req.get(schemaName.CREATE_GROUP) as Static<
        typeof CreateGroupPayload
      >;
      const group = await this.groupService.createGroup(payload.name);
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
