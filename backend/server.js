import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;

import authRouter from './routes/api/auth.js'; 
import userRouter from './routes/api/user.js';
import mealRouter from './routes/api/meal.js';

// import User from './models/User.js';
import MealsList from './models/MealsList.js';
// import bcrypt from 'bcryptjs';

const app = express();

connectDB();

app.use(express.json({extended: false}));

app.get('/', async(req, res) => {
    // const password = await bcrypt.hash('123456', 10);

    // const newUser = new User({
    //     name: 'john',
    //     email: 'john@gmail.com',
    //     avatar: '',
    //     password: password
    // })

    // await newUser.save();

    const newMealsList = new MealsList({
        user: "6a33ca25812f0d9c883e9a76",
        meals: [
            {
                name: 'Dummy meal',
                mealType: "breakfast",
                weight: 300,
                kcal: 67,
                macros: {
                    proteins: 20,
                    carbs: 11,
                },
                date: Date.now()

            }
        ],
    })

    await newMealsList.save();

    res.send('API is running!');
})

// Define routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/meals", mealRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));