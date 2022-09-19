import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
} from "sequelize-typescript";
import { Group } from "./group";

@Table({
  tableName: "campaign",
  updatedAt: "updated",
  createdAt: "created",
  deletedAt: "deleted",
  paranoid: true,
})
export class Campaign extends Model {
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
    type: DataType.UUID,
    field: "group_id",
    allowNull: false,
  })
  groupId: string;

  @BelongsTo(() => Group, "group_id")
  group: Group;
}
