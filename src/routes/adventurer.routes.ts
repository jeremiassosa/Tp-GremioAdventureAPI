import { Router } from 'express';
import { getInAll, getById, create } from '../controllers/adventurer.controllers.ts';
import { authenticateToken } from '../middleware/auth.ts';
import { validate } from '../middleware/validate.ts';
import { createAdventurerSchema } from '../schemes/adventurer.schema.ts';

const router = Router();

router.get('/', authenticateToken, getInAll);
router.get('/:id', authenticateToken, getById);
router.post('/', authenticateToken, validate(createAdventurerSchema), create);

export default router;
