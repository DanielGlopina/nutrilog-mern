import { checkSchema } from "express-validator";

export const signupValidator = checkSchema({
  name: {
    exists: {
        errorMessage: "Name is required",
    },
    isLength: {
        options: {min: 3},
        errorMessage: 'Name should include at least 3 symbols'
    }
   },
   email: {
    exists: {
        errorMessage: 'Email is required',
    },
    isEmail: {
        errorMessage: 'Incorrect email format',
    }
   },
   password: {
    exists: {
        errorMessage: 'Password is required',
    },
    isLength: {
        options: {min: 8},
        errorMessage: 'Password should include at least 8 symbols'
    },
    matches: {
        options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]+$/,
        errorMessage: 'Password should include at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 spec. symbol (_ @ # $ % !)'
    }
   }
});