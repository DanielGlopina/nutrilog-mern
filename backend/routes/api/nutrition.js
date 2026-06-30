import express from "express";
const router = express.Router();
import auth from "../../middleware/auth.js";
import { nutritionValidator } from "../../validators/nutritionValidator.js";

import { getNutritions, updateNutritions } from "../../controllers/nutritionController.js";

// @route   GET api/nutritions
// @desc    Get user`s nutrition 
// @access  Private
router.get('/', auth, getNutritions);

// @route   POST api/nutritions/update
// @desc    Update a user nutrition 
// @access  Private
router.post('/update', nutritionValidator, auth, updateNutritions);

export default router;