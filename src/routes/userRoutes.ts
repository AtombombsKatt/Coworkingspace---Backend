
import { Router } from 'express';
import {  getAllUsersController, deleteUserController, getUserController } from '../controllers/userController';
import { loginUserController, registerUserController } from '../controllers/authController';
import { asyncHandler } from '../utils/asyncHandler'; 
import { validateToken } from '../middlewares/authMiddleware';
import { requireAdmin } from '../middlewares/adminMiddleware';
const router = Router();


router.post('/register', asyncHandler(registerUserController));
router.post('/login', asyncHandler(loginUserController));

//admin routes
router.get('/:id', validateToken, requireAdmin, asyncHandler(getUserController));
router.get('/', validateToken, requireAdmin,(getAllUsersController));
router.delete('/:id', validateToken, requireAdmin, asyncHandler(deleteUserController));


export default router;
