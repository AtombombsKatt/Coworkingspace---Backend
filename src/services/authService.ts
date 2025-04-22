import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwtUtils';
import User, { IUser } from '../models/user';
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

  const token = generateToken({
    id: user._id.toString(),
    username: user.username,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id.toString(),
      username: user.username,
      role: user.role,
    },
  };
};

// Register-funktion. Kryptera lösenord med Bcrypt. skapa token.
export const registerUser = async (username: string, password: string, role: string) => {
  const existingUser = await checkIfUserExists(username);
  if (existingUser) {
    throw new ApiError(400, 'Användarnamnet är upptaget');  
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, role }) as IUser;
  await newUser.save();

  const token = generateToken({
    id: newUser._id.toString(),
    username: newUser.username,
    role: newUser.role,
  });

  return { token, user: newUser };
};
