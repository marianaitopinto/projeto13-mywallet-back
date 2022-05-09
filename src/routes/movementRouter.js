import {Router} from 'express';
import { getAllMovements, createMovement, deleteMovement } from '../controllers/movementsController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const movementRouter = Router();

movementRouter.get('/transactions', authMiddleware, getAllMovements);
movementRouter.post('/transactions', authMiddleware, createMovement); //colocar schema aqui
movementRouter.delete('/transactions/:id', authMiddleware, deleteMovement);

export default movementRouter;