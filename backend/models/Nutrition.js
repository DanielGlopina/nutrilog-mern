import mongoose from "mongoose";

const nutritionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    kcal: {
        type: Number,
        required: true
    },
    macros: {
        proteins: {
            type: Number,
            required: true
        },
        carbs: {
            type: Number,
            required: true
        },
        fats: {
            type: Number,
            required: true
        },
        fiber: {
            type: Number,
            required: true
        }
    }
}, {timestamps: true})

const Nutrition = mongoose.model('Nutrition', nutritionSchema);
export default Nutrition;