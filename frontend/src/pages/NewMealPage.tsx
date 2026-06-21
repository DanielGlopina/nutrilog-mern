import { useSearchParams } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MealForm from "@/components/meals/MealForm";
import { Breadcrumbs } from "@/components/ui/breadcrumb";

function NewMealPage() {
   const [searchParams] = useSearchParams();
   const type = searchParams.get('type') ?? '';

   return <div>
      <div className="flex justify-center mt-5">
         <Breadcrumbs items={
            [
               { label: 'Home Page', href: '/' },
               { label: 'Meals', href: '/meals' },
               { label: 'New Meal'},
            ]
         } />
      </div>

      <Card className="w-full sm:w-175 mx-auto mt-10 border">
         <CardHeader>
            <CardTitle className="text-2xl">Add Meal</CardTitle>
            <CardDescription>Add meal or product to the list</CardDescription>
         </CardHeader>
         <CardContent>
            <MealForm defaultMealType={type} formType="create" />
         </CardContent>
      </Card>
   </div>;
}

export default NewMealPage;