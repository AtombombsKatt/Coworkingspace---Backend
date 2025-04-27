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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserController = exports.loginUserController = void 0;
const authService_1 = require("../services/authService");
//AUTH CONTROLLERS
//Logga in som användare
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const result = yield (0, authService_1.loginUser)(username, password);
    return res.status(200).json({ message: 'Inloggning lyckades', token: result.token, user: result.user });
});
exports.loginUserController = loginUserController;
//registrera en användare
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role } = req.body;
    const { token, user } = yield (0, authService_1.registerUser)(username, password, role);
    return res.status(201).json({ message: 'Användare registrerad', token, user });
});
exports.registerUserController = registerUserController;
