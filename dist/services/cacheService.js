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
exports.deleteFromCache = exports.saveToCache = exports.getFromCache = void 0;
const redisClient_1 = __importDefault(require("../services/redisClient"));
//  hämta data från cache
const getFromCache = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedData = yield redisClient_1.default.get(key);
        return cachedData ? JSON.parse(cachedData) : null;
    }
    catch (error) {
        console.error('Fel vid hämtning från cache', error);
        return null;
    }
});
exports.getFromCache = getFromCache;
//  spara data till cache
const saveToCache = (key_1, data_1, ...args_1) => __awaiter(void 0, [key_1, data_1, ...args_1], void 0, function* (key, data, expiration = 3600) {
    try {
        yield redisClient_1.default.setEx(key, expiration, JSON.stringify(data));
    }
    catch (error) {
        console.error('Fel vid lagring i cache', error);
    }
});
exports.saveToCache = saveToCache;
//  ta bort data från cache
const deleteFromCache = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient_1.default.del(key);
    }
    catch (error) {
        console.error('Fel vid borttagning från cache', error);
    }
});
exports.deleteFromCache = deleteFromCache;
