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
exports.updateRoom = exports.deleteRoom = exports.getAllRooms = exports.createRoom = void 0;
const room_1 = __importDefault(require("../models/room"));
const booking_1 = __importDefault(require("../models/booking"));
const cacheService_1 = require("./cacheService");
const apiError_1 = require("../utils/apiError");
const cacheKeys_1 = require("../utils/cacheKeys");
//Services för logik som skickas tillbaka till RoomControllers. Sparar & rensa cache med en nyckel.
//Skapa ett rum & rensa cachen
const createRoom = (name, capacity, type) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield room_1.default.create({ name, capacity, type });
    yield (0, cacheService_1.deleteFromCache)(cacheKeys_1.ROOMS_CACHE_KEY);
    return room;
});
exports.createRoom = createRoom;
//hämta alla rum & spara cachen
const getAllRooms = (originalUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield room_1.default.find();
    yield (0, cacheService_1.saveToCache)(cacheKeys_1.ROOMS_CACHE_KEY, rooms);
    return rooms;
});
exports.getAllRooms = getAllRooms;
//ta bort ett rum, ta också bort bokningar på rummet. Rensa cachen.
const deleteRoom = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield room_1.default.findById(roomId);
    if (!room) {
        throw new apiError_1.ApiError(404, 'Rummet hittades inte');
    }
    try {
        yield room_1.default.findByIdAndDelete(roomId);
        yield (0, cacheService_1.deleteFromCache)(cacheKeys_1.ROOMS_CACHE_KEY);
        const { deletedCount } = yield booking_1.default.deleteMany({ roomId: room._id }); //ta bort bokningen sen som sql cascade saken
        console.log(`${deletedCount} bokningar kopplade till rummet togs bort.`);
    }
    catch (_a) {
        throw new apiError_1.ApiError(500, 'något gick fel med att ta bort bokning relaterad till rummet');
    }
});
exports.deleteRoom = deleteRoom;
//uppdatera rum. Rensa cache. 
const updateRoom = (roomId, name, capacity, type) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield room_1.default.findById(roomId);
    if (!room) {
        throw new apiError_1.ApiError(404, 'Rummet hittades inte');
    }
    //bara fält som har ett värde uppdateras
    if (name)
        room.name = name;
    if (capacity)
        room.capacity = capacity;
    if (type)
        room.type = type;
    yield room.save();
    yield (0, cacheService_1.deleteFromCache)(cacheKeys_1.ROOMS_CACHE_KEY);
    return room;
});
exports.updateRoom = updateRoom;
