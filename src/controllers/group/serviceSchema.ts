import { Group } from "../../database/models/group";

export interface GroupServiceSchema {
  createGroup(name: string): Promise<Group>;
}
