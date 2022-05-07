import { Router } from 'express';
import authRouter from './authRouter.js';

const routers = Router();

routers.use(authRouter);

export default routers;