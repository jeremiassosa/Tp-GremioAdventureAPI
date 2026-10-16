import { Request, Response } from 'express';
import { getInAllService, getAdventurerByIdService } from '../services/adventurer.services.ts';

export async function getInAll(req: Request, res: Response) {
    const result = await getInAllService();
    res.json({ data: result });
}

export async function getById(req: Request, res: Response) {
    const result = await getAdventurerByIdService(Number(req.params.id));
    if (result === "ADVENTURER_NOT_FOUND") return res.status(404).json({ error: "Adventurer not found" });
    res.json({ data: result });
}
