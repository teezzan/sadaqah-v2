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

@Table({
  tableName: "groups",
  updatedAt: "updated",
  createdAt: "created",
  deletedAt: "deleted",
  paranoid: true,
})
export class Group extends Model {
  @Column({
    type: DataType.TEXT,
    field: "name",
  })
  name: string;

  @HasMany(() => Transaction, "user_id")
  transactions: Transaction[];
}
