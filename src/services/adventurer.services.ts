import * as AdventurerRepository from "../repositories/adventurer.repositories.ts";
import type * as AdventurerTypes from "../types/adventurer.js";

export async function getInAllService(): Promise<AdventurerTypes.Adventurer[]> {
    return await AdventurerRepository.getInAll();
}
