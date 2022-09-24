import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { User } from "../../database/models/user";
import { GenericObject } from "./data/types";

export interface UserServiceSchema {
  createOrFetchUser(
    idToken: DecodedIdToken
  ): Promise<{ user: User; isNewUser: boolean }>;
  getByExternalId(externalUserId: string): Promise<User>;
  getById(userId: string): Promise<User>;
}
