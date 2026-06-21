import z from "zod";

export const nutritionsSchema = z.object({
   kcal: z.number().positive('Amount of calories should be positive'),
   proteins: z.number().positive('Amount of protein should be positive'),
   carbs: z.number().positive('Amount of carbs should be positive'),
   fats: z.number().positive('Amount of fat should be positive'),
   fiber: z.number().positive('Amount of fiber should be positive'),
});