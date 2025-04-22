
import mongoose, { Schema, Document, Types } from 'mongoose';


const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['User', 'Admin'], default: 'User' }, 
  },
  { timestamps: true } 
);


export interface IUser extends Document {
  username: string;
  password: string;
  role: 'User' | 'Admin';
  _id: Types.ObjectId;
}


const User = mongoose.model<IUser>('User', userSchema);

export default User;
