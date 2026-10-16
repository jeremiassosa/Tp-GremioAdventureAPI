import { Request, Response } from 'express';
import {getInAllService,getMissionByIdService,createMissionService, replaceMissionService,deleteMissionService, updateMissionService} from '../services/missions.services.ts';


export async function getInAll(req: Request, res: Response) {
    const result = await getInAllService();
    res.json({data:result});
}

export async function getById(req: Request, res: Response) {
    const result = await getMissionByIdService(Number(req.params.id));
    if (result === "MISSION_NOT_FOUND") return res.status(404).json({ error: "Mission not found" });
    res.json({data:result});
}


export async function create(req: Request, res: Response) {
    const result = await createMissionService(req.body);
    if (result === "GREMIO_NOT_FOUND") return res.status(404).json({ error: "Gremio not found" });
    res.status(201).json({data:result});
}

export async function replace(req: Request, res: Response) {
    const result = await replaceMissionService(req.body, Number(req.params.id));
    if (result === "MISSION_NOT_FOUND") return res.status(404).json({ error: "Mission not found" });
    if (result === "GREMIO_NOT_FOUND") return res.status(404).json({ error: "Gremio not found" });
    res.status(200).json({data:result});
}

export async function update(req: Request, res: Response) {
    const result = await updateMissionService({ status: true }, Number(req.params.id));
    if (result === "MISSION_NOT_FOUND") return res.status(404).json({ error: "Mission not found" });
    res.status(200).json({data:result});
}

export async function remove(req: Request, res: Response) {
    const result = await deleteMissionService(Number(req.params.id));
    if (result === "MISSION_NOT_FOUND") return res.status(404).json({ error: "Mission not found" });
    if (result === "MISSION_HAS_ASIGNEDS") return res.status(409).json({ error: "Mission has adventurers assigned" });
    res.status(204).send();
}