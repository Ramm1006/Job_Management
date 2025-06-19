import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types';

const userSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    required: true,
    enum: ['admin', 'user'],
    default: 'user'
  }
});

export default mongoose.model<IUser>('User', userSchema);
