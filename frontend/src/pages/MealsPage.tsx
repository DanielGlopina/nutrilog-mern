import { useSearchParams } from "react-router";
import { Suspense } from "react";
import { Link } from "react-router";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import SelectDateForm from "@/components/forms/SelectDateForm"; 
import { Button } from "@/components/ui/button";
import MealsTablesSkeleton from "@/components/meals/MealsTableSkeleton"; 
import MealTablesWrapper from "@/components/meals/MealsTableWrapper"; 
import { ChartColumnBig } from "lucide-react";
import { format } from "date-fns";



function MealsPage() {
   const [searchParams] = useSearchParams();

   const rawDate = searchParams.get('date');
   let validDate = new Date();
   const today = format(new Date(), 'yyyy-MM-dd');

   if (typeof rawDate === 'string') {
      const parsedDate = new Date(rawDate);
      if (!isNaN(parsedDate.getTime())) {
         validDate = parsedDate;
      }
   }

   const formatedDate = format(validDate, 'yyyy-MM-dd');


   return <div>
      <div className="flex justify-center mt-5">
         <Breadcrumbs items={
            [
               { label: 'Home Page', href: '/' },
               { label: 'Meals'},
            ]
         } />
      </div>

      <div className="w-[90%] lg:w-[80%] mx-auto flex flex-col gap-5 lg:flex-row lg:justify-between">
         <div>
            <h2 className="text-3xl font-semibold">Meals Summary for {' '}
               <span className="font-thin">
                  {formatedDate === today ? 'Today' : formatedDate}
               </span>
            </h2>
            <p className="text-zinc-500 mt-2">Select other date to view details</p>
            <Button asChild size="lg" variant="outline" className="w-50 mt-5 border-2 border-zinc-300">
               <Link to={`/dashboard?date=${formatedDate ?? today}`}>
                  <ChartColumnBig />
                  Dashboard
               </Link>
            </Button>
         </div>
         <SelectDateForm path="/meals" />
      </div>

      <Suspense fallback={<MealsTablesSkeleton />}>
         <MealTablesWrapper date={formatedDate} />
      </Suspense>
   </div>;
}

export default MealsPage;