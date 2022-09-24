import { User } from "../../database/models/user";
import testUserStub from "./stubs/testUserStub";

export async function createTestUser(userDetail?: {
  [key: string]: any;
}): Promise<[User, string]> {
  const [user, _] = await User.findOrCreate({
    where: {
      externalUserId: userDetail
        ? userDetail?.externalUserId
        : testUserStub.testUser.uid,
    },
    defaults: {
      id: testUserStub.testUser.id,
      name: testUserStub.testUser.name,
      email: testUserStub.testUser.email,
      avatar: testUserStub.testUser.picture,
      externalUserId: testUserStub.testUser.uid,
      ...userDetail,
    },
  });
  return [user, "token"];
}
