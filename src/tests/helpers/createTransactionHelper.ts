import { testTransaction } from "./stubs/testTransactionStub";

export async function createTestTransaction(transactionDetail: {
  [key: string]: any;
}): Promise<[any, string]> {
  return [testTransaction, "token"];
}
