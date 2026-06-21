import MealsTable from './MealsTable';
import {dummyMeals} from '../../data/dummy-meals';


function MealTablesWrapper({ date }: { date: string }) {
   const meals = dummyMeals;
   console.log(date);

   const breakfast = meals.filter((meal) => meal.mealType === 'breakfast');
   const lunch = meals.filter((meal) => meal.mealType === 'lunch');
   const dinner = meals.filter((meal) => meal.mealType === 'dinner');
   const snack = meals.filter((meal) => meal.mealType === 'snack');


   return <>
      <MealsTable meals={breakfast} name={"breakfast"} />
      <MealsTable meals={lunch} name={"lunch"} />
      <MealsTable meals={dinner} name={"dinner"} />
      <MealsTable meals={snack} name={"snack"} />
   </>

}

export default MealTablesWrapper;
