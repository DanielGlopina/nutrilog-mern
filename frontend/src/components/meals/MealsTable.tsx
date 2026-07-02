import { useMemo, memo } from "react";
import { Card } from "@/components/ui/card";
import type { MealItem } from "../../types/MealItem.type";
import { calculateNutrientsTotals } from "@/lib/aggregations";
import MobileMealsTable from "./MobileMealsTable";
import DesktopMealsTable from "./DesktopMealsTable";

function MealsTable({ meals, name }: { meals: MealItem[]; name: string }) {
  const totals = useMemo(() => {
    return calculateNutrientsTotals(meals);
  }, [meals]);

  return (
    <Card className="w-[90%] lg:w-[80%] mx-auto border mt-5 overflow-hidden">
      {/* Mobile card layout */}
      <MobileMealsTable meals={meals} totals={totals} name={name} />

      {/* Desktop table layout */}
      <DesktopMealsTable meals={meals} totals={totals} name={name} />
    </Card>
  );
}

export default memo(MealsTable);
