import mongoose from "mongoose";

const mealSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
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
        }
    },
    date: {
        type: Date,
        required: true
    }
        
})

const Meal = mongoose.model('Meal', mealSchema);
export default Meal;