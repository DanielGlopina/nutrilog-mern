import type { MealItem } from "@/types/MealItem.type"; 

export function calculateNutrientsTotals(meals: MealItem[]) {
   return meals.reduce((acc, meal) => {
      acc.kcal += Number(meal.kcal) || 0;
      acc.macros.proteins += Number(meal.macros.proteins) || 0;
      acc.macros.carbs += Number(meal.macros.carbs) || 0;
      acc.macros.fats += Number(meal.macros.fats) || 0;
      acc.macros.fiber += Number(meal.macros.fiber) || 0;
      return acc;
   }, { kcal: 0, macros: { proteins: 0, carbs: 0, fats: 0, fiber: 0 } });
}