"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authController_1 = require("../controllers/authController");
const asyncHandler_1 = require("../utils/asyncHandler");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const adminMiddleware_1 = require("../middlewares/adminMiddleware");
const router = (0, express_1.Router)();
router.post('/register', (0, asyncHandler_1.asyncHandler)(authController_1.registerUserController));
router.post('/login', (0, asyncHandler_1.asyncHandler)(authController_1.loginUserController));
//admin routes
router.get('/:id', authMiddleware_1.validateToken, adminMiddleware_1.requireAdmin, (0, asyncHandler_1.asyncHandler)(userController_1.getUserController));
router.get('/', authMiddleware_1.validateToken, adminMiddleware_1.requireAdmin, (userController_1.getAllUsersController));
router.delete('/:id', authMiddleware_1.validateToken, adminMiddleware_1.requireAdmin, (0, asyncHandler_1.asyncHandler)(userController_1.deleteUserController));
exports.default = router;
