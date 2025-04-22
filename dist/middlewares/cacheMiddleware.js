"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddleware = void 0;
const redisClient_1 = __importDefault(require("../services/redisClient")); // Importera din Redis-klient
// Cache middleware för GET , consols för o se om cache hittas
const cacheMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `cache:${req.originalUrl}`; // Skapar en nyckel baserat på URL
    try {
        const cachedData = yield redisClient_1.default.get(key);
        if (cachedData) {
            console.log(`🔁 Cacheträff för ${req.originalUrl}`);
            res.json(JSON.parse(cachedData));
            return;
        }
        console.log(`🚫 Ingen cacheträff för ${req.originalUrl}`);
        next();
    }
    catch (error) {
        console.error('Redis cache error:', error);
        next();
    }
});
exports.cacheMiddleware = cacheMiddleware;
