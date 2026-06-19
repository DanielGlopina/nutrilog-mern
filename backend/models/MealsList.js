import mongoose from "mongoose";

const mealsListSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    meals: [
        {
        name: {
            type: String,
            required: true
        },
        mealType: {
            type: String,
            required: true,
        },
        weight: {
            type: Number,
            required: true
        },
        kcal: {
            type: Number,
            required: true 
        },
        macros: {
            proteins: {
                type: Number,
            },
            fats: {
                type: Number,
            },
            carbs: {
                type: Number,
            },
            fiber: {
                type: Number,
            },
        },
        date: {
            type: Date,
            required: true
        }
        }
    ],
}, {
    timestamps: true
})

const MealsList = mongoose.model('MealsList', mealsListSchema);
export default MealsList;