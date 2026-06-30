import express from 'express';
const router = express.Router();
import auth from '../../middleware/auth.js'
import {check} from 'express-validator';
import { userAuth, tokenVerify } from '../../controllers/authController.js';

// @route   POST api/auth
// @desc    Autenthicate user & get token
// @access  Public
router.post('/', 
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    userAuth
)

// @route   GET api/auth/me (или api/token)
// @desc    Get user data & verify token
// @access  Private
router.get('/me', auth, tokenVerify);

export default router;