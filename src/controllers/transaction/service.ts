import { Sequelize } from "sequelize-typescript";
import winston = require("winston");
import { Transaction } from "../../database/models/transaction";
import { DefaultService } from "../service";
import { Service } from "./serviceSchema";
import { GenericObject } from "./data/structures";
import {
  TransactionRequest,
  TransactionResponse,
} from "../../types/transaction/transaction";
import { testResponse } from "../../tests/helpers/stubs/testTransactionStub";
import { UserService } from "../user/service";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export class TransactionService extends DefaultService implements Service {
  dbConn: Sequelize;
  userService: UserService;
  constructor(
    logger: winston.Logger,
    dbConn: Sequelize,
    userService: UserService
  ) {
    super(logger);
    this.dbConn = dbConn;
    this.userService = userService;
  }
  ping(auth: boolean): GenericObject<string> {
    return { ping: auth ? "Authorized OK" : "Non-Authorized OK" };
  }
  async createTransaction(
    body: TransactionRequest,
    idToken: DecodedIdToken
  ): Promise<TransactionResponse> {
    this.userService.getUser(idToken);
    /*** @todo: Get user email from db ***/
    /*** @todo: confirm if user is actually in group ***/
    /*** @todo: create transaction with provider ***/
    /*** @todo: add to transaction db ***/
    /*** @todo: return payment link if any plus status ***/
    return testResponse;
  }
}
