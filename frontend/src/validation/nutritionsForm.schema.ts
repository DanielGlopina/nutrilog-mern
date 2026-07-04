import z from "zod";

export const nutritionsFormSchema = z.object({
  gender: z.enum(["male", "female"]),
  activityLevel: z.enum([
    "sedentary",
    "lightly",
    "moderately",
    "high",
    "extreme",
  ]),
  age: z.coerce.number().min(13, "Min. age for applying formula is 13 y.o"),
  weight: z.coerce.number().positive("Weight cannot be negative"),
  height: z.coerce.number().positive("Height cannot be negative"),
  goal: z.enum(["loss", "gain", "maintain"]),
  temp: z.enum(["mild", "moderate", "agressive"]).optional(),
});
