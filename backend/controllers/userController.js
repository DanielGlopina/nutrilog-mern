import dotenv from 'dotenv';
dotenv.config();
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {validationResult} from 'express-validator';

import User from '../models/User.js';

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    const validationError = new Error("Validation error");
    validationError.errors = errors.array();

    return next(validationError);
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400);
      return next(new Error("User already exists"));
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    user = new User({
      name,
      email,
      avatar,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
  } catch (err) {
    res.status(500);
    return next(new Error("Server error"));
  }
};

export {registerUser};