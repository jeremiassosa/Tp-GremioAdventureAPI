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
// id           INTEGER PK AUTOINCREMENT
// name         VARCHAR(200) NOT NULL
// level        INTEGER      NOT NULL


export class Adventurer extends Model<InferAttributes<Adventurer>, InferCreationAttributes<Adventurer>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare level: number;
    declare user_id: number;


}

Adventurer.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(200), allowNull: false },
    level: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "adventurers", timestamps: false }
);
