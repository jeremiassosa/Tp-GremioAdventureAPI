import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../db/connection.js";

// Tabla: books
// ────────────
// id               INTEGER PK AUTOINCREMENT
// title            VARCHAR(200) NOT NULL
// objteive         INTEGER      NOT NULL
// level            INTEGER      NOT NULL
// gremio_id         INTEGER      NOT NULL fk gremios.id
// status-available BOOLEAN      NOT NULL  DEFAULT true

export class Missions extends Model<InferAttributes<Missions>, InferCreationAttributes<Missions>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare objetive: string;
  declare level: number;
  declare gremio_id: number;
  declare status: CreationOptional<boolean>;
}

Missions.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    objetive: { type: DataTypes.STRING(200), allowNull: false },
    level: { type: DataTypes.INTEGER, allowNull: false },
    gremio_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { sequelize, tableName: "missions", timestamps: false }
);
