import z from "zod";
import { formConfig } from "@/config/form.config";

const { activityLevels, goals, temp } = formConfig;

export const nutritionsFormSchema = z.object({
   gender: z.enum(['male', 'female']),
   activityLevel: z.enum(Object.keys(activityLevels)),
   age: z.coerce.number().min(13, 'Min. age for applying formula is 13 y.o'),
   weight: z.coerce.number().positive('Weight cannot be negative'),
   height: z.coerce.number().positive('Height cannot be negative'),
   goal: z.enum(Object.keys(goals)),
   temp: z.enum(Object.keys(temp)).optional(),
})