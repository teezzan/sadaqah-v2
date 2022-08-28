import { Connection } from "typeorm";
import winston = require("winston");
import { DefaultService } from "../service";

export class UserService extends DefaultService implements Service {
  dbConn: Connection;
  constructor(logger: winston.Logger, dbConn: Connection) {
    super(logger);
    this.dbConn = dbConn;
  }

  ping(auth: boolean): GenericObject<string> {
    return { ping: auth ? "Authorized OK" : "Non-Authorized OK" };
  }
}
