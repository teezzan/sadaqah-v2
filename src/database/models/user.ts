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

  toAPIUser = (user: User): APIUser => {
    const userDetail: APIUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
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
