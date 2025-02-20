import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { listRouter } from './list-routes.js';


const router = Router();

router.use('/users', userRouter);
router.use('/list', listRouter);


export default router;
