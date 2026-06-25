import express from 'express';
const router = express.Router();
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import {check, validationResult} from 'express-validator';
import { signupValidator } from '../../validators/signupValidator.js';

import User from '../../models/User.js';


// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', signupValidator,
    async(req, res ) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {name, email, password} = req.body;

        try {
            let user = await User.findOne({email});

            if(user){
                return res.status(400).json({errors: [{msg: "User already exists"}]});
            }

            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm",
            })

            user = new User({
                name,
                email,
                avatar,
                password,
            })

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
             {expiresIn: 360000},
             (err, token) => {
               if(err) throw err;
               res.json({token});
              },
            );
            
        } catch (error) {
            console.error(err.message);
            res.status(500).send("Server error")
        }
    }
)

export default router;