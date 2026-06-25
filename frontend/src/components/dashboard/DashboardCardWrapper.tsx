import { useNavigate } from "react-router";
import { calculateNutrientsTotals } from "@/lib/aggregations";
import DashboardCard from "./DasboardCard";
import { dummyMeals } from "@/data/dummy-meals";
import { dummyNutritions } from "@/data/dummy-nutritions";
// import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

function DashboardCardWrapper({ formatedDate }: { formatedDate: string }) {
   const navigate = useNavigate();

   const nutritions = dummyNutritions;

   if (!nutritions) {
      navigate('/dashboard/nutritions');
   }

   const getMealsByDate = async() => {
      return api.get(`/meals/${formatedDate}`).then((result) => {
         console.log(result.data);
      })
   }

   getMealsByDate();
   

   // useQuery({queryKey: ['todos'], queryFn: ...})
   const mealsByDate = dummyMeals;
   const dailySummary = calculateNutrientsTotals(mealsByDate);

   return <DashboardCard dailySummary={dailySummary} nutritions={nutritions} formatedDate={formatedDate} />

}

export default DashboardCardWrapper;