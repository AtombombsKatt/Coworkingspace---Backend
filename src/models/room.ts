import mongoose from 'mongoose';

export interface IRoom extends Document {
  name: string;
  capacity: number;
  type: string;
}


const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  type: { type: String,  required: true },
});


const Room = mongoose.model<IRoom>('Room', roomSchema);

export default Room;

