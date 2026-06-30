import { checkSchema } from "express-validator";
import { addDays, isBefore, subYears, isAfter } from "date-fns";

const commonFields = {
    macrosField: {
        optional: true,
        isInt: {
            options: {min: 0},
            errorMessage: "Amount should be a positive number"
        },
    },
    date: {
        optional: true,
        isISO8601: {
            strict: true, 
            errorMessage: 'Date should be in valid format (YYYY-MM-DD)',
        },
        custom: {
        options: ((value) => {
            const inputDate = new Date(value);
            const now = new Date();

            const minDate = subYears(now, 20);
            const maxDate = addDays(now, 30);

            if(isBefore(inputDate, minDate)){
                throw new Error('Date is too far in the past');
            }

            if(isAfter(inputDate, maxDate)){
                throw new Error('You cannot pick the date further than 1 month');
            }

            return true;
        }),
        },
        notEmpty: {
            errorMessage: 'Date is required'
        }
    }
}

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
        options: {min: 0},
        errorMessage: "Weight should be a positive number"
    },
    exists:{
        errorMessage: "Weight is required",
    }
  },
  kcal: {
    isInt: {
        options: {min: 0},
        errorMessage: "Amount of kcal should be a positive number"
    },
    exists: {
        errorMessage: "Amount of kcal is required",
    }
   },
   'macros.proteins': commonFields.macrosField,
   'macros.carbs': commonFields.macrosField,
   'macros.fats': commonFields.macrosField,
   'macros.fiber': commonFields.macrosField,
   date: commonFields.date
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
        options: {min: 0},
        errorMessage: "Weight should be a positive number"
    }
  },
  kcal: {
    optional: true,
    isInt: {
        options: {min: 0},
        errorMessage: "Amount of kcal should be a positive number"
    }
   },
   'macros.proteins': commonFields.macrosField,
   'macros.carbs': commonFields.macrosField,
   'macros.fats': commonFields.macrosField,
   'macros.fiber': commonFields.macrosField,
   date: commonFields.date
})