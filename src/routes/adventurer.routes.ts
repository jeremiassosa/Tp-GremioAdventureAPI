import { Router } from 'express';
import { getInAll, getById } from '../controllers/adventurer.controllers.ts';
import { authenticateToken } from '../middleware/auth.ts';

const router = Router();

router.get('/', authenticateToken, getInAll);
router.get('/:id', authenticateToken, getById);

export default router;
