import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/authService'; 



//AUTH CONTROLLERS

//Logga in som användare
export const loginUserController = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;
  const result = await loginUser(username, password); 

  return res.status(200).json({ message: 'Inloggning lyckades', token: result.token, user: result.user });
};
  
  

//registrera en användare
export const registerUserController = async (req: Request, res: Response): Promise<Response> => {
  const { username, password, role } = req.body;
  const { token, user } = await registerUser(username, password, role); 

  return res.status(201).json({ message: 'Användare registrerad', token, user });
};
 
 