import express from "express";
const router = express.Router();
import auth from "../../middleware/auth.js";
import { validationResult } from "express-validator";
import { nutritionValidator } from "../../validators/nutritionValidator.js";

import Nutrition from "../../models/Nutrition.js";

// @route   GET api/nutritions
// @desc    Get user`s nutrition 
// @access  Private
router.get('/', auth, async(req, res) => {
    try {
        const userNutrition = await Nutrition.find({user: req.user.id});

        if(!userNutrition){
            return res.status(404).json({msg: 'User`s nutritions not found'});
        }

        res.json(userNutrition);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @route   POST api/nutritions/update
// @desc    Update a user nutrition 
// @access  Private
router.post('/update', nutritionValidator, auth, async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
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
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

export default router;