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

const server = restify.createServer();

server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.pre(restify.plugins.pre.context());

// initializations
DatabaseProvider.configure(config.databaseSettings as DatabaseConfiguration);
const dbConn = DatabaseProvider.getConnection();

const userService = new UserService(logger, dbConn);
const userHTTPHandler = new UserHTTPHandler(logger, userService);
const transactionService = new TransactionService(logger, dbConn, userService);
const transactionHTTPHandler = new TransactionHTTPHandler(
  logger,
  transactionService,
  userHTTPHandler
);
const routes = new Route(logger, userHTTPHandler, transactionHTTPHandler);
routes.SetupRouter(server);

export default server;
