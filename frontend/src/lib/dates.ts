import { format } from "date-fns";

const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export function getDateFromSearchParams(rawDate: string | null): string {
  const today = format(new Date(), "yyyy-MM-dd");
  if (
    rawDate &&
    DATE_REGEX.test(rawDate) &&
    format(new Date(`${rawDate}T00:00:00`), "yyyy-MM-dd") === rawDate
  ) {
    return rawDate;
  }
  return today;
}
