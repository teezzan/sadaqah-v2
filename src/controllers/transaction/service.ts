import { Sequelize } from "sequelize-typescript";
import winston = require("winston");
import { DefaultService } from "../service";
import { Service } from "./serviceSchema";
import { GenericObject } from "./data/structures";
import { TransactionRequest } from "../../types/transaction/transaction";
import { testTransaction } from "../../tests/helpers/stubs/testTransactionStub";

export class TransactionService extends DefaultService implements Service {
  dbConn: Sequelize;
  constructor(logger: winston.Logger, dbConn: Sequelize) {
    super(logger);
    this.dbConn = dbConn;
  }
  ping(auth: boolean): GenericObject<string> {
    return { ping: auth ? "Authorized OK" : "Non-Authorized OK" };
  }
  createTransaction(
    body: TransactionRequest
  ): GenericObject<TransactionRequest> {
    /*** @todo: Get user email from db ***/
    /*** @todo: confirm if user is actually in group ***/
    /*** @todo: create transaction with provider ***/
    /*** @todo: add to transaction db ***/
    /*** @todo: return payment link if any plus status ***/
    return { transaction: testTransaction };
  }
}