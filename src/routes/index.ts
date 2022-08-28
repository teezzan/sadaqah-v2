import { Server } from "restify";
import { Logger } from "winston";
import { UserHTTPHandler } from "../controllers/user/routes";
import { RouterController } from "./routeSchema";

export class Route implements RouterController {
  logger: Logger;

  userHTTPHandler: UserHTTPHandler;

  constructor(logger: Logger, userHTTPHandler: UserHTTPHandler) {
    this.logger = logger;
    this.userHTTPHandler = userHTTPHandler;
  }

  SetupRouter(server: Server) {
    this.userHTTPHandler.SetupRoutes().applyRoutes(server, "/api");
  }
}
