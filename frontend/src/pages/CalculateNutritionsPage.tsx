import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CalculateNutritionsForm from '@/components/dashboard/CalculateNutritionsForm';
import { Breadcrumbs } from "@/components/ui/breadcrumb";

async function CalculateNutritionsPage() {
    //    const { userId } = await auth();

    //    if (!userId) {
    //       redirect('/'); AUTH QUERY
    //    }


   return <div>
      <div className="flex justify-center mt-5">
         <Breadcrumbs items={
            [
               { label: 'Home Page', href: '/' },
               { label: 'Dashboard', href: '/dashboard' },
               { label: 'Calculate Nutritions' }
            ]
         } />
      </div>

      <Card className="w-full sm:w-175 mx-auto mt-10 border">
         <CardHeader>
            <CardTitle className="text-2xl">Calculate Nutitions</CardTitle>
            <CardDescription>Get nutritions for your personal goals</CardDescription>
         </CardHeader>
         <CardContent>
            <CalculateNutritionsForm />
         </CardContent>
      </Card>
   </div>;
}

export default CalculateNutritionsPage;