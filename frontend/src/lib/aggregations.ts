import type { MealItem } from "@/types/MealItem.type";

export function calculateNutrientsTotals(meals: MealItem[]) {
  const rawNutrients = meals.reduce(
    (acc, meal) => {
      acc.kcal += Number(meal.kcal) || 0;
      acc.macros.proteins += Number(meal.macros.proteins) || 0;
      acc.macros.carbs += Number(meal.macros.carbs) || 0;
      acc.macros.fats += Number(meal.macros.fats) || 0;
      acc.macros.fiber += Number(meal.macros.fiber) || 0;
      return acc;
    },
    { kcal: 0, macros: { proteins: 0, carbs: 0, fats: 0, fiber: 0 } },
  );

  return {
    kcal: Math.round(rawNutrients.kcal),
    macros: {
      proteins: Math.round(rawNutrients.macros.proteins),
      carbs: Math.round(rawNutrients.macros.carbs),
      fats: Math.round(rawNutrients.macros.fats),
      fiber: Math.round(rawNutrients.macros.fiber),
    },
  };
}
