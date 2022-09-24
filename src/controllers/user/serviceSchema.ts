import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { User } from "../../database/models/user";
import { GenericObject } from "./data/types";

export interface UserServiceSchema {
  createOrFetchUser(idToken: DecodedIdToken): Promise<User>;
  getUserByExternalId(externalUserId: string): Promise<User>;
}
