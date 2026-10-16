import { Router } from 'express';
import { getInAll } from '../controllers/adventurer.controllers.ts';
import { authenticateToken } from '../middleware/auth.ts';

const router = Router();

router.get('/', authenticateToken, getInAll);

export default router;
