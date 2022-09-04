import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

import { Transaction } from "./transaction";

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

  @HasMany(() => Transaction, "user_id")
  transactions: Transaction[];
}
