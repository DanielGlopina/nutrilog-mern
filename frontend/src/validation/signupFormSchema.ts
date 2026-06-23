import z from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]+$/

export const signupFormSchema = z.object({
    email: z
    .string('Email is required')
    .email('Incorrect email format')
    .trim()
    .toLowerCase(),
    name: z
    .string('Name is required')
    .min(3, 'Name should include atleast 3 letters')
    .trim(),
    password: z
    .string('Password is required')
    .min(8, 'Password should include at least 8 symbols')
    .regex(passwordRegex,'Password should include at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 spec. symbol (_ @ # $ % !)'),
    confirmPassword: z
    .string('Complete this field')

})