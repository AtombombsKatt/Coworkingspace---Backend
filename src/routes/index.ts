// src/routes/index.ts
import { Router } from 'express';
import userRoutes from './userRoutes';
import roomRoutes from './roomRoutes';
import bookingRoutes from './bookingRoutes'; // Importera bookingRoutes



const router = Router();

router.use('/users', userRoutes);
router.use('/rooms', roomRoutes);
router.use('/bookings', bookingRoutes);

export default router;
