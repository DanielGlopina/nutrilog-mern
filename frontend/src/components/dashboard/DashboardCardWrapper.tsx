import { useEffect, memo, useMemo } from "react";
import { useNavigate } from "react-router";
import { calculateNutrientsTotals } from "@/lib/aggregations";
import DashboardCard from "./DasboardCard";
import DashboardCardSkeleton from "./DashboardCardSkeleton";
import useGetMealsByDate from "@/hooks/useGetMealsByDate";
import useGetNutritions from "@/hooks/useGetNutritions";
function DashboardCardWrapper({ formatedDate }: { formatedDate: string }) {
   const { meals, isLoading, isFetching } = useGetMealsByDate(formatedDate);
   const {nutritions, isLoading: isPending} = useGetNutritions();
   const navigate = useNavigate();

   const dailySummary = useMemo(() => {
      return calculateNutrientsTotals(meals ?? []);
   }, [meals]);


   useEffect(() => {
      if (!isPending) {
         if (!nutritions) {
            navigate('/dashboard/nutritions');
         }
      }
   }, [nutritions, isPending, navigate]);


   if (isLoading || isPending) {
      return <DashboardCardSkeleton />;
   }

  if (!isPending && (!nutritions)) {
      return null; 
   }

  


   return <>
      {isFetching && (
         <div className="text-center text-zinc-500 text-sm py-2">Updating...</div>
      )}
      <DashboardCard dailySummary={dailySummary} nutritions={nutritions} formatedDate={formatedDate} />
   </>;
}

export default memo(DashboardCardWrapper);
