import { Router } from 'express';
import { create, getById, getInAll, remove, replace } from '../controllers/missions.controllers.ts';
import { authenticateToken, authorizeRole } from '../middleware/auth.ts';

const router = Router();

router.get('/', authenticateToken, getInAll);
router.get('/:id', authenticateToken, getById);
router.post('/', authenticateToken, authorizeRole('admin'), create);
router.patch('/:id',  authenticateToken, replace);
router.delete('/:id', authenticateToken, authorizeRole('admin'), remove);

export default router;


