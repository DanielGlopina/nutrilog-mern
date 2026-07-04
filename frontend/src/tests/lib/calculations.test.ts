import { describe, expect, it } from "vitest";
import { calculateUserNutririons } from "@/lib/calculations";
import type { nutritionsFormSchema } from "@/validation/nutritionsForm.schema";
import type z from "zod";

describe("calculateUserNutririons", () => {
  const testObj = {
    gender: "male",
    activityLevel: "moderately",
    age: 18,
    weight: 75,
    height: 185,
    goal: "maintain",
  } as z.infer<typeof nutritionsFormSchema>;

  const egdeCaseTestObj = {
    gender: "female",
    activityLevel: "sedentary",
    age: 90,
    weight: 200,
    height: 140,
    goal: "loss",
    temp: "agressive",
  } as z.infer<typeof nutritionsFormSchema>;

  it("should return correct nutritions for maintain goal without multiplicators", () => {
    expect(calculateUserNutririons(testObj)).toEqual({
      kcal: 2823,
      macros: {
        proteins: 120,
        carbs: 417,
        fats: 75,
        fiber: 40,
      },
    });
  });

  it("should return different nutritions for male/female with the same input data", () => {
    expect(calculateUserNutririons(testObj)).toEqual({
      kcal: 2823,
      macros: {
        proteins: 120,
        carbs: 417,
        fats: 75,
        fiber: 40,
      },
    });

    expect(calculateUserNutririons({ ...testObj, gender: "female" })).toEqual({
      kcal: 2566,
      macros: {
        proteins: 120,
        carbs: 353,
        fats: 75,
        fiber: 36,
      },
    });
  });

  it("should return higher amount of kcal, carbs, fiber for higher activity level", () => {
    expect(
      calculateUserNutririons({
        ...testObj,
        activityLevel: "sedentary",
      }),
    ).toEqual({
      kcal: 2186,
      macros: {
        proteins: 120,
        carbs: 258,
        fats: 75,
        fiber: 31,
      },
    });

    expect(
      calculateUserNutririons({
        ...testObj,
        activityLevel: "extreme",
      }),
    ).toEqual({
      kcal: 3460,
      macros: {
        proteins: 120,
        carbs: 576,
        fats: 75,
        fiber: 48,
      },
    });
  });

  it("should return lower amount of kcal, carbs, fiber for higher temp of weight loss", () => {
    expect(
      calculateUserNutririons({ ...testObj, goal: "loss", temp: "moderate" }),
    ).toEqual({
      kcal: 2258,
      macros: {
        proteins: 120,
        carbs: 276,
        fats: 75,
        fiber: 32,
      },
    });

    expect(
      calculateUserNutririons({ ...testObj, goal: "loss", temp: "agressive" }),
    ).toEqual({
      kcal: 2117,
      macros: {
        proteins: 120,
        carbs: 241,
        fats: 75,
        fiber: 30,
      },
    });
  });

  it("should not return the negative amount of carbs in edge case", () => {
    expect(
      calculateUserNutririons(egdeCaseTestObj).macros.carbs,
    ).not.toBeLessThan(0);
  });
});
