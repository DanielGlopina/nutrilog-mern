import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function (req, res, next) {
    // Get token from the header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token){
        return res.status(401).json({msg: "No token, authorization denied"});
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token is not valid'});
    }
}
