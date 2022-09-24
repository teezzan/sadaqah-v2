import { Table, Model, ForeignKey, Column } from "sequelize-typescript";
import { Group } from "./group";
import { User } from "./user";

@Table({
  tableName: "users_groups",
  updatedAt: "updated",
  createdAt: "created",
  deletedAt: "deleted",
  paranoid: true,
})
export class UserGroup extends Model {
  @ForeignKey(() => Group)
  @Column
  groupId: string;

  @ForeignKey(() => User)
  @Column
  userId: string;
}

@Table({
  tableName: "users_groups_admins",
  updatedAt: "updated",
  createdAt: "created",
  deletedAt: "deleted",
  paranoid: true,
})
export class UserGroupAdmin extends Model {
  @ForeignKey(() => Group)
  @Column
  groupId: string;

  @ForeignKey(() => User)
  @Column
  userId: string;
}
