import z from "zod";
import { nutritionsFormSchema } from "@/validation/nutritionsForm.schema";

export function calculateUserNutririons(data: z.infer<typeof nutritionsFormSchema>) {
   const BMR_base = 10 * data.weight + 6.25 * data.heigth - 5 * data.age;
   let resultKcal = data.gender === 'male' ? BMR_base + 5 : BMR_base - 161;
   const proteins = Math.round(data.weight * 1.6);
   const fats = data.weight;

   switch (data.activityLevel) {
      case 'sedentary':
         resultKcal *= 1.2; break;
      case 'lightly':
         resultKcal *= 1.375; break;
      case 'moderately':
         resultKcal *= 1.55; break;
      case 'high':
         resultKcal *= 1.725; break;
      case 'extreme':
         resultKcal *= 1.9; break;
      default:
         break;
   }

   resultKcal = Math.round(resultKcal);
   const carbs = Math.round((resultKcal - (proteins * 4 + fats * 9)) / 4);
   const fiber = Math.round((resultKcal / 1000) * 14)

   return {
      kcal: resultKcal,
      proteins,
      carbs,
      fats,
      fiber
   }
}
