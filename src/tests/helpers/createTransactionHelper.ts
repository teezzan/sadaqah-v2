import { testTransaction } from "./stubs/testTransactionStub";

export async function createTestTransaction(userDetail: {
  [key: string]: any;
}): Promise<[any, string]> {
  return [testTransaction, "token"];
}
