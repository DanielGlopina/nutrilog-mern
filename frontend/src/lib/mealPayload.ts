import { format } from "date-fns";
import type z from "zod";
import type { mealFormSchema } from "@/validation/mealForm.schema";

type MealFormData = z.infer<typeof mealFormSchema>;

// Meals are stored using per-100g nutrient values. Weight scaling happens only
// when daily totals are calculated, preventing nutrients from being scaled twice.
export const createMealPayload = (data: MealFormData) => ({
  mealType: data.mealType,
  name: data.name,
  weight: data.weight,
  kcal: data.kcal,
  macros: {
    proteins: data.proteins ?? 0,
    carbs: data.carbs ?? 0,
    fats: data.fats ?? 0,
    fiber: data.fiber ?? 0,
  },
  date: format(data.date, "yyyy-MM-dd"),
});
