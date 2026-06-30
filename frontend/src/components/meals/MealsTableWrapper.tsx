import { memo, useMemo } from 'react';
import MealsTable from './MealsTable';
import MealsTablesSkeleton from './MealsTableSkeleton';
import useGetMealsByDate from '@/hooks/useGetMealsByDate';
import type { MealItem } from '@/types/MealItem.type';

function MealTablesWrapper({ date }: { date: string }) {
   const { meals, isLoading, isFetching } = useGetMealsByDate(date);
   
   const groupedMeals = useMemo(() => {
      const initialGroups: Record<'breakfast' | 'lunch' | 'dinner' | 'snack', MealItem[]> = {breakfast: [], lunch: [], dinner: [], snack: []};

      if(!meals) return initialGroups;

      return meals.reduce((acc, meal) => {
         if(acc[meal.mealType]){
            acc[meal.mealType].push(meal)
         }
         return acc;
      }, initialGroups)
   }, [meals]);

   if(isLoading){
      return <MealsTablesSkeleton/>
   }

   return <>
      {isFetching && (
         <div className="text-center text-zinc-500 text-sm py-2">Updating...</div>
      )}
      <MealsTable meals={groupedMeals.breakfast} name={"breakfast"} />
      <MealsTable meals={groupedMeals.lunch} name={"lunch"} />
      <MealsTable meals={groupedMeals.dinner} name={"dinner"} />
      <MealsTable meals={groupedMeals.snack} name={"snack"} />
   </>;
}

export default memo(MealTablesWrapper);
