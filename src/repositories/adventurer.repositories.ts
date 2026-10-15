import type * as AdventurerTypes from "../types/adventurer"
import {Adventurer as AdventurerModel} from "../models/Index"


export async function getAdventurerByID(id: number): Promise<AdventurerTypes.Adventurer| null> {
    const row = await AdventurerModel.findByPk(id);
    return row ? row.toJSON() : null;
}
