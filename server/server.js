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
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

app.use('/auth', authRoutes);
app.use("/users", userRoutes);

app.use('/', (req, res) => {
  res.status(200).send("Welcome to RBAC backend");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    const PORT = process.env.SERVER_PORT;
    const HOST = process.env.SERVER_HOST;
    app.listen(PORT, HOST, () => console.log(`Server running on  http://${HOST}:${PORT}`));
  })
  .catch(err => console.log(err));