import { Router } from "restify-router";
import * as errors from "restify-errors";
import { DefaultHTTPHandler } from "../httpHandler";
import winston = require("winston");
import { Next, Response } from "restify";
import { RequestWithContext } from "../../types/restify";
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
      const userId = req.get("userId") as string;
      const group = await this.groupService.createGroup(payload.name, userId);
      const groupDetails = group.toAPIGroup();
      res.status(201);
      res.send(groupDetails);
      return next();
    } catch (error) {
      // ToDo: Do error type check for better response.
      this.logger.error(error);
      next(new errors.InternalServerError(error));
    }
  };
}
