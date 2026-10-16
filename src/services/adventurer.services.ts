import * as AdventurerRepository from "../repositories/adventurer.repositories.ts";
import type * as AdventurerTypes from "../types/adventurer.js";

export async function getInAllService(): Promise<AdventurerTypes.Adventurer[]> {
    return await AdventurerRepository.getInAll();
}

export async function getAdventurerByIdService(id: number): Promise<AdventurerTypes.Adventurer | "ADVENTURER_NOT_FOUND"> {
    const adventurer = await AdventurerRepository.getAdventurerByID(id);
    if (!adventurer) return "ADVENTURER_NOT_FOUND";
    return adventurer;
}
