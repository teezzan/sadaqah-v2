import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
  Sequelize,
  BelongsToMany,
} from "sequelize-typescript";
import { Group } from "./group";
import { UserGroup } from "./linkTables";

const { QueryTypes } = require("sequelize");

@Table({
  tableName: "users",
  updatedAt: "updated",
  createdAt: "created",
  deletedAt: "deleted",
  paranoid: true,
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.TEXT,
    field: "name",
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    field: "email",
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    field: "avatar",
  })
  avatar: string;

  @Column({
    type: DataType.TEXT,
    field: "external_user_id",
  })
  externalUserId: string;

  @BelongsToMany(() => Group, () => UserGroup)
  groups: Array<Group & { UserGroup: UserGroup }>;

  toAPIUser = (): APIUser => {
    const userDetail: APIUser = {
      id: this.id,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
    };
    return userDetail;
  };
}

export type APIUser = {
  name: string;
  email: string;
  avatar: string;
  id: string;
};
