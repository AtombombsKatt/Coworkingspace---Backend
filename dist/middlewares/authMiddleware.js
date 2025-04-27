"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiError_1 = require("../utils/apiError");
const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretmegakey';
const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('bearer ')) { //prefix grejjen för undefined
        throw new apiError_1.ApiError(401, 'Token saknas eller är felaktigt formaterad');
    }
    const token = authHeader.split(' ')[1];
    // const token = authHeader && authHeader.split(' ')[1]; 
    // console.log("Authorization header:", authHeader);
    // console.log("Token:", token);
    if (!token) {
        throw new apiError_1.ApiError(401, 'Stopp i lagens namn! ingen token skickades 👮');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        throw new apiError_1.ApiError(401, 'Ogiltig token');
    }
};
exports.validateToken = validateToken;
