import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
