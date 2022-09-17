import { Sequelize } from "sequelize-typescript";
import { Group } from "./models/group";
import { User } from "./models/user";

export interface DatabaseConfiguration {
  type: "postgres" | "mysql" | "mssql";
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl?: boolean;
}

export class DatabaseProvider {
  private static connection: Sequelize;
  private static configuration: DatabaseConfiguration;

  public static configure(databaseConfiguration: DatabaseConfiguration): void {
    DatabaseProvider.configuration = databaseConfiguration;
  }

  public static getConnection(): Sequelize {
    if (DatabaseProvider.connection) {
      return DatabaseProvider.connection;
    }

    if (!DatabaseProvider.configuration) {
      throw new Error("DatabaseProvider is not configured yet.");
    }

    const { type, host, port, username, password, database, ssl } =
      DatabaseProvider.configuration;

    DatabaseProvider.connection = new Sequelize({
      database,
      dialect: type,
      host,
      port,
      username,
      password,
      ssl,
      // logging: false,
      models: [Group, User],
    });

    return DatabaseProvider.connection;
  }
}
