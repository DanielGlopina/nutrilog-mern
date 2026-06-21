import express from "express";
const router = express.Router();
import auth from "../../middleware/auth.js";
import { validationResult } from "express-validator";
import { mealCreateValidator, mealUpdateValidator } from "../../validators/mealValidators.js";
import { formatISO, parseISO } from "date-fns";

import Meal from "../../models/Meal.js";

// @route   GET api/meals/:date
// @desc    Get meals by date
// @access  Private
router.get('/:date', auth, async (req, res) => {
    try {
        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

        if (!dateRegex.test(req.params.date)) {
            return res.status(400).json({ msg: "Invalid data format" });
        }

        const targetDateObj = new Date(req.params.date);

        const meals = await Meal.find({user: req.user.id, date: targetDateObj}).select("-_id");

        res.json(meals);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})


// @route   POST api/meals/create
// @desc    Create new meal
// @access  Private
router.post("/create", mealCreateValidator, auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, mealType,  weight, kcal, date} = req.body;
    const { proteins, carbs, fats, fiber} = req.body.macros;

    const newMeal = new Meal({
        user: req.user.id,
        name,
        mealType,
        weight,
        kcal,
        macros: {
            proteins: proteins || 0,
            carbs: carbs || 0,
            fats: fats || 0,
            fiber: fiber || 0,
        },
        date: new Date(date),
    });

    const result = await newMeal.save();

    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/meals/update/:mealId
// @desc    Update meal
// @access  Private
router.put("/update/:mealId", mealUpdateValidator, auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

   try {
        const { name, mealType,  weight, kcal, date} = req.body;

        const updateMeal = {};
        if(name) updateMeal.name = name;
        if(mealType) updateMeal.mealType = mealType;
        if(weight) updateMeal.weight = weight;
        if(kcal) updateMeal.kcal = kcal;
        if(req.body.macros){
            const { proteins, carbs, fats, fiber} = req.body.macros;
            updateMeal.macros = {};
            if(proteins) updateMeal.macros.proteins = proteins;
            if(carbs) updateMeal.macros.carbs = carbs;
            if(fats) updateMeal.macros.fats = fats;
            if(fiber) updateMeal.macros.fiber = fiber;
            if(date) updateMeal.date = date;
        }

        const meal = await Meal.findById(req.params.mealId);

        if(!meal){
            return res.status(404).json({msg: 'Meal not found'});
        }

        const result = await Meal.findOneAndUpdate({_id: req.params.mealId, user: req.user.id}, updateMeal, {new: true})

        res.json(result)
   } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
   }
})

// @route   DELETE api/meals/delete/:mealId
// @desc    Delete a meal
// @access  Private
router.delete("/delete/:mealId", auth, async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.mealId);

    if(!meal){
        return res.status(404).json({msg: 'Meal not found'});
    }

    const result = await Meal.findOneAndDelete({_id: req.params.mealId, user: req.user.id})

    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export default router;
