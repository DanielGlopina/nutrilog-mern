import { useState, memo } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import DeleteMealButton from "./DeleteMealButton";
import { Button } from "../ui/button";
import {
  PlusCircleIcon,
  ChevronDown,
  PencilLine,
  Utensils,
} from "lucide-react";
import type { MealItem, MealItemTotals } from "@/types/MealItem.type";
import { mealsTableConfig } from "@/config/mealsTable.config";

const MobileMealsTable = ({
  meals,
  totals,
  name,
}: {
  meals: MealItem[];
  totals: MealItemTotals;
  name: string;
}) => {
  const [expanded, setExpanded] = useState(meals.length > 0);
  const { MEAL_ICONS, MACRO_LABELS } = mealsTableConfig;
  const MealIcon = MEAL_ICONS[name as keyof typeof MEAL_ICONS] ?? Utensils;

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b bg-card">
        <div className="flex items-center gap-2 min-w-0">
          <MealIcon className="size-5 shrink-0 text-zinc-500" />
          <span className="font-semibold truncate">
            {name.toUpperCase()[0] + name.slice(1, name.length)}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {meals.length > 0 && (
            <span className="text-sm text-zinc-600 whitespace-nowrap">
              {totals.kcal} kcal
            </span>
          )}
          <Button
            asChild
            size="icon"
            className="size-9 rounded-full bg-lime-400 text-white hover:bg-emerald-700"
            aria-label={`Add ${name.toUpperCase()[0] + name.slice(1, name.length)} item`}
          >
            <Link to={`/meals/new?type=${name}`}>
              <PlusCircleIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </div>

      {meals.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="flex w-full items-center gap-2 border-b px-4 py-3 text-left hover:bg-muted/40 transition-colors"
            aria-expanded={expanded}
          >
            <div className="grid flex-1 grid-cols-4 gap-1 text-center">
              {MACRO_LABELS.map(({ key, label }) => (
                <div key={key} className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-wide text-zinc-400">
                    {label}
                  </span>
                  <span className="text-sm font-medium">
                    {totals.macros[key]} g
                  </span>
                </div>
              ))}
            </div>
            <ChevronDown
              className={cn(
                "size-5 shrink-0 text-zinc-400 transition-transform",
                expanded && "rotate-180",
              )}
            />
          </button>

          {expanded && (
            <div className="divide-y">
              {meals.map((meal) => {
                const { _id, name: itemName, weight, kcal, date } = meal;
                const { proteins, carbs, fats, fiber } = meal.macros;

                return (
                  <div key={_id} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium leading-snug truncate">
                          {itemName}
                        </p>
                        <p className="text-sm text-emerald-600 mt-0.5">
                          {weight} g
                        </p>
                      </div>
                      <span className="text-sm font-medium shrink-0">
                        {kcal} kcal
                      </span>
                    </div>

                    <div className="mt-2 grid grid-cols-4 gap-1 text-center text-xs text-zinc-500">
                      <span>{proteins}</span>
                      <span>{carbs}</span>
                      <span>{fats}</span>
                      <span>{fiber}</span>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        aria-label="Edit Meal Item"
                      >
                        <Link to={`/meals/edit?mealId=${_id}`}>
                          <PencilLine className="size-4" />
                          Edit
                        </Link>
                      </Button>
                      <DeleteMealButton mealId={_id} mealDate={date} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {meals.length === 0 && (
        <p className="px-4 py-6 text-center text-sm text-zinc-400">
          No items yet
        </p>
      )}
    </div>
  );
};

export default memo(MobileMealsTable);
