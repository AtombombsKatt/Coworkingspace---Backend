import Room from '../models/room';
import Booking from '../models/booking';
import { deleteFromCache, saveToCache } from './cacheService';
import { ApiError } from '../utils/apiError';
import { ROOMS_CACHE_KEY } from '../utils/cacheKeys';

//Services för logik som skickas tillbaka till RoomControllers. Sparar & rensa cache med en nyckel.
//Skapa ett rum & rensa cachen
export const createRoom = async (name: string, capacity: number, type: string) => {
  const room = await Room.create({ name, capacity, type });
  await deleteFromCache(ROOMS_CACHE_KEY);
  return room;
};

//hämta alla rum & spara cachen
export const getAllRooms = async (originalUrl: string) => {
  const rooms = await Room.find();
  await saveToCache(ROOMS_CACHE_KEY, rooms);
  return rooms;
};

//ta bort ett rum, ta också bort bokningar på rummet. Rensa cachen.
export const deleteRoom = async (roomId: string) => {
  const room = await Room.findById(roomId);
  if (!room) {
    throw new ApiError(404, 'Rummet hittades inte');
  }

  try{
    await Room.findByIdAndDelete(roomId);
    await deleteFromCache(ROOMS_CACHE_KEY);

    const { deletedCount } = await Booking.deleteMany({ roomId: room._id }); //ta bort bokningen sen som sql cascade saken
    console.log(`${deletedCount} bokningar kopplade till rummet togs bort.`);
  }catch{
    throw new ApiError(500, 'något gick fel med att ta bort bokning relaterad till rummet');
  }
};
    
//uppdatera rum. Rensa cache. 
export const updateRoom = async (roomId: string, name: string, capacity: number, type: string) => {
  const room = await Room.findById(roomId);
  if (!room) {
    throw new ApiError(404, 'Rummet hittades inte');
  }
  //bara fält som har ett värde uppdateras
  if (name) room.name = name;
  if (capacity) room.capacity = capacity;
  if (type) room.type = type;

  await room.save();
  await deleteFromCache(ROOMS_CACHE_KEY);

  return room;
};



