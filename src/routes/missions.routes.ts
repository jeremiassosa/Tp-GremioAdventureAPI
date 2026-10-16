import { Router } from 'express';
import { create, getById, getInAll, remove, replace, update } from '../controllers/missions.controllers.ts';
import { authenticateToken, authorizeRole } from '../middleware/auth.ts';
import { validate } from '../middleware/validate.ts';
import { createMissionSchema } from '../schemes/mision.schema.ts';

const router = Router();

router.get('/', authenticateToken, getInAll);
router.get('/:id', authenticateToken, getById);
router.post('/', authenticateToken, authorizeRole('admin'), validate(createMissionSchema), create);
router.put('/:id',  authenticateToken, authorizeRole('admin'), validate(createMissionSchema), replace);
router.patch('/:id',  authenticateToken, update);
router.delete('/:id', authenticateToken, authorizeRole('admin'), remove);

export default router;