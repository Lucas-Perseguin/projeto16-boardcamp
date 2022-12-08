import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import categoriesRouter from './routes/categories.routes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(categoriesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server runnig in port ${process.env.PORT}`);
});
