import { describe, expect, it } from "vitest";
import { signupFormSchema } from "@/validation/signupFormSchema";
import type z from "zod";

describe("signupFormSchema", () => {
  const testData = {
    email: "example@gmail.com",
    name: "John Doe",
    password: "Valid_password1",
    confirmPassword: "Valid_password1",
  } as z.infer<typeof signupFormSchema>;

  it("should pass validation", () => {
    const result = signupFormSchema.safeParse(testData);
    expect(result.success).toBe(true);
  });

  it("should fail validation (passwords do not match)", () => {
    const result = signupFormSchema.safeParse({
      ...testData,
      confirmPassword: "mismatching password",
    });
    expect(result.success).not.toBe(true);
  });

  it("should fail validation (declined by regex)", () => {
    const result = signupFormSchema.safeParse({
      ...testData,
      password: "simple",
      confirmPassword: "simple",
    });
    expect(result.success).not.toBe(true);
  });
});
