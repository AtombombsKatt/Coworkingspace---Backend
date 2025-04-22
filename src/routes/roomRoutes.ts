import { Router } from 'express';
import { createRoomController, deleteRoomController, updateRoomController} from '../controllers/roomController';
import { validateToken } from '../middlewares/authMiddleware';
import { requireAdmin } from '../middlewares/adminMiddleware';
import { cacheMiddleware } from '../middlewares/cacheMiddleware';
import { asyncHandler } from '../utils/asyncHandler';
import { getAllRoomsController } from '../controllers/roomController';


const router = Router();

router.get('/',validateToken, cacheMiddleware, (getAllRoomsController));


router.post( '/create', validateToken, requireAdmin, asyncHandler(createRoomController));
router.put('/:id', validateToken, requireAdmin, asyncHandler(updateRoomController));
router.delete('/:id', validateToken, requireAdmin, asyncHandler(deleteRoomController));

export default router;




