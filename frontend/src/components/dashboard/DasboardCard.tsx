import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CircularWithValueLabel from "@/components/ui/circular-progress";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";

type DailySummary = {
   kcal: number;
   macros: {
    proteins: number;
    carbs: number;
    fats: number;
    fiber: number;
   }
}

type UserNutritions = { user: string } & DailySummary;

function DashboardCard({ dailySummary, nutritions, formatedDate }: {
   dailySummary: DailySummary,
   nutritions: UserNutritions,
   formatedDate: string
}) {
    const {proteins, carbs, fats, fiber} = dailySummary.macros;



   const kcalConsumed = Math.round((dailySummary.kcal / nutritions.kcal) * 100);
   const proteinsConsumed = Math.round((proteins / nutritions.macros.proteins) * 100);
   const carbsConsumed = Math.round((carbs / nutritions.macros.carbs) * 100);
   const fatsConsumed = Math.round((fats / nutritions.macros.fats) * 100);
   const fiberConsumed = Math.round((fiber / nutritions.macros.fiber) * 100);

   const getDashboardCards = () => {
        const cardsData = [
            { name: 'kcal', consumed: kcalConsumed, current: dailySummary.kcal, target: nutritions.kcal },
            { name: 'proteins', consumed: proteinsConsumed, current: proteins, target: nutritions.macros.proteins },
            { name: 'carbs', consumed: carbsConsumed, current: carbs, target: nutritions.macros.carbs },
            { name: 'fats', consumed: fatsConsumed, current: fats, target: nutritions.macros.fats },
            { name: 'fiber', consumed: fiberConsumed, current: fiber, target: nutritions.macros.fiber },
        ];
   return cardsData.map((card, index) => {
      return (
         // Используем уникальное и постоянное имя карточки в качестве ключа
         <Card key={card.name} className="w-[170px] border text-center">
            <CardHeader>
               <CardTitle className='text-black capitalize'>{card.name}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col justify-center align-middle'>
               <div>
                  <CircularWithValueLabel currentValue={card.consumed} />
               </div>
               <span>
                  {card.current}/{card.target}
                  <span className='font-bold'> {index > 0 && 'g'}</span>
               </span>
            </CardContent>
         </Card>
      )
   });
    }

   return <Card className='w-[98%] lg:w-[85%] mx-auto mt-10'>
      <CardHeader className="flex justify-between align-middle">
         <CardTitle>Calculations based on your meals list</CardTitle>
         <Button asChild size="lg" variant='outline'>
            <Link to={`/meals?date=${formatedDate}`}>
               <ClipboardList />
               Manage Meals List
            </Link>
         </Button>
      </CardHeader>
      <CardContent className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 place-items-center gap-y-4'>
         {getDashboardCards()}
      </CardContent>
      <CardDescription className='text-center'>
         Nutritions aren`t up-to-date?{' '}
         <Link to="/dashboard/nutritions" className='font-bold underline'>
            Recalculate them now!
         </Link>
      </CardDescription>
   </Card>;
}

export default DashboardCard;