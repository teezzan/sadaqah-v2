import admin = require("../utils/firebase");
import * as errors from "restify-errors";
import { Next, Response } from "restify";
import { RequestWithContext } from "../types/restify";
import { ErrorTypes } from "../types/errors";
import testUserStub from "../tests/helpers/stubs/testUserStub";

export async function authentication(
  req: RequestWithContext,
  res: Response,
  next: Next
) {
  let decodeValue;

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
