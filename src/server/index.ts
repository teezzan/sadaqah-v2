import "reflect-metadata";
import * as logger from "../utils/logger";
import * as restify from "restify";

import { Route } from "../routes";
import { UserHTTPHandler } from "../controllers/user/routes";
import { UserService } from "../controllers/user/service";
import { DatabaseConfiguration, DatabaseProvider } from "../database";
import config from "../config";

const server = restify.createServer();

server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.pre(restify.plugins.pre.context());

// initializations
DatabaseProvider.configure(config.databaseSettings as DatabaseConfiguration);
const dbConn = DatabaseProvider.getConnection();

// test remove after implementing migrations
(async () => {
  await dbConn.sync({ alter: true });
})();

const userService = new UserService(logger, dbConn);
const userHTTPHandler = new UserHTTPHandler(logger, userService);
const routes = new Route(logger, userHTTPHandler);
routes.SetupRouter(server);

server.on("InternalServer", function (req, res, err, callback) {
  res.status(500).send({ ...err.body, message: "Internal Server Error" });
  return callback();
});

export default server;
