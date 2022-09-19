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
    type: DataType.TEXT,
    field: "name",
  })
  name: string;

  @BelongsTo(() => Group, "group_id")
  group: Group
}
