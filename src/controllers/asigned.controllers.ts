import { Request, Response } from 'express';
import { assignMissionService } from '../services/asigned.services.ts';

export async function assign(req: Request, res: Response) {
    const result = await assignMissionService(Number(req.body.missionId), req.body.adventurerIds);
    if (result === "MISSION_NOT_FOUND") return res.status(404).json({ error: "Mission not found" });
    if (result === "ADVENTURER_NOT_FOUND") return res.status(404).json({ error: "Adventurer not found" });
    if (result === "MISSION_NOT_AVAILABLE") return res.status(409).json({ error: "Mission is not available" });
    res.status(201).json({data:result});
}