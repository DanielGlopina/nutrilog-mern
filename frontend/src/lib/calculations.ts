import z from "zod";
import { nutritionsFormSchema } from "@/validation/nutritionsForm.schema";

export function calculateUserNutririons(
  data: z.infer<typeof nutritionsFormSchema>,
) {
  const BMR_base = 10 * data.weight + 6.25 * data.height - 5 * data.age;
  let resultKcal = data.gender === "male" ? BMR_base + 5 : BMR_base - 161;

  let proteins = Math.round(data.weight * 1.6);
  let fats = data.weight;

  switch (data.activityLevel) {
    case "sedentary":
      resultKcal *= 1.2;
      break;
    case "lightly":
      resultKcal *= 1.375;
      break;
    case "moderately":
      resultKcal *= 1.55;
      break;
    case "high":
      resultKcal *= 1.725;
      break;
    case "extreme":
      resultKcal *= 1.9;
      break;
    default:
      break;
  }

  if (data.temp) {
    switch (data.temp) {
      case "mild":
        resultKcal *= data.goal === "gain" ? 1.15 : 0.85;
        break;
      case "moderate":
        resultKcal *= data.goal === "gain" ? 1.2 : 0.8;
        break;
      case "agressive":
        resultKcal *= data.goal === "gain" ? 1.25 : 0.75;
        break;
    }
  }

  resultKcal = Math.round(resultKcal);

  let carbs = Math.round((resultKcal - (proteins * 4 + fats * 9)) / 4);

  if (carbs <= 0) {
    proteins = Math.round((resultKcal * 0.4) / 4);
    fats = Math.round((resultKcal * 0.3) / 9);
    carbs = Math.round((resultKcal * 0.3) / 4);
  }

  const fiber = Math.round((resultKcal / 1000) * 14);

  return {
    kcal: resultKcal,
    macros: {
      proteins,
      carbs,
      fats,
      fiber,
    },
  };
}
