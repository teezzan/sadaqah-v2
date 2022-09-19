import { Server } from "restify";
import { Router } from "restify-router";
import { Logger } from "winston";
import { UserHTTPHandler } from "../controllers/user/routes";
import { TransactionHTTPHandler } from "../controllers/transaction/routes";
import { RouterController } from "./routeSchema";
import { GroupHTTPHandler } from "../controllers/group/routes";

export class Route implements RouterController {
  logger: Logger;

  userHTTPHandler: UserHTTPHandler;
  transactionHTTPHandler: TransactionHTTPHandler;
  groupHTTPHandler: GroupHTTPHandler;

  mainRouter: Router;

  constructor(
    logger: Logger,
    userHTTPHandler: UserHTTPHandler,
    groupHTTPHandler: GroupHTTPHandler,
    transactionHTTPHandler: TransactionHTTPHandler
  ) {
    this.logger = logger;
    this.userHTTPHandler = userHTTPHandler;
    this.groupHTTPHandler = groupHTTPHandler;
    this.transactionHTTPHandler = transactionHTTPHandler;
    this.mainRouter = new Router();
  }

  SetupRouter(server: Server) {
    this.mainRouter.add("/user", this.userHTTPHandler.SetupRoutes());
    this.mainRouter.add("/group", this.userHTTPHandler.SetupRoutes());
    this.mainRouter.add(
      "/transaction",
      this.transactionHTTPHandler.SetupRoutes(
        this.userHTTPHandler.AuthMiddleware
      )
    );
    this.mainRouter.applyRoutes(server, "/api");
  }
}
