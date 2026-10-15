import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import { sequelize } from "../db/connection.js";

// Tabla: Asigned
// ───────────
// id                   INTEGER PK AUTOINCREMENT
// missions_id          INTEGER NOT NULL FK missions.id
// adventurer_id        INTEGER NOT NULL FK  adventurers.id


export class Asigned extends Model<InferAttributes<Asigned>, InferCreationAttributes<Asigned>> {
    declare id: CreationOptional<number>;
    declare missions_id: number
    declare adventurer_id: number
}

Asigned.init(
    {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    missions_id: { type: DataTypes.INTEGER, allowNull: false },
    adventurer_id: { type: DataTypes.INTEGER, allowNull: false },
    
    },
    {sequelize,tableName: "Asigneds",timestamps: false, indexes: [{ unique: true, fields: ["missions_id", "adventurer_id"] }] }
);
