import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
  ForeignKey,
} from "sequelize-typescript";
import { Campaign } from "./campaign";
import { UserGroup, UserGroupAdmin } from "./linkTables";
import { Transaction } from "./transaction";
import { User } from "./user";

@Table({
  tableName: "groups",
  updatedAt: "updated",
  createdAt: "created",
  deletedAt: "deleted",
  paranoid: true,
})
export class Group extends Model {
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

  @BelongsToMany(() => User, () => UserGroup)
  members: Array<User & { UserGroup: UserGroup }>;

  @BelongsToMany(() => User, () => UserGroupAdmin)
  admins: Array<User & { UserGroup: UserGroupAdmin }>;

  @HasMany(() => Campaign, "group_id")
  campaigns: Campaign[];

  @HasMany(() => Transaction, "group_id")
  transactions: Transaction[];
}
