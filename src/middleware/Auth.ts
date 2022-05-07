import admin = require("../utils/firebase");
import errors from "restify-errors";

export async function authentication(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    res.send(
      new errors.UnauthorizedError(
        { statusCode: 401 },
        "Bearer Token is missing"
      )
    );
    return next(false);
  }

  const decodeValue = await admin.auth().verifyIdToken(token);

  if (decodeValue) {
    req.set("user", decodeValue);
    return next();
  }
   next(new errors.UnauthorizedError("Unauthorized"));
}
