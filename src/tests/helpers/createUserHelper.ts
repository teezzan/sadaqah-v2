export async function createTestUser(userDetail: {
  [key: string]: any;
}): Promise<[any, string]> {
  return ["mockUser", "token"];
}
