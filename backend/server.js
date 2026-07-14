import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import app from '../index.js';
const port = process.env.PORT || 8000;

if (!process.env.JWTSECRET) {
    throw new Error('JWTSECRET environment variable is required');
}

await connectDB();

app.listen(port, () => console.log(`Server running on port ${port}`));
