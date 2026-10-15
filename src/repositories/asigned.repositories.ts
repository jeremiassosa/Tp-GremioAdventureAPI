import { sequelize } from '../db/connection.js';
import { Asigned } from '../models/Asigned.js';
import { Adventurer } from '../models/Adventurers.js';
import { Missions } from '../models/Missions.js';



export async function assignAdventurers(missionId: number, adventurerIds: number[]) {
    await Asigned.bulkCreate(
        adventurerIds.map((id) => ({ missions_id: missionId, adventurer_id: id })),
        { ignoreDuplicates: true }
    );
    await Missions.update({ status: false }, { where: { id: missionId } });

    const rows = await Asigned.findAll({ where: { missions_id: missionId } });
    return rows.map((row) => row.toJSON());
}