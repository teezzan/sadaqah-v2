import "reflect-metadata";
import * as logger from "../utils/logger";
import * as restify from "restify";

import { Route } from "../routes";
import { UserHTTPHandler } from "../controllers/user/routes";
import { UserService } from "../controllers/user/service";
import { DatabaseConfiguration, DatabaseProvider } from "../database";
import config from "../config";
import { TransactionHTTPHandler } from "../controllers/transaction/routes";
import { TransactionService } from "../controllers/transaction/service";
import { GroupHTTPHandler } from "../controllers/group/routes";
import { GroupService } from "../controllers/group/service";

const server = restify.createServer();

server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.pre(restify.plugins.pre.context());

DatabaseProvider.configure(config.databaseSettings as DatabaseConfiguration);
const dbConn = DatabaseProvider.getConnection();

// test remove after implementing migrations
(async () => {
  await dbConn.sync();
})();

const userService = new UserService(logger, dbConn);
const groupService = new GroupService(logger, dbConn, userService);
const transactionService = new TransactionService(logger, dbConn, userService);

const userHTTPHandler = new UserHTTPHandler(logger, userService);
const groupHTTPHandler = new GroupHTTPHandler(logger, groupService);
const transactionHTTPHandler = new TransactionHTTPHandler(
  logger,
  transactionService
);

const routes = new Route(
  logger,
  userHTTPHandler,
  groupHTTPHandler,
  transactionHTTPHandler
);
routes.SetupRouter(server);

server.on("InternalServer", function (req, res, err, callback) {
  console.log(err); // setup global logger
  res.status(500);
  res.send({ ...err.body, message: "Internal Server Error" });
  return callback();
});

export default server;
