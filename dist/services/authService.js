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
exports.registerUser = exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtUtils_1 = require("../utils/jwtUtils");
const user_1 = __importDefault(require("../models/user"));
const apiError_1 = require("../utils/apiError");
// Kontrollera om användaren redan finns funktion
const checkIfUserExists = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ username });
    if (!user)
        return null;
    return user;
});
// Login-funktion. Kontrollerar rätt namn/lösen.
//kryptera lösenord och skapa token. 
const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield checkIfUserExists(username);
    if (!user) {
        throw new apiError_1.ApiError(400, 'Fel användarnamn eller lösenord');
    }
    const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new apiError_1.ApiError(400, 'Fel användarnamn eller lösenord');
    }
    const token = (0, jwtUtils_1.generateToken)({
        id: user._id.toString(),
        username: user.username,
        role: user.role,
    });
    return {
        token,
        user: {
            id: user._id.toString(),
            username: user.username,
            role: user.role,
        },
    };
});
exports.loginUser = loginUser;
// Register-funktion. Kryptera lösenord med Bcrypt. skapa token.
const registerUser = (username, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield checkIfUserExists(username);
    if (existingUser) {
        throw new apiError_1.ApiError(400, 'Användarnamnet är upptaget');
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = new user_1.default({ username, password: hashedPassword, role });
    yield newUser.save();
    const token = (0, jwtUtils_1.generateToken)({
        id: newUser._id.toString(),
        username: newUser.username,
        role: newUser.role,
    });
    return { token, user: newUser };
});
exports.registerUser = registerUser;
