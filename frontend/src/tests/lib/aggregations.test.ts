import { describe, expect, it } from "vitest";
import { calculateNutrientsTotals } from "@/lib/aggregations";

describe("calculateNutrientsTotal", () => {
  it("should return object of zero-values if meals array is empty ", () => {
    expect(calculateNutrientsTotals([])).toEqual({
      kcal: 0,
      macros: { proteins: 0, carbs: 0, fats: 0, fiber: 0 },
    });
  });

  it("should return correct total kcal amount depending on weight", () => {
    expect(
      calculateNutrientsTotals([
        {
          _id: "id",
          mealType: "breakfast",
          name: "single meal",
          weight: 200,
          kcal: 250,
          macros: {
            proteins: 0,
            carbs: 0,
            fats: 0,
            fiber: 0,
          },
          date: new Date(),
        },
      ]),
    ).toEqual({
      kcal: 500,
      macros: { proteins: 0, carbs: 0, fats: 0, fiber: 0 },
    }); //250 (per 100g) * weight/100 = 500kcal
  });

  it("should return correct total macros sum depending on weight", () => {
    expect(
      calculateNutrientsTotals([
        {
          _id: "id",
          mealType: "breakfast",
          name: "single meal",
          weight: 200,
          kcal: 0,
          macros: {
            proteins: 10,
            carbs: 10,
            fats: 10,
            fiber: 10,
          },
          date: new Date(),
        },
        {
          _id: "id",
          mealType: "breakfast",
          name: "single meal",
          weight: 100,
          kcal: 0,
          macros: {
            proteins: 20,
            carbs: 20,
            fats: 20,
            fiber: 20,
          },
          date: new Date(),
        },
      ]),
    ).toEqual({
      kcal: 0,
      macros: { proteins: 40, carbs: 40, fats: 40, fiber: 40 },
    }); // First obj: every macros (10) * 2, Second obj: every macros (20) * 1
  });

  it("should round values with floating dot", () => {
    expect(
      calculateNutrientsTotals([
        {
          _id: "id",
          mealType: "breakfast",
          name: "single meal",
          weight: 221,
          kcal: 10,
          macros: {
            proteins: 10,
            carbs: 10,
            fats: 10,
            fiber: 10,
          },
          date: new Date(),
        },
      ]),
    ).toEqual({
      kcal: 22,
      macros: { proteins: 22, carbs: 22, fats: 22, fiber: 22 },
    }); // 10 * (221/100) = 22.1 --> 22 after rounding
  });

  it("should scale per-100g values exactly once for a 400g meal", () => {
    expect(
      calculateNutrientsTotals([
        {
          _id: "meal-id",
          mealType: "breakfast",
          name: "Example Food",
          weight: 400,
          kcal: 100,
          macros: { proteins: 10, carbs: 10, fats: 10, fiber: 8 },
          date: new Date("2026-07-15"),
        },
      ]),
    ).toEqual({
      kcal: 400,
      macros: { proteins: 40, carbs: 40, fats: 40, fiber: 32 },
    });
  });
});
