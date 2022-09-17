import { Router } from "restify-router";
import admin = require("../../utils/firebase");
import * as errors from "restify-errors";
import logger = require("../../utils/logger");
import { UserService } from "./service";
import { DefaultHTTPHandler } from "../httpHandler";
import winston = require("winston");
import { Next, Response } from "restify";
import testUserStub from "../../tests/helpers/stubs/testUserStub";
import { ErrorTypes } from "../../types/errors";
import { RequestWithContext } from "../../types/restify";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export class UserHTTPHandler extends DefaultHTTPHandler {
  userService: UserService;

  constructor(logger: winston.Logger, userService: UserService) {
    super(logger);
    this.userService = userService;
  }

  public SetupRoutes(): Router {
    const UserRouter = new Router();

    UserRouter.get("/freeping", this.unAuthorizedPingAndGetOKResponse);

    UserRouter.get("/login", this.AuthMiddleware, this.login);
    UserRouter.get(
      "/ping",
      this.AuthMiddleware,
      this.authorizedPingAndGetOKResponse
    );
    return UserRouter;
  }

  public async AuthMiddleware(
    req: RequestWithContext,
    res: Response,
    next: Next
  ) {
    let decodeValue: DecodedIdToken;

    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return next(
        res.send(
          new errors.UnauthorizedError(
            { statusCode: 401 },
            "Bearer Token is missing"
          )
        )
      );
    }

    try {
      if (process.env.NODE_ENV !== "test") {
        decodeValue = await admin.auth().verifyIdToken(token);
      } else {
        decodeValue = testUserStub.testUser;
      }

      if (decodeValue) {
        req.set("user", decodeValue);
        return next();
      }
      next(new errors.UnauthorizedError("Unauthorized"));
    } catch (err) {
      if (err.code == ErrorTypes.TokenExpiredError) {
        return next(new errors.RequestExpiredError(err.message));
      }
      if (err.code == ErrorTypes.TokenRevokedError) {
        return next(new errors.UnauthorizedError(err.message));
      }
      next(new errors.InternalServerError(err));
    }
  }

  authorizedPingAndGetOKResponse = (req, res, next) => {
    const pingResult = this.userService.ping(true);
    res.send(pingResult);
    return next();
  };

  unAuthorizedPingAndGetOKResponse = (req, res, next) => {
    const pingResult = this.userService.ping(false);
    res.send(pingResult);
    this.logger.info("response sent");
    return next();
  };

  login = (req, res, next) => {
    try {
      const decodedIDToken = req.get("user") as DecodedIdToken;
      this.userService.createOrFetchUser(decodedIDToken);
    } catch (error) {
      next(new errors.InternalServerError(error));
    }
  };
}
