import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user";
import { Group } from "./group";

@Table({
  tableName: "transaction",
  updatedAt: "updated",
  createdAt: "created",
  deletedAt: false,
})

export class Transaction extends Model {
  @Column({
    type: DataType.BIGINT,
    field: "user_id",
    allowNull: false,
  })
  userId: bigint;

  @Column({
    type: DataType.BIGINT,
    field: "group_id",
    allowNull: false,
  })
  groupId: bigint;

  @Column({
    type: DataType.INTEGER,
    field: "amount",
    allowNull: false,
  })
  amount: bigint;

  @Column({
    type: DataType.TEXT,
    field: "provider",
    allowNull: false,
  })
  provider: string;

  @Column({
    type: DataType.TEXT,
    field: "type",
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.TEXT,
    field: "status",
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.TEXT,
    field: "currency",
    allowNull: false,
  })
  currency: string;

  @BelongsTo(() => User, "user_id")
  user: User;

  @BelongsTo(() => Group, "group_id")
  group: Group;
}
