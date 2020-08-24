import { Router } from 'express';
import UserRouter from './Users';
import MovementRouter from './Movements';
import HackerRouter from './Hacker';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/movements', MovementRouter);
router.use('/hacker', HackerRouter);

// Export the base-router
export default router;
