import { describe, expect, it } from "vitest";
import { getDateFromSearchParams } from "@/lib/dates";
import { format } from "date-fns";

describe("getDateFromSearchParams", () => {
  const today = format(new Date(), "yyyy-MM-dd");
  it("should return today`s date if null", () => {
    expect(getDateFromSearchParams(null)).toBe(today);
  });

  it("should return same date as passed if it`s formatted", () => {
    expect(getDateFromSearchParams("2026-06-03")).toBe("2026-06-03");
  });

  it("should return today`date fallback if passed is invalid", () => {
    expect(getDateFromSearchParams("any invalid date")).toBe(today);
  });

  it("should return  today`date fallback if passed is invalid (didn`t pass DATE_REGEX)", () => {
    expect(getDateFromSearchParams("2025-13-01")).toBe(today);
  });

  it("should reject a calendar date that does not exist", () => {
    expect(getDateFromSearchParams("2026-02-31")).toBe(today);
  });

  it("should accept a valid leap day", () => {
    expect(getDateFromSearchParams("2024-02-29")).toBe("2024-02-29");
  });
});
