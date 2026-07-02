import { memo } from "react";
import { Link } from "react-router";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
  TableCell,
} from "../ui/table";
import { Button } from "../ui/button";
import DeleteMealButton from "./DeleteMealButton";
import { CardHeader, CardTitle } from "../ui/card";
import { PencilLine, PlusCircleIcon, Utensils } from "lucide-react";
import type { MealItem, MealItemTotals } from "@/types/MealItem.type";

import { mealsTableConfig } from "@/config/mealsTable.config";

const DesktopMealsTable = ({
  meals,
  totals,
  name,
}: {
  meals: MealItem[];
  totals: MealItemTotals;
  name: string;
}) => {
  const { MEAL_ICONS } = mealsTableConfig;
  const MealIcon = MEAL_ICONS[name as keyof typeof MEAL_ICONS] ?? Utensils;

  const tableHeads = [
    "Name",
    "Weight (g)",
    "Kcal",
    "Proteins",
    "Carbs",
    "Fats",
    "Fiber",
  ];

  const getTableCells = () => {
    return meals.map((meal) => {
      const { _id, name, weight, kcal, date } = meal;
      const { proteins, carbs, fats, fiber } = meal.macros;
      return (
        <TableRow key={_id}>
          <TableCell>{name}</TableCell>
          <TableCell>{weight}</TableCell>
          <TableCell>{kcal}</TableCell>
          <TableCell>{proteins}</TableCell>
          <TableCell>{carbs}</TableCell>
          <TableCell>{fats}</TableCell>
          <TableCell>{fiber}</TableCell>
          <TableCell className="flex justify-start gap-4">
            <Button asChild variant="outline" aria-label="Edit Meal Item">
              <Link to={`/meals/edit?mealId=${_id}`}>
                <PencilLine />
              </Link>
            </Button>
            <DeleteMealButton mealId={_id} mealDate={date} />
          </TableCell>
        </TableRow>
      );
    });
  };

  if (meals.length > 0) {
    tableHeads.push("Delete/Edit");
  }

  return (
    <div className="hidden md:block">
      <CardHeader className="flex items-center gap-2 min-w-0">
        <MealIcon className="size-5 shrink-0 text-zinc-500" />
        <CardTitle className="text-xl">
          {name.toUpperCase()[0] + name.slice(1, name.length)}
        </CardTitle>
      </CardHeader>

      <Table>
        <TableHeader>
          <TableRow>
            {tableHeads.map((item, index) => (
              <TableHead key={index}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {!meals.length && (
            <TableRow>
              {tableHeads.map((_, index) => (
                <TableCell key={index} className="text-zinc-400">
                  __
                </TableCell>
              ))}
            </TableRow>
          )}

          {!!meals.length && getTableCells()}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell>Total:</TableCell>
            <TableCell></TableCell>
            <TableCell>{totals.kcal} kcal </TableCell>
            <TableCell>{totals.macros.proteins} g</TableCell>
            <TableCell>{totals.macros.carbs} g</TableCell>
            <TableCell>{totals.macros.fats} g</TableCell>
            <TableCell>{totals.macros.fiber} g</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <Button
        asChild
        className="flex w-70 mx-auto border-2 border-zinc-300"
        size="lg"
        variant="outline"
      >
        <Link to={`/meals/new?type=${name}`}>
          <PlusCircleIcon />
          Add New Meal
        </Link>
      </Button>
    </div>
  );
};

export default memo(DesktopMealsTable);
