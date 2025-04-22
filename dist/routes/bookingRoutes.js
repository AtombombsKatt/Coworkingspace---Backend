"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingController_1 = require("../controllers/bookingController"); // Skapa controller senare
const bookingController_2 = require("../controllers/bookingController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const asyncHandler_1 = require("../utils/asyncHandler");
const bookingController_3 = require("../controllers/bookingController");
const adminMiddleware_1 = require("../middlewares/adminMiddleware");
const router = (0, express_1.Router)();
//gets (min) och (all, admin)
router.get('/my', authMiddleware_1.validateToken, (0, asyncHandler_1.asyncHandler)(bookingController_2.getMyBookingsController));
router.get('/user/:userId', authMiddleware_1.validateToken, adminMiddleware_1.requireAdmin, (bookingController_1.getUserBookingsController));
router.get('/', authMiddleware_1.validateToken, adminMiddleware_1.requireAdmin, (0, asyncHandler_1.asyncHandler)(bookingController_1.getAllBookingsController));
//boka rum
router.post('/book', authMiddleware_1.validateToken, (0, asyncHandler_1.asyncHandler)(bookingController_1.createBookingController));
//uppdatera bokning
router.put('/:id', authMiddleware_1.validateToken, (0, asyncHandler_1.asyncHandler)(bookingController_3.updateBookingController));
//hejdå bokning
router.delete('/:id', authMiddleware_1.validateToken, (0, asyncHandler_1.asyncHandler)(bookingController_1.deleteBookingController));
exports.default = router;
