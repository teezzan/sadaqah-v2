import { Router } from "restify-router";
import * as errors from "restify-errors";
import logger = require("../../utils/logger");
import { TransactionService } from "./service";
import { DefaultHTTPHandler } from "../httpHandler";
import winston = require("winston");
import { Next, Response } from "restify";
import { RequestWithContext } from "../../types/restify";
import { TransactionRequest } from "../../types/transaction/transaction";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { UserHTTPHandler } from "../user/routes";

export class TransactionHTTPHandler extends DefaultHTTPHandler {
  transactionService: TransactionService;
  constructor(logger: winston.Logger, transactionService: TransactionService) {
    super(logger);
    this.transactionService = transactionService;
  }

  public SetupRoutes(authMiddleware: Function): Router {
    const TransactionRouter = new Router();
    TransactionRouter.post("/create", authMiddleware, this.createTransaction);
    return TransactionRouter;
  }

  createTransaction = async (
    req: RequestWithContext,
    res: Response,
    next: Next
  ) => {
    try {
      if (!req.is("json")) {
        return next(
          new errors.UnsupportedMediaTypeError(
            "content-type: application/json required"
          )
        );
      }
      const userId = req.get("userId") as string;
      const result = await this.transactionService.createTransaction(
        req.body as TransactionRequest,
        userId
      );
      res.status(200);
      res.send(result);
      return next();
    } catch (error) {
      next(new errors.InternalServerError(error));
    }
  };
}
