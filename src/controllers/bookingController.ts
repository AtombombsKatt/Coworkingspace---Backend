import { Request, Response } from 'express';
import { authenticatedRequest } from '../types/express';
import { createBooking, getUserBookings, updateBooking, deleteBooking, getAllBookings} from '../services/bookingService';
import { ApiError } from '../utils/apiError';

// CONTROLLERS 
// Skickar vidare data till bookingService där logiken bor

// skapabokning
export const createBookingController = async (req: authenticatedRequest, res: Response) => {
  const {roomId, startTime, endTime} = req.body;
  
  
  if (!req.user) {  // autentiserad + typgaranti, är det overkill? 
    throw new ApiError(401, 'anvndaren är inte giltig');
  }
  
  const userId = req.user.id; 

  const newBooking = await createBooking(userId, roomId, startTime, endTime);
  res.status(201).json({message:'bokning skapad', booking: newBooking });
};
   
// Hämta mina (inloggade användarens) bokningar
export const getMyBookingsController = async (req: authenticatedRequest, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, 'Inte autentiserad');
  }
  const userId = req.user.id;
  const bookings = await getUserBookings(userId);

  res.status(200).json({ bookings });
};


//uppdatera en bokning.
//Kontrollerar att start & endtime är i fyllt, annars error.
export const updateBookingController = async (req: authenticatedRequest, res: Response) => {
  const bookingId = req.params.id;
  const { startTime, endTime } = req.body;

  if (!req.user) {
    throw new ApiError(401, 'Inte autentiserad');
  }

  const userId = req.user.id;
  const userRole = req.user.role; 

  if (!startTime || !endTime) {
    throw new ApiError(400, 'Starttid och sluttid är obligatoriska');
  }
  
  const updatedBooking = await updateBooking(userId,userRole, bookingId, startTime, endTime);
  res.status(200).json({ message: 'Bokning uppdaterad!', booking: updatedBooking });
};
  
// ta bort en bokning. 
export const deleteBookingController = async (req: authenticatedRequest, res: Response) => {
  const bookingId = req.params.id;
  
  if (!req.user) { 
    throw new ApiError(401, 'Inte autentiserad');
  }

  const userId = req.user?.id;
  const userRole = req.user?.role;

  const deletedBooking = await deleteBooking(userId, userRole, bookingId);
  res.status(200).json({ message: 'Bokning borttagen', booking: deletedBooking });
};
  
// hämta alla bokningar.
export const getAllBookingsController = async (_req: Request, res: Response) => { 
  const bookings = await getAllBookings();
  res.status(200).json({ bookings });
};

//hämta en specifik användare med :id
export const getUserBookingsController = async (req: authenticatedRequest, res: Response) => {
  const userId = req.params.userId;
  const bookings = await getUserBookings(userId);
  res.status(200).json({ bookings });
};
