import mongoose, { Schema } from 'mongoose';
import { IJob } from '../types';

const jobSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  salary: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['full-time', 'part-time', 'contract']
  },
  postedDate: { type: Date, default: Date.now }
});

export default mongoose.model<IJob>('Job', jobSchema);