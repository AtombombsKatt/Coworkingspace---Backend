import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  userId: string; // Användarens ID som har gjort bokningen
  roomId: string; // Rummets ID
  startTime: Date; // Starttid för bokningen
  endTime: Date; // Sluttid för bokningen
}

//  schema för bokningen
const bookingSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
  },
  {
    timestamps: true, 
  }
);


const Booking = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
