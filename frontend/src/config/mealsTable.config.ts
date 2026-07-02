import { Coffee, Cookie, Moon, Utensils } from "lucide-react";

export const mealsTableConfig = {
  MEAL_ICONS: {
    breakfast: Coffee,
    lunch: Utensils,
    dinner: Moon,
    snack: Cookie,
  } as const,
  MACRO_LABELS: [
    { key: "proteins" as const, label: "Protein" },
    { key: "carbs" as const, label: "Carbs" },
    { key: "fats" as const, label: "Fats" },
    { key: "fiber" as const, label: "Fiber" },
  ],
};
