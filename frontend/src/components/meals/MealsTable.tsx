import { useMemo, memo } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type {MealItem} from '../../types/MealItem.type';
import { PencilLine, PlusCircleIcon } from "lucide-react";
import DeleteMealButton from "./DeleteMealButton"; 
import { calculateNutrientsTotals } from "@/lib/aggregations";


function MealsTable({ meals, name }: {
   meals: MealItem[],
   name: string,
}) {
   const totals = useMemo(() => {
      return calculateNutrientsTotals(meals)
   }, [meals]
   );


   const getTableCells = () => {
      return (
         meals.map((meal) => {
            const { _id, name, weight, kcal, date } = meal;
            const { proteins, carbs, fats, fiber} = meal.macros;
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
            )
         }
         )
      )
   }

   const tableHeads = ['Name', 'Weight (g)', 'Kcal', 'Proteins', 'Carbs', 'Fats', 'Fiber'];

   if(meals.length > 0){
    tableHeads.push('Edit / Delete');
   }

   return <Card className="w-[90%] lg:w-[80%] mx-auto border mt-5">
      <CardHeader>
         <CardTitle className="text-xl">
            {name[0]?.toUpperCase() + name.slice(1, name.length)}
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
            {!meals.length &&
               <TableRow>
                  {tableHeads.map((_, index) => (
                     <TableCell key={index} className="text-zinc-400">__</TableCell>
                  ))}
               </TableRow>
            }

            {!!meals.length && getTableCells()}
         </TableBody>

         <TableFooter>
            <TableRow>
               <TableCell>Total:</TableCell>
               <TableCell></TableCell>
               <TableCell>{totals.kcal} kcal</TableCell>
               <TableCell>{totals.macros.proteins} g</TableCell>
               <TableCell>{totals.macros.carbs} g</TableCell>
               <TableCell>{totals.macros.fats} g</TableCell>
               <TableCell>{totals.macros.fiber} g</TableCell>
            </TableRow>
         </TableFooter>
      </Table>

      <Button asChild className="w-70 mx-auto border-2 border-zinc-300" size='lg' variant="outline">
         <Link to={`/meals/new?type=${name}`}>
            <PlusCircleIcon />
            Add New Meal
         </Link>
      </Button>
   </Card >
}

export default memo(MealsTable);
