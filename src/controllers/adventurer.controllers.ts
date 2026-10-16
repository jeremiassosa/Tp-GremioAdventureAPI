import { Request, Response } from 'express';
import { getInAllService, getAdventurerByIdService, createAdventurerService } from '../services/adventurer.services.ts';

export async function getInAll(req: Request, res: Response) {
    const result = await getInAllService();
    res.json({ data: result });
}

export async function getById(req: Request, res: Response) {
    const result = await getAdventurerByIdService(Number(req.params.id));
    if (result === "ADVENTURER_NOT_FOUND") return res.status(404).json({ error: "Adventurer not found" });
    res.json({ data: result });
}

export async function create(req: Request, res: Response) {
    const result = await createAdventurerService(req.body);
    if (result === "USER_NOT_FOUND") return res.status(404).json({ error: "User not found" });
    if (result === "USER_ALREADY_HAS_ADVENTURER") return res.status(409).json({ error: "User already has an adventurer assigned" });
    res.status(201).json({ data: result });
}
