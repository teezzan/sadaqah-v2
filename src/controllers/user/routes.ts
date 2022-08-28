import { Router } from "restify-router";
import { authentication } from "./authMiddleware";
import { EventTypes } from "../../types/events";
import logger = require("../../utils/logger");
import {
  setUserProperties,
  trackUserEvent,
  incrementUserProperties,
} from "../../utils/mixpanel";

export class UserHandler {
  SetupRoutes(): Router {
    let PingRouter = new Router();

    PingRouter.get("/ping", authentication, authorizedPingAndGetOKResponse);
    PingRouter.get("/freeping", unAuthorizedPingAndGetOKResponse);
    return PingRouter;
  }
}

async function authorizedPingAndGetOKResponse(req, res, next) {
  res.send({ ping: "Authorized OK" });
  const user = req.get("user");
  await setUserProperties(user.uid, {
    email_verified: true,
    money: 200 + Math.random() * 1000,
  });

  trackUserEvent(EventTypes.Ping, user.uid);

  incrementUserProperties(user.uid, { money: 1000 });
  return next();
}

async function unAuthorizedPingAndGetOKResponse(req, res, next) {
  res.send({ ping: "Non-Authorized OK" });

  logger.info("response sent");

  return next();
}
