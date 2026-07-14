import { describe, expect, it } from "vitest";
import { mealFormSchema } from "@/validation/mealForm.schema";
import type z from "zod";

describe("mealFormSchema", () => {
  const testData = {
    mealType: "breakfast",
    name: "example meal",
    weight: 300,
    kcal: 100,
    proteins: 10,
    carbs: 10,
    fats: 10,
    fiber: 10,
    date: new Date(),
  } as z.infer<typeof mealFormSchema>;

  it("should pass validation", () => {
    const result = mealFormSchema.safeParse(testData);
    expect(result.success).toBe(true);
  });

  it("should fail validation (weight is negative)", () => {
    const result = mealFormSchema.safeParse({
      ...testData,
      weight: -100,
    });
    expect(result.success).not.toBe(true);
  });

  it("should fail validation when weight is zero", () => {
    expect(mealFormSchema.safeParse({ ...testData, weight: 0 }).success).toBe(false);
  });

  it("should allow omitted optional macros", () => {
    const requiredData = {
      mealType: testData.mealType,
      name: testData.name,
      weight: testData.weight,
      kcal: testData.kcal,
      date: testData.date,
    };
    expect(mealFormSchema.safeParse(requiredData).success).toBe(true);
  });

  it("should fail validation (required fields not passed)", () => {
    const result = mealFormSchema.safeParse({
      ...testData,
      kcal: undefined,
      weight: undefined,
    });
    expect(result.success).not.toBe(true);
  });
});
