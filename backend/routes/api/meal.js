import express from "express";
const router = express.Router();
import auth from "../../middleware/auth.js";
import { mealCreateValidator, mealUpdateValidator } from "../../validators/mealValidators.js";
import { getMealsByParams, createMeal, updateMeal, deleteMeal } from "../../controllers/mealController.js";

// @route   GET api/meals/:param
// @desc    Get meals by date (YYYY-MM-DD) or a single meal by MongoDB id
// @access  Private
router.get('/:param', auth, getMealsByParams)


// @route   POST api/meals/create
// @desc    Create new meal
// @access  Private
router.post("/create", mealCreateValidator, auth, createMeal);

// @route   PUT api/meals/update/:mealId
// @desc    Update meal
// @access  Private
router.put("/update/:mealId", mealUpdateValidator, auth, updateMeal)

// @route   DELETE api/meals/delete/:mealId
// @desc    Delete a meal
// @access  Private
router.delete("/delete/:mealId", auth, deleteMeal);

export default router;
