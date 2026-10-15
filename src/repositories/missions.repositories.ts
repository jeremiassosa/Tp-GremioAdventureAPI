import type * as MissionTypes from "../types/missions.js";
import { Asigned, Missions as MissionModel, } from "../models/Index.ts";
import { MissionFilters } from "../types/missions.js";

export async function getMissionByID(id: number): Promise<MissionTypes.Mission | null> {
    const row = await MissionModel.findByPk(id);
    return row ? row.toJSON() : null;
}


export async function insertMission(missionData: MissionTypes.NewMission): Promise<MissionTypes.Mission[]> {
    const row = await MissionModel.create({
    title: missionData.title,
    objetive: missionData.objetive,
    level: missionData.level,
    gremio_id: missionData.gremio_id,
    });
    return [row.toJSON()];
}


export async function patchMission(missionData: { status: boolean; gremio_id?: number }, missionId: number) {
    const updates: Record<string, unknown> = { status: missionData.status };
    if (missionData.gremio_id !== undefined) updates.gremio_id = missionData.gremio_id;

    await MissionModel.update(updates, {
        where:
        {
            id: missionId
        }
    });

    const row = await MissionModel.findByPk(missionId);
    return row ? [row.toJSON()] : [];
}
export async function putMission(missionData: MissionTypes.NewMission, missionId: number): Promise<MissionTypes.Mission[]> {
    const [affectedCount] = await MissionModel.update(
    {
        title: missionData.title,
        objetive: missionData.objetive,
        level: missionData.level,
        gremio_id: missionData.gremio_id
    },
    { where: { id: missionId } }
    );

    const row = await MissionModel.findByPk(missionId);
    return row ? [row.toJSON()] : [];
}

export async function deleteMission(missionId:number):Promise<boolean> {
    const deletedMission = await MissionModel.destroy({
            where:{
                id:missionId
            }
        })
    return deletedMission > 0
}

export async function missionHasAsigneds(missionId: number): Promise<boolean> {
    const count = await Asigned.count({ where: { missions_id: missionId } });
    return count > 0;
}

export async function getMissions(filters: MissionFilters) {
    const where: Record<string, unknown> = {};
    if (filters.status !== undefined) where.status = filters.status;
    if (filters.level !== undefined) where.level = filters.level;

    return MissionModel.findAndCountAll({
        where,
        order: [['id', 'ASC']],
    });
}