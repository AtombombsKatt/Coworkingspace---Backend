import { Request, Response } from 'express';
import { createRoom, getAllRooms, deleteRoom, updateRoom } from '../services/roomService';
import { ApiError } from '../utils/apiError';


//ROOM CONTROLLERS
//skickar vidare data till roomService.

//skapa ett rum
export const createRoomController = async (req: Request, res: Response) => {
  const { name, capacity, type } = req.body;
  //måste fylla schemat
  if (!name || !capacity || !type) {
    throw new ApiError(400, 'alla fält krävs');
  }

  const newRoom = await createRoom(name, capacity, type);
  res.status(201).json({ message: 'Rum skapat!', room: newRoom });
  
};
 
//hämta alla rum
export const getAllRoomsController = async (req: Request, res: Response) => {
  const rooms = await getAllRooms(req.originalUrl); 
  res.status(200).json({ rooms });
};
   
//Ta bort ett rum
export const deleteRoomController = async (req: Request, res: Response) => {
  const roomId = req.params.id;
  await deleteRoom(roomId);
  res.status(200).json({ message: 'Rum borttaget' });
};

//uppdatera ett rum
export const updateRoomController = async (req: Request, res: Response) => {
  const roomId = req.params.id;
  const { name, capacity, type } = req.body;

  const room = await updateRoom(roomId, name, capacity, type);
  res.status(200).json({ message: 'Rummet uppdaterat!', room });
};

 
 



  
    

 
    
   

      


  

