"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const logDir = 'logs';
// kolla om logg mapp fins annars skapa en.
const fs = require('fs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const { combine, timestamp, printf } = winston_1.default.format;
const logFormat = printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
});
const logger = winston_1.default.createLogger({
    level: 'info', // (info, warn, error)
    format: combine(timestamp(), logFormat),
    transports: [
        new winston_1.default.transports.File({ filename: path_1.default.join(logDir, 'error.log'), level: 'error' }),
        new winston_1.default.transports.File({ filename: path_1.default.join(logDir, 'combined.log') }),
        new winston_1.default.transports.Console({ format: winston_1.default.format.simple() })
    ]
});
exports.default = logger;
