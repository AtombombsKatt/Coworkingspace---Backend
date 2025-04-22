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
exports.deleteUser = exports.getUserById = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const apiError_1 = require("../utils/apiError");
// Hämta alla användare
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.find();
});
exports.getAllUsers = getAllUsers;
// Hämta en användare via ID
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(id);
    if (!user) {
        throw new apiError_1.ApiError(404, 'Användaren hittades inte');
    }
    return user;
});
exports.getUserById = getUserById;
// Ta bort användare via ID
const deleteUser = (id, userRole) => __awaiter(void 0, void 0, void 0, function* () {
    if (userRole !== 'Admin') {
        throw new apiError_1.ApiError(403, 'du har inte behörighet för att ta bort användare');
    }
    const deleted = yield user_1.default.findByIdAndDelete(id);
    if (!deleted) {
        throw new apiError_1.ApiError(404, 'Användaren hittades inte');
    }
});
exports.deleteUser = deleteUser;
