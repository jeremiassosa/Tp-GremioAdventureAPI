import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import { sequelize } from "../db/connection.js";

// Tabla: Gremios
// ───────────
// id                   INTEGER PK AUTOINCREMENT
// missions_id          INTEGER NOT NULL UNIQUE FK missions.id
// adventurer_id        INTEGER NOT NULL FK  adventurers.id


export class Gremios extends Model<InferAttributes<Gremios>, InferCreationAttributes<Gremios>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string;
}

Gremios.init(
    {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(200), allowNull: false },
    description: { type: DataTypes.STRING(200), allowNull: false },
    },
    {sequelize,tableName: "Gremios",timestamps: false}
);
