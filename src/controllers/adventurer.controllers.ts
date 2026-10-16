import { Request, Response } from 'express';
import { getInAllService } from '../services/adventurer.services.ts';

export async function getInAll(req: Request, res: Response) {
    const result = await getInAllService();
    res.json({ data: result });
}
