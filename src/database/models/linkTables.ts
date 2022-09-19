import { Table, Model, ForeignKey, Column } from "sequelize-typescript";
import { Group } from "./group";
import { User } from "./user";

@Table
export class UserGroup extends Model {
  @ForeignKey(() => Group)
  @Column
  groupId: string;

  @ForeignKey(() => User)
  @Column
  userId: string;
}

@Table
export class UserGroupAdmin extends Model {
  @ForeignKey(() => Group)
  @Column
  groupId: string;

  @ForeignKey(() => User)
  @Column
  userId: string;
}
