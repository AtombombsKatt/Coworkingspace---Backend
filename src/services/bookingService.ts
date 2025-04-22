import Booking from '../models/booking';
import Room from '../models/room';
import { ApiError } from '../utils/apiError';
import { io } from '../server';


//skapa en bokning.
export const createBooking = async (userId: string, roomId: string, startTime: Date, endTime: Date) => {
  const room = await Room.findById(roomId);
  if (!room) {
    throw new ApiError(404, 'Rummet finns inte');
  }

  // är rummet ledigt?
  const existingBooking = await Booking.findOne({
    roomId,
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } },
    ],
  });

  if (existingBooking) {
    throw new ApiError(400, 'Rummet är redan bokat på den här tiden');
  }

  const newBooking = new Booking({
    userId, roomId, startTime, endTime,
  });

  await newBooking.save();
 
  io.emit('newBooking', {
    message: 'En ny bokning har skapats!',
    booking: newBooking,
  });
  return newBooking;
};
  

//hämta bokning. Fyll med rumdetaljer
export const getUserBookings = async (userId: string) => {
  const bookings = await Booking.find({ userId })
    .populate('roomId', 'name type capacity');
  return bookings;
};

//hämta alla, fyll med användarnamn och rumdetaljer
export const getAllBookings = async () => {
  const bookings = await Booking.find()
  .populate('userId', 'name')
  .populate('roomId', 'name type capacity');

  return bookings;
};

//uppdatera bokning. Kolla om rätt user eller admim.
export const updateBooking = async (userId: string, userRole: string, bookingId: string, startTime: Date, endTime: Date) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new ApiError(404, 'Bokningen hittades inte');
  }

  if (booking.userId.toString() !== userId && userRole !== 'Admin') {
    throw new ApiError(403, 'Du har inte behörighet att uppdatera denna bokning');
  }

  booking.startTime = startTime;
  booking.endTime = endTime;
  await booking.save();
  io.emit('bookingUpdated', {
    message: `Bokning för användaren "${userId}" har uppdaterats.`,
    booking,
  });
  return booking;
};

//ta bort bokning. Kolla om rätt user eller en admin.
export const deleteBooking = async (userId: string, userRole: string, bookingId: string) => {
  const booking = await Booking.findById(bookingId).populate('roomId', 'name');

  if (!booking) {
    throw new ApiError(404, 'Bokningen hittades inte');
  }

  if (booking.userId.toString() !== userId && userRole !== 'Admin') {
    throw new ApiError(403, 'Du har inte behörighet att ta bort denna bokning');
  }

  const roomName = (booking.roomId as any).name || 'okänt rum';

  await booking.deleteOne();

  io.emit('bookingDeleted', {
    message: `Användare "${userId}" tog bort en bokning för rum "${roomName}"`,
    bookingId,
  });

  return booking; 
};
 














