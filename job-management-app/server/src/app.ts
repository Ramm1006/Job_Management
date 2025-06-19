import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jobRoutes from './routes/jobs';
import authRoutes from './routes/auth';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/job-management')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});