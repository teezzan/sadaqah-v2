import testUserStub from "./stubs/testUserStub";

export async function createTestUser(userDetail: {
  [key: string]: any;
}): Promise<[any, string]> {
  return [testUserStub.testUser, "token"];
}
