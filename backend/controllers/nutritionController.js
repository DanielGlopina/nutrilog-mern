import { validationResult } from "express-validator";

import Nutrition from '../models/Nutrition.js';

const getNutritions = async(req, res, next) => {
    try {
        const userNutrition = await Nutrition.findOne({user: req.user.id}).select('user kcal macros -_id');

        if(!userNutrition){
            res.status(404)
            return next(new Error('User`s nutritions not found'))
        }

        res.json(userNutrition);
    } catch (error) {
        res.status(500);
        return next(new Error('Server error'))
    }
}

const updateNutritions = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400);
        const validationError = new Error('Validation error');
        validationError.errors = errors.array();

        return next(validationError);
    }


    try {
        const {proteins, carbs, fats, fiber} = req.body.macros;

        const updateNutrition = {
            kcal: req.body.kcal,
            macros: {
                proteins,
                carbs,
                fats, 
                fiber,
            }
        }

        // Nutrition targets are created on first submission and updated afterwards.
        const userNutition = await Nutrition.findOne({user: req.user.id});
        
        if(!userNutition){
            const newUserNutrition = new Nutrition({
                user: req.user.id,
                ...updateNutrition
            });
            const result = await newUserNutrition.save();
            return res.json(result);
        }

        const result = await Nutrition.findOneAndUpdate({user: req.user.id}, updateNutrition, {new: true});
        
        res.json(result);
    } catch (error) {
        res.status(500);
        return next(new Error('Server error'))
    }
}

export {getNutritions, updateNutritions};
