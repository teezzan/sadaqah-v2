import { Router } from "restify-router";
import * as errors from "restify-errors";
import logger = require("../../utils/logger");
import { TransactionService } from "./service";
import { DefaultHTTPHandler } from "../httpHandler";
import winston = require("winston");
import { Next, Response } from "restify";
import { RequestWithContext } from "../../types/restify";

export class TransactionHTTPHandler extends DefaultHTTPHandler {
  transactionService: TransactionService;

  constructor(logger: winston.Logger, transactionService: TransactionService) {
    super(logger);
    this.transactionService = transactionService;
  }

  public SetupRoutes(): Router {
    const TransactionRouter = new Router();
    TransactionRouter.get(
      "/ping",
      /*** @todo: put AuthMiddleware here ***/
      this.authorizedPingAndGetOKResponse
    );
    TransactionRouter.get(
      "/freeping",
      this.unAuthorizedPingAndGetOKResponse
    );
    return TransactionRouter;
  }

  authorizedPingAndGetOKResponse = (
    req: RequestWithContext,
    res: Response,
    next: Next
  ) => {
    const pingResult = this.transactionService.ping(true);
    res.send(pingResult);
    return next();
  };

  unAuthorizedPingAndGetOKResponse = (
    req: RequestWithContext,
    res: Response,
    next: Next
  ) => {
    const pingResult = this.transactionService.ping(false);
    res.send(pingResult);
    this.logger.info("response sent");
    return next();
  };
}
