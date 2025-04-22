import User from '../models/user';
import { ApiError } from '../utils/apiError';


// Hämta alla användare
export const getAllUsers = async () => {
  return await User.find();
};

// Hämta en användare via ID
export const getUserById= async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, 'Användaren hittades inte');
  }
  return user;
};

// Ta bort användare via ID
export const deleteUser = async (id: string, userRole: string) => {
  if(userRole !== 'Admin'){
    throw new ApiError(403, 'du har inte behörighet för att ta bort användare');
  }
  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) {
    throw new ApiError(404, 'Användaren hittades inte');
  }
};