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
exports.getUserBookingsController = exports.getAllBookingsController = exports.deleteBookingController = exports.updateBookingController = exports.getMyBookingsController = exports.createBookingController = void 0;
const bookingService_1 = require("../services/bookingService");
const apiError_1 = require("../utils/apiError");
// CONTROLLERS 
// Skickar vidare data till bookingService där logiken bor
// skapabokning
const createBookingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId, startTime, endTime } = req.body;
    if (!req.user) { // autentiserad + typgaranti, är det overkill? 
        throw new apiError_1.ApiError(401, 'anvndaren är inte giltig');
    }
    const userId = req.user.id;
    const newBooking = yield (0, bookingService_1.createBooking)(userId, roomId, startTime, endTime);
    res.status(201).json({ message: 'bokning skapad', booking: newBooking });
});
exports.createBookingController = createBookingController;
// Hämta mina (inloggade användarens) bokningar
const getMyBookingsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new apiError_1.ApiError(401, 'Inte autentiserad');
    }
    const userId = req.user.id;
    const bookings = yield (0, bookingService_1.getUserBookings)(userId);
    res.status(200).json({ bookings });
});
exports.getMyBookingsController = getMyBookingsController;
//uppdatera en bokning.
//Kontrollerar att start & endtime är i fyllt, annars error.
const updateBookingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = req.params.id;
    const { startTime, endTime } = req.body;
    if (!req.user) {
        throw new apiError_1.ApiError(401, 'Inte autentiserad');
    }
    const userId = req.user.id;
    const userRole = req.user.role;
    if (!startTime || !endTime) {
        throw new apiError_1.ApiError(400, 'Starttid och sluttid är obligatoriska');
    }
    const updatedBooking = yield (0, bookingService_1.updateBooking)(userId, userRole, bookingId, startTime, endTime);
    res.status(200).json({ message: 'Bokning uppdaterad!', booking: updatedBooking });
});
exports.updateBookingController = updateBookingController;
// ta bort en bokning. 
const deleteBookingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const bookingId = req.params.id;
    if (!req.user) {
        throw new apiError_1.ApiError(401, 'Inte autentiserad');
    }
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    const deletedBooking = yield (0, bookingService_1.deleteBooking)(userId, userRole, bookingId);
    res.status(200).json({ message: 'Bokning borttagen', booking: deletedBooking });
});
exports.deleteBookingController = deleteBookingController;
// hämta alla bokningar.
const getAllBookingsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield (0, bookingService_1.getAllBookings)();
    res.status(200).json({ bookings });
});
exports.getAllBookingsController = getAllBookingsController;
//hämta en specifik användare med :id
const getUserBookingsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const bookings = yield (0, bookingService_1.getUserBookings)(userId);
    res.status(200).json({ bookings });
});
exports.getUserBookingsController = getUserBookingsController;
