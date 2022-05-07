import "dotenv/config";
import config = require("./config");
import server from "./server";
import * as logger from "./utils/logger";

server.listen(config.HTTP.port);
logger.info("Listening on PORT %d", config.HTTP.port);
