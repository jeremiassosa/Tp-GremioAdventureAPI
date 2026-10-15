import { Router } from 'express';
import { assign } from '../controllers/asigned.controllers.js';


const router = Router();

router.post('/', assign);


export default router;