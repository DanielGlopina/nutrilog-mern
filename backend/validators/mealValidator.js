import { checkSchema } from "express-validator";

export const mealValidator = checkSchema({
  name: {
    exists: {
        errorMessage: "Meal name is required"
    }
  },
  mealType: {
    exists: {
        errorMessage: "Meal type is required"
    }
  },
  weight: {
    isInt: {
        options: {gt: 0},
        errorMessage: "Weight should be a positive number"
    },
    errorMessage: "Weight is required",
  },
  kcal: {
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of kcal should be a positive number"
    },
    errorMessage: "Amount of kcal is required",
   },
   proteins: {
    optional: true,
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of proteins should be a positive number"
    },
   },
   carbs: {
    optional: true,
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of carbs should be a positive number"
    },
   },
   fats: {
    optional: true,
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of fats should be a positive number"
    },
   },
   fiber: {
    optional: true,
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of fiber should be a positive number"
    },
   },
   date: {
        optional: true,
        isDate: {
            options: {format: "YYYY-MM-DD", strictMode: true },
            errorMessage: 'Date should be in valid format (YYYY-MM-DD)',
        }
   }

});