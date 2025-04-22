"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const roomRoutes_1 = __importDefault(require("./roomRoutes"));
const bookingRoutes_1 = __importDefault(require("./bookingRoutes")); // Importera bookingRoutes
const router = (0, express_1.Router)();
router.use('/users', userRoutes_1.default);
router.use('/rooms', roomRoutes_1.default);
router.use('/bookings', bookingRoutes_1.default);
exports.default = router;
