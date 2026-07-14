import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function (req, res, next) {
    // Protected routes receive the JWT through the shared API client.
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token){
       res.status(401);
       return next(new Error('No token, authorization denied'))
    }

    // Expose only the verified user payload to downstream controllers.
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401);
        return next(new Error('Token is not valid'))
    }
}
