import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'https://rbac-system-mern-front.vercel.app/', credentials: true }));
app.use((req,res,next) => {
  console.log(req.path, req.method);
  next();
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
