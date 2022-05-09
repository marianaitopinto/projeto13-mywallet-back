import {Router} from 'express';
import { getAllMovements, createMovement } from '../controllers/movementsController.js';

const movementRouter = Router();

movementRouter.get('/resume', getAllMovements);
movementRouter.post('/create', createMovement); //colocar schema aqui

export default movementRouter;