import { checkSchema } from "express-validator";

export const nutritionValidator = checkSchema({
  kcal: {
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of kcal should be a positive number"
    },
    exists: {
        errorMessage: "Amount of kcal is required",
    }
   },
   'macros.proteins': {
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of proteins should be a positive number"
    },
    exists: {
        errorMessage: "Amount of proteins is required",
    },
   },
   'macros.carbs': {
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of carbs should be a positive number"
    },
    exists: {
        errorMessage: "Amount of carbs is required",
    }
   },
   'macros.fats': {
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of fats should be a positive number"
    },
    exists: {
        errorMessage: "Amount of fats is required",
    }
   },
   'macros.fiber': {
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of fiber should be a positive number"
    },
    exists: {
        errorMessage: "Amount of fiber is required",
    }
   },
});