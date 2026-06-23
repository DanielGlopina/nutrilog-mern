import z from "zod";


export const loginFormSchema = z.object({
    email: z.string('Email is required'),
    password: z.string('Password is required')
})