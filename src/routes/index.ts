import { Router } from 'express';
import UserRouter from './Users';
import MovementRouter from './Movements';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/movements', MovementRouter);

// Export the base-router
export default router;
