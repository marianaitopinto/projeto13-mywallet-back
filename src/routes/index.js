import { Router } from 'express';
import authRouter from './authRouter.js';
import movementRouter from './movementRouter.js';

const routers = Router();

routers.use(authRouter);
routers.use(movementRouter);

export default routers;