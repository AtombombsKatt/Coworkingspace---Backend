"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const winstonLogger_1 = __importDefault(require("../utils/winstonLogger"));
//error middleware för att fånga generella fel och logga samt ett stacktrace
const errorMiddleware = (err, req, res, next) => {
    winstonLogger_1.default.error(`Fel vid ${req.method} ${req.originalUrl}: ${err.message}`);
    winstonLogger_1.default.error(`Stacktrace: ${err.stack}`);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Något gick fel på servern';
    res.status(statusCode).json({ message });
};
exports.errorMiddleware = errorMiddleware;
