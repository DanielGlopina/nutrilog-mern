import { describe, expect, it } from "vitest";
import { createMealPayload } from "@/lib/mealPayload";

describe("createMealPayload", () => {
  it("keeps kcal and macros as per-100g values", () => {
    expect(
      createMealPayload({
        mealType: "breakfast",
        name: "Example Food",
        weight: 400,
        kcal: 100,
        proteins: 10,
        carbs: 10,
        fats: 10,
        fiber: 8,
        date: new Date("2026-07-15T00:00:00"),
      }),
    ).toEqual({
      mealType: "breakfast",
      name: "Example Food",
      weight: 400,
      kcal: 100,
      macros: {
        proteins: 10,
        carbs: 10,
        fats: 10,
        fiber: 8,
      },
      date: "2026-07-15",
    });
  });

  it("normalizes omitted optional macros to zero", () => {
    const payload = createMealPayload({
      mealType: "snack",
      name: "Apple",
      weight: 150,
      kcal: 52,
      date: new Date("2026-07-15T00:00:00"),
    });

    expect(payload.macros).toEqual({
      proteins: 0,
      carbs: 0,
      fats: 0,
      fiber: 0,
    });
  });
});
