import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
const port = process.env.PORT || 8000;
import dns from 'dns';

dns.setServers(["1.1.1.1", "8.8.8.8"]);

import authRouter from './routes/api/auth.js'; 
import userRouter from './routes/api/user.js';
import mealRouter from './routes/api/meal.js';
import nutritionRouter from './routes/api/nutrition.js';
import errorHandler from './middleware/error.js';

const app = express();

await connectDB();

app.use(express.json({extended: false}));

app.get('/', async(req, res) => {
    res.send('API is running!');
})

// Define routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/meals", mealRouter);
app.use("/api/nutritions", nutritionRouter);

app.use((req, res, next) => {
    res.status(404);
    const error = new Error(`Path not found - ${req.originalUrl}`)
    next(error);
})

// Error Handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`));