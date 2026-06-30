import mongoose from "mongoose";
import { validationResult } from "express-validator";

import Meal from '../models/Meal.js';

const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const getMealsByParams = async (req, res, next) => {
    try {
        const { param } = req.params;

        if (dateRegex.test(param)) {
            const targetDateObj = new Date(param);
            const meals = await Meal.find({ user: req.user.id, date: targetDateObj });
            return res.json(meals);
        }

        if (!mongoose.Types.ObjectId.isValid(param)) {
            res.status(400);
            return next(new Error("Invalid date or meal id format"))
        }

        const meal = await Meal.findOne({ user: req.user.id, _id: param });

        if (!meal) {
            res.status(404);
            return next(new Error('Meal by current id was not found!'))
        }

        return res.json(meal);
    } catch (error) {
        res.status(500);
        return next(new Error('Server error'))
    }
}

const createMeal = async (req, res, next) => {
  const errors = validationResult(req);
   if(!errors.isEmpty()){
        res.status(400);
        const validationError = new Error('Validation error');
        validationError.errors = errors.array();

        return next(validationError);
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
     res.status(500);
    return next(new Error('Server error'))
  }
}

const updateMeal = async (req, res, next) => {
    const errors = validationResult(req);
   if(!errors.isEmpty()){
        res.status(400);
        const validationError = new Error('Validation error');
        validationError.errors = errors.array();

        return next(validationError);
    }

   try {
        const { name, mealType, weight, kcal, macros, date} = req.body;

        const updateMeal = {
            name,
            mealType,
            weight,
            kcal,
            macros: {
                proteins: macros.proteins ?? 0,
                carbs: macros.carbs ?? 0,
                fats: macros.fats ?? 0,
                fiber: macros.fiber ?? 0
            },
            date
        };

        const meal = await Meal.findById(req.params.mealId);

        if(!meal){
            res.status(404);
            return next(new Error('Meal not found'))
        }

        const result = await Meal.findOneAndUpdate({_id: req.params.mealId, user: req.user.id}, updateMeal, {new: true})

        res.json(result)
   } catch (error) {
        res.status(500);
        return next(new Error('Server error'))
   }
}

const deleteMeal = async (req, res, next) => {
  try {
    const meal = await Meal.findById(req.params.mealId);

    if(!meal){
        res.status(404);
        return next(new Error('Meal not found'))
    }

    const result = await Meal.findOneAndDelete({_id: req.params.mealId, user: req.user.id})

    res.json(result);
  } catch (error) {
    res.status(500);
    return next(new Error('Server error'))
  }
}

export {getMealsByParams, createMeal, updateMeal, deleteMeal};