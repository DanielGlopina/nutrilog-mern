import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
const port = process.env.PORT || 8000;

import authRouter from './routes/api/auth.js'; 
import userRouter from './routes/api/user.js';
import mealRouter from './routes/api/meal.js';
import nutritionRouter from './routes/api/nutrition.js';
import errorHandler from './middleware/error.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDist = path.resolve(__dirname, '../frontend/dist');

if (!process.env.JWTSECRET) {
    throw new Error('JWTSECRET environment variable is required');
}

await connectDB();

app.use(express.json({extended: false}));

// Render uses this endpoint to confirm that a deployment is healthy.
app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Define routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/meals", mealRouter);
app.use("/api/nutritions", nutritionRouter);

if (process.env.NODE_ENV === 'production') {
    // In production Express serves both the API and the compiled React application.
    app.use(express.static(frontendDist));
    app.use((req, res, next) => {
        // Let React Router handle direct navigation to client-side routes.
        if (req.method === 'GET' && req.accepts('html')) {
            return res.sendFile(path.join(frontendDist, 'index.html'));
        }
        next();
    });
}

app.use((req, res, next) => {
    res.status(404);
    const error = new Error(`Path not found - ${req.originalUrl}`)
    next(error);
})

// Error Handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`));
