import { Router } from 'express';
import { create, getById,  remove, replace } from '../controllers/missions.controllers.ts';

const router = Router();

router.get('/:id', getById);
router.post('/', create);
router.put('/:id', replace);
router.delete('/:id', remove);

export default router;


