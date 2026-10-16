import type * as AdventurerTypes from "../types/adventurer"
import {Adventurer as AdventurerModel} from "../models/Index"


export async function getAdventurerByID(id: number): Promise<AdventurerTypes.Adventurer| null> {
    const row = await AdventurerModel.findByPk(id);
    return row ? row.toJSON() : null;
}

export async function getInAll(): Promise<AdventurerTypes.Adventurer[]> {
    const rows = await AdventurerModel.findAll();
    return rows.map((row) => row.toJSON());
}

export async function insertAdventurer(adventurerData: AdventurerTypes.NewAdventurer): Promise<AdventurerTypes.Adventurer> {
    const row = await AdventurerModel.create({
        name: adventurerData.name,
        level: adventurerData.level,
        user_id: adventurerData.user_id,
    });
    return row.toJSON();
}
