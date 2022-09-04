import { Server } from "restify";
import { Logger } from "winston";
import { UserHTTPHandler } from "../controllers/user/routes";
import { TransactionHTTPHandler } from "../controllers/transaction/routes";
import { RouterController } from "./routeSchema";

export class Route implements RouterController {
  logger: Logger;

  userHTTPHandler: UserHTTPHandler;
  transactionHTTPHandler: TransactionHTTPHandler;

  constructor(
    logger: Logger,
    userHTTPHandler: UserHTTPHandler,
    transactionHTTPHandler: TransactionHTTPHandler
  ) {
    this.logger = logger;
    this.userHTTPHandler = userHTTPHandler;
    this.transactionHTTPHandler = transactionHTTPHandler;
  }

  SetupRouter(server: Server) {
    this.userHTTPHandler.SetupRoutes().applyRoutes(server, "/api");
    this.transactionHTTPHandler
      .SetupRoutes()
      .applyRoutes(server, "/transaction_api");
  }
}
