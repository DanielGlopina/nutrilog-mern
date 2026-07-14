import express from "express";

import connectDB from "./backend/config/db.js";
import authRouter from "./backend/routes/api/auth.js";
import userRouter from "./backend/routes/api/user.js";
import mealRouter from "./backend/routes/api/meal.js";
import nutritionRouter from "./backend/routes/api/nutrition.js";
import errorHandler from "./backend/middleware/error.js";

// Vercel detects this root entry point and runs the Express app as one Function.
const app = express();

app.use(express.json());

app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.get("/", (_req, res) => {
  res.status(200).json({ message: "NutriLog API is running" });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/meals", mealRouter);
app.use("/api/nutritions", nutritionRouter);

app.use((req, res, next) => {
  res.status(404);
  next(new Error(`Path not found - ${req.originalUrl}`));
});

app.use(errorHandler);

export default app;
