import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import {
  TransactionRequest,
  TransactionResponse,
} from "../../types/transaction/transaction";
import { GenericObject } from "./data/structures";

export interface TransactionServiceSchema {
  ping(auth: boolean): GenericObject<string>;

  createTransaction(
    body: TransactionRequest,
    idToken: DecodedIdToken
  ): Promise<TransactionResponse>;
}
