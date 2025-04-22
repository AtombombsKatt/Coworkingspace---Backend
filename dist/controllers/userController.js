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
exports.deleteUserController = exports.getUserController = exports.getAllUsersController = void 0;
const userService_1 = require("../services/userService");
const apiError_1 = require("../utils/apiError");
//USER CONTROLLERS
//Fokus på http och att skicka data för logik i userService.
//hämta alla användare
const getAllUsersController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, userService_1.getAllUsers)();
    res.status(200).json({ users });
});
exports.getAllUsersController = getAllUsersController;
//hämta en användare med id. 
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userService_1.getUserById)(req.params.id);
    res.status(200).json({ user });
});
exports.getUserController = getUserController;
//Ta bort användare. Skicka med userId och rollen för den som ska ta bort.
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new apiError_1.ApiError(401, 'inte autentiserad');
    }
    const userRole = req.user.role;
    const deleteId = req.params.id;
    yield (0, userService_1.deleteUser)(deleteId, userRole);
    res.status(200).json({ message: 'Användare borttagen' });
});
exports.deleteUserController = deleteUserController;
