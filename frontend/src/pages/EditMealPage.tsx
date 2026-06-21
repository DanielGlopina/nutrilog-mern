import { useSearchParams } from "react-router";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import MealForm from "@/components/meals/MealForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NotFoundPage from "./NotFoundPage";
import { dummyMeals } from "@/data/dummy-meals";

function EditMealPage() {
   const [searchParams] = useSearchParams();

   const mealId = searchParams.get('mealId');

   if (!mealId) {
        return <NotFoundPage/>
   }

    // QUERY TO FIND BY ID

   const meal = dummyMeals[0]; //REPLACE IT

   if (!meal) {
      return <NotFoundPage/>
   }


   return <div>
      <div className="flex justify-center mt-5">
         <Breadcrumbs items={
            [
               { label: 'Home Page', href: '/' },
               { label: 'Meals', href: '/meals' },
               { label: 'Edit Meal' },
            ]
         } />

      </div>
      <Card className="w-full sm:w-175 mx-auto mt-10 border">
         <CardHeader>
            <CardTitle className="text-2xl">Edit Meal</CardTitle>
            <CardDescription>Edit information about meal</CardDescription>
         </CardHeader>
         <CardContent>
            <MealForm formType="edit" mealData={meal} />
         </CardContent>
      </Card>
   </div>;
}

export default EditMealPage;
















