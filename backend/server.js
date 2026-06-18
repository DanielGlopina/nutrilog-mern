import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;

import authRouter from './routes/api/auth.js'; 
import userRouter from './routes/api/user.js';

// import User from './models/User.js';
// import bcrypt from 'bcryptjs';

const app = express();

connectDB();

app.use(express.json({extended: false}));

app.get('/', (req, res) => {
    // const password = await bcrypt.hash('123456', 10);

    // const newUser = new User({
    //     name: 'john',
    //     email: 'john@gmail.com',
    //     avatar: '',
    //     password: password
    // })

    // await newUser.save();
    res.send('API is running!');
})

// Define routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));