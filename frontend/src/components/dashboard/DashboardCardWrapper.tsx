import { useNavigate } from "react-router";
import { calculateNutrientsTotals } from "@/lib/aggregations";
import DashboardCard from "./DasboardCard";
import { dummyMeals } from "@/data/dummy-meals";
import { dummyNutritions } from "@/data/dummy-nutritions";

function DashboardCardWrapper({ formatedDate }: { formatedDate: string }) {
    const navigate = useNavigate();

    // QUERY -- GET nutritions 
   const nutritions = dummyNutritions;//replace

   if (!nutritions) {
      navigate('/dashboard/nutritions');
   }

    // QUERY -- GET meals by date    
   const mealsByDate = dummyMeals; //replace
   const dailySummary = calculateNutrientsTotals(mealsByDate);

   return <DashboardCard dailySummary={dailySummary} nutritions={nutritions} formatedDate={formatedDate} />

}

export default DashboardCardWrapper;