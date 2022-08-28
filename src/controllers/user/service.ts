import { Sequelize } from "sequelize-typescript";
import winston = require("winston");
import { DefaultService } from "../service";
import { GenericObject } from "./data/structures";

export class UserService extends DefaultService implements DefaultService {
  dbConn: Sequelize;
  constructor(logger: winston.Logger, dbConn: Sequelize) {
    super(logger);
    this.dbConn = dbConn;
  }

  ping(auth: boolean): GenericObject<string> {
    return { ping: auth ? "Authorized OK" : "Non-Authorized OK" };
  }
}
