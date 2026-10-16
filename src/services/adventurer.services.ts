import * as AdventurerRepository from "../repositories/adventurer.repositories.ts";
import type * as AdventurerTypes from "../types/adventurer.js";
import { User as UserModel, Adventurer } from "../models/Index.ts";

export async function getInAllService(): Promise<AdventurerTypes.Adventurer[]> {
    return await AdventurerRepository.getInAll();
}

export async function getAdventurerByIdService(id: number): Promise<AdventurerTypes.Adventurer | "ADVENTURER_NOT_FOUND"> {
    const adventurer = await AdventurerRepository.getAdventurerByID(id);
    if (!adventurer) return "ADVENTURER_NOT_FOUND";
    return adventurer;
}

export async function createAdventurerService(adventurerData: AdventurerTypes.NewAdventurer): Promise<AdventurerTypes.Adventurer | "USER_NOT_FOUND" | "USER_ALREADY_HAS_ADVENTURER"> {
    const user = await UserModel.findByPk(adventurerData.user_id);
    if (!user) return "USER_NOT_FOUND";

    const existingAdventurer = await UserModel.findOne({
        include: [{ model: Adventurer, as: "adventurer" }],
        where: { id: adventurerData.user_id }
    });
    
    const row = await Adventurer.findOne({ where: { user_id: adventurerData.user_id } });
    if (row) return "USER_ALREADY_HAS_ADVENTURER";

    return await AdventurerRepository.insertAdventurer(adventurerData);
}
