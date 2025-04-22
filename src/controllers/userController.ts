import { Request, Response } from 'express';
import { getAllUsers, getUserById, deleteUser } from '../services/userService';
import { ApiError } from '../utils/apiError';
import { authenticatedRequest } from '../types/express';

//USER CONTROLLERS
//Fokus på http och att skicka data för logik i userService.

//hämta alla användare
export const getAllUsersController = async (_req: Request, res: Response) => { // "_"framför req så slutar den tjata :D
  const users = await getAllUsers();
  res.status(200).json({ users });
};

//hämta en användare med id. 
export const getUserController = async (req: Request, res: Response) => {
  const user = await getUserById(req.params.id);
  res.status(200).json({ user });
};

//Ta bort användare. Skicka med userId och rollen för den som ska ta bort.
export const deleteUserController = async (req: authenticatedRequest, res: Response) => {

  if(!req.user){
    throw new ApiError(401, 'inte autentiserad');
  }
  const userRole = req.user.role;
  const deleteId = req.params.id;

  await deleteUser(deleteId, userRole);
  res.status(200).json({ message: 'Användare borttagen' });
};








