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
exports.deleteBooking = exports.updateBooking = exports.getAllBookings = exports.getUserBookings = exports.createBooking = void 0;
const booking_1 = __importDefault(require("../models/booking"));
const room_1 = __importDefault(require("../models/room"));
const apiError_1 = require("../utils/apiError");
const server_1 = require("../server");
//skapa en bokning.
const createBooking = (userId, roomId, startTime, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield room_1.default.findById(roomId);
    if (!room) {
        throw new apiError_1.ApiError(404, 'Rummet finns inte');
    }
    // är rummet ledigt?
    const existingBooking = yield booking_1.default.findOne({
        roomId,
        $or: [
            { startTime: { $lt: endTime, $gte: startTime } },
            { endTime: { $gt: startTime, $lte: endTime } },
        ],
    });
    if (existingBooking) {
        throw new apiError_1.ApiError(400, 'Rummet är redan bokat på den här tiden');
    }
    const newBooking = new booking_1.default({
        userId, roomId, startTime, endTime,
    });
    yield newBooking.save();
    server_1.io.emit('newBooking', {
        message: 'En ny bokning har skapats!',
        booking: newBooking,
    });
    return newBooking;
});
exports.createBooking = createBooking;
//hämta bokning. Fyll med rumdetaljer
const getUserBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_1.default.find({ userId })
        .populate('roomId', 'name type capacity');
    return bookings;
});
exports.getUserBookings = getUserBookings;
//hämta alla, fyll med användarnamn och rumdetaljer
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_1.default.find()
        .populate('userId', 'name')
        .populate('roomId', 'name type capacity');
    return bookings;
});
exports.getAllBookings = getAllBookings;
//uppdatera bokning. Kolla om rätt user eller admim.
const updateBooking = (userId, userRole, bookingId, startTime, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_1.default.findById(bookingId);
    if (!booking) {
        throw new apiError_1.ApiError(404, 'Bokningen hittades inte');
    }
    if (booking.userId.toString() !== userId && userRole !== 'Admin') {
        throw new apiError_1.ApiError(403, 'Du har inte behörighet att uppdatera denna bokning');
    }
    booking.startTime = startTime;
    booking.endTime = endTime;
    yield booking.save();
    server_1.io.emit('bookingUpdated', {
        message: `Bokning för användaren "${userId}" har uppdaterats.`,
        booking,
    });
    return booking;
});
exports.updateBooking = updateBooking;
//ta bort bokning. Kolla om rätt user eller en admin.
const deleteBooking = (userId, userRole, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_1.default.findById(bookingId).populate('roomId', 'name');
    if (!booking) {
        throw new apiError_1.ApiError(404, 'Bokningen hittades inte');
    }
    if (booking.userId.toString() !== userId && userRole !== 'Admin') {
        throw new apiError_1.ApiError(403, 'Du har inte behörighet att ta bort denna bokning');
    }
    const roomName = booking.roomId.name || 'okänt rum';
    yield booking.deleteOne();
    server_1.io.emit('bookingDeleted', {
        message: `Användare "${userId}" tog bort en bokning för rum "${roomName}"`,
        bookingId,
    });
    return booking;
});
exports.deleteBooking = deleteBooking;
