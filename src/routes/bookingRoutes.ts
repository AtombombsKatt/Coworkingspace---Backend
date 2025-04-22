import { Router } from 'express';
import { createBookingController, deleteBookingController, getAllBookingsController, getUserBookingsController } from '../controllers/bookingController'; // Skapa controller senare
import { getMyBookingsController } from '../controllers/bookingController';
import { validateToken } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';
import { updateBookingController } from '../controllers/bookingController';
import { requireAdmin } from '../middlewares/adminMiddleware';


const router = Router();

//gets (min) och (all, admin)
router.get('/my', validateToken, asyncHandler(getMyBookingsController));
router.get('/user/:userId', validateToken, requireAdmin,(getUserBookingsController));
router.get('/', validateToken, requireAdmin, asyncHandler (getAllBookingsController));

//boka rum
router.post('/book', validateToken, asyncHandler(createBookingController));

//uppdatera bokning
router.put('/:id', validateToken, asyncHandler(updateBookingController));

//hejdå bokning
router.delete('/:id', validateToken, asyncHandler(deleteBookingController) );

export default router;
