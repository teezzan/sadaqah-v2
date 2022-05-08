import "reflect-metadata";
import * as logger from "../utils/logger";
import * as restify from "restify";

import Routes from "../routes";

const server = restify.createServer();

server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.bodyParser());

logger.info("loading routes");

Routes(server);

server.get(
  "/", // don't forget the `/*`
  restify.plugins.serveStaticFiles("../public")
);

export default server;
