import express from 'express';
const router = express.Router();
import { signupValidator } from '../../validators/signupValidator.js';

import { registerUser } from '../../controllers/userController.js';

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', signupValidator, registerUser)

export default router;