import { Server } from "restify";
import winston = require("winston");

export interface RouterController {
  SetupRouter(server: Server);
}
