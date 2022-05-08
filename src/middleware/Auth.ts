import admin = require("../utils/firebase");
import * as errors from "restify-errors";
import { Next, Response } from "restify";
import { RequestWithContext } from "../types/restify";

export async function authentication(
  req: RequestWithContext,
  res: Response,
  next: Next
) {
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

  const decodeValue = await admin.auth().verifyIdToken(token);

  if (decodeValue) {
    req.set("user", decodeValue);
    return next();
  }
  next(new errors.UnauthorizedError("Unauthorized"));
}
