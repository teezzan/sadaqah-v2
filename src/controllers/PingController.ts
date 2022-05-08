import * as logger from "../utils/logger";

export async function authorizedPingAndGetOKResponse(req, res, next) {
  res.send({ ping: "Authorized OK" });

  logger.info("response sent");
  return next();
}

export async function unAuthorizedPingAndGetOKResponse(req, res, next) {
    res.send({ ping: "Non-Authorized OK" });
  
    logger.info("response sent");
    return next();
  }