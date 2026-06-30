import z from "zod";

export const mealFormSchema = z.object({
   mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
   name: z.string().min(3, 'Food name must contain at least 3 chatacters'),
   weight: z.coerce.number('Weight is required').min(0, 'Weight must be greater than 0'),
   kcal: z.coerce.number('Amount of kcal is required').min(0, 'Kcal amount cannot be negative'),
   proteins: z.coerce.number().min(0).optional(),
   carbs: z.coerce.number().min(0).optional(),
   fats: z.coerce.number().min(0).optional(),
   fiber: z.coerce.number().min(0).optional(),
   date: z.date(),

})
