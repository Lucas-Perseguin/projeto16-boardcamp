import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import categoriesRouter from './routes/categories.routes.js';
import gamesRouter from './routes/games.routes.js';
import customersRouter from './routes/customers.routes.js';
import rentalsRouter from './routes/rentals.routes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server runnig in port ${process.env.PORT}`);
});
