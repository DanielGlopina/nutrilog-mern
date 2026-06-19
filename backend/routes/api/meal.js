import express from 'express';
const router = express.Router();
import auth from '../../middleware/auth.js'
import {validationResult} from 'express-validator';
import { mealValidator } from '../../validators/mealValidator.js';

import MealsList from '../../models/MealsList.js';

// @route   GET api/meal/:date
// @desc    Get meals by date
// @access  Private
router.get('/:date', auth, async(req, res) => {
    try {
        const mealListDoc = await MealsList.findOne({ user: req.user.id, "meals.date": req.params.date }).select('meals -_id').populate('meals');
        const meals = mealListDoc ? mealListDoc.meals : [];
        res.json(meals);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// @route   POST api/meal/create
// @desc    Create new meal
// @access  Private
router.post('/create',
    mealValidator,
    auth, async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const mealsList = await MealsList.findOne({user: req.user.id});

            if(!mealsList){
                const newMealsList = new MealsList({
                    user: req.user.id,
                    meals: [

                    ],
                })

                await newMealsList.save();
            }

            const {name, mealType, kcal, weight, proteins, carbs, fats, fiber, date} = req.body;

            const newMeal = {};

            if (name) newMeal.name = name;
            if (mealType) newMeal.mealType = mealType;
            if (weight !== undefined) newMeal.weight = weight;
            if (kcal !== undefined) newMeal.kcal = kcal;
            if (date) newMeal.date = date;

            if (proteins !== undefined || carbs !== undefined || fats !== undefined || fiber !== undefined) {
                newMeal.macros = {};
                if (proteins !== undefined) newMeal.macros.proteins = proteins;
                if (carbs !== undefined) newMeal.macros.carbs = carbs;
                if (fats !== undefined) newMeal.macros.fats = fats;
                if (fiber !== undefined) newMeal.macros.fiber = fiber;
            }

            const result = await MealsList.findOneAndUpdate(
                { user: req.user.id }, 
                { $push: { meals: newMeal } }, 
                { new: true } 
            );
            res.json(result);


        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
})


// @route   PUT api/meal/update/:id/meal/:mealId
// @desc    Update meal
// @access  Private
router.put('/update/:id/meal/:mealId', mealValidator,  auth, async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
    try {
        const {name, mealType, kcal, weight, proteins, carbs, fats, fiber, date} = req.body;

        const updateFields = {};

        if (name) updateFields["meals.$.name"] = name;
        if (mealType) updateFields["meals.$.mealType"] = mealType;
        if (weight !== undefined) updateFields["meals.$.weight"] = weight;
        if (kcal !== undefined) updateFields["meals.$.kcal"] = kcal;
        if (proteins !== undefined) updateFields["meals.$.macros.proteins"] = proteins;
        if (carbs !== undefined) updateFields["meals.$.macros.carbs"] = carbs;
        if (fats !== undefined) updateFields["meals.$.macros.fats"] = fats;
        if (fiber !== undefined) updateFields["meals.$.macros.fiber"] = fiber;
        if (date) updateFields["meals.$.date"] = date;

        const updatedMeal = await MealsList.findOneAndUpdate(
            { 
                _id: req.params.id, 
                "meals._id": req.params.mealId
            },
            {
                $set: updateFields 
            },
            { new: true } 
        );

        res.json(updatedMeal);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/meal/delete/:id/meal/:mealId
// @desc    Delete meal
// @access  Private
router.delete('/delete/:id/meal/:mealId', auth, (req, res) => {
    try {
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

export default router;