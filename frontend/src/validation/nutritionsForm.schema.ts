import z from "zod";
import { formConfig } from "@/config/form.config";

const { activityLevels, goals } = formConfig;

export const nutritionsFormSchema = z.object({
   gender: z.enum(['male', 'female']),
   activityLevel: z.enum(Object.keys(activityLevels)),
   age: z.coerce.number().min(13),
   weight: z.coerce.number().positive(),
   heigth: z.coerce.number().positive(),
   goal: z.enum(Object.keys(goals))
})