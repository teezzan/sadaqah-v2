import { EventTypes } from "../../types/events";
import * as logger from "../../utils/logger";
import {
  incrementUserProperties,
  setUserProperties,
  trackUserEvent,
} from "../../utils/mixpanel";

export async function authorizedPingAndGetOKResponse(req, res, next) {
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

export async function unAuthorizedPingAndGetOKResponse(req, res, next) {
  res.send({ ping: "Non-Authorized OK" });

  logger.info("response sent");

  return next();
}
