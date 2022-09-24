import { Group } from "../../database/models/group";

export interface GroupServiceSchema {
  createGroup(name: string, creatorID: string): Promise<Group>;
  getUserGroupByName(name: string, userID: string): Promise<Group[]>;
}
