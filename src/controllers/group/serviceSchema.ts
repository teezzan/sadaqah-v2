import { Group } from "../../database/models/group";

export interface Service {
  create(): Promise<Group>;
}
