import { Group } from "../../database/models/group";

export interface GroupServiceSchema {
  createGroup(name: string, creatorID: string): Promise<Group>;
}
