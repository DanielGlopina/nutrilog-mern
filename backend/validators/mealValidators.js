import { checkSchema } from "express-validator";

export const mealCreateValidator = checkSchema({
  name: {
    exists: {
        errorMessage: "Meal name is required"
    },
    isLength: {
        options: {min: 3, max: 50},
        errorMessage: "Meal name should be 3-50 charachters long"
    }
  },
  mealType: {
    exists: {
        errorMessage: "Meal type is required"
    },
    isIn: {
      options: [['breakfast', 'lunch', 'dinner', 'snack']], 
      errorMessage: 'Meal type could include: breakfast, lunch, dinner, snack',
    },
  },
  weight: {
    isInt: {
        options: {gt: 0},
        errorMessage: "Weight should be a positive number"
    },
    exists:{
        errorMessage: "Weight is required",
    }
  },
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
    optional: true,
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of proteins should be a positive number"
    },
   },
   'macros.carbs': {
    optional: true,
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of carbs should be a positive number"
    },
   },
   'macros.fats': {
    optional: true,
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of fats should be a positive number"
    },
   },
   'macros.fiber': {
    optional: true,
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of fiber should be a positive number"
    },
   },
   date: {
        isISO8601: {
            strict: true, 
            errorMessage: 'Date should be in valid format (YYYY-MM-DD)',
        },
        notEmpty: {
            errorMessage: 'Date is required'
        }
    }
});

export const mealUpdateValidator = checkSchema({
   name: {
    optional: true,
    isLength: {
        options: {min: 3, max: 50},
        errorMessage: "Meal name should be 3-50 charachters long"
    }
  },
  mealType: {
    optional: true,
    isIn: {
      options: [['breakfast', 'lunch', 'dinner', 'snack']], 
      errorMessage: 'Meal type could include: breakfast, lunch, dinner, snack',
    }
  },
  weight: {
    optional: true,
    isInt: {
        options: {gt: 0},
        errorMessage: "Weight should be a positive number"
    }
  },
  kcal: {
    optional: true,
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of kcal should be a positive number"
    }
   },
   'macros.proteins': {
    optional: true,
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of proteins should be a positive number"
    },
   },
   'macros.carbs': {
    optional: true,
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of carbs should be a positive number"
    },
   },
   'macros.fats': {
    optional: true,
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of fats should be a positive number"
    },
   },
   'macros.fiber': {
    optional: true,
    isInt: {
        options: {gt: 0},
        errorMessage: "Amount of fiber should be a positive number"
    },
   },
   date: {
    optional: true,
    isISO8601: {
        strict: true, // Проверяет, что дата реально существует (например, нет 30 февраля)
        errorMessage: 'Date should be in valid format (YYYY-MM-DD)',
    },
    notEmpty: {
        errorMessage: 'Date is required'
    }
    }
})