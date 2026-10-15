import type * as MissionTypes from "../types/missions.js";
import * as MissionsRepository from "../repositories/missions.repositories.js";
import { Missions as MissionModel, } from "../models/Index.ts";
import { getGremioByID } from "../repositories/gremio.repositories.ts";
import { Request } from 'express'



export async function getMissionByIdService(id: number):Promise<MissionTypes.Mission|"MISSION_NOT_FOUND" > {
    const mission = await MissionsRepository.getMissionByID(id);
    if (!mission) return 'MISSION_NOT_FOUND'
    return mission;
}

export async function createMissionService(missionData: MissionTypes.NewMission): Promise<MissionTypes.Mission | "GREMIO_NOT_FOUND"> {
    const gremio = await MissionsRepository.getMissionByID(missionData.gremio_id);
    if (!gremio) return "GREMIO_NOT_FOUND"

    const newMission =await MissionsRepository.insertMission(missionData);
    return newMission[0];
}


export async function replaceMissionService(missionData: MissionTypes.NewMission, id: number): Promise< | "GREMIO_NOT_FOUND" | "MISSION_NOT_FOUND" | MissionTypes.NewMission> {
    const gremio = await getGremioByID(missionData.gremio_id);
    if (!gremio) return 'GREMIO_NOT_FOUND'
    const mission = await MissionsRepository.getMissionByID(id);
    if (!mission) return 'MISSION_NOT_FOUND';

    const replacedMission = await MissionsRepository.putMission(missionData, id);
    return replacedMission[0];
}


export async function updateMissionService(missionData: { status: boolean; gremio_id?: number }, id: number): Promise<"GREMIO_NOT_FOUND" | "MISSION_NOT_FOUND" | MissionTypes.Mission> {    
    const mission = await MissionsRepository.getMissionByID(id);
    if (!mission) return 'MISSION_NOT_FOUND';

    if (missionData.gremio_id !== undefined) {
        const gremio = await getGremioByID(missionData.gremio_id);
        if (!gremio) return 'GREMIO_NOT_FOUND';
    }

    const updatedMission = await MissionsRepository.patchMission(missionData, id);
    return updatedMission[0];
}


export async function deleteMissionService(id:number):Promise<"MISSION_NOT_FOUND" | "DELETED"|"MISSION_HAS_ASIGNEDS" >{
    const mission = await MissionsRepository.getMissionByID(id);
    if (!mission) return 'MISSION_NOT_FOUND';
    const hasAsigneds = await MissionsRepository.missionHasAsigneds(id);
    if (hasAsigneds) return "MISSION_HAS_ASIGNEDS";
    await MissionsRepository.deleteMission(id);
    return "DELETED";
}

export async function listMissionsService(query: Request['query']): Promise<MissionTypes.Mission[]> {
    const status = query.status === undefined ? undefined : query.status === 'true';
    const level = query.level === undefined ? undefined : Number(query.level);

    const { rows } = await MissionsRepository.getMissions({ status, level });
    return rows;
}