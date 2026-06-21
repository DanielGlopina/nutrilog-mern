import type { MealType } from "./MealType.type"

export type MealItem = {
   _id: string,
   mealType: MealType,
   name: string,
   weight: number,
   kcal: number,
   macros: {
      proteins: number,
      carbs: number,
      fats: number,
      fiber: number,
   },
   date: Date
}