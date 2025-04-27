import bcrypt from 'bcryptjs';
import { generateToken, createJwtPayload } from '../utils/jwtUtils';
import User from '../models/user';
import { ApiError } from '../utils/apiError';  


// Kontrollera om användaren redan finns funktion
const checkIfUserExists = async (username: string) => {
  const user = await User.findOne({ username });
  if (!user) return null;  

  return user;  
};

// Login-funktion. Kontrollerar rätt namn/lösen.
//kryptera lösenord och skapa token. 
export const loginUser = async (username: string, password: string) => {
  const user = await checkIfUserExists(username);  
  if (!user) {
    throw new ApiError(400, 'Fel användarnamn eller lösenord');  
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, 'Fel användarnamn eller lösenord');  
  }

  const payload = createJwtPayload(user);
  const token = generateToken(payload);

  return {
    token,
    user: payload,
  };
};

// Register-funktion. Kryptera lösenord med Bcrypt. skapa token.
export const registerUser = async (username: string, password: string, role: string) => {
  const existingUser = await checkIfUserExists(username);
  if (existingUser) {
    throw new ApiError(400, 'Användarnamnet är upptaget');  
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, role });
  await newUser.save();

  const payload = createJwtPayload(newUser);
  const token = generateToken(payload);

  return { 
    token,
    user: payload
  };
};
    
