import { TransactionRequest } from "../../types/transaction/transaction";
import { GenericObject } from "./data/structures";

export interface Service {
  ping(auth: boolean): GenericObject<string>;
  createTransaction(
    body: TransactionRequest
  ): GenericObject<TransactionRequest>;
}
