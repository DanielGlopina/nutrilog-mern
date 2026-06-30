import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import User from '../models/User.js';

const userAuth = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    const validationError = new Error("Validation error");
    validationError.errors = errors.array();

    return next(validationError);
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      return next(new Error("Invalid credentials"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400);
      return next(new Error("Invalid credentials"));
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, email: user.email, name: user.name });
      },
    );
  } catch (error) {
    res.status(500);
    return next(new Error("Server error"));
  }
};

const tokenVerify = async (req, res, next) => {
    try {
        
        const user = await User.findById(req.user.id).select('-_id name email avatar'); 
        
        if (!user) {
            res.status(404);
            return next(new Error('User not found'))
        }

        res.json(user);
    } catch (error) {
        res.status(500);
        return next(new Error('Server error'))
    }
}

export {userAuth, tokenVerify};