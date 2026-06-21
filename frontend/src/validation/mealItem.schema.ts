import z from "zod";
import { addDays, subYears } from "date-fns";

export const mealItemSchema = z.object({
   mealType: z.enum(["breakfast", "lunch", "dinner", "snack"], {
      message: "Please select a valid meal type",
   }),
   name: z.string()
      .min(3, "Food name must be at least 3 characters")
      .max(50, "Food name is too long"),

   weight: z.number().positive("Weight must be greater than 0"),
   kcal: z.number().min(0, "Kcal cannot be negative"),
   proteins: z.number().min(0).optional().nullable(),
   fats: z.number().min(0).optional().nullable(),
   carbs: z.number().min(0).optional().nullable(),
   fiber: z.number().min(0).optional().nullable(),
   date: z.coerce.date()
      .min(subYears(new Date(), 20), "Date is too far in the past")
      .max(addDays(new Date(), 30), "You cannot pick the date further than 1 month")
});