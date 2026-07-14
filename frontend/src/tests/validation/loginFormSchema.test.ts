import { describe, expect, it } from "vitest";
import { loginFormSchema } from "@/validation/loginFormSchema";

describe("loginFormSchema", () => {
  it("accepts non-empty credentials", () => {
    expect(loginFormSchema.safeParse({ email: "user@example.com", password: "secret" }).success).toBe(true);
  });

  it.each([
    ["email", { email: "", password: "secret" }],
    ["password", { email: "user@example.com", password: "" }],
  ])("rejects an empty %s", (_field, credentials) => {
    expect(loginFormSchema.safeParse(credentials).success).toBe(false);
  });
});
