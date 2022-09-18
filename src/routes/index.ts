import { Server } from "restify";
import { Router } from "restify-router";
import { Logger } from "winston";
import { UserHTTPHandler } from "../controllers/user/routes";
import { RouterController } from "./routeSchema";

export class Route implements RouterController {
  logger: Logger;

  userHTTPHandler: UserHTTPHandler;
  mainRouter: Router;

  constructor(logger: Logger, userHTTPHandler: UserHTTPHandler) {
    this.logger = logger;
    this.userHTTPHandler = userHTTPHandler;
    this.mainRouter = new Router();
  }

  SetupRouter(server: Server) {
    this.mainRouter.add("/user", this.userHTTPHandler.SetupRoutes());
    this.mainRouter.applyRoutes(server, "/api");
  }
}
