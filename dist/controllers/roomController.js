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
exports.updateRoomController = exports.deleteRoomController = exports.getAllRoomsController = exports.createRoomController = void 0;
const roomService_1 = require("../services/roomService");
const apiError_1 = require("../utils/apiError");
//ROOM CONTROLLERS
//skickar vidare data till roomService.
//skapa ett rum
const createRoomController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, capacity, type } = req.body;
    //måste fylla schemat
    if (!name || !capacity || !type) {
        throw new apiError_1.ApiError(400, 'alla fält krävs');
    }
    const newRoom = yield (0, roomService_1.createRoom)(name, capacity, type);
    res.status(201).json({ message: 'Rum skapat!', room: newRoom });
});
exports.createRoomController = createRoomController;
//hämta alla rum
const getAllRoomsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield (0, roomService_1.getAllRooms)(req.originalUrl);
    res.status(200).json({ rooms });
});
exports.getAllRoomsController = getAllRoomsController;
//Ta bort ett rum
const deleteRoomController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.id;
    yield (0, roomService_1.deleteRoom)(roomId);
    res.status(200).json({ message: 'Rum borttaget' });
});
exports.deleteRoomController = deleteRoomController;
//uppdatera ett rum
const updateRoomController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.id;
    const { name, capacity, type } = req.body;
    const room = yield (0, roomService_1.updateRoom)(roomId, name, capacity, type);
    res.status(200).json({ message: 'Rummet uppdaterat!', room });
});
exports.updateRoomController = updateRoomController;
