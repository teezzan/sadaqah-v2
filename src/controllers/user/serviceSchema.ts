import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { User } from "../../database/models/user";
import { GenericObject } from "./data/types";

export interface Service {
  ping(auth: boolean): GenericObject<string>;
  createOrFetchUser(idToken: DecodedIdToken): Promise<User>;
}
