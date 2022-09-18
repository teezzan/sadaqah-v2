import { Server } from "restify";
import { Router } from "restify-router";
import { Logger } from "winston";
import { UserHTTPHandler } from "../controllers/user/routes";
import { TransactionHTTPHandler } from "../controllers/transaction/routes";
import { RouterController } from "./routeSchema";

export class Route implements RouterController {
  logger: Logger;

  userHTTPHandler: UserHTTPHandler;
  transactionHTTPHandler: TransactionHTTPHandler;
  mainRouter: Router;

  constructor(
    logger: Logger,
    userHTTPHandler: UserHTTPHandler,
    transactionHTTPHandler: TransactionHTTPHandler
  ) {
    this.logger = logger;
    this.userHTTPHandler = userHTTPHandler;
    this.transactionHTTPHandler = transactionHTTPHandler;
    this.mainRouter = new Router();
  }

  SetupRouter(server: Server) {
    this.mainRouter.add("/user", this.userHTTPHandler.SetupRoutes());
    this.mainRouter.add(
      "/transaction",
      this.transactionHTTPHandler.SetupRoutes()
    );
    this.mainRouter.applyRoutes(server, "/api");
  }
}
