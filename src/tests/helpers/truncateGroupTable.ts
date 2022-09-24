import { Group } from "../../database/models/group";

export async function truncateGroupTable(): Promise<void> {
  await Group.truncate({ cascade: true });
}
