import * as MissionsRepository from '../repositories/missions.repositories.ts';
import { assignAdventurers } from '../repositories/asigned.repositories.ts';
import { Asigned } from '../types/asigned.js';
import { getAdventurerByID } from '../repositories/adventurer.repositories.ts';

export async function assignMissionService(missionId: number, adventurerIds: number[]): Promise<"MISSION_NOT_FOUND" | "MISSION_NOT_AVAILABLE" | "ADVENTURER_NOT_FOUND"  | Asigned[]> {
    const mission = await MissionsRepository.getMissionByID(missionId);
    if (!mission) return 'MISSION_NOT_FOUND';
    if (!mission.status) return 'MISSION_NOT_AVAILABLE';

    for (const id of adventurerIds) {
        const adventurer = await getAdventurerByID(id);
        if (!adventurer) return 'ADVENTURER_NOT_FOUND';
    }

    return assignAdventurers(missionId, adventurerIds);
}