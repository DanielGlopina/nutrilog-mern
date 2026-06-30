import { format } from 'date-fns';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function getDateFromSearchParams(rawDate: string | null): string {
  const today = format(new Date(), 'yyyy-MM-dd');
  if (rawDate && DATE_REGEX.test(rawDate)) {
    return rawDate;
  }
  return today;
}
