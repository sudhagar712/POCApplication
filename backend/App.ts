import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './route/index';
import { connectDB } from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api', routes);


app.get('/', (req, res) => {
  res.send('Hello World! API is running...');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
